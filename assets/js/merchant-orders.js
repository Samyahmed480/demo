/**
 * كفو (Kafu) - نظام إدارة طلبات العملاء الموسّع للتجار (Merchant Orders Management System)
 * يتضمن:
 * 1. دورة حياة الطلبات (وارد، قيد المراجعة، انتظار، مؤكد، مع المندوب، مُسلّم، مرفوض)
 * 2. بيانات المندوب الكاملة (الاسم، الجوال، المركبة، وقت الوصول ETA، كود التحقق OTP، التقييم)
 * 3. إجراءات التاجر الموسعة: تأكيد، وضع في الانتظار، مراجعة، رفض، تسليم للمندوب
 * 4. التبويبات والفلاتر والبحث الحي مع الحفظ التلقائي في LocalStorage
 */

const KafuMerchantOrders = {
  STORAGE_KEY: 'kafu_merchant_orders',
  activeTab: 'all',
  searchQuery: '',

  // قائمة الطلبات الافتراضية الأولية الغنية
  defaultOrders: [
    {
      id: 'ORD-8921',
      date: 'اليوم، 10:45 ص',
      customer: {
        name: 'عبدالله السبيعي',
        phone: '0554128930',
        phoneMasked: '055****128',
        city: 'الرياض',
        district: 'حي الصحافة',
        address: 'شارع العليا العام، فيلا 14'
      },
      car: {
        make: 'تويوتا',
        model: 'كامري',
        year: '2023',
        vin: '4T1B11HK5SU89201',
        displayName: 'تويوتا كامري 2023'
      },
      part: {
        name: 'فحمات / قماشات الفرامل الأمامية (Brake Pad)',
        oem: '04465-33480',
        category: 'نظام الفرامل',
        condition: 'أصلي وكالة (Genuine OEM)',
        warranty: 'ضمان كفو 6 أشهر ضد عيوب التصنيع',
        quantity: 1,
        unitPrice: 169.57,
        tax: 25.43,
        total: 195
      },
      status: 'incoming', // incoming | review | on_hold | confirmed | with_courier | delivered | rejected
      statusLabel: 'طلب وارد جديد',
      notes: 'العميل يرغب بالتسليم السريع قبل الساعة 2 ظهراً',
      courier: null,
      timeline: [
        { time: '10:45 ص', text: 'تم إنشاء الطلب وسداد القيمة عبر تطبيق كفو' },
        { time: '10:46 ص', text: 'تم إرسال الطلب لمتجرك بانتظار التأكيد والتجهيز' }
      ]
    },
    {
      id: 'ORD-8918',
      date: 'اليوم، 09:30 ص',
      customer: {
        name: 'سالم الشمري',
        phone: '0508451122',
        phoneMasked: '050****845',
        city: 'الرياض',
        district: 'حي السليمانية',
        address: 'شارع الملك عبدالعزيز، مبنى 20'
      },
      car: {
        make: 'تويوتا',
        model: 'كامري',
        year: '2022',
        vin: '4T1B11HK2NU10928',
        displayName: 'تويوتا كامري 2022'
      },
      part: {
        name: 'طقم مكبس محرك كامل (Complete Engine Piston Set)',
        oem: 'OP010-13101',
        category: 'المحرك وملحقاته',
        condition: 'أصلي وكالة معتمد',
        warranty: 'ضمان سنة كاملة ضد عيوب التصنيع',
        quantity: 1,
        unitPrice: 417.39,
        tax: 62.61,
        total: 480
      },
      status: 'review',
      statusLabel: 'قيد المراجعة',
      reviewNote: 'جاري مطابقة مقاس السلندر وستاندر المكبس (Standard Size) مع كتالوج الوكالة',
      notes: 'طلب فحص إضافي لرقم الهيكل من قبل الورشة',
      courier: null,
      timeline: [
        { time: '09:30 ص', text: 'تم استلام الطلب من العميل' },
        { time: '09:40 ص', text: 'تم تحويل الطلب لحالة المراجعة لتدقيق المقاسات الفنية' }
      ]
    },
    {
      id: 'ORD-8930',
      date: 'اليوم، 08:15 ص',
      customer: {
        name: 'م. خالد القحطاني',
        phone: '0561239988',
        phoneMasked: '056****988',
        city: 'الرياض',
        district: 'الصناعية القديمة',
        address: 'ورشة العزم الحديثة لصيانة السيارات، ورشة رقم 12'
      },
      car: {
        make: 'هيونداي',
        model: 'سوناتا',
        year: '2021',
        vin: 'KMHD84LF5MA19028',
        displayName: 'هيونداي سوناتا 2021'
      },
      part: {
        name: 'طلمبة بنزين كاملة أصلية مع الفلتر (Fuel Pump Module)',
        oem: '31110-C1000',
        category: 'نظام الوقود',
        condition: 'أصلي وكالة',
        warranty: 'ضمان 6 أشهر',
        quantity: 1,
        unitPrice: 539.13,
        tax: 80.87,
        total: 620
      },
      status: 'on_hold',
      statusLabel: 'قيد الانتظار',
      holdReason: 'في انتظار وصول شحنة التوريد من المستودع المركزي بالسلي (متوقع 1:30 م)',
      courier: null,
      timeline: [
        { time: '08:15 ص', text: 'استلام طلب فوري من ورشة معتمدة' },
        { time: '08:35 ص', text: 'تم وضعه في الانتظار لتوريد القطعة من المستودع الفرعي' }
      ]
    },
    {
      id: 'ORD-8915',
      date: 'اليوم، 07:50 ص',
      customer: {
        name: 'سعد الغامدي',
        phone: '0547788112',
        phoneMasked: '054****112',
        city: 'الرياض',
        district: 'حي الملقا',
        address: 'شارع وادي حنيفة، فيلا 8'
      },
      car: {
        make: 'مازدا',
        model: 'مازدا 6',
        year: '2020',
        vin: 'JM1GL1U54L130982',
        displayName: 'مازدا 6 موديل 2020'
      },
      part: {
        name: 'مساعدات هيدروليك أمامية طقم (حبتين)',
        oem: 'GHP9-34-700',
        category: 'المساعدات والتعليق',
        condition: 'ياباني درجة أولى معتمد',
        warranty: 'ضمان سنة ضد التسريب والعيوب',
        quantity: 1,
        unitPrice: 652.17,
        tax: 97.83,
        total: 750
      },
      status: 'confirmed',
      statusLabel: 'مؤكد وبانتظار استلام المندوب',
      notes: 'تم تغليف القطعة بالكرتون المقوى ووضع ملصق كفو الذكي',
      courier: {
        name: 'الكابتن فهد الدوسري',
        phone: '0539871234',
        vehicle: 'تويوتا يارس 2023 - أ ب د 4821 (أبيض)',
        rating: '4.9 ★ (1,420 رحلة)',
        eta: 'خلال 12 دقيقة',
        pickupOtp: '4920',
        courierStatus: 'في الطريق إلى مستودعك للاستلام',
        statusColor: '#0284C7',
        avatarBg: '#E0F2FE'
      },
      timeline: [
        { time: '07:50 ص', text: 'إنشاء الطلب من العميل' },
        { time: '08:10 ص', text: 'تأكيد التجهيز وتغليف الشحنة من المتجر' },
        { time: '08:14 ص', text: 'قبل الكابتن فهد الدوسري استلام الشحنة وهو في الطريق للمتجر' }
      ]
    },
    {
      id: 'ORD-8902',
      date: 'اليوم، 07:10 ص',
      customer: {
        name: 'إبراهيم بن عبدالعزيز',
        phone: '0591234455',
        phoneMasked: '059****455',
        city: 'الرياض',
        district: 'حي الروضة',
        address: 'شارع الحسن بن علي، عمارة الأمل 5'
      },
      car: {
        make: 'نيسان',
        model: 'باترول',
        year: '2021',
        vin: 'JN8AY2NY8M920194',
        displayName: 'نيسان باترول 2021'
      },
      part: {
        name: 'شمعة إضاءة ليد أمامية يمين أصلية كاملة',
        oem: '26010-6GM0A',
        category: 'الإنارة والكهرباء',
        condition: 'أصلي وكالة (Genuine Nissan)',
        warranty: 'ضمان 6 أشهر شامل برمجة الكمبيوتر',
        quantity: 1,
        unitPrice: 1608.70,
        tax: 241.30,
        total: 1850
      },
      status: 'with_courier',
      statusLabel: 'جاري التوصيل مع المندوب',
      notes: 'تم فحص الشمعة والتأكد من سلامة العدسات والفيش',
      courier: {
        name: 'الكابتن راكان المطيري',
        phone: '0557654321',
        vehicle: 'هيونداي إلنترا 2022 - ر س ت 9912 (فضي)',
        rating: '4.95 ★ (2,100 رحلة)',
        eta: 'متوقع الوصول للعميل 11:30 ص',
        pickupOtp: '8143',
        courierStatus: 'استلم الشحنة من المستودع وجاري التوصيل للعميل',
        statusColor: '#16A34A',
        avatarBg: '#DCFCE7'
      },
      timeline: [
        { time: '07:10 ص', text: 'تم استلام الطلب' },
        { time: '07:30 ص', text: 'تم تأكيد التجهيز' },
        { time: '08:00 ص', text: 'وصل الكابتن راكان للمستودع واستلم الشحنة بنجاح بالكود #8143' },
        { time: '08:05 ص', text: 'الكابتن في طريقه لموقع العميل بحي الروضة' }
      ]
    },
    {
      id: 'ORD-8889',
      date: 'أمس، 04:30 م',
      customer: {
        name: 'فهد العنزي',
        phone: '0509988776',
        phoneMasked: '050****776',
        city: 'الرياض',
        district: 'حي النرجس',
        address: 'شارع عثمان بن عفان، فيلا 3'
      },
      car: {
        make: 'فورد',
        model: 'تورس',
        year: '2022',
        vin: '1FTFW1ED4NFC9201',
        displayName: 'فورد تورس 2022'
      },
      part: {
        name: 'طقم فلاتر صيانة (فلتر هواء + فلتر مكيف + فلتر زيت) أصلية',
        oem: 'FA-1927 / FP-79 / FL-910S',
        category: 'الفلاتر والصيانة السريعة',
        condition: 'أصلي وكالة موتوركرافت',
        warranty: 'أصلي 100%',
        quantity: 1,
        unitPrice: 278.26,
        tax: 41.74,
        total: 320
      },
      status: 'delivered',
      statusLabel: 'تم التسليم وإيداع الأرباح',
      notes: 'تم توقيع العميل إلكترونياً واستلام الشحنة وإيداع المبلغ في محفظة المتجر',
      courier: {
        name: 'الكابتن سلطان العتيبي',
        phone: '0503344556',
        vehicle: 'كيا ريو 2021 - د ل ط 3319',
        rating: '4.88 ★',
        eta: 'مكتمل',
        pickupOtp: '3302',
        courierStatus: 'تم التسليم بنجاح وإغلاق الطلب',
        statusColor: '#059669',
        avatarBg: '#D1FAE5'
      },
      timeline: [
        { time: 'أمس 04:30 م', text: 'استلام الطلب وتجهيزه' },
        { time: 'أمس 05:15 م', text: 'استلام الكابتن سلطان الشحنة من المستودع' },
        { time: 'أمس 06:10 م', text: 'تم التسليم للعميل بالرمز السري وإيداع 320 ر.س في محفظة متجرك' }
      ]
    },
    {
      id: 'ORD-8874',
      date: 'أمس، 11:20 ص',
      customer: {
        name: 'ماجد الحربي',
        phone: '0533322110',
        phoneMasked: '053****110',
        city: 'الرياض',
        district: 'حي الشفا',
        address: 'شارع ابن تيمية'
      },
      car: {
        make: 'كيا',
        model: 'كادينزا',
        year: '2019',
        vin: 'KNAGN418B551029',
        displayName: 'كيا كادينزا 2019'
      },
      part: {
        name: 'كمبروسر مكيف سيارة أصلي كامل مع الكلتش',
        oem: '97701-3R000',
        category: 'التكييف والتبريد',
        condition: 'أصلي وكالة',
        warranty: 'ضمان 6 أشهر',
        quantity: 1,
        unitPrice: 956.52,
        tax: 143.48,
        total: 1100
      },
      status: 'rejected',
      statusLabel: 'مرفوض من المتجر',
      rejectReason: 'نفاد الكمية وعدم توفر القطعة لدى الوكيل المعتمد حالياً',
      notes: 'تم إشعار العميل وإرجاع المبلغ لمحفظته تلقائياً',
      courier: null,
      timeline: [
        { time: 'أمس 11:20 ص', text: 'استلام طلب الشراء' },
        { time: 'أمس 11:35 ص', text: 'رفض الطلب لعدم توفر المخزون، وتم إشعار العميل فوراً' }
      ]
    }
  ],

  getRoleContext() {
    const roleId = (window.KafuStore && window.KafuStore.getRole) ? window.KafuStore.getRole() : 'merchant_new';
    if (roleId === 'rep_oem' || roleId === 'rep_scrap') {
      return {
        roleId,
        isRep: true,
        isCourier: false,
        pageTitle: 'إدارة طلبيات ومبيعات المندوب',
        pageSubtitle: 'متابعة وتجهيز طلبيات الورش والعملاء وتأكيد الشحن والتسليم للكباتن',
        statusBadge: 'حسابك متاح للطلبات ✓',
        totalLabel: 'إجمالي طلبيات الورش والعملاء:',
        fullPageUrl: 'rep-orders.html',
        fullPageTitle: 'فتح لوحة طلبيات المندوب الموسعة',
        searchPlaceholder: 'بحث برقم الطلبية (ORD-...)، اسم الورشة، العميل، أو القطعة...',
        confirmedTabLabel: 'المؤكدة / بانتظار الكابتن',
        courierTabLabel: 'مع كابتن الشحن'
      };
    } else if (roleId === 'courier') {
      return {
        roleId,
        isRep: false,
        isCourier: true,
        pageTitle: 'إدارة شحنات ومشاوير الكابتن',
        pageSubtitle: 'استلام الشحنات من المتاجر، ملاحة GPS، والتسليم برمز التحقق OTP',
        statusBadge: 'كابتن متصل وجاهز للاستلام ✓',
        totalLabel: 'إجمالي الشحنات والمشاوير:',
        fullPageUrl: 'courier-orders.html',
        fullPageTitle: 'فتح لوحة شحنات الكابتن الموسعة',
        searchPlaceholder: 'بحث برقم الشحنة، المستودع، الوجهة، أو المستلم...',
        confirmedTabLabel: 'جاهزة للاستلام بالمستودع',
        courierTabLabel: 'قيد التوصيل معي'
      };
    }
    return {
      roleId,
      isRep: false,
      isCourier: false,
      pageTitle: 'إدارة طلبات المتجر والمبيعات',
      pageSubtitle: 'متابعة الشحنات، المندوبين، والتسليم الفوري',
      statusBadge: 'متجرك متاح للطلبات ✓',
      totalLabel: 'إجمالي الطلبات المسجلة:',
      fullPageUrl: 'merchant-orders.html',
      fullPageTitle: 'فتح لوحة الطلبات الموسعة',
      searchPlaceholder: 'بحث برقم الطلب (ORD-...)، اسم العميل، رقم الجوال، أو القطعة...',
      confirmedTabLabel: 'المؤكدة / بانتظار المندوب',
      courierTabLabel: 'مع المندوب'
    };
  },

  getStorageKey() {
    const ctx = this.getRoleContext();
    if (ctx.isRep) return this.STORAGE_KEY + '_rep';
    if (ctx.isCourier) return this.STORAGE_KEY + '_courier';
    return this.STORAGE_KEY;
  },

  getDefaultOrdersForRole() {
    const ctx = this.getRoleContext();
    if (ctx.isRep) {
      return [
        {
          id: 'ORD-8921',
          date: 'اليوم، 10:45 ص',
          customer: {
            name: 'مركز صيانة الأمل (م. كمال)',
            phone: '0554128930',
            phoneMasked: '055****893',
            city: 'الرياض',
            district: 'حي اليرموك',
            address: 'شارع الصحابة، ورشة 12'
          },
          car: {
            make: 'تويوتا',
            model: 'كامري',
            year: '2023',
            vin: '4T1B11HK5SU89201',
            displayName: 'تويوتا كامري 2023'
          },
          part: {
            name: 'فحمات / قماشات الفرامل الأمامية (Brake Pad)',
            oem: '04465-33480',
            category: 'نظام الفرامل',
            condition: 'أصلي وكالة (Genuine OEM)',
            warranty: 'ضمان كفو 6 أشهر',
            quantity: 1,
            unitPrice: 195.00,
            repCommission: 140.00,
            total: 195.00
          },
          status: 'incoming',
          statusLabel: 'طلبية واردة من ورشة تابعة',
          notes: 'طلبية مستعجلة للورشة - بانتظار تأكيد التجهيز من المورد المعتمد',
          courier: null,
          timeline: [
            { time: '10:45 ص', text: 'تم استلام الطلبية من مركز صيانة الأمل برمز المندوب' },
            { time: '10:46 ص', text: 'بانتظار تأكيد التجهيز وإسناد كابتن التوصيل' }
          ]
        },
        {
          id: 'ORD-8918',
          date: 'اليوم، 09:30 ص',
          customer: {
            name: 'ورشة المحرك الذهبي (أبو فهد)',
            phone: '0508451122',
            phoneMasked: '050****845',
            city: 'الرياض',
            district: 'الصناعية القديمة',
            address: 'شارع الجمعية، ورشة رقم 8'
          },
          car: {
            make: 'تويوتا',
            model: 'كامري',
            year: '2022',
            vin: '4T1B11HK2NU10928',
            displayName: 'تويوتا كامري 2022'
          },
          part: {
            name: 'طقم مكبس محرك كامل (Complete Engine Piston Set)',
            oem: 'OP010-13101',
            category: 'المحرك وملحقاته',
            condition: 'أصلي وكالة معتمد',
            warranty: 'ضمان سنة كاملة',
            quantity: 1,
            unitPrice: 480.00,
            repCommission: 180.00,
            total: 480.00
          },
          status: 'review',
          statusLabel: 'قيد المراجعة وتدقيق المقاسات',
          reviewNote: 'جاري مطابقة مقاس السلندر وستاندر المكبس مع الوكيل',
          notes: 'طلب فحص إضافي لرقم الهيكل من قبل الورشة',
          courier: null,
          timeline: [
            { time: '09:30 ص', text: 'استلام استفسار الطلبية من الورشة' },
            { time: '09:40 ص', text: 'تحويل الطلب للمراجعة الفنية' }
          ]
        },
        {
          id: 'ORD-8915',
          date: 'اليوم، 07:10 ص',
          customer: {
            name: 'مركز صيانة الخليج (م. يوسف)',
            phone: '0567788990',
            phoneMasked: '056****990',
            city: 'الرياض',
            district: 'حي السلي',
            address: 'شارع هارون الرشيد، مجمع ورش 4'
          },
          car: {
            make: 'مازدا',
            model: 'مازدا 6',
            year: '2021',
            vin: 'JM1GL1U58M120918',
            displayName: 'مازدا 6 2021'
          },
          part: {
            name: 'طقم مساعدات أمامية يمين ويسار أصلية',
            oem: 'KD35-34-700C',
            category: 'العضلات والمساعدات',
            condition: 'أصلي وكالة',
            warranty: 'ضمان سنة كاملة',
            quantity: 2,
            unitPrice: 750.00,
            repCommission: 95.00,
            total: 750.00
          },
          status: 'with_courier',
          statusLabel: 'قيد التوصيل مع الكابتن للورشة',
          notes: 'تم فحص المساعدات والتأكد من أرقام البارت نمبر',
          courier: {
            name: 'الكابتن راكان المطيري',
            phone: '0557654321',
            vehicle: 'هيونداي إلنترا 2022 - ر س ت 9912',
            rating: '4.95 ★',
            eta: 'متوقع الوصول للورشة 11:30 ص',
            pickupOtp: '8143',
            courierStatus: 'استلم القطع وجاري التوصيل للورشة'
          },
          timeline: [
            { time: '07:10 ص', text: 'طلب مؤكد ومسند للمورد' },
            { time: '08:00 ص', text: 'الكابتن راكان استلم الشحنة بالكود #8143' }
          ]
        },
        {
          id: 'ORD-8889',
          date: 'أمس، 04:30 م',
          customer: {
            name: 'مركز صيانة كفو المعتمد',
            phone: '0509988776',
            phoneMasked: '050****776',
            city: 'الرياض',
            district: 'حي النرجس',
            address: 'شارع عثمان بن عفان'
          },
          car: {
            make: 'فورد',
            model: 'تورس',
            year: '2022',
            vin: '1FTFW1ED4NFC9201',
            displayName: 'فورد تورس 2022'
          },
          part: {
            name: 'طقم فلاتر صيانة دورية أصلية',
            oem: 'FA-1927 / FP-79',
            category: 'الفلاتر والصيانة السريعة',
            condition: 'أصلي وكالة',
            warranty: 'أصلي 100%',
            quantity: 1,
            unitPrice: 320.00,
            repCommission: 85.00,
            total: 320.00
          },
          status: 'delivered',
          statusLabel: 'تم التسليم واحتساب العمولة ✓',
          notes: 'تم تسليم القطع للمهندس واعتمدت العمولة بالمحفظة',
          courier: null,
          timeline: [
            { time: 'أمس 04:30 م', text: 'تسليم ناجح للورشة وتأكيد برمز OTP' }
          ]
        }
      ];
    } else if (ctx.isCourier) {
      return [
        {
          id: 'SH-992',
          date: 'اليوم، 10:45 ص',
          customer: {
            name: 'مركز صيانة الأمل (م. كمال)',
            phone: '0554128930',
            phoneMasked: '055****893',
            city: 'الرياض',
            district: 'حي اليرموك',
            address: 'شارع الصحابة، ورشة 12'
          },
          pickupWarehouse: 'متجر كفو للقطع - الصناعية القديمة',
          deliveryDestination: 'حي اليرموك (14 كم)',
          deliveryFee: 45.00,
          car: {
            make: 'تويوتا',
            model: 'كامري',
            year: '2023',
            vin: '4T1B11HK5SU89201',
            displayName: 'تويوتا كامري 2023'
          },
          part: {
            name: 'فحمات فرامل وبواجي أصلية',
            oem: '04465-33480',
            category: 'نظام الفرامل',
            condition: 'طرد خفيف (3 كجم)',
            warranty: 'مغلف ومختوم بباركود كفو',
            quantity: 1,
            unitPrice: 195.00,
            total: 195.00
          },
          status: 'incoming',
          statusLabel: 'شحنة متاحة للاستلام الآن (45 ر.س)',
          notes: 'جاهزة للاستلام من بوابة المستودع رقم 3',
          courier: null,
          timeline: [
            { time: '10:45 ص', text: 'تم تجهيز الطرد في المستودع وجاهز لاستلام الكابتن' }
          ]
        },
        {
          id: 'SH-988',
          date: 'اليوم، 09:30 ص',
          customer: {
            name: 'ورشة الخليج لصيانة السيارات',
            phone: '0508451122',
            phoneMasked: '050****845',
            city: 'الرياض',
            district: 'حي السلي',
            address: 'شارع هارون الرشيد'
          },
          pickupWarehouse: 'تشاليح الحائر - أبو فهد للقطع',
          deliveryDestination: 'حي السلي (18 كم)',
          deliveryFee: 60.00,
          car: {
            make: 'مازدا',
            model: 'مازدا 6',
            year: '2021',
            vin: 'JM1GL1U58M120918',
            displayName: 'مازدا 6 2021'
          },
          part: {
            name: 'رفرف ومساعدات سيارة مستعملة نظيفة',
            oem: 'KD35-34-700C',
            category: 'عضلات وهيكل',
            condition: 'مفحوص ومضمون',
            warranty: 'ضمان كفو',
            quantity: 1,
            unitPrice: 750.00,
            total: 750.00
          },
          status: 'confirmed',
          statusLabel: 'بانتظار وصولك للمستودع (60 ر.س)',
          notes: 'يرجى مراجعة الاستقبال في ساحة التشاليح',
          courier: null,
          timeline: [
            { time: '09:30 ص', text: 'تم تأكيد التجهيز وتحديد موعد الاستلام' }
          ]
        },
        {
          id: 'ACT-104',
          date: 'اليوم، 08:15 ص',
          customer: {
            name: 'م. سامي أحمد (مركز صيانة كفو)',
            phone: '0561239988',
            phoneMasked: '056****988',
            city: 'الرياض',
            district: 'مخرج 17',
            address: 'شارع الجمعية، ورشة 14'
          },
          pickupWarehouse: 'مستودع الموزعين المركزي',
          deliveryDestination: 'مخرج 17 - شارع الجمعية',
          deliveryFee: 45.00,
          car: {
            make: 'نيسان',
            model: 'باترول',
            year: '2021',
            vin: 'JN8AY2NK5M90123',
            displayName: 'نيسان باترول 2021'
          },
          part: {
            name: 'طرد قطع محرك أصلية كاملة',
            oem: '26010-6GM0A',
            category: 'المحرك',
            condition: 'أصلي معتمد',
            warranty: 'ضمان كفو',
            quantity: 1,
            unitPrice: 1850.00,
            total: 1850.00
          },
          status: 'with_courier',
          statusLabel: 'في حوزتك قيد التوصيل الآن (ملاحة GPS)',
          notes: 'المستلم ينتظر بالموقع، يرجى طلب رمز OTP عند التسليم',
          courier: {
            name: 'كابتن عبدالله الشمري',
            phone: '0559876543',
            vehicle: 'تويوتا هايلوكس 2023 - ك ف و 2025',
            pickupOtp: '9201',
            courierStatus: 'جاري التوجه لموقع الورشة'
          },
          timeline: [
            { time: '08:15 ص', text: 'تم استلام الطرد من المستودع بالرمز #9201' },
            { time: '08:20 ص', text: 'في الطريق لموقع التسليم' }
          ]
        },
        {
          id: 'SH-895',
          date: 'أمس، 04:30 م',
          customer: {
            name: 'مركز التخصصي للسيارات',
            phone: '0509988776',
            phoneMasked: '050****776',
            city: 'الرياض',
            district: 'حي النرجس',
            address: 'شارع عثمان بن عفان'
          },
          pickupWarehouse: 'متجر كفو للقطع',
          deliveryDestination: 'حي النرجس',
          deliveryFee: 50.00,
          car: {
            make: 'فورد',
            model: 'تورس',
            year: '2022',
            vin: '1FTFW1ED4NFC9201',
            displayName: 'فورد تورس 2022'
          },
          part: {
            name: 'دينمو كامري وطقم فلاتر',
            oem: 'FA-1927',
            category: 'الكهرباء',
            condition: 'أصلي',
            warranty: 'ضمان كفو',
            quantity: 1,
            unitPrice: 320.00,
            total: 320.00
          },
          status: 'delivered',
          statusLabel: 'تم التسليم وإيداع 50 ر.س بالمحفظة ✓',
          notes: 'تسليم ناجح مع تقييم 5 نجوم من العميل',
          courier: null,
          timeline: [
            { time: 'أمس 05:10 م', text: 'تم التسليم برمز OTP وإيداع أجر المشوار فوراً' }
          ]
        }
      ];
    }
    return this.defaultOrders;
  },

  // جلب كافة الطلبات من التخزين
  getAllOrders() {
    const key = this.getStorageKey();
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        const d = this.getDefaultOrdersForRole();
        this.saveAllOrders(d);
        return [...d];
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading orders:', e);
      return [...this.getDefaultOrdersForRole()];
    }
  },

  // حفظ كافة الطلبات في التخزين
  saveAllOrders(orders) {
    const key = this.getStorageKey();
    localStorage.setItem(key, JSON.stringify(orders));
  },

  // جلب طلب محدد برقم المعرف
  getOrder(id) {
    const orders = this.getAllOrders();
    return orders.find(o => o.id === id) || null;
  },

  // حساب أعداد الطلبات لكل حالة
  getCounts() {
    const orders = this.getAllOrders();
    return {
      all: orders.length,
      incoming: orders.filter(o => o.status === 'incoming').length,
      review: orders.filter(o => o.status === 'review').length,
      on_hold: orders.filter(o => o.status === 'on_hold').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      with_courier: orders.filter(o => o.status === 'with_courier').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      rejected: orders.filter(o => o.status === 'rejected').length
    };
  },

  // 1. إجراء: تأكيد وتجهيز الشحنة
  confirmOrder(orderId) {
    const orders = this.getAllOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return false;

    const order = orders[idx];
    order.status = 'confirmed';
    order.statusLabel = 'مؤكد وبانتظار استلام المندوب';

    // تعيين مندوب توصيل معتمد تلقائياً
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    order.courier = {
      name: 'الكابتن فهد الدوسري',
      phone: '0539871234',
      vehicle: 'تويوتا يارس 2023 - أ ب د 4821 (أبيض)',
      rating: '4.9 ★ (1,420 رحلة)',
      eta: 'خلال 12 دقيقة',
      pickupOtp: randomOtp,
      courierStatus: 'تم قبول الطلب وهو في الطريق لمستودعك للاستلام',
      statusColor: '#0284C7',
      avatarBg: '#E0F2FE'
    };

    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    order.timeline.unshift({
      time: now,
      text: `تم تأكيد التجهيز وتعيين الكابتن فهد الدوسري للاستلام (كود التسليم: #${randomOtp})`
    });

    this.saveAllOrders(orders);
    return order;
  },

  // 2. إجراء: وضع الطلب في الانتظار
  putOnHold(orderId, reason) {
    const orders = this.getAllOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return false;

    const order = orders[idx];
    order.status = 'on_hold';
    order.statusLabel = 'قيد الانتظار';
    order.holdReason = reason || 'في انتظار المراجعة والتوريد';

    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    order.timeline.unshift({
      time: now,
      text: `تم وضع الطلب في الانتظار: ${order.holdReason}`
    });

    this.saveAllOrders(orders);
    return order;
  },

  // 3. إجراء: رفض الطلب
  rejectOrder(orderId, reason) {
    const orders = this.getAllOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return false;

    const order = orders[idx];
    order.status = 'rejected';
    order.statusLabel = 'مرفوض من المتجر';
    order.rejectReason = reason || 'القطعة غير متوفرة حالياً';

    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    order.timeline.unshift({
      time: now,
      text: `تم رفض الطلب: ${order.rejectReason}`
    });

    this.saveAllOrders(orders);
    return order;
  },

  // 4. إجراء: مراجعة الطلب وتحديث الملاحظات
  updateReview(orderId, note) {
    const orders = this.getAllOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return false;

    const order = orders[idx];
    order.status = 'review';
    order.statusLabel = 'قيد المراجعة';
    order.reviewNote = note || 'جاري تدقيق التوافق ومراجعة المخزون';

    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    order.timeline.unshift({
      time: now,
      text: `ملاحظة مراجعة: ${order.reviewNote}`
    });

    this.saveAllOrders(orders);
    return order;
  },

  // 5. إجراء: تسليم الطرد للمندوب
  handoverToCourier(orderId) {
    const orders = this.getAllOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return false;

    const order = orders[idx];
    order.status = 'with_courier';
    order.statusLabel = 'جاري التوصيل مع المندوب';
    if (order.courier) {
      order.courier.courierStatus = 'تم استلام الشحنة من المستودع وفي الطريق لموقع العميل';
      order.courier.statusColor = '#16A34A';
      order.courier.avatarBg = '#DCFCE7';
    }

    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    order.timeline.unshift({
      time: now,
      text: `تم تسليم الصندوق للمندوب بنجاح بعد التحقق من كود الاستلام #${order.courier ? order.courier.pickupOtp : ''}`
    });

    this.saveAllOrders(orders);
    return order;
  },

  // 6. إجراء: محاكاة إتمام التسليم للعميل
  markDelivered(orderId) {
    const orders = this.getAllOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return false;

    const order = orders[idx];
    order.status = 'delivered';
    order.statusLabel = 'تم التسليم وإيداع الأرباح';
    if (order.courier) {
      order.courier.courierStatus = 'تم التسليم بنجاح للعميل بالرمز السري';
      order.courier.statusColor = '#059669';
    }

    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    order.timeline.unshift({
      time: now,
      text: `تم استلام العميل للطلب وتأكيد التسليم، وتم إيداع ${order.part.total} ر.س في محفظة المتجر`
    });

    this.saveAllOrders(orders);
    return order;
  },

  // استرجاع الطلب المرفوض إلى الوارد
  reopenOrder(orderId) {
    const orders = this.getAllOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return false;

    const order = orders[idx];
    order.status = 'incoming';
    order.statusLabel = 'طلب وارد جديد';
    delete order.rejectReason;

    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    order.timeline.unshift({
      time: now,
      text: `تمت إعادة فتح الطلب وإرجاعه لقائمة الوارد`
    });

    this.saveAllOrders(orders);
    return order;
  },

  // توليد ألوان وشارات الحالات
  getStatusBadge(status) {
    const map = {
      incoming: { bg: '#EFF6FF', color: '#1D4ED8', text: 'وارد جديد', border: '#BFDBFE' },
      review: { bg: '#F5F3FF', color: '#6D28D9', text: 'قيد المراجعة', border: '#DDD6FE' },
      on_hold: { bg: '#FEF3C7', color: '#B45309', text: 'قيد الانتظار', border: '#FDE68A' },
      confirmed: { bg: '#E0F2FE', color: '#0369A1', text: 'مؤكد وبانتظار المندوب', border: '#BAE6FD' },
      with_courier: { bg: '#ECFDF5', color: '#047857', text: 'مع المندوب للتوصيل', border: '#A7F3D0' },
      delivered: { bg: '#F0FDF4', color: '#15803D', text: 'تم التسليم بنجاح', border: '#BBF7D0' },
      rejected: { bg: '#FEF2F2', color: '#B91C1C', text: 'مرفوض', border: '#FECACA' }
    };
    return map[status] || { bg: '#F1F5F9', color: '#475569', text: status, border: '#E2E8F0' };
  },

  // ---------------------------------------------------------------------------
  // واجهة العرض التفاعلية الشاملة (Full Interactive UI Renderer)
  // ---------------------------------------------------------------------------
  
  // توليد محتوى مودال طلبات المتجر بالكامل
  renderOrdersModalHtml(activeTab = 'all', searchQuery = '') {
    this.activeTab = activeTab;
    this.searchQuery = searchQuery;
    const counts = this.getCounts();
    const ctx = this.getRoleContext();

    let allOrders = this.getAllOrders();

    // تطبيق فلتر التبويب
    if (activeTab !== 'all') {
      if (activeTab === 'hold_review') {
        allOrders = allOrders.filter(o => o.status === 'on_hold' || o.status === 'review');
      } else {
        allOrders = allOrders.filter(o => o.status === activeTab);
      }
    }

    // تطبيق البحث الحي
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      allOrders = allOrders.filter(o => 
        o.id.toLowerCase().includes(q) ||
        (o.customer && o.customer.name.toLowerCase().includes(q)) ||
        (o.customer && o.customer.phone.includes(q)) ||
        (o.part && o.part.name.toLowerCase().includes(q)) ||
        (o.part && o.part.oem.toLowerCase().includes(q)) ||
        (o.car && o.car.displayName.toLowerCase().includes(q))
      );
    }

    return `
      <div class="merchant-orders-wrapper" style="display: flex; flex-direction: column; gap: 14px; font-family: inherit;">
        
        <!-- الشريط الإحصائي السريع وأزرار التحكم -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; padding-bottom: 4px; border-bottom: 1px solid #EDF2F7;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.82rem; color: #64748B;">${ctx.totalLabel}</span>
            <strong style="color: #0F172A; font-size: 0.95rem;">${counts.all} طلبات</strong>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <a href="${ctx.fullPageUrl}" target="_blank" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.78rem; font-weight: 700; color: #0066FF; text-decoration: none; padding: 4px 10px; background: #EFF6FF; border-radius: 8px; border: 1px solid #BFDBFE;">
              <span>${ctx.fullPageTitle}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>

        <!-- حقل البحث الحي السريع -->
        <div style="position: relative; width: 100%;">
          <input 
            type="text" 
            id="merchantOrdersSearch" 
            placeholder="${ctx.searchPlaceholder}" 
            value="${this.searchQuery}" 
            oninput="KafuMerchantOrders.handleSearch(this.value)"
            style="width: 100%; height: 40px; padding: 0 38px 0 12px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 12px; font-size: 0.85rem; font-family: inherit; outline: none; box-sizing: border-box;"
          />
          <span style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #94A3B8; pointer-events: none;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          ${this.searchQuery ? `
            <button onclick="KafuMerchantOrders.handleSearch('')" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #94A3B8; cursor: pointer; font-size: 0.9rem;">✕</button>
          ` : ''}
        </div>

        <!-- شريط التبويبات القابل للتمرير الأفقي -->
        <div class="orders-tabs-scroll" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch; scrollbar-width: none;">
          ${this.renderTabBtn('all', 'الكل', counts.all)}
          ${this.renderTabBtn('incoming', 'الواردة الجديدة', counts.incoming, '#1D4ED8', '#EFF6FF')}
          ${this.renderTabBtn('hold_review', 'الانتظار والمراجعة', counts.on_hold + counts.review, '#B45309', '#FEF3C7')}
          ${this.renderTabBtn('confirmed', ctx.confirmedTabLabel || 'المؤكدة / بانتظار المندوب', counts.confirmed, '#0369A1', '#E0F2FE')}
          ${this.renderTabBtn('with_courier', ctx.courierTabLabel || 'مع المندوب', counts.with_courier, '#047857', '#ECFDF5')}
          ${this.renderTabBtn('delivered', 'المُسلّمة', counts.delivered, '#15803D', '#F0FDF4')}
          ${this.renderTabBtn('rejected', 'المرفوضة', counts.rejected, '#B91C1C', '#FEF2F2')}
        </div>

        <!-- بطاقات الطلبات -->
        <div id="merchantOrdersCardsStack" style="display: flex; flex-direction: column; gap: 12px; max-height: 60vh; overflow-y: auto; padding-right: 2px;">
          ${allOrders.length > 0 ? allOrders.map(o => this.renderSingleOrderCard(o)).join('') : `
            <div style="text-align: center; padding: 32px 16px; background: #F8FAFC; border: 1.5px dashed #CBD5E1; border-radius: 18px; color: #64748B;">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="1.8" style="margin-bottom: 8px;"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              <div style="font-weight: 700; font-size: 0.95rem; color: #0F172A; margin-bottom: 4px;">لا توجد طلبات مطابقة</div>
              <div style="font-size: 0.82rem;">لم يتم العثور على أي طلبات في هذه الحالة أو بكلمات البحث المحددة.</div>
            </div>
          `}
        </div>

      </div>
    `;
  },

  // زر التبويب
  renderTabBtn(tabKey, label, count, countColor = '#475569', countBg = '#F1F5F9') {
    const isActive = this.activeTab === tabKey;
    return `
      <button 
        type="button" 
        onclick="KafuMerchantOrders.switchTab('${tabKey}')"
        style="
          display: inline-flex; 
          align-items: center; 
          gap: 6px; 
          padding: 7px 12px; 
          border-radius: 999px; 
          font-family: inherit; 
          font-size: 0.82rem; 
          font-weight: ${isActive ? '800' : '600'}; 
          white-space: nowrap; 
          border: 1.5px solid ${isActive ? '#0066FF' : '#E2E8F0'}; 
          background: ${isActive ? '#EFF6FF' : '#FFFFFF'}; 
          color: ${isActive ? '#0066FF' : '#475569'}; 
          cursor: pointer; 
          transition: all 0.2s ease;
          flex-shrink: 0;
        "
      >
        <span>${label}</span>
        <span style="
          padding: 2px 7px; 
          border-radius: 999px; 
          font-size: 0.72rem; 
          font-weight: 800; 
          background: ${isActive ? '#0066FF' : countBg}; 
          color: ${isActive ? '#FFFFFF' : countColor};
        ">${count}</span>
      </button>
    `;
  },

  // رسم بطاقة طلب واحدة بكل تفاصيلها
  renderSingleOrderCard(o) {
    const badge = this.getStatusBadge(o.status);

    return `
      <div class="merchant-order-card" id="card-${o.id}" style="background: #FFFFFF; border: 1.6px solid #E2E8F0; border-radius: 18px; padding: 14px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03); display: flex; flex-direction: column; gap: 10px; transition: border-color 0.2s ease;">
        
        <!-- رأس كرت الطلب: الرقم والحالة والتاريخ -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
          <div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
              <strong style="color: #0A2540; font-size: 1rem; font-weight: 800;">طلب رقم: ${o.id}</strong>
              <span style="font-size: 0.72rem; color: #64748B; background: #F1F5F9; padding: 2px 6px; border-radius: 6px;">${o.date}</span>
            </div>
            <div style="font-size: 0.78rem; color: #64748B;">المركبة: <strong style="color: #0F172A;">${o.car.displayName}</strong> · <span style="font-family: monospace; font-size: 0.74rem;">VIN: ${o.car.vin.slice(0, 7)}...</span></div>
          </div>
          
          <span style="background: ${badge.bg}; color: ${badge.color}; border: 1px solid ${badge.border}; padding: 4px 10px; border-radius: 999px; font-size: 0.76rem; font-weight: 800; white-space: nowrap; flex-shrink: 0;">
            ${badge.text}
          </span>
        </div>

        <!-- معلومات العميل وبيانات التواصل المباشر -->
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 9px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <div style="font-size: 0.82rem; color: #334155; line-height: 1.3;">
            <div>العميل: <strong style="color: #0F172A;">${o.customer.name}</strong> (${o.customer.phoneMasked})</div>
            <div style="font-size: 0.74rem; color: #64748B;">التوصيل إلى: ${o.customer.city} - ${o.customer.district}</div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
            <!-- اتصال هاتفي مباشر -->
            <a href="tel:${o.customer.phone}" title="اتصال هاتفي بالعميل" style="width: 32px; height: 32px; border-radius: 50%; background: #EFF6FF; border: 1px solid #BFDBFE; display: inline-flex; align-items: center; justify-content: center; color: #0066FF; text-decoration: none;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <!-- محادثة واتساب فورية -->
            <a href="https://wa.me/966${o.customer.phone.replace(/^0/, '')}?text=${encodeURIComponent('السلام عليكم بخصوص طلبك في كفو رقم ' + o.id)}" target="_blank" title="محادثة واتساب" style="width: 32px; height: 32px; border-radius: 50%; background: #ECFDF5; border: 1px solid #A7F3D0; display: inline-flex; align-items: center; justify-content: center; color: #16A34A; text-decoration: none;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
            </a>
          </div>
        </div>

        <!-- تفاصيل القطعة المطلوبة والـ OEM -->
        <div style="font-size: 0.85rem; color: #334155; border-right: 3px solid #0066FF; padding-right: 10px;">
          <div style="font-weight: 700; color: #0A2540; margin-bottom: 2px;">${o.part.name}</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; font-size: 0.76rem; color: #64748B; margin-top: 4px;">
            <span style="background: #F1F5F9; padding: 2px 7px; border-radius: 6px; font-family: monospace; font-weight: 700; color: #0F172A;">OEM: ${o.part.oem}</span>
            <span style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 2px 7px; border-radius: 6px;">${o.part.condition}</span>
            <span style="background: #F0FDF4; color: #15803D; padding: 2px 7px; border-radius: 6px; font-weight: 600;">✓ ${o.part.warranty}</span>
          </div>
        </div>

        <!-- تنبيهات الحالة الخاصة (انتظار / مراجعة / رفض) -->
        ${o.status === 'on_hold' ? `
          <div style="background: #FFFBEB; border: 1.5px solid #FDE68A; border-radius: 12px; padding: 9px 12px; font-size: 0.8rem; color: #92400E; display: flex; align-items: flex-start; gap: 8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.3" style="flex-shrink:0; margin-top:1px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div><strong>سبب الانتظار:</strong> ${o.holdReason || 'بانتظار وصول الشحنة من المستودع'}</div>
          </div>
        ` : ''}

        ${o.status === 'review' ? `
          <div style="background: #FAF5FF; border: 1.5px solid #E9D5FF; border-radius: 12px; padding: 9px 12px; font-size: 0.8rem; color: #6B21A8; display: flex; align-items: flex-start; gap: 8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7E22CE" stroke-width="2.3" style="flex-shrink:0; margin-top:1px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <div><strong>ملاحظة المراجعة:</strong> ${o.reviewNote || 'جاري تدقيق مطابقة رقم الهيكل والمقاس'}</div>
          </div>
        ` : ''}

        ${o.status === 'rejected' ? `
          <div style="background: #FEF2F2; border: 1.5px solid #FECACA; border-radius: 12px; padding: 9px 12px; font-size: 0.8rem; color: #991B1B; display: flex; align-items: flex-start; gap: 8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2.3" style="flex-shrink:0; margin-top:1px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <div><strong>سبب الرفض:</strong> ${o.rejectReason || 'نفاد المخزون وعدم توفر القطعة'}</div>
          </div>
        ` : ''}

        <!-- ===================================================================
             كرت المندوب الشامل التفاعلي (عندما يقبل المندوب الاستلام أو جاري التوصيل)
             =================================================================== -->
        ${o.courier ? `
          <div style="background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%); border: 1.5px solid #BAE6FD; border-radius: 14px; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
            
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 38px; height: 38px; border-radius: 50%; background: #0066FF; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem; box-shadow: 0 4px 10px rgba(0, 102, 255, 0.25);">
                  🚚
                </div>
                <div>
                  <div style="font-weight: 800; color: #0369A1; font-size: 0.92rem; display: flex; align-items: center; gap: 6px;">
                    <span>${o.courier.name}</span>
                    <span style="font-size: 0.72rem; color: #D97706; background: #FEF3C7; padding: 1px 6px; border-radius: 6px; font-weight: 700;">${o.courier.rating}</span>
                  </div>
                  <div style="font-size: 0.76rem; color: #0284C7; font-weight: 600;">${o.courier.vehicle}</div>
                </div>
              </div>

              <!-- كود الاستلام السري للتحقق -->
              <div style="text-align: center; background: #FFFFFF; border: 1.5px dashed #0284C7; border-radius: 10px; padding: 4px 10px;">
                <div style="font-size: 0.68rem; color: #64748B; font-weight: 700;">كود تسليم الشحنة</div>
                <div style="font-size: 1.05rem; font-weight: 900; color: #0066FF; font-family: monospace; letter-spacing: 1px;">#${o.courier.pickupOtp}</div>
              </div>
            </div>

            <!-- حالة المندوب الحية ووقت الوصول المتوقع -->
            <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.75); border-radius: 8px; padding: 6px 10px; font-size: 0.78rem;">
              <span style="color: ${o.courier.statusColor}; font-weight: 700; display: flex; align-items: center; gap: 5px;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${o.courier.statusColor};"></span>
                <span>${o.courier.courierStatus}</span>
              </span>
              <strong style="color: #0F172A; font-size: 0.78rem;">${o.courier.eta}</strong>
            </div>

            <!-- أزرار الاتصال بالكابتن والتسليم الفوري -->
            <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
              <a href="tel:${o.courier.phone}" style="flex: 1; height: 32px; background: #FFFFFF; border: 1px solid #BAE6FD; border-radius: 8px; font-size: 0.78rem; font-weight: 700; color: #0284C7; display: inline-flex; align-items: center; justify-content: center; gap: 5px; text-decoration: none;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>اتصال بالكابتن</span>
              </a>

              <a href="https://wa.me/966${o.courier.phone.replace(/^0/, '')}?text=${encodeURIComponent('مرحباً كابتن فهد، بخصوص استلام شحنة كفو رقم ' + o.id)}" target="_blank" style="flex: 1; height: 32px; background: #FFFFFF; border: 1px solid #A7F3D0; border-radius: 8px; font-size: 0.78rem; font-weight: 700; color: #16A34A; display: inline-flex; align-items: center; justify-content: center; gap: 5px; text-decoration: none;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
                <span>واتساب الكابتن</span>
              </a>

              ${o.status === 'confirmed' ? `
                <button type="button" onclick="KafuMerchantOrders.handleHandover('${o.id}')" style="flex: 1.4; height: 32px; background: #0066FF; border: none; border-radius: 8px; font-size: 0.78rem; font-weight: 800; color: #FFFFFF; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 4px; box-shadow: 0 3px 8px rgba(0, 102, 255, 0.28);">
                  <span>تسليم الصندوق ✓</span>
                </button>
              ` : ''}
            </div>

          </div>
        ` : ''}

        <!-- تذييل الكرت: السعر وأزرار إجراءات التاجر الموسعة -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-top: 4px; padding-top: 8px; border-top: 1px solid #F1F5F9;">
          <div>
            <div style="font-size: 0.72rem; color: #64748B;">المبلغ الإجمالي</div>
            <strong style="font-size: 1.15rem; font-weight: 900; color: #0066FF;">${o.part.total} ر.س</strong>
          </div>

          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            ${this.renderCardActionButtons(o)}
          </div>
        </div>

      </div>
    `;
  },

  // أزرار الإجراءات لكل حالة
  renderCardActionButtons(o) {
    if (o.status === 'incoming' || o.status === 'review') {
      return `
        <!-- زر التأكيد والتجهيز الفوري -->
        <button 
          type="button" 
          onclick="KafuMerchantOrders.handleConfirm('${o.id}')" 
          style="padding: 7px 14px; background: linear-gradient(90deg, #0056E0 0%, #0066FF 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.82rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 4px 12px rgba(0, 102, 255, 0.28);"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"/></svg>
          <span>تأكيد وتجهيز الشحنة</span>
        </button>

        <!-- زر وضع في الانتظار -->
        <button 
          type="button" 
          onclick="KafuMerchantOrders.openHoldModal('${o.id}')" 
          style="padding: 7px 10px; background: #FFFBEB; color: #B45309; border: 1.4px solid #FDE68A; border-radius: 10px; font-size: 0.80rem; font-weight: 700; cursor: pointer;"
          title="وضع الطلب في الانتظار لتوريد أو مراجعة العميل"
        >
          <span>انتظار ⏳</span>
        </button>

        <!-- زر مراجعة وتدقيق -->
        <button 
          type="button" 
          onclick="KafuMerchantOrders.openReviewModal('${o.id}')" 
          style="padding: 7px 10px; background: #F8FAFC; color: #475569; border: 1.4px solid #CBD5E1; border-radius: 10px; font-size: 0.80rem; font-weight: 700; cursor: pointer;"
          title="مراجعة التفاصيل وفحص مطابقة VIN"
        >
          <span>مراجعة 🔍</span>
        </button>

        <!-- زر رفض الطلب -->
        <button 
          type="button" 
          onclick="KafuMerchantOrders.openRejectModal('${o.id}')" 
          style="padding: 7px 10px; background: #FEF2F2; color: #DC2626; border: 1.4px solid #FECACA; border-radius: 10px; font-size: 0.80rem; font-weight: 700; cursor: pointer;"
          title="رفض الطلب لعدم توفر المخزون"
        >
          <span>رفض ✕</span>
        </button>
      `;
    }

    if (o.status === 'on_hold') {
      return `
        <button 
          type="button" 
          onclick="KafuMerchantOrders.handleConfirm('${o.id}')" 
          style="padding: 7px 14px; background: #16A34A; color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.82rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;"
        >
          <span>استئناف وتأكيد الآن ✓</span>
        </button>
        <button 
          type="button" 
          onclick="KafuMerchantOrders.openReviewModal('${o.id}')" 
          style="padding: 7px 10px; background: #F8FAFC; color: #475569; border: 1px solid #CBD5E1; border-radius: 10px; font-size: 0.80rem; font-weight: 700; cursor: pointer;"
        >
          <span>تفاصيل</span>
        </button>
        <button 
          type="button" 
          onclick="KafuMerchantOrders.openRejectModal('${o.id}')" 
          style="padding: 7px 10px; background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; border-radius: 10px; font-size: 0.80rem; font-weight: 700; cursor: pointer;"
        >
          <span>إلغاء ورفض</span>
        </button>
      `;
    }

    if (o.status === 'confirmed') {
      return `
        <button 
          type="button" 
          onclick="KafuMerchantOrders.handleHandover('${o.id}')" 
          style="padding: 7px 14px; background: #0066FF; color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.82rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;"
        >
          <span>تسليم الصندوق للكابتن 📦</span>
        </button>
        <button 
          type="button" 
          onclick="KafuMerchantOrders.openReviewModal('${o.id}')" 
          style="padding: 7px 10px; background: #F8FAFC; color: #475569; border: 1px solid #CBD5E1; border-radius: 10px; font-size: 0.80rem; font-weight: 700; cursor: pointer;"
        >
          <span>الفاتورة والتتبع</span>
        </button>
      `;
    }

    if (o.status === 'with_courier') {
      return `
        <button 
          type="button" 
          onclick="KafuMerchantOrders.handleDelivered('${o.id}')" 
          style="padding: 7px 14px; background: #059669; color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.82rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;"
        >
          <span>محاكاة تسليم العميل ✓</span>
        </button>
        <button 
          type="button" 
          onclick="KafuMerchantOrders.openReviewModal('${o.id}')" 
          style="padding: 7px 10px; background: #F8FAFC; color: #475569; border: 1px solid #CBD5E1; border-radius: 10px; font-size: 0.80rem; font-weight: 700; cursor: pointer;"
        >
          <span>تتبع الشحنة</span>
        </button>
      `;
    }

    if (o.status === 'delivered') {
      return `
        <span style="font-size: 0.82rem; color: #15803D; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">
          <span>✓ تم إيداع ${o.part.total} ر.س في محفظتك</span>
        </span>
        <button 
          type="button" 
          onclick="KafuMerchantOrders.openReviewModal('${o.id}')" 
          style="padding: 6px 12px; background: #F8FAFC; color: #475569; border: 1px solid #CBD5E1; border-radius: 10px; font-size: 0.80rem; font-weight: 700; cursor: pointer;"
        >
          <span>عرض الإيصال</span>
        </button>
      `;
    }

    if (o.status === 'rejected') {
      return `
        <button 
          type="button" 
          onclick="KafuMerchantOrders.handleReopen('${o.id}')" 
          style="padding: 6px 12px; background: #EFF6FF; color: #0066FF; border: 1px solid #BFDBFE; border-radius: 10px; font-size: 0.80rem; font-weight: 700; cursor: pointer;"
        >
          <span>إعادة فتح الطلب</span>
        </button>
        <button 
          type="button" 
          onclick="KafuMerchantOrders.openReviewModal('${o.id}')" 
          style="padding: 6px 10px; background: #F8FAFC; color: #475569; border: 1px solid #CBD5E1; border-radius: 10px; font-size: 0.80rem; font-weight: 700; cursor: pointer;"
        >
          <span>التفاصيل</span>
        </button>
      `;
    }

    return '';
  },

  // ---------------------------------------------------------------------------
  // إجراءات ومعالجات الأحداث التفاعلية (Actions Handlers)
  // ---------------------------------------------------------------------------

  // تبديل التبويب وإعادة رسم القائمة
  switchTab(tabKey) {
    this.activeTab = tabKey;
    this.refreshOrdersModal();
  },

  // البحث الحي
  handleSearch(query) {
    this.searchQuery = query;
    this.refreshOrdersModal();
  },

  // إعادة رسم المحتوى بالكامل في المودال النشط
  refreshOrdersModal() {
    const body = document.getElementById('actionModalBody');
    if (body) {
      body.innerHTML = this.renderOrdersModalHtml(this.activeTab, this.searchQuery);
    }
  },

  // 1. معالجة التأكيد
  handleConfirm(orderId) {
    const updated = this.confirmOrder(orderId);
    if (updated) {
      if (window.KafuApp && KafuApp.showToast) {
        KafuApp.showToast(`تم تأكيد الطلب #${orderId}، وتعيين الكابتن فهد الدوسري (كود: #${updated.courier.pickupOtp})`);
      }
      this.refreshOrdersModal();
    }
  },

  // 2. معالجة تسليم الصندوق للمندوب
  handleHandover(orderId) {
    const updated = this.handoverToCourier(orderId);
    if (updated) {
      if (window.KafuApp && KafuApp.showToast) {
        KafuApp.showToast(`تم تسليم الشحنة للكابتن بنجاح، وهي الآن في طريقها للعميل 🚚`);
      }
      this.refreshOrdersModal();
    }
  },

  // 3. معالجة إتمام التسليم للعميل
  handleDelivered(orderId) {
    const updated = this.markDelivered(orderId);
    if (updated) {
      if (window.KafuApp && KafuApp.showToast) {
        KafuApp.showToast(`تم إتمام التسليم للعميل وإيداع ${updated.part.total} ر.س في محفظة المتجر ✓`);
      }
      this.refreshOrdersModal();
    }
  },

  // 4. معالجة إعادة فتح الطلب المرفوض
  handleReopen(orderId) {
    const updated = this.reopenOrder(orderId);
    if (updated) {
      if (window.KafuApp && KafuApp.showToast) {
        KafuApp.showToast(`تمت إعادة فتح الطلب #${orderId} بنجاح`);
      }
      this.refreshOrdersModal();
    }
  },

  // 5. نافذة وضع الطلب في الانتظار (Hold Modal)
  openHoldModal(orderId) {
    const order = this.getOrder(orderId);
    if (!order) return;

    const modalHtml = `
      <div id="subActionModalContainer" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px;">
        <div style="background: #FFFFFF; width: 100%; max-width: 440px; border-radius: 24px; padding: 22px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25); display: flex; flex-direction: column; gap: 14px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">⏳</span>
              <strong style="font-size: 1.1rem; color: #0F172A;">وضع الطلب في الانتظار</strong>
            </div>
            <button onclick="document.getElementById('subActionModalContainer').remove()" style="background: none; border: none; font-size: 1.2rem; color: #64748B; cursor: pointer;">✕</button>
          </div>

          <p style="font-size: 0.84rem; color: #64748B; margin: 0;">طلب رقم: <strong style="color: #0F172A;">${order.id}</strong> للعميل <strong style="color: #0F172A;">${order.customer.name}</strong></p>

          <div>
            <label style="font-size: 0.82rem; font-weight: 700; color: #334155; display: block; margin-bottom: 6px;">اختر سبب الانتظار:</label>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: #334155; cursor: pointer; padding: 6px 10px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px;">
                <input type="radio" name="holdReasonOpt" value="في انتظار وصول شحنة التوريد من المستودع المركزي" checked />
                <span>في انتظار وصول شحنة التوريد من المستودع المركزي</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: #334155; cursor: pointer; padding: 6px 10px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px;">
                <input type="radio" name="holdReasonOpt" value="بانتظار تأكيد مطابقة رقم الهيكل (VIN) من العميل" />
                <span>بانتظار تأكيد مطابقة رقم الهيكل (VIN) من العميل</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: #334155; cursor: pointer; padding: 6px 10px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px;">
                <input type="radio" name="holdReasonOpt" value="طلب العميل تأجيل موعد التسليم لساعة لاحقة" />
                <span>طلب العميل تأجيل موعد التسليم لساعة لاحقة</span>
              </label>
            </div>
          </div>

          <div>
            <label style="font-size: 0.82rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">ملاحظات إضافية (اختياري):</label>
            <input type="text" id="customHoldNote" placeholder="اكتب تفاصيل إضافية إن وجدت..." style="width: 100%; height: 38px; padding: 0 10px; border: 1.5px solid #CBD5E1; border-radius: 10px; font-family: inherit; font-size: 0.84rem; outline: none; box-sizing: border-box;" />
          </div>

          <div style="display: flex; gap: 8px; margin-top: 6px;">
            <button 
              type="button" 
              onclick="
                const selected = document.querySelector('input[name=holdReasonOpt]:checked').value;
                const note = document.getElementById('customHoldNote').value.trim();
                const reason = note ? (selected + ' - ' + note) : selected;
                KafuMerchantOrders.putOnHold('${orderId}', reason);
                document.getElementById('subActionModalContainer').remove();
                if (window.KafuApp && KafuApp.showToast) KafuApp.showToast('تم تحويل الطلب لحالة الانتظار');
                KafuMerchantOrders.refreshOrdersModal();
              "
              style="flex: 1; height: 42px; background: #D97706; color: #FFFFFF; border: none; border-radius: 12px; font-size: 0.88rem; font-weight: 800; cursor: pointer;"
            >
              تأكيد النقل للانتظار
            </button>
            <button 
              type="button" 
              onclick="document.getElementById('subActionModalContainer').remove()"
              style="flex: 1; height: 42px; background: #F1F5F9; color: #475569; border: none; border-radius: 12px; font-size: 0.88rem; font-weight: 700; cursor: pointer;"
            >
              إلغاء
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // 6. نافذة رفض الطلب (Reject Modal)
  openRejectModal(orderId) {
    const order = this.getOrder(orderId);
    if (!order) return;

    const modalHtml = `
      <div id="subActionModalContainer" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px;">
        <div style="background: #FFFFFF; width: 100%; max-width: 440px; border-radius: 24px; padding: 22px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25); display: flex; flex-direction: column; gap: 14px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">✕</span>
              <strong style="font-size: 1.1rem; color: #DC2626;">رفض طلب العميل</strong>
            </div>
            <button onclick="document.getElementById('subActionModalContainer').remove()" style="background: none; border: none; font-size: 1.2rem; color: #64748B; cursor: pointer;">✕</button>
          </div>

          <p style="font-size: 0.84rem; color: #64748B; margin: 0;">هل أنت متأكد من رغبتك برفض طلب <strong style="color: #0F172A;">${order.id}</strong>؟ سيتم إعادة المبلغ تلقائياً لمحفظة العميل.</p>

          <div>
            <label style="font-size: 0.82rem; font-weight: 700; color: #334155; display: block; margin-bottom: 6px;">حدد سبب الرفض:</label>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: #334155; cursor: pointer; padding: 6px 10px; background: #FEF2F2; border: 1px solid #FECACA; border-radius: 10px;">
                <input type="radio" name="rejectReasonOpt" value="نفاد الكمية وعدم توفر القطعة لدى الوكيل حالياً" checked />
                <span>نفاد الكمية وعدم توفر القطعة حالياً</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: #334155; cursor: pointer; padding: 6px 10px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px;">
                <input type="radio" name="rejectReasonOpt" value="كود القطعة لا يطابق رقم هيكل سيارة العميل" />
                <span>كود القطعة لا يطابق رقم هيكل سيارة العميل</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: #334155; cursor: pointer; padding: 6px 10px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px;">
                <input type="radio" name="rejectReasonOpt" value="تلف أو عيب مصنعي في القطعة المتبقية بالمستودع" />
                <span>تلف أو عيب مصنعي في القطعة بالمستودع</span>
              </label>
            </div>
          </div>

          <div>
            <label style="font-size: 0.82rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">سبب آخر أو تفاصيل:</label>
            <input type="text" id="customRejectNote" placeholder="اكتب توضيحاً للعميل..." style="width: 100%; height: 38px; padding: 0 10px; border: 1.5px solid #CBD5E1; border-radius: 10px; font-family: inherit; font-size: 0.84rem; outline: none; box-sizing: border-box;" />
          </div>

          <div style="display: flex; gap: 8px; margin-top: 6px;">
            <button 
              type="button" 
              onclick="
                const selected = document.querySelector('input[name=rejectReasonOpt]:checked').value;
                const note = document.getElementById('customRejectNote').value.trim();
                const reason = note ? (selected + ' - ' + note) : selected;
                KafuMerchantOrders.rejectOrder('${orderId}', reason);
                document.getElementById('subActionModalContainer').remove();
                if (window.KafuApp && KafuApp.showToast) KafuApp.showToast('تم رفض الطلب وإشعار العميل');
                KafuMerchantOrders.refreshOrdersModal();
              "
              style="flex: 1; height: 42px; background: #DC2626; color: #FFFFFF; border: none; border-radius: 12px; font-size: 0.88rem; font-weight: 800; cursor: pointer;"
            >
              تأكيد الرفض والإلغاء
            </button>
            <button 
              type="button" 
              onclick="document.getElementById('subActionModalContainer').remove()"
              style="flex: 1; height: 42px; background: #F1F5F9; color: #475569; border: none; border-radius: 12px; font-size: 0.88rem; font-weight: 700; cursor: pointer;"
            >
              تراجع
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // 7. نافذة المراجعة الشاملة وتفاصيل الفاتورة (Review Details Modal)
  openReviewModal(orderId) {
    const order = this.getOrder(orderId);
    if (!order) return;

    const modalHtml = `
      <div id="subActionModalContainer" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px;">
        <div style="background: #FFFFFF; width: 100%; max-width: 480px; max-height: 85vh; overflow-y: auto; border-radius: 24px; padding: 22px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25); display: flex; flex-direction: column; gap: 14px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #EDF2F7; padding-bottom: 10px;">
            <div>
              <strong style="font-size: 1.1rem; color: #0A2540;">تفاصيل الطلب والفاتورة</strong>
              <div style="font-size: 0.76rem; color: #64748B;">طلب رقم: <span style="font-family: monospace; font-weight: 800; color: #0066FF;">${order.id}</span></div>
            </div>
            <button onclick="document.getElementById('subActionModalContainer').remove()" style="background: none; border: none; font-size: 1.2rem; color: #64748B; cursor: pointer;">✕</button>
          </div>

          <!-- تفاصيل العميل والوجهة -->
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 12px; font-size: 0.82rem; line-height: 1.5;">
            <div style="font-weight: 700; color: #0F172A; margin-bottom: 4px;">بيانات المشتري والتسليم:</div>
            <div>اسم العميل: <strong>${order.customer.name}</strong></div>
            <div>رقم الجوال: <strong dir="ltr">${order.customer.phone}</strong></div>
            <div>العنوان: ${order.customer.city} - ${order.customer.district} (${order.customer.address})</div>
          </div>

          <!-- تفاصيل المركبة والمطابقة -->
          <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 12px; font-size: 0.82rem; line-height: 1.5;">
            <div style="font-weight: 700; color: #0369A1; margin-bottom: 4px;">بيانات فحص الهيكل (VIN Check):</div>
            <div>السيارة: <strong>${order.car.displayName}</strong></div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 2px;">
              <span>رقم الشاسيه (VIN):</span>
              <strong style="font-family: monospace; background: #FFFFFF; padding: 2px 8px; border-radius: 6px; border: 1px solid #BAE6FD;">${order.car.vin}</strong>
            </div>
            <div style="color: #15803D; font-weight: 700; margin-top: 4px;">✓ تم التحقق: القطعة مطابقة 100% مع كتالوج المصنع</div>
          </div>

          <!-- الفاتورة والأسعار -->
          <div style="border: 1px solid #E2E8F0; border-radius: 12px; padding: 12px; font-size: 0.82rem;">
            <div style="font-weight: 700; color: #0F172A; margin-bottom: 6px;">بيانات القطعة والحساب المالي:</div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span>القطعة: ${order.part.name}</span>
              <span>× ${order.part.quantity}</span>
            </div>
            <div style="display: flex; justify-content: space-between; color: #64748B; margin-bottom: 4px;">
              <span>كود المصنع OEM:</span>
              <span style="font-family: monospace;">${order.part.oem}</span>
            </div>
            <div style="display: flex; justify-content: space-between; color: #64748B; margin-bottom: 4px;">
              <span>السعر قبل الضريبة:</span>
              <span>${order.part.unitPrice} ر.س</span>
            </div>
            <div style="display: flex; justify-content: space-between; color: #64748B; margin-bottom: 4px;">
              <span>ضريبة القيمة المضافة (15%):</span>
              <span>${order.part.tax} ر.س</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 0.95rem; color: #0066FF; padding-top: 6px; border-top: 1px solid #EDF2F7; margin-top: 6px;">
              <span>المجموع الإجمالي المطلوب:</span>
              <span>${order.part.total} ر.س</span>
            </div>
          </div>

          <!-- سجل حركات الطلب (Timeline) -->
          <div>
            <div style="font-weight: 700; font-size: 0.85rem; color: #0F172A; margin-bottom: 8px;">سجل حركات وتتبع الطلب:</div>
            <div style="display: flex; flex-direction: column; gap: 8px; border-right: 2px solid #0066FF; padding-right: 12px;">
              ${order.timeline.map(t => `
                <div style="font-size: 0.80rem; line-height: 1.3;">
                  <span style="color: #0066FF; font-weight: 700;">[${t.time}]</span>
                  <span style="color: #334155;">${t.text}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <button 
            type="button" 
            onclick="document.getElementById('subActionModalContainer').remove()"
            style="width: 100%; height: 40px; background: #0066FF; color: #FFFFFF; border: none; border-radius: 12px; font-size: 0.88rem; font-weight: 700; cursor: pointer; margin-top: 4px;"
          >
            إغلاق التفاصيل
          </button>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
};

window.KafuMerchantOrders = KafuMerchantOrders;
