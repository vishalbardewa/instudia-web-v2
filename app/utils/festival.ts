export type FestivalThemeKey =
  | "durga-puja"
  | "diwali"
  | "hornbill"
  | "christmas"
  | "chhath-puja"
  | "holi"
  | "harvest"
  | "spring";

export interface Festival {
  id: string;
  name: string;
  bannerText: string;
  shortGreeting?: string;
  startDate: string; // "MM-DD" format for yearly, or "YYYY-MM-DD" for specific year
  endDate: string;
  colors: {
    bannerBg: string; // Tailwind class or custom gradient
    bannerText: string; // Tailwind class or hex
    border: string[]; // 4 colors for the accent border
    accentGlow: string; // hex color for GSAP glowing particle/sheen effect
    pillBg: string; // CTA pill background class
    pillText: string; // CTA pill text class
    pillBorder: string; // CTA pill border class
  };
  ctaText?: string;
  ctaHref?: string;
  effect?: "confetti" | "snowfall" | "lights" | "easter-eggs" | "color-splash" | "sugarcane" | "diwali-diyas" | "christmas-tree" | "none";
  doodle?: string;
  themeKey: FestivalThemeKey;
}

export const FESTIVALS_2026: Festival[] = [
  {
    id: "holi",
    name: "Holi",
    bannerText: "Happy Holi! Celebrate colors, creativity, and new beginnings.",
    shortGreeting: "Happy Holi!",
    startDate: "2026-03-02",
    endDate: "2026-03-04",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#590d3d] via-[#911666] to-[#1e1b4b]",
      bannerText: "text-pink-100",
      border: ["#FF1B58", "#FFE01B", "#C21BFF", "#58FF1B"],
      accentGlow: "#FFE01B",
      pillBg: "bg-white/15 hover:bg-white/25",
      pillText: "text-amber-200",
      pillBorder: "border-white/30",
    },
    ctaText: "Splash into Tech →",
    ctaHref: "/courses",
    effect: "color-splash",
    doodle: "splash",
    themeKey: "holi",
  },
  {
    id: "good-friday",
    name: "Good Friday",
    bannerText: "Wishing you a peaceful, contemplative, and blessed Good Friday.",
    shortGreeting: "Blessed Good Friday",
    startDate: "2026-04-03",
    endDate: "2026-04-04",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#0d1322] via-[#1a233a] to-[#0b0e17]",
      bannerText: "text-slate-200",
      border: ["#1E1B4B", "#312E81", "#3730A3", "#4338CA"],
      accentGlow: "#93C5FD",
      pillBg: "bg-slate-700/40 hover:bg-slate-700/60",
      pillText: "text-slate-100",
      pillBorder: "border-slate-500/40",
    },
    ctaText: "About instudia →",
    ctaHref: "/about",
    effect: "lights",
    doodle: "leaf",
    themeKey: "spring",
  },
  {
    id: "easter-sunday",
    name: "Easter Sunday",
    bannerText: "Happy Easter! Celebrating renewal, hope, and inspiring new beginnings.",
    shortGreeting: "Happy Easter!",
    startDate: "2026-04-05",
    endDate: "2026-04-05",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#2e0854] via-[#5b148c] to-[#250545]",
      bannerText: "text-purple-100",
      border: ["#7C3AED", "#A78BFA", "#F5F3FF", "#DDD6FE"],
      accentGlow: "#E9D5FF",
      pillBg: "bg-purple-300/20 hover:bg-purple-300/30",
      pillText: "text-purple-200",
      pillBorder: "border-purple-300/40",
    },
    ctaText: "New Beginnings at instudia →",
    ctaHref: "/courses",
    effect: "easter-eggs",
    doodle: "egg",
    themeKey: "spring",
  },
  {
    id: "rongali-bihu",
    name: "Rongali Bihu",
    bannerText: "Happy Rongali Bihu! Wishing you a season of prosperity, melody, and joy.",
    shortGreeting: "Happy Rongali Bihu!",
    startDate: "2026-04-14",
    endDate: "2026-04-16",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#6e0707] via-[#a81313] to-[#4f0404]",
      bannerText: "text-red-50",
      border: ["#D91E18", "#FFFFFF", "#D91E18", "#FFFFFF"],
      accentGlow: "#FFE01B",
      pillBg: "bg-amber-400/20 hover:bg-amber-400/30",
      pillText: "text-amber-200",
      pillBorder: "border-amber-300/40",
    },
    ctaText: "Learn Tech Skills →",
    ctaHref: "/courses",
    effect: "confetti",
    doodle: "drum",
    themeKey: "harvest",
  },
  {
    id: "moatsu",
    name: "Moatsu",
    bannerText: "Happy Moatsu Festival! Celebrating Ao Naga heritage, harvest, and unity.",
    shortGreeting: "Happy Moatsu!",
    startDate: "2026-05-01",
    endDate: "2026-05-03",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#171717] via-[#5c0e18] to-[#121212]",
      bannerText: "text-neutral-200",
      border: ["#FF0000", "#231F20", "#FF0000", "#231F20"],
      accentGlow: "#FF3333",
      pillBg: "bg-red-500/20 hover:bg-red-500/30",
      pillText: "text-red-200",
      pillBorder: "border-red-400/40",
    },
    ctaText: "Explore Courses →",
    ctaHref: "/courses",
    effect: "none",
    doodle: "spear",
    themeKey: "harvest",
  },
  {
    id: "tuluni",
    name: "Tuluni",
    bannerText: "Happy Tuluni! Honoring Sumi cultural traditions, bountiful harvest, and community.",
    shortGreeting: "Happy Tuluni!",
    startDate: "2026-07-08",
    endDate: "2026-07-09",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#3d0303] via-[#6e0a0d] to-[#260101]",
      bannerText: "text-amber-100",
      border: ["#000000", "#800000", "#000000", "#800000"],
      accentGlow: "#FFE01B",
      pillBg: "bg-amber-400/20 hover:bg-amber-400/30",
      pillText: "text-amber-200",
      pillBorder: "border-amber-300/40",
    },
    ctaText: "Explore Courses →",
    ctaHref: "/courses",
    effect: "none",
    doodle: "spear",
    themeKey: "harvest",
  },
  {
    id: "onam",
    name: "Onam",
    bannerText: "Happy Onam! Wishing you a harvest of boundless happiness, peace, and prosperity.",
    shortGreeting: "Happy Onam!",
    startDate: "2026-08-25",
    endDate: "2026-08-28",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#4d3500] via-[#7d5600] to-[#332300]",
      bannerText: "text-amber-100",
      border: ["#FFD700", "#FFFFFF", "#FFD700", "#FFFFFF"],
      accentGlow: "#FFD700",
      pillBg: "bg-yellow-400/25 hover:bg-yellow-400/35",
      pillText: "text-amber-200",
      pillBorder: "border-yellow-300/50",
    },
    ctaText: "Celebrate & Learn →",
    ctaHref: "/courses",
    effect: "confetti",
    doodle: "pookalam",
    themeKey: "harvest",
  },
  {
    id: "durga-puja",
    name: "Durga Puja",
    bannerText: "Shubho Sharadiya! Wishing you strength, prosperity, and blessings of Maa Durga.",
    shortGreeting: "Shubho Sharadiya!",
    startDate: "2026-10-16",
    endDate: "2026-10-20",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#80001e] via-[#c40b37] to-[#5e0015]",
      bannerText: "text-amber-100",
      border: ["#FF1B58", "#FFE01B", "#FF1B58", "#FFE01B"],
      accentGlow: "#FFE01B",
      pillBg: "bg-amber-400/20 hover:bg-amber-400/30",
      pillText: "text-amber-200",
      pillBorder: "border-amber-300/40",
    },
    ctaText: "Puja Batches Now Open →",
    ctaHref: "/courses",
    effect: "none",
    doodle: "lotus",
    themeKey: "durga-puja",
  },
  {
    id: "diwali",
    name: "Diwali",
    bannerText: "Happy Diwali! May your journey be brightly illuminated with wisdom and success.",
    shortGreeting: "Happy Diwali!",
    startDate: "2026-11-06",
    endDate: "2026-11-09",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#130722] via-[#290e46] to-[#0e0419]",
      bannerText: "text-amber-200",
      border: ["#FFE01B", "#FF1B58", "#FFE01B", "#FF1B58"],
      accentGlow: "#FFB800",
      pillBg: "bg-[#FFE01B]/20 hover:bg-[#FFE01B]/35",
      pillText: "text-[#FFE01B]",
      pillBorder: "border-[#FFE01B]/50",
    },
    ctaText: "Light up your Career →",
    ctaHref: "/courses",
    effect: "diwali-diyas",
    doodle: "lamp",
    themeKey: "diwali",
  },
  {
    id: "chhath-puja",
    name: "Chhath Puja",
    bannerText: "Blessed Chhath Puja! Reverence, purity, and heartfelt devotion to the Sun God.",
    shortGreeting: "Blessed Chhath Puja!",
    startDate: "2026-11-14",
    endDate: "2026-11-17",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#6e2200] via-[#a83b06] to-[#4a1600]",
      bannerText: "text-orange-100",
      border: ["#FF8C00", "#FFE4B5", "#FF8C00", "#FFE4B5"],
      accentGlow: "#FFAA00",
      pillBg: "bg-amber-400/20 hover:bg-amber-400/30",
      pillText: "text-amber-200",
      pillBorder: "border-amber-300/40",
    },
    ctaText: "Explore Tech Batches →",
    ctaHref: "/courses",
    effect: "sugarcane",
    doodle: "sun",
    themeKey: "chhath-puja",
  },
  {
    id: "hornbill",
    name: "Hornbill Festival",
    bannerText: "Welcome to the Festival of Festivals! Celebrating Nagaland's culture and heritage.",
    shortGreeting: "Hornbill Festival!",
    startDate: "2026-12-01",
    endDate: "2026-12-10",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#17181a] via-[#660e14] to-[#121314]",
      bannerText: "text-amber-100",
      border: ["#FF0000", "#F7B500", "#000000", "#FF0000"],
      accentGlow: "#FF3333",
      pillBg: "bg-red-500/20 hover:bg-red-500/30",
      pillText: "text-red-200",
      pillBorder: "border-red-400/40",
    },
    ctaText: "Explore Tech in Nagaland →",
    ctaHref: "/courses",
    effect: "none",
    doodle: "bird",
    themeKey: "hornbill",
  },
  {
    id: "christmas",
    name: "Merry Christmas",
    bannerText: "Merry Christmas! Wishing you a season filled with warmth, joy, and goodwill.",
    shortGreeting: "Merry Christmas!",
    startDate: "2026-12-24",
    endDate: "2026-12-26",
    colors: {
      bannerBg: "bg-gradient-to-r from-[#022414] via-[#053d22] to-[#011a0e]",
      bannerText: "text-emerald-50",
      border: ["#006400", "#FF0000", "#FFFFFF", "#006400"],
      accentGlow: "#BAE6FD",
      pillBg: "bg-emerald-400/20 hover:bg-emerald-400/30",
      pillText: "text-emerald-200",
      pillBorder: "border-emerald-300/40",
    },
    ctaText: "Holiday Admissions →",
    ctaHref: "/courses",
    effect: "christmas-tree",
    doodle: "star",
    themeKey: "christmas",
  },
];

export function getActiveFestival(testDate?: string): Festival | null {
  const now = testDate ? new Date(testDate) : new Date();

  // Find festival that matches current date
  const active = FESTIVALS_2026.find((f) => {
    const start = new Date(f.startDate);
    const end = new Date(f.endDate);
    // Include the whole end day
    end.setHours(23, 59, 59, 999);
    return now >= start && now <= end;
  });

  return active || null;
}

export function getFestivalById(id: string): Festival | null {
  return FESTIVALS_2026.find((f) => f.id === id) || null;
}
