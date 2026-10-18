/**
 * كفو (Kafu) - نظام إدارة المخزون والمستودع الشامل للتجار
 * يتضمن:
 * 1. التحكم الكامل بالكميات (زيادة +، نقصان -، توريد شحنة، خصم تالف)
 * 2. إدارة الأسعار، تكلفة الشراء، وهامش الربح
 * 3. تحديد مواقع الأرفف في المستودع (Bin Location) وتنبيهات انخفاض المخزون
 * 4. سجل حركات الدخول والخروج (Stock Audit Log)
 * 5. فلاتر التوفر وبحث ذكي مع حفظ دائم في LocalStorage
 */

const KafuMerchantInventory = {
  STORAGE_KEY: 'kafu_merchant_inventory_full',
  activeTab: 'all',
  searchQuery: '',

  // القائمة الافتراضية الغنية للقطع في المستودع
  defaultItems: [
    {
      id: 'prod-piston-camry',
      name: 'طقم مكبس محرك كامل (Complete Engine Piston Set)',
      oem: 'OP010-13101',
      brand: 'تويوتا (Toyota)',
      model: 'كامري (Camry)',
      year: '2020 – 2024',
      engine: '2.5L Dynamic Force',
      position: 'المحرك (Engine Block)',
      condition: 'أصلي وكالة (Genuine OEM)',
      binLocation: 'مستودع A - رف 14',
      price: 480,
      costPrice: 360,
      quantity: 14,
      minQuantityAlert: 5,
      category: 'المحرك والملحقات',
      warranty: 'ضمان سنة كاملة',
      isOnline: true,
      logs: [
        { date: 'اليوم 10:15 ص', type: 'out', change: -1, note: 'بيع في طلب ORD-8918', by: 'نظام المبيعات' },
        { date: 'أمس 02:30 م', type: 'in', change: +10, note: 'شحنة توريد من الوكيل المعتمد (فاتورة #INV-9901)', by: 'محمد أحمد' }
      ]
    },
    {
      id: 'prod-brakes-camry',
      name: 'فحمات / قماشات الفرامل الأمامية أصلية (Front Brake Pads)',
      oem: '04465-33480',
      brand: 'تويوتا (Toyota)',
      model: 'كامري (Camry)',
      year: '2021 – 2023',
      engine: '2.5L',
      position: 'أمامي (Front)',
      condition: 'أصلي وكالة (Genuine OEM)',
      binLocation: 'مستودع A - رف 08',
      price: 195,
      costPrice: 145,
      quantity: 28,
      minQuantityAlert: 8,
      category: 'نظام الفرامل',
      warranty: 'ضمان 6 أشهر',
      isOnline: true,
      logs: [
        { date: 'اليوم 10:46 ص', type: 'out', change: -1, note: 'بيع في طلب ORD-8921', by: 'نظام المبيعات' },
        { date: 'منذ يومين', type: 'in', change: +20, note: 'توريد دفعة جديدة من الموزع', by: 'مسؤول المستودع' }
      ]
    },
    {
      id: 'prod-oilfilter-toyota',
      name: 'فلتر زيت محرك أصلي وكالة (Genuine Oil Filter)',
      oem: '04152-YZZA1',
      brand: 'تويوتا (Toyota)',
      model: 'كامري / هايلاندر / راف 4',
      year: '2018 – 2024',
      engine: '2.5L / 3.5L',
      position: 'المحرك',
      condition: 'أصلي وكالة',
      binLocation: 'مستودع B - رف 02',
      price: 35,
      costPrice: 24,
      quantity: 45,
      minQuantityAlert: 15,
      category: 'الفلاتر والصيانة السريعة',
      warranty: 'أصلي 100%',
      isOnline: true,
      logs: [
        { date: 'أمس 04:30 م', type: 'out', change: -1, note: 'بيع في طلب ORD-8889', by: 'نظام المبيعات' }
      ]
    },
    {
      id: 'prod-shocks-mazda',
      name: 'مساعدات هيدروليك أمامية طقم 2 حبة (Front Shock Absorber Pair)',
      oem: 'GHP9-34-700',
      brand: 'مازدا (Mazda)',
      model: 'مازدا 6 (Mazda 6)',
      year: '2018 – 2023',
      engine: '2.5L SkyActiv',
      position: 'أمامي طقم (يمين ويسار)',
      condition: 'ياباني درجة أولى معتمد',
      binLocation: 'مستودع C - أرضية 04',
      price: 750,
      costPrice: 580,
      quantity: 4, // منخفض - قارب على النفاد
      minQuantityAlert: 5,
      category: 'نظام التعليق والمساعدات',
      warranty: 'ضمان سنة كاملة',
      isOnline: true,
      logs: [
        { date: 'اليوم 08:10 ص', type: 'out', change: -1, note: 'بيع في طلب ORD-8915', by: 'نظام المبيعات' }
      ]
    },
    {
      id: 'prod-headlight-patrol',
      name: 'شمعة إضاءة ليد أمامية يمين أصلية (Front LED Headlight RH)',
      oem: '26010-6GM0A',
      brand: 'نيسان (Nissan)',
      model: 'باترول (Patrol Y62)',
      year: '2020 – 2024',
      engine: 'V8 5.6L',
      position: 'أمامي يمين',
      condition: 'أصلي وكالة (Genuine Nissan)',
      binLocation: 'مستودع VIP - خزانة 01',
      price: 1850,
      costPrice: 1450,
      quantity: 2, // منخفض جداً
      minQuantityAlert: 3,
      category: 'الإنارة والكهرباء',
      warranty: 'ضمان 6 أشهر',
      isOnline: true,
      logs: [
        { date: 'اليوم 07:30 ص', type: 'out', change: -1, note: 'بيع في طلب ORD-8902', by: 'نظام المبيعات' }
      ]
    },
    {
      id: 'prod-compressor-kia',
      name: 'كمبروسر مكيف أصلي كامل مع الكلتش (AC Compressor Complete)',
      oem: '97701-3R000',
      brand: 'كيا (Kia)',
      model: 'كادينزا (Cadenza)',
      year: '2017 – 2020',
      engine: '3.3L V6',
      position: 'المحرك - نظام التكييف',
      condition: 'أصلي وكالة',
      binLocation: 'مستودع A - رف 19',
      price: 1100,
      costPrice: 850,
      quantity: 0, // نفد بالكامل
      minQuantityAlert: 2,
      category: 'التكييف والتبريد',
      warranty: 'ضمان 6 أشهر',
      isOnline: false,
      logs: [
        { date: 'أمس 11:25 ص', type: 'out', change: -1, note: 'بيع آخر قطعة بالمستودع', by: 'نظام المبيعات' }
      ]
    }
  ],

  getRoleContext() {
    const roleId = (window.KafuStore && window.KafuStore.getRole) ? window.KafuStore.getRole() : 'merchant_new';
    const isRep = (roleId === 'rep_oem' || roleId === 'rep_scrap');
    return {
      roleId,
      isRep,
      fullPageUrl: isRep ? 'rep-inventory.html' : 'merchant-inventory.html',
      fullPageTitle: 'فتح لوحة المستودع بملء الشاشة',
      addBtnText: '+ إضافة قطعة جديدة للمخزون',
      searchPlaceholder: 'ابحث برقم OEM، اسم القطعة، الموديل، أو كود الرف في المستودع...'
    };
  },

  getStorageKey() {
    return this.STORAGE_KEY;
  },

  // جلب كافة قطع المخزون
  getAllItems() {
    const key = this.getStorageKey();
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        this.saveAllItems(this.defaultItems);
        return [...this.defaultItems];
      }
      const parsed = JSON.parse(raw);
      return parsed;
    } catch (e) {
      console.error('Error reading inventory:', e);
      return [...this.defaultItems];
    }
  },

  // حفظ القطع في التخزين
  saveAllItems(items) {
    const key = this.getStorageKey();
    localStorage.setItem(key, JSON.stringify(items));
  },

  // جلب قطعة برقم المعرف
  getItem(id) {
    return this.getAllItems().find(item => item.id === id) || null;
  },

  // حساب إحصائيات المخزون
  getStats() {
    const items = this.getAllItems();
    const totalTypes = items.length;
    let totalStockUnits = 0;
    let totalStockValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    items.forEach(item => {
      const q = item.quantity || 0;
      totalStockUnits += q;
      totalStockValue += (item.price || 0) * q;
      if (q === 0) {
        outOfStockCount++;
      } else if (q <= (item.minQuantityAlert || 5)) {
        lowStockCount++;
      }
    });

    return {
      totalTypes,
      totalStockUnits,
      totalStockValue,
      inStockCount: items.filter(i => (i.quantity || 0) > 0).length,
      lowStockCount,
      outOfStockCount
    };
  },

  // 1. زيادة أو إنقاص سريع بالكمية (+1 / -1)
  adjustQuantity(itemId, delta, reason = 'تعديل يدوي من التاجر') {
    const items = this.getAllItems();
    const idx = items.findIndex(i => i.id === itemId);
    if (idx === -1) return false;

    const item = items[idx];
    const prev = item.quantity || 0;
    const next = Math.max(0, prev + delta);
    item.quantity = next;

    if (!item.logs) item.logs = [];
    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    item.logs.unshift({
      date: `اليوم ${now}`,
      type: delta >= 0 ? 'in' : 'out',
      change: delta,
      note: reason,
      by: 'التاجر'
    });

    this.saveAllItems(items);
    return item;
  },

  // 2. تسجيل شحنة توريد واردة بكمية محددة
  stockIn(itemId, addedQty, invoiceNo, supplier) {
    const items = this.getAllItems();
    const idx = items.findIndex(i => i.id === itemId);
    if (idx === -1) return false;

    const item = items[idx];
    const qty = parseInt(addedQty, 10) || 0;
    if (qty <= 0) return false;

    item.quantity = (item.quantity || 0) + qty;
    if (!item.logs) item.logs = [];

    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    const noteText = `توريد شحنة جديدة +${qty} قطعة ${invoiceNo ? `(فاتورة #${invoiceNo})` : ''} ${supplier ? `من: ${supplier}` : ''}`;
    
    item.logs.unshift({
      date: `اليوم ${now}`,
      type: 'in',
      change: +qty,
      note: noteText,
      by: 'التاجر'
    });

    this.saveAllItems(items);
    return item;
  },

  // 3. خصم تالف / عادم / مفقود
  stockOut(itemId, deductedQty, reason) {
    const items = this.getAllItems();
    const idx = items.findIndex(i => i.id === itemId);
    if (idx === -1) return false;

    const item = items[idx];
    const qty = parseInt(deductedQty, 10) || 0;
    if (qty <= 0) return false;

    item.quantity = Math.max(0, (item.quantity || 0) - qty);
    if (!item.logs) item.logs = [];

    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    item.logs.unshift({
      date: `اليوم ${now}`,
      type: 'out',
      change: -qty,
      note: `خصم يدوي / عادم (-${qty}): ${reason || 'غير محدد'}`,
      by: 'التاجر'
    });

    this.saveAllItems(items);
    return item;
  },

  // 4. تحديث السعر وموقع الرف والبيانات
  updateItemDetails(itemId, updatedData) {
    const items = this.getAllItems();
    const idx = items.findIndex(i => i.id === itemId);
    if (idx === -1) return false;

    const item = items[idx];
    Object.assign(item, updatedData);

    this.saveAllItems(items);
    return item;
  },

  // 5. توليد كود HTML الكامل لمودال المخزون الشامل
  renderModalContent(activeTab = 'all', searchQuery = '') {
    this.activeTab = activeTab;
    this.searchQuery = searchQuery;
    const stats = this.getStats();
    const ctx = this.getRoleContext();

    let items = this.getAllItems();

    // تطبيق الفلترة حسب الحالة
    if (activeTab === 'in_stock') {
      items = items.filter(i => (i.quantity || 0) > (i.minQuantityAlert || 5));
    } else if (activeTab === 'low_stock') {
      items = items.filter(i => (i.quantity || 0) > 0 && (i.quantity || 0) <= (i.minQuantityAlert || 5));
    } else if (activeTab === 'out_of_stock') {
      items = items.filter(i => (i.quantity || 0) === 0);
    }

    // تطبيق البحث الحي
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.oem.toLowerCase().includes(q) ||
        (i.model && i.model.toLowerCase().includes(q)) ||
        (i.binLocation && i.binLocation.toLowerCase().includes(q)) ||
        (i.brand && i.brand.toLowerCase().includes(q))
      );
    }

    return `
      <div class="merchant-inventory-wrapper" style="display: flex; flex-direction: column; gap: 14px; font-family: inherit;">

        <!-- 1. شريط الإحصائيات المالية ورؤوس الأرقام العلوية -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
          
          <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 10px; text-align: center;">
            <div style="font-size: 0.72rem; color: #64748B; font-weight: 700; margin-bottom: 2px;">إجمالي قطع المستودع</div>
            <strong style="font-size: 1.25rem; font-weight: 900; color: #0F172A;" class="font-num">${stats.totalStockUnits}</strong>
            <span style="font-size: 0.70rem; color: #64748B; display: block;">قطعة متوفرة</span>
          </div>

          <div style="background: #EFF6FF; border: 1.5px solid #BFDBFE; border-radius: 14px; padding: 10px; text-align: center;">
            <div style="font-size: 0.72rem; color: #0066FF; font-weight: 700; margin-bottom: 2px;">قيمة المخزون المقدرة</div>
            <strong style="font-size: 1.2rem; font-weight: 900; color: #0066FF;" class="font-num">${stats.totalStockValue.toLocaleString('ar-SA')}</strong>
            <span style="font-size: 0.70rem; color: #0284C7; display: block;">ر.س (سعر البيع)</span>
          </div>

          <div style="background: ${stats.lowStockCount + stats.outOfStockCount > 0 ? '#FEF2F2' : '#F0FDF4'}; border: 1.5px solid ${stats.lowStockCount + stats.outOfStockCount > 0 ? '#FECACA' : '#BBF7D0'}; border-radius: 14px; padding: 10px; text-align: center;">
            <div style="font-size: 0.72rem; color: ${stats.lowStockCount + stats.outOfStockCount > 0 ? '#DC2626' : '#15803D'}; font-weight: 700; margin-bottom: 2px;">تنبيهات النواقص</div>
            <strong style="font-size: 1.25rem; font-weight: 900; color: ${stats.lowStockCount + stats.outOfStockCount > 0 ? '#DC2626' : '#15803D'};" class="font-num">${stats.lowStockCount + stats.outOfStockCount}</strong>
            <span style="font-size: 0.70rem; color: ${stats.lowStockCount + stats.outOfStockCount > 0 ? '#B91C1C' : '#047857'}; display: block;">تحتاج إعادة طلب</span>
          </div>

        </div>

        <!-- أزرار الإجراءات السريعة (إضافة قطعة جديدة + فتح بشاشة كاملة) -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
          <button 
            type="button" 
            onclick="closeActionModal(); setTimeout(() => openAddProductPriceModal(), 180);"
            style="padding: 7px 14px; background: linear-gradient(90deg, #0056E0 0%, #0066FF 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.82rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(0, 102, 255, 0.25);"
          >
            <span>${ctx.addBtnText}</span>
          </button>

          <a 
            href="${ctx.fullPageUrl}" 
            target="_blank" 
            style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.78rem; font-weight: 700; color: #0066FF; text-decoration: none; padding: 5px 10px; background: #EFF6FF; border-radius: 8px; border: 1px solid #BFDBFE;"
          >
            <span>${ctx.fullPageTitle}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>

        <!-- حقل البحث الفوري في المخزون -->
        <div style="position: relative; width: 100%;">
          <input 
            type="text" 
            placeholder="${ctx.searchPlaceholder}" 
            value="${this.searchQuery}" 
            oninput="KafuMerchantInventory.handleSearch(this.value)"
            style="width: 100%; height: 40px; padding: 0 38px 0 12px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 12px; font-size: 0.84rem; font-family: inherit; outline: none; box-sizing: border-box;"
          />
          <span style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #94A3B8; pointer-events: none;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          ${this.searchQuery ? `
            <button onclick="KafuMerchantInventory.handleSearch('')" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #94A3B8; cursor: pointer; font-size: 0.9rem;">✕</button>
          ` : ''}
        </div>

        <!-- فلاتر تبويبات حالات التوفر -->
        <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none;">
          ${this.renderTab('all', 'الكل', stats.totalTypes)}
          ${this.renderTab('in_stock', 'متوفر بوفرة', stats.inStockCount - stats.lowStockCount, '#15803D', '#DCFCE7')}
          ${this.renderTab('low_stock', 'قارب على النفاد', stats.lowStockCount, '#B45309', '#FEF3C7')}
          ${this.renderTab('out_of_stock', 'نفد بالكامل', stats.outOfStockCount, '#B91C1C', '#FEE2E2')}
        </div>

        <!-- قائمة كروت القطع مع أزرار التحكم بالكمية (+ / -) والتوريد -->
        <div id="merchantInventoryCardsStack" style="display: flex; flex-direction: column; gap: 12px; max-height: 55vh; overflow-y: auto; padding-right: 2px;">
          ${items.length > 0 ? items.map(item => this.renderItemCard(item)).join('') : `
            <div style="text-align: center; padding: 30px 14px; background: #F8FAFC; border: 1.5px dashed #CBD5E1; border-radius: 16px; color: #64748B;">
              <div style="font-size: 1.8rem; margin-bottom: 6px;">📦</div>
              <strong style="color: #0F172A; font-size: 0.92rem; display: block; margin-bottom: 4px;">لم يتم العثور على قطع مطابقة</strong>
              <span style="font-size: 0.80rem;">جرب كتابة كود OEM آخر أو أضف قطعة جديدة إلى المستودع.</span>
            </div>
          `}
        </div>

      </div>
    `;
  },

  // رسم زر التبويب
  renderTab(key, label, count, color = '#475569', bg = '#F1F5F9') {
    const isActive = this.activeTab === key;
    return `
      <button 
        type="button" 
        onclick="KafuMerchantInventory.switchTab('${key}')"
        style="
          display: inline-flex; 
          align-items: center; 
          gap: 6px; 
          padding: 6px 12px; 
          border-radius: 999px; 
          font-family: inherit; 
          font-size: 0.80rem; 
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
        <span style="padding: 2px 6px; border-radius: 999px; font-size: 0.70rem; font-weight: 800; background: ${isActive ? '#0066FF' : bg}; color: ${isActive ? '#FFFFFF' : color};">${count}</span>
      </button>
    `;
  },

  // رسم بطاقة قطعة واحدة في المخزون مع التحكم الفوري في الكمية
  renderItemCard(item) {
    const qty = item.quantity || 0;
    const isOut = qty === 0;
    const isLow = !isOut && qty <= (item.minQuantityAlert || 5);

    let badgeText = 'متوفر بالمستودع';
    let badgeColor = '#15803D';
    let badgeBg = '#DCFCE7';
    let badgeBorder = '#BBF7D0';

    if (isOut) {
      badgeText = 'نفد من المخزون (غير متوفر)';
      badgeColor = '#B91C1C';
      badgeBg = '#FEF2F2';
      badgeBorder = '#FECACA';
    } else if (isLow) {
      badgeText = `قارب على النفاد (متبقي ${qty} فقط)`;
      badgeColor = '#B45309';
      badgeBg = '#FEF3C7';
      badgeBorder = '#FDE68A';
    }

    return `
      <div class="inventory-item-card" id="inv-card-${item.id}" style="background: #FFFFFF; border: 1.6px solid ${isOut ? '#FECACA' : (isLow ? '#FDE68A' : '#E2E8F0')}; border-radius: 18px; padding: 14px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03); display: flex; flex-direction: column; gap: 10px;">
        
        <!-- رأس كرت القطعة: الاسم والشارة والحالة -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
          <div>
            <div style="font-weight: 800; font-size: 0.96rem; color: #0A2540; line-height: 1.3; margin-bottom: 2px;">
              ${item.name}
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 0.76rem; color: #64748B;">
              <span style="font-family: monospace; font-weight: 800; background: #F1F5F9; color: #0066FF; padding: 2px 7px; border-radius: 6px;">OEM: ${item.oem}</span>
              <span>${item.brand || ''} ${item.model || ''}</span>
              <span style="color: #94A3B8;">·</span>
              <span style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 2px 6px; border-radius: 6px;">${item.binLocation || 'مستودع رئيسي'}</span>
            </div>
          </div>

          <span style="background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder}; padding: 3px 8px; border-radius: 999px; font-size: 0.72rem; font-weight: 800; white-space: nowrap; flex-shrink: 0;">
            ${badgeText}
          </span>
        </div>

        <!-- ===================================================================
             وحدة التحكم بالكمية المباشرة (+ / -) وشريط المستوى
             =================================================================== -->
        <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
          
          <div>
            <div style="font-size: 0.74rem; color: #64748B; font-weight: 700;">الكمية المتوفرة بالمستودع:</div>
            <div style="display: flex; align-items: baseline; gap: 4px;">
              <strong style="font-size: 1.35rem; font-weight: 900; color: ${isOut ? '#DC2626' : (isLow ? '#D97706' : '#0F172A')};" class="font-num">${qty}</strong>
              <span style="font-size: 0.78rem; color: #64748B;">قطعة</span>
            </div>
          </div>

          <!-- أزرار الزيادة والنقصان السريعة (+ / -) -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <button 
              type="button" 
              onclick="KafuMerchantInventory.handleQuickQty('${item.id}', -1)"
              style="width: 34px; height: 34px; border-radius: 10px; background: #FFFFFF; border: 1.5px solid #CBD5E1; color: #0F172A; font-size: 1.2rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s ease;"
              title="خصم حبة واحدة (-1)"
              ${qty === 0 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}
            >
              -
            </button>

            <span style="font-size: 0.85rem; font-weight: 800; min-width: 28px; text-align: center; color: #0F172A;" class="font-num">${qty}</span>

            <button 
              type="button" 
              onclick="KafuMerchantInventory.handleQuickQty('${item.id}', +1)"
              style="width: 34px; height: 34px; border-radius: 10px; background: #EFF6FF; border: 1.5px solid #BFDBFE; color: #0066FF; font-size: 1.2rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s ease;"
              title="إضافة حبة واحدة (+1)"
            >
              +
            </button>
          </div>

        </div>

        <!-- تذييل الكرت: السعر وأزرار التحكم الموسعة (توريد شحنة / تعديل السعر / سجل الحركات) -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; padding-top: 6px; border-top: 1px solid #F1F5F9;">
          
          <div>
            <div style="font-size: 0.70rem; color: #64748B;">سعر البيع للعميل</div>
            <strong style="font-size: 1.15rem; font-weight: 900; color: #0066FF;" class="font-num">${item.price} ر.س</strong>
          </div>

          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            
            <!-- زر توريد شحنة جديدة -->
            <button 
              type="button" 
              onclick="KafuMerchantInventory.openStockInModal('${item.id}')"
              style="padding: 6px 12px; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; color: #047857; font-size: 0.78rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"
              title="تسجيل وصول شحنة جديدة بكمية محددة"
            >
              <span>+ توريد شحنة 📦</span>
            </button>

            <!-- زر تعديل السعر والبيانات -->
            <button 
              type="button" 
              onclick="KafuMerchantInventory.openEditItemModal('${item.id}')"
              style="padding: 6px 10px; background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 8px; color: #475569; font-size: 0.78rem; font-weight: 700; cursor: pointer;"
              title="تعديل السعر وموقع الرف"
            >
              <span>تعديل ⚙️</span>
            </button>

            <!-- زر سجل حركات المخزون -->
            <button 
              type="button" 
              onclick="KafuMerchantInventory.openLogsModal('${item.id}')"
              style="padding: 6px 10px; background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 8px; color: #475569; font-size: 0.78rem; font-weight: 700; cursor: pointer;"
              title="عرض سجل الدخول والخروج والمبيعات"
            >
              <span>السجل 📋</span>
            </button>

          </div>

        </div>

      </div>
    `;
  },

  // ---------------------------------------------------------------------------
  // معالجات الأحداث والنوافذ التفاعلية
  // ---------------------------------------------------------------------------

  switchTab(tabKey) {
    this.activeTab = tabKey;
    this.refreshModal();
  },

  handleSearch(query) {
    this.searchQuery = query;
    this.refreshModal();
  },

  refreshModal() {
    const body = document.getElementById('actionModalBody');
    if (body) {
      body.innerHTML = this.renderModalContent(this.activeTab, this.searchQuery);
    }
  },

  handleQuickQty(itemId, delta) {
    const updated = this.adjustQuantity(itemId, delta, delta > 0 ? 'زيادة سريعة (+1)' : 'خصم يدوي سريع (-1)');
    if (updated) {
      this.refreshModal();
      if (window.KafuApp && KafuApp.showToast) {
        KafuApp.showToast(`تم تحديث كمية [${updated.name}] إلى ${updated.quantity} قطعة`);
      }
    }
  },

  // نافذة توريد شحنة جديدة (Stock In Modal)
  openStockInModal(itemId) {
    const item = this.getItem(itemId);
    if (!item) return;

    const modalHtml = `
      <div id="subActionModalContainer" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px;">
        <div style="background: #FFFFFF; width: 100%; max-width: 440px; border-radius: 24px; padding: 22px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25); display: flex; flex-direction: column; gap: 14px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">📦</span>
              <strong style="font-size: 1.1rem; color: #0F172A;">توريد شحنة جديدة للمستودع</strong>
            </div>
            <button onclick="document.getElementById('subActionModalContainer').remove()" style="background: none; border: none; font-size: 1.2rem; color: #64748B; cursor: pointer;">✕</button>
          </div>

          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 12px; font-size: 0.82rem;">
            <strong style="color: #0A2540; display: block;">${item.name}</strong>
            <span style="color: #0066FF; font-family: monospace;">OEM: ${item.oem}</span> · 
            <span style="color: #64748B;">الكمية الحالية: ${item.quantity} قطعة</span>
          </div>

          <div>
            <label style="font-size: 0.80rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 4px;">الكمية الواردة الجديدة (عدد القطع) *</label>
            <input type="number" id="stockInQty" placeholder="مثال: 15" class="form-input font-num" style="font-size: 1.1rem; font-weight: 800; color: #059669;" value="10" />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">رقم فاتورة الشراء</label>
              <input type="text" id="stockInInv" placeholder="INV-2024" class="form-input ltr" style="text-align: right; font-family: monospace;" />
            </div>
            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">المورد / المصدر</label>
              <input type="text" id="stockInSupplier" placeholder="وكالة عبداللطيف جميل" class="form-input" />
            </div>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 6px;">
            <button 
              type="button" 
              onclick="
                const qty = parseInt(document.getElementById('stockInQty').value, 10);
                const inv = document.getElementById('stockInInv').value.trim();
                const sup = document.getElementById('stockInSupplier').value.trim();
                KafuMerchantInventory.stockIn('${itemId}', qty, inv, sup);
                document.getElementById('subActionModalContainer').remove();
                KafuMerchantInventory.refreshModal();
                if (window.KafuApp && KafuApp.showToast) KafuApp.showToast('تمت إضافة ' + qty + ' قطعة إلى المخزون بنجاح ✓');
              "
              style="flex: 1; height: 42px; background: #059669; color: #FFFFFF; border: none; border-radius: 12px; font-size: 0.88rem; font-weight: 800; cursor: pointer;"
            >
              تأكيد إدخال الشحنة للمستودع
            </button>
            <button 
              type="button" 
              onclick="document.getElementById('subActionModalContainer').remove()"
              style="flex: 0.6; height: 42px; background: #F1F5F9; color: #475569; border: none; border-radius: 12px; font-size: 0.88rem; font-weight: 700; cursor: pointer;"
            >
              إلغاء
            </button>
          </div>

        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // نافذة تعديل السعر والبيانات (Edit Item Modal)
  openEditItemModal(itemId) {
    const item = this.getItem(itemId);
    if (!item) return;

    const modalHtml = `
      <div id="subActionModalContainer" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px;">
        <div style="background: #FFFFFF; width: 100%; max-width: 440px; border-radius: 24px; padding: 22px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25); display: flex; flex-direction: column; gap: 14px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">⚙️</span>
              <strong style="font-size: 1.1rem; color: #0F172A;">تعديل بيانات وسعر القطعة</strong>
            </div>
            <button onclick="document.getElementById('subActionModalContainer').remove()" style="background: none; border: none; font-size: 1.2rem; color: #64748B; cursor: pointer;">✕</button>
          </div>

          <div>
            <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">اسم القطعة</label>
            <input type="text" id="editItemName" value="${item.name}" class="form-input" />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">سعر البيع (ر.س) *</label>
              <input type="number" id="editItemPrice" value="${item.price}" class="form-input font-num" style="font-size: 1.1rem; font-weight: 900; color: #0066FF;" />
            </div>

            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">سعر التكلفة (ر.س)</label>
              <input type="number" id="editItemCost" value="${item.costPrice || 0}" class="form-input font-num" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">موقع الرف بالمستودع</label>
              <input type="text" id="editItemBin" value="${item.binLocation || ''}" placeholder="مستودع A - رف 12" class="form-input" />
            </div>

            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">حد تنبيه النقصان</label>
              <input type="number" id="editItemMin" value="${item.minQuantityAlert || 5}" class="form-input font-num" />
            </div>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 6px;">
            <button 
              type="button" 
              onclick="
                const newName = document.getElementById('editItemName').value.trim();
                const newPrice = parseFloat(document.getElementById('editItemPrice').value);
                const newCost = parseFloat(document.getElementById('editItemCost').value);
                const newBin = document.getElementById('editItemBin').value.trim();
                const newMin = parseInt(document.getElementById('editItemMin').value, 10);
                KafuMerchantInventory.updateItemDetails('${itemId}', {
                  name: newName,
                  price: newPrice,
                  costPrice: newCost,
                  binLocation: newBin,
                  minQuantityAlert: newMin
                });
                document.getElementById('subActionModalContainer').remove();
                KafuMerchantInventory.refreshModal();
                if (window.KafuApp && KafuApp.showToast) KafuApp.showToast('تم حفظ تعديلات القطعة بنجاح ✓');
              "
              style="flex: 1; height: 42px; background: #0066FF; color: #FFFFFF; border: none; border-radius: 12px; font-size: 0.88rem; font-weight: 800; cursor: pointer;"
            >
              حفظ التعديلات
            </button>
            <button 
              type="button" 
              onclick="document.getElementById('subActionModalContainer').remove()"
              style="flex: 0.6; height: 42px; background: #F1F5F9; color: #475569; border: none; border-radius: 12px; font-size: 0.88rem; font-weight: 700; cursor: pointer;"
            >
              إلغاء
            </button>
          </div>

        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // نافذة سجل حركات المخزون (Stock Logs Modal)
  openLogsModal(itemId) {
    const item = this.getItem(itemId);
    if (!item) return;

    const modalHtml = `
      <div id="subActionModalContainer" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px;">
        <div style="background: #FFFFFF; width: 100%; max-width: 460px; max-height: 80vh; overflow-y: auto; border-radius: 24px; padding: 22px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25); display: flex; flex-direction: column; gap: 14px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #EDF2F7; padding-bottom: 10px;">
            <div>
              <strong style="font-size: 1.05rem; color: #0A2540;">سجل حركات القطعة والمخزون</strong>
              <div style="font-size: 0.74rem; color: #64748B;">OEM: <span style="font-family: monospace; font-weight: 800; color: #0066FF;">${item.oem}</span></div>
            </div>
            <button onclick="document.getElementById('subActionModalContainer').remove()" style="background: none; border: none; font-size: 1.2rem; color: #64748B; cursor: pointer;">✕</button>
          </div>

          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 12px; font-size: 0.84rem;">
            <strong>${item.name}</strong>
            <div style="font-size: 0.78rem; color: #64748B; margin-top: 2px;">الكمية الحالية المتوفرة بالمستودع: <strong style="color: #0066FF;">${item.quantity} قطعة</strong></div>
          </div>

          <!-- قائمة الحركات الزمنية -->
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${(item.logs && item.logs.length > 0) ? item.logs.map(log => `
              <div style="padding: 10px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <div>
                  <div style="font-size: 0.82rem; font-weight: 700; color: #0F172A;">${log.note}</div>
                  <div style="font-size: 0.72rem; color: #64748B;">بواسطة: ${log.by} · ${log.date}</div>
                </div>
                <span style="font-size: 0.88rem; font-weight: 900; color: ${log.type === 'in' ? '#059669' : '#DC2626'}; direction: ltr;">
                  ${log.change > 0 ? '+' : ''}${log.change}
                </span>
              </div>
            `).join('') : `
              <div style="text-align: center; padding: 20px; color: #94A3B8; font-size: 0.82rem;">لا توجد حركات مسجلة مؤخراً</div>
            `}
          </div>

          <button 
            type="button" 
            onclick="document.getElementById('subActionModalContainer').remove()"
            style="width: 100%; height: 38px; background: #0066FF; color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.84rem; font-weight: 700; cursor: pointer;"
          >
            إغلاق
          </button>

        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
};

window.KafuMerchantInventory = KafuMerchantInventory;
