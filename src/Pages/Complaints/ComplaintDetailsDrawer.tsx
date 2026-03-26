import React from "react";
import Drawer from "../../Components/Ui/Drawer";
import { Paperclip } from "lucide-react";
import { useTranslation } from "react-i18next";
import CustomSelect from "../../Components/Ui/CustomSelect";

interface ComplaintDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any; 
}

const SummaryCard = ({ title, value, subValue }: { title: string, value: string, subValue: string }) => (
  <div className="flex-1 bg-[#F9FAFB] rounded-[24px] p-5 border border-gray-150 shadow-sm text-center font-bold flex flex-col items-start justify-start ">
    <span className="text-[15px] text-[#6B7280] mb-2">{title}</span>
    <h4 className="text-[18px] text-blackq">{value}</h4>
    <span className="text-[12px] text-gray-400 mt-2">{subValue}</span>
  </div>
);

const ChatSection = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-6">
        <div className="text-start">
          <h3 className="font-bold text-xl text-blackq">المحادثة بين الطرفين</h3>
          <p className="text-md text-[#6B7280] mt-1">شات كامل + إشعارات النظام</p>
        </div>
        <button className="flex items-center px-4 py-2 text-blackq rounded-xl text-md font-medium hover:bg-gray-50 transition-colors border border-gray-150">
          نسخ رقم النزاع 
        </button>
      </div>

      <div className="max-h-[600px] overflow-y-auto pr-2">
        <img 
          src="/Chat.png" 
          alt="المحادثة" 
          className="w-full h-auto object-contain rounded-xl"
        />
      </div>

      <div className="flex gap-4 pt-6 items-stretch" dir="rtl">
        <SummaryCard 
          title="مدة النزاع" 
          value="3 أيام" 
          subValue="آخر تحديث: اليوم" 
        />
        <SummaryCard 
          title="حالة التسليم" 
          value="غير مُسلّم" 
          subValue="موعد: 14-02-2026" 
        />
        <SummaryCard 
          title="التوصية" 
          value="تعويض/استرداد محتمل بسبب التأخير" 
          subValue="* توصية مبسطة (بدون AI)" 
        />
      </div>
    </div>
  );
};

const DecisionInput = ({ label, placeholder, minHeight = "100px", showRequired = false }: any) => (
  <div className="space-y-2 text-start">
    <label className="block text-[14px] font-bold text-[#050B2B] mr-1">
      {label}
    </label>
    <div className="relative group">
      <textarea 
        className="w-full bg-white border border-gray-150 rounded-lg p-5 text-sm min-h-[100px] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-greenDark focus:bg-white transition-all resize-none" 
        style={{ minHeight: minHeight }}
        placeholder={placeholder} 
      />
      
      <div className="absolute left-5 bottom-4 flex items-center gap-1.5 text-[#9CA3AF] cursor-pointer hover:bg-gray-100 transition-colors bg-white px-2 py-1 rounded-lg group-focus-within:bg-white border border-gray-150">
         <Paperclip size={15} />
        <span className="text-[11px] font-medium">إرفاق ملفات</span>
      </div>
    </div>
    {showRequired && (
      <p className="text-[15px] text-[#6B7280] mb-2 font-bold">مطلوبة قبل الإرسال.</p>
    )}
  </div>
);

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-blackq font-bold text-[15px]">{label}:</span>
    <span className="text-[15px] text-[#6B7280] font-medium mb-2">{value}</span>
  </div>
);

const TimelineItem = ({ title, date, isActive = false }: { title: string, date: string, isActive?: boolean }) => (
  <div className="relative flex items-start gap-4 pr-2">
    <div className="flex flex-col items-center">
      <div className={`w-3.5 h-3.5 rounded-full z-10 ${isActive ? 'bg-greenDark' : 'bg-gray-300'}`} />
      <div className="w-[1.5px] h-12 bg-gray-100 -mt-1" />
    </div>
    
    <div className="text-start pb-6">
      <h5 className="text-blackq font-bold text-[18px] mb-1">{title}</h5>
      <p className="text-[18px] text-[#6B7280] font-bold">{date}</p>
    </div>
  </div>
);

const FileAttachment = ({ fileName, fileType }: { fileName: string, fileType: string }) => (
  <div className="border border-gray-100 rounded-[16px] p-3 flex justify-between items-center mb-3">
    
    <div className="text-right">
      <h5 className="text-blackq font-bold text-[15px] mb-1">{fileName}</h5>
      <span className="text-[#6B7280] text-[15px] font-bold">{fileType}</span>
    </div>
    <button className="bg-white border border-gray-150 text-blackq px-4 py-2 rounded-xl text-[15px] font-bold hover:bg-gray-50 transition-colors">
      نسخ الاسم
    </button>
  </div>
);

const ClaimsBox = ({ title, claims }: { title: string, claims: string[] }) => (
  <div className="bg-[#F9FAFB] border border-gray-50 rounded-[20px] p-5 mt-4">
    <h4 className="text-[#050B2B] font-bold text-[15px] mb-3 text-right">{title}</h4>
    <div className="space-y-2">
      {claims.map((claim, index) => (
        <p key={index} className="text-[#6B7280] text-[13px] text-right leading-relaxed">
          {claim}
        </p>
      ))}
    </div>
  </div>
);
const options = [
        { value: "refund", label: "استرداد كامل للمبلغ" },
        { value: "partial", label: "تعويض جزئي" },
        { value: "reject", label: "رفض الاعتراض" },
        { value: "other", label: "قرار آخر..." },
    ];

export default function ComplaintDetailsDrawer({ isOpen, onClose }: ComplaintDetailsDrawerProps) {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();
  
    return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="تفاصيل النزاع"
      maxWidth="1300px"
      side={dir === 'rtl' ? 'left' : 'right'}
    >
        <div className="flex items-center pb-4 gap-1 text-xs text-[#80878B]">
        <span>2026-02-15</span> • <span>شکوى مشتري</span> • <span>ORD-45892</span> • <span>DSP-1023</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10 text-start">
        {/* Right Column */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-transparent border border-gray-150 rounded-[24px] p-6 text-start">
            <div className="flex justify-between items-start mb-4">
              <div className="text-right">
                <p className="text-[18px] text-[#6B7280] font-extrabold mb-1">رقم النزاع</p>
                <h3 className="text-blackq text-xl font-extrabold">DSP-1023</h3>
              </div>
              <span className="bg-transparent text-[#9A3412] text-sm font-bold px-4 py-1.5 rounded-full border border-[#FED7AA]">
                مفتوحة
              </span>
            </div>

            <p className="text-[18px] text-[#6B7280] font-extrabold mb-6 text-start">
              نوع: شكوى مشتري • طلب: ORD-45892
            </p>

            <div className="grid grid-cols-2 gap-3">

              <div className="border border-gray-100 rounded-2xl p-4 flex flex-col items-start">
                <span className="text-[18px] text-[#6B7280] font-extrabold mb-2">قيمة الطلب</span>
                <span className="text-[#050B2B] font-bold text-lg">$260</span>
              </div>

              <div className="border border-gray-100 rounded-2xl p-4 flex flex-col items-start">
                <span className="text-[18px] text-[#6B7280] font-extrabold mb-2">متنازع عليه</span>
                <span className="text-[#050B2B] font-bold text-lg">$260</span>
              </div>

              <div className="border border-gray-100 rounded-2xl p-4 flex flex-col items-start">
                <span className="text-[18px] text-[#6B7280] font-extrabold mb-2">تسليم</span>
                <span className="text-[#050B2B] font-bold text-md leading-tight text-right">لم يتم التسليم</span>
              </div>

              <div className="border border-gray-100 rounded-2xl p-4 flex flex-col items-start">
                <span className="text-[18px] text-[#6B7280] font-extrabold mb-2">الأموال</span>
                <span className="text-[#050B2B] font-bold text-lg">مُجمّدة</span>
              </div>

            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm dir-rtl text-start">
            <h3 className="text-blackq font-bold text-lg mb-4">الأطراف</h3>

            <div className="space-y-4">
              <div className="border border-gray-100 rounded-[20px] p-4 relative">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-start">
                    <p className="text-[18px] text-blackq font-extrabold mb-1">المشتري</p>
                    <h4 className="text-[18px] text-blackq font-extrabold">محمد علي</h4>
                    <span className="text-[18px] text-[#6B7280] font-extrabold">(BUY-1182)</span>
                  </div>
                  <span className="bg-[#DBEAFE] text-[#166534] text-[18px] font-bold px-3 py-1 rounded-full border border-[#BBF7D0]">
                    Rating 4.7
                  </span>
                </div>
      
                  <div className="flex gap-4 justify-center mt-3 mb-3">
                    <span className="bg-gray-50 border border-gray-100 text-blackq text-[18px] px-6 py-2 rounded-xl font-medium">Refund: 1</span>
                    <span className="bg-gray-50 border border-gray-100 text-blackq text-[18px] px-6 py-2 rounded-xl font-medium">نزاعات: 2</span>
                    <span className="bg-gray-50 border border-gray-100 text-blackq text-[18px] px-6 py-2 rounded-xl font-medium">طلبات: 28</span>
                  </div>
                  <p className="text-[18px] text-[#6B7280] font-extrabold">Risk: 35/100</p>
                </div>

                <div className="border border-gray-100 rounded-[20px] p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-start">
                      <p className="text-[18px] text-blackq font-extrabold mb-1">البائع</p>
                      <h4 className="text-[18px] text-blackq font-extrabold">شركة التقنية الحديثة</h4>
                      <span className="text-[18px] text-[#6B7280] font-extrabold">(MER-220)</span>
                    </div>
                    <span className="bg-[#DBEAFE] text-[#166534] text-[18px] font-bold px-3 py-1 rounded-full border border-[#BBF7D0]">
                        Rating 4.7
                      </span>
                  </div>
      
                  <div className="flex gap-2 justify-center mt-3 mb-3">
                    <span className="bg-gray-50 border border-gray-100 text-blackq text-[18px] px-6 py-2 rounded-xl font-medium">تحذيرات: 1</span>
                    <span className="bg-gray-50 border border-gray-100 text-blackq text-[18px] px-6 py-2 rounded-xl font-medium">نزاعات: 5</span>
                    <span className="bg-gray-50 border border-gray-100 text-blackq text-[18px] px-6 py-2 rounded-xl font-medium">خدمات: 12</span>
                  </div>
                  <p className="text-[18px] text-[#6B7280] font-extrabold">Risk: 70/100</p>
                </div>

                <div className="bg-[#F8FAFC] border border-gray-50 rounded-[20px] p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-start">
                      <p className="text-[18px] text-blackq font-extrabold mb-1">بيانات الأفلييت</p>
                      <h4 className="text-[18px] text-blackq font-extrabold">أحمد سالم</h4>
                      <span className="text-[18px] text-[#6B7280] font-extrabold">(AFF-1772)</span>
                    </div>
                    <span className="bg-[#DBEAFE] text-[#1D4ED8] text-[18px] font-bold px-3 py-1 rounded-full border border-[#BFDBFE]">
                      عمولة مجمّدة
                    </span>
                  </div>
                  <p className="text-[18px] text-[#6B7280] font-extrabold">نسبة العمولة: 18%</p>
                </div>
              </div>
            </div>

          {/* Details & Timeline */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 dir-rtl text-right">
            
            <div className="mb-6">
              <h3 className="text-[#050B2B] font-bold text-lg mb-4">تفاصيل الطلب</h3>
              <div className="space-y-3">
                <DetailRow label="الخدمة" value="أتمتة رسائل واتساب للعملاء" />
                <DetailRow label="تاريخ الطلب" value="2026-02-12" />
                <DetailRow label="موعد التسليم" value="2026-02-14" />
                <DetailRow label="إضافات" value="دعم شهر، ربط Google Sheets" />
              </div>
            </div>

            <div className="bg-[#F9FAFB] border border-gray-50 rounded-[20px] p-6 mt-4">
              <h4 className="text-blackq font-bold text-[18px] mb-6 text-start">Timeline</h4>
              
              <div className="flex flex-col">
                <TimelineItem 
                  title="تم إنشاء الطلب" 
                  date="2026-02-12 10:12" 
                  isActive 
                />
                <TimelineItem 
                  title="تم الدفع وتجميد المبلغ" 
                  date="2026-02-12 10:13" 
                  isActive 
                />
                <TimelineItem 
                  title="طلب العميل تحديث على حالة التنفيذ" 
                  date="2026-02-13 16:20" 
                  isActive 
                />
                <TimelineItem 
                  title="تم فتح نزاع بواسطة العميل" 
                  date="2026-02-15 09:10" 
                  isActive 
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 dir-rtl text-right">
            <h3 className="text-[#050B2B] font-bold text-lg mb-4">الأدلة والمرفقات</h3>
            <div className="mb-6">
              <FileAttachment fileName="screenshot_error.png" fileType="صورة" />
              <FileAttachment fileName="requirements.pdf" fileType="ملف" />
            </div>

            <ClaimsBox 
              title="ادعاءات المشتري" 
              claims={[
                "تأخير عن موعد التسليم",
                "لم يتم تسليم أي جزء قابل للاستخدام",
                "لا توجد متابعة واضحة"
              ]} 
            />

            <ClaimsBox 
              title="ادعاءات البائع" 
              claims={[
                "البيانات ناقصة / Token غير صالح",
                "تم طلب معلومات إضافية ولم تصل"
              ]} 
            />
          </div>
        </div>

         {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          
          <ChatSection />

          <div className="bg-transparent rounded-[24px] p-6 shadow-sm border border-gray-150 text-start">
            <div className="flex justify-between items-start mb-6">
              <div className="text-start">
                <h3 className="font-bold text-xl text-blackq">اتخاذ قرار</h3>
                <p className="text-md text-[#6B7280] mt-1">قرار واضح + رسائل للطرفين (إلزامي)</p>
              </div>
              <span className="bg-[#DBEAFE] text-[#1D4ED8] text-[15px] px-3 py-1 rounded-full font-extrabold border border-[#BFDBFE]">
                Admin Action
              </span>
            </div>

            <div className="space-y-5">
            <DecisionInput 
              label="رسالة للمشتري (ستظهر له)" 
              placeholder="اكتب رسالة واضحة للمشتري... مثال: تم مراجعة الأدلة وتم استرداد مبلغ ..." 
              showRequired 
            />

            <DecisionInput 
              label="رسالة للبائع (ستظهر له)" 
              placeholder="اكتب رسالة واضحة للبائع... مثال: تم اعتماد تعويض جزئي بسبب ..." 
              showRequired 
            />

            <DecisionInput 
              label="ملاحظة داخلية (للأدمن فقط)" 
              placeholder="سبب القرار / نقاط الأدلة / أي ملاحظة داخلية..." 
            />
          </div>

            <button className="w-[50%] mx-auto block bg-greenDark text-white py-4 rounded-[18px] font-bold text-[18px] hover:bg-[#286d49] transition-all shadow-md mt-4">
              اعتماد القرار
            </button>

            <div className="space-y-4 p-4">
              <label className="block text-[14px] font-bold text-blackq text-start mr-1">
                نوع القرار
              </label>
              <CustomSelect
                options={options}
                className="w-32"
                placeholder="اختر قرار..."
                value={options[0]}
              />
            </div>

            <div className="bg-[#F9FAFB] rounded-[24px] p-6 space-y-4 border border-gray-150 text-start" >
              <h4 className="font-bold text-[14px] mb-3 text-blackq">إجراءات إضافية</h4>
              {[
                { id: 'warn', label: 'إرسال تحذير رسمي للبائع' },
                { id: 'suspend', label: 'إيقاف حساب البائع مؤقتاً (7 أيام)' },
                { id: 'stop', label: 'إيقاف الخدمة لحين المراجعة' },
                { id: 'freeze', label: 'تجميد عمولة الأفلييت لهذا الطلب', checked: true },
              ].map((action) => (
                <div key={action.id} className="flex items-center justify-start gap-3.5 mb-3">
                  <input 
                    type="checkbox" 
                    defaultChecked={action.checked}
                    id={action.id}
                    className="
                      w-[18px] h-[18px] 
                      cursor-pointer
                      rounded-[5px]
                      border-[1.5px] border-[#6B7280]
                      bg-white
                      checked:bg-greenDark checked:border-greenDark
                      accent-white 
                      transition-all duration-150
                      appearance-none
                      checked:before:content-['✓'] checked:before:text-white checked:before:text-[12px] checked:before:font-black checked:before:flex checked:before:items-center checked:before:justify-center
                    "
                  />
                  <label htmlFor={action.id} className="text-sm font-bold text-blackq cursor-pointer selection:bg-none">
                    {action.label}
                  </label>
                </div>
              ))}
            </div>
             </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 mt-6">
              <h4 className="font-bold text-[16px] text-[#050B2B] mb-2 text-start">
                سجل القرارات
              </h4>
              <p className="text-[14px] text-[#6B7280] text-start ">
                لا توجد قرارات بعد لهذا النزاع.
              </p>
            </div>
        </div>
      </div>
    </Drawer>
  );
}
