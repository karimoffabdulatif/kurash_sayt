"use client";

import Link from "next/link";
import { useApp } from "../contex/AppContext";

const MONTHS = {
  uz: ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  ru: ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"],
};

const T = {
  badge:    { uz: "Rasmiy hujjat",             en: "Official document",        ru: "Официальный документ"     },
  heading:  { uz: "Foydalanish Shartlari",     en: "Terms of Use",             ru: "Условия использования"    },
  updated:  { uz: "So'nggi yangilanish:",       en: "Last updated:",            ru: "Последнее обновление:"    },
  intro:    { uz: "Saytimizdan foydalanishdan oldin ushbu shartlarni diqqat bilan o'qib chiqing. Saytdan foydalanish ushbu shartlarni qabul qilganingizni bildiradi.", en: "Please read these terms carefully before using our website. By using the site, you agree to these terms.", ru: "Пожалуйста, внимательно прочитайте эти условия перед использованием нашего сайта. Используя сайт, вы соглашаетесь с этими условиями." },
  question: { uz: "Savollaringiz bormi?",       en: "Have questions?",          ru: "Есть вопросы?"            },
  contact:  { uz: "Foydalanish shartlari bo'yicha savollar uchun biz bilan bog'laning.", en: "Contact us for any questions regarding the terms of use.", ru: "Свяжитесь с нами по любым вопросам, касающимся условий использования." },
  telegram: { uz: "Telegram kanalimiz",         en: "Our Telegram",             ru: "Наш Telegram"             },
  privacy:  { uz: "🔒 Maxfiylik siyosatini ko'rish", en: "🔒 View Privacy Policy", ru: "🔒 Политика конфиденциальности" },
  back:     { uz: "← Bosh sahifaga qaytish",   en: "← Back to home",          ru: "← На главную"             },
};

const sections = {
  uz: [
    { title: "Shartlarni qabul qilish", content: "Ushbu saytdan foydalanib, siz quyida keltirilgan Foydalanish Shartlarini to'liq va so'zsiz qabul qilasiz. Agar siz ushbu shartlar bilan rozi bo'lmasangiz, saytdan foydalanishni to'xtating. WKB&BOKA ushbu shartlarni istalgan vaqtda o'zgartirish huquqini o'zida saqlab qoladi." },
    { title: "Saytdan foydalanish", content: "Sayt faqat qonuniy maqsadlarda ishlatilishi mumkin. Quyidagi harakatlar taqiqlanadi: sayt tizimiga ruxsatsiz kirish, zararli dasturiy ta'minot tarqatish, boshqa foydalanuvchilarga zarar yetkazish, sayt ma'lumotlarini tijorat maqsadlarda ruxsatsiz ishlatish." },
    { title: "Intellektual mulk", content: "Saytdagi barcha materiallar — matnlar, rasmlar, logotiplar, videolar va boshqa kontentlar WKB&BOKA mulki hisoblanadi va mualliflik huquqi bilan himoyalangan. Materiallarga havola qilish mumkin, lekin ularni to'liq nusxalash yoki tijorat maqsadida ishlatish uchun yozma ruxsat talab etiladi." },
    { title: "Ma'lumotlarning to'g'riligi", content: "Biz saytdagi ma'lumotlarning to'g'ri va dolzarb bo'lishiga harakat qilamiz. Biroq, musobaqa natijalari, jadvallar va boshqa ma'lumotlar o'zgarishi mumkin. Eng so'nggi rasmiy ma'lumot uchun federatsiya bilan to'g'ridan-to'g'ri bog'lanish tavsiya etiladi." },
    { title: "Tashqi havolalar", content: "Saytimizda uchinchi tomon saytlariga havolalar bo'lishi mumkin. Bu havolalar foydalanuvchilarga qulaylik uchun joylashtirilgan. Biz ushbu tashqi saytlarning mazmuni yoki maxfiyligi uchun javobgar emasmiz." },
    { title: "Mas'uliyatni cheklash", content: "WKB&BOKA saytdagi ma'lumotlarning to'liqligi, aniqligi yoki muayyan maqsadga muvofiqligi uchun kafolat bermaydi. Saytdan foydalanish natijasida yuzaga kelishi mumkin bo'lgan to'g'ridan-to'g'ri yoki bilvosita zararlar uchun mas'uliyat qabul qilinmaydi." },
    { title: "Foydalanuvchi tomonidan yuklangan kontent", content: "Agar sayt foydalanuvchilarga kontent yuklash imkonini bersa, yuklangan materiallar uchun foydalanuvchi to'liq mas'uliyat oladi. Noqonuniy, haqoratli yoki mualliflik huquqini buzuvchi kontentlar darhol o'chiriladi." },
    { title: "Qo'llaniladigan qonunlar", content: "Ushbu shartlar O'zbekiston Respublikasining amaldagi qonunchiligiga muvofiq tartibga solinadi. Har qanday nizolar O'zbekiston Respublikasi sudlarida hal etiladi." },
    { title: "O'zgartirishlar", content: "WKB&BOKA ushbu Foydalanish Shartlarini oldindan ogohlantirmasdan o'zgartirish huquqini o'zida saqlab qoladi. O'zgartirishlar saytda e'lon qilingan paytdan boshlab kuchga kiradi. Saytdan foydalanishni davom ettirishingiz yangilangan shartlarni qabul qilganingizni bildiradi." },
  ],
  en: [
    { title: "Acceptance of Terms", content: "By using this website, you fully and unconditionally accept the Terms of Use listed below. If you do not agree with these terms, please stop using the site. WKB&BOKA reserves the right to modify these terms at any time." },
    { title: "Use of the Site", content: "The site may only be used for lawful purposes. The following actions are prohibited: unauthorized access to the site system, spreading malicious software, harming other users, and unauthorized commercial use of site data." },
    { title: "Intellectual Property", content: "All materials on the site — texts, images, logos, videos and other content — are the property of WKB&BOKA and are protected by copyright. Linking to materials is permitted, but full copying or commercial use requires written permission." },
    { title: "Accuracy of Information", content: "We strive to keep the information on the site accurate and up to date. However, competition results, schedules and other data may change. For the latest official information, it is recommended to contact the federation directly." },
    { title: "External Links", content: "The site may contain links to third-party websites. These links are provided for user convenience. We are not responsible for the content or privacy of these external sites." },
    { title: "Limitation of Liability", content: "WKB&BOKA does not guarantee the completeness, accuracy or suitability of the information on the site for any particular purpose. We accept no liability for any direct or indirect damages arising from the use of the site." },
    { title: "User-Generated Content", content: "If the site allows users to upload content, the user takes full responsibility for the uploaded materials. Illegal, offensive or copyright-infringing content will be removed immediately." },
    { title: "Applicable Law", content: "These terms are governed by the laws of the Republic of Uzbekistan. Any disputes shall be resolved in the courts of the Republic of Uzbekistan." },
    { title: "Changes", content: "WKB&BOKA reserves the right to change these Terms of Use without prior notice. Changes take effect from the moment they are published on the site. Continued use of the site means you accept the updated terms." },
  ],
  ru: [
    { title: "Принятие условий", content: "Используя данный сайт, вы полностью и безоговорочно принимаете нижеуказанные Условия использования. Если вы не согласны с этими условиями, прекратите использование сайта. WKB&BOKA оставляет за собой право изменять эти условия в любое время." },
    { title: "Использование сайта", content: "Сайт может использоваться только в законных целях. Запрещены: несанкционированный доступ к системе сайта, распространение вредоносного ПО, причинение вреда другим пользователям, несанкционированное коммерческое использование данных сайта." },
    { title: "Интеллектуальная собственность", content: "Все материалы на сайте — тексты, изображения, логотипы, видео и другой контент — являются собственностью WKB&BOKA и защищены авторским правом. Ссылки на материалы допускаются, но полное копирование или коммерческое использование требует письменного разрешения." },
    { title: "Точность информации", content: "Мы стремимся поддерживать информацию на сайте точной и актуальной. Однако результаты соревнований, расписания и другие данные могут изменяться. Для получения последней официальной информации рекомендуется обращаться непосредственно в федерацию." },
    { title: "Внешние ссылки", content: "Сайт может содержать ссылки на сторонние сайты. Эти ссылки предоставлены для удобства пользователей. Мы не несём ответственности за содержание или политику конфиденциальности этих внешних сайтов." },
    { title: "Ограничение ответственности", content: "WKB&BOKA не гарантирует полноту, точность или пригодность информации на сайте для какой-либо конкретной цели. Мы не несём ответственности за прямой или косвенный ущерб, возникший в результате использования сайта." },
    { title: "Контент пользователей", content: "Если сайт позволяет пользователям загружать контент, пользователь несёт полную ответственность за загруженные материалы. Незаконный, оскорбительный или нарушающий авторские права контент будет немедленно удалён." },
    { title: "Применимое право", content: "Настоящие условия регулируются законодательством Республики Узбекистан. Любые споры разрешаются в судах Республики Узбекистан." },
    { title: "Изменения", content: "WKB&BOKA оставляет за собой право изменять настоящие Условия использования без предварительного уведомления. Изменения вступают в силу с момента их публикации на сайте. Продолжение использования сайта означает принятие обновлённых условий." },
  ],
};

const TgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

export default function TermsPage() {
  const { darkMode, language } = useApp();

  const now    = new Date();
  const date   = `${now.getDate()} ${MONTHS[language][now.getMonth()]} ${now.getFullYear()}`;
  const data   = sections[language];

  const bg      = darkMode ? "bg-[#0a1628]"  : "bg-[#f8f9fc]";
  const cardBg  = darkMode ? "bg-[#0d1f3c] border-blue-900" : "bg-white border-gray-100";
  const numBg   = darkMode ? "bg-blue-900/50 text-blue-200" : "bg-[#0f2a5e]/10 text-[#0f2a5e]";
  const titleC  = darkMode ? "text-blue-100"  : "text-[#0f2a5e]";
  const textC   = darkMode ? "text-blue-200/70" : "text-[#4a5568]";
  const introBg = darkMode ? "bg-blue-900/30 border-blue-800" : "bg-blue-50 border-blue-100";
  const introC  = darkMode ? "text-blue-200"  : "text-[#0f2a5e]";
  const linkC   = darkMode ? "text-blue-400 hover:text-blue-200" : "text-blue-500 hover:text-blue-700";

  return (
    <main className={`min-h-screen ${bg} transition-colors duration-300`}>

      {/* Hero */}
      <div className="bg-blue-700 text-white py-10 sm:py-16 lg:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-blue-300 mb-4 sm:mb-6">
            {T.badge[language]}
          </div>
          <h1 className="text-[22px] sm:text-[34px] lg:text-[46px] font-black leading-tight tracking-tight mb-3 sm:mb-4">
            {T.heading[language]}
          </h1>
          <p className="text-blue-200/70 text-[12px] sm:text-[14px] lg:text-[15px] leading-relaxed">
            {T.updated[language]} {date}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

        {/* Intro banner */}
        <div className={`${introBg} border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 flex gap-3 sm:gap-4 items-start`}>
          <span className="text-xl sm:text-2xl flex-shrink-0">📋</span>
          <p className={`${introC} text-[12px] sm:text-[13px] lg:text-[14px] leading-relaxed`}>
            {T.intro[language]}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4 sm:space-y-6">
          {data.map((s, i) => (
            <div key={i} className={`${cardBg} border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm transition-colors duration-300`}>
              <div className="flex items-start gap-3 sm:gap-4">
                <span className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${numBg} text-[11px] sm:text-[12px] font-black flex items-center justify-center`}>
                  {i + 1}
                </span>
                <div>
                  <h2 className={`text-[14px] sm:text-[16px] lg:text-[18px] font-bold ${titleC} mb-1.5 sm:mb-2`}>
                    {s.title}
                  </h2>
                  <p className={`${textC} text-[12px] sm:text-[13px] lg:text-[14px] leading-relaxed`}>
                    {s.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact box */}
        <div className="mt-8 sm:mt-10 bg-blue-700 text-white rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center">
          <h3 className="font-bold text-[15px] sm:text-[17px] lg:text-[18px] mb-2">{T.question[language]}</h3>
          <p className="text-blue-200/70 text-[12px] sm:text-[13px] mb-4 sm:mb-5">{T.contact[language]}</p>
          <a href="https://t.me/kurash_uz" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 active:scale-95 text-white text-[12px] sm:text-[13px] font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-200">
            <TgIcon />{T.telegram[language]}
          </a>
        </div>

        {/* Bottom links */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-[12px] sm:text-[13px]">
          <Link href="/privacy" className={`${linkC} font-medium transition-colors`}>{T.privacy[language]}</Link>
          <span className="hidden sm:block text-gray-300">|</span>
          <Link href="/" className={`${linkC} font-medium transition-colors`}>{T.back[language]}</Link>
        </div>
      </div>
    </main>
  );
}