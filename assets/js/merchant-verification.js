/**
 * كفو (Kafu) - نظام توثيق ومستندات التاجر الرسمية (Merchant Verification & Official Documents)
 * يشمل:
 * 1. رفع ومعاينة وتحديث السجل التجاري (Commercial Registration)
 * 2. رفع ومعاينة وتحديث شهادة التسجيل الضريبي (ZATCA VAT Certificate)
 * 3. رفع ومعاينة وتحديث صورة الهوية الوطنية / الإقامة للمالك أو المفوض
 * 4. رفع ومعاينة رخصة البلدية والعنوان الوطني الموحد (Balady & National Address)
 * 5. شهادة الآيبان البنكي المعتمد (IBAN Certificate)
 * 6. فحص المطابقة والتحقق التلقائي مع واجهات نفاذ وزكاة ووزارة التجارة
 * 7. معاينة الوثائق الرسمية بالباركود والأختام الحكومية التفاعلية
 */

const KafuMerchantVerification = {
  STORAGE_KEY: 'kafu_merchant_documents_v1',

  getRoleContext() {
    const rawRole = (window.__kafu_force_role || (window.KafuStore && KafuStore.getUserRole ? KafuStore.getUserRole() : localStorage.getItem('kafu_user_role')) || 'merchant_new').toLowerCase();
    if (rawRole.includes('courier')) return 'courier';
    if (rawRole.includes('rep')) return 'rep';
    return 'merchant';
  },

  getStorageKey() {
    const role = this.getRoleContext();
    if (role === 'courier') return 'kafu_courier_documents_v1';
    if (role === 'rep') return 'kafu_rep_documents_v1';
    return 'kafu_merchant_documents_v1';
  },

  defaultMerchantDocs: {
    cr: {
      id: 'cr',
      title: 'السجل التجاري',
      enTitle: 'Commercial Registration (CR)',
      number: '1010892019',
      issueDate: '1443/04/12 هـ',
      expiryDate: '1448/04/12 هـ',
      entityName: 'مؤسسة متجر كفو لقطع الغيار',
      entityType: 'مؤسسة فردية - تجارة تجزئة وجملة في قطع غيار السيارات',
      city: 'الرياض',
      authority: 'وزارة التجارة',
      status: 'verified',
      statusText: 'موثق ومعتمد ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'cr_certificate_1010892019.pdf',
      fileSize: '1.4 MB',
      uploadDate: '2023/11/04',
      fileType: 'application/pdf',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`
    },
    vat: {
      id: 'vat',
      title: 'الشهادة / البطاقة الضريبية',
      enTitle: 'ZATCA VAT Certificate',
      number: '302918294800003',
      issueDate: '2021/08/15 م',
      expiryDate: 'سارية ومجددة تلقائياً',
      entityName: 'مؤسسة متجر كفو لقطع الغيار',
      entityType: 'مكلف خاضع لضريبة القيمة المضافة 15%',
      city: 'الرياض',
      authority: 'هيئة الزكاة والضريبة والجمارك (ZATCA)',
      status: 'verified',
      statusText: 'مفعل وموثق ZATCA ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'zatca_vat_cert_302918294800003.pdf',
      fileSize: '840 KB',
      uploadDate: '2023/11/05',
      fileType: 'application/pdf',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0M2 9.5h20"/><path d="M17 15h.01M12 15h.01"/></svg>`
    },
    national_id: {
      id: 'national_id',
      title: 'صورة الهوية الوطنية للمالك / المفوض',
      enTitle: 'National ID / Iqama Card',
      number: '1089201948',
      ownerName: 'محمد أحمد السبيعي',
      idType: 'هوية وطنية سعودية',
      expiryDate: '1452/09/20 هـ',
      authority: 'منصة النفاذ الوطني الموحد (نفاذ)',
      status: 'verified',
      statusText: 'موثق عبر نفاذ ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'saudi_national_id_front_back.jpg',
      fileSize: '2.1 MB',
      uploadDate: '2023/11/04',
      fileType: 'image/jpeg',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    address: {
      id: 'address',
      title: 'رخصة البلدية والعنوان الوطني الموحد',
      enTitle: 'Balady License & National Address',
      number: '43920188',
      issueDate: '1444/02/10 هـ',
      expiryDate: '1447/02/09 هـ',
      entityName: 'مؤسسة متجر كفو لقطع الغيار',
      entityType: 'رخصة محل تجاري - نشاط بيع وتوزيع قطع غيار السيارات',
      city: 'الرياض - حي الصناعية القديمة - شارع الجمعية - مبنى 7421',
      authority: 'منصة بلدي / البريد السعودي (سبل)',
      status: 'verified',
      statusText: 'معتمد ومرخص ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'balady_license_address.pdf',
      fileSize: '1.6 MB',
      uploadDate: '2023/11/06',
      fileType: 'application/pdf',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
    },
    bank: {
      id: 'bank',
      title: 'شهادة الآيبان البنكي المعتمد (IBAN)',
      enTitle: 'Bank Account & IBAN Certificate',
      number: 'SA03 8000 0000 6080 1012 3456',
      bankName: 'مصرف الراجحي (Al Rajhi Bank)',
      beneficiary: 'مؤسسة متجر كفو لقطع الغيار',
      authority: 'البنك المركزي السعودي (ساما) عبر سريع SARIE',
      status: 'verified',
      statusText: 'مطابق ومفعل للسحب ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'alrajhi_iban_certificate.pdf',
      fileSize: '620 KB',
      uploadDate: '2023/11/07',
      fileType: 'application/pdf',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/><line x1="8" y1="14" x2="8" y2="17"/><line x1="12" y1="14" x2="12" y2="17"/><line x1="16" y1="14" x2="16" y2="17"/></svg>`
    }
  },

  defaultRepDocs: {
    freelance: {
      id: 'freelance',
      title: 'وثيقة العمل الحر / ترخيص المبيعات',
      enTitle: 'Freelance Sales Representative Certificate',
      number: 'FL-902184192',
      issueDate: '1445/01/10 هـ',
      expiryDate: '1448/01/10 هـ',
      entityName: 'مندوب مبيعات وتسويق قطع غيار كفو',
      entityType: 'وساطة ومبيعات تجارية ميدانية وإلكترونية',
      city: 'الرياض والمنطقة الوسطى',
      authority: 'وزارة الموارد البشرية والتنمية الاجتماعية',
      status: 'verified',
      statusText: 'موثق ومعتمد ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'freelance_rep_permit_902184.pdf',
      fileSize: '1.2 MB',
      uploadDate: '2024/02/10',
      fileType: 'application/pdf',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    national_id: {
      id: 'national_id',
      title: 'صورة الهوية الوطنية للمندوب',
      enTitle: 'Representative National ID',
      number: '1098471203',
      ownerName: 'فيصل عبدالكريم القحطاني',
      idType: 'هوية وطنية سعودية',
      expiryDate: '1453/04/18 هـ',
      authority: 'منصة النفاذ الوطني الموحد (نفاذ)',
      status: 'verified',
      statusText: 'موثق نفاذ ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'rep_national_id_verified.jpg',
      fileSize: '1.9 MB',
      uploadDate: '2024/02/10',
      fileType: 'image/jpeg',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
    },
    bank: {
      id: 'bank',
      title: 'الحساب البنكي لتحويل العمولات (IBAN)',
      enTitle: 'Bank Account & Commission IBAN',
      number: 'SA44 2000 0001 2345 6789 0001',
      bankName: 'بنك الرياض (Riyad Bank)',
      beneficiary: 'فيصل عبدالكريم القحطاني',
      authority: 'البنك المركزي السعودي (ساما) عبر سريع',
      status: 'verified',
      statusText: 'مفعل لاستلام العمولات ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'riyad_bank_rep_iban.pdf',
      fileSize: '540 KB',
      uploadDate: '2024/02/11',
      fileType: 'application/pdf',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>`
    },
    address: {
      id: 'address',
      title: 'العنوان الوطني المعتمد للمندوب',
      enTitle: 'National Address Verification',
      number: 'SP-RUH-89410',
      city: 'الرياض - حي الروضة - شارع حفصة بنت عمر',
      authority: 'البريد السعودي (سبل)',
      status: 'verified',
      statusText: 'عنوان موثق ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'rep_spl_national_address.pdf',
      fileSize: '890 KB',
      uploadDate: '2024/02/12',
      fileType: 'application/pdf',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
    }
  },

  defaultCourierDocs: {
    driver_license: {
      id: 'driver_license',
      title: 'رخصة القيادة الرسمية السارية',
      enTitle: 'Official Driving License',
      number: '1092841029',
      issueDate: '1442/05/14 هـ',
      expiryDate: '1452/05/13 هـ',
      ownerName: 'عبدالرحمن خالد العتيبي',
      entityType: 'رخصة قيادة خاصة / نقل خفيف معتمدة',
      authority: 'الإدارة العامة للمرور - منصة أبشر',
      status: 'verified',
      statusText: 'سارية ومعتمدة ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'driver_license_moror_verified.jpg',
      fileSize: '1.5 MB',
      uploadDate: '2024/03/01',
      fileType: 'image/jpeg',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>`
    },
    vehicle_reg: {
      id: 'vehicle_reg',
      title: 'رخصة سير المركبة (الاستمارة)',
      enTitle: 'Vehicle Registration (Istemara)',
      number: '84920194',
      vehiclePlate: 'ب ن ص 4819 (BNS 4819)',
      vehicleModel: 'تويوتا هايلوكس دبل 2022',
      expiryDate: '1449/11/20 هـ',
      authority: 'الإدارة العامة للمرور - هيئة النقل العامة (TGA)',
      status: 'verified',
      statusText: 'مرخصة لنقل الطرود ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'vehicle_registration_istemara.pdf',
      fileSize: '1.3 MB',
      uploadDate: '2024/03/02',
      fileType: 'application/pdf',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`
    },
    insurance: {
      id: 'insurance',
      title: 'وثيقة التأمين الشامل / ضد الغير',
      enTitle: 'Vehicle Insurance Policy',
      number: 'POL-9920184-INS',
      insurer: 'شركة التعاونية للتأمين (Tawuniya)',
      expiryDate: '1448/02/15 هـ',
      authority: 'منصة نجم لخدمات التأمين والبنك المركزي',
      status: 'verified',
      statusText: 'تأمين ساري ومفعل ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'tawuniya_insurance_active.pdf',
      fileSize: '980 KB',
      uploadDate: '2024/03/03',
      fileType: 'application/pdf',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
    },
    national_id: {
      id: 'national_id',
      title: 'صورة الهوية الوطنية / الإقامة',
      enTitle: 'Captain National ID / Iqama',
      number: '1092841029',
      ownerName: 'عبدالرحمن خالد العتيبي',
      idType: 'هوية وطنية سعودية',
      expiryDate: '1452/05/13 هـ',
      authority: 'منصة النفاذ الوطني الموحد (نفاذ)',
      status: 'verified',
      statusText: 'موثق نفاذ ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'captain_saudi_national_id.jpg',
      fileSize: '2.0 MB',
      uploadDate: '2024/03/01',
      fileType: 'image/jpeg',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
    },
    bank: {
      id: 'bank',
      title: 'شهادة الآيبان البنكي لتحويل المشاوير (IBAN)',
      enTitle: 'Delivery Payout Bank Account',
      number: 'SA03 8000 0000 9012 3344 5566',
      bankName: 'مصرف الراجحي (Al Rajhi Bank)',
      beneficiary: 'عبدالرحمن خالد العتيبي',
      authority: 'البنك المركزي السعودي عبر سريع',
      status: 'verified',
      statusText: 'مطابق ومفعل للإيداع التلقائي ✓',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      fileName: 'captain_iban_alrajhi.pdf',
      fileSize: '610 KB',
      uploadDate: '2024/03/04',
      fileType: 'application/pdf',
      previewUrl: null,
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>`
    }
  },

  getDocs() {
    try {
      const key = this.getStorageKey();
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading stored docs:', e);
    }
    const role = this.getRoleContext();
    if (role === 'courier') return JSON.parse(JSON.stringify(this.defaultCourierDocs));
    if (role === 'rep') return JSON.parse(JSON.stringify(this.defaultRepDocs));
    return JSON.parse(JSON.stringify(this.defaultMerchantDocs));
  },

  saveDocs(docs) {
    try {
      const key = this.getStorageKey();
      localStorage.setItem(key, JSON.stringify(docs));
    } catch (e) {
      console.warn('Error saving docs:', e);
    }
  },

  /**
   * بناء وتوليد واجهة المودال الشاملة
   */
  renderModalContent() {
    const docs = this.getDocs();
    const role = this.getRoleContext();
    const isHindi = localStorage.getItem(KafuStore ? KafuStore.KEYS.USE_HINDI_NUMS : 'kafu_hindi_nums') !== 'false';
    const totalDocs = Object.keys(docs).length;

    let headerTitle = 'متجر معتمد وموثق رسمياً 100%';
    let headerSub = 'ساري الصلاحية ومعتمد لدى الجهات الحكومية';
    let bannerNote = 'يمكنك استعراض وثائق متجرك الرسمية أو رفع واستبدال أي مستند في أي وقت لتحديث بياناتك في النظام.';
    let fullPageUrl = 'merchant-verification.html';
    let fullPageLabel = 'فتح صفحة الوثائق والتراخيص الكاملة ↗';

    if (role === 'rep') {
      headerTitle = 'مندوب مبيعات معتمد وموثق 100%';
      headerSub = 'وثائق العمل الحر وتراخيص المبيعات الرسمية';
      bannerNote = 'استعراض وتحديث وثيقة العمل الحر والترخيص الرسمي والهوية الوطنية وحساب العمولات.';
      fullPageUrl = 'rep-verification.html';
      fullPageLabel = 'فتح صفحة توثيق المندوب الكاملة ↗';
    } else if (role === 'courier') {
      headerTitle = 'كابتن توصيل معتمد وموثق 100%';
      headerSub = 'تراخيص القيادة واستمارة المركبة والتأمين';
      bannerNote = 'استعراض وتحديث رخصة القيادة واستمارة سير المركبة والتأمين الشامل المعتمد.';
      fullPageUrl = 'rep-verification.html';
      fullPageLabel = 'فتح صفحة توثيق كابتن التوصيل الكاملة ↗';
    }

    return `
      <div class="merchant-verification-wrapper" style="display: flex; flex-direction: column; gap: 14px; font-family: inherit;">
        
        <!-- 1. شريط إنجاز التوثيق ونسبته الرسمية -->
        <div style="background: linear-gradient(135deg, #064E3B 0%, #047857 60%, #10B981 100%); color: #FFFFFF; border-radius: 18px; padding: 16px; box-shadow: 0 8px 24px rgba(4, 120, 87, 0.25); position: relative; overflow: hidden;">
          <div style="position: absolute; left: -10px; top: -10px; opacity: 0.12; transform: rotate(-15deg);">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/></svg>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 2;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: 800; font-size: 1.05rem; letter-spacing: -0.2px;">${headerTitle}</div>
                <div style="font-size: 0.78rem; opacity: 0.9; margin-top: 2px;">${headerSub}</div>
              </div>
            </div>
            <span style="background: rgba(255,255,255,0.25); font-weight: 800; font-size: 0.85rem; padding: 4px 10px; border-radius: 999px;">
              ${totalDocs} / ${totalDocs} وثائق
            </span>
          </div>

          <!-- شريط التقدم الأخضر -->
          <div style="margin-top: 14px; background: rgba(255,255,255,0.2); height: 7px; border-radius: 999px; overflow: hidden; position: relative; z-index: 2;">
            <div style="background: #FFFFFF; width: 100%; height: 100%; border-radius: 999px; transition: width 0.4s ease;"></div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 0.72rem; opacity: 0.85; position: relative; z-index: 2;">
            <span>تم التحقق عبر نفاذ وزاتكا والجهات الرسمية</span>
            <span>مشفر وآمن 256-bit</span>
          </div>
        </div>

        <!-- رابط الصفحة المستقلة الكاملة -->
        <a href="${fullPageUrl}" style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #F8FAFC; border: 1.5px solid #CBD5E1; color: var(--primary); text-decoration: none; padding: 10px 14px; border-radius: 12px; font-weight: 700; font-size: 0.85rem; transition: all 0.2s ease;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          ${fullPageLabel}
        </a>

        <!-- تنبيه توضيحي -->
        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 12px; padding: 10px 14px; display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span style="font-size: 0.78rem; color: #166534; font-weight: 600; line-height: 1.4;">
            ${bannerNote}
          </span>
        </div>

        <!-- 2. قائمة المستندات الرسمية -->
        <div style="display: flex; flex-direction: column; gap: 10px;" id="verificationDocsList">
          ${this.renderDocCards(docs)}
        </div>

        <!-- مدخل ملف خفي لرفع المستندات -->
        <input type="file" id="kafuDocUploadInput" style="display: none;" onchange="KafuMerchantVerification.onFilePicked(event)">

        <!-- خط فاصل -->
        <div style="height: 1px; background: #E2E8F0; margin: 4px 0;"></div>

        <!-- 3. خيارات وتفضيلات الحساب (الأرقام والضبط الافتراضي) -->
        <div style="display: flex; flex-direction: column; gap: 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 14px;">
          <div style="font-weight: 800; font-size: 0.88rem; color: #334155; margin-bottom: 2px;">تفضيلات النظام والعرض</div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 10px; border-bottom: 1px solid #EDF2F7;">
            <div>
              <div style="font-weight: 700; font-size: 0.88rem; color: #0F172A;">الأرقام العربية المشرقية (١٢٣)</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 1px;">تنسيق الأرقام والأسعار في الواجهة</div>
            </div>
            <input type="checkbox" id="toggleHindiNumsModal" ${isHindi ? 'checked' : ''} style="width: 22px; height: 22px; cursor: pointer; accent-color: var(--primary);" onchange="KafuMerchantVerification.toggleHindi(this.checked)">
          </div>

          <button class="btn-secondary" style="width: 100%; color: #EF4444; border-color: rgba(239,68,68,0.3); background: #FFF5F5; font-weight: 700; padding: 10px; font-size: 0.84rem;" onclick="KafuMerchantVerification.resetAllData()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-left: 6px;"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            إعادة ضبط البيانات والمستندات الافتراضية
          </button>
        </div>

      </div>
    `;
  },

  /**
   * توليد كروت المستندات
   */
  renderDocCards(docs) {
    const docKeys = Object.keys(docs);
    return docKeys.map(key => {
      const doc = docs[key];
      if (!doc) return '';

      let extraFieldHtml = '';
      if (key === 'cr') {
        extraFieldHtml = `
          <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: #475569; margin-top: 4px;">
            <span>الانتهاء: <strong>${doc.expiryDate}</strong></span>
            <span>الجهة: <strong>${doc.authority}</strong></span>
          </div>
        `;
      } else if (key === 'vat') {
        extraFieldHtml = `
          <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: #475569; margin-top: 4px;">
            <span>النسبة: <strong>15% ضريبة القيمة المضافة</strong></span>
            <span>الجهة: <strong>ZATCA</strong></span>
          </div>
        `;
      } else if (key === 'national_id') {
        extraFieldHtml = `
          <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: #475569; margin-top: 4px;">
            <span>الاسم: <strong>${doc.ownerName || 'معتمد'}</strong></span>
            <span>الاعتماد: <strong>نفاذ الوطني</strong></span>
          </div>
        `;
      } else if (key === 'address') {
        extraFieldHtml = `
          <div style="font-size: 0.74rem; color: #475569; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            العنوان: <strong>${doc.city}</strong>
          </div>
        `;
      } else if (key === 'bank') {
        extraFieldHtml = `
          <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: #475569; margin-top: 4px;">
            <span>البنك: <strong>${doc.bankName}</strong></span>
            <span>التحويل: <strong>سريع SARIE</strong></span>
          </div>
        `;
      } else if (key === 'freelance') {
        extraFieldHtml = `
          <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: #475569; margin-top: 4px;">
            <span>النشاط: <strong>${doc.entityType}</strong></span>
            <span>الانتهاء: <strong>${doc.expiryDate}</strong></span>
          </div>
        `;
      } else if (key === 'driver_license') {
        extraFieldHtml = `
          <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: #475569; margin-top: 4px;">
            <span>الفئة: <strong>${doc.entityType}</strong></span>
            <span>الانتهاء: <strong>${doc.expiryDate}</strong></span>
          </div>
        `;
      } else if (key === 'vehicle_reg') {
        extraFieldHtml = `
          <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: #475569; margin-top: 4px;">
            <span>المركبة: <strong>${doc.vehicleModel}</strong></span>
            <span>اللوحة: <strong>${doc.vehiclePlate}</strong></span>
          </div>
        `;
      } else if (key === 'insurance') {
        extraFieldHtml = `
          <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: #475569; margin-top: 4px;">
            <span>الشركة: <strong>${doc.insurer}</strong></span>
            <span>ساري حتى: <strong>${doc.expiryDate}</strong></span>
          </div>
        `;
      }

      return `
        <div class="doc-card-item" id="docCard_${doc.id}" style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 14px; box-shadow: 0 2px 6px rgba(15,23,42,0.03); transition: all 0.2s ease;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;">
            
            <div style="display: flex; align-items: flex-start; gap: 10px; flex: 1;">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: #F1F5F9; color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                ${doc.icon}
              </div>
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  <span style="font-weight: 800; font-size: 0.92rem; color: #0F172A;">${doc.title}</span>
                  <span style="font-size: 0.7rem; background: ${doc.statusBg}; color: ${doc.statusColor}; padding: 2px 8px; border-radius: 6px; font-weight: 700;">
                    ${doc.statusText}
                  </span>
                </div>
                
                <div style="font-family: monospace; font-size: 0.84rem; color: #0A6CFF; font-weight: 700; margin-top: 3px; letter-spacing: 0.3px;">
                  ${doc.number}
                </div>

                ${extraFieldHtml}

                <div style="display: flex; align-items: center; gap: 12px; font-size: 0.72rem; color: #94A3B8; margin-top: 6px;">
                  <span>الملف: <span style="direction: ltr; display: inline-block;">${doc.fileName}</span></span>
                  <span>الحجم: ${doc.fileSize}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- أزرار الإجراءات للوثيقة -->
          <div style="display: flex; gap: 8px; margin-top: 12px; padding-top: 10px; border-top: 1px dashed #E2E8F0;">
            <button type="button" class="btn-secondary" style="flex: 1; padding: 8px 12px; font-size: 0.8rem; font-weight: 700; border-radius: 10px; display: flex; align-items: center; justify-content: center; gap: 6px;" onclick="KafuMerchantVerification.openDocPreview('${doc.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              معاينة الوثيقة
            </button>
            <button type="button" class="btn-primary" style="flex: 1; padding: 8px 12px; font-size: 0.8rem; font-weight: 700; border-radius: 10px; display: flex; align-items: center; justify-content: center; gap: 6px; background: linear-gradient(135deg, #0F172A 0%, #334155 100%);" onclick="KafuMerchantVerification.triggerUpload('${doc.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              استبدال / رفع
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  /**
   * تشغيل اختيار الملف
   */
  activeDocIdToUpload: null,

  triggerUpload(docId) {
    this.activeDocIdToUpload = docId;
    const fileInput = document.getElementById('kafuDocUploadInput');
    if (fileInput) {
      fileInput.value = '';
      fileInput.click();
    }
  },

  /**
   * معالجة الملف بعد اختياره من جهاز المستخدم
   */
  onFilePicked(event) {
    const file = event.target.files && event.target.files[0];
    if (!file || !this.activeDocIdToUpload) return;

    const docId = this.activeDocIdToUpload;
    const docs = this.getDocs();
    const doc = docs[docId];
    if (!doc) return;

    // محاكاة رفع حقيقي مع شريط تحميل وتأثير فحص أمني
    const cardEl = document.getElementById(`docCard_${docId}`);
    if (cardEl) {
      cardEl.style.opacity = '0.5';
      cardEl.style.pointerEvents = 'none';
    }

    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast(`جارٍ رفع وفحص مستند ${doc.title}... ⏳`);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => {
        const sizeKb = Math.round(file.size / 1024);
        const sizeFormatted = sizeKb > 1024 ? (sizeKb / 1024).toFixed(1) + ' MB' : sizeKb + ' KB';

        doc.fileName = file.name;
        doc.fileSize = sizeFormatted;
        doc.fileType = file.type || 'application/pdf';
        doc.uploadDate = new Date().toISOString().split('T')[0];
        doc.previewUrl = file.type.startsWith('image/') ? e.target.result : null;
        doc.status = 'verified';
        doc.statusText = 'تم التحديث والاعتماد ✓';
        doc.statusBg = '#DCFCE7';
        doc.statusColor = '#15803D';

        docs[docId] = doc;
        this.saveDocs(docs);

        // إعادة رسم قائمة الكروت
        const listEl = document.getElementById('verificationDocsList');
        if (listEl) {
          listEl.innerHTML = this.renderDocCards(docs);
        }

        if (window.KafuApp && KafuApp.showToast) {
          KafuApp.showToast(`تم رفع وتوثيق ${doc.title} بنجاح ✓`);
        }
      }, 700);
    };

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      // PDF or other
      setTimeout(() => {
        const sizeKb = Math.round(file.size / 1024);
        const sizeFormatted = sizeKb > 1024 ? (sizeKb / 1024).toFixed(1) + ' MB' : sizeKb + ' KB';

        doc.fileName = file.name;
        doc.fileSize = sizeFormatted;
        doc.fileType = file.type || 'application/pdf';
        doc.uploadDate = new Date().toISOString().split('T')[0];
        doc.previewUrl = null;
        doc.status = 'verified';
        doc.statusText = 'تم التحديث والاعتماد ✓';

        docs[docId] = doc;
        this.saveDocs(docs);

        const listEl = document.getElementById('verificationDocsList');
        if (listEl) {
          listEl.innerHTML = this.renderDocCards(docs);
        }

        if (window.KafuApp && KafuApp.showToast) {
          KafuApp.showToast(`تم استلام واعتماد ${doc.title} بنجاح ✓`);
        }
      }, 700);
    }
  },

  /**
   * نافذة المعاينة الفاخرة للوثيقة
   */
  openDocPreview(docId) {
    const docs = this.getDocs();
    const doc = docs[docId];
    if (!doc) return;

    let previewContent = '';

    if (doc.previewUrl) {
      // صورة تم رفعها من المستخدم
      previewContent = `
        <div style="text-align: center; background: #0F172A; padding: 12px; border-radius: 14px; overflow: hidden; margin-bottom: 14px;">
          <img src="${doc.previewUrl}" alt="${doc.title}" style="max-width: 100%; max-height: 280px; object-fit: contain; border-radius: 8px;">
          <div style="color: #94A3B8; font-size: 0.74rem; margin-top: 8px;">الصورة المرفوعة رسمياً من قبلك</div>
        </div>
      `;
    } else if (docId === 'cr') {
      // معاينة وثيقة السجل التجاري الرسمي لوزارة التجارة
      previewContent = `
        <div style="background: #FFFFFF; border: 2px solid #064E3B; border-radius: 14px; padding: 18px; position: relative; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(6,78,59,0.08); font-family: 'IBM Plex Sans Arabic', sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #10B981; padding-bottom: 10px; margin-bottom: 12px;">
            <div style="text-align: right;">
              <div style="font-weight: 800; font-size: 0.95rem; color: #064E3B;">المملكة العربية السعودية</div>
              <div style="font-size: 0.8rem; color: #047857; font-weight: 700;">وزارة التجارة | المركز السعودي للأعمال</div>
            </div>
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #ECFDF5; border: 1.5px solid #059669; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
              🇸🇦
            </div>
          </div>

          <div style="text-align: center; margin: 10px 0 14px 0;">
            <span style="background: #064E3B; color: #FFFFFF; padding: 4px 16px; border-radius: 999px; font-weight: 800; font-size: 0.88rem;">
              مستخرج سجل تجاري إلكتروني
            </span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.8rem;">
            <div style="background: #F8FAFC; padding: 8px 10px; border-radius: 8px; border: 1px solid #E2E8F0;">
              <span style="color: #64748B; display: block; font-size: 0.72rem;">رقم السجل التجاري:</span>
              <strong style="color: #0A6CFF; font-family: monospace; font-size: 0.92rem;">1010892019</strong>
            </div>
            <div style="background: #F8FAFC; padding: 8px 10px; border-radius: 8px; border: 1px solid #E2E8F0;">
              <span style="color: #64748B; display: block; font-size: 0.72rem;">حالة السجل:</span>
              <strong style="color: #15803D;">نشط وساري المفعول ✓</strong>
            </div>
          </div>

          <div style="margin-top: 10px; background: #F8FAFC; padding: 10px; border-radius: 8px; border: 1px solid #E2E8F0; font-size: 0.8rem;">
            <div style="color: #64748B; font-size: 0.72rem;">الاسم التجاري للمنشأة:</div>
            <strong style="color: #0F172A; font-size: 0.88rem; display: block; margin-top: 2px;">مؤسسة متجر كفو لقطع الغيار</strong>
            <div style="color: #64748B; font-size: 0.72rem; margin-top: 6px;">النشاط المرخص:</div>
            <div style="color: #334155; font-size: 0.78rem;">تجارة تجزئة وجملة في قطع غيار السيارات وإطاراتها وبطارياتها وزيوتها</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 0.72rem; color: #64748B; border-top: 1px dashed #CBD5E1; padding-top: 8px;">
            <span>تاريخ الانتهاء: <strong>1448/04/12 هـ</strong></span>
            <span style="background: #E2E8F0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">QR-VERIFIED</span>
          </div>
        </div>
      `;
    } else if (docId === 'vat') {
      // معاينة شهادة ضريبة القيمة المضافة ZATCA
      previewContent = `
        <div style="background: #FFFFFF; border: 2px solid #1E3A8A; border-radius: 14px; padding: 18px; position: relative; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(30,58,138,0.08); font-family: 'IBM Plex Sans Arabic', sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #3B82F6; padding-bottom: 10px; margin-bottom: 12px;">
            <div style="text-align: right;">
              <div style="font-weight: 800; font-size: 0.95rem; color: #1E3A8A;">هيئة الزكاة والضريبة والجمارك</div>
              <div style="font-size: 0.8rem; color: #2563EB; font-weight: 700;">Zakat, Tax and Customs Authority (ZATCA)</div>
            </div>
            <div style="width: 44px; height: 44px; border-radius: 10px; background: #EFF6FF; border: 1.5px solid #3B82F6; display: flex; align-items: center; justify-content: center;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
            </div>
          </div>

          <div style="text-align: center; margin: 10px 0 14px 0;">
            <span style="background: #1E3A8A; color: #FFFFFF; padding: 4px 16px; border-radius: 999px; font-weight: 800; font-size: 0.88rem;">
              شهادة تسجيل في ضريبة القيمة المضافة (VAT)
            </span>
          </div>

          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px; margin-bottom: 10px;">
            <div style="font-size: 0.74rem; color: #64748B;">الرقم الضريبي المعتمد (VAT Registration Number):</div>
            <div style="font-family: monospace; font-size: 1.15rem; font-weight: 800; color: #1E3A8A; letter-spacing: 1px; margin-top: 3px;">
              302918294800003
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.78rem;">
            <div style="background: #F1F5F9; padding: 8px; border-radius: 8px;">
              <span style="color: #64748B; font-size: 0.7rem; display: block;">اسم المكلف:</span>
              <strong>مؤسسة متجر كفو للقطع</strong>
            </div>
            <div style="background: #F1F5F9; padding: 8px; border-radius: 8px;">
              <span style="color: #64748B; font-size: 0.7rem; display: block;">تاريخ سريان الضريبة:</span>
              <strong>2021/08/15 م</strong>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding-top: 10px; border-top: 1px dashed #E2E8F0; font-size: 0.72rem; color: #64748B;">
            <span>متوافق مع منظومة الفوترة الإلكترونية (فاتورة FATOORA)</span>
            <span style="color: #15803D; font-weight: 700;">موثق 100% ✓</span>
          </div>
        </div>
      `;
    } else if (docId === 'freelance') {
      previewContent = `
        <div style="background: #FFFFFF; border: 2px solid #2563EB; border-radius: 14px; padding: 18px; position: relative; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(37,99,235,0.08); font-family: 'IBM Plex Sans Arabic', sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #3B82F6; padding-bottom: 10px; margin-bottom: 12px;">
            <div style="text-align: right;">
              <div style="font-weight: 800; font-size: 0.95rem; color: #1E40AF;">المملكة العربية السعودية</div>
              <div style="font-size: 0.8rem; color: #2563EB; font-weight: 700;">وزارة الموارد البشرية | منصة العمل الحر</div>
            </div>
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #EFF6FF; border: 1.5px solid #3B82F6; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
              📜
            </div>
          </div>

          <div style="text-align: center; margin: 10px 0 14px 0;">
            <span style="background: #1E40AF; color: #FFFFFF; padding: 4px 16px; border-radius: 999px; font-weight: 800; font-size: 0.88rem;">
              وثيقة العمل الحر - وساطة وتسويق مبيعات
            </span>
          </div>

          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px; margin-bottom: 10px;">
            <div style="font-size: 0.74rem; color: #64748B;">رقم وثيقة العمل الحر المعتمدة:</div>
            <div style="font-family: monospace; font-size: 1.15rem; font-weight: 800; color: #2563EB; letter-spacing: 1px; margin-top: 3px;">
              ${doc.number}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.78rem;">
            <div style="background: #F1F5F9; padding: 8px; border-radius: 8px;">
              <span style="color: #64748B; font-size: 0.7rem; display: block;">النشاط المعتمد:</span>
              <strong>${doc.entityType}</strong>
            </div>
            <div style="background: #F1F5F9; padding: 8px; border-radius: 8px;">
              <span style="color: #64748B; font-size: 0.7rem; display: block;">تاريخ الانتهاء:</span>
              <strong>${doc.expiryDate}</strong>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding-top: 10px; border-top: 1px dashed #E2E8F0; font-size: 0.72rem; color: #64748B;">
            <span>موثق عبر منصة العمل الحر (نفاذ)</span>
            <span style="color: #15803D; font-weight: 700;">ساري ومفعل للعمولات ✓</span>
          </div>
        </div>
      `;
    } else if (docId === 'driver_license') {
      previewContent = `
        <div style="background: linear-gradient(135deg, #1E3A8A 0%, #0284C7 100%); color: #FFFFFF; border-radius: 16px; padding: 18px; position: relative; margin-bottom: 14px; box-shadow: 0 8px 24px rgba(2,132,199,0.25); font-family: 'IBM Plex Sans Arabic', sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="font-size: 0.78rem; opacity: 0.85;">المملكة العربية السعودية · الأمن العام</div>
              <div style="font-size: 1rem; font-weight: 800; margin-top: 2px;">رخصة القيادة الرسمية (Driving License)</div>
            </div>
            <div style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; font-weight: 700;">
              موثق أبشر ✓
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 14px; margin: 16px 0;">
            <div style="width: 60px; height: 75px; border-radius: 8px; background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.68rem;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
              <span>رخصة قيادة</span>
            </div>
            <div>
              <div style="font-size: 0.74rem; opacity: 0.8;">اسم الكابتن:</div>
              <div style="font-weight: 800; font-size: 1.05rem;">${doc.ownerName}</div>
              <div style="font-size: 0.74rem; opacity: 0.8; margin-top: 6px;">رقم الرخصة:</div>
              <div style="font-family: monospace; font-size: 1.1rem; font-weight: 800; letter-spacing: 1px;">${doc.number}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 0.74rem; opacity: 0.9; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;">
            <span>الانتهاء: ${doc.expiryDate}</span>
            <span>النوع: ${doc.entityType}</span>
          </div>
        </div>
      `;
    } else if (docId === 'vehicle_reg') {
      previewContent = `
        <div style="background: #FFFFFF; border: 2px solid #0284C7; border-radius: 14px; padding: 18px; position: relative; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(2,132,199,0.08); font-family: 'IBM Plex Sans Arabic', sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #38BDF8; padding-bottom: 10px; margin-bottom: 12px;">
            <div style="text-align: right;">
              <div style="font-weight: 800; font-size: 0.95rem; color: #0369A1;">الإدارة العامة للمرور</div>
              <div style="font-size: 0.8rem; color: #0284C7; font-weight: 700;">رخصة سير مركبة النقل (الاستمارة)</div>
            </div>
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #F0F9FF; border: 1.5px solid #0284C7; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
              🚗
            </div>
          </div>

          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px; margin-bottom: 10px;">
            <div style="font-size: 0.74rem; color: #64748B;">لوحة المركبة المعتمدة:</div>
            <div style="font-family: monospace; font-size: 1.2rem; font-weight: 800; color: #0369A1; letter-spacing: 1px; margin-top: 3px;">
              ${doc.vehiclePlate || 'ب ن ص 4819'}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.78rem;">
            <div style="background: #F1F5F9; padding: 8px; border-radius: 8px;">
              <span style="color: #64748B; font-size: 0.7rem; display: block;">موديل وطراز المركبة:</span>
              <strong>${doc.vehicleModel || 'هايلوكس'}</strong>
            </div>
            <div style="background: #F1F5F9; padding: 8px; border-radius: 8px;">
              <span style="color: #64748B; font-size: 0.7rem; display: block;">صلاحية الاستمارة:</span>
              <strong>${doc.expiryDate}</strong>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding-top: 10px; border-top: 1px dashed #E2E8F0; font-size: 0.72rem; color: #64748B;">
            <span>مرخصة رسمياً لدى هيئة النقل لنقل الطرود</span>
            <span style="color: #15803D; font-weight: 700;">موثق وساري ✓</span>
          </div>
        </div>
      `;
    } else if (docId === 'insurance') {
      previewContent = `
        <div style="background: #FFFFFF; border: 2px solid #059669; border-radius: 14px; padding: 18px; position: relative; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(5,150,105,0.08); font-family: 'IBM Plex Sans Arabic', sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #10B981; padding-bottom: 10px; margin-bottom: 12px;">
            <div style="text-align: right;">
              <div style="font-weight: 800; font-size: 0.95rem; color: #064E3B;">وثيقة التأمين الشامل للمركبة</div>
              <div style="font-size: 0.8rem; color: #059669; font-weight: 700;">معتمدة لدى منصة نجم والبنك المركزي</div>
            </div>
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #ECFDF5; border: 1.5px solid #10B981; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
              🛡️
            </div>
          </div>

          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px; margin-bottom: 10px;">
            <div style="font-size: 0.74rem; color: #64748B;">رقم وثيقة التأمين:</div>
            <div style="font-family: monospace; font-size: 1.15rem; font-weight: 800; color: #059669; letter-spacing: 1px; margin-top: 3px;">
              ${doc.number}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.78rem;">
            <div style="background: #F1F5F9; padding: 8px; border-radius: 8px;">
              <span style="color: #64748B; font-size: 0.7rem; display: block;">شركة التأمين:</span>
              <strong>${doc.insurer || 'شركة التعاونية'}</strong>
            </div>
            <div style="background: #F1F5F9; padding: 8px; border-radius: 8px;">
              <span style="color: #64748B; font-size: 0.7rem; display: block;">تاريخ الانتهاء:</span>
              <strong>${doc.expiryDate}</strong>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding-top: 10px; border-top: 1px dashed #E2E8F0; font-size: 0.72rem; color: #64748B;">
            <span>فحص وتغطية تأمينية سارية لحماية الطلبات</span>
            <span style="color: #15803D; font-weight: 700;">ساري ومعتمد ✓</span>
          </div>
        </div>
      `;
    } else if (docId === 'national_id') {
      // معاينة بطاقة الهوية الوطنية
      previewContent = `
        <div style="background: linear-gradient(135deg, #064E3B 0%, #0F766E 100%); color: #FFFFFF; border-radius: 16px; padding: 18px; position: relative; margin-bottom: 14px; box-shadow: 0 8px 24px rgba(6,78,59,0.25); font-family: 'IBM Plex Sans Arabic', sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="font-size: 0.78rem; opacity: 0.85;">المملكة العربية السعودية · وزارة الداخلية</div>
              <div style="font-size: 1rem; font-weight: 800; margin-top: 2px;">الهوية الوطنية (Saudi National ID)</div>
            </div>
            <div style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; font-weight: 700;">
              موثق نفاذ ✓
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 14px; margin: 16px 0;">
            <div style="width: 60px; height: 75px; border-radius: 8px; background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.68rem;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>صورة معتمدة</span>
            </div>
            <div>
              <div style="font-size: 0.74rem; opacity: 0.8;">الاسم الكامل:</div>
              <div style="font-weight: 800; font-size: 1.05rem;">${doc.ownerName || 'المستخدم المعتمد'}</div>
              <div style="font-size: 0.74rem; opacity: 0.8; margin-top: 6px;">رقم الهوية:</div>
              <div style="font-family: monospace; font-size: 1.1rem; font-weight: 800; letter-spacing: 1px;">${doc.number}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 0.74rem; opacity: 0.9; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;">
            <span>تاريخ الانتهاء: ${doc.expiryDate}</span>
            <span>الاعتماد: نفاذ الوطني</span>
          </div>
        </div>
      `;
    } else {
      // العنوان والبلدية أو البنك
      previewContent = `
        <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 18px; margin-bottom: 14px; text-align: right;">
          <div style="font-weight: 800; font-size: 1rem; color: #0F172A; margin-bottom: 4px;">${doc.title}</div>
          <div style="font-size: 0.8rem; color: #64748B; margin-bottom: 12px;">${doc.enTitle}</div>
          
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px; margin-bottom: 8px;">
            <div style="font-size: 0.74rem; color: #64748B;">الرقم المرجعي / الكود:</div>
            <div style="font-family: monospace; font-size: 0.95rem; font-weight: 800; color: #0A6CFF; margin-top: 2px;">${doc.number}</div>
          </div>

          <div style="font-size: 0.8rem; color: #475569; line-height: 1.6;">
            <div>الجهة المعتمدة: <strong>${doc.authority}</strong></div>
            <div>تاريخ الاعتماد: <strong>${doc.uploadDate}</strong></div>
            <div>حالة الوثيقة: <strong style="color: #15803D;">${doc.statusText}</strong></div>
          </div>
        </div>
      `;
    }

    // إظهار نافذة المعاينة
    const previewModalHtml = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${previewContent}

        <div style="display: flex; gap: 8px;">
          <button class="btn-primary" style="flex: 1; padding: 10px; font-size: 0.85rem; font-weight: 700; background: linear-gradient(135deg, #0A6CFF 0%, #7B5CFF 100%);" onclick="KafuApp.showToast('تم حفظ وتحميل نسخة إلكترونية من المستند بنجاح 📥');">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-left: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            تحميل نسخة PDF
          </button>
          <button class="btn-secondary" style="flex: 1; padding: 10px; font-size: 0.85rem; font-weight: 700;" onclick="KafuMerchantVerification.triggerUpload('${doc.id}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-left: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            استبدال الملف
          </button>
        </div>
      </div>
    `;

    if (window.openModalWith) {
      window.openModalWith(
        `معاينة: ${doc.title}`,
        'بيانات الوثيقة الرسمية المعتمدة لدى المنصة',
        previewModalHtml
      );
    }
  },

  /**
   * تبديل تنسيق الأرقام الهندية
   */
  toggleHindi(checked) {
    if (window.KafuStore) {
      localStorage.setItem(KafuStore.KEYS.USE_HINDI_NUMS, checked ? 'true' : 'false');
    }
    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast('تم تحديث تنسيق الأرقام والأسعار');
    }
    setTimeout(() => location.reload(), 600);
  },

  /**
   * إعادة ضبط البيانات الافتراضية
   */
  resetAllData() {
    if (confirm('هل ترغب بإعادة ضبط جميع مستندات وبيانات المتجر إلى الإعدادات الافتراضية الموثقة؟')) {
      localStorage.removeItem(this.STORAGE_KEY);
      if (window.KafuStore) {
        KafuStore.init();
      }
      if (window.KafuApp && KafuApp.showToast) {
        KafuApp.showToast('تمت إعادة ضبط المستندات والبيانات الافتراضية بنجاح ✓');
      }
      setTimeout(() => location.reload(), 800);
    }
  }
};

window.KafuMerchantVerification = KafuMerchantVerification;
