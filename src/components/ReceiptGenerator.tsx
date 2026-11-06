import React from 'react';

interface OrderItem { title: string; image_url: string; }
interface ReceiptProps {
  orderId: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  date: string;
}

export default function ReceiptGenerator({ orderId, customerName, customerAddress, customerPhone, items, total, date }: ReceiptProps) {
  const SERVICE_FEE = 15;
  const handlePrint = () => window.print();

  return (
    <div className="font-cairo p-4 bg-gray-100 min-h-screen" dir="rtl">
      <button onClick={handlePrint} className="mb-4 bg-emerald-600 text-white px-6 py-2 rounded shadow print:hidden">
        طباعة الإيصال
      </button>

      <div id="receipt-document" className="bg-white mx-auto p-8 shadow-sm print:shadow-none w-[210mm] min-h-[297mm]">
        <div className="border-b-2 border-gray-800 pb-4 mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-gray-800">إيصال استلام</h1>
            <p className="text-gray-500">خدمة التوصيل والوساطة - الجديدة</p>
          </div>
          <div className="text-left text-sm text-gray-600 font-mono" dir="ltr">
            <p>Order: #{orderId.slice(0, 8)}</p>
            <p>Date: {date}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded mb-6 border border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><span className="font-bold">الاسم:</span> {customerName}</p>
            <p><span className="font-bold">الهاتف:</span> {customerPhone}</p>
            <p className="col-span-2"><span className="font-bold">العنوان:</span> {customerAddress}</p>
          </div>
        </div>

        <div className={`grid gap-4 mb-8 ${items.length > 2 ? 'grid-cols-3' : items.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {items.map((item, index) => (
            <div key={index} className="border rounded p-2 flex flex-col items-center">
              <img src={item.image_url} alt="Product" className="w-full h-40 object-cover rounded mb-2" crossOrigin="anonymous" />
              <p className="text-sm font-bold text-center leading-tight line-clamp-2">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-gray-800 pt-4 mt-auto">
          <div className="flex justify-between text-gray-600 mb-2">
            <span>مجموع المنتجات:</span>
            <span>{total - SERVICE_FEE} درهم</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>رسوم الخدمة والتوصيل:</span>
            <span>{SERVICE_FEE} درهم</span>
          </div>
          <div className="flex justify-between text-xl font-black text-gray-900 mt-4 bg-gray-100 p-2 rounded">
            <span>المبلغ الإجمالي المؤدى:</span>
            <span>{total} درهم</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: white; }
          #receipt-document { width: 100%; box-shadow: none; border: none; padding: 10mm; }
        }
      `}} />
    </div>
  );
}
