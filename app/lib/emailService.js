// lib/emailService.js
// Brevo API orqali email yuborish

const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
const SENDER_EMAIL  = "kabdulatif328@gmail.com";
const SENDER_NAME   = "WBK & BOKA";

/* ── Bitta obunchiga email yuborish ── */
export async function sendEmailToSubscriber({ toEmail, toName, newsTitle, newsExcerpt, newsDate, language }) {
  const subjects = {
    uz: `🏆 Yangi yangilik: ${newsTitle}`,
    ru: `🏆 Новость: ${newsTitle}`,
    en: `🏆 New: ${newsTitle}`,
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background:#f8f9fc;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fc;padding:32px 16px;">
        <tr><td align="center">
          <table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,42,94,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:#0f2a5e;padding:28px 32px;text-align:center;">
                <p style="margin:0;color:#93c5fd;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">WBK & BOKA</p>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">
                  ${language === "ru" ? "Новости курьбы на поясах" : language === "en" ? "Belt Wrestling News" : "Kurash yangiliklari"}
                </h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 8px;color:#3b82f6;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">
                  ${language === "ru" ? "НОВАЯ НОВОСТЬ" : language === "en" ? "NEW UPDATE" : "YANGI YANGILIK"}
                </p>
                <h2 style="margin:0 0 16px;color:#0f2a5e;font-size:20px;font-weight:800;line-height:1.3;">
                  ${newsTitle}
                </h2>
                <div style="width:40px;height:3px;background:#0f2a5e;border-radius:2px;margin-bottom:16px;"></div>
                <p style="margin:0 0 24px;color:#64748b;font-size:14px;line-height:1.7;">
                  ${newsExcerpt || ""}
                </p>
                <p style="margin:0 0 24px;color:#94a3b8;font-size:12px;">
                  📅 ${newsDate || ""}
                </p>
                <a href="https://wbkboka.com/newsPage"
                  style="display:inline-block;background:#0f2a5e;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:14px 28px;border-radius:10px;">
                  ${language === "ru" ? "Читать далее →" : language === "en" ? "Read more →" : "Batafsil o'qish →"}
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8f9fc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
                <p style="margin:0;color:#94a3b8;font-size:11px;">
                  © ${new Date().getFullYear()} WBK & BOKA.
                  ${language === "ru" ? "Все права защищены." : language === "en" ? "All rights reserved." : "Barcha huquqlar himoyalangan."}
                </p>
                <p style="margin:6px 0 0;color:#cbd5e1;font-size:10px;">
                  ${language === "ru" ? "Вы получили это письмо, так как подписались на новости." : language === "en" ? "You received this because you subscribed to our news." : "Siz yangiliklarga obuna bo'lgansiz."}
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Accept":       "application/json",
      "Content-Type": "application/json",
      "api-key":      BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender:   { name: SENDER_NAME, email: SENDER_EMAIL },
      to:       [{ email: toEmail, name: toName || toEmail }],
      subject:  subjects[language] || subjects.uz,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Email yuborishda xato");
  }
  return true;
}

/* ── Barcha obunchilarga yuborish ── */
export async function sendNewsToAllSubscribers({ subscribers, newsTitle, newsExcerpt, newsDate }) {
  const results = { success: 0, failed: 0 };

  for (const sub of subscribers) {
    try {
      await sendEmailToSubscriber({
        toEmail:    sub.email,
        toName:     sub.name || "",
        newsTitle:  newsTitle[sub.language] || newsTitle.uz || newsTitle,
        newsExcerpt: newsExcerpt[sub.language] || newsExcerpt.uz || newsExcerpt,
        newsDate:   newsDate,
        language:   sub.language || "uz",
      });
      results.success++;
      /* Rate limit — 300/kun, 1 emaildan keyin 50ms kutish */
      await new Promise(r => setTimeout(r, 50));
    } catch (e) {
      console.error(`Email xato (${sub.email}):`, e.message);
      results.failed++;
    }
  }

  return results;
}