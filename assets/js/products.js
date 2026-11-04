/**
 * كفو (Kafu) - قاعدة بيانات المنتجات والفئات والسيارات مع دعم رقم الهيكل (VIN)
 */

// مولد رسومات توضيحية لقطع الغيار بصيغة SVG فائقة الدقة
const PartGraphics = {
  piston: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#94A3B8"/>
          <stop offset="50%" stop-color="#CBD5E1"/>
          <stop offset="100%" stop-color="#64748B"/>
        </linearGradient>
        <linearGradient id="bronze" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#B45309"/>
        </linearGradient>
      </defs>
      <rect x="42" y="24" width="76" height="58" rx="8" fill="url(#metal)"/>
      <line x1="42" y1="36" x2="118" y2="36" stroke="#475569" stroke-width="2.5"/>
      <line x1="42" y1="46" x2="118" y2="46" stroke="#475569" stroke-width="2.5"/>
      <line x1="42" y1="56" x2="118" y2="56" stroke="#475569" stroke-width="2.5"/>
      <circle cx="80" cy="62" r="7" fill="#334155"/>
      <!-- Connecting rod -->
      <path d="M73 66 L70 126 A14 14 0 0 0 90 126 L87 66 Z" fill="url(#metal)" stroke="#475569" stroke-width="2"/>
      <circle cx="80" cy="126" r="8" fill="url(#bronze)"/>
      <circle cx="80" cy="126" r="4" fill="#1E293B"/>
    </svg>
  `)}`,

  oilFilter: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <linearGradient id="canister" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1E293B"/>
          <stop offset="40%" stop-color="#334155"/>
          <stop offset="70%" stop-color="#1E293B"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>
      </defs>
      <rect x="44" y="32" width="72" height="92" rx="14" fill="url(#canister)"/>
      <rect x="52" y="22" width="56" height="12" rx="4" fill="#94A3B8"/>
      <!-- Filter texture / flutes -->
      <line x1="56" y1="42" x2="56" y2="114" stroke="#475569" stroke-width="2"/>
      <line x1="72" y1="42" x2="72" y2="114" stroke="#475569" stroke-width="2"/>
      <line x1="88" y1="42" x2="88" y2="114" stroke="#475569" stroke-width="2"/>
      <line x1="104" y1="42" x2="104" y2="114" stroke="#475569" stroke-width="2"/>
      <circle cx="80" cy="78" r="14" fill="#0A6CFF" opacity="0.8"/>
      <path d="M74 78 Q80 72 86 78 Q80 84 74 78 Z" fill="#FFFFFF"/>
    </svg>
  `)}`,

  brakes: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <radialGradient id="disc">
          <stop offset="40%" stop-color="#E2E8F0"/>
          <stop offset="85%" stop-color="#94A3B8"/>
          <stop offset="100%" stop-color="#64748B"/>
        </radialGradient>
      </defs>
      <!-- Rotor -->
      <circle cx="80" cy="80" r="54" fill="url(#disc)" stroke="#475569" stroke-width="3"/>
      <circle cx="80" cy="80" r="28" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/>
      <circle cx="80" cy="80" r="12" fill="#F8FAFC"/>
      <circle cx="80" cy="46" r="2.5" fill="#334155"/>
      <circle cx="80" cy="114" r="2.5" fill="#334155"/>
      <circle cx="46" cy="80" r="2.5" fill="#334155"/>
      <circle cx="114" cy="80" r="2.5" fill="#334155"/>
      <!-- Caliper -->
      <path d="M92 40 C120 45 132 75 130 102 L112 98 C114 78 106 58 88 54 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
      <circle cx="116" cy="72" r="5" fill="#FFFFFF" opacity="0.6"/>
    </svg>
  `)}`,

  battery: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <rect x="36" y="44" width="88" height="74" rx="8" fill="#1E293B"/>
      <rect x="46" y="32" width="18" height="14" rx="2" fill="#DC2626"/>
      <rect x="96" y="32" width="18" height="14" rx="2" fill="#2563EB"/>
      <rect x="44" y="60" width="72" height="24" rx="4" fill="#0A6CFF"/>
      <text x="80" y="76" font-size="12" font-weight="bold" fill="#FFF" text-anchor="middle" font-family="sans-serif">BOSCH</text>
    </svg>
  `)}`,

  shock: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <rect x="75" y="24" width="10" height="48" fill="#CBD5E1" stroke="#64748B"/>
      <circle cx="80" cy="22" r="9" fill="#475569"/>
      <path d="M66 45 Q94 48 66 54 Q94 58 66 64 Q94 68 66 74 Q94 78 66 84 Q94 88 66 94" fill="none" stroke="#EA580C" stroke-width="7" stroke-linecap="round"/>
      <rect x="68" y="90" width="24" height="48" rx="4" fill="#1E293B"/>
      <circle cx="80" cy="138" r="9" fill="#475569"/>
    </svg>
  `)}`,

  headlight: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E0F2FE" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#BAE6FD" stop-opacity="0.5"/>
        </linearGradient>
      </defs>
      <path d="M36 50 C70 42 120 54 134 80 C124 108 70 114 36 102 Z" fill="url(#glassGrad)" stroke="#38BDF8" stroke-width="2.5"/>
      <circle cx="98" cy="78" r="18" fill="#0284C7"/>
      <circle cx="98" cy="78" r="10" fill="#FDE047"/>
    </svg>
  `)}`,

  sparkPlug: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <rect x="73" y="24" width="14" height="38" rx="3" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
      <polygon points="68,62 92,62 95,74 65,74" fill="#64748B"/>
      <rect x="72" y="74" width="16" height="34" fill="#94A3B8"/>
      <rect x="78" y="108" width="4" height="12" fill="#E2E8F0"/>
    </svg>
  `)}`,

  bumper: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <linearGradient id="bumperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#334155"/>
          <stop offset="50%" stop-color="#475569"/>
          <stop offset="100%" stop-color="#1E293B"/>
        </linearGradient>
      </defs>
      <path d="M16 68 C24 50 136 50 144 68 L138 98 C128 108 32 108 22 98 Z" fill="url(#bumperGrad)" stroke="#0F172A" stroke-width="2.5"/>
      <rect x="36" y="74" width="88" height="18" rx="4" fill="#0F172A" opacity="0.8"/>
      <line x1="42" y1="83" x2="118" y2="83" stroke="#64748B" stroke-width="1.5"/>
      <circle cx="30" cy="83" r="5" fill="#38BDF8"/>
      <circle cx="130" cy="83" r="5" fill="#38BDF8"/>
    </svg>
  `)}`,

  radiator: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <rect x="28" y="32" width="104" height="96" rx="8" fill="#1E293B" stroke="#475569" stroke-width="2.5"/>
      <rect x="36" y="42" width="88" height="76" rx="4" fill="#0F172A"/>
      <!-- Fins -->
      <line x1="44" y1="42" x2="44" y2="118" stroke="#38BDF8" stroke-width="1.8" opacity="0.6"/>
      <line x1="56" y1="42" x2="56" y2="118" stroke="#38BDF8" stroke-width="1.8" opacity="0.6"/>
      <line x1="68" y1="42" x2="68" y2="118" stroke="#38BDF8" stroke-width="1.8" opacity="0.6"/>
      <line x1="80" y1="42" x2="80" y2="118" stroke="#38BDF8" stroke-width="1.8" opacity="0.6"/>
      <line x1="92" y1="42" x2="92" y2="118" stroke="#38BDF8" stroke-width="1.8" opacity="0.6"/>
      <line x1="104" y1="42" x2="104" y2="118" stroke="#38BDF8" stroke-width="1.8" opacity="0.6"/>
      <line x1="116" y1="42" x2="116" y2="118" stroke="#38BDF8" stroke-width="1.8" opacity="0.6"/>
      <circle cx="120" cy="38" r="5" fill="#EF4444"/>
    </svg>
  `)}`,

  mount: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <circle cx="80" cy="80" r="48" fill="#334155" stroke="#1E293B" stroke-width="3"/>
      <circle cx="80" cy="80" r="28" fill="#0F172A"/>
      <circle cx="80" cy="80" r="12" fill="#94A3B8" stroke="#64748B" stroke-width="2"/>
      <circle cx="80" cy="42" r="5" fill="#F8FAFC"/>
      <circle cx="118" cy="80" r="5" fill="#F8FAFC"/>
      <circle cx="42" cy="80" r="5" fill="#F8FAFC"/>
      <circle cx="80" cy="118" r="5" fill="#F8FAFC"/>
    </svg>
  `)}`
};

// الفئات الست مرتبة في صفين تحت بعض (3 بالصف الأول و3 بالصف الثاني)
const CATEGORIES = [
  // الصف الأول (3 عناصر)
  { id: 'engine', name: 'المحرك', iconClass: 'tile-engine', icon: 'engine', color: 'var(--tile-blue)' },
  { id: 'brakes', name: 'الفرامل', iconClass: 'tile-brakes', icon: 'brakes', color: 'var(--tile-peach)' },
  { id: 'electrical', name: 'الكهرباء', iconClass: 'tile-electrical', icon: 'battery', color: 'var(--tile-lavender)' },

  // الصف الثاني (3 عناصر)
  { id: 'oils', name: 'الزيوت والفلاتر', iconClass: 'tile-oils', icon: 'oils', color: 'var(--tile-teal)' },
  { id: 'suspension', name: 'التعليق', iconClass: 'tile-suspension', icon: 'suspension', color: 'var(--tile-orange)' },
  { id: 'lighting', name: 'الإضاءة', iconClass: 'tile-lighting', icon: 'lighting', color: 'var(--tile-yellow)' }
];

// قائمة المنتجات مع أرقام الهيكل المتوافقة (VIN / Chassis Number) - صور قطع غيار حقيقية وأسعار محددة
const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'طقم مكبس محرك كامل',
    brand: 'Toyota OEM',
    oem: 'OP010-13101',
    category: 'engine',
    condition: 'original',
    conditionLabel: 'أصلي وكالة (OEM)',
    price: 480,
    image: 'assets/images/products/part_piston.jpg',
    available: true,
    rating: 4.9,
    reviewsCount: 18,
    seller: 'متجر كفو للقطع · الرياض',
    description: 'قطعة أصلية معتمدة مناسبة للمحركات المتوافقة بدقة أداء المصنع ومقاومة عالية لدرجات الحرارة والضغط.',
    merchantSpecs: {
      partName: 'طقم مكبس محرك كامل (Engine Piston Set)',
      vinNumber: '4T1B11HK2NU...... (إن وجد)',
      oemNumber: 'OP010-13101',
      vehicleMake: 'تويوتا (Toyota)',
      vehicleModel: 'كامري (Camry)',
      yearsRange: '2018 – 2025',
      engine: '2.5 ليتر (2.5L)',
      position: 'داخل المحرك (Internal Engine)',
      compatibility: 'مؤكد (Confirmed)'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B', 'JTDK', 'JTDN'] },
      { make: 'تويوتا', model: 'راف 4', years: ['2019', '2020', '2021', '2022', '2023', '2024'], vinPrefixes: ['2T3F', 'JTMH'] },
      { make: 'لكزس', model: 'ES250', years: ['2019', '2020', '2021', '2022', '2023'], vinPrefixes: ['JTHB'] }
    ],
    specs: {
      origin: 'اليابان',
      warranty: 'ضمان سنة كاملة ضد عيوب التصنيع',
      weight: '2.4 كجم',
      material: 'سبائك ألومنيوم مقوى معالج حرارياً'
    }
  },
  {
    id: 'prod-2',
    name: 'زيت محرك تخليقي وفلتر أصلي',
    brand: 'Toyota Genuine',
    oem: 'YZZD1-90915',
    category: 'oils',
    condition: 'original',
    conditionLabel: 'أصلي وكالة (OEM)',
    price: 85,
    image: 'assets/images/products/synthetic_oil.jpg',
    available: true,
    rating: 5.0,
    reviewsCount: 42,
    seller: 'كفو إكسبرس · جدة',
    description: 'فلتر زيت أصلي مع زيت تخليقي يضمن تدفق الزيت النقي وتصفية الشوائب بدقة عالية للحفاظ على عمر المحرك.',
    merchantSpecs: {
      partName: 'فلتر زيت محرك أصلي (Engine Oil Filter)',
      vinNumber: 'JTNB11RE8P...... (إن وجد)',
      oemNumber: 'YZZD1-90915',
      vehicleMake: 'تويوتا (Toyota)',
      vehicleModel: 'كامري / كورولا (Camry / Corolla)',
      yearsRange: '2015 – 2025',
      engine: '2.0L / 2.5L',
      position: 'أسفل المحرك (Engine Base)',
      compatibility: 'مؤكد (Confirmed)'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B', 'JTDK', 'JTDN'] },
      { make: 'تويوتا', model: 'كورولا', years: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['JTNB'] },
      { make: 'تويوتا', model: 'هايلكس', years: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['MROF'] },
      { make: 'تويوتا', model: 'لاندكروزر', years: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'], vinPrefixes: ['JTMH'] }
    ],
    specs: {
      origin: 'اليابان',
      warranty: 'أصلي مضمون 100%',
      weight: '350 جرام',
      material: 'صمام سيليكون مضاد للرجوع مع ألياف دقيقة'
    }
  },
  {
    id: 'prod-3',
    name: 'طقم فحمات فرامل أمامية سيراميك',
    brand: 'Akebono OEM',
    oem: '04465-33480',
    category: 'brakes',
    condition: 'commercial',
    conditionLabel: 'تجاري درجة أولى',
    price: 195,
    image: 'assets/images/products/part_brake_pads.jpg',
    available: true,
    rating: 4.8,
    reviewsCount: 29,
    seller: 'كفو برو · الدمام',
    description: 'فحمات سيراميك هادئة تمنح استجابة فورية بدون غبار أسود وبدون صوت صفير مع أداء حراري ممتاز.',
    merchantSpecs: {
      partName: 'فحمات / قماشات الفرامل (Brake Pad)',
      vinNumber: '4T1B21HK5MU...... (إن وجد)',
      oemNumber: '04465-33480',
      vehicleMake: 'تويوتا (Toyota)',
      vehicleModel: 'كامري (Camry)',
      yearsRange: '2021 – 2023',
      engine: '2.5 ليتر (2.5L)',
      position: 'أمامي (Front)',
      compatibility: 'مؤكد (Confirmed)'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B', 'JTDK'] },
      { make: 'تويوتا', model: 'أفالون', years: ['2019', '2020', '2021', '2022'], vinPrefixes: ['4T1B'] },
      { make: 'لكزس', model: 'ES350', years: ['2019', '2020', '2021', '2022', '2023'], vinPrefixes: ['JTHB'] }
    ],
    specs: {
      origin: 'اليابان',
      warranty: 'ضمان 6 أشهر أو 20,000 كم',
      weight: '1.8 كجم',
      material: 'تركيبة سيراميك متقدمة مع شرائح تخميد الصوت'
    }
  },
  {
    id: 'prod-4',
    name: 'بطارية بوش عالية الأداء 70 أمبير',
    brand: 'Bosch S4',
    oem: 'S4008-570',
    category: 'electrical',
    condition: 'original',
    conditionLabel: 'أصلي معتمد (OEM)',
    price: 340,
    image: 'assets/images/products/part_battery.jpg',
    available: true,
    rating: 4.9,
    reviewsCount: 35,
    seller: 'كفو إكسبرس · الرياض',
    description: 'بطارية جافة خالية من الصيانة مع تقنية شبكة باور فريم لعمر أطول وقوة تشغيل ممتازة في درجات الحرارة العالية.',
    merchantSpecs: {
      partName: 'بطارية بوش عالية الأداء (Bosch S4 Battery)',
      vinNumber: '4T1B21HK5MU...... (إن وجد)',
      oemNumber: 'S4008-570',
      vehicleMake: 'تويوتا / هيونداي (Toyota / Hyundai)',
      vehicleModel: 'كامري / سوناتا (Camry / Sonata)',
      yearsRange: '2018 – 2025',
      engine: '2.5L / 2.0L',
      position: 'حجرة المحرك (Engine Bay)',
      compatibility: 'مؤكد (Confirmed)'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B'] },
      { make: 'هيونداي', model: 'سوناتا', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'], vinPrefixes: ['KMHE'] }
    ],
    specs: {
      origin: 'ألمانيا / التشيك',
      warranty: 'ضمان 12 شهر استبدال فوري',
      weight: '16.5 كجم',
      material: 'PowerFrame Grid Technology'
    }
  },
  {
    id: 'prod-5',
    name: 'مساعد أمامي هيدروليك ياباني',
    brand: 'KYB Japan',
    oem: '3340156-KY',
    category: 'suspension',
    condition: 'commercial',
    conditionLabel: 'تجاري ياباني درجة أولى',
    price: 260,
    image: 'assets/images/products/suspension_shock.jpg',
    available: true,
    rating: 4.7,
    reviewsCount: 14,
    seller: 'متجر كفو للقطع · الرياض',
    description: 'مساعد سيارة ياباني الصنع يمنح ثباتاً متفوقاً وعزلاً للاهتزازات على مختلف الطرقات.',
    merchantSpecs: {
      partName: 'مساعد أمامي هيدروليك (Front Shock Absorber)',
      vinNumber: '4T1B11HK2NU...... (إن وجد)',
      oemNumber: '3340156-KY',
      vehicleMake: 'تويوتا (Toyota)',
      vehicleModel: 'كامري (Camry)',
      yearsRange: '2018 – 2025',
      engine: '2.5 ليتر (2.5L)',
      position: 'أمامي (Front)',
      compatibility: 'مؤكد (Confirmed)'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B', 'JTDK'] }
    ],
    specs: {
      origin: 'اليابان',
      warranty: 'ضمان سنة كاملة',
      weight: '4.2 كجم',
      material: 'صلب مقوى وغاز نيتروجين مضغوط'
    }
  },
  {
    id: 'prod-6',
    name: 'دينمو كهرباء عالي الكفاءة 130 أمبير',
    brand: 'Denso OEM',
    oem: '27060-0V210',
    category: 'electrical',
    condition: 'original',
    conditionLabel: 'أصلي وكالة (OEM)',
    price: 680,
    image: 'assets/images/products/part_alternator.jpg',
    available: true,
    rating: 5.0,
    reviewsCount: 18,
    seller: 'متجر كفو للقطع · الرياض',
    description: 'دينمو كهرباء دينسو أصلي ياباني يولد شحناً ثابتاً ومستقراً لجميع أجهزة السيارة الإلكترونية.',
    merchantSpecs: {
      partName: 'دينمو كهرباء (Alternator Assembly)',
      vinNumber: '4T1B21HK5MU...... (إن وجد)',
      oemNumber: '27060-0V210',
      vehicleMake: 'تويوتا (Toyota)',
      vehicleModel: 'كامري (Camry)',
      yearsRange: '2018 – 2025',
      engine: '2.5L',
      position: 'حجرة المحرك (Engine Bay)',
      compatibility: 'مؤكد (Confirmed)'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B', 'JTDK'] }
    ],
    specs: {
      origin: 'اليابان',
      warranty: 'ضمان سنتين',
      weight: '5.2 كجم',
      material: 'نحاس نقي وألومنيوم مقاوم لدرجات الحرارة'
    }
  },
  {
    id: 'prod-7',
    name: 'هوب فرامل بريمبو مخرم ومبرد للحرارة',
    brand: 'Brembo Sport',
    oem: '43512-06150',
    category: 'brakes',
    condition: 'original',
    conditionLabel: 'أصلي وكالة (OEM)',
    price: 340,
    image: 'assets/images/products/part_brake_rotor.jpg',
    available: true,
    rating: 4.9,
    reviewsCount: 22,
    seller: 'متجر كفو للقطع · الرياض',
    description: 'هوب فرامل مخرم بتصميم إيطالي يقلل حرارة المكابح ويمنع رجة الفرامل ويوفر توقفاً فورياً.',
    specs: {
      origin: 'إيطاليا',
      warranty: 'ضمان سنتين كاملتين',
      weight: '7.8 كجم',
      material: 'حديد زهر معالج بالكربون عالي الكثافة'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B', 'JTDK'] }
    ]
  },
  {
    id: 'prod-8',
    name: 'طقم بواجى ليزر إيريديوم 4 حبات',
    brand: 'NGK Laser Iridium',
    oem: '90919-01253',
    category: 'engine',
    condition: 'commercial',
    conditionLabel: 'تجاري درجة أولى',
    price: 85,
    image: 'assets/images/products/part_spark_plug.jpg',
    available: true,
    rating: 4.9,
    reviewsCount: 38,
    seller: 'مركز قطع الغيار السريعة · جدة',
    description: 'بواجي ليزر إيريديوم تمنح شرارة إشعال مركزة وتوفيراً ملحوظاً في صرفية الوقود.',
    specs: {
      origin: 'اليابان (معتمد NGK)',
      warranty: 'ضمان 100,000 كم',
      weight: '250 جرام',
      material: 'قطب إيريديوم دقيق مع طلاء بلاتين'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B', 'JTDK'] }
    ]
  },
  {
    id: 'prod-9',
    name: 'شاحن توربيني تشليح أصلي بحالة ممتازة',
    brand: 'تشليح كفو المعتمد',
    oem: '17201-11080-USED',
    category: 'engine',
    condition: 'scrap',
    conditionLabel: 'تشليح وسكراب مضمون',
    price: 850,
    image: 'assets/images/products/part_turbo.jpg',
    available: true,
    rating: 4.8,
    reviewsCount: 15,
    seller: 'تشليح الحائر المعتمد · الرياض',
    description: 'توربو أصلي مفكوك من سيارة وارد وكالة بحالة ممتازة ومفحوص ضغط الريش والزيت.',
    specs: {
      origin: 'اليابان (مستعمل وكالة)',
      warranty: 'ضمان تشغيل وسلامة 30 يوم مع إمكانية الاسترجاع',
      weight: '6.4 كجم',
      material: 'تيتانيوم وسبائك ألومنيوم'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B', 'JTDK'] }
    ]
  },
  {
    id: 'prod-10',
    name: 'دبة شكمان وعادم ستانلس ستيل مع الحساس',
    brand: 'Bosal Exhaust',
    oem: '17420-0V120',
    category: 'engine',
    condition: 'commercial',
    conditionLabel: 'تجاري درجة أولى',
    price: 520,
    image: 'assets/images/products/exhaust_system.jpg',
    available: true,
    rating: 4.7,
    reviewsCount: 19,
    seller: 'كفو إكسبرس · الرياض',
    description: 'شكمان ستانلس ستيل مقاوم للصدأ مطابق للمقاسات الأصلية مع فتحات تثبيت الحساسات.',
    specs: {
      origin: 'أوروبي',
      warranty: 'ضمان سنتين ضد الصدأ',
      weight: '7.6 كجم',
      material: 'ستانلس ستيل SUS304'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B', 'JTDK'] }
    ]
  },
  {
    id: 'prod-11',
    name: 'مساعد هيدروليكي تشليح وكالة نظيف جداً',
    brand: 'تشليح كفو المعتمد',
    oem: '48510-80542-USED',
    category: 'suspension',
    condition: 'scrap',
    conditionLabel: 'تشليح وسكراب مضمون',
    price: 160,
    image: 'assets/images/products/suspension_shock.jpg',
    available: true,
    rating: 4.8,
    reviewsCount: 11,
    seller: 'تشليح كفو المركزي · جدة',
    description: 'مساعد أصلي مفكوك من سيارة حديثة سليم 100% بدون أي تسريب زيت ومفحوص على أجهزة الاختبار.',
    specs: {
      origin: 'اليابان (مستعمل أصلي)',
      warranty: 'ضمان شهر كامل مع الاستبدال',
      weight: '4.2 كجم',
      material: 'صلب شد بلد'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B', 'JTDK'] }
    ]
  },
  {
    id: 'prod-12',
    name: 'مجموعة تروس وجير أوتوماتيكي وكالة',
    brand: 'Aisin Warner',
    oem: '35000-33620',
    category: 'engine',
    condition: 'original',
    conditionLabel: 'أصلي وكالة (OEM)',
    price: 1180,
    image: 'assets/images/welcome-gear.jpg',
    available: true,
    rating: 5.0,
    reviewsCount: 26,
    seller: 'مركز الجيربوكس المتخصص · الرياض',
    description: 'مجموعة تروس وجير أوتوماتيكي كاملة يابانية الصنع معتمدة تضمن تبديل ناعم وسلس.',
    specs: {
      origin: 'اليابان',
      warranty: 'ضمان سنة كاملة',
      weight: '14.5 كجم',
      material: 'فولاذ كربوني مقسى'
    },
    compatibleCars: [
      { make: 'تويوتا', model: 'كامري', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'], vinPrefixes: ['4T1B', 'JTDK'] }
    ]
  }
];

// قاعدة بيانات ورش الصيانة المعتمدة
const WORKSHOPS_DATABASE = [
  {
    id: 'ws-1',
    name: 'مركز النخبة المتخصص للميكانيكا والمحركات',
    specialty: 'mechanics',
    specialtyLabel: 'ميكانيكا وتوضيب',
    rating: 4.9,
    reviewsCount: 184,
    distance: '2.4 كم',
    district: 'صناعية الدائري - الرياض',
    phone: '+966 50 882 1990',
    services: ['توضيب قير ومكينة', 'فحص دوري شامل', 'تبديل مساعدات وعضلات'],
    discountPercent: 15,
    verified: true,
    image: '🔧'
  },
  {
    id: 'ws-2',
    name: 'ورشة الوفاء للسمكرة ورش البوية بالفرن',
    specialty: 'bodywork',
    specialtyLabel: 'سمكرة وبودي ودهان',
    rating: 4.8,
    reviewsCount: 215,
    distance: '3.8 كم',
    district: 'صناعية أم الحمام - الرياض',
    phone: '+966 55 410 8872',
    services: ['سمكرة حوادث على البارد', 'رش بوية أصلية بالفرن', 'سحب شاص وميزان ليزر'],
    discountPercent: 15,
    verified: true,
    image: '🎨'
  },
  {
    id: 'ws-3',
    name: 'مركز دقة التشخيص للكهرباء والتكييف وبرمجة الكمبيوتر',
    specialty: 'electrical',
    specialtyLabel: 'كهرباء وتكييف وفحص',
    rating: 5.0,
    reviewsCount: 96,
    distance: '4.1 كم',
    district: 'صناعية العاصمة - الرياض',
    phone: '+966 53 119 4433',
    services: ['فحص كمبيوتر وكشف أعطال OBD', 'إصلاح كمبروسر وشحن فريون', 'برمجة حساسات ومفاتيح'],
    discountPercent: 10,
    verified: true,
    image: '⚡'
  },
  {
    id: 'ws-4',
    name: 'ورشة أوتو فكس لميزان الأذرعة والمساعدات',
    specialty: 'suspension',
    specialtyLabel: 'عضلات ومساعدات وميزان',
    rating: 4.7,
    reviewsCount: 142,
    distance: '5.6 كم',
    district: 'صناعية الشفاء - الرياض',
    phone: '+966 54 992 3311',
    services: ['وزن أذرعة بالليزر ثلاثي الأبعاد', 'تغيير كراسي مساعدات ومقصات', 'فحص أصوات القرقرة والهبوط'],
    discountPercent: 15,
    verified: true,
    image: '🛠️'
  }
];

// قائمة السيارات للاختيار والمطابقة
const CARS_DATABASE = [
  {
    make: 'تويوتا',
    models: ['كامري', 'كورولا', 'هايلكس', 'راف 4', 'لاندكروزر', 'يارس', 'أفالون', 'فورتشنر']
  },
  {
    make: 'هيونداي',
    models: ['سوناتا', 'إلنترا', 'أكسنت', 'توسان', 'سنتافي', 'أزيرا']
  },
  {
    make: 'نيسان',
    models: ['ألتيما', 'مكسيما', 'باترول', 'صني', 'إكس تريل', 'نافارا']
  },
  {
    make: 'فورد',
    models: ['تورس', 'إكسبلورر', 'إف 150', 'إيدج', 'إكسبيديشن']
  },
  {
    make: 'لكزس',
    models: ['ES350', 'ES250', 'LS500', 'RX350', 'LX600']
  },
  {
    make: 'كيا',
    models: ['K5', 'سيراتو', 'سبورتاج', 'سورينتو', 'كادينزا']
  }
];

const CAR_YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];

// فحص توافق القطعة مع السيارة المحددة
function checkCompatibility(product, selectedCar) {
  if (!selectedCar || !selectedCar.make) {
    return { status: 'unknown', text: 'تحقق من سيارتك قبل الشراء' };
  }
  
  const isMatch = product.compatibleCars.some(c => {
    const makeMatch = c.make.trim().toLowerCase() === selectedCar.make.trim().toLowerCase() ||
                      (selectedCar.make.toLowerCase().includes('toyota') && c.make === 'تويوتا') ||
                      (selectedCar.make.toLowerCase().includes('camry') && c.model === 'كامري');
    const modelMatch = !selectedCar.model || c.model.trim().toLowerCase() === selectedCar.model.trim().toLowerCase() ||
                       (selectedCar.model.toLowerCase().includes('camry') && c.model === 'كامري');
    const yearMatch = !selectedCar.year || c.years.includes(selectedCar.year.toString());
    return makeMatch && modelMatch && yearMatch;
  });

  if (isMatch) {
    return {
      status: 'compatible',
      text: `✓ متوافق مع ${selectedCar.displayName || (selectedCar.make + ' ' + (selectedCar.model || '') + ' ' + (selectedCar.year || ''))}`.trim()
    };
  }

  return {
    status: 'incompatible',
    text: `✕ غير متوافق مع سيارتك الحالية`
  };
}
