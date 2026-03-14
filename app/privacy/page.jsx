"use client";

import Link from "next/link";
import { useApp } from "../contex/AppContext";

const MONTHS = {
  uz: ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  ru: ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"],
};

const T = {
  badge:    { uz: "Rasmiy hujjat",          en: "Official document",       ru: "Официальный документ"    },
  heading:  { uz: "Maxfiylik Siyosati",     en: "Privacy Policy",          ru: "Политика конфиденциальности" },
  updated:  { uz: "So'nggi yangilanish:",   en: "Last updated:",           ru: "Последнее обновление:"   },
  question: { uz: "Savollaringiz bormi?",   en: "Have questions?",         ru: "Есть вопросы?"           },
  contact:  { uz: "Maxfiylik siyosati bo'yicha savollar uchun biz bilan bog'laning.", en: "Contact us for any questions regarding the privacy policy.", ru: "Свяжитесь с нами по любым вопросам, касающимся политики конфиденциальности." },
  telegram: { uz: "Telegram kanalimiz",     en: "Our Telegram",            ru: "Наш Telegram"            },
  terms:    { uz: "📋 Foydalanish shartlarini ko'rish", en: "📋 View Terms of Use", ru: "📋 Условия использования" },
  back:     { uz: "← Bosh sahifaga qaytish", en: "← Back to home",        ru: "← На главную"            },
};

const sections = {
  uz: [
    { title: "1. Umumiy ma'lumot", content: "Ushbu Maxfiylik Siyosati Dunyo Belbog'li Kurashi va Bel Olish Kurashi Asotsiyatsiyasi (WKB&BOKA) rasmiy veb-sayti orqali to'planadigan shaxsiy ma'lumotlar bilan qanday muomala qilinishi haqida ma'lumot beradi. Saytimizdan foydalanib, siz ushbu siyosat shartlarini qabul qilasiz." },
    { title: "2. Qanday ma'lumotlar to'planadi", content: "Biz quyidagi ma'lumotlarni to'plashimiz mumkin: ism va familiya, elektron pochta manzili, telefon raqami, saytga tashrif vaqti va sahifalar, brauzer turi va qurilma ma'lumotlari. Bu ma'lumotlar faqat sayt xizmatlari sifatini yaxshilash maqsadida ishlatiladi." },
    { title: "3. Ma'lumotlar qanday ishlatiladi", content: "To'plangan ma'lumotlar quyidagi maqsadlarda ishlatiladi: yangiliklar va e'lonlarni yuborish, musobaqalar haqida xabardor qilish, sayt xizmatlarini takomillashtirish, foydalanuvchilar so'rovlariga javob berish. Biz sizning ma'lumotlaringizni uchinchi shaxslarga sotmaymiz yoki ijaraga bermaymiz." },
    { title: "4. Cookie fayllar", content: "Saytimiz cookie fayllardan foydalanadi. Cookie — bu saytni yangi tashrifingizda sizni tanish imkonini beruvchi kichik matn fayllari. Brauzer sozlamalaringiz orqali cookie fayllarni o'chirib qo'yishingiz mumkin, lekin bu saytning ba'zi funksiyalarini cheklashi mumkin." },
    { title: "5. Ma'lumotlar xavfsizligi", content: "Biz sizning shaxsiy ma'lumotlaringizni himoya qilish uchun zamonaviy xavfsizlik usullaridan foydalanamiz. Barcha ma'lumotlar shifrlangan holda saqlanadi va faqat vakolatli xodimlargina ularga kirish huquqiga ega." },
    { title: "6. Uchinchi tomon xizmatlari", content: "Saytimiz ijtimoiy tarmoqlar (Telegram, Instagram, YouTube, Facebook) va boshqa uchinchi tomon xizmatlari bilan bog'liq bo'lishi mumkin. Ushbu xizmatlarning o'z maxfiylik siyosati mavjud bo'lib, biz ular uchun mas'ul emasmiz." },
    { title: "7. Foydalanuvchi huquqlari", content: "Siz o'zingiz haqidagi ma'lumotlarga kirish, ularni o'zgartirish yoki o'chirish huquqiga egasiz. Bunday so'rov bilan info@kurash.uz elektron pochta manziliga murojaat qilishingiz mumkin. Biz 30 ish kuni ichida javob beramiz." },
    { title: "8. Siyosatga o'zgartirishlar", content: "Biz ushbu Maxfiylik Siyosatini vaqti-vaqti bilan yangilashimiz mumkin. O'zgarishlar saytda e'lon qilinadi. Saytdan foydalanishni davom ettirishingiz yangi shartlarni qabul qilganingizni bildiradi." },
  ],
  en: [
    { title: "1. General Information", content: "This Privacy Policy provides information about how personal data collected through the official website of the World Kurash Belt Wrestling Association (WKB&BOKA) is handled. By using our site, you agree to the terms of this policy." },
    { title: "2. What Data is Collected", content: "We may collect the following data: name and surname, email address, phone number, visit time and pages, browser type and device information. This data is used solely to improve the quality of site services." },
    { title: "3. How Data is Used", content: "Collected data is used for: sending news and announcements, notifying about competitions, improving site services, responding to user requests. We do not sell or rent your data to third parties." },
    { title: "4. Cookie Files", content: "Our site uses cookies. Cookies are small text files that allow the site to recognize you on your next visit. You can disable cookies in your browser settings, but this may limit some site functions." },
    { title: "5. Data Security", content: "We use modern security methods to protect your personal data. All data is stored in encrypted form and only authorized personnel have access to it." },
    { title: "6. Third-Party Services", content: "Our site may be linked to social networks (Telegram, Instagram, YouTube, Facebook) and other third-party services. These services have their own privacy policies, and we are not responsible for them." },
    { title: "7. User Rights", content: "You have the right to access, modify or delete information about yourself. For such requests, please contact info@kurash.uz. We will respond within 30 business days." },
    { title: "8. Policy Changes", content: "We may update this Privacy Policy from time to time. Changes will be announced on the site. Continued use of the site means you accept the new terms." },
  ],
  ru: [
    { title: "1. Общая информация", content: "Настоящая Политика конфиденциальности предоставляет информацию о том, как обрабатываются персональные данные, собираемые через официальный сайт Всемирной Ассоциации Борьбы Кураш (WKB&BOKA). Используя наш сайт, вы принимаете условия данной политики." },
    { title: "2. Какие данные собираются", content: "Мы можем собирать следующие данные: имя и фамилию, адрес электронной почты, номер телефона, время посещения и страницы, тип браузера и информацию об устройстве. Эти данные используются исключительно для улучшения качества услуг сайта." },
    { title: "3. Как используются данные", content: "Собранные данные используются для: отправки новостей и объявлений, уведомления о соревнованиях, улучшения услуг сайта, ответа на запросы пользователей. Мы не продаём и не сдаём в аренду ваши данные третьим лицам." },
    { title: "4. Файлы Cookie", content: "Наш сайт использует файлы cookie. Cookie — это небольшие текстовые файлы, которые позволяют сайту узнать вас при следующем посещении. Вы можете отключить cookie в настройках браузера, но это может ограничить некоторые функции сайта." },
    { title: "5. Безопасность данных", content: "Мы используем современные методы обеспечения безопасности для защиты ваших персональных данных. Все данные хранятся в зашифрованном виде, и только уполномоченные сотрудники имеют к ним доступ." },
    { title: "6. Сторонние сервисы", content: "Наш сайт может быть связан с социальными сетями (Telegram, Instagram, YouTube, Facebook) и другими сторонними сервисами. У этих сервисов есть собственная политика конфиденциальности, и мы не несём за них ответственности." },
    { title: "7. Права пользователей", content: "Вы имеете право на доступ, изменение или удаление информации о себе. Для таких запросов свяжитесь с нами по адресу info@kurash.uz. Мы ответим в течение 30 рабочих дней." },
    { title: "8. Изменения политики", content: "Мы можем периодически обновлять настоящую Политику конфиденциальности. Изменения будут объявлены на сайте. Продолжение использования сайта означает принятие новых условий." },
  ],
};

const TgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

export default function PrivacyPage() {
  const { darkMode, language } = useApp();

  const now   = new Date();
  const date  = `${now.getDate()} ${MONTHS[language][now.getMonth()]} ${now.getFullYear()}`;
  const data  = sections[language];

  const bg      = darkMode ? "bg-[#0a1628]"  : "bg-[#f8f9fc]";
  const cardBg  = darkMode ? "bg-[#0d1f3c] border-blue-900" : "bg-white border-gray-100";
  const titleC  = darkMode ? "text-blue-100"  : "text-[#0f2a5e]";
  const textC   = darkMode ? "text-blue-200/70" : "text-[#4a5568]";
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
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {data.map((s, i) => (
            <div key={i} className={`${cardBg} border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm transition-colors duration-300`}>
              <h2 className={`text-[14px] sm:text-[16px] lg:text-[18px] font-bold ${titleC} mb-2 sm:mb-3`}>
                {s.title}
              </h2>
              <p className={`${textC} text-[12px] sm:text-[13px] lg:text-[14px] leading-relaxed`}>
                {s.content}
              </p>
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
          <Link href="/terms" className={`${linkC} font-medium transition-colors`}>{T.terms[language]}</Link>
          <span className="hidden sm:block text-gray-300">|</span>
          <Link href="/" className={`${linkC} font-medium transition-colors`}>{T.back[language]}</Link>
        </div>
      </div>
    </main>
  );
}