export const THEME_STORAGE_KEY = "theme";
export const LANG_STORAGE_KEY = "lang";

/**
 * Runs in <head> before first paint: applies the stored theme, or the system
 * preference when the visitor has not chosen one, so there is no flash.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";var l=localStorage.getItem("${LANG_STORAGE_KEY}");if(l==="en"||l==="fr"){r.lang=l}}catch(e){}})();`;

export function applyTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}
