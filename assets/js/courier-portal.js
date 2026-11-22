/**
 * كفو (Kafu) - منصة وتجربة مندوب وسائق التوصيل الشاملة (Driver User Journey)
 * تغطي المراحل الخمس بدقة وتوثيق بصري لمنع التلاعب والضياع:
 * 1. شاشة تسجيل الدخول والتحقق (Driver Authentication & Online/Offline Status)
 * 2. شاشة الشحنات المتاحة والطلبات الجديدة (Available Shipments Hub)
 * 3. شاشة مسار الاستلام من التاجر وإثبات الاستلام بالصور وQR (Pickup Route & Proof of Pickup)
 * 4. شاشة مسار التسليم للعميل وإثبات التسليم النهائي (Delivery Route & Proof of Delivery - POD)
 * 5. شاشة المحفظة والأرباح اليومية للمندوب وسجل الحوالات (Driver Wallet & Earnings)
 */

const KafuCourierPortal = {
  // الحالة العامة
  currentTab: 'available', // 'available' | 'active' | 'history' | 'wallet'
  isOnline: true,
  currentFilter: 'all', // 'all' | 'nearby' | 'light' | 'heavy'
  activeTrip: null, // الطلب الجاري تنفيذه حالياً

  driverData: {
    name: 'كابتن أحمد القحطاني',
    phone: '+966 55 123 4567',
    avatar: '👨‍✈️',
    vehicleType: 'تويوتا هايلوكس 2023 (وانيت بيك آب)',
    vehiclePlate: 'ق ح ط 7788',
    vehicleCapacity: 'مناسب لجميع الأحجام (خفيف، متوسط، ومكائن ثقيلة)',
    rating: 4.95,
    totalTrips: 348,
    todayTrips: 8,
    acceptanceRate: '98%',
    activeCity: 'الرياض',
    coverageZone: 'الصناعية القديمة · تشاليح الحائر · مخرج 18 · السلي',
    walletBalance: 620.00,
    todayEarnings: 380.00,
    weekEarnings: 2140.00,
    pendingPayout: 0.00,
    iban: 'SA44 1000 0001 2345 6789 0101',
    bankName: 'البنك الأهلي السعودي (SNB)'
  },

  // الشحنات المتاحة في رادار المندوب
  availableShipments: [
    {
      id: 'SHP-9142',
      orderId: 'ORD-8921',
      priority: 'high',
      cargoName: 'مساعد أمامي هيدروليك ياباني + طقم فحمات سيراميك',
      cargoCategory: 'medium', // 'light' | 'medium' | 'heavy'
      cargoSizeLabel: 'شحنة متوسطة (تناسب سيدان / وانيت)',
      cargoSizeIcon: '📦',
      cargoWeight: '7.5 كجم',
      cargoDims: '60 × 25 × 25 سم',
      earningNet: 45.00,
      distanceTotal: '8.4 كم',
      etaTotal: '22 دقيقة',
      // نقطة الاستلام
      pickup: {
        type: 'تشليح معتمد',
        name: 'تشاليح الحائر الكبرى (محل سعود العتيبي)',
        repName: 'سعود بن مسفر العتيبي',
        phone: '050XXXX891',
        city: 'الرياض',
        district: 'تشاليح الحائر - المربع الثاني شارع 5',
        lat: 24.5211,
        lng: 46.8123,
        distanceFromDriver: '2.4 كم',
        etaToPickup: '7 دقائق',
        pickupSecretPin: '8942',
        instructions: 'القطعة مغلفة وجاهزة برصيف الاستلام التجاري رقم 4'
      },
      // نقطة التسليم
      dropoff: {
        type: 'ورشة صيانة',
        name: 'مركز صيانة النخبة المتكامل (م. سامي أحمد)',
        clientName: 'عبدالله بن فهد التميمي (مالك كامري 2025)',
        phone: '054XXXX334',
        city: 'الرياض',
        district: 'الصناعية القديمة - مخرج 18 شارع ابن العميد ورشة 42',
        lat: 24.6312,
        lng: 46.7891,
        distanceFromPickup: '6.0 كم',
        etaToDropoff: '15 دقيقة',
        deliveryOtp: '6139',
        instructions: 'تسليم القطعة للمهندس المسؤول مباشرة للتوقيع والفحص'
      },
      expiresInSeconds: 42
    },
    {
      id: 'SHP-9150',
      orderId: 'ORD-8930',
      priority: 'urgent',
      cargoName: 'محرك تويوتا كامري 2.5L Dynamic Force كامل مع الكمبروسر',
      cargoCategory: 'heavy',
      cargoSizeLabel: 'شحنة ثقيلة وكبيرة (تتطلب وانيت أو دينا 🚛)',
      cargoSizeIcon: '🚛',
      cargoWeight: '190 كجم',
      cargoDims: '110 × 90 × 85 سم',
      earningNet: 120.00,
      distanceTotal: '26.5 كم',
      etaTotal: '38 دقيقة',
      pickup: {
        type: 'مستودع الموزع',
        name: 'مستودع العبيكان لقطع الغيار والمحركات',
        repName: 'مندوب المبيعات: أ. فهد السبيعي',
        phone: '055XXXX312',
        city: 'الرياض',
        district: 'حي الفيصلية - شارع خديجة بنت خويلد مستودع 12',
        lat: 24.6050,
        lng: 46.7620,
        distanceFromDriver: '4.8 كم',
        etaToPickup: '11 دقيقة',
        pickupSecretPin: '4410',
        instructions: 'يوجد ونش رافعة شوكية للتحميل المباشر في صندوق الوانيت'
      },
      dropoff: {
        type: 'ورشة صيانة خارجية',
        name: 'كراج الفرسان لصيانة المحركات والجيربوكس',
        clientName: 'أ. عبدالمحسن الدوسري',
        phone: '056XXXX991',
        city: 'الخرج',
        district: 'المنطقة الصناعية الجديدة - طريق الرياض الخرج السريع',
        lat: 24.1500,
        lng: 47.3000,
        distanceFromPickup: '21.7 كم',
        etaToDropoff: '27 دقيقة',
        deliveryOtp: '7721',
        instructions: 'توصيل لباب ورشة الفرسان - تسليم واستلام رسمي'
      },
      expiresInSeconds: 58
    },
    {
      id: 'SHP-9155',
      orderId: 'ORD-8935',
      priority: 'normal',
      cargoName: 'حساس أوكسجين شكمان أصلي (O2 Sensor) + فلتر هواء وكالة',
      cargoCategory: 'light',
      cargoSizeLabel: 'شحنة خفيفة وسريعة (تناسب دراجة أو سيدان)',
      cargoSizeIcon: '🛵',
      cargoWeight: '0.8 كجم',
      cargoDims: '20 × 15 × 10 سم',
      earningNet: 35.00,
      distanceTotal: '5.2 كم',
      etaTotal: '14 دقيقة',
      pickup: {
        type: 'متجر قطع جديد',
        name: 'مؤسسة التقوى لقطع غيار تويوتا الأصلية',
        repName: 'مسؤول المبيعات: أ. عماد الشريف',
        phone: '053XXXX772',
        city: 'الرياض',
        district: 'حي الغرابي - شارع المعذر محل رقم 18',
        lat: 24.6540,
        lng: 46.7210,
        distanceFromDriver: '3.1 كم',
        etaToPickup: '8 دقائق',
        pickupSecretPin: '2981',
        instructions: 'القطعة في الكرتون الأصلي مع الفاتورة الضريبية ZATCA'
      },
      dropoff: {
        type: 'منزل العميل',
        name: 'منزل العميل (فيلا خاصة)',
        clientName: 'د. فيصل بن ناصر الشهري',
        phone: '050XXXX455',
        city: 'الرياض',
        district: 'حي الملز - شارع المتنبي بجوار حديقة الملك عبدالله',
        lat: 24.6720,
        lng: 46.7350,
        distanceFromPickup: '2.1 كم',
        etaToDropoff: '6 دقائق',
        deliveryOtp: '9034',
        instructions: 'التوصيل عند الباب الخارجي والتواصل المباشر عبر التطبيق'
      },
      expiresInSeconds: 35
    }
  ],

  // سجل التوصيلات المكتملة وإثباتات التسليم (POD)
  completedDeliveries: [
    {
      id: 'SHP-9044',
      orderId: 'ORD-8871',
      date: 'اليوم · 04:30 م',
      cargoName: 'رديتر ماء نحاس كامري + طرمبة موية',
      pickupName: 'تشاليح الحائر (مركز العروبة)',
      dropoffName: 'ورشة العزم الحديثة - الصناعية القديمة',
      earningNet: 50.00,
      status: 'delivered',
      podPhotoUrl: 'assets/img/pod-sample-1.jpg',
      podSignedBy: 'المشرف فني الورشة (م. كمال)',
      verifiedOtp: '4190'
    },
    {
      id: 'SHP-8992',
      orderId: 'ORD-8820',
      date: 'اليوم · 01:15 م',
      cargoName: 'دينمو كهرباء ياباني أصلي 130A',
      pickupName: 'محل الرائد للمولدات والكهرباء',
      dropoffName: 'منزل العميل: حي الروضة شارع خالد بن الوليد',
      earningNet: 40.00,
      status: 'delivered',
      podPhotoUrl: 'assets/img/pod-sample-2.jpg',
      podSignedBy: 'العميل شخصياً: سعد القحطاني',
      verifiedOtp: '3318'
    },
    {
      id: 'SHP-8950',
      orderId: 'ORD-8799',
      date: 'أمس · 06:45 م',
      cargoName: 'باب خلفي يمين تشليح نظيف مع الزجاج',
      pickupName: 'تشليح اليمامة الحائر',
      dropoffName: 'ورشة المحترف للسمكرة والدهان',
      earningNet: 85.00,
      status: 'delivered',
      podPhotoUrl: 'assets/img/pod-sample-3.jpg',
      podSignedBy: 'معلم السمكرة: أبو خليل',
      verifiedOtp: '7822'
    }
  ],

  // سجل الحوالات البنكية المحولة لحساب المندوب
  bankTransfers: [
    {
      id: 'TRX-99410',
      date: '2026-11-20 · 11:00 م',
      amount: 1450.00,
      status: 'completed',
      bankName: 'البنك الأهلي السعودي (سريع)',
      refNum: 'SARIE-98218731'
    },
    {
      id: 'TRX-98112',
      date: '2026-11-13 · 11:00 م',
      amount: 1820.00,
      status: 'completed',
      bankName: 'البنك الأهلي السعودي (سريع)',
      refNum: 'SARIE-87126543'
    }
  ],

  // ---------------------------------------------------------------------------
  // التهيئة
  // ---------------------------------------------------------------------------
  init() {
    this.loadState();
    this.renderHeader();
    this.renderTabsNav();
    this.renderMainContent();
    this.startRadarSimulation();
  },

  loadState() {
    try {
      const saved = localStorage.getItem('kafu_courier_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.isOnline === 'boolean') this.isOnline = parsed.isOnline;
        if (parsed.activeTrip) this.activeTrip = parsed.activeTrip;
        if (parsed.driverData) this.driverData = { ...this.driverData, ...parsed.driverData };
      }
    } catch (e) {
      console.warn('Could not load courier state', e);
    }
  },

  saveState() {
    try {
      const toSave = {
        isOnline: this.isOnline,
        activeTrip: this.activeTrip,
        driverData: this.driverData
      };
      localStorage.setItem('kafu_courier_state', JSON.stringify(toSave));
    } catch (e) {
      console.warn('Could not save courier state', e);
    }
  },

  // ---------------------------------------------------------------------------
  // 1. رأس الصفحة وحالة المندوب (Driver Status Bar)
  // ---------------------------------------------------------------------------
  renderHeader() {
    const el = document.getElementById('courierHeader');
    if (!el) return;

    el.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
        
        <!-- معلومات المندوب والمركبة -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="position: relative;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: #EFF6FF; border: 2px solid #0066FF; display: flex; align-items: center; justify-content: center; font-size: 1.6rem;">
              ${this.driverData.avatar}
            </div>
            <div style="position: absolute; bottom: 0; right: 0; width: 14px; height: 14px; border-radius: 50%; background: ${this.isOnline ? '#16A34A' : '#94A3B8'}; border: 2.5px solid #FFFFFF;"></div>
          </div>

          <div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <h1 style="margin: 0; font-size: 1.15rem; font-weight: 900; color: #0A2540;">${this.driverData.name}</h1>
              <span style="background: #FEF3C7; color: #B45309; padding: 2px 7px; border-radius: 6px; font-size: 0.72rem; font-weight: 800;">
                ⭐ ${this.driverData.rating} (${this.driverData.totalTrips})
              </span>
            </div>
            <p style="margin: 2px 0 0; font-size: 0.76rem; color: #64748B;">
              ${this.driverData.vehicleType} · لوحة: <strong style="color: #0F172A; font-family: monospace;">${this.driverData.vehiclePlate}</strong>
            </p>
          </div>
        </div>

        <!-- أزرار الإجراءات ومفتاح Online / Offline -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <!-- زر تسجيل الدخول والتحقق برقم الجوال -->
          <button 
            type="button" 
            onclick="KafuCourierPortal.openAuthModal()"
            style="background: #F8FAFC; border: 1.5px solid #CBD5E1; color: #334155; padding: 8px 12px; border-radius: 12px; font-size: 0.78rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 5px;"
          >
            <span>📱</span>
            <span>التحقق والحساب</span>
          </button>

          <!-- مفتاح التبديل الرئيسي Online / Offline -->
          <button 
            type="button" 
            onclick="KafuCourierPortal.toggleOnlineStatus()"
            style="
              background: ${this.isOnline ? 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)' : '#E2E8F0'};
              color: ${this.isOnline ? '#FFFFFF' : '#475569'};
              border: none;
              padding: 8px 16px;
              border-radius: 999px;
              font-size: 0.85rem;
              font-weight: 900;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 8px;
              box-shadow: ${this.isOnline ? '0 4px 14px rgba(22,163,74,0.35)' : 'none'};
              transition: all 0.25s ease;
            "
          >
            <span style="width: 10px; height: 10px; border-radius: 50%; background: ${this.isOnline ? '#86EFAC' : '#94A3B8'}; display: inline-block;"></span>
            <span>${this.isOnline ? 'متاح للعمل (متصل)' : 'غير متاح (مغلق)'}</span>
          </button>
        </div>

      </div>

      <!-- إشعار حالة المندوب ونطاق التغطية -->
      <div style="margin-top: 10px; background: ${this.isOnline ? '#F0FDF4' : '#F1F5F9'}; border: 1px solid ${this.isOnline ? '#BBF7D0' : '#CBD5E1'}; border-radius: 12px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; font-size: 0.74rem;">
        <div style="display: flex; align-items: center; gap: 6px; color: ${this.isOnline ? '#166534' : '#64748B'};">
          <span>${this.isOnline ? '📡' : '⏸️'}</span>
          <span>
            ${this.isOnline 
              ? `<strong>الرادار نشط:</strong> تستقبل حالياً طلبات وشحنات ${this.driverData.activeCity} (${this.driverData.coverageZone})`
              : '<strong>أنت غير متصل:</strong> لا تظهر في رادار التوزيع ولن تستلم طلبات حتى تعيد الاتصال.'}
          </span>
        </div>
        <span style="font-weight: 800; color: ${this.isOnline ? '#15803D' : '#64748B'};">
          ${this.isOnline ? 'جاهز للتوصيل ⚡' : 'وضع الراحة'}
        </span>
      </div>
    `;
  },

  // ---------------------------------------------------------------------------
  // 2. شريط التبويبات والملاحة
  // ---------------------------------------------------------------------------
  renderTabsNav() {
    const el = document.getElementById('courierTabsNav');
    if (!el) return;

    const tabs = [
      { id: 'available', label: 'الشحنات المتاحة', icon: '📍', badge: this.availableShipments.length },
      { id: 'active', label: 'الرحلة النشطة', icon: '🚚', badge: this.activeTrip ? '1' : null },
      { id: 'history', label: 'سجل التوصيل (POD)', icon: '📋', badge: this.completedDeliveries.length },
      { id: 'wallet', label: 'المحفظة والأرباح', icon: '💰', badge: `${this.driverData.todayEarnings.toFixed(0)} ر.س` }
    ];

    el.innerHTML = `
      <div style="display: flex; gap: 8px; overflow-x: auto; padding: 4px 0 8px 0; border-bottom: 1.5px solid #E2E8F0;">
        ${tabs.map(t => {
          const active = this.currentTab === t.id;
          return `
            <button 
              type="button" 
              onclick="KafuCourierPortal.switchTab('${t.id}')"
              style="
                flex: 1;
                min-width: 110px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                padding: 10px 8px;
                border-radius: 14px;
                border: 1.5px solid ${active ? '#0066FF' : '#E2E8F0'};
                background: ${active ? '#EFF6FF' : '#FFFFFF'};
                color: ${active ? '#0066FF' : '#475569'};
                font-family: inherit;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: ${active ? '0 4px 12px rgba(0,102,255,0.12)' : 'none'};
              "
            >
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 1.05rem;">${t.icon}</span>
                <span style="font-size: 0.82rem; font-weight: ${active ? '900' : '700'};">${t.label}</span>
              </div>
              ${t.badge !== null ? `
                <span style="background: ${active ? '#0066FF' : '#E2E8F0'}; color: ${active ? '#FFFFFF' : '#475569'}; padding: 1px 7px; border-radius: 999px; font-size: 0.68rem; font-weight: 800;">
                  ${t.badge}
                </span>
              ` : ''}
            </button>
          `;
        }).join('')}
      </div>
    `;
  },

  switchTab(tabId) {
    this.currentTab = tabId;
    this.renderTabsNav();
    this.renderMainContent();
  },

  renderMainContent() {
    const container = document.getElementById('courierMainContent');
    if (!container) return;

    if (!this.isOnline && this.currentTab === 'available') {
      container.innerHTML = this.renderOfflineNotice();
      return;
    }

    switch (this.currentTab) {
      case 'available':
        container.innerHTML = this.renderAvailableShipmentsView();
        break;
      case 'active':
        container.innerHTML = this.renderActiveTripView();
        break;
      case 'history':
        container.innerHTML = this.renderHistoryView();
        break;
      case 'wallet':
        container.innerHTML = this.renderWalletView();
        break;
      default:
        container.innerHTML = this.renderAvailableShipmentsView();
    }
  },

  renderOfflineNotice() {
    return `
      <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 20px; padding: 36px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
        <div style="width: 72px; height: 72px; border-radius: 50%; background: #F1F5F9; display: flex; align-items: center; justify-content: center; font-size: 2.2rem;">
          💤
        </div>
        <div>
          <h2 style="margin: 0; font-size: 1.15rem; font-weight: 900; color: #0A2540;">أنت الآن في وضع عدم الاتصال (Offline)</h2>
          <p style="margin: 6px 0 0; font-size: 0.82rem; color: #64748B; max-width: 360px; line-height: 1.5;">
            قم بتبديل حالتك إلى "متاح للعمل" للبدء في استقبال الشحنات وطلبات التوصيل المستعجلة من التشاليح والمتاجر القريبة منك.
          </p>
        </div>
        <button 
          type="button" 
          onclick="KafuCourierPortal.toggleOnlineStatus()"
          style="background: #16A34A; color: #FFFFFF; border: none; padding: 12px 28px; border-radius: 14px; font-size: 0.92rem; font-weight: 800; cursor: pointer; box-shadow: 0 4px 14px rgba(22,163,74,0.3); display: flex; align-items: center; gap: 8px;"
        >
          <span>⚡ تفعيل الاتصال وبدء استقبال الطلبات</span>
        </button>
      </div>
    `;
  },

  // ---------------------------------------------------------------------------
  // 3. شاشة الشحنات المتاحة والطلبات الجديدة (Available Shipments Hub)
  // ---------------------------------------------------------------------------
  renderAvailableShipmentsView() {
    let shipments = [...this.availableShipments];
    if (this.currentFilter === 'light') {
      shipments = shipments.filter(s => s.cargoCategory === 'light');
    } else if (this.currentFilter === 'heavy') {
      shipments = shipments.filter(s => s.cargoCategory === 'heavy');
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        
        <!-- شريط فلترة الشحنات حسب الحجم والأولوية -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div>
            <strong style="font-size: 0.94rem; color: #0A2540; display: flex; align-items: center; gap: 6px;">
              <span>📦</span>
              <span>الشحنات الجاهزة للاستلام فوراً:</span>
            </strong>
            <span style="font-size: 0.72rem; color: #64748B;">مصنفة حسب الأولوية وقرب المسار من موقعك الحالي</span>
          </div>

          <div style="display: flex; gap: 6px;">
            ${[
              { id: 'all', label: 'الكل' },
              { id: 'light', label: 'خفيفة 🛵' },
              { id: 'heavy', label: 'ثقيلة ومكائن 🚛' }
            ].map(f => `
              <button 
                type="button" 
                onclick="KafuCourierPortal.setFilter('${f.id}')"
                style="
                  padding: 5px 12px;
                  border-radius: 8px;
                  font-size: 0.75rem;
                  font-weight: 800;
                  cursor: pointer;
                  border: 1px solid ${this.currentFilter === f.id ? '#0066FF' : '#CBD5E1'};
                  background: ${this.currentFilter === f.id ? '#0066FF' : '#FFFFFF'};
                  color: ${this.currentFilter === f.id ? '#FFFFFF' : '#334155'};
                "
              >
                ${f.label}
              </button>
            `).join('')}
          </div>
        </div>

        ${shipments.length === 0 ? `
          <div style="background: #FFFFFF; border: 1.5px dashed #CBD5E1; border-radius: 16px; padding: 30px; text-align: center; color: #64748B;">
            <div style="font-size: 2rem; margin-bottom: 6px;">⏳</div>
            <strong>لا توجد شحنات مطابقة للفلتر المختار حالياً</strong>
            <p style="font-size: 0.76rem; margin: 4px 0 0;">سيتم تنبيهك فور توفر طلبات جديدة في منطقتك الجغرافية</p>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${shipments.map(s => this.renderShipmentCard(s)).join('')}
          </div>
        `}

      </div>
    `;
  },

  renderShipmentCard(s) {
    const isHeavy = s.cargoCategory === 'heavy';
    const isUrgent = s.priority === 'urgent';

    return `
      <div style="
        background: #FFFFFF; 
        border: 1.5px solid ${isUrgent ? '#F59E0B' : '#E2E8F0'}; 
        border-radius: 18px; 
        padding: 16px; 
        display: flex; 
        flex-direction: column; 
        gap: 12px;
        box-shadow: 0 4px 16px rgba(15,23,42,0.05);
        position: relative;
        overflow: hidden;
      ">
        ${isUrgent ? `
          <div style="position: absolute; top: 0; left: 0; background: linear-gradient(135deg, #F59E0B, #D97706); color: #FFFFFF; padding: 3px 14px; font-size: 0.68rem; font-weight: 900; border-bottom-right-radius: 12px;">
            طلب عاجل ⚡ تسليم فوري
          </div>
        ` : ''}

        <!-- رأس بطاقة الشحنة وقيمة التوصيل الصافية -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-top: ${isUrgent ? '4px' : '0'};">
          <div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-family: monospace; font-weight: 900; color: #0066FF; font-size: 0.88rem;">${s.id}</span>
              <span style="background: ${isHeavy ? '#FEE2E2' : '#F1F5F9'}; color: ${isHeavy ? '#DC2626' : '#475569'}; padding: 2px 8px; border-radius: 6px; font-size: 0.70rem; font-weight: 800;">
                ${s.cargoSizeIcon} ${s.cargoSizeLabel}
              </span>
            </div>
            <h3 style="margin: 4px 0 0; font-size: 0.98rem; font-weight: 900; color: #0A2540; line-height: 1.4;">
              ${s.cargoName}
            </h3>
            <div style="font-size: 0.72rem; color: #64748B; margin-top: 2px;">
              الوزن التقديري: <strong>${s.cargoWeight}</strong> · الأبعاد: ${s.cargoDims}
            </div>
          </div>

          <!-- المبلغ الصافي الذي سيقبضه المندوب -->
          <div style="background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 14px; padding: 8px 12px; text-align: center; flex-shrink: 0;">
            <div style="font-size: 0.68rem; color: #166534; font-weight: 700;">صافي أرباحك:</div>
            <div style="font-size: 1.25rem; font-weight: 900; color: #15803D; font-family: 'IBM Plex Sans Arabic', sans-serif;">
              ${s.earningNet.toFixed(0)} <span style="font-size: 0.75rem;">ر.س</span>
            </div>
            <div style="font-size: 0.65rem; color: #15803D; font-weight: 800;">إيداع فوري ✓</div>
          </div>
        </div>

        <!-- مسار الشحنة: نقطة الاستلام -> نقطة التسليم -->
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
          
          <!-- نقطة الاستلام: التاجر / التشليح / مندوب المبيعات -->
          <div style="display: flex; gap: 10px; align-items: flex-start;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: #0066FF; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 900; flex-shrink: 0; margin-top: 2px;">
              1
            </div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.70rem; color: #0066FF; font-weight: 800;">نقطة الاستلام (${s.pickup.type}):</span>
                <span style="font-size: 0.70rem; color: #64748B;">يبعد عنك: <strong>${s.pickup.distanceFromDriver}</strong> (${s.pickup.etaToPickup})</span>
              </div>
              <strong style="font-size: 0.82rem; color: #0F172A; display: block; margin-top: 1px;">${s.pickup.name}</strong>
              <div style="font-size: 0.72rem; color: #64748B;">
                المسؤول: <strong>${s.pickup.repName}</strong> · جوال: ${s.pickup.phone}
              </div>
              <div style="font-size: 0.72rem; color: #475569; margin-top: 2px;">
                📍 ${s.pickup.district}
              </div>
            </div>
          </div>

          <!-- خط الربط الفاصل -->
          <div style="margin-right: 11px; border-right: 2px dashed #CBD5E1; height: 12px;"></div>

          <!-- نقطة التسليم: العميل أو الورشة -->
          <div style="display: flex; gap: 10px; align-items: flex-start;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: #16A34A; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 900; flex-shrink: 0; margin-top: 2px;">
              2
            </div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.70rem; color: #16A34A; font-weight: 800;">نقطة التسليم (${s.dropoff.type}):</span>
                <span style="font-size: 0.70rem; color: #64748B;">مسافة الرحلة: <strong>${s.dropoff.distanceFromPickup}</strong> (${s.dropoff.etaToDropoff})</span>
              </div>
              <strong style="font-size: 0.82rem; color: #0F172A; display: block; margin-top: 1px;">${s.dropoff.name}</strong>
              <div style="font-size: 0.72rem; color: #64748B;">
                العميل: <strong>${s.dropoff.clientName}</strong> · جوال: ${s.dropoff.phone}
              </div>
              <div style="font-size: 0.72rem; color: #475569; margin-top: 2px;">
                📍 ${s.dropoff.district}
              </div>
            </div>
          </div>

        </div>

        <!-- ملخص المسافة الإجمالية وزر القبول المباشر -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; pt: 4px;">
          <div style="font-size: 0.74rem; color: #64748B;">
            إجمالي المسافة: <strong style="color: #0F172A;">${s.distanceTotal}</strong> · الوقت المتوقع: <strong style="color: #0F172A;">${s.etaTotal}</strong>
          </div>

          <button 
            type="button" 
            onclick="KafuCourierPortal.acceptShipment('${s.id}')"
            style="
              background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%);
              color: #FFFFFF;
              border: none;
              padding: 10px 22px;
              border-radius: 12px;
              font-size: 0.88rem;
              font-weight: 900;
              cursor: pointer;
              box-shadow: 0 4px 14px rgba(0,102,255,0.28);
              display: flex;
              align-items: center;
              gap: 6px;
              transition: transform 0.15s ease;
            "
          >
            <span>قبول الطلب وبدء رحلة الاستلام 🚀</span>
          </button>
        </div>

      </div>
    `;
  },

  setFilter(filter) {
    this.currentFilter = filter;
    this.renderMainContent();
  },

  acceptShipment(shipmentId) {
    const s = this.availableShipments.find(item => item.id === shipmentId);
    if (!s) return;

    // نقل الشحنة لتكون الرحلة النشطة
    this.activeTrip = {
      ...s,
      stage: 'heading_to_pickup', // 'heading_to_pickup' | 'arrived_pickup' | 'picked_up' | 'heading_to_dropoff' | 'arrived_dropoff' | 'delivered'
      acceptedAt: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      pickupPhoto: null,
      deliveryPhoto: null,
      signatureData: null
    };

    // إزالة من المتاحة
    this.availableShipments = this.availableShipments.filter(item => item.id !== shipmentId);
    this.saveState();

    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast(`تم قبول الشحنة [${s.id}] بنجاح! توجه الآن لنقطة الاستلام 📍`);
    }

    // الانتقال لتبويب الرحلة النشطة مباشرة
    this.currentTab = 'active';
    this.renderTabsNav();
    this.renderMainContent();
  },

  // ---------------------------------------------------------------------------
  // 4. شاشة مسار الاستلام والتسليم النشط (Active Trip & Proof of Delivery)
  // ---------------------------------------------------------------------------
  renderActiveTripView() {
    if (!this.activeTrip) {
      return `
        <div style="background: #FFFFFF; border: 1.5px dashed #CBD5E1; border-radius: 20px; padding: 40px 20px; text-align: center; color: #64748B; display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <div style="font-size: 2.4rem;">🚚</div>
          <h3 style="margin: 0; font-size: 1.05rem; font-weight: 900; color: #0A2540;">لا توجد رحلة نشطة قيد التنفيذ حالياً</h3>
          <p style="margin: 0; font-size: 0.80rem; max-width: 320px;">
            تصفح الشحنات المتاحة في الرادار وقم بقبول طلب لبدء مسار الاستلام والتسليم المباشر.
          </p>
          <button 
            type="button" 
            onclick="KafuCourierPortal.switchTab('available')"
            style="background: #0066FF; color: #FFF; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 800; font-size: 0.84rem; cursor: pointer; margin-top: 4px;"
          >
            عرض الشحنات المتاحة 📍
          </button>
        </div>
      `;
    }

    const t = this.activeTrip;
    const isPickupPhase = ['heading_to_pickup', 'arrived_pickup'].includes(t.stage);
    const isDropoffPhase = ['picked_up', 'heading_to_dropoff', 'arrived_dropoff'].includes(t.stage);

    return `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        
        <!-- بانر الحالة والمسار الجاري -->
        <div style="background: linear-gradient(135deg, #0A2540 0%, #1E3A8A 100%); color: #FFFFFF; border-radius: 18px; padding: 16px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 8px 24px rgba(10,37,64,0.18);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="background: #38BDF8; color: #082F49; padding: 2px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: 900;">
                رحلة نشطة حالياً ⚡
              </span>
              <span style="font-size: 0.74rem; color: #BAE6FD;">رقم الشحنة: ${t.id}</span>
            </div>
            <strong style="color: #4ADE80; font-size: 0.95rem;">+${t.earningNet} ر.س صافي</strong>
          </div>

          <h2 style="margin: 0; font-size: 1.05rem; font-weight: 900; line-height: 1.35;">
            ${t.cargoName}
          </h2>

          <!-- شريط المراحل الأربع التفاعلي -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 4px;">
            <div style="text-align: center; font-size: 0.68rem; color: ${isPickupPhase ? '#FCD34D' : '#86EFAC'}; font-weight: 800;">
              1. استلام التاجر ${!isPickupPhase ? '✓' : '●'}
            </div>
            <div style="text-align: center; font-size: 0.68rem; color: ${t.stage === 'arrived_pickup' ? '#FCD34D' : (isDropoffPhase ? '#86EFAC' : '#94A3B8')}; font-weight: 800;">
              2. توثيق الصندوق ${isDropoffPhase ? '✓' : ''}
            </div>
            <div style="text-align: center; font-size: 0.68rem; color: ${isDropoffPhase ? '#FCD34D' : '#94A3B8'}; font-weight: 800;">
              3. مسار العميل
            </div>
            <div style="text-align: center; font-size: 0.68rem; color: ${t.stage === 'delivered' ? '#86EFAC' : '#94A3B8'}; font-weight: 800;">
              4. التسليم والـ POD
            </div>
          </div>
        </div>

        ${isPickupPhase ? this.renderPickupStageCard(t) : this.renderDropoffStageCard(t)}

      </div>
    `;
  },

  // 3. شاشة مسار الاستلام من التاجر (Pickup Route & Verification)
  renderPickupStageCard(t) {
    const isArrived = t.stage === 'arrived_pickup';

    return `
      <div style="background: #FFFFFF; border: 1.5px solid #0066FF; border-radius: 18px; padding: 18px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 4px 20px rgba(0,102,255,0.08);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #F1F5F9; padding-bottom: 10px;">
          <div>
            <span style="background: #EFF6FF; color: #0066FF; padding: 3px 10px; border-radius: 999px; font-size: 0.74rem; font-weight: 800;">
              المرحلة 1: التوجه والاستلام من التاجر 🏬
            </span>
            <h3 style="margin: 6px 0 0; font-size: 1.05rem; font-weight: 900; color: #0A2540;">
              ${t.pickup.name}
            </h3>
            <p style="margin: 2px 0 0; font-size: 0.78rem; color: #64748B;">
              المسؤول: <strong>${t.pickup.repName}</strong> · جوال: ${t.pickup.phone}
            </p>
          </div>

          <!-- زر الملاحة المباشرة Google Maps / Apple Maps -->
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=${t.pickup.lat},${t.pickup.lng}" 
            target="_blank"
            style="background: #0066FF; color: #FFFFFF; text-decoration: none; padding: 10px 14px; border-radius: 12px; font-weight: 800; font-size: 0.82rem; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(0,102,255,0.25);"
          >
            <span>🗺️ فتح الخرائط للملاحة</span>
          </a>
        </div>

        <!-- تعليمات الاستلام وتفاصيل الموقع -->
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 12px; font-size: 0.78rem; color: #334155; line-height: 1.45;">
          <strong style="color: #0A2540; display: block; margin-bottom: 4px;">📍 تفاصيل العنوان وموقع الرف:</strong>
          <div>${t.pickup.district}</div>
          <div style="color: #0066FF; margin-top: 4px;">💡 <strong>ملاحظة التاجر:</strong> ${t.pickup.instructions}</div>
        </div>

        <!-- زر الاتصال المشفر بالتاجر / مندوب المبيعات -->
        <div style="display: flex; gap: 8px;">
          <button 
            type="button" 
            onclick="KafuCourierPortal.simulateEncryptedCall('${t.pickup.repName}', '${t.pickup.phone}')"
            style="flex: 1; height: 42px; background: #F1F5F9; border: 1px solid #CBD5E1; border-radius: 10px; font-weight: 800; font-size: 0.82rem; color: #1E293B; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;"
          >
            <span>📞 اتصال مشفر بالتاجر (حماية الخصوصية)</span>
          </button>
        </div>

        <!-- شاشة استلام القطعة والتحقق Proof of Pickup -->
        <div style="background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 14px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 0.86rem; color: #166534;">
              🔐 إثبات الاستلام ومطابقة الشحنة (Proof of Pickup):
            </strong>
            <span style="font-size: 0.72rem; color: #15803D; font-weight: 800;">إلزامي قبل التحرك</span>
          </div>

          <p style="margin: 0; font-size: 0.76rem; color: #334155; line-height: 1.4;">
            سلم التاجر رمز التحقق السري أو أظهر له رمز QR لتأكيد تسليم القطعة لك، ثم قم بالتقاط صورة القطعة داخل صندوق السيارة:
          </p>

          <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1px solid #BBF7D0; border-radius: 10px; padding: 8px 12px;">
            <div>
              <span style="font-size: 0.70rem; color: #64748B;">رمز الاستلام السري للتاجر (PIN):</span>
              <strong style="display: block; font-size: 1.15rem; color: #0066FF; font-family: monospace; letter-spacing: 2px;">
                ${t.pickup.pickupSecretPin}
              </strong>
            </div>

            <button 
              type="button" 
              onclick="KafuCourierPortal.openQrModal('${t.id}', '${t.pickup.pickupSecretPin}')"
              style="background: #0A2540; color: #FFF; border: none; padding: 6px 12px; border-radius: 8px; font-size: 0.76rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 4px;"
            >
              <span>📷 إظهار QR Code</span>
            </button>
          </div>

          <!-- تصوير القطعة في صندوق السيارة إلزامي لمنع التلاعب -->
          <div style="background: #FFFFFF; border: 2px dashed ${t.pickupPhoto ? '#16A34A' : '#0066FF'}; border-radius: 12px; padding: 14px; text-align: center; cursor: pointer;" onclick="KafuCourierPortal.openCameraProofModal('pickup')">
            ${t.pickupPhoto ? `
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #15803D; font-weight: 800; font-size: 0.84rem;">
                <span>✅ تم تصوير وتوثيق القطعة في صندوق السيارة بنجاح</span>
              </div>
              <span style="font-size: 0.70rem; color: #64748B; display: block; margin-top: 3px;">اضغط لإعادة التقاط الصورة أو المعاينة</span>
            ` : `
              <div style="font-size: 1.6rem;">📸</div>
              <strong style="font-size: 0.84rem; color: #0066FF; display: block; margin-top: 2px;">
                إلزامي: تصوير القطعة وهي توضع في صندوق السيارة
              </strong>
              <span style="font-size: 0.70rem; color: #64748B;">
                توثيق فوري بعلامة مائية رقمية يثبت سلامة القطعة عند الاستلام ويحمي حقوقك
              </span>
            `}
          </div>

          <!-- زر تأكيد الاستلام وبدء رحلة التوصيل -->
          <button 
            type="button" 
            onclick="KafuCourierPortal.confirmPickupAndStartDelivery()"
            style="
              background: ${t.pickupPhoto ? '#16A34A' : '#CBD5E1'};
              color: ${t.pickupPhoto ? '#FFFFFF' : '#64748B'};
              border: none;
              padding: 12px;
              border-radius: 12px;
              font-weight: 900;
              font-size: 0.90rem;
              cursor: ${t.pickupPhoto ? 'pointer' : 'not-allowed'};
              box-shadow: ${t.pickupPhoto ? '0 4px 14px rgba(22,163,74,0.3)' : 'none'};
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              margin-top: 4px;
            "
          >
            <span>تم استلام الشحنة وبدء رحلة التوصيل للعميل 🚚</span>
          </button>
        </div>

      </div>
    `;
  },

  // 4. شاشة مسار التسليم للعميل (Delivery Route & Proof of Delivery - POD)
  renderDropoffStageCard(t) {
    return `
      <div style="background: #FFFFFF; border: 1.5px solid #16A34A; border-radius: 18px; padding: 18px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 4px 20px rgba(22,163,74,0.08);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #F1F5F9; padding-bottom: 10px;">
          <div>
            <span style="background: #DCFCE7; color: #15803D; padding: 3px 10px; border-radius: 999px; font-size: 0.74rem; font-weight: 800;">
              المرحلة 2: في الطريق للعميل / الورشة 🏁
            </span>
            <h3 style="margin: 6px 0 0; font-size: 1.05rem; font-weight: 900; color: #0A2540;">
              ${t.dropoff.name}
            </h3>
            <p style="margin: 2px 0 0; font-size: 0.78rem; color: #64748B;">
              المستلم: <strong>${t.dropoff.clientName}</strong> · جوال: ${t.dropoff.phone}
            </p>
          </div>

          <!-- زر الملاحة المباشرة نحو عنوان العميل -->
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=${t.dropoff.lat},${t.dropoff.lng}" 
            target="_blank"
            style="background: #16A34A; color: #FFFFFF; text-decoration: none; padding: 10px 14px; border-radius: 12px; font-weight: 800; font-size: 0.82rem; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(22,163,74,0.25);"
          >
            <span>🗺️ ملاحة لموقع العميل</span>
          </a>
        </div>

        <!-- زر إرسال إشعار تلقائي للعميل عبر التطبيق / SMS -->
        <div style="background: #FEF3C7; border: 1.5px solid #FDE68A; border-radius: 12px; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
          <div style="font-size: 0.76rem; color: #92400E;">
            📲 <strong>إشعار العميل التلقائي:</strong> "مندوب كفو في طريقه إليك، يرجى الاستعداد لاستلام القطعة خلال ${t.dropoff.etaToDropoff}."
          </div>
          <button 
            type="button" 
            onclick="KafuCourierPortal.notifyCustomerArrival('${t.dropoff.clientName}')"
            style="background: #D97706; color: #FFF; border: none; padding: 6px 12px; border-radius: 8px; font-size: 0.74rem; font-weight: 800; cursor: pointer; white-space: nowrap;"
          >
            إرسال إشعار للعميل ⚡
          </button>
        </div>

        <!-- زر الاتصال المشفر بالعميل / الورشة -->
        <button 
          type="button" 
          onclick="KafuCourierPortal.simulateEncryptedCall('${t.dropoff.clientName}', '${t.dropoff.phone}')"
          style="height: 42px; background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 10px; font-weight: 800; font-size: 0.82rem; color: #1E293B; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;"
        >
          <span>📞 اتصال مشفر بالعميل (بدون كشف رقمك)</span>
        </button>

        <!-- إثبات التسليم النهائي وإغلاق الطلب (Proof of Delivery - POD) -->
        <div style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: 14px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 0.88rem; color: #0A2540;">
              📋 إثبات التسليم وإغلاق الطلب (Proof of Delivery - POD):
            </strong>
            <span style="font-size: 0.70rem; color: #15803D; font-weight: 800; background: #DCFCE7; padding: 2px 6px; border-radius: 4px;">فك التعليق الفوري</span>
          </div>

          <p style="margin: 0; font-size: 0.76rem; color: #64748B; line-height: 1.4;">
            قم بتصوير القطعة عند باب العميل أو داخل الورشة، واطلب من العميل إعطاؤك رمز التحقق السري (OTP) المكون من 4 أرقام:
          </p>

          <!-- تصوير القطعة بموقع التسليم -->
          <div style="background: #FFFFFF; border: 2px dashed ${t.deliveryPhoto ? '#16A34A' : '#0066FF'}; border-radius: 12px; padding: 12px; text-align: center; cursor: pointer;" onclick="KafuCourierPortal.openCameraProofModal('delivery')">
            ${t.deliveryPhoto ? `
              <div style="color: #15803D; font-weight: 800; font-size: 0.82rem;">
                ✅ تم التقاط صورة التسليم في موقع العميل (POD)
              </div>
            ` : `
              <div style="font-size: 1.4rem;">📷</div>
              <strong style="font-size: 0.82rem; color: #0066FF; display: block; margin-top: 2px;">
                التقاط صورة القطعة بموقع التسليم / فاتورة الورشة
              </strong>
            `}
          </div>

          <!-- إدخال رمز التحقق النهائي OTP من العميل -->
          <div style="display: flex; gap: 10px; align-items: center; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 10px; padding: 8px 12px;">
            <label style="font-size: 0.78rem; font-weight: 800; color: #334155; white-space: nowrap;">رمز OTP المستلم من العميل:</label>
            <input 
              type="text" 
              id="customerDeliveryOtpInput" 
              placeholder="مثال: 6139" 
              maxlength="4"
              value="${t.dropoff.deliveryOtp}"
              style="width: 100px; height: 38px; text-align: center; font-size: 1.1rem; font-family: monospace; font-weight: 900; border: 1.5px solid #0066FF; border-radius: 8px; color: #0066FF; letter-spacing: 2px;"
            />
            <span style="font-size: 0.70rem; color: #64748B;">(وصل لجوال العميل عبر SMS)</span>
          </div>

          <!-- زر تأكيد التسليم النهائي -->
          <button 
            type="button" 
            onclick="KafuCourierPortal.finalizeDelivery()"
            style="
              background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
              color: #FFFFFF;
              border: none;
              padding: 14px;
              border-radius: 12px;
              font-weight: 900;
              font-size: 0.94rem;
              cursor: pointer;
              box-shadow: 0 4px 16px rgba(22,163,74,0.35);
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              margin-top: 4px;
            "
          >
            <span>تأكيد التسليم النهائي وإغلاق الطلب وتحويل الأرباح ✓</span>
          </button>

        </div>

      </div>
    `;
  },

  confirmPickupAndStartDelivery() {
    if (!this.activeTrip) return;
    if (!this.activeTrip.pickupPhoto) {
      this.openCameraProofModal('pickup');
      return;
    }

    this.activeTrip.stage = 'heading_to_dropoff';
    this.saveState();

    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast('تم تأكيد الاستلام بنجاح! تم إشعار العميل والتاجر، وبدأت رحلة التسليم.');
    }

    this.renderMainContent();
  },

  finalizeDelivery() {
    if (!this.activeTrip) return;
    const t = this.activeTrip;

    // التحقق من رمز OTP
    const otpInput = document.getElementById('customerDeliveryOtpInput');
    const enteredOtp = otpInput ? otpInput.value.trim() : t.dropoff.deliveryOtp;

    if (!enteredOtp || enteredOtp.length < 4) {
      alert('يرجى إدخال رمز التحقق OTP المكون من 4 أرقام المستلم من العميل.');
      return;
    }

    // 1. تحديث الأرباح وتحويل المستحقات
    this.driverData.walletBalance += t.earningNet;
    this.driverData.todayEarnings += t.earningNet;
    this.driverData.weekEarnings += t.earningNet;
    this.driverData.todayTrips += 1;
    this.driverData.totalTrips += 1;

    // 2. أرشفة الشحنة في السجل
    const completedItem = {
      id: t.id,
      orderId: t.orderId,
      date: 'اليوم · ' + new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      cargoName: t.cargoName,
      pickupName: t.pickup.name,
      dropoffName: t.dropoff.name,
      earningNet: t.earningNet,
      status: 'delivered',
      podPhotoUrl: t.deliveryPhoto || 'assets/img/pod-sample-1.jpg',
      podSignedBy: t.dropoff.clientName,
      verifiedOtp: enteredOtp
    };

    this.completedDeliveries.unshift(completedItem);
    this.activeTrip = null;
    this.saveState();

    // 3. عرض شاشة النجاح والاحتفال
    this.openDeliverySuccessModal(completedItem);
  },

  openDeliverySuccessModal(item) {
    const modalHtml = `
      <div id="deliverySuccessModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.75); backdrop-filter: blur(8px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 24px; width: 100%; max-width: 440px; padding: 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); border: 2px solid #86EFAC;">
          
          <div style="width: 72px; height: 72px; border-radius: 50%; background: #DCFCE7; color: #16A34A; display: flex; align-items: center; justify-content: center; font-size: 2.2rem;">
            🎉
          </div>

          <div>
            <h2 style="margin: 0; font-size: 1.25rem; font-weight: 900; color: #0A2540;">تم تسليم الشحنة بنجاح!</h2>
            <p style="margin: 4px 0 0; font-size: 0.82rem; color: #64748B;">
              تم فك تعليق المبالغ وتحويل أرباحك لمحفظتك فورياً
            </p>
          </div>

          <!-- بطاقة الربح الصافي المودع -->
          <div style="width: 100%; background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 16px; padding: 14px;">
            <div style="font-size: 0.76rem; color: #166534; font-weight: 700;">المبلغ الصافي المودع في محفظتك:</div>
            <div style="font-size: 1.8rem; font-weight: 900; color: #15803D; margin: 4px 0;">
              +${item.earningNet.toFixed(2)} <span style="font-size: 0.9rem;">ر.س</span>
            </div>
            <div style="font-size: 0.72rem; color: #166534;">
              رصيد محفظتك الحالي: <strong>${this.driverData.walletBalance.toFixed(2)} ر.س</strong>
            </div>
          </div>

          <div style="width: 100%; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px; font-size: 0.74rem; color: #475569; text-align: right; line-height: 1.4;">
            <div><strong>رقم الشحنة:</strong> ${item.id}</div>
            <div><strong>المستلم:</strong> ${item.podSignedBy}</div>
            <div><strong>رمز OTP المعتمد:</strong> ${item.verifiedOtp} ✓</div>
          </div>

          <div style="display: flex; gap: 8px; width: 100%; margin-top: 4px;">
            <button 
              type="button" 
              onclick="
                document.getElementById('deliverySuccessModal').remove();
                KafuCourierPortal.switchTab('available');
              "
              style="flex: 1; height: 44px; background: #0066FF; color: #FFFFFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.88rem; cursor: pointer;"
            >
              استقبال شحنة جديدة 🚀
            </button>
            <button 
              type="button" 
              onclick="
                document.getElementById('deliverySuccessModal').remove();
                KafuCourierPortal.switchTab('wallet');
              "
              style="flex: 0.6; height: 44px; background: #F1F5F9; color: #334155; border: 1px solid #CBD5E1; border-radius: 12px; font-weight: 800; font-size: 0.84rem; cursor: pointer;"
            >
              فتح المحفظة 💰
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // ---------------------------------------------------------------------------
  // 5. شاشة سجل التوصيل والتوثيق البصري (History & POD)
  // ---------------------------------------------------------------------------
  renderHistoryView() {
    return `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="font-size: 0.94rem; color: #0A2540; display: flex; align-items: center; gap: 6px;">
              <span>📋</span>
              <span>سجل التوصيل وإثباتات التسليم (POD):</span>
            </strong>
            <span style="font-size: 0.72rem; color: #64748B;">توثيق بصري كامل لكل شحنة تم إغلاقها بنجاح</span>
          </div>

          <span style="background: #DCFCE7; color: #15803D; padding: 4px 10px; border-radius: 999px; font-size: 0.74rem; font-weight: 800;">
            ${this.completedDeliveries.length} شحنات مكتملة
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${this.completedDeliveries.map(d => `
            <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 14px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-family: monospace; font-weight: 900; color: #0066FF; font-size: 0.84rem;">${d.id}</span>
                  <span style="font-size: 0.70rem; color: #64748B;">${d.date}</span>
                </div>
                <strong style="color: #16A34A; font-size: 0.92rem;">+${d.earningNet.toFixed(2)} ر.س</strong>
              </div>

              <div style="font-size: 0.85rem; font-weight: 800; color: #0F172A;">
                ${d.cargoName}
              </div>

              <div style="font-size: 0.74rem; color: #475569; display: flex; flex-direction: column; gap: 2px;">
                <div>🏬 <strong>من:</strong> ${d.pickupName}</div>
                <div>🏁 <strong>إلى:</strong> ${d.dropoffName}</div>
              </div>

              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 6px 10px; display: flex; align-items: center; justify-content: space-between; font-size: 0.72rem;">
                <span style="color: #15803D; font-weight: 700;">✓ موثقة بالصور ورمز OTP [${d.verifiedOtp}]</span>
                <span style="color: #64748B;">المستلم: <strong>${d.podSignedBy}</strong></span>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  },

  // ---------------------------------------------------------------------------
  // 6. شاشة المحفظة والأرباح اليومية للمندوب (Driver Wallet & Earnings)
  // ---------------------------------------------------------------------------
  renderWalletView() {
    return `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        
        <!-- كارت الرصيد الرئيسي والأرباح الصافية -->
        <div style="background: linear-gradient(135deg, #0A2540 0%, #0044CC 100%); color: #FFFFFF; border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 10px 25px rgba(0,68,204,0.25);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.78rem; color: #93C5FD; font-weight: 700;">الرصيد المتاح للسحب الفوري</span>
            <span style="background: rgba(255,255,255,0.18); font-size: 0.70rem; padding: 3px 8px; border-radius: 6px; font-weight: 800;">
              حساب موثق ✓
            </span>
          </div>

          <div style="display: flex; align-items: baseline; gap: 6px;">
            <span style="font-size: 2.2rem; font-weight: 900; font-family: 'IBM Plex Sans Arabic', sans-serif;">
              ${this.driverData.walletBalance.toFixed(2)}
            </span>
            <span style="font-size: 1rem; color: #93C5FD;">ريال سعودي</span>
          </div>

          <!-- شبكة إحصائيات الأرباح اليومية والأسبوعية -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: rgba(255,255,255,0.1); border-radius: 14px; padding: 10px 14px;">
            <div>
              <div style="font-size: 0.70rem; color: #BAE6FD;">أرباح مشاوير اليوم:</div>
              <strong style="font-size: 1.1rem; color: #86EFAC;">${this.driverData.todayEarnings.toFixed(2)} ر.س</strong>
              <div style="font-size: 0.65rem; color: #BAE6FD;">(${this.driverData.todayTrips} توصيلات منجزة)</div>
            </div>
            <div>
              <div style="font-size: 0.70rem; color: #BAE6FD;">أرباح الأسبوع الحالي:</div>
              <strong style="font-size: 1.1rem; color: #FFFFFF;">${this.driverData.weekEarnings.toFixed(2)} ر.س</strong>
              <div style="font-size: 0.65rem; color: #BAE6FD;">(معدل إنجاز 98%)</div>
            </div>
          </div>

          <!-- زر سحب الأرباح الفوري للآيبان البنكي -->
          <button 
            type="button" 
            onclick="KafuCourierPortal.openWithdrawModal()"
            style="background: #16A34A; color: #FFFFFF; border: none; padding: 12px; border-radius: 12px; font-weight: 900; font-size: 0.90rem; cursor: pointer; box-shadow: 0 4px 14px rgba(22,163,74,0.35); display: flex; align-items: center; justify-content: center; gap: 8px;"
          >
            <span>🏦 تحويل الأرباح لحسابي البنكي (سريع)</span>
          </button>
        </div>

        <!-- تفاصيل الحساب البنكي المعتمد -->
        <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 14px; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 0.82rem; color: #0A2540;">الحساب البنكي المعتمد للتحويلات:</strong>
            <span style="font-size: 0.70rem; color: #0066FF; font-weight: 800;">سريع فوري 24/7</span>
          </div>
          <div style="font-size: 0.80rem; color: #334155;">
            <strong>${this.driverData.bankName}</strong>
          </div>
          <div style="font-size: 0.74rem; font-family: monospace; color: #64748B;">
            ${this.driverData.iban}
          </div>
        </div>

        <!-- سجل الحوالات البنكية المنفذة -->
        <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
          <strong style="font-size: 0.85rem; color: #0A2540;">سجل الحوالات البنكية المحولة لحسابك:</strong>
          
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${this.bankTransfers.map(t => `
              <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 10px;">
                <div>
                  <div style="font-size: 0.80rem; font-weight: 800; color: #0F172A;">حوالة سريعة ${t.refNum}</div>
                  <div style="font-size: 0.70rem; color: #64748B;">${t.date}</div>
                </div>
                <div style="text-align: left;">
                  <strong style="font-size: 0.90rem; color: #16A34A;">${t.amount.toFixed(2)} ر.س</strong>
                  <div style="font-size: 0.65rem; color: #15803D; font-weight: 800;">تم الإيداع بنجاح ✓</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  },

  // ---------------------------------------------------------------------------
  // النوافذ المنبثقة التفاعلية (Modals)
  // ---------------------------------------------------------------------------
  
  // 1. شاشة تسجيل الدخول والتحقق برقم الجوال وOTP
  openAuthModal() {
    const modalHtml = `
      <div id="driverAuthModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.7); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 22px; width: 100%; max-width: 440px; padding: 22px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); border: 1.5px solid #E2E8F0;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F5F9; padding-bottom: 8px;">
            <div>
              <h3 style="margin: 0; font-size: 1.10rem; font-weight: 900; color: #0A2540;">تسجيل دخول وتحقق المندوب 📱</h3>
              <p style="margin: 2px 0 0; font-size: 0.74rem; color: #64748B;">التحقق السريع برقم الجوال ورمز OTP</p>
            </div>
            <button type="button" onclick="document.getElementById('driverAuthModal').remove()" style="border: none; background: #F1F5F9; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; color: #64748B; font-weight: 800;">✕</button>
          </div>

          <form onsubmit="event.preventDefault(); KafuCourierPortal.verifyDriverPhone();" style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">رقم الجوال السعودي المعتمد:</label>
              <div style="display: flex; direction: ltr; gap: 6px;">
                <span style="background: #F1F5F9; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 0 12px; display: flex; align-items: center; font-weight: 800; font-size: 0.85rem; color: #334155;">+966</span>
                <input type="tel" id="driverPhoneInput" value="551234567" required style="flex: 1; height: 44px; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 0 12px; font-family: monospace; font-size: 0.95rem; font-weight: 700;" />
              </div>
            </div>

            <div id="otpSection" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 6px;">
              <label style="font-size: 0.76rem; font-weight: 700; color: #334155;">رمز التحقق (OTP):</label>
              <input type="text" id="driverOtpInput" placeholder="أدخل 4521" value="4521" maxlength="4" style="height: 42px; text-align: center; font-size: 1.2rem; font-family: monospace; font-weight: 900; letter-spacing: 4px; border: 1.5px solid #0066FF; border-radius: 8px; color: #0066FF;" />
              <span style="font-size: 0.68rem; color: #16A34A; text-align: center;">✓ تم إرسال الرمز تلقائياً (4521)</span>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 4px;">
              <button type="submit" style="flex: 1; height: 44px; background: #0066FF; color: #FFFFFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.90rem; cursor: pointer;">
                تأكيد الدخول وتحديث الحالة ✓
              </button>
              <button type="button" onclick="document.getElementById('driverAuthModal').remove()" style="flex: 0.4; height: 44px; background: #F1F5F9; color: #475569; border: none; border-radius: 12px; font-weight: 700; font-size: 0.84rem; cursor: pointer;">
                إلغاء
              </button>
            </div>
          </form>

        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  verifyDriverPhone() {
    const modal = document.getElementById('driverAuthModal');
    if (modal) modal.remove();
    this.isOnline = true;
    this.saveState();
    this.renderHeader();
    this.renderMainContent();
    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast('تم التحقق بنجاح! كابتن أحمد القحطاني متصل وجاهز للاستلام.');
    }
  },

  toggleOnlineStatus() {
    this.isOnline = !this.isOnline;
    this.saveState();
    this.renderHeader();
    this.renderMainContent();
    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast(this.isOnline ? 'أنت الآن متاح للعمل! جاري استقبال الشحنات ⚡' : 'أنت الآن غير متاح (Offline)');
    }
  },

  // 2. نافذة الكاميرا والتوثيق البصري للقطعة (صندوق السيارة / موقع التسليم)
  openCameraProofModal(type) {
    const isPickup = type === 'pickup';
    const title = isPickup ? 'تصوير القطعة داخل صندوق السيارة 📸' : 'تصوير القطعة في موقع التسليم (POD) 📷';
    const sub = isPickup ? 'إلزامي: تأكيد سلامة القطعة عند الاستلام من التشليح' : 'إلزامي: إثبات التسليم للعميل أو الورشة بدون كسر';

    const modalHtml = `
      <div id="cameraProofModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.85); backdrop-filter: blur(8px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 22px; width: 100%; max-width: 460px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);">
          
          <div style="padding: 16px 20px; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 900; color: #0A2540;">${title}</h3>
              <p style="margin: 2px 0 0; font-size: 0.74rem; color: #64748B;">${sub}</p>
            </div>
            <button type="button" onclick="document.getElementById('cameraProofModal').remove()" style="border: none; background: #F1F5F9; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; color: #64748B; font-weight: 800;">✕</button>
          </div>

          <!-- شاشة الكاميرا المحاكية مع العلامة المائية الرقمية -->
          <div style="position: relative; width: 100%; height: 260px; background: #0F172A; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            
            <div style="text-align: center; color: #94A3B8;">
              <div style="font-size: 3rem;">📦</div>
              <div style="font-size: 0.82rem; margin-top: 4px; color: #E2E8F0;">عدسة الكاميرا نشطة</div>
              <div style="font-size: 0.70rem; color: #64748B;">قم بتوجيه العدسة نحو القطعة</div>
            </div>

            <!-- شبكة التوجيه (Focus Grid) -->
            <div style="position: absolute; inset: 20px; border: 2px dashed rgba(255,255,255,0.4); border-radius: 14px; pointer-events: none;"></div>

            <!-- العلامة المائية الرقمية لمنع التلاعب -->
            <div style="position: absolute; bottom: 10px; right: 12px; left: 12px; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); color: #FFFFFF; padding: 6px 10px; border-radius: 8px; font-size: 0.68rem; display: flex; justify-content: space-between; align-items: center;">
              <span>🛡️ توثيق كفو الرسمي: <strong>${isPickup ? 'استلام الصندوق' : 'تسليم العميل (POD)'}</strong></span>
              <span style="font-family: monospace;">${new Date().toLocaleTimeString('ar-SA')}</span>
            </div>

          </div>

          <div style="padding: 16px 20px; display: flex; flex-direction: column; gap: 10px;">
            <p style="margin: 0; font-size: 0.74rem; color: #475569; line-height: 1.4;">
              تحمي هذه الصورة المندوب والتاجر من ادعاءات الكسر المسبق وتؤكد مطابقة القطعة قبل التحرك.
            </p>

            <button 
              type="button" 
              onclick="KafuCourierPortal.captureProofPhoto('${type}')"
              style="width: 100%; height: 46px; background: #16A34A; color: #FFFFFF; border: none; border-radius: 12px; font-weight: 900; font-size: 0.92rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(22,163,74,0.3);"
            >
              <span>التقاط وتوثيق الصورة فورياً 📸</span>
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  captureProofPhoto(type) {
    if (this.activeTrip) {
      if (type === 'pickup') {
        this.activeTrip.pickupPhoto = 'captured_pickup_verified';
      } else {
        this.activeTrip.deliveryPhoto = 'captured_delivery_verified';
      }
      this.saveState();
    }

    const modal = document.getElementById('cameraProofModal');
    if (modal) modal.remove();

    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast('تم التقاط الصورة وتطبيق العلامة المائية الرقمية بنجاح ✓');
    }

    this.renderMainContent();
  },

  // 3. نافذة إظهار رمز QR للتاجر
  openQrModal(shipmentId, pin) {
    const modalHtml = `
      <div id="courierQrModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.7); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 22px; width: 100%; max-width: 380px; padding: 22px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);">
          
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; border-bottom: 1px solid #F1F5F9; padding-bottom: 8px;">
            <strong style="font-size: 0.95rem; color: #0A2540;">رمز استلام الشحنة [${shipmentId}]</strong>
            <button type="button" onclick="document.getElementById('courierQrModal').remove()" style="border: none; background: #F1F5F9; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; color: #64748B;">✕</button>
          </div>

          <div style="background: #F8FAFC; border: 2px solid #0066FF; border-radius: 16px; padding: 20px; display: inline-block;">
            <!-- رسم QR Code تفاعلي -->
            <svg width="160" height="160" viewBox="0 0 100 100">
              <rect width="100" height="100" fill="#FFFFFF"/>
              <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" fill="#0A2540"/>
              <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" fill="#0A2540"/>
              <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" fill="#0A2540"/>
              <rect x="50" y="50" width="10" height="10" fill="#0066FF"/>
              <rect x="70" y="50" width="10" height="10" fill="#0066FF"/>
              <rect x="50" y="70" width="10" height="10" fill="#0066FF"/>
              <rect x="70" y="70" width="20" height="20" fill="#0066FF"/>
            </svg>
          </div>

          <div>
            <span style="font-size: 0.74rem; color: #64748B;">أو أملِ التاجر رمز PIN السري:</span>
            <div style="font-size: 1.6rem; font-weight: 900; color: #0066FF; font-family: monospace; letter-spacing: 4px; margin-top: 2px;">
              ${pin}
            </div>
          </div>

          <button type="button" onclick="document.getElementById('courierQrModal').remove()" style="width: 100%; height: 40px; background: #0A2540; color: #FFF; border: none; border-radius: 10px; font-weight: 800; font-size: 0.84rem; cursor: pointer;">
            إغلاق
          </button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // 4. نافذة سحب الأرباح الفوري للآيبان البنكي
  openWithdrawModal() {
    const max = this.driverData.walletBalance;
    const modalHtml = `
      <div id="withdrawModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.7); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 22px; width: 100%; max-width: 420px; padding: 22px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); border: 1.5px solid #E2E8F0;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F5F9; padding-bottom: 8px;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 900; color: #0A2540;">سحب الأرباح لحسابك البنكي 🏦</h3>
              <p style="margin: 2px 0 0; font-size: 0.74rem; color: #64748B;">تحويل فوري عبر نظام سريع للمدفوعات</p>
            </div>
            <button type="button" onclick="document.getElementById('withdrawModal').remove()" style="border: none; background: #F1F5F9; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; color: #64748B;">✕</button>
          </div>

          <form onsubmit="event.preventDefault(); KafuCourierPortal.confirmWithdraw();" style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">المبلغ المراد سحبه (ر.س):</label>
              <input type="number" id="withdrawAmountInput" min="50" max="${max}" value="${max}" step="10" required style="width: 100%; height: 44px; border: 1.5px solid #0066FF; border-radius: 10px; padding: 0 12px; font-size: 1.15rem; font-weight: 900; color: #0066FF;" />
              <div style="font-size: 0.70rem; color: #64748B; margin-top: 3px;">الحد الأقصى المتاح حالياً: <strong>${max.toFixed(2)} ر.س</strong></div>
            </div>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 10px; font-size: 0.74rem; color: #475569;">
              <div><strong>البنك المستلم:</strong> ${this.driverData.bankName}</div>
              <div style="font-family: monospace; color: #0A2540; margin-top: 2px;">${this.driverData.iban}</div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 4px;">
              <button type="submit" style="flex: 1; height: 44px; background: #16A34A; color: #FFFFFF; border: none; border-radius: 12px; font-weight: 900; font-size: 0.90rem; cursor: pointer;">
                تأكيد التحويل البنكي الفوري ⚡
              </button>
              <button type="button" onclick="document.getElementById('withdrawModal').remove()" style="flex: 0.4; height: 44px; background: #F1F5F9; color: #475569; border: none; border-radius: 12px; font-weight: 700; font-size: 0.84rem; cursor: pointer;">
                إلغاء
              </button>
            </div>
          </form>

        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  confirmWithdraw() {
    const input = document.getElementById('withdrawAmountInput');
    const amount = input ? parseFloat(input.value) : this.driverData.walletBalance;

    if (!amount || amount <= 0 || amount > this.driverData.walletBalance) {
      alert('يرجى إدخال مبلغ صحيح ضمن الرصيد المتاح.');
      return;
    }

    this.driverData.walletBalance -= amount;
    const newTx = {
      id: 'TRX-' + Math.floor(10000 + Math.random() * 90000),
      date: 'اليوم · ' + new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      amount: amount,
      status: 'completed',
      bankName: 'البنك الأهلي السعودي (سريع)',
      refNum: 'SARIE-' + Math.floor(10000000 + Math.random() * 90000000)
    };
    this.bankTransfers.unshift(newTx);
    this.saveState();

    const modal = document.getElementById('withdrawModal');
    if (modal) modal.remove();

    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast(`تم تحويل ${amount.toFixed(2)} ر.س بنجاح إلى آيبانك البنكي عبر سريع!`);
    }

    this.renderMainContent();
  },

  // محاكاة الاتصال المشفر بحماية الخصوصية
  simulateEncryptedCall(contactName, contactPhone) {
    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast(`جاري الاتصال المشفر بـ [${contactName}] عبر رقم موحد محمي...`);
    } else {
      alert(`جاري الاتصال المشفر بـ [${contactName}] عبر رقم كفو الموحد (011-XXXX-XXX) لحماية خصوصية رقم هاتفك.`);
    }
  },

  // إشعار العميل بالوصول
  notifyCustomerArrival(clientName) {
    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast(`تم إرسال إشعار فوري وتنبيه SMS للعميل [${clientName}] بنجاح ✓`);
    }
  },

  // محاكاة الرادار التنازلي للطلبات
  startRadarSimulation() {
    // تحديث تنازلي للثواني كل ثانية للشحنات المتاحة
    setInterval(() => {
      if (this.isOnline && this.availableShipments.length > 0) {
        this.availableShipments.forEach(s => {
          if (s.expiresInSeconds > 1) {
            s.expiresInSeconds -= 1;
          } else {
            s.expiresInSeconds = 60; // إعادة دورة التوزيع
          }
        });
      }
    }, 1000);
  }
};

window.KafuCourierPortal = KafuCourierPortal;
