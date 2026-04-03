export interface Festival {
  id: string;
  name: string;
  bannerText: string;
  startDate: string; // "MM-DD" format for yearly, or "YYYY-MM-DD" for specific year
  endDate: string;
  colors: {
    bannerBg: string; // Tailwind class or hex
    bannerText: string; // Tailwind class or hex
    border: string[]; // 4 colors for the top border
  };
  effect?: "confetti" | "snowfall" | "lights" | "easter-eggs" | "none";
  doodle?: string;
}

const FESTIVALS_2026: Festival[] = [
  {
    id: "holi",
    name: "Holi",
    bannerText: "Happy Holi! Celebrate the festival of colors with instudia. 🎨",
    startDate: "2026-03-02",
    endDate: "2026-03-04",
    colors: {
      bannerBg: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500",
      bannerText: "text-white",
      border: ["#FF1B58", "#FFE01B", "#C21BFF", "#58FF1B"],
    },
    effect: "confetti",
    doodle: "splash",
  },
  {
    id: "good-friday",
    name: "Good Friday",
    bannerText: "Wishing you a peaceful and blessed Good Friday. 🌿",
    startDate: "2026-04-03",
    endDate: "2026-04-04",
    colors: {
      bannerBg: "bg-[#1E1B4B]", // Deep Indigo
      bannerText: "text-white",
      border: ["#1E1B4B", "#312E81", "#3730A3", "#4338CA"],
    },
    effect: "lights",
    doodle: "leaf",
  },
  {
    id: "easter-sunday",
    name: "Easter Sunday",
    bannerText: "Happy Easter! Celebrate the joy of new beginnings. 🥚✨",
    startDate: "2026-04-05",
    endDate: "2026-04-05",
    colors: {
      bannerBg: "bg-[#7C3AED]", // Royal Purple
      bannerText: "text-white",
      border: ["#7C3AED", "#A78BFA", "#F5F3FF", "#DDD6FE"],
    },
    effect: "easter-eggs",
    doodle: "egg",
  },
  {
    id: "rongali-bihu",
    name: "Rongali Bihu",
    bannerText: "Happy Rongali Bihu! Wishing you a year of prosperity and joy. 🌾",
    startDate: "2026-04-14",
    endDate: "2026-04-16",
    colors: {
      bannerBg: "bg-[#D91E18]", // Traditional Red
      bannerText: "text-white",
      border: ["#D91E18", "#FFFFFF", "#D91E18", "#FFFFFF"],
    },
    effect: "confetti",
    doodle: "drum",
  },
  {
    id: "moatsu",
    name: "Moatsu",
    bannerText: "Happy Moatsu Festival! Celebrating the harvest with joy. 🌽",
    startDate: "2026-05-01",
    endDate: "2026-05-03",
    colors: {
      bannerBg: "bg-[#231F20]", // Charcoal/Black
      bannerText: "text-[#E6E6E6]",
      border: ["#FF0000", "#231F20", "#FF0000", "#231F20"],
    },
    effect: "none",
    doodle: "spear",
  },
  {
    id: "tuluni",
    name: "Tuluni",
    bannerText: "Happy Tuluni! Celebrating the Sumi heritage and harvest. 🌾",
    startDate: "2026-07-08",
    endDate: "2026-07-09",
    colors: {
      bannerBg: "bg-[#800000]", // Maroon
      bannerText: "text-white",
      border: ["#000000", "#800000", "#000000", "#800000"],
    },
    effect: "none",
    doodle: "spear",
  },
  {
    id: "onam",
    name: "Onam",
    bannerText: "Happy Onam! Wishing you a harvest of happiness and prosperity. 🌼",
    startDate: "2026-08-25",
    endDate: "2026-08-28",
    colors: {
      bannerBg: "bg-[#FFD700]", // Gold
      bannerText: "text-[#1B1C1E]",
      border: ["#FFD700", "#FFFFFF", "#FFD700", "#FFFFFF"],
    },
    effect: "confetti",
    doodle: "pookalam",
  },
  {
    id: "durga-puja",
    name: "Durga Puja",
    bannerText: "Shubho Sharadiya! Wishing you the blessings of Maa Durga. 🌸",
    startDate: "2026-10-16",
    endDate: "2026-10-20",
    colors: {
      bannerBg: "bg-[#FF1B58]", // Brand RedHue
      bannerText: "text-white",
      border: ["#FF1B58", "#FFFFFF", "#FF1B58", "#FFFFFF"],
    },
    effect: "none",
    doodle: "lotus",
  },
  {
    id: "diwali",
    name: "Diwali",
    bannerText: "Happy Diwali! May your life be filled with light and joy. 🪔",
    startDate: "2026-11-06",
    endDate: "2026-11-09",
    colors: {
      bannerBg: "bg-[#1B1C1E]", // Matte Black
      bannerText: "text-[#FFE01B]",
      border: ["#FFE01B", "#FF1B58", "#FFE01B", "#FF1B58"],
    },
    effect: "lights",
    doodle: "lamp",
  },
  {
    id: "chhath-puja",
    name: "Chhath Puja",
    bannerText: "Wishing you a blessed Chhath Puja. Revering the Sun God. ☀️",
    startDate: "2026-11-14",
    endDate: "2026-11-17",
    colors: {
      bannerBg: "bg-[#FF8C00]", // Dark Orange
      bannerText: "text-white",
      border: ["#FF8C00", "#FFE4B5", "#FF8C00", "#FFE4B5"],
    },
    effect: "none",
    doodle: "sun",
  },
  {
    id: "hornbill",
    name: "Hornbill Festival",
    bannerText: "Welcome to the Festival of Festivals! Celebrating Nagaland's Heritage. 🦅",
    startDate: "2026-12-01",
    endDate: "2026-12-10",
    colors: {
      bannerBg: "bg-[#1B1C1E]", // Matte Black
      bannerText: "text-white",
      border: ["#FF0000", "#F7B500", "#000000", "#FF0000"],
    },
    effect: "none",
    doodle: "bird",
  },
  {
    id: "christmas",
    name: "Merry Christmas",
    bannerText: "Merry Christmas! Wishing you a season of love and cheer. 🎄",
    startDate: "2026-12-24",
    endDate: "2026-12-26",
    colors: {
      bannerBg: "bg-[#006400]", // Dark Green
      bannerText: "text-white",
      border: ["#006400", "#FF0000", "#FFFFFF", "#006400"],
    },
    effect: "snowfall",
    doodle: "star",
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
