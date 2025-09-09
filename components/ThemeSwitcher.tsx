"use client";

import { useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";

function getSystemPrefersDark() {
  return typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(t: Theme) {
  const root = document.documentElement;

  if (t === "system") {
    // Sigue el sistema
    localStorage.removeItem("theme");
    if (getSystemPrefersDark()) root.classList.add("dark");
    else root.classList.remove("dark");
  } else {
    localStorage.setItem("theme", t);
    if (t === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }
}

export default function ThemeSwitcher() {
  // Lee preferencia actual (local o sistema)
  const initial: Theme = useMemo(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as Theme) || "system";
  }, []);

  const [theme, setTheme] = useState<Theme>(initial);

  // Aplica al cargar/cambiar
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Si está en "system", escucha cambios del SO
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [theme]);

  return (
    <div className="mt-4 rounded-xl border border-emerald-900/20 dark:border-almond/20 p-3">
      <p className="text-sm font-semibold mb-2">Tema</p>
      <div className="inline-flex rounded-lg border overflow-hidden">
        {(["light", "dark", "system"] as Theme[]).map((t) => {
          const active = theme === t;
          return (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={[
                "px-3 py-1.5 text-sm font-medium focus:outline-none",
                active
                  ? "bg-emerald-900 text-almond dark:bg-almond dark:text-evergreen"
                  : "bg-white/60 text-evergreen hover:bg-white dark:bg-emerald-800/40 dark:text-almond/90 dark:hover:bg-emerald-800/60",
              ].join(" ")}
              aria-pressed={active}
              type="button"
            >
              {t === "light" ? "Claro" : t === "dark" ? "Oscuro" : "Sistema"}
            </button>
          );
        })}
      </div>
      <p className="text-xs mt-2 opacity-70">
        Guarda tu preferencia y la aplica sin parpadeos.
      </p>
    </div>
  );
}
