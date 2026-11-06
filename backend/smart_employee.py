import os
import requests
import google.generativeai as genai
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def fetch_top_products():
    """Fetch best-selling products from Temu via RapidAPI."""
    url = "https://temu-api-endpoint.p.rapidapi.com/search"
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "temu-api-endpoint.p.rapidapi.com"
    }
    querystring = {"sort": "sales_desc", "limit": "30"}
    
    try:
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()
        return response.json().get('data', [])
    except Exception as e:
        print(f"API Error: {e}")
        return []

def localize_to_darija(title: str, description: str) -> str:
    """Translate product title to natural Moroccan Darija using Gemini."""
    prompt = f"""
    Translate and rewrite this e-commerce product title into natural, engaging, and simplified Moroccan Darija (الدارجة المغربية), targeting buyers in El Jadida. 
    Avoid formal Arabic or Egyptian dialects. Return ONLY the translation.
    
    Title: {title}
    Context: {description}
    """
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"LLM Error: {e}")
        return title

def process_and_upsert():
    products = fetch_top_products()
    
    for item in products:
        supplier_id = item.get('product_id')
        original_title = item.get('title')
        image_url = item.get('image_url')
        
        # CRITICAL: Exact original price in MAD. NO MARKUP.
        price_mad = float(item.get('price_mad', 0)) 
        sales_volume = int(item.get('sales_volume', 0))
        
        title_darija = localize_to_darija(original_title, item.get('description', ''))
        
        product_data = {
            "supplier_product_id": supplier_id,
            "title_darija": title_darija,
            "image_url": image_url,
            "price_mad": price_mad,
            "sales_volume": sales_volume
        }
        
        try:
            supabase.table("products").upsert(product_data, on_conflict="supplier_product_id").execute()
            print(f"Processed: {title_darija}")
        except Exception as e:
            print(f"DB Error for {supplier_id}: {e}")

if __name__ == "__main__":
    process_and_upsert()
