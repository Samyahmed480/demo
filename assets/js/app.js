/**
 * كفو (Kafu) - دوال الواجهة المشتركة وشريط التنقل مع تبويب "المكتبة"
 */

const KafuApp = {
  // أيقونات SVG دقيقة وموحدة
  ICONS: {
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    scan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>`,
    cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18.5" r="2.5"/><circle cx="7" cy="18.5" r="2.5"/></svg>`,
    chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
    bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
  },

  // بناء شريط التنقل السفلي - الترتيب من اليمين لليسار: الرئيسية، البحث، المفضلة، السلة، الملف الشخصي
  renderBottomNav(activeTab = 'home') {
    const cartCount = KafuStore.getCartCount();
    const badgeHtml = cartCount > 0 ? `<span class="badge-count" id="cartBadgeCount">${cartCount}</span>` : `<span class="badge-count" id="cartBadgeCount" style="display:none">0</span>`;

    const navHtml = `
      <div class="bottom-nav-wrap">
        <nav class="bottom-nav" aria-label="التنقل الرئيسي">
          <!-- 1. الرئيسية (أقصى اليمين في RTL) -->
          <a href="index.html" class="nav-tab ${activeTab === 'home' ? 'active' : ''}" title="الرئيسية">
            ${this.ICONS.home}
          </a>
          <!-- 2. البحث -->
          <a href="search.html" class="nav-tab ${activeTab === 'search' ? 'active' : ''}" title="البحث">
            ${this.ICONS.search}
          </a>
          <!-- 3. المفضلة -->
          <a href="account.html?modal=favorites" class="nav-tab ${activeTab === 'favorites' || activeTab === 'star' ? 'active' : ''}" title="المفضلة">
            ${this.ICONS.star}
          </a>
          <!-- 4. السلة -->
          <a href="cart.html" class="nav-tab ${activeTab === 'cart' ? 'active' : ''}" title="السلة" style="position: relative;">
            ${badgeHtml}
            ${this.ICONS.cart}
          </a>
          <!-- 5. الملف الشخصي (أقصى اليسار في RTL) -->
          <a href="account.html" class="nav-tab ${activeTab === 'account' || activeTab === 'profile' ? 'active' : ''}" title="الملف الشخصي">
            ${this.ICONS.user}
          </a>
        </nav>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', navHtml);

    // تحديث فوري لعداد السلة
    window.addEventListener('kafu_store_update', (e) => {
      if (e.detail.key === 'cart') {
        const count = KafuStore.getCartCount();
        const badge = document.getElementById('cartBadgeCount');
        if (badge) {
          badge.textContent = count;
          badge.style.display = count > 0 ? 'flex' : 'none';
        }
      }
    });
  },

  showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="color: #22C55E; display: flex;">${this.ICONS.check}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3200);
  },

  initVehicleModal() {
    const existingModal = document.getElementById('vehicleModal');
    if (existingModal) return;

    const modalHtml = `
      <div class="sheet-backdrop" id="vehicleModal">
        <div class="bottom-sheet" style="max-height: 85vh;">
          <div class="sheet-header">
            <div class="sheet-title-col">
              <h3 class="sheet-title">حدد سيارتك</h3>
              <p class="sheet-subtitle">اختر الشركة والموديل وسنة الصنع لمطابقة القطع بدقة 100%.</p>
            </div>
            <button class="btn-close-sheet" id="closeVehicleModal" aria-label="إغلاق">
              ${this.ICONS.close}
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label style="font-size: 0.88rem; font-weight: 700; color: var(--text); display: block; margin-bottom: 8px;">1. الشركة المصنعة (الماركة)</label>
              <select id="vehicleMakeSelect" style="width: 100%; height: 50px; background: rgba(0,0,0,0.03); border: 1.5px solid rgba(0,0,0,0.1); border-radius: var(--radius-md); padding: 0 16px; font-weight: 600; color: var(--text);">
                <option value="">اختر الشركة...</option>
                ${CARS_DATABASE.map(c => `<option value="${c.make}">${c.make}</option>`).join('')}
              </select>
            </div>

            <div>
              <label style="font-size: 0.88rem; font-weight: 700; color: var(--text); display: block; margin-bottom: 8px;">2. موديل السيارة</label>
              <select id="vehicleModelSelect" disabled style="width: 100%; height: 50px; background: rgba(0,0,0,0.03); border: 1.5px solid rgba(0,0,0,0.1); border-radius: var(--radius-md); padding: 0 16px; font-weight: 600; color: var(--text); opacity: 0.6;">
                <option value="">اختر الماركة أولاً</option>
              </select>
            </div>

            <div>
              <label style="font-size: 0.88rem; font-weight: 700; color: var(--text); display: block; margin-bottom: 8px;">3. سنة الصنع</label>
              <select id="vehicleYearSelect" disabled style="width: 100%; height: 50px; background: rgba(0,0,0,0.03); border: 1.5px solid rgba(0,0,0,0.1); border-radius: var(--radius-md); padding: 0 16px; font-weight: 600; color: var(--text); opacity: 0.6;">
                <option value="">اختر الموديل أولاً</option>
                ${CAR_YEARS.map(y => `<option value="${y}">${y}</option>`).join('')}
              </select>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 10px;">
              <button class="btn-primary" id="btnSaveVehicle" style="flex: 2;" disabled>
                حفظ السيارة والمطابقة
              </button>
              <button class="btn-secondary" id="btnClearVehicle" style="flex: 1; border-color: rgba(255, 59, 48, 0.3); color: var(--danger);">
                إلغاء التحديد
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const backdrop = document.getElementById('vehicleModal');
    const closeBtn = document.getElementById('closeVehicleModal');
    const makeSelect = document.getElementById('vehicleMakeSelect');
    const modelSelect = document.getElementById('vehicleModelSelect');
    const yearSelect = document.getElementById('vehicleYearSelect');
    const saveBtn = document.getElementById('btnSaveVehicle');
    const clearBtn = document.getElementById('btnClearVehicle');

    const updateControls = () => {
      const selectedMake = makeSelect.value;
      if (selectedMake) {
        const found = CARS_DATABASE.find(c => c.make === selectedMake);
        if (found) {
          modelSelect.innerHTML = `<option value="">اختر الموديل...</option>` + found.models.map(m => `<option value="${m}">${m}</option>`).join('');
          modelSelect.disabled = false;
          modelSelect.style.opacity = '1';
        }
      } else {
        modelSelect.innerHTML = `<option value="">اختر الماركة أولاً</option>`;
        modelSelect.disabled = true;
        modelSelect.style.opacity = '0.6';
      }

      const canYear = !modelSelect.disabled && modelSelect.value;
      yearSelect.disabled = !canYear;
      yearSelect.style.opacity = canYear ? '1' : '0.6';

      saveBtn.disabled = !(makeSelect.value && modelSelect.value && yearSelect.value);
    };

    makeSelect.addEventListener('change', updateControls);
    modelSelect.addEventListener('change', updateControls);
    yearSelect.addEventListener('change', updateControls);

    closeBtn.addEventListener('click', () => backdrop.classList.remove('active'));
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });

    saveBtn.addEventListener('click', () => {
      const car = {
        make: makeSelect.value,
        model: modelSelect.value,
        year: yearSelect.value
      };
      KafuStore.setSelectedCar(car);
      backdrop.classList.remove('active');
      KafuApp.showToast(`تم تعيين سيارتك: ${car.displayName || (car.make + ' ' + car.model + ' ' + car.year)}`);
    });

    clearBtn.addEventListener('click', () => {
      KafuStore.clearSelectedCar();
      makeSelect.value = '';
      modelSelect.value = '';
      yearSelect.value = '';
      updateControls();
      backdrop.classList.remove('active');
      KafuApp.showToast('تم إلغاء تحديد السيارة');
    });
  },

  openVehicleModal() {
    this.initVehicleModal();
    const backdrop = document.getElementById('vehicleModal');
    const currentCar = KafuStore.getSelectedCar();
    if (currentCar && currentCar.make) {
      const makeSelect = document.getElementById('vehicleMakeSelect');
      const modelSelect = document.getElementById('vehicleModelSelect');
      const yearSelect = document.getElementById('vehicleYearSelect');
      const saveBtn = document.getElementById('btnSaveVehicle');

      makeSelect.value = currentCar.make;
      const found = CARS_DATABASE.find(c => c.make === currentCar.make);
      if (found) {
        modelSelect.innerHTML = `<option value="">اختر الموديل...</option>` + found.models.map(m => `<option value="${m}">${m}</option>`).join('');
        modelSelect.disabled = false;
        modelSelect.style.opacity = '1';
        modelSelect.value = currentCar.model || '';
      }
      yearSelect.disabled = false;
      yearSelect.style.opacity = '1';
      yearSelect.value = currentCar.year || '';
      saveBtn.disabled = !(makeSelect.value && modelSelect.value && yearSelect.value);
    }
    backdrop.classList.add('active');
  },

  bindVehicleCard(cardElement) {
    if (!cardElement) return;

    const refresh = () => {
      const car = KafuStore.getSelectedCar();
      const textElem = cardElement.querySelector('.vehicle-active-name');
      if (textElem) {
        if (car && car.make) {
          textElem.textContent = car.displayName || `${car.make} ${car.model} ${car.year}`;
        } else {
          textElem.textContent = 'Toyota Camry 2025';
        }
      }
    };

    refresh();
    cardElement.addEventListener('click', () => this.openVehicleModal());
    window.addEventListener('kafu_store_update', (e) => {
      if (e.detail.key === 'car') refresh();
    });
  }
};
