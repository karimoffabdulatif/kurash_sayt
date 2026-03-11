"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        
        {/* Aylanuvchi tashqi ramka */}
        <div
          className="absolute rounded-full border-4 border-transparent"
          style={{
            width: "160px",
            height: "160px",
            backgroundImage: "url('/images/ramka.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "spin 3s linear infinite",
          }}
        />

        {/* O'rtadagi statik rasm */}
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            zIndex: 10,
          }}
        >
          <img
            src="/images/orta.png"
            alt="loader"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Yuklanmoqda matni */}
      <p
        className="mt-6 text-sm font-semibold tracking-widest uppercase text-gray-600"
        style={{ animation: "pulse 1.5s ease-in-out infinite" }}
      >
        Yuklanmoqda...
      </p>

      {/* CSS animatsiyalar */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}