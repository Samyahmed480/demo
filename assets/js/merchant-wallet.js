/**
 * كفو (Kafu) - نظام محفظة التاجر والأرباح المفصّلة (Merchant Wallet & Financial Hub)
 * يتضمن:
 * 1. الأرصدة المالية (المتاح للسحب، المعلق قيد التوصيل، إجمالي مبيعات الشهر، المسحوبات)
 * 2. بيانات الحساب البنكي المعتمد (الآيبان IBAN، البنك، اسم المستفيد، السجل التجاري)
 * 3. نظام طلب السحب البنكي التفاعلي مع خيارات السحب الكامل أو الجزئي ونظام سريع (SARIE)
 * 4. سجل الحركات المالية المفصّل (Ledger) مع فلاتر وإيصالات مرجعية
 * 5. التقرير الضريبي المعتمد (ZATCA VAT 15%)
 */

const KafuMerchantWallet = {
  STORAGE_KEY: 'kafu_merchant_wallet_data',
  activeTab: 'all',

  defaultData: {
    availableBalance: 4280.00,
    pendingBalance: 1850.00,
    monthlySales: 24650.00,
    totalWithdrawn: 18520.00,
    vatCollected: 3215.20,
    vatNumber: '302918294800003',
    kafuCommissionRate: '5%',
    bankAccount: {
      bankName: 'مصرف الراجحي (Al Rajhi Bank)',
      bankLogo: '🏛️',
      iban: 'SA03 8000 0000 6080 1012 3456',
      beneficiaryName: 'مؤسسة متجر كفو لقطع الغيار',
      crNumber: '1010892019',
      isVerified: true
    },
    disputes: [
      {
        id: 'DISP-7812',
        orderId: 'ORD-8918',
        title: 'اعتراض على تدقيق عمولة مبيعات',
        date: 'اليوم، 11:30 ص',
        category: 'عمولة المبيعات',
        status: 'under_review',
        statusLabel: 'قيد المراجعة المالية',
        statusColor: '#B45309',
        statusBg: '#FEF3C7',
        amount: '24.00 ر.س',
        details: 'طلب فحص نسبة العمولة المخصومة على طقم مكبس المحرك طبقاً للاتفاقية التجارية لنسبة الـ 5%.',
        response: 'تم استلام الشكوى وجاري التدقيق المحاسبي من فريق كفو المالي خلال 4 ساعات عمل.'
      },
      {
        id: 'DISP-7650',
        orderId: 'ORD-8874',
        title: 'تسوية وإعادة رسوم طلبية غير مطابقة',
        date: 'أمس، 03:15 م',
        category: 'إرجاع وعدم مطابقة',
        status: 'resolved',
        statusLabel: 'تم البت والتعويض ✓',
        statusColor: '#15803D',
        statusBg: '#DCFCE7',
        amount: '1100.00 ر.س',
        details: 'تم إرجاع القطعة من المندوب لعدم مطابقة الشاسيه، وتمت تسوية الرصيد ومحفظة التاجر تلقائياً.',
        response: 'تم قبول طلب التسوية وإعادة كامل المبلغ لمحفظة العميل وإلغاء أي رسوم تشغيلية على المتجر.'
      }
    ],
    transactions: [
      {
        id: 'TXN-9841',
        type: 'sale',
        title: 'أرباح مبيعات طلب ORD-8921',
        desc: 'فحمات فرامل كامري 2023 - عميل: عبدالله السبيعي',
        date: 'اليوم، 10:46 ص',
        amount: 195.00,
        netProfit: 185.25,
        fee: 9.75,
        status: 'completed',
        statusLabel: 'مكتملة ومودعة',
        statusColor: '#15803D',
        statusBg: '#DCFCE7',
        refNumber: 'KAFU-PAY-98412'
      },
      {
        id: 'TXN-9830',
        type: 'sale',
        title: 'أرباح مبيعات طلب ORD-8918',
        desc: 'طقم مكبس محرك كامل - عميل: سالم الشمري',
        date: 'اليوم، 09:32 ص',
        amount: 480.00,
        netProfit: 456.00,
        fee: 24.00,
        status: 'completed',
        statusLabel: 'مكتملة ومودعة',
        statusColor: '#15803D',
        statusBg: '#DCFCE7',
        refNumber: 'KAFU-PAY-98301'
      },
      {
        id: 'TXN-9812',
        type: 'pending',
        title: 'أرباح معلقة - طلب ORD-8915',
        desc: 'مساعدات مازدا 6 - الشحنة مع الكابتن فهد بانتظار التسليم',
        date: 'اليوم، 08:14 ص',
        amount: 750.00,
        netProfit: 712.50,
        fee: 37.50,
        status: 'pending',
        statusLabel: 'معلقة لحين التسليم',
        statusColor: '#B45309',
        statusBg: '#FEF3C7',
        refNumber: 'KAFU-ESCROW-8915'
      },
      {
        id: 'TXN-9750',
        type: 'payout',
        title: 'حوالة سحب بنكي لحساب الراجحي',
        desc: 'تحويل سريع عبر نظام سريع (SARIE) لحساب الآيبان ..3456',
        date: 'أمس، 02:15 م',
        amount: -5000.00,
        status: 'completed',
        statusLabel: 'حوالة منفذة',
        statusColor: '#0369A1',
        statusBg: '#E0F2FE',
        refNumber: 'SARIE-REF-772910'
      },
      {
        id: 'TXN-9690',
        type: 'sale',
        title: 'أرباح مبيعات طلب ORD-8889',
        desc: 'فلاتر فورد تورس أصلية - عميل: فهد العنزي',
        date: 'أمس، 06:10 م',
        amount: 320.00,
        netProfit: 304.00,
        fee: 16.00,
        status: 'completed',
        statusLabel: 'مكتملة ومودعة',
        statusColor: '#15803D',
        statusBg: '#DCFCE7',
        refNumber: 'KAFU-PAY-96902'
      },
      {
        id: 'TXN-9510',
        type: 'payout',
        title: 'حوالة سحب بنكي لحساب الراجحي',
        desc: 'سحب أرباح مبيعات عطلة نهاية الأسبوع',
        date: 'منذ 3 أيام',
        amount: -3500.00,
        status: 'completed',
        statusLabel: 'حوالة منفذة',
        statusColor: '#0369A1',
        statusBg: '#E0F2FE',
        refNumber: 'SARIE-REF-651029'
      }
    ]
  },

  getRoleContext() {
    const roleId = (window.KafuStore && window.KafuStore.getRole) ? window.KafuStore.getRole() : 'merchant_new';
    if (roleId === 'courier') {
      return {
        roleId,
        isRep: false,
        isCourier: true,
        walletTitle: 'محفظة أرباح التوصيل والمشاوير',
        walletSubtitle: 'سحب فوري لأرباح مشاوير الكابتن بدون رسوم عبر سريع SARIE',
        badge: 'كابتن سريع معتمد ✓',
        availLabel: 'أرباح المشاوير المتاحة للسحب',
        pendingLabel: 'مشاوير جارية (قيد التوصيل)',
        monthlyLabel: 'أرباح التوصيل هذا الشهر',
        payoutBtnLabel: 'طلب تحويل أرباح المشاوير للبنك',
        fullPageUrl: 'courier-wallet.html',
        fullPageTitle: 'فتح محفظة أرباح الكابتن بملء الشاشة',
        beneficiaryDefault: 'كابتن عبدالله الشمري',
        ibanDefault: 'SA49 8000 0123 4567 8901 2345',
        salesTabLabel: 'أرباح التوصيل (+)',
        payoutSuccessMsg: 'تم تحويل أرباح المشاوير بنجاح إلى حسابك البنكي!'
      };
    }
    const isRep = (roleId === 'rep_oem' || roleId === 'rep_scrap');
    return {
      roleId,
      isRep,
      isCourier: false,
      walletTitle: 'محفظة التاجر والأرباح',
      walletSubtitle: 'سحب الأرباح الفورية وكشف الحركات المالية',
      badge: 'جاهز للتحويل البنكي ✓',
      availLabel: 'الرصيد المتاح للسحب الفوري',
      pendingLabel: 'الرصيد المعلّق (مع المندوبين)',
      monthlyLabel: 'مبيعات هذا الشهر',
      payoutBtnLabel: 'طلب سحب الرصيد للبنك',
      fullPageUrl: isRep ? 'rep-wallet.html' : 'merchant-wallet.html',
      fullPageTitle: 'فتح محفظة الأرباح بملء الشاشة',
      beneficiaryDefault: 'مؤسسة متجر كفو لقطع الغيار',
      ibanDefault: 'SA03 8000 0000 6080 1012 3456',
      salesTabLabel: 'مبيعات وأرباح (+)',
      payoutSuccessMsg: 'تم تنفيذ التحويل البنكي الفوري بنجاح!'
    };
  },

  getStorageKey() {
    const ctx = this.getRoleContext();
    if (ctx.isCourier) return this.STORAGE_KEY + '_courier';
    return this.STORAGE_KEY;
  },

  getDefaultDataForRole() {
    const ctx = this.getRoleContext();
    if (ctx.isRep) {
      return {
        availableBalance: 4280.00,
        pendingBalance: 1850.00,
        monthlySales: 24650.00,
        totalWithdrawn: 12400.00,
        vatCollected: 1860.00,
        vatNumber: '310928192800003',
        bankAccount: {
          bankName: 'مصرف الراجحي (SARIE سريع)',
          bankLogo: '🏛️',
          iban: ctx.ibanDefault,
          beneficiaryName: ctx.beneficiaryDefault,
          crNumber: 'وثيقة عمل حر #FL-90281-2026',
          isVerified: true
        },
        transactions: [
          {
            id: 'TXN-REP-9841',
            type: 'sale',
            title: 'عمولة مبيعات طلبية ورشة الأمل #ORD-8921',
            desc: 'فحمات فرامل كامري 2023 - عمولة مباشرة مسندة للمندوب',
            date: 'اليوم، 10:46 ص',
            amount: 140.00,
            netProfit: 140.00,
            fee: 0.00,
            status: 'completed',
            statusLabel: 'عمولة معتمدة ومودعة',
            statusColor: '#15803D',
            statusBg: '#DCFCE7',
            refNumber: 'COMM-ORD-8921'
          },
          {
            id: 'TXN-REP-9830',
            type: 'sale',
            title: 'عمولة مبيعات ورشة المحرك الذهبي #ORD-8918',
            desc: 'طقم مكبس محرك كامل - عمولة بيع وتنسيق ميداني',
            date: 'اليوم، 09:32 ص',
            amount: 180.00,
            netProfit: 180.00,
            fee: 0.00,
            status: 'completed',
            statusLabel: 'عمولة معتمدة ومودعة',
            statusColor: '#15803D',
            statusBg: '#DCFCE7',
            refNumber: 'COMM-ORD-8918'
          },
          {
            id: 'TXN-REP-9812',
            type: 'pending',
            title: 'عمولة معلقة - طلبية ورشة الخليج #ORD-8915',
            desc: 'مساعدات مازدا 6 - الشحنة مع كابتن التوصيل بانتظار التسليم',
            date: 'اليوم، 08:14 ص',
            amount: 95.00,
            netProfit: 95.00,
            fee: 0.00,
            status: 'pending',
            statusLabel: 'معلقة لحين التسليم للورشة',
            statusColor: '#B45309',
            statusBg: '#FEF3C7',
            refNumber: 'COMM-PEND-8915'
          },
          {
            id: 'TXN-REP-9750',
            type: 'payout',
            title: 'تحويل عمولات سريع لحساب الراجحي',
            desc: 'تحويل عمولات مبيعات مباشر عبر نظام سريع (SARIE)',
            date: 'أمس، 02:15 م',
            amount: -3000.00,
            status: 'completed',
            statusLabel: 'حوالة منفذة',
            statusColor: '#0369A1',
            statusBg: '#E0F2FE',
            refNumber: 'SARIE-REP-772910'
          }
        ]
      };
    } else if (ctx.isCourier) {
      return {
        availableBalance: 210.00,
        pendingBalance: 95.00,
        monthlySales: 4850.00,
        totalWithdrawn: 3420.00,
        vatCollected: 0.00,
        vatNumber: '-',
        bankAccount: {
          bankName: 'مصرف الراجحي (SARIE سريع)',
          bankLogo: '🏛️',
          iban: ctx.ibanDefault,
          beneficiaryName: ctx.beneficiaryDefault,
          crNumber: 'رخصة قيادة #DL-2024-98129',
          isVerified: true
        },
        transactions: [
          {
            id: 'TXN-CR-9941',
            type: 'sale',
            title: 'أجر توصيل مشوار شحنة #SH-992',
            desc: 'من متجر كفو للصناعية القديمة إلى مركز الأمل باليرموك',
            date: 'اليوم، 10:46 ص',
            amount: 45.00,
            netProfit: 45.00,
            fee: 0.00,
            status: 'completed',
            statusLabel: 'تم التوصيل وإيداع الأجر',
            statusColor: '#15803D',
            statusBg: '#DCFCE7',
            refNumber: 'DELIV-SH-992'
          },
          {
            id: 'TXN-CR-9930',
            type: 'sale',
            title: 'أجر توصيل مشوار شحنة #SH-988',
            desc: 'من تشاليح الحائر إلى ورشة الخليج بالسلي',
            date: 'اليوم، 09:32 ص',
            amount: 60.00,
            netProfit: 60.00,
            fee: 0.00,
            status: 'completed',
            statusLabel: 'تم التوصيل وإيداع الأجر',
            statusColor: '#15803D',
            statusBg: '#DCFCE7',
            refNumber: 'DELIV-SH-988'
          },
          {
            id: 'TXN-CR-9912',
            type: 'pending',
            title: 'أجر مشوار قيد التوصيل #ACT-104',
            desc: 'طرد قطع محرك لمركز صيانة كفو بمخرج 17',
            date: 'اليوم، 08:14 ص',
            amount: 45.00,
            netProfit: 45.00,
            fee: 0.00,
            status: 'pending',
            statusLabel: 'قيد التوصيل (يودع فور إدخال OTP)',
            statusColor: '#B45309',
            statusBg: '#FEF3C7',
            refNumber: 'DELIV-ACT-104'
          },
          {
            id: 'TXN-CR-9750',
            type: 'payout',
            title: 'سحب أرباح مشاوير لحساب الراجحي',
            desc: 'تحويل سريع SARIE لحساب الكابتن البنكي',
            date: 'أمس، 02:15 م',
            amount: -400.00,
            status: 'completed',
            statusLabel: 'حوالة منفذة',
            statusColor: '#0369A1',
            statusBg: '#E0F2FE',
            refNumber: 'SARIE-CR-89210'
          }
        ]
      };
    }
    return this.defaultData;
  },

  getData() {
    const key = this.getStorageKey();
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        const d = this.getDefaultDataForRole();
        this.saveData(d);
        return { ...d };
      }
      return JSON.parse(raw);
    } catch (e) {
      return { ...this.getDefaultDataForRole() };
    }
  },

  saveData(data) {
    const key = this.getStorageKey();
    localStorage.setItem(key, JSON.stringify(data));
  },

  // 1. طلب سحب الرصيد البنكي
  requestPayout(amount, bankDetails) {
    const data = this.getData();
    const withdrawAmt = parseFloat(amount);

    if (isNaN(withdrawAmt) || withdrawAmt <= 0) return { success: false, msg: 'يرجى إدخال مبلغ صحيح' };
    if (withdrawAmt > data.availableBalance) return { success: false, msg: 'المبلغ المطلوب أكبر من الرصيد المتاح للسحب' };

    data.availableBalance -= withdrawAmt;
    data.totalWithdrawn += withdrawAmt;

    const refNo = 'SARIE-REF-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

    data.transactions.unshift({
      id: 'TXN-' + Math.floor(1000 + Math.random() * 9000),
      type: 'payout',
      title: 'حوالة سحب بنكي لحساب ' + (bankDetails || data.bankAccount.bankName),
      desc: 'تحويل سريع عبر نظام سريع (SARIE) لحساب ' + data.bankAccount.iban.slice(-8),
      date: `اليوم، ${now}`,
      amount: -withdrawAmt,
      status: 'completed',
      statusLabel: 'حوالة منفذة',
      statusColor: '#0369A1',
      statusBg: '#E0F2FE',
      refNumber: refNo
    });

    this.saveData(data);
    return { success: true, refNo, withdrawAmt, remaining: data.availableBalance };
  },

  // 2. توليد كود HTML الكامل لمودال المحفظة المفصّلة
  renderModalContent(activeTab = 'all') {
    this.activeTab = activeTab;
    const data = this.getData();
    const ctx = this.getRoleContext();

    let txns = data.transactions || [];
    let disputes = data.disputes || [];
    if (activeTab === 'sales') {
      txns = txns.filter(t => t.type === 'sale');
    } else if (activeTab === 'payouts') {
      txns = txns.filter(t => t.type === 'payout');
    } else if (activeTab === 'pending') {
      txns = txns.filter(t => t.type === 'pending');
    }

    return `
      <div class="merchant-wallet-wrapper" style="display: flex; flex-direction: column; gap: 14px; font-family: inherit;">
        
        <!-- كارت الشفافية: وضوح نسبة عمولة تطبيق كفو الثابتة 5% -->
        <div style="background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 16px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.4rem;">⚖️</span>
            <div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <strong style="font-size: 0.92rem; color: #166534;">نسبة عمولة تطبيق كفو: 5% ثابتة فقط</strong>
                <span style="background: #16A34A; color: #FFFFFF; font-size: 0.68rem; padding: 2px 7px; border-radius: 4px; font-weight: 800;">شفافية 100% ✓</span>
              </div>
              <div style="font-size: 0.74rem; color: #15803D; margin-top: 3px;">
                شاملة بوابات الدفع الإلكتروني (مدى، فيزا، Apple Pay)، التحصيل المالي، وضمان حقوق التاجر دون أي رسوم خفية.
              </div>
            </div>
          </div>
          <div style="text-align: left; flex-shrink: 0; background: #DCFCE7; padding: 6px 10px; border-radius: 8px;">
            <span style="font-size: 0.68rem; color: #166534; font-weight: 700; display: block;">صافي أرباحك</span>
            <strong style="font-size: 1.1rem; color: #15803D; font-family: monospace;">95% للتاجر</strong>
          </div>
        </div>

        <!-- 1. كارت الرصيد الرئيسي الفاخر المزدوج -->
        <div style="background: linear-gradient(135deg, #0A2540 0%, #0F3B66 100%); border-radius: 20px; padding: 18px; color: #FFFFFF; box-shadow: 0 10px 28px rgba(10, 37, 64, 0.25); position: relative; overflow: hidden;">
          
          <!-- زخرفة خلفية ناعمة -->
          <div style="position: absolute; left: -20px; bottom: -20px; width: 140px; height: 140px; border-radius: 50%; background: radial-gradient(circle, rgba(0, 102, 255, 0.25) 0%, transparent 70%); pointer-events: none;"></div>

          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span style="font-size: 0.78rem; color: #94A3B8; font-weight: 600;">${ctx.availLabel}</span>
              <div style="display: flex; align-items: baseline; gap: 6px; margin: 2px 0;">
                <strong style="font-size: 2.2rem; font-weight: 900; color: #38BDF8; letter-spacing: -0.5px;" class="font-num">${data.availableBalance.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                <span style="font-size: 1rem; color: #E2E8F0; font-weight: 700;">ر.س</span>
              </div>
            </div>

            <span style="font-size: 0.72rem; color: #34D399; background: rgba(52, 211, 153, 0.15); border: 1px solid rgba(52, 211, 153, 0.3); padding: 3px 10px; border-radius: 999px; font-weight: 800;">
              ${ctx.badge}
            </span>
          </div>

          <!-- تفاصيل الأرصدة الإضافية (معلق ومبيعات الشهر) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.12); margin-top: 6px;">
            <div>
              <div style="font-size: 0.72rem; color: #94A3B8;">${ctx.pendingLabel}</div>
              <strong style="font-size: 1.05rem; font-weight: 800; color: #FCD34D;" class="font-num">${data.pendingBalance.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ر.س</strong>
            </div>

            <div style="text-align: left;">
              <div style="font-size: 0.72rem; color: #94A3B8;">${ctx.monthlyLabel}</div>
              <strong style="font-size: 1.05rem; font-weight: 800; color: #FFFFFF;" class="font-num">${data.monthlySales.toLocaleString('ar-SA')} ر.س</strong>
            </div>
          </div>

        </div>

        <!-- 2. زر طلب سحب الرصيد البنكي + فتح شاشة كاملة -->
        <div style="display: flex; gap: 8px;">
          <button 
            type="button" 
            onclick="KafuMerchantWallet.openPayoutModal()"
            style="flex: 1; height: 46px; background: #0F766E; border: none; border-radius: 13px; font-size: 0.94rem; font-weight: 800; color: #FFFFFF; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(15, 118, 110, 0.3); transition: all 0.2s ease;"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            <span>${ctx.payoutBtnLabel} (${data.availableBalance.toLocaleString('ar-SA')} ر.س)</span>
          </button>

          <a 
            href="${ctx.fullPageUrl}" 
            target="_blank" 
            style="display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 46px; background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: 13px; color: #0A2540; text-decoration: none;"
            title="${ctx.fullPageTitle}"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>

        <!-- 3. كرت الحساب البنكي المعتمد للتحويل الفوري (سريع SARIE) -->
        <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 14px; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">🏛️</span>
              <div>
                <strong style="color: #0A2540; font-size: 0.88rem; display: block;">${data.bankAccount.bankName}</strong>
                <span style="font-size: 0.72rem; color: #64748B;">المستفيد: ${data.bankAccount.beneficiaryName}</span>
              </div>
            </div>

            <span style="font-size: 0.72rem; color: #15803D; background: #DCFCE7; padding: 2px 8px; border-radius: 6px; font-weight: 700;">
              حساب موثق ✓
            </span>
          </div>

          <div style="background: #FFFFFF; border: 1px dashed #CBD5E1; border-radius: 10px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 0.68rem; color: #64748B; font-weight: 700;">رقم الحساب الدولي (IBAN)</div>
              <div style="font-size: 0.86rem; font-weight: 800; color: #0A2540; font-family: monospace; letter-spacing: 0.5px;">${data.bankAccount.iban}</div>
            </div>
            <button 
              type="button" 
              onclick="navigator.clipboard.writeText('${data.bankAccount.iban.replace(/\\s/g, '')}'); KafuApp.showToast('تم نسخ رقم الآيبان');" 
              style="background: #EFF6FF; border: 1px solid #BFDBFE; color: #0066FF; padding: 4px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: 700; cursor: pointer;"
            >
              نسخ
            </button>
          </div>
        </div>

        <!-- 4. الملخص المالي والضريبي السريع (ZATCA VAT 15%) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="background: #FAFAFA; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 12px;">
            <div style="font-size: 0.72rem; color: #64748B;">إجمالي المسحوبات المنفذة</div>
            <strong style="font-size: 0.96rem; font-weight: 800; color: #0F172A;" class="font-num">${data.totalWithdrawn.toLocaleString('ar-SA')} ر.س</strong>
          </div>

          <div style="background: #FAFAFA; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 12px;">
            <div style="font-size: 0.72rem; color: #64748B;">الضريبة المحصلة (15% VAT)</div>
            <strong style="font-size: 0.96rem; font-weight: 800; color: #0F172A;" class="font-num">${data.vatCollected.toLocaleString('ar-SA')} ر.س</strong>
          </div>
        </div>

        <!-- 5. سجل العمليات والشكاوى مع التبويبات -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 0.88rem; color: #0F172A;">الحركات المالية والشكاوى:</strong>
            ${activeTab === 'disputes' ? `
              <button 
                type="button" 
                onclick="KafuMerchantWallet.openNewDisputeModal()" 
                style="background: #DC2626; color: #FFFFFF; border: none; padding: 4px 10px; border-radius: 8px; font-size: 0.76rem; font-weight: 800; cursor: pointer;"
              >
                + تقديم اعتراض جديد
              </button>
            ` : `
              <span style="font-size: 0.74rem; color: #64748B;">(${txns.length} حركة)</span>
            `}
          </div>

          <!-- شريط فلاتر العمليات + تبويب الشكاوى والنزاعات -->
          <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 2px;">
            ${this.renderTabBtn('all', 'الكل', data.transactions.length)}
            ${this.renderTabBtn('sales', ctx.salesTabLabel || 'مبيعات وأرباح (+)', data.transactions.filter(t => t.type === 'sale').length, '#15803D', '#DCFCE7')}
            ${this.renderTabBtn('payouts', 'سحوبات بنكية (-)', data.transactions.filter(t => t.type === 'payout').length, '#0369A1', '#E0F2FE')}
            ${this.renderTabBtn('pending', 'معلقة', data.transactions.filter(t => t.type === 'pending').length, '#B45309', '#FEF3C7')}
            ${this.renderTabBtn('disputes', 'الشكاوى والنزاعات', (data.disputes || []).length, '#DC2626', '#FEE2E2')}
          </div>

          <!-- محتوى تبويب الشكاوى أو الحركات المالية -->
          ${activeTab === 'disputes' ? `
            <!-- قائمة الشكاوى والاعتراضات المالية -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${(data.disputes && data.disputes.length > 0) ? data.disputes.map(d => `
                <div style="background: #FFFFFF; border: 1.5px solid #FCA5A5; border-radius: 14px; padding: 12px; display: flex; flex-direction: column; gap: 6px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <strong style="color: #0F172A; font-size: 0.88rem;">شكوى رقم: ${d.id}</strong>
                        <span style="font-size: 0.72rem; color: #64748B;">(طلب: ${d.orderId})</span>
                      </div>
                      <div style="font-size: 0.8rem; font-weight: 700; color: #991B1B; margin-top: 2px;">${d.title}</div>
                    </div>
                    <span style="font-size: 0.72rem; color: ${d.statusColor}; background: ${d.statusBg}; padding: 3px 8px; border-radius: 6px; font-weight: 800;">
                      ${d.statusLabel}
                    </span>
                  </div>

                  <p style="margin: 0; font-size: 0.78rem; color: #475569; line-height: 1.35;">${d.details}</p>

                  <div style="background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 8px; padding: 8px 10px; font-size: 0.75rem; color: #1E293B;">
                    <strong>رد الإدارة المالية لمنصة كفو:</strong>
                    <div>${d.response}</div>
                  </div>

                  <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: #94A3B8; margin-top: 2px;">
                    <span>تاريخ البلاغ: ${d.date}</span>
                    <span>المبلغ المتنازع عليه: <strong style="color: #DC2626;">${d.amount}</strong></span>
                  </div>
                </div>
              `).join('') : `
                <div style="text-align: center; padding: 30px; background: #F8FAFC; border-radius: 14px; color: #64748B; font-size: 0.84rem;">
                  لا توجد شكاوى أو نزاعات مالية معلقة حالياً ✓
                </div>
              `}
            </div>
          ` : `
            <!-- قائمة الحركات المالية مع توضيح نسبة كفو 5% -->
            <div style="display: flex; flex-direction: column; gap: 8px; max-height: 40vh; overflow-y: auto;">
              ${txns.map(t => `
                <div style="background: #FFFFFF; border: 1.4px solid #E2E8F0; border-radius: 14px; padding: 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                  
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 36px; height: 36px; border-radius: 50%; background: ${t.amount > 0 ? '#DCFCE7' : '#E0F2FE'}; color: ${t.amount > 0 ? '#15803D' : '#0369A1'}; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1rem; flex-shrink: 0;">
                      ${t.amount > 0 ? '↓' : '↑'}
                    </div>
                    <div>
                      <strong style="font-size: 0.86rem; color: #0A2540; display: block;">${t.title}</strong>
                      <span style="font-size: 0.74rem; color: #64748B; display: block;">${t.desc}</span>
                      ${t.fee ? `
                        <div style="font-size: 0.72rem; color: #64748B; margin-top: 3px; background: #F8FAFC; padding: 3px 6px; border-radius: 6px;">
                          المبيعات: ${t.amount} ر.س · عمولة كفو 5%: <span style="color: #DC2626;">-${t.fee} ر.س</span> · الصافي: <strong style="color: #15803D;">${t.netProfit} ر.س</strong>
                        </div>
                      ` : ''}
                      <span style="font-size: 0.70rem; color: #94A3B8; display: block; margin-top: 2px;">${t.date} · <span style="font-family: monospace;">${t.refNumber}</span></span>
                    </div>
                  </div>

                  <div style="text-align: left; flex-shrink: 0;">
                    <strong style="font-size: 1.05rem; font-weight: 900; color: ${t.amount > 0 ? '#15803D' : '#0369A1'}; direction: ltr; display: block;" class="font-num">
                      ${t.amount > 0 ? '+' : ''}${t.amount.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ر.س
                    </strong>
                    <span style="font-size: 0.70rem; color: ${t.statusColor}; background: ${t.statusBg}; padding: 2px 7px; border-radius: 6px; font-weight: 700; display: inline-block;">
                      ${t.statusLabel}
                    </span>
                  </div>

                </div>
              `).join('')}
            </div>
          `}

        </div>

      </div>
    `;
  },

  renderTabBtn(tabKey, label, count, color = '#475569', bg = '#F1F5F9') {
    const isActive = this.activeTab === tabKey;
    return `
      <button 
        type="button" 
        onclick="KafuMerchantWallet.switchTab('${tabKey}')"
        style="
          padding: 5px 10px; 
          border-radius: 999px; 
          border: 1.2px solid ${isActive ? '#0066FF' : '#E2E8F0'}; 
          background: ${isActive ? '#EFF6FF' : '#FFFFFF'}; 
          color: ${isActive ? '#0066FF' : '#475569'}; 
          font-size: 0.76rem; 
          font-weight: ${isActive ? '800' : '600'}; 
          cursor: pointer; 
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        "
      >
        <span>${label}</span>
        <span style="font-size: 0.68rem; font-weight: 800; background: ${isActive ? '#0066FF' : bg}; color: ${isActive ? '#FFFFFF' : color}; padding: 1px 6px; border-radius: 999px;">${count}</span>
      </button>
    `;
  },

  switchTab(tabKey) {
    this.activeTab = tabKey;
    this.refreshModal();
  },

  refreshModal() {
    const body = document.getElementById('actionModalBody');
    if (body) {
      body.innerHTML = this.renderModalContent(this.activeTab);
    }
  },

  // 3. نافذة طلب التحويل البنكي الفوري
  openPayoutModal() {
    const data = this.getData();
    if (data.availableBalance <= 0) {
      alert('لا يوجد رصيد متاح للسحب حالياً');
      return;
    }

    const modalHtml = `
      <div id="subActionModalContainer" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px;">
        <div style="background: #FFFFFF; width: 100%; max-width: 440px; border-radius: 24px; padding: 22px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25); display: flex; flex-direction: column; gap: 14px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">💸</span>
              <strong style="font-size: 1.1rem; color: #0F172A;">طلب سحب الأرباح للبنك</strong>
            </div>
            <button onclick="document.getElementById('subActionModalContainer').remove()" style="background: none; border: none; font-size: 1.2rem; color: #64748B; cursor: pointer;">✕</button>
          </div>

          <div style="background: #F0FDF4; border: 1.5px solid #BBF7D0; border-radius: 14px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 0.74rem; color: #166534; font-weight: 700;">الرصيد القابل للسحب الآن:</span>
              <div style="font-size: 1.35rem; font-weight: 900; color: #15803D;" class="font-num">${data.availableBalance.toLocaleString('ar-SA')} ر.س</div>
            </div>
            <span style="font-size: 0.72rem; color: #15803D; background: #DCFCE7; padding: 3px 8px; border-radius: 6px; font-weight: 800;">تحويل سريع فوري</span>
          </div>

          <div>
            <label style="font-size: 0.80rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">المبلغ المراد تحويله (ر.س) *</label>
            <div style="position: relative;">
              <input 
                type="number" 
                id="payoutWithdrawAmount" 
                value="${data.availableBalance}" 
                max="${data.availableBalance}"
                min="100"
                class="form-input font-num" 
                style="height: 44px; font-size: 1.2rem; font-weight: 900; color: #0F766E; padding-left: 60px;" 
              />
              <button 
                type="button" 
                onclick="document.getElementById('payoutWithdrawAmount').value = ${data.availableBalance};"
                style="position: absolute; left: 6px; top: 50%; transform: translateY(-50%); background: #EFF6FF; border: 1px solid #BFDBFE; color: #0066FF; padding: 4px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: 800; cursor: pointer;"
              >
                كامل الرصيد
              </button>
            </div>
          </div>

          <!-- تفاصيل الحساب البنكي المحول إليه -->
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 12px; font-size: 0.80rem;">
            <div style="color: #64748B; font-size: 0.72rem;">سيتم التحويل مباشرة إلى:</div>
            <strong style="color: #0A2540; font-size: 0.86rem; display: block;">${data.bankAccount.bankName}</strong>
            <span style="font-family: monospace; font-size: 0.78rem; color: #0066FF;">${data.bankAccount.iban}</span>
            <div style="font-size: 0.72rem; color: #64748B; margin-top: 2px;">المستفيد: ${data.bankAccount.beneficiaryName}</div>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 4px;">
            <button 
              type="button" 
              onclick="
                const amt = document.getElementById('payoutWithdrawAmount').value;
                const res = KafuMerchantWallet.requestPayout(amt);
                if (res.success) {
                  document.getElementById('subActionModalContainer').remove();
                  KafuMerchantWallet.refreshModal();
                  if (window.KafuApp && KafuApp.showToast) {
                    KafuApp.showToast('تم تنفيذ التحويل البنكي الفوري بنجاح! رقم الحوالة: #' + res.refNo);
                  }
                } else {
                  alert(res.msg);
                }
              "
              style="flex: 1; height: 44px; background: #0F766E; color: #FFFFFF; border: none; border-radius: 12px; font-size: 0.90rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;"
            >
              <span>تأكيد التحويل الآن ✓</span>
            </button>
            
            <button 
              type="button" 
              onclick="document.getElementById('subActionModalContainer').remove()"
              style="flex: 0.5; height: 44px; background: #F1F5F9; color: #475569; border: none; border-radius: 12px; font-size: 0.88rem; font-weight: 700; cursor: pointer;"
            >
              إلغاء
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  openNewDisputeModal() {
    const existing = document.getElementById('disputeModalContainer');
    if (existing) existing.remove();

    const data = this.getData();
    const orders = (data.transactions || []).filter(t => t.type === 'sale').map(t => {
      const match = t.title.match(/ORD-\d+/);
      return match ? match[0] : t.id;
    });

    const modalHtml = `
      <div id="disputeModalContainer" style="position: fixed; inset: 0; background: rgba(15,23,42,0.65); backdrop-filter: blur(4px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif;" dir="rtl">
        <div style="background: #FFFFFF; border-radius: 20px; width: 100%; max-width: 480px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1.5px solid #E2E8F0; padding: 20px; display: flex; flex-direction: column; gap: 14px; max-height: 90vh; overflow-y: auto;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 900; color: #991B1B; display: flex; align-items: center; gap: 6px;">
                <span>⚠️</span>
                <span>تقديم شكوى أو اعتراض مالي</span>
              </h3>
              <p style="margin: 2px 0 0; font-size: 0.74rem; color: #64748B;">ضمان كفو المالي 100% · فحص ومراجعة النزاع بواسطة إدارة الحسابات والامتثال</p>
            </div>
            <button type="button" onclick="document.getElementById('disputeModalContainer').remove()" style="border: none; background: #F1F5F9; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; color: #64748B; font-weight: 800; font-size: 1.1rem; line-height: 1;">✕</button>
          </div>

          <!-- نموذج إرسال الاعتراض -->
          <form id="disputeForm" onsubmit="event.preventDefault(); KafuMerchantWallet.submitDispute();" style="display: flex; flex-direction: column; gap: 12px;">
            
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">رقم الطلب المرتبط بالنزاع:</label>
              <select id="disputeOrderId" style="width: 100%; height: 42px; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 0 10px; font-size: 0.86rem; font-family: inherit; background: #F8FAFC;">
                ${orders.length > 0 ? orders.map(o => `<option value="${o}">الطلب: ${o}</option>`).join('') : '<option value="ORD-8921">الطلب: ORD-8921</option>'}
                <option value="GENERAL">نزاع مالي عام / عمولة كفو / حوالات</option>
              </select>
            </div>

            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">نوع المشكلة أو الاعتراض:</label>
              <select id="disputeCategory" style="width: 100%; height: 42px; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 0 10px; font-size: 0.86rem; font-family: inherit; background: #F8FAFC;">
                <option value="عمولة كفو 5%">خطأ في احتساب نسبة كفو (العمولة المعتمدة 5% فقط)</option>
                <option value="تأخر الحوالة البنكية">تأخر وصول الحوالة البنكية إلى الآيبان</option>
                <option value="إرجاع غير مبرر">إرجاع قطعة من العميل بدون مبرر ومطابقة للمواصفات</option>
                <option value="خلاف مع مندوب التوصيل">اختلاف في فحص المندوب أو تسليم الشحنة</option>
                <option value="أخرى">أخرى (ملاحظات تدقيق مالي)</option>
              </select>
            </div>

            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">المبلغ المتنازع عليه (ر.س):</label>
              <input type="number" id="disputeAmount" placeholder="مثال: 95.00" step="0.5" required style="width: 100%; height: 42px; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 0 10px; font-size: 0.90rem; font-family: inherit;" />
            </div>

            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">تفاصيل الشكوى والشرح:</label>
              <textarea id="disputeDetails" rows="3" placeholder="اشرح تفاصيل المشكلة بدقة وملاحظاتك لمراجع الحسابات في كفو..." required style="width: 100%; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 8px 10px; font-size: 0.82rem; font-family: inherit; resize: vertical;"></textarea>
            </div>

            <div style="background: #FEF2F2; border: 1px dashed #FCA5A5; border-radius: 10px; padding: 10px; font-size: 0.74rem; color: #991B1B; line-height: 1.4;">
              🛡️ <strong>التزام كفو المالي:</strong> نحن نضمن تصفية كافة المستحقات بدقة 100% وفق كشف الحساب وعقود التشغيل. سيتم البت في الاعتراض خلال 24 ساعة عمل مع إمكانية تحويل التعويض مباشرة لمحفظتك.
            </div>

            <div style="display: flex; gap: 8px; margin-top: 6px;">
              <button type="submit" style="flex: 1; height: 44px; background: #DC2626; color: #FFFFFF; border: none; border-radius: 12px; font-size: 0.90rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                <span>إرسال الاعتراض للإدارة المالية 🚀</span>
              </button>
              <button type="button" onclick="document.getElementById('disputeModalContainer').remove()" style="flex: 0.4; height: 44px; background: #F1F5F9; color: #475569; border: none; border-radius: 12px; font-size: 0.86rem; font-weight: 700; cursor: pointer;">
                إلغاء
              </button>
            </div>

          </form>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  submitDispute() {
    const orderId = document.getElementById('disputeOrderId').value;
    const category = document.getElementById('disputeCategory').value;
    const amountVal = parseFloat(document.getElementById('disputeAmount').value) || 0;
    const detailsVal = document.getElementById('disputeDetails').value.trim();

    if (!detailsVal) {
      alert('يرجى كتابة تفاصيل المشكلة');
      return;
    }

    const data = this.getData();
    if (!data.disputes) data.disputes = [];

    const newDispute = {
      id: 'DSP-' + Math.floor(1000 + Math.random() * 9000),
      orderId: orderId,
      title: `اعتراض: ${category}`,
      date: 'اليوم ' + new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      category: category,
      amount: `${amountVal.toFixed(2)} ر.س`,
      status: 'reviewing',
      statusLabel: 'قيد التدقيق المالي',
      statusColor: '#B45309',
      statusBg: '#FEF3C7',
      details: detailsVal,
      response: 'تم استلام الشكوى وجاري مطابقة السجلات مع الشؤون المالية واللوجستية.'
    };

    data.disputes.unshift(newDispute);
    this.saveData(data);

    const modal = document.getElementById('disputeModalContainer');
    if (modal) modal.remove();

    this.activeTab = 'disputes';
    this.refreshModal();

    if (window.KafuApp && KafuApp.showToast) {
      KafuApp.showToast(`تم رفع الشكوى رقم #${newDispute.id} بنجاح! سيتم فحصها خلال 24 ساعة`);
    } else {
      alert(`تم تسجيل الشكوى برقم #${newDispute.id} وسيتم فحصها فوراً.`);
    }
  }
};

window.KafuMerchantWallet = KafuMerchantWallet;
