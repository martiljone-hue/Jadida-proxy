import React, { useState } from 'react';
import FullScreenModal from './components/FullScreenModal';
import OrderForm from './components/OrderForm';

const mockProducts = [
  { id: '1', title_darija: 'مصلوح البخار المحمول كيطوي (1200W)', price_mad: 119, image_url: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=300' },
  { id: '2', title_darija: 'منظم الماكياج والروائح كيدور 360 درجة', price_mad: 68, image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=300' },
  { id: '3', title_darija: 'سماعات بلوتوث ضد الماء مع شاشة', price_mad: 74, image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=300' },
  { id: '4', title_darija: 'طقم سكاكين المطبخ الاحترافي', price_mad: 99, image_url: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&q=80&w=300' },
  { id: '5', title_darija: 'عصارة كهربائية محمولة للعصير', price_mad: 85, image_url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=300' }
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-100 font-cairo pb-20" dir="rtl">
      <header className="bg-emerald-600 text-white p-4 shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-black text-center">وسيط الجديدة</h1>
      </header>

      <main className="p-4 max-w-md mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {mockProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <img src={product.image_url} alt={product.title_darija} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{product.title_darija}</h2>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xl font-black text-emerald-600">{product.price_mad} درهم</span>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-lg font-bold hover:bg-emerald-200 transition"
                  >
                    أطلب دابا
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <FullScreenModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        title="إتمام الطلب"
      >
        {selectedProduct && <OrderForm product={selectedProduct} />}
      </FullScreenModal>
    </div>
  );
}
