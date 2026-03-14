"use client";

import Image from "next/image";
import { useState } from "react";
import { useApp } from "../contex/AppContext";

const T = {
  label:    { uz: "Murojaat",                          en: "Address",                        ru: "Обращение"                          },
  name:     { uz: "Shavkat Mirziyoyev",                en: "Shavkat Mirziyoyev",             ru: "Шавкат Мирзиёев"                    },
  role1:    { uz: "O'zbekiston Respublikasi Prezidenti,", en: "President of the Republic of Uzbekistan,", ru: "Президент Республики Узбекистан,"   },
  role2:    { uz: "Xalqaro Kurash assotsiatsiyasining Faxriy prezidenti", en: "Honorary President of the International Kurash Association", ru: "Почётный президент Международной ассоциации Кураш" },
  quote1:   { uz: "Qit'amiz sportchilari O'zbek kurashi bo'yicha Yozgi Osiyo o'yinlarida musobaqa o'tkazmoqdalar.", en: "Athletes of our continent are competing in Uzbek Kurash at the Asian Summer Games.", ru: "Спортсмены нашего континента соревнуются на Летних Азиатских играх по узбекскому курашу." },
  quote2:   {
    uz: "Bugun «Halol», «Girrom», «Chala» va «Yonbosh» so'zlari jahon sport maydonlarida yangramoqda va butun dunyoda o'zbek xalqining va O'zbekistonning nomini ulug'lamoqda!",
    en: "Today, the words «Halol», «Girrom», «Chala» and «Yonbosh» resound on world sports arenas, glorifying the name of the Uzbek people and Uzbekistan throughout the world!",
    ru: "Сегодня слова «Халол», «Гирром», «Чала» и «Ёнбош» звучат на мировых спортивных аренах и прославляют имя узбекского народа и Узбекистана во всём мире!",
  },
  halol:    { uz: "«Halol»",  en: "«Halol»",  ru: "«Халол»"  },
  girrom:   { uz: "«Girrom»", en: "«Girrom»", ru: "«Гирром»" },
  chala:    { uz: "«Chala»",  en: "«Chala»",  ru: "«Чала»"   },
  yonbosh:  { uz: "«Yonbosh»",en: "«Yonbosh»",ru: "«Ёнбош»"  },
};

export default function President() {
  const { darkMode, language } = useApp();
  const [imgError, setImgError] = useState(false);

  const bg        = darkMode ? "bg-[#0d1f3c]"  : "bg-[#f8f9fc]";
  const textMain  = darkMode ? "text-white"     : "text-[#1a1a2e]";
  const textSub   = darkMode ? "text-blue-200"  : "text-[#5a6a7a]";
  const accent    = darkMode ? "text-blue-300"  : "text-[#1a3a6b]";
  const border    = darkMode ? "border-white/20": "border-white";

  return (
    <section className={`relative w-full overflow-hidden ${bg} py-10 md:py-16 lg:py-20 px-4 md:px-8 lg:px-4 transition-colors duration-300`}>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a3a6b' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      />
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#1a3a6b] to-transparent opacity-20" />

      <div className="relative max-w-5xl mx-auto">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8 md:mb-10 lg:mb-12">
          <div className="h-px w-8 bg-blue-400" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">
            {T.label[language]}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-10 lg:gap-16">

          {/* Person info */}
          <div className="flex flex-col items-center text-center w-full lg:min-w-[180px] lg:w-auto">
            <div className="relative mb-4 md:mb-5">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#1a3a6b] to-[#c0392b] opacity-20 blur-sm" />
              <div className={`relative w-[140px] h-[140px] md:w-[170px] md:h-[170px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden border-4 ${border} shadow-xl`}>
                {imgError ? (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a3a6b] to-[#2c5282] flex items-center justify-center">
                    <span className="text-white text-4xl font-bold select-none">Ш</span>
                  </div>
                ) : (
                  <Image src="/pres3.jpg" alt="Shavkat Mirziyoyev" fill className="object-cover" onError={() => setImgError(true)} />
                )}
              </div>
            </div>

            <h3 className={`font-bold ${textMain} text-[14px] md:text-[15px] leading-snug mb-2`}>
              {T.name[language]}
            </h3>

            <div className={`text-[12px] md:text-[12.5px] ${textSub} leading-relaxed max-w-[220px] md:max-w-none`}>
              <p>{T.role1[language]}</p>
              <p className="mt-1">{T.role2[language]}</p>
            </div>

            <div className="flex gap-1.5 mt-4 md:mt-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a3a6b]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#c0392b]" />
              <span className={`w-1.5 h-1.5 rounded-full bg-[#1a3a6b] opacity-40`} />
            </div>
          </div>

          {/* Dividers */}
          <div className="block lg:hidden w-16 h-px bg-gradient-to-r from-transparent via-[#1a3a6b]/30 to-transparent" />
          <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-[#1a3a6b]/20 to-transparent" />

          {/* Quote */}
          <div className="flex-1 w-full">
            <div
              className={`text-[80px] md:text-[100px] lg:text-[120px] leading-none ${accent} opacity-[0.07] font-serif select-none -mb-20 md:-mb-7 lg:-mb-8 -ml-1 md:-ml-2`}
              aria-hidden="true"
            >"</div>

            <blockquote>
              <p className={`${textMain} text-[18px] md:text-[21px] lg:text-[26px] font-bold leading-snug tracking-tight mb-4 md:mb-5 text-center lg:text-left`}>
                {T.quote1[language]}
              </p>

              <p className={`${textSub} text-[13px] md:text-[15px] lg:text-[16px] leading-relaxed text-center lg:text-left`}>
                {language === "uz" ? (
                  <>
                    Bugun{" "}
                    <span className={`font-semibold ${accent}`}>{T.halol[language]}</span>,{" "}
                    <span className={`font-semibold ${accent}`}>{T.girrom[language]}</span>,{" "}
                    <span className={`font-semibold ${accent}`}>{T.chala[language]}</span>{" "}
                    va{" "}
                    <span className={`font-semibold ${accent}`}>{T.yonbosh[language]}</span>{" "}
                    so'zlari jahon sport maydonlarida yangramoqda va butun dunyoda
                    o'zbek xalqining va O'zbekistonning nomini ulug'lamoqda!
                  </>
                ) : language === "ru" ? (
                  <>
                    Сегодня слова{" "}
                    <span className={`font-semibold ${accent}`}>{T.halol[language]}</span>,{" "}
                    <span className={`font-semibold ${accent}`}>{T.girrom[language]}</span>,{" "}
                    <span className={`font-semibold ${accent}`}>{T.chala[language]}</span>{" "}
                    и{" "}
                    <span className={`font-semibold ${accent}`}>{T.yonbosh[language]}</span>{" "}
                    звучат на мировых спортивных аренах и прославляют имя узбекского народа и Узбекистана во всём мире!
                  </>
                ) : (
                  <>
                    Today, the words{" "}
                    <span className={`font-semibold ${accent}`}>{T.halol[language]}</span>,{" "}
                    <span className={`font-semibold ${accent}`}>{T.girrom[language]}</span>,{" "}
                    <span className={`font-semibold ${accent}`}>{T.chala[language]}</span>{" "}
                    and{" "}
                    <span className={`font-semibold ${accent}`}>{T.yonbosh[language]}</span>{" "}
                    resound on world sports arenas, glorifying the name of the Uzbek people and Uzbekistan throughout the world!
                  </>
                )}
              </p>
            </blockquote>

            <div className="mt-6 md:mt-8 flex items-center gap-4 justify-center lg:justify-start">
              <div className="h-[2px] w-12 bg-[#c0392b]" />
              <div className="h-[2px] w-6 bg-[#1a3a6b] opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}