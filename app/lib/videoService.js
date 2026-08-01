// Supabase Storage orqali video yuklash
const SUPABASE_URL = "https://rmrsqlqvtckbcfibxkcz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_pS7-OWw2nAThb3oD3WxxHw_f833C-je";
const BUCKET_NAME = "new-videos";

// Videoni Supabase Storage'ga yuklash, progress bilan
export function uploadVideoToStorage(file, onProgress) {
  return new Promise((resolve, reject) => {
    const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${safeName}`;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", uploadUrl);
    xhr.setRequestHeader("apikey", SUPABASE_ANON_KEY);
    xhr.setRequestHeader("Authorization", `Bearer ${SUPABASE_ANON_KEY}`);
    xhr.setRequestHeader("Content-Type", file.type || "video/mp4");
    xhr.setRequestHeader("x-upsert", "true");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        onProgress?.(pct);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${safeName}`;
        resolve(publicUrl);
      } else {
        let msg = "Video yuklanmadi";
        try { msg = JSON.parse(xhr.responseText)?.message || msg; } catch {}
        reject(new Error(msg));
      }
    };

    xhr.onerror = () => reject(new Error("Tarmoq xatosi"));
    xhr.send(file);
  });
}