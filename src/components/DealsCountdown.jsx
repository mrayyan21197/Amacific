import React, { useEffect, useState } from "react";

/** Countdown to end of current weekend payday window (demo: next Sunday 23:59) */
export default function DealsCountdown({ label = "Payday deals end in" }) {
  const [left, setLeft] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      const day = now.getDay();
      const daysUntilSun = day === 0 ? 0 : 7 - day;
      end.setDate(now.getDate() + daysUntilSun);
      end.setHours(23, 59, 59, 999);
      const ms = Math.max(0, end - now);
      const h = Math.floor(ms / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      setLeft(`${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex flex-wrap items-center gap-3 bg-navy text-white px-4 py-3 rounded-xl">
      <span className="text-sm font-semibold text-brandOrange">{label}</span>
      <span className="font-mono font-bold tracking-widest">{left}</span>
    </div>
  );
}
