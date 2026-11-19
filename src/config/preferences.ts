
export const THEME = {
  storageKey: "mulser-theme",
  attribute: "theme",
  values: ["dark", "light"] as const,
  fallback: "dark" as const,
};

export const MOTION = {
  storageKey: "mulser-motion",
  attribute: "motion",
  values: ["system", "on", "off"] as const,
  fallback: "system" as const,
};

export type ThemeName = (typeof THEME.values)[number];
export type MotionPreference = (typeof MOTION.values)[number];

export const PREFERENCES_INIT_SCRIPT = `(function(){
  var d=document.documentElement;
  try {
    var t=localStorage.getItem("${THEME.storageKey}");
    if(t!=="light"&&t!=="dark"){
      // Identidad institucional predeterminada, igual en localhost y Network.
      t="dark";
    }
    d.setAttribute("data-theme",t);

    var m=localStorage.getItem("${MOTION.storageKey}");
    if(m!=="on"&&m!=="off") m="system";
    d.setAttribute("data-motion",m);
  }catch(e){
    d.setAttribute("data-theme","dark");
    d.setAttribute("data-motion","system");
  }
})();`;
