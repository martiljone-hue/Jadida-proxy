import React, { useState } from 'react';

interface Product {
  title_darija: string;
  price_mad: number;
}

export default function OrderForm({ product }: { product: Product }) {
  const SERVICE_FEE = 15;
  const finalPrice = product.price_mad + SERVICE_FEE;
  const WHATSAPP_NUMBER = "212701248514"; // سيتم تغييره لاحقاً برقمك

  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneRegex = /^(?:(?:\+|00)212|0)\s*[5-7](?:[\s.-]*\d){8}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("المرجو إدخال رقم هاتف مغربي صحيح");
      return;
    }

    const text = `سلام، بغيت نكوموندي هاد المنتج:
🛒 المنتج: ${product.title_darija}
💰 الثمن النهائي: ${finalPrice} درهم (شاملة التوصيل للجديدة)
👤 الاسم: ${formData.name}
📍 العنوان: ${formData.address}
📞 الهاتف: ${formData.phone}`;

    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    
    setIsSubmitted(true);
    window.open(waLink, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6 space-y-4 font-cairo">
        <div className="text-emerald-500 text-6xl">✓</div>
        <h3 className="text-2xl font-bold">تم تسجيل طلبك بنجاح!</h3>
        <p className="text-gray-600">إذا لم يفتح الواتساب تلقائياً، اضغط على الزر أسفله.</p>
        <button onClick={handleSubmit} className="bg-emerald-500 text-white w-full py-3 rounded-lg font-bold">
          إرسال عبر الواتساب
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-cairo" dir="rtl">
      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mb-6">
        <p className="text-gray-700 text-sm">الثمن النهائي (المنتج + التوصيل للجديدة)</p>
        <p className="text-3xl font-bold text-emerald-600">{finalPrice} درهم</p>
      </div>

      <div>
        <label className="block text-gray-700 font-bold mb-2">الاسم الكامل</label>
        <input type="text" required className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" onChange={e => setFormData({...formData, name: e.target.value})} />
      </div>

      <div>
        <label className="block text-gray-700 font-bold mb-2">رقم الهاتف</label>
        <input type="tel" required placeholder="06..." dir="ltr" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-right" onChange={e => setFormData({...formData, phone: e.target.value})} />
      </div>

      <div>
        <label className="block text-gray-700 font-bold mb-2">عنوان التوصيل بالجديدة</label>
        <input type="text" required placeholder="حي السعادة..." className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" onChange={e => setFormData({...formData, address: e.target.value})} />
      </div>

      <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg mt-4 transition">
        أطلب الآن وادفع عند الاستلام
      </button>
    </form>
  );
}
