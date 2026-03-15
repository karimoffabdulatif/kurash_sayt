"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: "180px", height: "180px" }}>

        {/* Aylanuvchi ramka — ko'k yozuv */}
        <img
          src="/ramka.png"
          alt=""
          style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            animation: "spin 4s linear infinite",
            zIndex: 20,
          }}
        />

        {/* Statik o'rta — globus + yulduzlar */}
        <img
          src="/orta.png"
          alt="loader"
          style={{
            width: "250px",
            height: "250px",
            objectFit: "contain",
            position: "relative",
            zIndex: 10,
          }}
        />
      </div>

      {/* Yuklanmoqda matni */}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}