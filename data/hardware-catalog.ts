export type WorkloadDomain =
  | 'programming'
  | 'design'
  | '3d_video'
  | 'ai_ml'
  | 'general';

export type FormFactorChoice = 'laptop' | 'desktop' | 'compare';
export type BudgetTier = 'budget' | 'sweet_spot' | 'future_proof';

export interface DomainMeta {
  id: WorkloadDomain;
  title: string;
  badge: string;
  shortDesc: string;
  apps: string[];
  cpuPriority: string;
  ramPriority: string;
  gpuPriority: string;
  displayPriority: string;
  gotchaNote: string;
}

export const DOMAIN_PROFILES: Record<WorkloadDomain, DomainMeta> = {
  programming: {
    id: 'programming',
    title: 'Software Development & Mobile Dev',
    badge: 'Code & Build',
    shortDesc: 'Web dev (Node/React), Android Studio, Flutter, Docker containers, and database work.',
    apps: ['VS Code', 'Android Studio', 'Docker', 'IntelliJ', 'Postman', 'Git'],
    cpuPriority: 'High multi-core for fast compilation & multiple emulator threads',
    ramPriority: '16GB minimum (32GB strongly recommended for Docker + Android emulators)',
    gpuPriority: 'Integrated GPU is sufficient; dedicated GPU helpful for Flutter GPU shaders',
    displayPriority: '1080p/1200p IPS anti-glare, 16:10 aspect ratio preferred for code lines',
    gotchaNote: 'Never buy 8GB soldered RAM. Android Studio + Chrome + emulator easily exceeds 12GB active RAM.',
  },
  design: {
    id: 'design',
    title: 'Graphic Design & UI/UX',
    badge: 'Vector & Raster',
    shortDesc: 'Branding, vector illustration, photo manipulation, print design, and Figma UI prototypes.',
    apps: ['Adobe Photoshop', 'Illustrator', 'Figma', 'InDesign', 'Lightroom'],
    cpuPriority: 'High single-core clock speed (Adobe apps rely heavily on single-thread IPC)',
    ramPriority: '16GB minimum; 32GB for multi-layer 300DPI print files and heavy vector artboards',
    gpuPriority: 'Dedicated GPU with 4GB-6GB VRAM for smooth GPU canvas zooming & neural filters',
    displayPriority: 'CRITICAL: 100% sRGB or 99% DCI-P3 color accuracy with Delta E < 2',
    gotchaNote: 'Beware of cheap laptops with 45% NTSC screens—colors will appear dull and inaccurate when printed or viewed on phones.',
  },
  '3d_video': {
    id: '3d_video',
    title: '3D Modeling, VFX & Video Editing',
    badge: 'Render & Timeline',
    shortDesc: '3D asset creation, motion graphics, video rendering, color grading, and game dev.',
    apps: ['Blender', 'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Unreal Engine'],
    cpuPriority: 'Multi-core CPU (8+ cores) for fast video timeline caching and rendering',
    ramPriority: '16GB bare minimum, 32GB recommended for 4K video timelines & Blender meshes',
    gpuPriority: 'NVIDIA RTX with 6GB-8GB+ VRAM & high TGP (RTX 3050 6GB / 4060 minimum)',
    displayPriority: '100% sRGB / 90%+ DCI-P3 with 144Hz+ high refresh rate for smooth playback',
    gotchaNote: 'Check the GPU TGP (wattage). A 45W RTX 4050 performs significantly slower than a full 95W-105W RTX 4050.',
  },
  ai_ml: {
    id: 'ai_ml',
    title: 'AI, Machine Learning & Data Science',
    badge: 'Neural & Data',
    shortDesc: 'PyTorch, TensorFlow, Pandas datasets, Jupyter notebooks, and local small LLM inferencing.',
    apps: ['PyTorch', 'TensorFlow', 'Jupyter Lab', 'CUDA Toolkit', 'Ollama', 'Pandas'],
    cpuPriority: 'Fast multi-core for data pre-processing and parallel matrix calculations',
    ramPriority: '32GB recommended for in-memory dataframe caching and model weights',
    gpuPriority: 'NVIDIA RTX with dedicated CUDA cores and 8GB-16GB VRAM (AMD/Intel have poor PyTorch support)',
    displayPriority: 'Standard IPS is adequate; external monitor support is valuable',
    gotchaNote: 'NVIDIA GPUs are strictly required for PyTorch CUDA acceleration. Do not buy AMD/Intel GPUs for local deep learning models.',
  },
  general: {
    id: 'general',
    title: 'BCA, College Studies & General Coding',
    badge: 'Everyday Academic',
    shortDesc: 'C/C++, Java, Python fundamentals, MS Office, browser tabs, video lectures, and projects.',
    apps: ['VS Code', 'PyCharm Community', 'Code::Blocks', 'MS Office', 'Chrome / Brave', 'Zoom'],
    cpuPriority: 'Modern quad-core or 6-core (Intel Core i3/i5 or AMD Ryzen 3/5)',
    ramPriority: '16GB recommended (8GB acceptable only if expandable via open SODIMM slot)',
    gpuPriority: 'Integrated Intel Iris Xe / AMD Radeon 600M/700M is plenty',
    displayPriority: 'FHD IPS anti-glare with good viewing angles and eye care / low blue light',
    gotchaNote: 'Avoid older 11th/12th Gen Core i3 laptops with TN panels and slow eMMC/HDD storage.',
  },
};

export interface LaptopModel {
  id: string;
  name: string;
  brand: string;
  modelCode: string;
  approxPriceInr: number;
  tier: BudgetTier;
  suitableDomains: WorkloadDomain[];
  specs: {
    cpu: string;
    ram: string;
    ramExpandable: boolean;
    storage: string;
    storageExpandable: boolean;
    gpu: string;
    display: string;
    colorGamut: string;
    batteryWhr: number;
    weightKg: number;
  };
  whyBest: string;
  pros: string[];
  cons: string[];
  gotchaAlerts: string[];
}

export const LAPTOP_CATALOG: LaptopModel[] = [
  // Budget Tier
  {
    id: 'acer-aspire-lite-1235u',
    name: 'Acer Aspire Lite 15',
    brand: 'Acer',
    modelCode: 'AL15-52H',
    approxPriceInr: 36990,
    tier: 'budget',
    suitableDomains: ['general', 'programming'],
    specs: {
      cpu: 'Intel Core i3 1215U (6 Cores, 8 Threads)',
      ram: '16GB DDR4 3200MHz',
      ramExpandable: true,
      storage: '512GB PCIe Gen3 NVMe SSD',
      storageExpandable: true,
      gpu: 'Intel UHD Graphics',
      display: '15.6" Full HD (1920x1080) Anti-glare IPS',
      colorGamut: '45% NTSC (~62% sRGB)',
      batteryWhr: 44,
      weightKg: 1.59,
    },
    whyBest: 'Offers genuine 16GB RAM out-of-the-box under ₹38,000 with clean metal body finish.',
    pros: ['16GB RAM included at entry price', 'Fast 512GB NVMe SSD', 'Lightweight 1.59kg chassis'],
    cons: ['Screen is 45% NTSC (not meant for color-accurate design work)', 'Average battery (~4-5 hours)'],
    gotchaAlerts: [
      'Great for programming and BCA coursework, but do not use for professional logo/print design due to 45% NTSC display.',
    ],
  },
  {
    id: 'lenovo-ideapad-slim-3-ryzen5',
    name: 'Lenovo IdeaPad Slim 3 Gen 8',
    brand: 'Lenovo',
    modelCode: '15AMN8',
    approxPriceInr: 44990,
    tier: 'budget',
    suitableDomains: ['general', 'programming', 'design'],
    specs: {
      cpu: 'AMD Ryzen 5 7520U (4 Cores, 8 Threads)',
      ram: '16GB LPDDR5 5500MHz (Soldered)',
      ramExpandable: false,
      storage: '512GB PCIe Gen4 NVMe SSD',
      storageExpandable: true,
      gpu: 'AMD Radeon 610M Graphics',
      display: '15.6" FHD (1920x1080) IPS 300 nits',
      colorGamut: '45% NTSC (~65% sRGB)',
      batteryWhr: 47,
      weightKg: 1.62,
    },
    whyBest: 'Exceptional reliability, sturdy keyboard for long coding sessions, and fast DDR5 RAM.',
    pros: ['Fast LPDDR5 memory', 'Military-grade MIL-STD-810H durability', 'Rapid Charge support (80% in 1 hr)'],
    cons: ['RAM is soldered (ensure you buy the 16GB variant, not 8GB)', 'Display is not 100% sRGB'],
    gotchaAlerts: [
      'RAM cannot be upgraded after purchase. The 16GB model is strictly recommended to avoid obsolescence.',
    ],
  },

  // Sweet Spot Tier (~₹50k - ₹75k)
  {
    id: 'asus-vivobook-s15-oled-intel',
    name: 'ASUS Vivobook 15 OLED',
    brand: 'ASUS',
    modelCode: 'K1504VA',
    approxPriceInr: 58990,
    tier: 'sweet_spot',
    suitableDomains: ['design', 'programming', 'general'],
    specs: {
      cpu: 'Intel Core i5 1335U (10 Cores, 12 Threads)',
      ram: '16GB DDR4 3200MHz',
      ramExpandable: true,
      storage: '512GB PCIe Gen4 NVMe SSD',
      storageExpandable: true,
      gpu: 'Intel Iris Xe Graphics',
      display: '15.6" FHD (1920x1080) OLED 600 nits Peak',
      colorGamut: '100% DCI-P3 / 133% sRGB (Pantone Validated)',
      batteryWhr: 50,
      weightKg: 1.7,
    },
    whyBest: 'Gold standard for Graphic Designers & UI/UX students on a budget. Pantone validated 100% DCI-P3 OLED screen ensures perfect color reproduction.',
    pros: ['Stunning 100% DCI-P3 OLED panel', 'Deep blacks & certified eye care', 'Solid 10-core 13th Gen CPU'],
    cons: ['No dedicated GPU for heavy 3D rendering in Blender', 'Glossy screen can reflect bright overhead lights'],
    gotchaAlerts: [
      'Turn on ASUS OLED Care pixel refresh in settings to prevent static UI burn-in over 3+ years.',
    ],
  },
  {
    id: 'lenovo-loq-15-rtx3050',
    name: 'Lenovo LOQ 15 Gaming & Workstation',
    brand: 'Lenovo',
    modelCode: '15IAX9',
    approxPriceInr: 64990,
    tier: 'sweet_spot',
    suitableDomains: ['3d_video', 'ai_ml', 'programming'],
    specs: {
      cpu: 'Intel Core i5 12450HX (8 Cores, 12 Threads)',
      ram: '16GB DDR5 4800MHz (2x8GB Dual Channel)',
      ramExpandable: true,
      storage: '512GB PCIe Gen4 NVMe SSD',
      storageExpandable: true,
      gpu: 'NVIDIA GeForce RTX 3050 6GB GDDR6 (95W TGP)',
      display: '15.6" FHD (1920x1080) IPS 144Hz 300 nits',
      colorGamut: '100% sRGB',
      batteryWhr: 60,
      weightKg: 2.38,
    },
    whyBest: 'Unmatched raw power per rupee. Comes with full 95W TGP RTX 3050 with 6GB VRAM and a 100% sRGB 144Hz display.',
    pros: ['Full 95W high-power RTX GPU with 6GB VRAM', '100% sRGB screen (unusual in budget gaming laptops)', 'Two RAM and two M.2 SSD slots for easy upgrades'],
    cons: ['Heavier at 2.38kg with bulky 170W power brick', 'Battery lasts only 3-3.5 hours away from wall socket'],
    gotchaAlerts: [
      'Dedicated gaming laptops draw high wattage. If bringing to college or instudia, always carry the AC power adapter for full performance.',
    ],
  },
  {
    id: 'acer-swift-go-14-evo',
    name: 'Acer Swift Go 14 OLED (Intel Evo)',
    brand: 'Acer',
    modelCode: 'SFG14-72',
    approxPriceInr: 69990,
    tier: 'sweet_spot',
    suitableDomains: ['programming', 'design', 'general'],
    specs: {
      cpu: 'Intel Core Ultra 5 125H (14 Cores, 18 Threads with NPU)',
      ram: '16GB LPDDR5X 6400MHz',
      ramExpandable: false,
      storage: '512GB PCIe Gen4 NVMe SSD',
      storageExpandable: true,
      gpu: 'Intel Arc Integrated Graphics',
      display: '14" 2.8K (2880x1800) OLED 90Hz 16:10',
      colorGamut: '100% DCI-P3 / 500 nits Peak',
      batteryWhr: 65,
      weightKg: 1.32,
    },
    whyBest: 'Ultra-portable productivity masterpiece. 14-core Intel Core Ultra CPU, brilliant 2.8K OLED 16:10 display, and up to 9 hours of battery life.',
    pros: ['14-core architecture with AI Boost NPU', 'Ultra-light 1.32kg all-aluminum body', 'Thunderbolt 4 ports + 2.8K OLED clarity'],
    cons: ['RAM is non-upgradeable (soldered LPDDR5X)'],
    gotchaAlerts: [
      'Intel Arc graphics offer double the speed of Iris Xe, but heavy Blender 3D rendering still benefits from dedicated NVIDIA RTX GPUs.',
    ],
  },

  // Future-Proof Pro Tier (~₹85k - ₹1.4L+)
  {
    id: 'apple-macbook-air-m3-16gb',
    name: 'Apple MacBook Air 13" / 15" (M3 Chip)',
    brand: 'Apple',
    modelCode: 'M3 2024',
    approxPriceInr: 104900,
    tier: 'future_proof',
    suitableDomains: ['programming', 'design', 'general'],
    specs: {
      cpu: 'Apple M3 (8-core CPU: 4 performance + 4 efficiency)',
      ram: '16GB Unified Memory',
      ramExpandable: false,
      storage: '512GB High-speed Unified SSD',
      storageExpandable: false,
      gpu: '10-core Apple GPU (Hardware ray tracing)',
      display: '13.6" Liquid Retina (2560x1664) True Tone 500 nits',
      colorGamut: 'Wide Color (P3) 100%',
      batteryWhr: 52.6,
      weightKg: 1.24,
    },
    whyBest: 'The supreme mobile coding & design machine. Delivers 15-18 hours of real battery life, instant wake, silent fanless operation, and native UNIX terminal environment.',
    pros: ['Incredible 15+ hour battery life with zero performance drop on battery', 'Class-leading trackpad, speaker, and P3 Liquid Retina screen', 'Best Unix/iOS/Flutter app development environment'],
    cons: ['Zero hardware upgradability post-purchase', 'Does not run native x86 Windows (CUDA for PyTorch is unsupported; uses Metal/MPS)'],
    gotchaAlerts: [
      'Never buy the 8GB RAM base model for programming or graphic design in 2026. Always configure with minimum 16GB Unified Memory.',
    ],
  },
  {
    id: 'asus-rog-zephyrus-g16-rtx4060',
    name: 'ASUS ROG Zephyrus G16 / TUF A15 (RTX 4060)',
    brand: 'ASUS',
    modelCode: 'FA507NV / GU603',
    approxPriceInr: 96990,
    tier: 'future_proof',
    suitableDomains: ['3d_video', 'ai_ml', 'programming'],
    specs: {
      cpu: 'AMD Ryzen 7 7735HS / Intel Core i7 13620H',
      ram: '16GB DDR5 4800MHz (Upgradeable up to 64GB)',
      ramExpandable: true,
      storage: '1TB PCIe Gen4 NVMe SSD',
      storageExpandable: true,
      gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (140W Max TGP)',
      display: '15.6" FHD 144Hz / 2.5K 165Hz IPS',
      colorGamut: '100% sRGB',
      batteryWhr: 90,
      weightKg: 2.2,
    },
    whyBest: 'Ultimate workstation for 3D animators, video editors, and AI/ML engineers. The 8GB RTX 4060 with full 140W TGP provides true desktop-class rendering and CUDA acceleration.',
    pros: ['Full-power 140W RTX 4060 with DLSS 3 frame generation', 'Huge 90Whr battery for a gaming machine', 'Full upgradability for both RAM slots and dual SSD slots'],
    cons: ['Heavy total package with power adapter (~2.8kg)'],
    gotchaAlerts: [
      'Ensure the MUX Switch / NVIDIA Advanced Optimus is enabled in Armoury Crate to bypass the iGPU for 10-15% extra FPS and render throughput.',
    ],
  },
];

export interface DesktopComponentItem {
  name: string;
  category: 'cpu' | 'motherboard' | 'ram' | 'gpu' | 'storage' | 'psu' | 'case' | 'cooler' | 'monitor';
  specNote: string;
  approxPriceInr: number;
}

export interface DesktopBuildSheet {
  id: string;
  name: string;
  tagline: string;
  tier: BudgetTier;
  targetDomains: WorkloadDomain[];
  towerPriceInr: number;
  totalWithMonitorInr: number;
  parts: DesktopComponentItem[];
  upsRecommendation: {
    model: string;
    specs: string;
    approxPriceInr: number;
    whyNeeded: string;
  };
  whyBest: string;
  upgradePath: string[];
}

export const DESKTOP_BUILDS: DesktopBuildSheet[] = [
  // Budget Desktop Tier
  {
    id: 'budget-dev-rig-5600g',
    name: 'Student Dev Rig (APU Edition)',
    tagline: 'Best value desktop for web development, Python, BCA, and general college coursework.',
    tier: 'budget',
    targetDomains: ['general', 'programming'],
    towerPriceInr: 32500,
    totalWithMonitorInr: 40500,
    parts: [
      { name: 'AMD Ryzen 5 5600G (6 Cores / 12 Threads with Vega 7 iGPU)', category: 'cpu', specNote: 'Includes Wraith Stealth Cooler', approxPriceInr: 10800 },
      { name: 'MSI B450M PRO-VDH MAX / Gigabyte B450M DS3H', category: 'motherboard', specNote: '4 RAM slots, M.2 NVMe slot', approxPriceInr: 5200 },
      { name: '16GB (2x8GB) Corsair Vengeance LPX DDR4 3200MHz', category: 'ram', specNote: 'Dual channel memory for max APU graphics bandwidth', approxPriceInr: 3200 },
      { name: 'Western Digital Blue SN580 500GB Gen4 NVMe SSD', category: 'storage', specNote: 'Up to 4000 MB/s read speed', approxPriceInr: 3600 },
      { name: 'DeepCool PK550D 550W 80 Plus Bronze Certified PSU', category: 'psu', specNote: 'Reliable tier-C PSU with 5-year warranty', approxPriceInr: 3300 },
      { name: 'Ant Esports ICE-100 Airflow Mid Tower Cabinet with 3x Fans', category: 'case', specNote: 'Mesh front panel for low thermals', approxPriceInr: 2500 },
      { name: 'Acer EK220Q 21.5" Full HD 100Hz IPS Monitor', category: 'monitor', specNote: '1080p, 100Hz, 99% sRGB, Eye Care', approxPriceInr: 6200 },
    ],
    upsRecommendation: {
      model: 'APC Back-UPS 600VA / 360W (BX600C-IN)',
      specs: 'Line-interactive, 15-20 mins backup for saving work',
      approxPriceInr: 3400,
      whyNeeded: 'Essential in Dimapur/Nagaland to prevent instant PC shutdown during unexpected grid trips and safeguard open projects.',
    },
    whyBest: 'Allows full PC workstation capability at just ₹32.5k tower cost, with a smooth path to plug in a dedicated RTX GPU later.',
    upgradePath: [
      'Drop in a dedicated graphics card (e.g. RTX 3050 or RTX 4060) anytime without replacing the 550W power supply.',
      'Add a second M.2 NVMe or SATA SSD when game/dataset storage requirements grow.',
    ],
  },

  // Sweet Spot Desktop Tier
  {
    id: 'sweet-spot-creator-rig-12400f',
    name: 'Designer & Full-Stack Pro Rig',
    tagline: 'High-performance workstation tuned for Figma, Adobe Suite, React, Docker, and Blender.',
    tier: 'sweet_spot',
    targetDomains: ['programming', 'design', '3d_video'],
    towerPriceInr: 59500,
    totalWithMonitorInr: 71500,
    parts: [
      { name: 'Intel Core i5 12400F (6 Cores / 12 Threads up to 4.4GHz)', category: 'cpu', specNote: 'Strong single-core IPC for Adobe & fast compilation', approxPriceInr: 9600 },
      { name: 'DeepCool AG400 ARGB 120mm Tower Air Cooler', category: 'cooler', specNote: 'Keeps CPU under 65°C under heavy render loads', approxPriceInr: 1800 },
      { name: 'ASRock B760M-HDV/M.2 D4 Motherboard', category: 'motherboard', specNote: 'PCIe 4.0, Dual M.2 slots, VRM heatsinks', approxPriceInr: 7800 },
      { name: '32GB (2x16GB) G.Skill Ripjaws V DDR4 3200MHz', category: 'ram', specNote: 'Effortlessly runs Photoshop + Android Studio + 30 Chrome tabs', approxPriceInr: 5800 },
      { name: 'ZOTAC Gaming GeForce RTX 3050 6GB / RTX 3060 12GB', category: 'gpu', specNote: 'NVIDIA CUDA acceleration for Blender and Adobe Mercury Engine', approxPriceInr: 17500 },
      { name: 'Crucial P3 Plus 1TB PCIe Gen4 NVMe SSD', category: 'storage', specNote: '5000 MB/s speed for fast asset loading', approxPriceInr: 5600 },
      { name: 'Cooler Master MWE 650W V2 80 Plus Bronze', category: 'psu', specNote: 'Robust DC-to-DC topology', approxPriceInr: 4900 },
      { name: 'Galax Revolution 05 Mesh Mid Tower with 4x ARGB Fans', category: 'case', specNote: 'Exceptional airflow and dust filters', approxPriceInr: 3300 },
      { name: 'LG 24MR400 / ASUS ProArt 24" 100% sRGB IPS Monitor', category: 'monitor', specNote: 'Calibrated color gamut for print & UI design', approxPriceInr: 8900 },
    ],
    upsRecommendation: {
      model: 'APC Back-UPS 1100VA / 660W (BX1100C-IN)',
      specs: 'Automatic Voltage Regulation (AVR), 25-30 min safe runtime',
      approxPriceInr: 6400,
      whyNeeded: 'Handles 650W PSU load spikes safely and cushions sudden voltage fluctuations common in regional areas.',
    },
    whyBest: 'Includes 32GB RAM and dedicated NVIDIA RTX graphics within a ₹60k tower budget—impossible to match in any laptop at this price.',
    upgradePath: [
      'Upgrade CPU up to Intel Core i7 13700F on the same B760 motherboard.',
      'Swap to an RTX 4070 Super in the future; the 650W PSU already has necessary headroom.',
    ],
  },

  // Future-Proof Pro Rig
  {
    id: 'future-proof-ai-workstation-7600x',
    name: 'AI, 3D & VFX Monster Workstation',
    tagline: 'High-end workstation engineered for PyTorch deep learning, 4K video rendering, and Unreal Engine.',
    tier: 'future_proof',
    targetDomains: ['ai_ml', '3d_video', 'programming'],
    towerPriceInr: 104500,
    totalWithMonitorInr: 122500,
    parts: [
      { name: 'AMD Ryzen 5 7600X (6 Cores / 12 Threads up to 5.3GHz, Zen 4)', category: 'cpu', specNote: 'AM5 platform supported with upgradeable CPUs until 2027+', approxPriceInr: 17800 },
      { name: 'Thermalright Peerless Assassin 120 SE Dual Tower Cooler', category: 'cooler', specNote: 'Near-silent dual heatsink cooler', approxPriceInr: 3800 },
      { name: 'MSI PRO B650M-A WiFi DDR5 Motherboard', category: 'motherboard', specNote: 'WiFi 6E, Bluetooth 5.3, Heavy VRM design', approxPriceInr: 14200 },
      { name: '32GB (2x16GB) Corsair Vengeance DDR5 6000MHz CL30 EXPO', category: 'ram', specNote: 'Sweet spot timing for AMD Zen 4 architecture', approxPriceInr: 9600 },
      { name: 'Inno3D / Gigabyte GeForce RTX 4060 Ti 16GB / RTX 4070 12GB', category: 'gpu', specNote: 'High VRAM essential for local LLMs, Stable Diffusion & CUDA', approxPriceInr: 39500 },
      { name: 'Kingston KC3000 1TB Gen4 NVMe SSD (7000 MB/s)', category: 'storage', specNote: 'High endurance TBW for continuous machine learning dataset writes', approxPriceInr: 7400 },
      { name: 'Corsair RM750e 750W 80 Plus Gold Fully Modular PSU', category: 'psu', specNote: 'ATX 3.0 ready with PCIe 5.0 12VHPWR cable', approxPriceInr: 8900 },
      { name: 'Lian Li Lancool 216 RGB High Airflow Mid-Tower', category: 'case', specNote: 'Includes 2x 160mm front fans for maximum GPU intake', approxPriceInr: 6800 },
      { name: 'Acer Nitro VG271U M3 27" 2K WQHD (2560x1440) 180Hz IPS Monitor', category: 'monitor', specNote: 'DCI-P3 95%, 400 nits, HDR10, Height adjustable', approxPriceInr: 16500 },
    ],
    upsRecommendation: {
      model: 'Microtek Legend 1600VA / 960W Line Interactive UPS',
      specs: 'Heavy-duty dual battery, AVR stabilization',
      approxPriceInr: 8200,
      whyNeeded: 'Guarantees uninterrupted training epochs for machine learning experiments during brownouts and power shifts.',
    },
    whyBest: 'Built on the future-proof AMD AM5 socket with DDR5 and an expansive 16GB/12GB VRAM RTX GPU, ready for the next 5 years.',
    upgradePath: [
      'AM5 socket guarantees drop-in upgrades for Ryzen 9000 series and future generations.',
      'Two spare DDR5 RAM slots allow expanding to 64GB or 128GB effortlessly.',
    ],
  },
];

export interface TradeOffFactor {
  factor: string;
  laptopVerdict: string;
  desktopVerdict: string;
  guidance: string;
}

export const LAPTOP_VS_DESKTOP_TRADEOFFS: TradeOffFactor[] = [
  {
    factor: 'Power Cuts & Inverter Compatibility',
    laptopVerdict: 'Built-in 4-8 hr battery handles power cuts effortlessly with zero disruption.',
    desktopVerdict: 'Requires an external UPS (₹3,500-₹7,000) or pure sine wave inverter to avoid crashing.',
    guidance: 'In Dimapur/Kohima where grid power fluctuates, laptops offer peace of mind. Desktop buyers MUST budget for an APC/Microtek UPS.',
  },
  {
    factor: 'Raw Performance per Rupee',
    laptopVerdict: 'Mobile chips are thermal-throttled to 25W-65W to fit slim enclosures.',
    desktopVerdict: 'Delivers 40% to 65% higher CPU/GPU sustained rendering throughput at the same price.',
    guidance: 'If pure render speed in Blender/Premiere or multi-threaded code compile speed is top priority, a desktop gives unmatched value.',
  },
  {
    factor: 'Portability & Lab Access',
    laptopVerdict: 'Take it to college, instudia classroom, coffee shops, and group hackathons.',
    desktopVerdict: 'Stationary workstation locked to your study desk.',
    guidance: 'If your college requires a laptop for exams, presentations, or instudia class sessions, a laptop is non-negotiable.',
  },
  {
    factor: 'Upgradability & Long-Term Lifespan',
    laptopVerdict: 'CPUs & GPUs are soldered. Many new models even solder RAM and Wi-Fi chips.',
    desktopVerdict: '100% modular. Upgrade RAM, GPU, storage, or monitor independently over 5-7 years.',
    guidance: 'A desktop can last 6-8 years by simply upgrading the GPU or adding more RAM as software demands grow.',
  },
  {
    factor: 'Display Size & Ergonomics',
    laptopVerdict: '14" to 15.6" screen forces downward neck hunch without a laptop riser.',
    desktopVerdict: '24" to 27" eye-level monitor with full-sized mechanical keyboard and ergonomic mouse.',
    guidance: 'For 8+ hour coding or graphic design sessions, large color-calibrated monitors provide dramatically higher productivity.',
  },
];

export interface SpecTweakOption {
  id: string;
  label: string;
  extraPriceInr: number;
  description: string;
  recommendedFor: WorkloadDomain[];
}

export const SPEC_TWEAKS: SpecTweakOption[] = [
  {
    id: 'ram-32gb',
    label: 'Upgrade to 32GB RAM (+16GB Dual-Channel)',
    extraPriceInr: 3400,
    description: 'Crucial for running Docker containers, Android Studio emulators, and 300DPI Photoshop artboards simultaneously without sluggish paging.',
    recommendedFor: ['programming', 'design', 'ai_ml'],
  },
  {
    id: 'ssd-1tb',
    label: 'Upgrade to 1TB Gen4 High-Speed NVMe SSD',
    extraPriceInr: 3200,
    description: 'Double your storage for large node_modules directories, local PyTorch model weights, and 4K video scratch files.',
    recommendedFor: ['3d_video', 'ai_ml', 'programming'],
  },
  {
    id: 'ups-backup',
    label: 'Add 600VA-1100VA Line-Interactive UPS',
    extraPriceInr: 3800,
    description: 'Provides 15-25 minutes of automatic battery backup during local power trips, safeguarding uncommitted code and project files.',
    recommendedFor: ['general', 'programming', 'design', '3d_video', 'ai_ml'],
  },
  {
    id: 'monitor-color',
    label: 'Add 24" IPS 100% sRGB Color-Calibrated Second Screen',
    extraPriceInr: 8900,
    description: 'Transform your setup into a dual-screen productivity powerhouse: code on one screen, live preview/Figma on the other.',
    recommendedFor: ['programming', 'design', '3d_video'],
  },
];

