/**
 * كفو (Kafu) - دوال الواجهة المشتركة وشريط التنقل مع تبويب "المكتبة"
 */

const KafuApp = {
  // أيقونات SVG بريميوم فائقة الدقة والنعومة
  ICONS: {
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9.5z"/><path d="M9 22V12h6v10"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35"/></svg>`,
    scan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>`,
    cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1.25"/><circle cx="19" cy="21" r="1.25"/><path d="M2.05 2.05h2.4l2.5 12.2a2 2 0 0 0 1.96 1.6h9.8a2 2 0 0 0 1.96-1.6l1.5-7.4H5.2"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    ai: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>`,
    catalog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/><path d="M6 14h6"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18.5" r="2.5"/><circle cx="7" cy="18.5" r="2.5"/></svg>`,
    chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
    bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 2.5a14 14 0 0 0 0 19 14 14 0 0 0 0-19"/><path d="M2.5 12h19"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5-2.1 2.1m-6.8 6.8-2.1 2.1m11 0-2.1-2.1M6.6 6.6 4.5 8.7"/></svg>`,
    camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
    send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`
  },

  // بناء شريط التنقل السفلي المطور
  // الترتيب من اليمين لليسار في RTL:
  // 1. الرئيسية
  // 2. البحث بالعدسة (في المنتصف)
  // 3. الكتالوج / المكتبة
  // + زر علامة شات كفو AI عائم على الجنب
  renderBottomNav(activeTab = 'home') {
    const navHtml = `
      <div class="bottom-nav-wrap">
        <nav class="bottom-nav" aria-label="التنقل الرئيسي">
          <!-- 1. الرئيسية (أقصى اليمين في RTL) -->
          <a href="index.html" class="nav-tab ${activeTab === 'home' ? 'active' : ''}" title="الرئيسية" aria-label="الرئيسية">
            ${this.ICONS.home}
          </a>

          <!-- 2. البحث بالعدسة (في المنتصف) -->
          <a href="search.html" class="nav-tab ${activeTab === 'search' ? 'active' : ''}" title="البحث بالعدسة" aria-label="البحث بالعدسة">
            ${this.ICONS.search}
          </a>

          <!-- 3. الكتالوج أو المكتبة (أقصى اليسار في RTL) -->
          <a href="library.html" class="nav-tab ${activeTab === 'library' || activeTab === 'catalog' ? 'active' : ''}" title="الكتالوج والمكتبة" aria-label="الكتالوج والمكتبة">
            ${this.ICONS.catalog}
          </a>
        </nav>
      </div>

      <!-- زر علامة شات كفو AI العائم على الجنب -->
      <button type="button" class="ai-floating-chat-btn" id="btnFloatingAiChat" title="كفو AI - البحث الذكي والمحادثة" aria-label="كفو AI - محادثة الذكاء الاصطناعي">
        <div class="ai-floating-chat-icon">
          <span class="ai-floating-pulse"></span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
            <path d="m12 7-1 2.5L8.5 10.5 11 11.5 12 14l1-2.5 2.5-1-2.5-1Z"/>
          </svg>
        </div>
        <span class="ai-floating-label">كفو AI</span>
      </button>
    `;

    document.body.insertAdjacentHTML('beforeend', navHtml);

    // ربط نقرة زر AI العائم بالنافذة الذكية
    document.getElementById('btnFloatingAiChat')?.addEventListener('click', () => {
      this.openAiModal();
    });

    // تحديث أي عدادات سلة علوية تلقائياً
    this.updateCartBadges();
    window.addEventListener('kafu_store_update', (e) => {
      if (e.detail.key === 'cart') {
        this.updateCartBadges();
      }
    });
  },

  // تحديث عدادات السلة في الشريط العلوي
  updateCartBadges() {
    const count = KafuStore.getCartCount();
    const badges = document.querySelectorAll('#heroCartBadge, .header-cart-badge, #cartBadgeCount');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  // تجهيز واجهة ومودال البحث بالذكاء الاصطناعي (كفو AI)
  openAiModal() {
    let modal = document.getElementById('aiPartsModal');
    if (!modal) {
      const currentCar = KafuStore.getSelectedCar()?.displayName || 'Toyota Camry 2025';
      const modalHtml = `
        <div class="sheet-backdrop" id="aiPartsModal">
          <div class="ai-modal-sheet">
            <div class="ai-drag-handle"></div>

            <div class="ai-sheet-banner">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 42px; height: 42px; border-radius: 14px; background: var(--gradient-ai); color: #FFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(123, 92, 255, 0.35); flex-shrink: 0;">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>
                    <path d="M19 3v4"/>
                    <path d="M21 5h-4"/>
                  </svg>
                </div>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <h3 class="ai-title-gradient" style="margin: 0;">كفو AI</h3>
                    <span class="ai-badge-pill">
                      <span class="ai-sparkle-pulse-dot"></span>
                      جاهز للمطابقة الذكية
                    </span>
                  </div>
                  <p style="font-size: 0.77rem; color: var(--text-muted); margin: 3px 0 0;">البحث عن القطع وتشخيص الأعطال بالذكاء الاصطناعي</p>
                </div>
              </div>
              <button class="ai-close-btn" id="closeAiModal" title="إغلاق" aria-label="إغلاق">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>

            <!-- أسئلة وتلميحات سريعة -->
            <div>
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 8px;">اقتراحات سريعة لتجربة الذكاء الاصطناعي:</span>
              <div class="ai-chips-slider">
                <button type="button" class="ai-suggest-chip" data-query="عندي صوت طقطقة في المساعدات مع المطبات">
                  <span>صوت طقطقة مع المطبات</span>
                </button>
                <button type="button" class="ai-suggest-chip" data-query="فحمات فرامل سيراميك تويوتا كامري 2025">
                  <span>فحمات سيراميك للكامري</span>
                </button>
                <button type="button" class="ai-suggest-chip" data-query="مطابقة رقم الهيكل VIN مع الكتالوج">
                  <span>مطابقة رقم الهيكل (VIN)</span>
                </button>
                <button type="button" class="ai-suggest-chip" data-query="جدول صيانة 80 ألف كم">
                  <span>قطع صيانة 80 ألف كم</span>
                </button>
              </div>
            </div>

            <!-- صندوق المحادثة التفاعلي والنتائج -->
            <div class="ai-chat-box-card" id="aiChatBoxCard">
              <div class="ai-msg-row">
                <div class="ai-bot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>
                  </svg>
                </div>
                <div class="ai-bot-bubble">
                  <div class="ai-bubble-badge">
                    <span class="ai-sparkle-pulse-dot"></span>
                    <span>المساعد الذكي لكفو جاهز للمطابقة الفورية</span>
                  </div>
                  <p class="ai-bubble-text" id="aiChatMsg">
                    مرحباً بك! اكتب أي استفسار، وصف للعطل، أو رقم القطعة وسأقوم بمطابقتها لسيارتك <strong>(${currentCar})</strong> فوراً.
                  </p>
                </div>
              </div>
              <div id="aiProductsResultBox" style="display: none; flex-direction: column; gap: 8px;"></div>
            </div>

            <!-- شريط إدخال الاستفسار للذكاء الاصطناعي مع الكاميرا والصوت والإرسال -->
            <div class="ai-search-box-wrap">
              <a href="image-search.html" class="ai-input-tool-btn" title="فحص القطعة بالكاميرا / الصورة" aria-label="فحص بالصورة">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </a>
              <button type="button" class="ai-input-tool-btn" id="aiVoiceBtn" title="بحث صوتي ذكي" aria-label="بحث صوتي">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
              </button>
              <input 
                type="text" 
                id="aiPromptInput" 
                class="ai-prompt-input" 
                placeholder="صف العطل أو القطعة (مثال: فحمات، زيت، صوت طقطقة...)"
                autocomplete="off"
              >
              <button class="ai-action-btn-send" id="btnSendAiPrompt" title="إرسال للذكاء الاصطناعي" aria-label="إرسال">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z"/>
                  <path d="M22 2 11 13"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
      modal = document.getElementById('aiPartsModal');

      // إغلاق المودال
      document.getElementById('closeAiModal')?.addEventListener('click', () => {
        modal.classList.remove('active');
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });

      // التعامل مع اقتراحات الذكاء الاصطناعي
      modal.querySelectorAll('.ai-suggest-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const query = chip.dataset.query;
          const input = document.getElementById('aiPromptInput');
          if (input) input.value = query;
          this.triggerAiSearch(query);
        });
      });

      // إرسال السؤال
      const promptInput = document.getElementById('aiPromptInput');
      const sendBtn = document.getElementById('btnSendAiPrompt');
      const doSubmit = () => {
        const val = promptInput.value.trim();
        if (val) this.triggerAiSearch(val);
      };
      promptInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doSubmit();
      });
      sendBtn?.addEventListener('click', doSubmit);

      // محاكاة الإدخال الصوتي
      const voiceBtn = document.getElementById('aiVoiceBtn');
      voiceBtn?.addEventListener('click', () => {
        const msgEl = document.getElementById('aiChatMsg');
        if (msgEl) {
          msgEl.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; color: #EF4444;">
              <span class="ai-sparkle-pulse-dot" style="background: #EF4444; box-shadow: 0 0 8px #EF4444;"></span>
              <span>جاري الاستماع لصوتك... صف مشكلة سيارتك أو القطعة المطلوبة</span>
            </div>
          `;
        }
        setTimeout(() => {
          const sampleSpeech = 'عندي صوت طقطقة في المساعدات مع المطبات';
          const input = document.getElementById('aiPromptInput');
          if (input) input.value = sampleSpeech;
          this.triggerAiSearch(sampleSpeech);
        }, 1800);
      });
    }

    modal.classList.add('active');
    setTimeout(() => {
      document.getElementById('aiPromptInput')?.focus();
    }, 150);
  },

  // محاكاة استجابة ومطابقة الذكاء الاصطناعي التفاعلية
  triggerAiSearch(query) {
    const msgEl = document.getElementById('aiChatMsg');
    const resultBox = document.getElementById('aiProductsResultBox');
    if (!msgEl || !resultBox) return;

    const car = KafuStore.getSelectedCar()?.displayName || 'Toyota Camry 2025';
    resultBox.style.display = 'none';
    msgEl.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; color: var(--accent);">
        <div class="ai-typing-indicator">
          <span class="ai-typing-dot"></span>
          <span class="ai-typing-dot"></span>
          <span class="ai-typing-dot"></span>
        </div>
        <span>جاري تحليل استفسارك ومطابقة القطع مع نظام كفو لسيارتك (${car})...</span>
      </div>
    `;

    setTimeout(() => {
      const q = (query || '').toLowerCase();
      let matched = [];
      let analysisText = '';

      if (q.includes('طقطقة') || q.includes('مساعد') || q.includes('عفشة') || q.includes('مطب')) {
        analysisText = `تم تحليل العطل بالذكاء الاصطناعي: صوت الطقطقة مع المطبات ناتج غالباً عن تآكل في <strong>كراسي المساعدات أو جلب المقصات</strong>. إليك القطع المطابقة 100% لسيارتك <strong>(${car})</strong>:`;
        matched = PRODUCTS.filter(p => p.category === 'suspension');
        if (matched.length === 0) matched = PRODUCTS.slice(0, 2);
      } else if (q.includes('فرامل') || q.includes('فحمات') || q.includes('سيراميك') || q.includes('بريك') || q.includes('هوبات')) {
        analysisText = `تم فحص نظام الفرامل: فحمات السيراميك اليابانية متوافقة تماماً وتوفر أداءً حرارياً أعلى بدون إصدار غبار أو صفير. القطع المطابقة لـ <strong>(${car})</strong>:`;
        matched = PRODUCTS.filter(p => p.category === 'brakes');
        if (matched.length === 0) matched = PRODUCTS.slice(0, 2);
      } else if (q.includes('هيكل') || q.includes('vin') || q.includes('مطابقة')) {
        analysisText = `تم التحقق بنجاح من رقم الهيكل <strong>(VIN: 4T1B...2025)</strong>: المحرك سعة 2.5L، نظام نقل أوتوماتيكي. جميع القطع أدناه معتمدة ومطابقة لكتالوج الوكالة الرسمي:`;
        matched = PRODUCTS.slice(0, 3);
      } else if (q.includes('صيانة') || q.includes('80') || q.includes('زيت') || q.includes('فلتر')) {
        analysisText = `جدول الصيانة الدورية المعتمد لسيارتك <strong>(${car})</strong>: تشمل الباقة زيت تخليقي أصلي 0W-20 مع فلتر الزيت وشمعات إشعال إيريديوم لضمان أعلى عزم:`;
        matched = PRODUCTS.filter(p => p.category === 'oil' || p.category === 'engine');
        if (matched.length === 0) matched = PRODUCTS.slice(0, 2);
      } else {
        matched = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
        if (matched.length === 0) matched = PRODUCTS.slice(0, 2);
        analysisText = `تم تحليل استفسارك: <strong>"${query}"</strong>. بناءً على كتالوج ومواصفات <strong>(${car})</strong>، تم العثور على القطع المطابقة التالية:`;
      }

      msgEl.innerHTML = analysisText;

      resultBox.innerHTML = matched.map(p => `
        <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; padding: 12px 14px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 8px rgba(0,0,0,0.04); transition: transform 0.2s ease;">
          <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: #F8F9FD; padding: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(0,0,0,0.04);">
              <img src="${p.image}" alt="${p.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
            <div style="min-width: 0;">
              <h4 style="font-size: 0.86rem; font-weight: 700; color: var(--text); margin: 0 0 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</h4>
              <div style="font-size: 0.72rem; color: #16A34A; font-weight: 700; display: flex; align-items: center; gap: 4px;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>مطابقة مؤكدة برقم الهيكل</span>
              </div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; flex-shrink: 0;">
            <span style="font-size: 0.92rem; font-weight: 800; color: var(--primary);">${KafuStore.formatPrice(p.price)}</span>
            <button class="btn-primary" style="padding: 6px 14px; font-size: 0.78rem; border-radius: 10px;" onclick="KafuStore.addToCart(PRODUCTS.find(x => x.id === '${p.id}')); KafuApp.showToast('تمت إضافة ${p.name} للسلة'); KafuApp.updateCartBadges();">
              أضف
            </button>
          </div>
        </div>
      `).join('');

      resultBox.style.display = 'flex';
    }, 650);
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
