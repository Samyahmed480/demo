/**
 * كفو (Kafu) - منصة الورشة والمهندس الفني الشاملة (Workshop & Engineer Portal)
 * تغطي:
 * 1. تحديد تخصص الورشة (سمكرة، بوية، ميزان، ميكانيكا، كهرباء).
 * 2. تقسيم وتصفح الشراء للقطع (أصلي وكالة، تجاري درجة أولى، تشليح ومستعمل).
 * 3. مشاركة الفواتير وتصوير القطع للعميل + مساعد كفو AI التشخيصي للخراب.
 * 4. السماح بظهور موقع الورشة الجغرافي للعملاء والمناديب.
 * 5. تتبع بالخريطة الحية لحركة القطع والمندوب + نظام التسعيرة المنافسة للقطع والصيانة.
 * 6. مشاركة كفو AI في الإصلاح (أكواد الأعطال وعزم الشد وإجراءات الصيانة).
 * 7. ستوري الورشة لتصوير الفيديوهات وشغل المعالجة (قبل وبعد).
 */

const KafuWorkshopPortal = {
  currentSpec: 'all', // 'all' | 'dents' | 'paint' | 'alignment' | 'mechanic' | 'electric'
  currentPartsTab: 'oem', // 'oem' | 'tier1' | 'scrap'
  gpsEnabled: true,

  workshopData: {
    name: 'مركز صيانة النخبة المتكامل',
    manager: 'م. سامي أحمد',
    badge: 'ورشة معتمدة · المستوى الذهبي (خصم 15% فوري)',
    city: 'الرياض',
    district: 'حي الصناعية القديمة - مخرج 18',
    street: 'شارع ابن العميد - ورشة رقم 42',
    lat: 24.6312,
    lng: 46.7891,
    rating: 4.9,
    reviews: 312,
    pointsBalance: 1850,
    bonusBalance: 420.00,
    discountRate: '15%'
  },

  stories: [
    {
      id: 'st-1',
      spec: 'paint',
      title: 'رش فرن حراري مع مطابقة لون لكزس ES350',
      desc: 'رش بوية فرن مائي ألماني لسيارة لكزس بعد السمكرة، مع صنفرة دقيقة وطبقة حماية نانو سيراميك 9H.',
      tag: 'بوية وفرن',
      views: 428,
      date: 'اليوم',
      color: '#D97706',
      icon: '🎨',
      stats: 'قبل وبعد · مطابقة لون 100%'
    },
    {
      id: 'st-2',
      spec: 'dents',
      title: 'سمكرة باردة وتعديل PDR بدون بوية لتويوتا كامري 2025',
      desc: 'إصلاح دقة الرفرف الخلفي بتقنية التعديل على البارد PDR دون المساس بدهان الوكالة الأصلي.',
      tag: 'سمكرة PDR',
      views: 612,
      date: 'أمس',
      color: '#0284C7',
      icon: '🔨',
      stats: 'تعديل على البارد بدون رش'
    },
    {
      id: 'st-3',
      spec: 'alignment',
      title: 'ميزان ليزر كمبيوتر وتربيط عكوس ومساعدات جمس يوكن',
      desc: 'معايرة زوايا الكامبر والكاستر والتوي، فحص جلود التوازن وتثبيت مساعدات هيدروليكية جديدة.',
      tag: 'ميزان وعكوس',
      views: 319,
      date: 'منذ يومين',
      color: '#16A34A',
      icon: '⚖️',
      stats: 'ميزان إلكتروني 3D'
    },
    {
      id: 'st-4',
      spec: 'mechanic',
      title: 'توضيب رأس محرك أوريون 3.5L Dynamic Force',
      desc: 'مسح رأس السلندر وتغيير طقم شنابر وبلوف أصلية وكالة مع اختبار الضغط بالنيتروجين.',
      tag: 'ميكانيكا',
      views: 745,
      date: 'منذ 3 أيام',
      color: '#7B5CFF',
      icon: '⚙️',
      stats: 'فحص ضغط 100%'
    }
  ],

  liveShipment: {
    id: 'SHP-9142',
    orderId: 'ORD-8921',
    carName: 'Toyota Camry 2025 (أ ب ج 1234)',
    clientName: 'عبدالله بن فهد التميمي',
    partName: 'مساعد هيدروليكي أمامي أصلي + طقم قماشات',
    supplier: 'تشاليح الحائر الكبرى (سعود العتيبي) - سعر منافس ⚡',
    courierName: 'كابتن أحمد القحطاني',
    courierPhone: '055XXXX412',
    etaMinutes: 14,
    distanceKm: '3.8 كم',
    status: 'in_transit',
    progress: 72
  },

  activeCars: [
    {
      id: 'car-101',
      carName: 'تويوتا كامري 2025',
      plate: 'أ ب ج 1234',
      clientName: 'عبدالله بن فهد التميمي',
      clientPhone: '054XXXX334',
      spec: 'alignment',
      specLabel: 'ميزان ومساعدات',
      serviceName: 'تغيير مساعد أمامي + وزن أذرعة بالليزر',
      partStatus: 'في الطريق مع المندوب (14 د)',
      partStatusColor: '#0284C7',
      partStatusBg: '#E0F2FE',
      laborOriginal: 250,
      laborCompetitive: 190,
      partCost: 240,
      vatCost: 64.5,
      total: 494.5,
      hasDiagnosis: true,
      diagnosisPart: 'مساعد هيدروليكي أمامي يمين',
      damageType: 'تسريب زيت هيدروليكي وتآكل الصوفة الداخلية',
      aiSeverity: 'خطر متوسط (يسبب اهتزازاً وتآكلاً غير متكافئ للإطارات)',
      aiAdvice: 'يوصى بالاستبدال الفوري قبل تلف كراسي المساعد وضبط زوايا الميزان.',
      status: 'waiting_parts'
    },
    {
      id: 'car-102',
      carName: 'لكزس ES350 2023',
      plate: 'د هـ و 9876',
      clientName: 'سلطان المنصور',
      clientPhone: '050XXXX882',
      spec: 'paint',
      specLabel: 'سمكرة وبوية',
      serviceName: 'سمكرة رفرف أمامي وبوية فرن حراري',
      partStatus: 'القطع متوفرة قيد العمل',
      partStatusColor: '#16A34A',
      partStatusBg: '#DCFCE7',
      laborOriginal: 650,
      laborCompetitive: 520,
      partCost: 310,
      vatCost: 124.5,
      total: 954.5,
      hasDiagnosis: true,
      diagnosisPart: 'صاج الرفرف الأمامي يمين',
      damageType: 'انبعاج سطحي مع تشقق في دهان الصدمة',
      aiSeverity: 'عطل هيكلي سطحي',
      aiAdvice: 'سحب الانبعاج بأجهزة الشفط الحراري ثم طلاء طبقتين فرن ألماني.',
      status: 'in_progress'
    },
    {
      id: 'car-103',
      carName: 'هيونداي سوناتا 2024',
      plate: 'ر ز س 4567',
      clientName: 'خالد المطيري',
      clientPhone: '056XXXX119',
      spec: 'mechanic',
      specLabel: 'ميكانيكا',
      serviceName: 'فحص تفتفة محرك وتغيير كويلات وبواجي',
      partStatus: 'بانتظار تسعيرة الورشة',
      partStatusColor: '#B45309',
      partStatusBg: '#FEF3C7',
      laborOriginal: 280,
      laborCompetitive: 210,
      partCost: 195,
      vatCost: 60.75,
      total: 465.75,
      hasDiagnosis: false,
      status: 'pending_quote'
    }
  ],

  partsCatalog: [
    {
      id: 'pc-1',
      name: 'طقم فحمات فرامل أمامية سيراميك',
      oem: '04465-33480',
      crossOem: '04465-02220 / 04465-06100',
      car: 'Toyota Camry 2025 / 2024',
      category: 'brakes',
      genPrice: 195,
      tier1Price: 135,
      scrapPrice: 85,
      competitivePrice: 80,
      stock: 18,
      specMatch: ['alignment', 'mechanic'],
      deliveryTime: 'خلال 45 دقيقة ⚡'
    },
    {
      id: 'pc-2',
      name: 'مساعد أمامي هيدروليك ياباني عالي الكفاءة',
      oem: '3340156-KY',
      crossOem: '48510-80674 / 3340157-KY',
      car: 'Toyota Camry 2025',
      category: 'suspension',
      genPrice: 380,
      tier1Price: 240,
      scrapPrice: 160,
      competitivePrice: 150,
      stock: 9,
      specMatch: ['alignment'],
      deliveryTime: 'خلال 35 دقيقة ⚡'
    },
    {
      id: 'pc-3',
      name: 'رفرف أمامي يمين أصلي صاج وكالة',
      oem: '53811-33240',
      crossOem: '53811-06220',
      car: 'Toyota Camry 2025 / 2023',
      category: 'body',
      genPrice: 540,
      tier1Price: 320,
      scrapPrice: 220,
      competitivePrice: 200,
      stock: 5,
      specMatch: ['dents', 'paint'],
      deliveryTime: 'خلال 50 دقيقة ⚡'
    },
    {
      id: 'pc-4',
      name: 'طقم مكبس محرك كامل ستاندر قياسي',
      oem: 'OP010-13101',
      crossOem: '13101-25040 / 13101-25030',
      car: 'Toyota Camry 2025 (2.5L Dynamic Force)',
      category: 'engine',
      genPrice: 480,
      tier1Price: 330,
      scrapPrice: 210,
      competitivePrice: 195,
      stock: 7,
      specMatch: ['mechanic'],
      deliveryTime: 'خلال 40 دقيقة ⚡'
    },
    {
      id: 'pc-5',
      name: 'طقم مقصات سفلية أمامية وجلود توازن',
      oem: '48068-33080',
      crossOem: '48069-33080 / 48820-33040',
      car: 'Toyota Camry 2025 / Avalon',
      category: 'suspension',
      genPrice: 410,
      tier1Price: 260,
      scrapPrice: 175,
      competitivePrice: 160,
      stock: 12,
      specMatch: ['alignment'],
      deliveryTime: 'خلال 45 دقيقة ⚡'
    }
  ],

  aiRepairGuide: {
    codes: [
      {
        code: 'P0300',
        title: 'Random/Multiple Cylinder Misfire Detected',
        desc: 'خلل وتفتفة في احتراق أسطوانات المحرك، مما يؤدي لاهتزاز وضعف العزم.',
        fix: '1. فحص كويلات الإشعال ومقاومتها.\n2. قياس خلوص البواجي (Spark Gap).\n3. فحص بخاخات الوقود وضغط الطرمبة (45-55 PSI).'
      },
      {
        code: 'C1201',
        title: 'Engine Control System Malfunction (ABS / VSC Fail-safe)',
        desc: 'دخول نظام الثبات والفرامل في وضع الأمان بسبب عطل في حساس زاوية الدركسون أو المحرك.',
        fix: '1. فحص حساس زاوية التوجيه (SAS) بعد وزن الأذرعة والميزان.\n2. مسح كود المحرك الرئيسي عبر جهاز OBD-II ثم إعادة ضبط صفر الحساس.'
      },
      {
        code: 'P0420',
        title: 'Catalyst System Efficiency Below Threshold (Bank 1)',
        desc: 'انخفاض كفاءة المحول الحفاز (دبة التلوث) عن المعيار المبرمج.',
        fix: '1. فحص قراءات حساس الشكمان (Downstream O2 Sensor).\n2. التأكد من عدم وجود تسريب كربون أو شعر في منفولد العادم.'
      }
    ],
    torques: [
      { item: 'مسامير رأس السلندر (Cylinder Head)', val: '78 Nm (ثم زاوية 90° إضافية)' },
      { item: 'مسامير كليبر الفرامل الأمامي', val: '34 Nm' },
      { item: 'صامولة المساعد الهيدروليكي العلوية', val: '47 Nm' },
      { item: 'مسامير جلب المقص ومسامير التوازن', val: '65 Nm' },
      { item: 'مسامير صواميل جنط العجلات (Lug Nuts)', val: '103 Nm' },
      { item: 'صرة تفريغ زيت المحرك', val: '38 Nm' }
    ]
  },

  init() {
    this.renderHeader();
    this.renderSpecializationBar();
    this.renderStoriesReel();
    this.renderLocationAndTrackingBanner();
    this.renderPartsCatalogSection();
    this.renderActiveCarsSection();
    this.renderAiRepairAssistantSection();
  },

  // ---------------------------------------------------------------------------
  // 1. رأس الصفحة وبيانات الورشة
  // ---------------------------------------------------------------------------
  renderHeader() {
    const el = document.getElementById('workshopHeaderData');
    if (!el) return;

    el.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 style="margin: 0; font-size: 1.25rem; font-weight: 900; color: #0A2540;">${this.workshopData.name}</h1>
            <span style="background: #FEF3C7; color: #B45309; border: 1.5px solid #FDE68A; padding: 3px 10px; border-radius: 999px; font-size: 0.74rem; font-weight: 800;">
              المستوى الذهبي (خصم 15% فوري) ⭐
            </span>
          </div>
          <p style="margin: 3px 0 0; font-size: 0.8rem; color: #64748B;">
            المسؤول: <strong>${this.workshopData.manager}</strong> · ${this.workshopData.district}
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <!-- رصيد نقاط الورشة -->
          <div style="background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 12px; padding: 6px 12px; text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
            <div style="font-size: 0.70rem; color: #64748B;">رصيد كفو بوينتس:</div>
            <strong style="color: #D97706; font-size: 0.94rem;" class="font-num">${this.workshopData.pointsBalance.toLocaleString('ar-SA')} نقطة</strong>
          </div>

          <!-- زر طلب توصيل فوري 45 دقيقة -->
          <button 
            type="button" 
            onclick="KafuWorkshopPortal.openExpressDeliveryModal()" 
            style="background: #0066FF; color: #FFFFFF; border: none; padding: 10px 14px; border-radius: 12px; font-size: 0.84rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(0,102,255,0.25);"
          >
            <span>⚡ إسعاف قطع (45 د)</span>
          </button>
        </div>
      </div>
    `;
  },

  // ---------------------------------------------------------------------------
  // 2. شريط تحديد تخصص ونوع الورشة (سمكرة، بوية، ميزان...)
  // ---------------------------------------------------------------------------
  renderSpecializationBar() {
    const el = document.getElementById('workshopSpecSelector');
    if (!el) return;

    const specs = [
      { id: 'all', label: 'جميع التخصصات', icon: '🏬' },
      { id: 'dents', label: 'سمكرة وتعديل صاج', icon: '🔨' },
      { id: 'paint', label: 'بوية ورش فرن حراري', icon: '🎨' },
      { id: 'alignment', label: 'ميزان وعكوس وتربيط', icon: '⚖️' },
      { id: 'mechanic', label: 'ميكانيكا ومحركات', icon: '⚙️' },
      { id: 'electric', label: 'كهرباء وفحص كمبيوتر', icon: '⚡' }
    ];

    el.innerHTML = `
      <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-size: 0.82rem; color: #0F172A; display: flex; align-items: center; gap: 5px;">
            <span>🔧</span>
            <span>تحديد تخصص ونوع أعمال الورشة الحالية:</span>
          </strong>
          <span style="font-size: 0.72rem; color: #0066FF; font-weight: 700;">تصفية تلقائية للقطع والصيانة</span>
        </div>

        <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 2px;">
          ${specs.map(s => {
            const active = this.currentSpec === s.id;
            return `
              <button 
                type="button" 
                onclick="KafuWorkshopPortal.setSpecialization('${s.id}')"
                style="
                  display: inline-flex; 
                  align-items: center; 
                  gap: 6px; 
                  padding: 8px 14px; 
                  border-radius: 10px; 
                  font-size: 0.82rem; 
                  font-weight: 800; 
                  cursor: pointer; 
                  white-space: nowrap; 
                  transition: all 0.2s ease;
                  background: ${active ? '#0A2540' : '#F8FAFC'}; 
                  color: ${active ? '#FFFFFF' : '#334155'}; 
                  border: 1.5px solid ${active ? '#0A2540' : '#CBD5E1'};
                  box-shadow: ${active ? '0 4px 12px rgba(10,37,64,0.2)' : 'none'};
                "
              >
                <span>${s.icon}</span>
                <span>${s.label}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  setSpecialization(specId) {
    this.currentSpec = specId;
    this.renderSpecializationBar();
    this.renderActiveCarsSection();
    this.renderPartsCatalogSection();
    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast(`تم تغيير تخصص العرض إلى [${specId === 'all' ? 'جميع التخصصات' : specId}]`);
    }
  },

  // ---------------------------------------------------------------------------
  // 3. ستوري الورشة وتصوير المعالجة (فيديوهات وشغل الورشة - قبل وبعد)
  // ---------------------------------------------------------------------------
  renderStoriesReel() {
    const el = document.getElementById('workshopStoriesContainer');
    if (!el) return;

    el.innerHTML = `
      <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 18px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 1.15rem;">🎥</span>
            <strong style="font-size: 0.90rem; color: #0F172A;">ستوري ويوميات الورشة (توثيق الشغل للزبائن):</strong>
          </div>
          <span style="font-size: 0.74rem; color: #64748B;">يزيد ثقة العميل وجلب طلبات الصيانة بنسبة 70%</span>
        </div>

        <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px;">
          
          <!-- زر إضافة ستوري جديد -->
          <div 
            onclick="KafuWorkshopPortal.openAddStoryModal()" 
            style="width: 110px; height: 140px; border-radius: 14px; border: 2px dashed #0066FF; background: #EFF6FF; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; text-align: center; padding: 8px; transition: transform 0.2s;"
          >
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #0066FF; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 6px;">
              +
            </div>
            <strong style="font-size: 0.76rem; color: #0066FF;">تصوير فيديو / رفع ستوري</strong>
            <span style="font-size: 0.65rem; color: #64748B; margin-top: 2px;">(قبل وبعد الشغل)</span>
          </div>

          <!-- قائمة الستوريز المنشورة -->
          ${this.stories.map(st => `
            <div 
              onclick="KafuWorkshopPortal.openStoryViewer('${st.id}')"
              style="
                width: 120px; 
                height: 140px; 
                border-radius: 14px; 
                position: relative; 
                overflow: hidden; 
                flex-shrink: 0; 
                cursor: pointer; 
                border: 2px solid ${st.color}; 
                background: linear-gradient(180deg, #1E293B 0%, #0F172A 100%);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 10px;
                color: #FFFFFF;
                box-shadow: 0 4px 12px rgba(0,0,0,0.12);
              "
            >
              <div style="display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2;">
                <span style="background: ${st.color}; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; font-weight: 800;">${st.tag}</span>
                <span style="font-size: 0.75rem;">${st.icon}</span>
              </div>

              <div style="position: relative; z-index: 2;">
                <div style="font-size: 0.74rem; font-weight: 800; line-height: 1.25; margin-bottom: 4px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                  ${st.title}
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.64rem; opacity: 0.85;">
                  <span>👁️ ${st.views}</span>
                  <span>${st.date}</span>
                </div>
              </div>

              <!-- طبقة خفية تدرج -->
              <div style="position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%); z-index: 1;"></div>
            </div>
          `).join('')}

        </div>
      </div>
    `;
  },

  openStoryViewer(storyId) {
    const st = this.stories.find(s => s.id === storyId);
    if (!st) return;

    const modalHtml = `
      <div id="storyViewerModal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #0F172A; color: #FFFFFF; border-radius: 24px; width: 100%; max-width: 420px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 2px solid ${st.color}; display: flex; flex-direction: column;">
          
          <!-- فيديو ستوري تمثيلي -->
          <div style="height: 260px; background: linear-gradient(135deg, #1E293B 0%, #334155 100%); position: relative; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.2); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; cursor: pointer; border: 2px solid #FFF;">
              ▶
            </div>
            <span style="font-size: 0.82rem; font-weight: 700; color: #E2E8F0;">معاينة فيديو المعالجة الفنية (HD 1080p)</span>
            <span style="background: rgba(0,0,0,0.5); font-size: 0.68rem; padding: 3px 8px; border-radius: 6px;">00:24 دقيقة · ستوري موثق</span>

            <!-- زر الإغلاق -->
            <button type="button" onclick="document.getElementById('storyViewerModal').remove()" style="position: absolute; top: 12px; left: 12px; border: none; background: rgba(0,0,0,0.6); color: #FFF; width: 32px; height: 32px; border-radius: 50%; font-size: 1.1rem; cursor: pointer;">✕</button>
          </div>

          <!-- تفاصيل الستوري والشغل -->
          <div style="padding: 18px; display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="background: ${st.color}; color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 6px;">${st.tag}</span>
              <span style="font-size: 0.74rem; color: #94A3B8;">نشر اليوم بواسطة ${this.workshopData.manager}</span>
            </div>

            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: #FFFFFF;">${st.title}</h3>
            <p style="margin: 0; font-size: 0.82rem; color: #CBD5E1; line-height: 1.45;">${st.desc}</p>

            <div style="background: rgba(255,255,255,0.06); border-radius: 12px; padding: 10px; font-size: 0.76rem; color: #38BDF8; display: flex; align-items: center; gap: 6px;">
              <span>⭐</span>
              <span><strong>المطابقة وضمان الشغل:</strong> تم تسليم العمل للعميل مع فحص كفو AI بنسبة 100%.</span>
            </div>

            <button type="button" onclick="document.getElementById('storyViewerModal').remove()" style="height: 42px; background: #0066FF; color: #FFFFFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.88rem; cursor: pointer; margin-top: 4px;">
              إغلاق المعاينة
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  openAddStoryModal() {
    const modalHtml = `
      <div id="addStoryModalContainer" style="position: fixed; inset: 0; background: rgba(15,23,42,0.65); backdrop-filter: blur(5px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 20px; width: 100%; max-width: 440px; padding: 20px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F5F9; padding-bottom: 8px;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 900; color: #0A2540;">إضافة ستوري ويوميات جديدة للورشة 🎥</h3>
              <p style="margin: 2px 0 0; font-size: 0.74rem; color: #64748B;">صور شغلك (فيديو أو صور قبل وبعد) واعرض مهارة ورشتك</p>
            </div>
            <button type="button" onclick="document.getElementById('addStoryModalContainer').remove()" style="border: none; background: #F1F5F9; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; color: #64748B; font-weight: 800;">✕</button>
          </div>

          <form onsubmit="event.preventDefault(); KafuWorkshopPortal.publishStory();" style="display: flex; flex-direction: column; gap: 10px;">
            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">تخصص العمل المنجز:</label>
              <select id="newStorySpec" style="width: 100%; height: 42px; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 0 10px; font-family: inherit; font-size: 0.86rem;">
                <option value="dents">سمكرة وتعديل صاج على البارد</option>
                <option value="paint">بوية ورش فرن حراري</option>
                <option value="alignment">ميزان ليزر وتربيط عكوس ومساعدات</option>
                <option value="mechanic">ميكانيكا وتوضيب محركات</option>
                <option value="electric">كهرباء وبرمجة وفحص كمبيوتر</option>
              </select>
            </div>

            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">عنوان الستوري / السيارة:</label>
              <input type="text" id="newStoryTitle" placeholder="مثال: سمكرة وتعديل صدمة رفرف كامري 2025" required style="width: 100%; height: 42px; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 0 10px; font-family: inherit; font-size: 0.88rem;" />
            </div>

            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">وصف الشغل ومراحل المعالجة:</label>
              <textarea id="newStoryDesc" rows="2" placeholder="اشرح الشغل الذي قمت به والقطع المستخدمة..." required style="width: 100%; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 8px 10px; font-family: inherit; font-size: 0.82rem; resize: vertical;"></textarea>
            </div>

            <!-- منطقة رفع الفيديو -->
            <div style="background: #F8FAFC; border: 2px dashed #93C5FD; border-radius: 12px; padding: 14px; text-align: center; cursor: pointer;" onclick="document.getElementById('storyVideoInput').click()">
              <input type="file" id="storyVideoInput" accept="video/*,image/*" style="display: none;" onchange="document.getElementById('videoUploadedBadge').style.display = 'block';" />
              <div style="font-size: 1.4rem;">📱</div>
              <strong style="font-size: 0.82rem; color: #0066FF; display: block; margin-top: 4px;">اضغط لتصوير أو اختيار فيديو العمل (MP4 / MOV)</strong>
              <span style="font-size: 0.70rem; color: #64748B;">مدة الفيديو المقترحة: 15 إلى 30 ثانية</span>
              <div id="videoUploadedBadge" style="display: none; background: #DCFCE7; color: #15803D; padding: 4px 8px; border-radius: 6px; font-size: 0.74rem; font-weight: 800; margin-top: 6px;">
                ✓ تم اختيار ملف الفيديو بنجاح
              </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 4px;">
              <button type="submit" style="flex: 1; height: 44px; background: #0066FF; color: #FFFFFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.90rem; cursor: pointer;">
                نشر الستوري فوراً في بروفايل الورشة 🚀
              </button>
              <button type="button" onclick="document.getElementById('addStoryModalContainer').remove()" style="flex: 0.4; height: 44px; background: #F1F5F9; color: #475569; border: none; border-radius: 12px; font-weight: 700; font-size: 0.86rem; cursor: pointer;">
                إلغاء
              </button>
            </div>
          </form>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  publishStory() {
    const title = document.getElementById('newStoryTitle').value.trim();
    const desc = document.getElementById('newStoryDesc').value.trim();
    const spec = document.getElementById('newStorySpec').value;

    const newStory = {
      id: 'st-' + Date.now(),
      spec: spec,
      title: title,
      desc: desc,
      tag: spec === 'dents' ? 'سمكرة PDR' : (spec === 'paint' ? 'بوية وفرن' : (spec === 'alignment' ? 'ميزان كمبيوتر' : 'ميكانيكا')),
      views: 1,
      date: 'الآن',
      color: spec === 'dents' ? '#0284C7' : (spec === 'paint' ? '#D97706' : (spec === 'alignment' ? '#16A34A' : '#7B5CFF')),
      icon: spec === 'dents' ? '🔨' : (spec === 'paint' ? '🎨' : (spec === 'alignment' ? '⚖️' : '⚙️')),
      stats: 'تم النشر حديثاً'
    };

    this.stories.unshift(newStory);
    const modal = document.getElementById('addStoryModalContainer');
    if (modal) modal.remove();

    this.renderStoriesReel();
    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast('تم نشر ستوري الورشة بنجاح! سيشاهده العملاء في منطقتك 🎥');
    }
  },

  // ---------------------------------------------------------------------------
  // 4. موقع الورشة + خريطة التتبع الحية للقطع والمندوب
  // ---------------------------------------------------------------------------
  renderLocationAndTrackingBanner() {
    const el = document.getElementById('workshopLocationTrackingContainer');
    if (!el) return;

    el.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        
        <!-- بطاقة التحكم بظهور موقع الورشة على الخريطة -->
        <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 18px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="font-size: 0.88rem; color: #0F172A; display: flex; align-items: center; gap: 6px;">
                <span>📍</span>
                <span>موقع الورشة الجغرافي (GPS):</span>
              </strong>
              
              <!-- مفتاح التبديل للسماح بظهور الموقع -->
              <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
                <span style="font-size: 0.74rem; font-weight: 700; color: ${this.gpsEnabled ? '#15803D' : '#64748B'};">
                  ${this.gpsEnabled ? 'ظاهر للعملاء ✓' : 'مخفي'}
                </span>
                <input 
                  type="checkbox" 
                  ${this.gpsEnabled ? 'checked' : ''} 
                  onchange="KafuWorkshopPortal.toggleGpsVisibility(this.checked)" 
                  style="width: 20px; height: 20px; accent-color: #0066FF; cursor: pointer;"
                />
              </label>
            </div>

            <div style="font-size: 0.80rem; color: #334155; line-height: 1.4;">
              <div><strong>العنوان:</strong> ${this.workshopData.city} · ${this.workshopData.district}</div>
              <div style="color: #64748B; font-size: 0.74rem; margin-top: 2px;">${this.workshopData.street}</div>
            </div>
          </div>

          <div style="background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 10px; padding: 8px 10px; display: flex; align-items: center; justify-content: space-between; font-size: 0.74rem;">
            <span style="color: #64748B;">الإحداثيات: <strong>24.6312° N, 46.7891° E</strong></span>
            <a href="https://maps.google.com" target="_blank" style="color: #0066FF; text-decoration: none; font-weight: 800;">
              فتح الخرائط ↗
            </a>
          </div>
        </div>

        <!-- بطاقة التتبع المباشر لحركة القطع والمندوب بالخريطة -->
        <div style="background: linear-gradient(135deg, #0A2540 0%, #1E3A8A 100%); color: #FFFFFF; border-radius: 18px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 8px 20px rgba(10,37,64,0.18);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="background: rgba(255,255,255,0.2); font-size: 0.70rem; padding: 2px 8px; border-radius: 6px; font-weight: 800;">تتبع حي ومباشر</span>
              <span style="font-size: 0.76rem; color: #38BDF8; font-weight: 800;">متبقي: ${this.liveShipment.etaMinutes} دقيقة ⏱️</span>
            </div>

            <strong style="font-size: 0.90rem; display: block;">شاحنة كفو السريعة في طريقها لورشتك:</strong>
            <p style="margin: 3px 0 0; font-size: 0.76rem; color: #93C5FD; line-height: 1.35;">
              ${this.liveShipment.partName} لسيارة [${this.liveShipment.carName}]
            </p>
          </div>

          <!-- شريط التقدم المرئي للخريطة -->
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.70rem; color: #CBD5E1;">
              <span>المستودع (التشليح)</span>
              <span>🚚 الكابتن أحمد (${this.liveShipment.distanceKm})</span>
              <span>باب الورشة</span>
            </div>
            <div style="background: rgba(255,255,255,0.2); height: 7px; border-radius: 999px; overflow: hidden;">
              <div style="background: #38BDF8; width: ${this.liveShipment.progress}%; height: 100%; border-radius: 999px; transition: width 0.4s ease;"></div>
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            <button 
              type="button" 
              onclick="KafuWorkshopPortal.openLiveTrackingModal()"
              style="flex: 1; height: 36px; background: #38BDF8; color: #0A2540; border: none; border-radius: 10px; font-weight: 800; font-size: 0.80rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;"
            >
              <span>🗺️ فتح الخريطة التفاعلية</span>
            </button>
            <button 
              type="button" 
              onclick="KafuApp.showToast('جاري الاتصال المشفر بكابتن التوصيل: ' + KafuWorkshopPortal.liveShipment.courierName)"
              style="height: 36px; background: rgba(255,255,255,0.15); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.3); border-radius: 10px; padding: 0 10px; font-weight: 700; font-size: 0.78rem; cursor: pointer;"
            >
              📞 اتصال مشفر
            </button>
          </div>

        </div>

      </div>
    `;
  },

  toggleGpsVisibility(enabled) {
    this.gpsEnabled = enabled;
    this.renderLocationAndTrackingBanner();
    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast(enabled ? 'تم تفعيل ظهور موقع ورشتك على خريطة كفو للعملاء والمناديب ✓' : 'تم إخفاء موقع ورشتك عن الخريطة العامة');
    }
  },

  openLiveTrackingModal() {
    const s = this.liveShipment;
    const modalHtml = `
      <div id="liveTrackingMapModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.7); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 24px; width: 100%; max-width: 560px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); border: 1.5px solid #E2E8F0; display: flex; flex-direction: column;">
          
          <div style="padding: 14px 18px; background: #0A2540; color: #FFFFFF; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 900;">خريطة التتبع المباشر للشحنة (#${s.id})</h3>
              <p style="margin: 2px 0 0; font-size: 0.74rem; color: #93C5FD;">مسار شاحنة كفو السريعة إلى باب الورشة</p>
            </div>
            <button type="button" onclick="document.getElementById('liveTrackingMapModal').remove()" style="border: none; background: rgba(255,255,255,0.15); color: #FFF; width: 32px; height: 32px; border-radius: 50%; cursor: pointer;">✕</button>
          </div>

          <!-- محاكاة خريطة تفاعلية بالـ SVG -->
          <div style="height: 220px; background: #E2E8F0; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            <svg width="100%" height="100%" viewBox="0 0 500 220" style="background: #EBF3FA;">
              <!-- خطوط الشوارع -->
              <path d="M 30 180 Q 180 80 320 120 T 460 60" fill="none" stroke="#CBD5E1" stroke-width="14" stroke-linecap="round"/>
              <path d="M 30 180 Q 180 80 320 120 T 460 60" fill="none" stroke="#38BDF8" stroke-width="6" stroke-dasharray="8 6"/>

              <!-- نقطة البداية (المستودع / التشليح) -->
              <circle cx="50" cy="170" r="14" fill="#D97706" />
              <text x="50" y="175" font-size="12" text-anchor="middle" fill="#FFF">🏭</text>
              <text x="50" y="200" font-size="11" text-anchor="middle" font-weight="bold" fill="#78350F">التشليح (الحائر)</text>

              <!-- المندوب المتحرك -->
              <g transform="translate(260, 105)">
                <circle cx="0" cy="0" r="16" fill="#0066FF" />
                <text x="0" y="5" font-size="14" text-anchor="middle" fill="#FFF">🚚</text>
                <text x="0" y="26" font-size="11" text-anchor="middle" font-weight="bold" fill="#0066FF">الكابتن (3.8 كم)</text>
              </g>

              <!-- نقطة الوصول (الورشة) -->
              <circle cx="440" cy="65" r="14" fill="#16A34A" />
              <text x="440" y="70" font-size="12" text-anchor="middle" fill="#FFF">🏁</text>
              <text x="440" y="92" font-size="11" text-anchor="middle" font-weight="bold" fill="#14532D">ورشتك (مخرج 18)</text>
            </svg>

            <div style="position: absolute; bottom: 8px; right: 8px; background: rgba(255,255,255,0.92); backdrop-filter: blur(4px); padding: 4px 10px; border-radius: 8px; font-size: 0.72rem; font-weight: 700; color: #0A2540;">
              ⚡ تحديث مباشر كل 5 ثوانٍ
            </div>
          </div>

          <div style="padding: 16px; display: flex; flex-direction: column; gap: 10px;">
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.80rem;">
              <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block;">القطعة المنقولة:</span>
                <strong>${s.partName}</strong>
              </div>
              <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block;">المصدر والمورد:</span>
                <strong style="color: #D97706;">${s.supplier}</strong>
              </div>
              <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block;">اسم الكابتن:</span>
                <strong>${s.courierName}</strong>
              </div>
              <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block;">الوقت المتوقع للتسليم:</span>
                <strong style="color: #16A34A;">${s.etaMinutes} دقيقة فقط (4:15 م)</strong>
              </div>
            </div>

            <button type="button" onclick="document.getElementById('liveTrackingMapModal').remove()" style="height: 42px; background: #0A2540; color: #FFFFFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.88rem; cursor: pointer;">
              إغلاق الخريطة
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // ---------------------------------------------------------------------------
  // 5. تقسيم الشراء وتصفح القطع (جديد أصلي، تجاري، تشليح) مع التسعير المنافس
  // ---------------------------------------------------------------------------
  renderPartsCatalogSection() {
    const el = document.getElementById('workshopPartsCatalogContainer');
    if (!el) return;

    // تصفية القطع بناءً على التخصص المختار
    const filtered = this.partsCatalog.filter(p => {
      if (this.currentSpec === 'all') return true;
      return p.specMatch.includes(this.currentSpec);
    });

    el.innerHTML = `
      <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 18px; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div>
            <strong style="font-size: 0.96rem; color: #0A2540; display: flex; align-items: center; gap: 6px;">
              <span>🛒</span>
              <span>تقسيم وتصفح شراء القطع لسيارات الصيانة:</span>
            </strong>
            <p style="margin: 2px 0 0; font-size: 0.74rem; color: #64748B;">خصم ورش معتمد 15% وتوصيل سريع مباشر إلى باب الورشة</p>
          </div>

          <!-- تبويبات تقسيم الشراء: أصلي، تجاري، تشليح -->
          <div style="display: flex; background: #F1F5F9; border-radius: 10px; padding: 3px; gap: 4px;">
            ${[
              { id: 'oem', label: 'أصلي وكالة', icon: '💎' },
              { id: 'tier1', label: 'تجاري درجة 1', icon: '🏷️' },
              { id: 'scrap', label: 'تشليح ومستعمل', icon: '♻️' }
            ].map(t => `
              <button 
                type="button" 
                onclick="KafuWorkshopPortal.setPartsTab('${t.id}')"
                style="
                  border: none; 
                  padding: 6px 12px; 
                  border-radius: 8px; 
                  font-size: 0.76rem; 
                  font-weight: 800; 
                  cursor: pointer;
                  background: ${this.currentPartsTab === t.id ? '#0066FF' : 'transparent'};
                  color: ${this.currentPartsTab === t.id ? '#FFFFFF' : '#475569'};
                  transition: all 0.2s;
                "
              >
                <span>${t.icon} ${t.label}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- قائمة كروت القطع مع السعر المنافس والخصم -->
        <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
          ${filtered.length > 0 ? filtered.map(p => {
            let activePrice = p.genPrice;
            let badgeText = 'أصلي وكالة معتمد';
            let badgeBg = '#EFF6FF';
            let badgeColor = '#0066FF';

            if (this.currentPartsTab === 'tier1') {
              activePrice = p.tier1Price;
              badgeText = 'تجاري درجة أولى مطابقة';
              badgeBg = '#F3E8FF';
              badgeColor = '#7E22CE';
            } else if (this.currentPartsTab === 'scrap') {
              activePrice = p.scrapPrice;
              badgeText = 'تشليح نظيف مفحوص AI';
              badgeBg = '#FEF3C7';
              badgeColor = '#B45309';
            }

            const workshopDiscountedPrice = (activePrice * 0.85).toFixed(0);

            return `
              <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 52px; height: 52px; border-radius: 12px; background: #FFFFFF; border: 1px solid #CBD5E1; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; flex-shrink: 0;">
                    ${p.category === 'brakes' ? '🔘' : (p.category === 'suspension' ? '🔩' : (p.category === 'body' ? '🚗' : '⚙️'))}
                  </div>
                  <div>
                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                      <strong style="font-size: 0.90rem; color: #0F172A;">${p.name}</strong>
                      <span style="background: ${badgeBg}; color: ${badgeColor}; font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">${badgeText}</span>
                      <span style="background: #DCFCE7; color: #15803D; font-size: 0.68rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;">${p.deliveryTime}</span>
                    </div>

                    <div style="font-size: 0.74rem; color: #64748B; margin-top: 3px;">
                      متوافق مع: <strong>${p.car}</strong> · كود OEM: <span style="font-family: monospace; color: #0066FF;">${p.oem}</span>
                    </div>
                    <div style="font-size: 0.70rem; color: #94A3B8;">
                      بدائل مطابقة: ${p.crossOem}
                    </div>
                  </div>
                </div>

                <!-- التسعير والزر -->
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="text-align: left;">
                    <div style="font-size: 0.70rem; color: #64748B; text-decoration: line-through;">السعر: ${activePrice} ر.س</div>
                    <div style="font-size: 1.05rem; font-weight: 900; color: #16A34A;" class="font-num">
                      ${workshopDiscountedPrice} ر.س
                      <span style="font-size: 0.68rem; background: #DCFCE7; color: #15803D; padding: 1px 4px; border-radius: 4px; font-weight: 800;">-15% ورش</span>
                    </div>
                    ${this.currentPartsTab === 'scrap' ? `
                      <span style="font-size: 0.65rem; color: #B45309; font-weight: 700;">سعر منافس للتشليح ⚡</span>
                    ` : ''}
                  </div>

                  <button 
                    type="button" 
                    onclick="KafuWorkshopPortal.orderPartForCar('${p.id}')"
                    style="background: #0066FF; color: #FFFFFF; border: none; padding: 8px 14px; border-radius: 10px; font-size: 0.82rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 8px rgba(0,102,255,0.25);"
                  >
                    <span>طلب للسيارة ⚡</span>
                  </button>
                </div>

              </div>
            `;
          }).join('') : `
            <div style="text-align: center; padding: 20px; color: #64748B; font-size: 0.84rem;">
              لا توجد قطع مطابقة لتخصص [${this.currentSpec}] حالياً. اختر تخصصاً آخر أو استعرض جميع القطع.
            </div>
          `}
        </div>

      </div>
    `;
  },

  setPartsTab(tabId) {
    this.currentPartsTab = tabId;
    this.renderPartsCatalogSection();
  },

  orderPartForCar(partId) {
    const part = this.partsCatalog.find(p => p.id === partId);
    if (!part) return;

    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast(`تم إرسال طلب [${part.name}] لشاحنة كفو السريعة! ستصل لورشتك خلال 35-45 دقيقة.`);
    } else {
      alert(`تم إرسال طلب [${part.name}] لشاحنة كفو السريعة!`);
    }
  },

  // ---------------------------------------------------------------------------
  // 6. سيارات الصيانة + تصوير القطع ومساعد AI للخراب + تسعيرة الورشة المنافسة
  // ---------------------------------------------------------------------------
  renderActiveCarsSection() {
    const el = document.getElementById('workshopActiveCarsContainer');
    if (!el) return;

    const filtered = this.activeCars.filter(c => {
      if (this.currentSpec === 'all') return true;
      return c.spec === this.currentSpec;
    });

    el.innerHTML = `
      <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 18px; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div>
            <strong style="font-size: 0.96rem; color: #0A2540; display: flex; align-items: center; gap: 6px;">
              <span>🚗</span>
              <span>سيارات العملاء الحالية داخل الورشة:</span>
            </strong>
            <p style="margin: 2px 0 0; font-size: 0.74rem; color: #64748B;">
              تصوير القطع التالفة وكشف AI + تسعير أجور الصيانة ومشاركة الفواتير
            </p>
          </div>

          <span style="background: #EFF6FF; color: #0066FF; padding: 4px 10px; border-radius: 8px; font-size: 0.78rem; font-weight: 800;">
            ${filtered.length} سيارات قيد العمل
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${filtered.map(car => `
            <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <strong style="font-size: 0.96rem; color: #0F172A;">${car.carName}</strong>
                    <span style="font-family: monospace; font-size: 0.76rem; background: #FFFFFF; border: 1px solid #CBD5E1; padding: 1px 6px; border-radius: 4px; font-weight: 800;">${car.plate}</span>
                    <span style="font-size: 0.72rem; color: #475569; background: #E2E8F0; padding: 2px 6px; border-radius: 4px;">${car.specLabel}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: #475569; margin-top: 3px;">
                    العميل: <strong>${car.clientName}</strong> · العمل المطلوب: <strong>${car.serviceName}</strong>
                  </div>
                </div>

                <span style="background: ${car.partStatusBg}; color: ${car.partStatusColor}; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 6px;">
                  ${car.partStatus}
                </span>
              </div>

              <!-- قسم تشخيص كفو AI للخراب إذا وُجد -->
              ${car.hasDiagnosis ? `
                <div style="background: #EFF6FF; border: 1.5px solid #BFDBFE; border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="font-size: 0.80rem; color: #1E40AF; display: flex; align-items: center; gap: 4px;">
                      <span>🔍</span>
                      <span>كشف كفو AI للقطعة المصورة: ${car.diagnosisPart}</span>
                    </strong>
                    <span style="background: #DCFCE7; color: #15803D; font-size: 0.68rem; font-weight: 800; padding: 1px 6px; border-radius: 4px;">تم فحص الخراب</span>
                  </div>
                  <div style="font-size: 0.76rem; color: #1E3A8A; line-height: 1.35;">
                    <strong>الخلل المرصود:</strong> ${car.damageType} · <em>${car.aiAdvice}</em>
                  </div>
                </div>
              ` : `
                <div style="background: #FFFBEB; border: 1px dashed #FDE68A; border-radius: 12px; padding: 8px 12px; font-size: 0.76rem; color: #92400E; display: flex; align-items: center; justify-content: space-between;">
                  <span>📷 لم يتم تصوير القطعة التالفة بعد لإظهار التقرير الفني للعميل.</span>
                  <button type="button" onclick="KafuWorkshopPortal.openCameraDiagnosisModal('${car.id}')" style="background: #D97706; color: #FFF; border: none; padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: 800; cursor: pointer;">
                    تصوير وفحص بالـ AI 📸
                  </button>
                </div>
              `}

              <!-- شريط التسعيرة والمنافسة وأزرار الإجراءات -->
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; border-top: 1px dashed #CBD5E1; padding-top: 10px;">
                <div style="font-size: 0.78rem;">
                  <span>أجور الصيانة (العرض المنافس): <strong style="color: #16A34A; font-size: 0.88rem;">${car.laborCompetitive} ر.س</strong></span>
                  <span style="color: #94A3B8; text-decoration: line-through; margin-right: 4px;">(${car.laborOriginal} ر.س)</span>
                  <span style="color: #64748B; margin-right: 8px;">· الإجمالي مع القطع والضريبة: <strong style="color: #0A2540;">${car.total} ر.س</strong></span>
                </div>

                <div style="display: flex; gap: 6px;">
                  <!-- زر تصوير القطعة وفحص الخراب -->
                  <button 
                    type="button" 
                    onclick="KafuWorkshopPortal.openCameraDiagnosisModal('${car.id}')"
                    style="background: #FFFFFF; border: 1.5px solid #CBD5E1; color: #0F172A; padding: 6px 10px; border-radius: 8px; font-size: 0.76rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 4px;"
                  >
                    <span>📷 تصوير الخراب</span>
                  </button>

                  <!-- زر تعديل التسعيرة والعرض المنافس -->
                  <button 
                    type="button" 
                    onclick="KafuWorkshopPortal.openWorkshopPricingModal('${car.id}')"
                    style="background: #F0FDF4; border: 1.5px solid #86EFAC; color: #166534; padding: 6px 10px; border-radius: 8px; font-size: 0.76rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 4px;"
                  >
                    <span>⚡ تسعيرة منافسة</span>
                  </button>

                  <!-- زر مشاركة الفاتورة والمحادثة مع العميل -->
                  <button 
                    type="button" 
                    onclick="KafuWorkshopPortal.openCustomerChatModal('${car.id}')"
                    style="background: #0066FF; color: #FFFFFF; border: none; padding: 6px 12px; border-radius: 8px; font-size: 0.76rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 4px;"
                  >
                    <span>📱 مشاركة الفاتورة للعميل</span>
                  </button>
                </div>
              </div>

            </div>
          `).join('')}
        </div>

      </div>
    `;
  },

  // ---------------------------------------------------------------------------
  // 7. تصوير القطع وكشف كفو AI للخراب وإرشادات السلامة
  // ---------------------------------------------------------------------------
  openCameraDiagnosisModal(carId) {
    const car = this.activeCars.find(c => c.id === carId);
    if (!car) return;

    const modalHtml = `
      <div id="cameraDiagnosisModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.7); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 22px; width: 100%; max-width: 480px; padding: 20px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); border: 1.5px solid #E2E8F0; max-height: 90vh; overflow-y: auto;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F5F9; padding-bottom: 8px;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 900; color: #0A2540;">تصوير القطعة التالفة وكشف AI للعميل 📸</h3>
              <p style="margin: 2px 0 0; font-size: 0.74rem; color: #64748B;">سيارة: ${car.carName} (${car.plate})</p>
            </div>
            <button type="button" onclick="document.getElementById('cameraDiagnosisModal').remove()" style="border: none; background: #F1F5F9; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; color: #64748B; font-weight: 800;">✕</button>
          </div>

          <!-- منطقة التقاط أو رفع الصورة -->
          <div style="background: #F8FAFC; border: 2px dashed #93C5FD; border-radius: 14px; padding: 18px; text-align: center; cursor: pointer;" onclick="KafuWorkshopPortal.simulateAiScan('${car.id}')">
            <div style="font-size: 2rem;">🔍</div>
            <strong style="font-size: 0.88rem; color: #0066FF; display: block; margin-top: 4px;">اضغط لالتقاط صورة القطعة أو اختيار صورة من المعمل</strong>
            <span style="font-size: 0.72rem; color: #64748B;">يقوم كفو AI بالتعرف على القطعة، قراءة الكسر أو التسريب، وإعداد تقرير للعميل</span>
          </div>

          <!-- نتيجة فحص كفو AI التفاعلية -->
          <div id="aiScanResultCard" style="display: flex; flex-direction: column; gap: 8px; background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 14px; padding: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 0.84rem; color: #166534;">✅ نتيجة فحص الرؤية الحاسوبية (كفو AI):</strong>
              <span style="background: #DCFCE7; color: #15803D; font-size: 0.70rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">دقة 98.6%</span>
            </div>

            <div style="font-size: 0.80rem; color: #1E293B; line-height: 1.4;">
              <div><strong>القطعة المرصودة:</strong> مساعد هيدروليكي أمامي أصلي وكالة</div>
              <div style="color: #991B1B; margin-top: 2px;"><strong>نوع الخراب:</strong> تلف صوفة الزيت مع تآكل كامل في السيل الداخلي وانضغاط غير آمن.</div>
              <div style="color: #15803D; margin-top: 2px;"><strong>إرشادات كفو للعميل:</strong> الاستمرار في قيادة السيارة بهذا المساعد يسبب تلف كراسي المساعد ويقلل كفاءة التوقف المفاجئ. يلزم الاستبدال فوراً.</div>
            </div>
          </div>

          <!-- رسالة موجهة مباشرة للعميل -->
          <div style="background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 12px; padding: 10px; font-size: 0.76rem; color: #334155;">
            <strong>نص الرسالة والتقرير الذي سيصل لهاتف العميل:</strong>
            <p style="margin: 4px 0 0; font-family: inherit; color: #475569; line-height: 1.4;">
              "مرحباً بك أستاذ ${car.clientName}، قام مهندس الورشة [${this.workshopData.manager}] بتصوير وفحص سيارتك [${car.carName}]. تقرير كفو AI يوضح ضرورة تغيير المساعد بسبب تسريب الزيت لضمان سلامتك. تم إرفاق الفاتورة المبدئية بخصم الورشة 15%."
            </p>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 4px;">
            <button 
              type="button" 
              onclick="
                document.getElementById('cameraDiagnosisModal').remove();
                KafuWorkshopPortal.openCustomerChatModal('${car.id}');
              "
              style="flex: 1; height: 44px; background: #0066FF; color: #FFFFFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;"
            >
              <span>مشاركة الفاتورة والتقرير للعميل الآن 📱</span>
            </button>
            <button type="button" onclick="document.getElementById('cameraDiagnosisModal').remove()" style="flex: 0.35; height: 44px; background: #F1F5F9; color: #475569; border: none; border-radius: 12px; font-weight: 700; font-size: 0.84rem; cursor: pointer;">
              إلغاء
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  simulateAiScan(carId) {
    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast('جاري معالجة الصورة وتحليل أسباب الخراب بواسطة كفو AI...');
    }
  },

  // ---------------------------------------------------------------------------
  // 8. نظام تسعيرة الورشة (أجور الصيانة الأساسية + العرض المنافس وملاحظة الرمادي)
  // ---------------------------------------------------------------------------
  openWorkshopPricingModal(carId) {
    const car = this.activeCars.find(c => c.id === carId);
    if (!car) return;

    const modalHtml = `
      <div id="workshopPricingModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.65); backdrop-filter: blur(5px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 20px; width: 100%; max-width: 460px; padding: 20px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F5F9; padding-bottom: 8px;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 900; color: #0A2540;">نظام تسعيرة أجور الورشة والعرض المنافس ⚡</h3>
              <p style="margin: 2px 0 0; font-size: 0.74rem; color: #64748B;">سيارة: ${car.carName} · خدمة: ${car.serviceName}</p>
            </div>
            <button type="button" onclick="document.getElementById('workshopPricingModal').remove()" style="border: none; background: #F1F5F9; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; color: #64748B; font-weight: 800;">✕</button>
          </div>

          <form onsubmit="event.preventDefault(); KafuWorkshopPortal.saveWorkshopPrice('${car.id}');" style="display: flex; flex-direction: column; gap: 12px;">
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">أجور اليد والصيانة الأساسية (ر.س):</label>
                <input 
                  type="number" 
                  id="pricingOriginalLabor" 
                  value="${car.laborOriginal}" 
                  class="form-input font-num" 
                  style="width: 100%; height: 42px; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 0 10px; font-size: 1.05rem; font-weight: 800;"
                  oninput="KafuWorkshopPortal.recalcQuoteTotals()"
                />
              </div>

              <div>
                <label style="font-size: 0.78rem; font-weight: 800; color: #15803D; display: block; margin-bottom: 4px;">العرض المنافس للورشة (ر.س) ⚡:</label>
                <input 
                  type="number" 
                  id="pricingCompetitiveLabor" 
                  value="${car.laborCompetitive}" 
                  class="form-input font-num" 
                  style="width: 100%; height: 42px; border: 2px solid #22C55E; background: #F0FDF4; color: #16A34A; border-radius: 10px; padding: 0 10px; font-size: 1.1rem; font-weight: 900;"
                  oninput="KafuWorkshopPortal.recalcQuoteTotals()"
                />
              </div>
            </div>

            <!-- ملاحظة السعر والعرض المنافس باللون الرمادي بدقة كما طُلب -->
            <div style="font-size: 0.75rem; color: #64748B; background: #F8FAFC; border: 1px dashed #CBD5E1; padding: 8px 12px; border-radius: 10px; line-height: 1.4;">
              💡 <span style="color: #64748B;">عند وضع عرض منافس تزيد نسبة قبول العميل لورشتك بنسبة 85% وتأكيد الإصلاح فوراً</span>
            </div>

            <!-- تفصيل الفاتورة النهائية -->
            <div style="background: #F1F5F9; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 6px; font-size: 0.80rem;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #64748B;">تكلفة قطع الغيار (خصم 15% ورشة):</span>
                <strong id="quotePartCost">${car.partCost} ر.س</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #64748B;">أجور اليد المعتمدة (بعد التخفيض المنافس):</span>
                <strong id="quoteLaborCost" style="color: #16A34A;">${car.laborCompetitive} ر.س</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #64748B;">ضريبة القيمة المضافة ZATCA (15%):</span>
                <strong id="quoteVatCost">${car.vatCost} ر.س</strong>
              </div>
              <div style="height: 1px; background: #CBD5E1; margin: 4px 0;"></div>
              <div style="display: flex; justify-content: space-between; font-size: 0.92rem; font-weight: 900; color: #0A2540;">
                <span>المبلغ النهائي المطلوب من العميل:</span>
                <span id="quoteFinalTotal" style="color: #0066FF;">${car.total} ر.س</span>
              </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 4px;">
              <button type="submit" style="flex: 1; height: 44px; background: #16A34A; color: #FFFFFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.90rem; cursor: pointer;">
                اعتماد التسعيرة المنافسة ✓
              </button>
              <button type="button" onclick="document.getElementById('workshopPricingModal').remove()" style="flex: 0.35; height: 44px; background: #F1F5F9; color: #475569; border: none; border-radius: 12px; font-weight: 700; font-size: 0.84rem; cursor: pointer;">
                إلغاء
              </button>
            </div>

          </form>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  recalcQuoteTotals() {
    const orig = parseFloat(document.getElementById('pricingOriginalLabor').value) || 0;
    const comp = parseFloat(document.getElementById('pricingCompetitiveLabor').value) || orig;
    const partCost = 240;
    const subtotal = partCost + comp;
    const vat = subtotal * 0.15;
    const total = subtotal + vat;

    const elLabor = document.getElementById('quoteLaborCost');
    const elVat = document.getElementById('quoteVatCost');
    const elTotal = document.getElementById('quoteFinalTotal');

    if (elLabor) elLabor.textContent = comp.toFixed(0) + ' ر.س';
    if (elVat) elVat.textContent = vat.toFixed(2) + ' ر.س';
    if (elTotal) elTotal.textContent = total.toFixed(2) + ' ر.س';
  },

  saveWorkshopPrice(carId) {
    const car = this.activeCars.find(c => c.id === carId);
    if (!car) return;

    const orig = parseFloat(document.getElementById('pricingOriginalLabor').value) || car.laborOriginal;
    const comp = parseFloat(document.getElementById('pricingCompetitiveLabor').value) || car.laborCompetitive;

    car.laborOriginal = orig;
    car.laborCompetitive = comp;
    const subtotal = car.partCost + comp;
    car.vatCost = parseFloat((subtotal * 0.15).toFixed(2));
    car.total = parseFloat((subtotal + car.vatCost).toFixed(2));

    const modal = document.getElementById('workshopPricingModal');
    if (modal) modal.remove();

    this.renderActiveCarsSection();
    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast('تم حفظ التسعيرة والعرض المنافس بنجاح! جاهز للمشاركة مع العميل.');
    }
  },

  // ---------------------------------------------------------------------------
  // 9. مشاركة الفاتورة والمحادثة المشفرة بين العميل والورشة
  // ---------------------------------------------------------------------------
  openCustomerChatModal(carId) {
    const car = this.activeCars.find(c => c.id === carId);
    if (!car) return;

    const modalHtml = `
      <div id="customerChatModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.7); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 24px; width: 100%; max-width: 520px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); border: 1.5px solid #E2E8F0; display: flex; flex-direction: column; max-height: 92vh;">
          
          <!-- الشريط العلوي للمحادثة -->
          <div style="padding: 12px 16px; background: #0A2540; color: #FFFFFF; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 38px; height: 38px; border-radius: 50%; background: #0066FF; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.95rem;">
                ${car.clientName.charAt(0)}
              </div>
              <div>
                <strong style="font-size: 0.90rem; display: block;">العميل: ${car.clientName}</strong>
                <span style="font-size: 0.70rem; color: #93C5FD;">🔒 محادثة رسمية مشفرة برقم الهيكل (${car.plate})</span>
              </div>
            </div>

            <button type="button" onclick="document.getElementById('customerChatModal').remove()" style="border: none; background: rgba(255,255,255,0.15); color: #FFF; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">✕</button>
          </div>

          <!-- جسم المحادثة والرسائل المتبادلة -->
          <div style="padding: 16px; background: #F8FAFC; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px;">
            
            <!-- رسالة تقرير كفو AI الموجهة من الورشة للعميل -->
            <div style="align-self: flex-start; max-width: 90%; background: #FFFFFF; border: 1.5px solid #BFDBFE; border-radius: 16px; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-size: 0.72rem; font-weight: 800; color: #0066FF;">تقرير الفحص وتصوير الخراب (كفو AI)</span>
                <span style="font-size: 0.65rem; color: #94A3B8;">10:30 ص</span>
              </div>

              <!-- معاينة صورة القطعة المصورة -->
              <div style="width: 100%; height: 120px; border-radius: 10px; background: #F1F5F9; border: 1px solid #CBD5E1; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; flex-direction: column; gap: 4px;">
                <span style="font-size: 2rem;">🔩</span>
                <span style="font-size: 0.70rem; color: #475569;">صورة القطعة التالفة: ${car.diagnosisPart || 'مساعد أمامي'}</span>
              </div>

              <p style="margin: 0; font-size: 0.78rem; color: #1E293B; line-height: 1.4;">
                أهلاً أستاذ ${car.clientName}، تم فحص سيارتك <strong>[${car.carName}]</strong> وتصوير القطعة التالفة. 
                <br>
                <strong style="color: #991B1B;">تشخيص AI:</strong> ${car.damageType || 'تلف صوفة الزيت مع تآكل داخلي'}.
              </p>
            </div>

            <!-- بطاقة الفاتورة الضريبية ZATCA المرفقة -->
            <div style="align-self: flex-start; max-width: 90%; background: #EFF6FF; border: 1.5px solid #0066FF; border-radius: 16px; padding: 14px; box-shadow: 0 4px 12px rgba(0,102,255,0.08);">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #BFDBFE; padding-bottom: 6px; margin-bottom: 8px;">
                <strong style="font-size: 0.84rem; color: #0A2540;">فاتورة عرض الصيانة المعتمدة (ZATCA)</strong>
                <span style="font-size: 0.68rem; background: #DCFCE7; color: #15803D; font-weight: 800; padding: 2px 6px; border-radius: 4px;">عرض منافس ⚡</span>
              </div>

              <div style="font-size: 0.76rem; color: #334155; display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between;">
                  <span>قطع الغيار المطلوبة:</span>
                  <strong>${car.partCost} ر.س</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>أجور يد الورشة (عرض مخفض):</span>
                  <strong style="color: #16A34A;">${car.laborCompetitive} ر.س</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>ضريبة القيمة المضافة 15%:</span>
                  <strong>${car.vatCost} ر.س</strong>
                </div>
                <div style="border-top: 1px solid #CBD5E1; padding-top: 4px; display: flex; justify-content: space-between; font-weight: 900; color: #0066FF; font-size: 0.88rem;">
                  <span>الإجمالي النهائي:</span>
                  <span>${car.total} ر.س</span>
                </div>
              </div>

              <div style="margin-top: 10px; background: #FFFFFF; border-radius: 8px; padding: 6px 8px; font-size: 0.70rem; color: #15803D; text-align: center; font-weight: 800;">
                ✓ ضمان كفو المالي 100% ودفع آمن بعد استلام السيارة وتجربتها
              </div>
            </div>

            <!-- رد العميل بالموافقة على الإصلاح -->
            <div style="align-self: flex-end; max-width: 80%; background: #DCFCE7; border: 1px solid #86EFAC; border-radius: 16px; padding: 10px 12px; color: #14532D; font-size: 0.78rem;">
              <div style="font-weight: 800; margin-bottom: 2px;">العميل (عبدالله التميمي):</div>
              "شكراً لكم على وضوح الفحص وتصوير القطعة. موافق على السعر المنافس وتوكلوا على الله ابدأوا بالإصلاح."
              <div style="font-size: 0.65rem; color: #15803D; text-align: left; margin-top: 4px;">10:35 ص ✓✓</div>
            </div>

          </div>

          <!-- شريط إرسال رسالة جديدة -->
          <div style="padding: 10px 14px; background: #FFFFFF; border-top: 1px solid #E2E8F0; display: flex; gap: 8px;">
            <input type="text" id="chatMsgInput" placeholder="اكتب رسالة فنية أو تحديثاً للعميل..." style="flex: 1; height: 42px; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 0 10px; font-family: inherit; font-size: 0.84rem;" />
            <button 
              type="button" 
              onclick="
                if (document.getElementById('chatMsgInput').value.trim()) {
                  KafuApp.showToast('تم إرسال الرسالة إلى هاتف العميل بنجاح');
                  document.getElementById('chatMsgInput').value = '';
                }
              "
              style="background: #0066FF; color: #FFFFFF; border: none; padding: 0 16px; border-radius: 10px; font-weight: 800; font-size: 0.88rem; cursor: pointer;"
            >
              إرسال ↗
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // ---------------------------------------------------------------------------
  // 10. مساعد كفو AI الفني لإصلاح الأعطال وأكواد OBD-II وعزم الشد
  // ---------------------------------------------------------------------------
  renderAiRepairAssistantSection() {
    const el = document.getElementById('workshopAiAssistantContainer');
    if (!el) return;

    el.innerHTML = `
      <div style="background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); color: #FFFFFF; border-radius: 20px; padding: 18px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 10px 25px rgba(49,46,129,0.25);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
              🤖
            </div>
            <div>
              <strong style="font-size: 1rem; letter-spacing: -0.2px;">مساعد كفو AI الفني لإصلاح وصيانة المركبات:</strong>
              <p style="margin: 1px 0 0; font-size: 0.74rem; color: #C7D2FE;">تشخيص أكواد OBD-II، عزم الشد الموصى به، وخطوات الإصلاح للمهندس</p>
            </div>
          </div>

          <button 
            type="button" 
            onclick="KafuWorkshopPortal.openAiRepairCopilotModal()"
            style="background: #6366F1; color: #FFFFFF; border: none; padding: 8px 14px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; gap: 5px; box-shadow: 0 4px 12px rgba(99,102,241,0.35);"
          >
            <span>استشارة فنية فورية AI ⚡</span>
          </button>
        </div>

        <!-- شبكة سريعة لأكواد الأعطال وعزم الشد -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          
          <!-- بطاقة أكواد الأعطال OBD-II -->
          <div style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; padding: 12px;">
            <div style="font-size: 0.78rem; font-weight: 800; color: #FCD34D; margin-bottom: 6px;">
              ⚠️ أشهر أكواد الأعطال في سيارات اليوم:
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.74rem;">
              ${this.aiRepairGuide.codes.slice(0, 2).map(c => `
                <div style="background: rgba(0,0,0,0.25); padding: 6px 8px; border-radius: 8px;">
                  <strong style="color: #38BDF8; font-family: monospace;">[${c.code}]</strong> ${c.title}
                  <div style="color: #C7D2FE; font-size: 0.70rem; margin-top: 2px;">${c.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- بطاقة عزم الشد الموصى به -->
          <div style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; padding: 12px;">
            <div style="font-size: 0.78rem; font-weight: 800; color: #86EFAC; margin-bottom: 6px;">
              🔩 عزم الشد القياسي (Torque Specs):
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.74rem;">
              ${this.aiRepairGuide.torques.slice(0, 2).map(t => `
                <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.25); padding: 6px 8px; border-radius: 8px;">
                  <span style="color: #E0E7FF;">${t.item}:</span>
                  <strong style="color: #4ADE80; font-family: monospace;">${t.val}</strong>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;
  },

  openAiRepairCopilotModal() {
    const codes = this.aiRepairGuide.codes;
    const torques = this.aiRepairGuide.torques;

    const modalHtml = `
      <div id="aiRepairCopilotModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.7); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 22px; width: 100%; max-width: 520px; padding: 20px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); border: 1.5px solid #E2E8F0; max-height: 90vh; overflow-y: auto;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
            <div>
              <h3 style="margin: 0; font-size: 1.10rem; font-weight: 900; color: #1E1B4B; display: flex; align-items: center; gap: 6px;">
                <span>🤖</span>
                <span>مساعد كفو AI الفني لإصلاح الأعطال الميكانيكية</span>
              </h3>
              <p style="margin: 2px 0 0; font-size: 0.74rem; color: #64748B;">كتالوجات المصنع وعزم الشد وأكواد الفحص المعتمدة</p>
            </div>
            <button type="button" onclick="document.getElementById('aiRepairCopilotModal').remove()" style="border: none; background: #F1F5F9; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; color: #64748B; font-weight: 800;">✕</button>
          </div>

          <!-- البحث السريع في كود أو قطعة -->
          <div>
            <label style="font-size: 0.78rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">ابحث بكود العطل (DTC) أو اسم القطعة:</label>
            <div style="display: flex; gap: 6px;">
              <input type="text" placeholder="مثال: P0300 أو مساعد أمامي كامري" value="P0300" style="flex: 1; height: 42px; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 0 10px; font-family: inherit; font-size: 0.88rem;" />
              <button type="button" onclick="KafuApp.showToast('تم فحص الكود بالذكاء الاصطناعي')" style="background: #4F46E5; color: #FFF; border: none; padding: 0 14px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer;">
                فحص AI 🔍
              </button>
            </div>
          </div>

          <!-- خطوات الإصلاح المعتمدة -->
          <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
            <strong style="font-size: 0.84rem; color: #0A2540;">🛠️ دليل المعالجة خطوة بخطوة لكود [P0300]:</strong>
            <ol style="margin: 0; padding-right: 20px; font-size: 0.78rem; color: #334155; line-height: 1.5;">
              <li><strong>فحص الشرارة:</strong> فحص الكويلات الأربعة بجهاز الذبذبات والتأكد من عدم وجود تسريب زيت على البواجي.</li>
              <li><strong>فحص البواجي:</strong> التأكد من أن خلوص البوجي مطابق لمواصفات تويوتا (1.1 mm) وعدم وجود كربون أسود.</li>
              <li><strong>فحص الضغط:</strong> إجراء اختبار ضغط الأسطوانات (Cylinder Compression Test) ويجب ألا يقل عن 180 PSI.</li>
            </ol>
          </div>

          <!-- جدول عزم الشد -->
          <div style="background: #F0FDF4; border: 1.5px solid #BBF7D0; border-radius: 14px; padding: 12px;">
            <strong style="font-size: 0.84rem; color: #166534; display: block; margin-bottom: 6px;">🔩 عزم الشد الموصى به من الصانع:</strong>
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.76rem;">
              ${torques.map(t => `
                <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #DCFCE7; padding-bottom: 3px;">
                  <span>${t.item}</span>
                  <strong style="color: #15803D; font-family: monospace;">${t.val}</strong>
                </div>
              `).join('')}
            </div>
          </div>

          <button type="button" onclick="document.getElementById('aiRepairCopilotModal').remove()" style="height: 42px; background: #0A2540; color: #FFFFFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.88rem; cursor: pointer;">
            إغلاق المساعد الفني
          </button>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  openExpressDeliveryModal() {
    if (window.openWorkshopExpressDeliveryModal) {
      window.openWorkshopExpressDeliveryModal();
    } else {
      alert('تم حجز شاحنة كفو السريعة للورشة! سيصل الكابتن خلال 35 دقيقة لباب الورشة.');
    }
  }
};

window.KafuWorkshopPortal = KafuWorkshopPortal;
