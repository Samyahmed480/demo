/**
 * كفو (Kafu) - نظام إضافة القطعة المتقدم للتجار
 * يوفر خيارين متطورين:
 * 1. الإدخال اليدوي الموسّع: صور متعددة، الاسم، الوصف، والمواصفات الـ 9 (الهيكل، OEM، المركبة، الموديل، سنة الصنع، المحرك، الموقع، التوافق، التصنيف).
 * 2. الذكاء الاصطناعي (كفو AI): رفع صورة القطعة أو كرتونها ليتم ملء واستخراج كافة الحقول الـ 9 تلقائياً وتحديد السعر والكمية فقط.
 */

const KafuAddProduct = {
  currentMode: 'ai', // 'ai' | 'manual'
  uploadedImages: [],
  isScanning: false,

  // عينات تجريبية جاهزة للذكاء الاصطناعي
  aiPresets: {
    brakes: {
      name: 'فحمات / قماشات الفرامل (Brake Pad)',
      vin: '4T1B11HK5SU89201',
      oem: '04465-33480',
      brand: 'تويوتا (Toyota)',
      model: 'كامري (Camry)',
      year: '2021 – 2023',
      engine: '2.5 ليتر (2.5L)',
      position: 'أمامي (Front)',
      compatibility: 'مؤكد (Confirmed) 100%',
      condition: 'أصلي وكالة (Genuine OEM)',
      warranty: 'ضمان كفو 6 أشهر ضد عيوب التصنيع',
      description: 'طقم فحمات فرامل أمامية أصلي وكالة ياباني عالي الكفاءة، متوافق مع أنظمة ABS لسيارات تويوتا كامري 2021-2023 محرك 2.5 لتر.',
      suggestedPrice: 195,
      suggestedQty: 18,
      imageSvg: (window.PartGraphics && PartGraphics.brakes) ? PartGraphics.brakes : ''
    },
    piston: {
      name: 'طقم مكبس محرك كامل (Complete Engine Piston Set)',
      vin: '4T1B11HK2NU10928',
      oem: 'OP010-13101',
      brand: 'تويوتا (Toyota)',
      model: 'كامري (Camry)',
      year: '2020 – 2024',
      engine: '2.5 ليتر (2.5L Standard Size)',
      position: 'المحرك (Engine Block)',
      compatibility: 'مؤكد (Confirmed) 100%',
      condition: 'أصلي وكالة (Genuine OEM)',
      warranty: 'ضمان سنة كاملة',
      description: 'طقم مكابس محرك كاملة (4 بساتم + الشنابر والمسامير) ستاندر قياسي أصلي وكالة مخصص لمحركات تويوتا 2.5L Dynamic Force.',
      suggestedPrice: 480,
      suggestedQty: 8,
      imageSvg: (window.PartGraphics && PartGraphics.piston) ? PartGraphics.piston : ''
    },
    oilFilter: {
      name: 'فلتر زيت محرك أصلي وكالة',
      vin: '',
      oem: '04152-YZZA1',
      brand: 'تويوتا (Toyota)',
      model: 'كامري / هايلاندر / راف 4',
      year: '2018 – 2024',
      engine: '2.5L / 3.5L',
      position: 'المحرك - جانبي',
      compatibility: 'مؤكد (Confirmed) 100%',
      condition: 'أصلي وكالة (Genuine OEM)',
      warranty: 'أصلي 100%',
      description: 'فلتر زيت أصلي وكالة تويوتا مع جلدة العزل الأصلية يضمن تنقية مثالية للزيت وحماية المحرك من الشوائب.',
      suggestedPrice: 35,
      suggestedQty: 45,
      imageSvg: (window.PartGraphics && PartGraphics.oilFilter) ? PartGraphics.oilFilter : ''
    }
  },

  // توليد كود HTML الكامل للنافذة المنبثقة
  renderModalContent() {
    return `
      <div class="add-product-container" style="display: flex; flex-direction: column; gap: 14px; font-family: inherit;">
        
        <!-- 1. شريط التبديل بين الطريقتين (Segmented Control) -->
        <div style="background: #F1F5F9; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 4px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
          
          <button 
            type="button" 
            id="tabModeAi" 
            onclick="KafuAddProduct.setMode('ai')"
            style="
              height: 38px; 
              border: none; 
              border-radius: 10px; 
              font-family: inherit; 
              font-size: 0.85rem; 
              font-weight: 800; 
              cursor: pointer; 
              display: inline-flex; 
              align-items: center; 
              justify-content: center; 
              gap: 6px; 
              transition: all 0.2s ease;
              background: ${this.currentMode === 'ai' ? '#0066FF' : 'transparent'}; 
              color: ${this.currentMode === 'ai' ? '#FFFFFF' : '#475569'};
              box-shadow: ${this.currentMode === 'ai' ? '0 3px 10px rgba(0, 102, 255, 0.28)' : 'none'};
            "
          >
            <span>🤖 مسح بالذكاء الاصطناعي (كفو AI)</span>
          </button>

          <button 
            type="button" 
            id="tabModeManual" 
            onclick="KafuAddProduct.setMode('manual')"
            style="
              height: 38px; 
              border: none; 
              border-radius: 10px; 
              font-family: inherit; 
              font-size: 0.85rem; 
              font-weight: 800; 
              cursor: pointer; 
              display: inline-flex; 
              align-items: center; 
              justify-content: center; 
              gap: 6px; 
              transition: all 0.2s ease;
              background: ${this.currentMode === 'manual' ? '#0066FF' : 'transparent'}; 
              color: ${this.currentMode === 'manual' ? '#FFFFFF' : '#475569'};
              box-shadow: ${this.currentMode === 'manual' ? '0 3px 10px rgba(0, 102, 255, 0.28)' : 'none'};
            "
          >
            <span>📝 إدخال يدوي موسّع (صور متعددة)</span>
          </button>

        </div>

        <!-- 2. محتوى الطريقة المختارة -->
        <div id="addProductModeBody">
          ${this.currentMode === 'ai' ? this.renderAiModeHtml() : this.renderManualModeHtml()}
        </div>

      </div>
    `;
  },

  // تبديل الوضع
  setMode(mode) {
    this.currentMode = mode;
    const body = document.getElementById('addProductModeBody');
    const tabAi = document.getElementById('tabModeAi');
    const tabManual = document.getElementById('tabModeManual');

    if (tabAi && tabManual) {
      if (mode === 'ai') {
        tabAi.style.background = '#0066FF';
        tabAi.style.color = '#FFFFFF';
        tabAi.style.boxShadow = '0 3px 10px rgba(0, 102, 255, 0.28)';
        tabManual.style.background = 'transparent';
        tabManual.style.color = '#475569';
        tabManual.style.boxShadow = 'none';
      } else {
        tabManual.style.background = '#0066FF';
        tabManual.style.color = '#FFFFFF';
        tabManual.style.boxShadow = '0 3px 10px rgba(0, 102, 255, 0.28)';
        tabAi.style.background = 'transparent';
        tabAi.style.color = '#475569';
        tabAi.style.boxShadow = 'none';
      }
    }

    if (body) {
      body.innerHTML = mode === 'ai' ? this.renderAiModeHtml() : this.renderManualModeHtml();
    }
  },

  // ---------------------------------------------------------------------------
  // الطريقة الثانية: كفو AI - المسح والملء التلقائي من الصورة
  // ---------------------------------------------------------------------------
  renderAiModeHtml() {
    return `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        
        <!-- إشعار توضيحي ذكي -->
        <div style="background: linear-gradient(135deg, #EFF6FF 0%, #E0F2FE 100%); border: 1.5px solid #BFDBFE; border-radius: 14px; padding: 12px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: #0066FF; color: #FFFFFF; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1rem;">
            ✨
          </div>
          <div style="font-size: 0.82rem; line-height: 1.45; color: #1E3A8A;">
            <strong>خاصية المسح والملء التلقائي (كفو AI):</strong>
            <div>ارفع فقط صورة القطعة أو ملصق كود الـ OEM وسيقوم الذكاء الاصطناعي باستخراج كافة المواصفات والسيارات المتوافقة، وعليك فقط تحديد السعر والكمية.</div>
          </div>
        </div>

        <!-- منطقة رفع صورة القطعة أو التقاطها -->
        <div 
          id="aiDropzone" 
          onclick="document.getElementById('aiFileInput').click()"
          style="
            background: #F8FAFC; 
            border: 2px dashed #93C5FD; 
            border-radius: 18px; 
            padding: 22px 14px; 
            text-align: center; 
            cursor: pointer; 
            transition: all 0.22s ease;
            position: relative;
            overflow: hidden;
          "
        >
          <input 
            type="file" 
            id="aiFileInput" 
            accept="image/*" 
            style="display: none;" 
            onchange="KafuAddProduct.handleImageUpload(event)"
          />

          <div id="aiDropzoneIdle">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: #EFF6FF; border: 1px solid #BFDBFE; color: #0066FF; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <strong style="display: block; font-size: 0.95rem; color: #0F172A; margin-bottom: 4px;">اضغط لرفع صورة القطعة أو كرتون الـ OEM</strong>
            <span style="font-size: 0.78rem; color: #64748B;">يدعم الصور بصيغ JPG, PNG أو التقاط مباشر بالكاميرا</span>
          </div>

          <!-- أنيميشن المسح بالليزر أثناء التحليل -->
          <div id="aiScanningIndicator" style="display: none; padding: 12px 0;">
            <div style="position: relative; width: 80px; height: 80px; margin: 0 auto 12px; border-radius: 14px; overflow: hidden; background: #E2E8F0; display: flex; align-items: center; justify-content: center;">
              <img id="aiPreviewImg" src="" style="width: 100%; height: 100%; object-fit: cover;" alt="معاينة" />
              <!-- خط المسح الليزري -->
              <div style="position: absolute; left: 0; right: 0; height: 3px; background: #0066FF; box-shadow: 0 0 10px #0066FF; animation: laserScan 1.2s infinite ease-in-out;"></div>
            </div>
            <strong style="color: #0066FF; font-size: 0.92rem; display: block;" id="aiScanText">جاري فحص القطعة وقراءة كود OEM بالذكاء الاصطناعي...</strong>
            <span style="font-size: 0.76rem; color: #64748B;">مطابقة أرقام الهيكل وتوافق المحرك والسيارة</span>
          </div>

        </div>

        <!-- أزرار التجربة الفورية السريعة للتاجر -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <span style="font-size: 0.76rem; font-weight: 700; color: #64748B;">أو جرّب فحص نموذج جاهز بنقرة واحدة:</span>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button 
              type="button" 
              onclick="KafuAddProduct.applyAiPreset('brakes')"
              style="padding: 6px 12px; background: #FFFFFF; border: 1.5px solid #BFDBFE; border-radius: 8px; font-size: 0.78rem; font-weight: 700; color: #0066FF; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"
            >
              <span>🔘 فحمات كامري (Brake Pad)</span>
            </button>
            <button 
              type="button" 
              onclick="KafuAddProduct.applyAiPreset('piston')"
              style="padding: 6px 12px; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 8px; font-size: 0.78rem; font-weight: 700; color: #475569; cursor: pointer;"
            >
              <span>🔘 طقم مكبس محرك</span>
            </button>
            <button 
              type="button" 
              onclick="KafuAddProduct.applyAiPreset('oilFilter')"
              style="padding: 6px 12px; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 8px; font-size: 0.78rem; font-weight: 700; color: #475569; cursor: pointer;"
            >
              <span>🔘 فلتر زيت وكالة</span>
            </button>
          </div>
        </div>

        <!-- استمارة البيانات المستخرجة بالذكاء الاصطناعي (يتم ملؤها فورياً) -->
        <div id="aiFieldsResultContainer" style="display: flex; flex-direction: column; gap: 12px;">
          ${this.renderAutoFilledFields(this.aiPresets.brakes, true)}
        </div>

      </div>
    `;
  },

  // تطبيق نموذج ذكاء اصطناعي فوري
  applyAiPreset(presetKey) {
    const data = this.aiPresets[presetKey] || this.aiPresets.brakes;
    
    // محاكاة تأثير المسح الليزري
    const idle = document.getElementById('aiDropzoneIdle');
    const scanning = document.getElementById('aiScanningIndicator');
    const preview = document.getElementById('aiPreviewImg');
    const resultBox = document.getElementById('aiFieldsResultContainer');

    if (idle && scanning) {
      idle.style.display = 'none';
      scanning.style.display = 'block';
      if (preview && data.imageSvg) {
        preview.src = data.imageSvg;
      }
    }

    setTimeout(() => {
      if (idle && scanning) {
        idle.style.display = 'block';
        scanning.style.display = 'none';
      }
      if (resultBox) {
        resultBox.innerHTML = this.renderAutoFilledFields(data, false);
      }
      if (window.KafuApp && KafuApp.showToast) {
        KafuApp.showToast(`✨ استخرج كفو AI كافة مواصفات [${data.name}] بنجاح! حدد السعر والكمية فقط.`);
      }
    }, 500);
  },

  // معالجة رفع صورة حقيقية من الجهاز
  handleImageUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const idle = document.getElementById('aiDropzoneIdle');
    const scanning = document.getElementById('aiScanningIndicator');
    const preview = document.getElementById('aiPreviewImg');
    const resultBox = document.getElementById('aiFieldsResultContainer');

    const reader = new FileReader();
    reader.onload = (event) => {
      if (preview) preview.src = event.target.result;
      if (idle && scanning) {
        idle.style.display = 'none';
        scanning.style.display = 'block';
      }

      // محاكاة استخراج بيانات الذكاء الاصطناعي من الصورة
      setTimeout(() => {
        if (idle && scanning) {
          idle.style.display = 'block';
          scanning.style.display = 'none';
        }

        // استخراج مواصفات القطعة المطلوبة من الصورة
        const extractedData = {
          ...this.aiPresets.brakes,
          name: 'فحمات / قماشات الفرامل (Brake Pad)',
          imageSvg: event.target.result
        };

        if (resultBox) {
          resultBox.innerHTML = this.renderAutoFilledFields(extractedData, false);
        }

        if (window.KafuApp && KafuApp.showToast) {
          KafuApp.showToast('✨ تم استخراج كافة تفاصيل ومواصفات القطعة بنجاح!');
        }
      }, 700);
    };
    reader.readAsDataURL(file);
  },

  // رسم الحقول المستخرجة تلقائياً مع تسليط الضوء على السعر والكمية
  renderAutoFilledFields(data, isInitial = false) {
    return `
      <!-- شريط نجاح التحليل واستخراج المواصفات الـ 9 -->
      <div style="background: #F0FDF4; border: 1.5px solid #BBF7D0; border-radius: 12px; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between;">
        <div style="font-size: 0.82rem; color: #15803D; font-weight: 700; display: flex; align-items: center; gap: 6px;">
          <span>✓</span>
          <span>تم استخراج المواصفات الـ 9 وتأكيد المطابقة بنسبة 100%</span>
        </div>
        <span style="font-size: 0.72rem; color: #047857; background: #DCFCE7; padding: 2px 8px; border-radius: 6px; font-weight: 800;">كفو AI متطابق</span>
      </div>

      <!-- الحقول المستخرجة تلقائياً (قابلة للتعديل عند الرغبة) -->
      <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
        
        <div>
          <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 4px;">اسم القطعة المستخرج تلقائياً</label>
          <input type="text" id="aiPartName" value="${data.name}" class="form-input" style="font-weight: 700; color: #0A2540;">
        </div>

        <!-- شبكة المواصفات الـ 9 المستخرجة -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          
          <div>
            <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">رقم القطعة الأصلي (OEM)</label>
            <input type="text" id="aiPartOem" value="${data.oem}" class="form-input ltr" style="text-align: right; font-family: monospace; font-weight: 800; color: #0066FF;">
          </div>

          <div>
            <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">رقم الهيكل (VIN) إن وجد</label>
            <input type="text" id="aiPartVin" value="${data.vin || '4T1B11HK5SU89201'}" class="form-input ltr" style="text-align: right; font-family: monospace;">
          </div>

          <div>
            <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">نوع المركبة</label>
            <input type="text" id="aiPartBrand" value="${data.brand}" class="form-input">
          </div>

          <div>
            <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">الموديل</label>
            <input type="text" id="aiPartModel" value="${data.model}" class="form-input">
          </div>

          <div>
            <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">سنة الصنع</label>
            <input type="text" id="aiPartYear" value="${data.year}" class="form-input">
          </div>

          <div>
            <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">سعة ونوع المحرك</label>
            <input type="text" id="aiPartEngine" value="${data.engine}" class="form-input">
          </div>

          <div>
            <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">الموقع في المركبة</label>
            <input type="text" id="aiPartPosition" value="${data.position}" class="form-input">
          </div>

          <div>
            <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">حالة التوافق</label>
            <input type="text" id="aiPartCompat" value="${data.compatibility}" class="form-input" style="color: #15803D; font-weight: 700;">
          </div>

        </div>

        <div>
          <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">حالة وتصنيف القطعة</label>
          <select id="aiPartCondition" class="form-input" style="width: 100%;">
            <option selected>${data.condition}</option>
            <option>تجاري معتمد درجة أولى (Certified Tier-1)</option>
            <option>تشليح ومستعمل مفحوص (Used Guaranteed)</option>
          </select>
        </div>

      </div>

      <!-- =====================================================================
           الحقول التي يحددها التاجر فقط (السعر والكمية) مميزة بإطار متوهج
           ===================================================================== -->
      <div style="background: #EFF6FF; border: 2px solid #0066FF; border-radius: 16px; padding: 14px; box-shadow: 0 4px 16px rgba(0, 102, 255, 0.12); display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong style="font-size: 0.88rem; color: #0066FF;">⚡ حدد سعر البيع والكمية المتوفرة:</strong>
          <span style="font-size: 0.72rem; color: #0066FF; background: #DBEAFE; padding: 2px 8px; border-radius: 6px; font-weight: 700;">خطوة أخيرة</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div>
            <label style="font-size: 0.80rem; font-weight: 800; color: #0F172A; display: block; margin-bottom: 4px;">سعر البيع للعميل (ر.س) *</label>
            <input 
              type="number" 
              id="aiSellingPrice" 
              value="${data.suggestedPrice || 195}" 
              class="form-input font-num" 
              style="height: 44px; font-size: 1.15rem; font-weight: 900; color: #0066FF; border-color: #0066FF; background: #FFFFFF;"
            />
          </div>

          <div>
            <label style="font-size: 0.80rem; font-weight: 800; color: #0F172A; display: block; margin-bottom: 4px;">الكمية المتوفرة بالمستودع *</label>
            <input 
              type="number" 
              id="aiQuantity" 
              value="${data.suggestedQty || 15}" 
              class="form-input font-num" 
              style="height: 44px; font-size: 1.15rem; font-weight: 900; color: #0F172A; border-color: #0066FF; background: #FFFFFF;"
            />
          </div>
        </div>

        <div style="font-size: 0.74rem; color: #64748B;">
          * السعر شامل ضريبة القيمة المضافة 15%. سيتم إيداع الأرباح في محفظتك فور تسليم الشحنة.
        </div>
      </div>

      <!-- زر الحفظ والإضافة المباشرة -->
      <button 
        type="button" 
        onclick="KafuAddProduct.submitProduct('ai')" 
        class="btn-primary" 
        style="height: 46px; font-size: 0.96rem; font-weight: 800; background: linear-gradient(90deg, #0056E0 0%, #0066FF 100%); box-shadow: 0 6px 18px rgba(0, 102, 255, 0.35); border-radius: 12px; margin-top: 4px;"
      >
        <span>حفظ القطعة وعرضها فوراً للعملاء ✓</span>
      </button>
    `;
  },

  // ---------------------------------------------------------------------------
  // الطريقة الأولى: الإدخال اليدوي الموسّع (Manual Detailed Mode)
  // ---------------------------------------------------------------------------
  renderManualModeHtml() {
    return `
      <div style="display: flex; flex-direction: column; gap: 14px;">

        <!-- 1. معرض الصور المتعددة للقطعة -->
        <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 0.86rem; color: #0F172A;">معرض صور القطعة (صور متعددة):</strong>
            <span style="font-size: 0.74rem; color: #64748B;">(الصورة الأساسية، زوايا أخرى، كرتون الوكالة)</span>
          </div>

          <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px;" id="manualGalleryGrid">
            
            <!-- صورة رئيسية 1 -->
            <div style="position: relative; width: 84px; height: 84px; border-radius: 12px; border: 1.5px solid #0066FF; overflow: hidden; background: #EFF6FF; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 1.8rem;">📦</span>
              <span style="position: absolute; bottom: 2px; left: 2px; right: 2px; background: rgba(0, 102, 255, 0.85); color: #FFFFFF; font-size: 0.62rem; text-align: center; border-radius: 4px; font-weight: 700;">الرئيسية</span>
            </div>

            <!-- صورة زاوية ثانية 2 -->
            <div style="position: relative; width: 84px; height: 84px; border-radius: 12px; border: 1.5px dashed #CBD5E1; overflow: hidden; background: #FFFFFF; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;" onclick="document.getElementById('manualAddImgInput').click()">
              <span style="font-size: 1.3rem; color: #0066FF;">+</span>
              <span style="font-size: 0.68rem; color: #64748B; font-weight: 700;">جانبية</span>
            </div>

            <!-- صورة ملصق OEM والباركود 3 -->
            <div style="position: relative; width: 84px; height: 84px; border-radius: 12px; border: 1.5px dashed #CBD5E1; overflow: hidden; background: #FFFFFF; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;" onclick="document.getElementById('manualAddImgInput').click()">
              <span style="font-size: 1.3rem; color: #0066FF;">+</span>
              <span style="font-size: 0.68rem; color: #64748B; font-weight: 700;">ملصق OEM</span>
            </div>

            <!-- زر إضافة صورة إضافية -->
            <div style="position: relative; width: 84px; height: 84px; border-radius: 12px; border: 1.5px dashed #CBD5E1; overflow: hidden; background: #F1F5F9; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;" onclick="document.getElementById('manualAddImgInput').click()">
              <span style="font-size: 1.4rem; color: #94A3B8;">📷</span>
              <span style="font-size: 0.68rem; color: #64748B; font-weight: 700;">إضافة صورة</span>
            </div>

          </div>

          <input type="file" id="manualAddImgInput" accept="image/*" style="display: none;" onchange="KafuApp.showToast('تمت إضافة الصورة لمعرض القطعة');" />
        </div>

        <!-- 2. الاسم والوصف الموسع -->
        <div>
          <label style="font-size: 0.82rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 4px;">اسم القطعة الكامل *</label>
          <input type="text" id="manualPartName" value="فحمات / قماشات الفرامل (Brake Pad)" class="form-input" placeholder="مثال: فحمات فرامل أمامية أصلية وكالة">
        </div>

        <div>
          <label style="font-size: 0.82rem; font-weight: 700; color: #0F172A; display: block; margin-bottom: 4px;">الوصف التفصيلي للقطعة وحالتها</label>
          <textarea id="manualPartDesc" class="form-input" style="height: 64px; resize: none; font-size: 0.82rem; padding: 8px 10px;" placeholder="أدخل تفاصيل ومميزات القطعة، توافقها مع فئات المركبة، وظروف الضمان...">طقم فحمات فرامل أمامية أصلية وكالة تويوتا كامري متوافقة مع موديلات 2021-2023 لمحركات 2.5L توفر كفاءة كبح عالية وعمر افتراضي أطول.</textarea>
        </div>

        <!-- 3. المواصفات الـ 9 الإضافية الموسّعة -->
        <div style="border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 14px; display: flex; flex-direction: column; gap: 10px; background: #FAFAFA;">
          <strong style="font-size: 0.86rem; color: #0F172A;">المواصفات الـ 9 الخاصة بمنظومة كفو:</strong>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            
            <!-- 1. رقم القطعة الأصلي OEM -->
            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">رقم القطعة الأصلي (OEM) *</label>
              <input type="text" id="manualPartOem" value="04465-33480" class="form-input ltr" style="text-align: right; font-family: monospace; font-weight: 800; color: #0066FF;">
            </div>

            <!-- 2. رقم الهيكل VIN -->
            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">رقم الهيكل (VIN) إن وجد</label>
              <input type="text" id="manualPartVin" value="4T1B11HK5SU89201" placeholder="17 رمزاً للشاسيه" class="form-input ltr" style="text-align: right; font-family: monospace;">
            </div>

            <!-- 3. نوع المركبة -->
            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">نوع المركبة (الصانع) *</label>
              <select id="manualPartBrand" class="form-input" style="width: 100%;">
                <option selected>تويوتا (Toyota)</option>
                <option>هيونداي (Hyundai)</option>
                <option>نيسان (Nissan)</option>
                <option>فورد (Ford)</option>
                <option>مازدا (Mazda)</option>
                <option>كيا (Kia)</option>
                <option>هوندا (Honda)</option>
                <option>لكزس (Lexus)</option>
              </select>
            </div>

            <!-- 4. الموديل -->
            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">الموديل *</label>
              <input type="text" id="manualPartModel" value="كامري (Camry)" class="form-input">
            </div>

            <!-- 5. سنة الصنع -->
            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">سنة الصنع *</label>
              <input type="text" id="manualPartYear" value="2021 – 2023" class="form-input">
            </div>

            <!-- 6. المحرك -->
            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">المحرك</label>
              <input type="text" id="manualPartEngine" value="2.5 ليتر (2.5L)" class="form-input">
            </div>

            <!-- 7. الموقع في المركبة -->
            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">الموقع في المركبة *</label>
              <select id="manualPartPosition" class="form-input" style="width: 100%;">
                <option selected>أمامي (Front)</option>
                <option>خلفي (Rear)</option>
                <option>أمامي يمين (Front Right)</option>
                <option>أمامي يسار (Front Left)</option>
                <option>خلفي يمين (Rear Right)</option>
                <option>خلفي يسار (Rear Left)</option>
                <option>المحرك (Engine)</option>
                <option>الجيربوكس (Transmission)</option>
              </select>
            </div>

            <!-- 8. التوافق -->
            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">التوافق *</label>
              <select id="manualPartCompat" class="form-input" style="width: 100%; color: #15803D; font-weight: 700;">
                <option selected>مؤكد (Confirmed) 100%</option>
                <option>متوافق مع تعديل بسيط</option>
                <option>متوافق عام (Universal)</option>
              </select>
            </div>

          </div>

          <!-- 9. حالة وتصنيف القطعة والضمان -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">تصنيف القطعة *</label>
              <select id="manualPartCondition" class="form-input" style="width: 100%;">
                <option selected>أصلي وكالة (Genuine OEM)</option>
                <option>تجاري معتمد درجة أولى (Certified Tier-1)</option>
                <option>تشليح ومستعمل مفحوص (Used Guaranteed)</option>
              </select>
            </div>

            <div>
              <label style="font-size: 0.76rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">فترة الضمان</label>
              <select id="manualPartWarranty" class="form-input" style="width: 100%;">
                <option selected>ضمان كفو 6 أشهر</option>
                <option>ضمان سنة كاملة</option>
                <option>ضمان 3 أشهر</option>
                <option>بدون ضمان</option>
              </select>
            </div>
          </div>

        </div>

        <!-- 4. التسعير والكمية المتوفرة -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div>
            <label style="font-size: 0.80rem; font-weight: 800; color: #0F172A; display: block; margin-bottom: 4px;">سعر البيع (ر.س) *</label>
            <input type="number" id="manualSellingPrice" value="195" class="form-input font-num" style="font-size: 1.1rem; font-weight: 900; color: #0066FF;">
          </div>

          <div>
            <label style="font-size: 0.80rem; font-weight: 800; color: #0F172A; display: block; margin-bottom: 4px;">الكمية المتوفرة بالمستودع *</label>
            <input type="number" id="manualQuantity" value="20" class="form-input font-num" style="font-size: 1.1rem; font-weight: 900; color: #0F172A;">
          </div>
        </div>

        <!-- زر الإضافة اليدوية -->
        <button 
          type="button" 
          onclick="KafuAddProduct.submitProduct('manual')" 
          class="btn-primary" 
          style="height: 46px; font-size: 0.96rem; font-weight: 800; background: linear-gradient(90deg, #0056E0 0%, #0066FF 100%); box-shadow: 0 6px 18px rgba(0, 102, 255, 0.35); border-radius: 12px; margin-top: 4px;"
        >
          <span>إضافة القطعة وعرضها للعملاء ✓</span>
        </button>

      </div>
    `;
  },

  // حفظ وإرسال القطعة
  submitProduct(mode) {
    let name, oem, vin, brand, model, year, engine, position, compat, condition, price, qty;

    if (mode === 'ai') {
      name = document.getElementById('aiPartName') ? document.getElementById('aiPartName').value.trim() : '';
      oem = document.getElementById('aiPartOem') ? document.getElementById('aiPartOem').value.trim() : '';
      vin = document.getElementById('aiPartVin') ? document.getElementById('aiPartVin').value.trim() : '';
      brand = document.getElementById('aiPartBrand') ? document.getElementById('aiPartBrand').value.trim() : '';
      model = document.getElementById('aiPartModel') ? document.getElementById('aiPartModel').value.trim() : '';
      year = document.getElementById('aiPartYear') ? document.getElementById('aiPartYear').value.trim() : '';
      engine = document.getElementById('aiPartEngine') ? document.getElementById('aiPartEngine').value.trim() : '';
      position = document.getElementById('aiPartPosition') ? document.getElementById('aiPartPosition').value.trim() : '';
      compat = document.getElementById('aiPartCompat') ? document.getElementById('aiPartCompat').value.trim() : '';
      condition = document.getElementById('aiPartCondition') ? document.getElementById('aiPartCondition').value : '';
      price = document.getElementById('aiSellingPrice') ? parseFloat(document.getElementById('aiSellingPrice').value) : 195;
      qty = document.getElementById('aiQuantity') ? parseInt(document.getElementById('aiQuantity').value, 10) : 15;
    } else {
      name = document.getElementById('manualPartName') ? document.getElementById('manualPartName').value.trim() : '';
      oem = document.getElementById('manualPartOem') ? document.getElementById('manualPartOem').value.trim() : '';
      vin = document.getElementById('manualPartVin') ? document.getElementById('manualPartVin').value.trim() : '';
      brand = document.getElementById('manualPartBrand') ? document.getElementById('manualPartBrand').value : '';
      model = document.getElementById('manualPartModel') ? document.getElementById('manualPartModel').value.trim() : '';
      year = document.getElementById('manualPartYear') ? document.getElementById('manualPartYear').value.trim() : '';
      engine = document.getElementById('manualPartEngine') ? document.getElementById('manualPartEngine').value.trim() : '';
      position = document.getElementById('manualPartPosition') ? document.getElementById('manualPartPosition').value : '';
      compat = document.getElementById('manualPartCompat') ? document.getElementById('manualPartCompat').value : '';
      condition = document.getElementById('manualPartCondition') ? document.getElementById('manualPartCondition').value : '';
      price = document.getElementById('manualSellingPrice') ? parseFloat(document.getElementById('manualSellingPrice').value) : 195;
      qty = document.getElementById('manualQuantity') ? parseInt(document.getElementById('manualQuantity').value, 10) : 20;
    }

    if (!name) {
      alert('يرجى كتابة اسم القطعة');
      return;
    }
    if (!price || isNaN(price) || price <= 0) {
      alert('يرجى إدخال سعر بيع صحيح');
      return;
    }

    // حفظ في مخزون التاجر المحلي
    const newProduct = {
      id: 'prod-' + Date.now(),
      name: name,
      oem: oem || '04465-33480',
      vin: vin || '',
      brand: brand || 'تويوتا (Toyota)',
      model: model || 'كامري (Camry)',
      year: year || '2021 – 2023',
      engine: engine || '2.5L',
      position: position || 'أمامي (Front)',
      compatibility: compat || 'مؤكد (Confirmed)',
      condition: condition || 'أصلي وكالة (Genuine OEM)',
      price: price,
      quantity: qty || 1,
      addedAt: new Date().toISOString()
    };

    try {
      const stored = localStorage.getItem('kafu_merchant_inventory') || '[]';
      const inventory = JSON.parse(stored);
      inventory.unshift(newProduct);
      localStorage.setItem('kafu_merchant_inventory', JSON.stringify(inventory));
    } catch (e) {
      console.error(e);
    }

    // إشعار نجاح فوري
    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast(`✓ تم إضافة [${name}] بنجاح، وربط المواصفات الـ 9 وعرضها للمشترين!`);
    }

    // إغلاق المودال
    if (typeof closeActionModal === 'function') {
      closeActionModal();
    }
  }
};

// إضافة أنيميشن ليزر المسح الذكي
if (!document.getElementById('kafuAiScannerStyles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'kafuAiScannerStyles';
  styleEl.textContent = `
    @keyframes laserScan {
      0% { top: 0%; opacity: 0.8; }
      50% { top: 96%; opacity: 1; }
      100% { top: 0%; opacity: 0.8; }
    }
  `;
  document.head.appendChild(styleEl);
}

window.KafuAddProduct = KafuAddProduct;
