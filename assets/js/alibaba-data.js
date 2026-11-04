/**
 * كفو (Kafu) - بيانات المنتجات الرسمية المتوافقة مع هوية كفو
 * صور قطع غيار أصلية فقط، وسعر واحد محدد لكل قطعة
 */

const KAFU_SPARE_PARTS = [
  {
    id: 'part-1',
    image: 'assets/images/products/part_brake_pads.jpg',
    title: 'طقم فحمات فرامل سيراميك أمامية عالية الأداء',
    brand: 'Akebono OEM',
    oem: '04465-33480',
    price: 195,
    currency: 'ر.س',
    category: 'فرامل',
    badges: [
      { type: 'oem', label: 'أصلي وكالة' },
      { type: 'compat', label: 'متوافق 100%' }
    ],
    warranty: 'ضمان سنة كاملة',
    rating: 4.9,
    reviewsCount: 38,
    seller: 'كفو للقطع الأصلية · الرياض'
  },
  {
    id: 'part-2',
    image: 'assets/images/products/part_brake_rotor.jpg',
    title: 'هوب فرامل بريمبو مخرم ومبرد للحرارة العالية',
    brand: 'Brembo Sport',
    oem: '43512-06150',
    price: 340,
    currency: 'ر.س',
    category: 'فرامل',
    badges: [
      { type: 'oem', label: 'معتمد كفو' },
      { type: 'compat', label: 'متوافق 100%' }
    ],
    warranty: 'ضمان سنتين',
    rating: 5.0,
    reviewsCount: 24,
    seller: 'مركز بريمبو المعتمد · جدة'
  },
  {
    id: 'part-3',
    image: 'assets/images/products/part_spark_plug.jpg',
    title: 'طقم بواجى ليزر إيريديوم 4 حبات شرارة فائقة',
    brand: 'NGK Laser Iridium',
    oem: '90919-01253',
    price: 85,
    currency: 'ر.س',
    category: 'محرك',
    badges: [
      { type: 'oem', label: 'ياباني أصلي' },
      { type: 'compat', label: 'متوافق 100%' }
    ],
    warranty: 'ضمان 100,000 كم',
    rating: 4.9,
    reviewsCount: 56,
    seller: 'متجر كفو السريع'
  },
  {
    id: 'part-4',
    image: 'assets/images/products/part_turbo.jpg',
    title: 'شاحن توربيني متكامل مع صمام ضغط إلكتروني',
    brand: 'Garrett OEM',
    oem: '17201-11080',
    price: 1450,
    currency: 'ر.س',
    category: 'محرك',
    badges: [
      { type: 'oem', label: 'أصلي وكالة' },
      { type: 'compat', label: 'فحص كمبيوتر معتمد' }
    ],
    warranty: 'ضمان 18 شهر',
    rating: 4.8,
    reviewsCount: 19,
    seller: 'مؤسسة التوربو المتقدم'
  },
  {
    id: 'part-5',
    image: 'assets/images/products/part_piston.jpg',
    title: 'طقم مكبس محرك متكامل مع الذراع والشنابر',
    brand: 'Toyota Genuine',
    oem: '13101-25030',
    price: 480,
    currency: 'ر.س',
    category: 'محرك',
    badges: [
      { type: 'oem', label: 'وكالة OEM' },
      { type: 'compat', label: 'مطابقة VIN' }
    ],
    warranty: 'ضمان سنة كاملة',
    rating: 4.9,
    reviewsCount: 15,
    seller: 'وكالة تويوتا المعتمدة'
  },
  {
    id: 'part-6',
    image: 'assets/images/products/part_battery.jpg',
    title: 'بطارية سيارة بوش 70 أمبير تقنية AGM الألمانية',
    brand: 'Bosch S5 AGM',
    oem: '0092S5A080',
    price: 420,
    currency: 'ر.س',
    category: 'كهرباء',
    badges: [
      { type: 'oem', label: 'ألماني أصلي' },
      { type: 'compat', label: 'شحن فوري' }
    ],
    warranty: 'ضمان سنتين واستبدال فوري',
    rating: 5.0,
    reviewsCount: 88,
    seller: 'بوش لخدمات السيارات'
  },
  {
    id: 'part-7',
    image: 'assets/images/products/part_alternator.jpg',
    title: 'دينمو كهرباء عالي الكفاءة 130 أمبير مع بكرة مسننة',
    brand: 'Denso OEM',
    oem: '27060-0V210',
    price: 680,
    currency: 'ر.س',
    category: 'كهرباء',
    badges: [
      { type: 'oem', label: 'دينسو ياباني' },
      { type: 'compat', label: 'متوافق 100%' }
    ],
    warranty: 'ضمان سنة',
    rating: 4.9,
    reviewsCount: 22,
    seller: 'شركة دينسو للكهربائيات'
  },
  {
    id: 'part-8',
    image: 'assets/images/products/suspension_shock.jpg',
    title: 'مساعد هيدروليكي أمامي مع قاعدة الياي والمطاط',
    brand: 'KYB Excel-G',
    oem: '48510-80542',
    price: 210,
    currency: 'ر.س',
    category: 'مساعدات',
    badges: [
      { type: 'oem', label: 'أصلي وكالة' },
      { type: 'compat', label: 'متوافق 100%' }
    ],
    warranty: 'ضمان سنة',
    rating: 4.8,
    reviewsCount: 47,
    seller: 'كفو لأنظمة التعليق'
  },
  {
    id: 'part-9',
    image: 'assets/images/products/synthetic_oil.jpg',
    title: 'زيت محرك تخليقي بالكامل 5W-30 كرتون 12 علبة',
    brand: 'Mobil 1 Full Synthetic',
    oem: 'M1-5W30-12',
    price: 360,
    currency: 'ر.س',
    category: 'زيوت',
    badges: [
      { type: 'oem', label: 'معتمد وكالة' },
      { type: 'compat', label: 'توصيل مجاني' }
    ],
    warranty: 'أصلي ومختوم بالليزر',
    rating: 5.0,
    reviewsCount: 110,
    seller: 'مستودع الزيوت المركزي'
  },
  {
    id: 'part-10',
    image: 'assets/images/products/exhaust_system.jpg',
    title: 'دبة شكمان وعادم ستانلس ستيل مع حساس أكسجين',
    brand: 'Bosal Exhaust',
    oem: '17420-0V120',
    price: 520,
    currency: 'ر.س',
    category: 'عوادم',
    badges: [
      { type: 'oem', label: 'ستانلس ستيل' },
      { type: 'compat', label: 'مطابق للمواصفات' }
    ],
    warranty: 'ضمان سنتين ضد الصدأ',
    rating: 4.7,
    reviewsCount: 18,
    seller: 'كفو للأنظمة الميكانيكية'
  },
  {
    id: 'part-11',
    image: 'assets/images/welcome-parts.jpg',
    title: 'طقم بستن وبلوك محرك متكامل مع الشنابر والسبائك',
    brand: 'Toyota Racing',
    oem: '13101-31090',
    price: 790,
    currency: 'ر.س',
    category: 'محرك',
    badges: [
      { type: 'oem', label: 'أصلي وكالة' },
      { type: 'compat', label: 'متوافق 100%' }
    ],
    warranty: 'ضمان سنة',
    rating: 4.9,
    reviewsCount: 31,
    seller: 'كفو للمحركات'
  },
  {
    id: 'part-12',
    image: 'assets/images/welcome-gear.jpg',
    title: 'مجموعة تروس وجير أوتوماتيكي مع كارتير الزيت',
    brand: 'Aisin Warner',
    oem: '35000-33620',
    price: 1180,
    currency: 'ر.س',
    category: 'محرك',
    badges: [
      { type: 'oem', label: 'آيسن ياباني' },
      { type: 'compat', label: 'متوافق 100%' }
    ],
    warranty: 'ضمان سنة كاملة',
    rating: 4.9,
    reviewsCount: 26,
    seller: 'مركز الجيربوكس المتخصص'
  }
];

// دمج المنتجات مع قائمة PRODUCTS المركزية في التطبيق لدعم السلة وصفحة تفاصيل القطعة
if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) {
  KAFU_SPARE_PARTS.forEach(p => {
    if (!PRODUCTS.find(x => x.id === p.id)) {
      PRODUCTS.push({
        id: p.id,
        name: p.title,
        brand: p.brand,
        oem: p.oem,
        category: p.category,
        condition: 'original',
        conditionLabel: 'أصلي وكالة (OEM)',
        price: p.price,
        image: p.image,
        available: true,
        rating: p.rating,
        reviewsCount: p.reviewsCount,
        seller: p.seller,
        description: p.title + ' - قطعة أصلية معتمدة ومطابقة بدقة عالية لسيارتك النشطة.',
        merchantSpecs: {
          partName: p.title,
          vinNumber: '4T1B11HK2NU...... (متوافق مع سيارتك)',
          oemNumber: p.oem,
          vehicleMake: 'تويوتا (Toyota)',
          vehicleModel: 'كامري (Camry)',
          yearsRange: '2018 – 2025',
          engine: '2.5L / Hybrid',
          position: 'حسب المخطط الفني للوكالة',
          compatibility: 'مؤكد 100%'
        },
        specs: {
          origin: p.brand.includes('Bosch') ? 'ألمانيا' : (p.brand.includes('Denso') || p.brand.includes('NGK') ? 'اليابان' : 'معتمد OEM'),
          warranty: p.warranty,
          weight: '1.5 كجم'
        }
      });
    }
  });
}
