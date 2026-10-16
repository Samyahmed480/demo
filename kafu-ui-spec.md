# مواصفات واجهة "كفو" — متجر قطع الغيار (نسخة الموقع والباك إند)

> الهدف: نفس شكل وتجربة تطبيق الموبايل بالظبط، مع جاهزية كاملة للربط البرمجي وقواعد البيانات (Backend & MySQL).

---

## 1. الفكرة العامة

- متجر قطع غيار سيارات اسمه **كفو** (شعار: ترس + مفك أزرق غامق على مربع أبيض مستدير).
- اللغة **عربي RTL** بالكامل (`<html lang="ar" dir="rtl">`)، مع دعم تغيير اللغة (أيقونة الكرة الأرضية).
- العملة: **ر.س** (ريال سعودي) — دعم الأرقام العربية المشرقية (١٢٣) والأرقام اللاتينية كخيار مرن.
- الأسلوب البصري: **Glassmorphism** — كروت شبه شفافة، حواف دائرية كبيرة، خلفية بدوائر ملونة ناعمة متحركة بنعومة (blobs)، وأزرار بتدرج أزرق → بنفسجي.
- دعم محرك البحث باسم القطعة أو **برقم الهيكل (VIN / Chassis Number)** لمطابقة كتالوج الوكالة بدقة 100%.

---

## 2. Design Tokens

```css
:root {
  /* الخلفية والـ Blobs */
  --bg: #F1F0F7;
  --bg-gradient: linear-gradient(180deg, #F5F4FA 0%, #EBE9F5 100%);
  --blob-purple: #DCD6F7;
  --blob-blue: #D3E1F8;
  --blob-green: #E2ECE6;

  /* الألوان الأساسية */
  --primary: #0A6CFF;
  --primary-dark: #0A57C7;
  --primary-light: #EBF2FF;
  --accent: #7B5CFF;
  --accent-light: #F0EDFF;
  --gradient-btn: linear-gradient(90deg, #0A6CFF 0%, #7B5CFF 100%);
  --gradient-btn-hover: linear-gradient(90deg, #095edb 0%, #6c4ce8 100%);
  --gradient-hero: linear-gradient(135deg, #094ca7 0%, #0A6CFF 55%, #2d7df7 100%);

  /* النصوص */
  --text: #111418;
  --text-secondary: #4A4D57;
  --text-muted: #8A8D99;
  --link: #0A6CFF;
  --danger: #FF3B30;
  --danger-bg: #FFEBEA;
  --success: #22C55E;
  --success-bg: #DDF5E4;
  --warning: #F59E0B;
  --warning-bg: #FEF3C7;

  /* كروت الفئات (خلفيات pastel) */
  --tile-blue: #D0DEF7;
  --tile-blue-icon: #0A6CFF;
  --tile-peach: #F6E3CD;
  --tile-peach-icon: #D97706;
  --tile-lavender: #DDD8F7;
  --tile-lavender-icon: #7B5CFF;
  --tile-teal: #C5DEE2;
  --tile-teal-icon: #0284C7;
  --tile-orange: #F5E4D0;
  --tile-orange-icon: #C2410C;
  --tile-yellow: #F4EAC8;
  --tile-yellow-icon: #CA8A04;

  /* المقاسات والأبعاد */
  --radius-xs: 8px;
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-tile: 22px;
  --radius-card: 24px;
  --radius-sheet: 32px;
  --radius-pill: 999px;

  --page-padding: 16px;
  --gap: 16px;

  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.65);
  --glass-bg-hover: rgba(255, 255, 255, 0.85);
  --glass-bg-subtle: rgba(255, 255, 255, 0.45);
  --glass-border: rgba(255, 255, 255, 0.85);
  --glass-border-subtle: rgba(255, 255, 255, 0.45);
  --glass-blur: blur(20px);
  --shadow: 0 10px 30px rgba(45, 52, 95, 0.06);
  --shadow-lg: 0 20px 45px rgba(35, 42, 85, 0.12);
  --shadow-sm: 0 4px 14px rgba(45, 52, 95, 0.04);
}
```

**الخط:** `IBM Plex Sans Arabic` (مع بدائل نظامية سلسة).

---

## 3. هيكل التنقل (Bottom Navigation) وتوزيع التبويبات

شريط عائم أسفل الشاشة (Glass Pill عائم مع حواف دائرية كاملة، margin 16px أسفل ومن الجوانب).
تم ضبط الحاوية بهامش سفلي `padding-bottom: 140px` حتى لا تغطي القائمة زر "عرض الكل" أو كروت "مختارة لك" بالأسفل.

يتكون الشريط من **5 تبويبات أساسية** مطابقة للقطات شاشة التطبيق الأصلية 100% (الترتيب من **اليمين لليسار**):

| # | التبويب | الأيقونة | الصفحة | الدور والوظيفة |
|---|---------|----------|--------|----------------|
| 1 | **الرئيسية** | بيت (Home) | `index.html` / `index.php` | الصفحة الأولى، الهيرو، الفئات، ومختارة لك |
| 2 | **البحث** | عدسة (Search) | `search.html` / `search.php` | البحث بالاسم أو برقم الهيكل (VIN) وفلاتر الفئات |
| 3 | **المفضلة** | نجمة (Star ⭐) | `account.html?modal=favorites` | استعراض القطع المحفوظة في المفضلة للشراء لاحقاً |
| 4 | **السلة** | عربة تسوق + Badge أحمر | `cart.html` / `cart.php` | مراجعة القطع، Stepper الكمية، وبوتوم شيت الشحن |
| 5 | **الملف الشخصي** | مستخدم (User 👤) | `account.html` / `account.php` | إدارة الحساب، طلباتي، العناوين، المحفظة، والمكتبة |

> **ملاحظة مكان "المكتبة":**
> تم وضع خيار الوصول إلى **المكتبة وكتالوجات الوكالة** داخل صفحة الملف الشخصي (`account.html`)، مما يحافظ على الترتيب الأصلي لشريط التنقل السفلي ويمنح تجربة تصفح نظيفة تماماً مثل التطبيق.

---

## 4. الصفحات ومكوناتها

### 4.1 الرئيسية (`index.html` / `index.php`)

من فوق لتحت:

1. **كارت الهيرو الأزرق (Hero Card)**:
   - **انحناء الحواف:** `border-radius: 32px;` بدون إطار قاسي (`border: none;`).
   - **أعلى الشمال (يسار الكارت):** كلمة **"كفو"** باللون الأبيض على أقصى اليسار، وبجانبها مربع أبيض ناعم مستدير الزوايا (Squircle 52×52px مع `border: none;` وظل ناعم) يحتوي أيقونة ترس ومفك كفو وشارة اتصال خضراء كصورة بروفايل، والضغط عليه يفتح الحساب مباشرة (`account.html` / `account.php`).
   - **أعلى اليمين:** زرّان دائريان زجاجيان: 🔔 الإشعارات، و 🌐 تغيير اللغة.
   - **أسفل اليمين:** عبارة **"أهلاً بك"** بخط أبيض عريض كبير، وتحتها اسم السيارة المحددة: **"Toyota Camry 2025"** (أو السيارة المختارة).
   - **الخلفية:** رسمة الترس والمفك الشفافة كعلامة مائية ناعمة.

2. **شريط البحث المستقل وزر الفحص (Search Row)**:
   - موزّع إلى عنصرين متجاورين زجاجيين بارتفاع متناسق (54 بكسل) مع حدود زجاجية ناعمة (`1px solid var(--glass-border)`):
     - **يمين (Pill Input):** حقل البحث البيضاوي (`flex: 1; border-radius: 999px;`) مع أيقونة العدسة والـ Placeholder: **"ابحث باسم القطعة أو رقم الهيكل"**.
     - **يسار (Scan Squircle Box):** زر زجاجي مستقل مستدير الزوايا (54×54 بكسل مع `border-radius: 18px;`) يحتوي أيقونة الكاميرا والمسح الضوئي وينقل مباشرة للبحث بالصورة (`image-search.html`).

3. **كارت "سيارة المطابقة"**:
   - كارت زجاجي بحواف ناعمة (`border-radius: 22px; border: 1px solid var(--glass-border);`).
   - أيقونة شاحنة داخل مربع أزرق فاتح يمين، سطر صغير رمادي "سيارة المطابقة"، وتحته بخط عريض **"Toyota Camry 2025"** وسهم `‹` يسار.
   - الضغط يفتح نافذة منبثقة تفاعلية لاختيار الماركة والموديل وسنة الصنع.

4. **تصفح حسب الفئة (Categories Grid)**:
   - تم تكبير الأيقونات لتكون واضحة وجذابة جداً بحجم **82×82 بكسل** (radius 22px) مع أيقونات داخلية بحجم 40px.
   - **ضبط البردر:** خلفيات بألوان باستيل نقية مع **إلغاء أي بردر قاسي (`border: none;`)** لمنع الخطوط البيضاء الصريحة ومطابقة الصورة 100%.
   - **صفان متوازيان دائماً (3 أعمدة × صفين)** على جميع الشاشات بدون أن تنفرد في صف واحد:
     - **الصف الأول:** المحرك (أزرق pastel) • الفرامل (خوخي pastel) • الكهرباء (بنفسجي pastel)
     - **الصف الثاني:** الزيوت والفلاتر (تيل pastel) • التعليق (برتقالي pastel) • الإضاءة (أصفر pastel)

5. **قسم "مختارة لك"**:
   - عنوان Bold يمين ورابط **"عرض الكل"** يسار ظاهر تماماً فوق شريط التنقل السفلي.
   - كروت منتجات أفقية بحواف زجاجية ناعمة (`border-radius: 22px; border: 1px solid var(--glass-border);`) تعرض صورة القطعة، اسم الماركة (`Toyota OEM`)، شارة "متوفر"، اسم القطعة، رقم القطعة، السعر بالريال، وزر الإضافة للسلة السريع `+`.

---

### 4.2 البحث ورقم الهيكل (`search.html` / `search.php`)

- **شريط البحث:** حقل بيضاوي زجاجي ناعم (`search-pill`) مع `placeholder="ابحث باسم القطعة أو رقم الهيكل"`، والبحث يتم مباشرة عبر **عدسة البحث (🔍)** أو بالضغط على زر Enter أو أثناء الكتابة الحية (بدون أزرار نصية زائدة)، مع زر مسح سريع `×`.
- **شريط فلاتر الفئات:** شرائح أفقية قابلة للتمرير (الكل، المحرك، الفرامل، الكهرباء، الزيوت، التعليق، الإضاءة).
- **كارت فحص التوافق:** يوضح السيارة النشطة للمطابقة الفورية.
- **Empty State:** كارت زجاجي بمركز الشاشة: دائرة زرقاء فيها عدسة، عنوان **"ابحث عن قطعتك"**، ووصف يوضح إمكانية كتابة اسم القطعة أو رقم الهيكل (VIN).
- **محرك البحث يدعم:**
  1. البحث باسم القطعة (عربي/إنجليزي).
  2. البحث برقم القطعة الأصلي (OEM Code).
  3. البحث برقم الشاسيه / الهيكل (مثل بادئات كامري `4T1B...` أو `JTDK...`).
  4. فلترة الفئات وحالة التوفر.

---

### 4.3 البحث بالصورة (`image-search.html` / `image-search.php`)

- **شريط علوي:** زر رجوع دائري أنيق وعنوان الصفحة "البحث بالصورة".
- **كارت علوي (`.scan-hero-card`):** كارت زجاجي متوسّط ومستدير (`border-radius: 28px`) يعلوه دائرة لافندر ناعمة (`70×70px`) بداخلها أيقونة فحص الكاميرا، مع عنوان **"ابحث بصورة القطعة"**، وتوجيهات التصوير.
- **منطقة المعاينة (`.scan-dropzone`):** كارت زجاجي بحواف ناعمة (`border-radius: 28px`) بارتفاع 250 بكسل، يدعم السحب والإفلات وتصوير الكاميرا المباشر (`capture="environment"`).
- **شعاع المسح الليزري (`.scan-beam`):** خط ليزري متدرج متحرك يحاكي تحليل الذكاء الاصطناعي للقطعة.
- **زر الإجراء الرئيسي:** زر بيضاوي كبير بتدرج أزرق/بنفسجي يحمل أيقونة الفحص وعبارة **"اختر صورة القطعة"**.
- **نماذج سريعة للتجربة:** أزرار زجاجية سريعة (`.sample-part-btn`) لتجربة فحص مكبس محرك، فلتر زيت، أو فحمات فرامل.
- **النتائج:** بطاقات قطع الغيار المطابقة مع نسبة دقة التعرف (مثل 97% تطابق مؤكد) وإمكانية الشراء الفوري.

---

### 4.4 صفحة المكتبة الجديدة (`library.html` / `library.php`)

صفحة مركزية تخدم مالك السيارة وتوثق تاريخ مركبته:
1. **كتالوج الوكالة الرسمي:** مخططات رقمية لأجزاء Toyota Camry 2025 ومحركها وأنظمتها.
2. **جدول الصيانة الدورية:**
   - صيانة 10,000 كم (زيت وفلتر وفحص سوائل).
   - صيانة 20,000 كم (فحمات وتدوير إطارات وفلاتر هواء/مكيف).
   - صيانة 40,000 كم (بواجي ليزر إيريديوم، زيت فرامل، وفحص تعليق).
3. **فواتير الشراء والضمان:** استعراض الطلبات السابقة وتنزيل الفواتير الضريبية بصيغة PDF.
4. **القطع المحفوظة:** وصول سريع للمفضلة والقطع المحفوظة لسيارتك.
5. **تقرير وفاحص رقم الهيكل (VIN Decoder):** فحص ومطابقة كود الشاسيه المكون من 17 رمزاً مع أرقام قطع الغيار المتوافقة.

---

### 4.5 السلة وبيانات الشحن (`cart.html` / `cart.php`)

- **عناصر السلة:** بطاقات زجاجية، صورة القطعة، اسم المتجر، السعر، و **Stepper رأسي** أزرق (`+` / العدد / `−`).
- **كارت الملخص المالي:**
  - إجمالي القطع (١٬٤٤٠ ر.س)
  - ضريبة القيمة المضافة 15% (٢١٦ ر.س)
  - الإجمالي الشامل (١٬٦٥٦ ر.س)
- **زر "متابعة إلى الشحن":** يفتح **Bottom Sheet** زجاجي منبثق بانحناء 32 بكسل:
  - **عنوان الشحن:** استعراض العنوان الحالي أو إضافة عنوان جديد.
  - **طريقة الدفع:** خياران متجاوران: **الدفع عند الاستلام** (محدد افتراضياً مع أيقونة `$`)، و **الدفع من المحفظة**.
  - **زر تأكيد الطلب:** يفرغ السلة، ويسجل الطلب، ويظهر شاشة نجاح برقم طلب `KAFU-XXXXXX`.

---

### 4.6 تفاصيل المنتج (`product.html` / `product.php`) ومعالجة الشفافية

- **معالجة الشفافية وقوائم العرض (Solid Opaque System):**
  - تم تحويل جميع كروت صفحة المنتج (`.product-detail-hero` و `.product-info-sheet`) بالإضافة إلى جميع القوائم المنبثقة والـ Bottom Sheets (`.bottom-sheet`) إلى لون أبيض صلب معتم تماماً (`background: #FFFFFF !important`) لمنع ظهور فقاعات ودوائر الخلفية الملونة أو تداخل النصوص.
  - الـ Backdrop الخاص بأي قائمة أو نافذة منبثقة أصبح بخلفية معتمة دافئة (`rgba(15, 23, 42, 0.72)`) مع `z-index: 1000` لإبراز محتوى القوائم بتنسيق واضح وفائق الأناقة.

- **جدول مواصفات وبيانات القطعة المضافة من التاجر (The 9 Merchant Specs):**
  عند اختيار وعرض أي قطعة يظهر للعميل جدول منسق ومنظم يحتوي على البيانات التسعة المسجلة من قِبل التاجر:
  1. **القطعة:** اسم وتصنيف القطعة ثنائي اللغة (مثال: `فحمات / قماشات الفرامل (Brake Pad)`).
  2. **رقم الهيكل (VIN):** رقم الشاسيه أو البادئة إن وجدت (مثال: `4T1B21HK5MU...... (إن وجد)`).
  3. **رقم القطعة الأصلي (OEM):** الكود المرجعي للقطعة الأصلية (مثال: `04465-33480`).
  4. **نوع المركبة:** الشركة الصانعة (مثال: `تويوتا (Toyota)`).
  5. **الموديل:** موديل السيارة المتطابقة (مثال: `كامري (Camry)`).
  6. **سنة الصنع:** نطاق سنوات التصنيع المتوافقة (مثال: `2021 – 2023`).
  7. **المحرك:** سعة ونوع المحرك (مثال: `2.5 ليتر (2.5L)`).
  8. **الموقع:** موضع تركيب القطعة (مثال: `أمامي (Front)` أو خلفي).
  9. **التوافق:** حالة اعتماد التوافق بشارة خضراء مميزة (`✓ مؤكد (Confirmed)`).

- **فحص وتغيير السيارة:** كارت تفاعلي لفحص مطابقة القطعة مع سيارة العميل الحالية وفتح نافذة اختيار السيارة.
- **شريط الإجراءات الثابت بالأسفل:** شريط أبيض صلب يحتوي على زر `اشترِ الآن` وزر `أضف للسلة`.

---

### 4.7 لوحة تحكم وحساب التاجر (`account.html` / `addresses.html`)

- **كارت التاجر المعتمد (Merchant Profile Card):**
  - اسم التاجر: `Mohamed Ahmed`
  - البريد التجاري: `webmax.ceo.1@gmail.com`
  - شارة الاعتماد: `تاجر معتمد · متجر كفو للقطع`
  - تصميم أبيض صلب ومعتم تماماً (`background: #FFFFFF !important;`) لإلغاء أي شفافية أو بهتان للدوائر الخلفية.

- **تخصيص الخيارات بالكامل وفق متطلبات التاجر:**
  1. **طلبات العملاء الواردة (بدلاً من "طلباتي"):** التاجر لا يقوم بالطلب بل يستقبل طلبات الشراء والمبيعات من العملاء (رقم الطلب، اسم العميل، القطعة، المبلغ الإجمالي، وحالة الطلب: قيد التجهيز / جاهز للشحن).
  2. **عنوان التاجر وموقع المتجر (بدلاً من "عناوين الشحن"):** التاجر يمتلك موقع مستودع ومتجر رسمي معتمد للشحن والتسليم (الرياض، صناعية الدائري - مخرج 18، مستودع 14، ساعات العمل، وهاتف التواصل المباشر).
  3. **إضافة قطعة وتحديد السعر (بدلاً من "طلب تسعير قطعة"):** التاجر لا يطلب تسعيراً بل يسجل ويكتب السعر المباشر لقطعه، مع إدخال المواصفات الـ 9 بدقة (القطعة، رقم الهيكل، كود OEM، المركبة، الموديل، سنة الصنع، المحرك، الموقع، التوافق، وسعر البيع ر.س).
  4. **طلبات تسعير العملاء الواردة (بدلاً من "عروض الأسعار"):** استفسارات واردة من العملاء يبحثون عن قطع خاصة مع أرقام الشاسيه VIN، حيث يقوم التاجر بكتابة سعره المباشر وإرسال العرض للعميل.
  5. **محفظة التاجر والأرباح:** متابعة إجمالي المبيعات، الرصيد المتاح للسحب للحساب البنكي، وسجل التحويلات.
  6. **قطع المتجر والمخزون المعروض:** استعراض جميع القطع المعروضة للتاجر في كفو وتعديل الأسعار وتوافر المخزون.
  7. **مساعد كفو للتاجر:** فاحص تقني لمطابقة أرقام الهيكل (VIN) وأكواد OEM الرسمية مع كتالوجات الوكالة.
  8. **المكتبة وكتالوجات الوكالة:** وصول فوري لأدلة ومخططات قطع غيار تويوتا وغيرها.
  9. **إعدادات المتجر:** إدارة الرقم الضريبي الموثق وتنسيق الأرقام والأسعار.

---

## 5. خطة وهيكل الباك إند (Backend & Database Architecture)

عند الانتقال لبرمجة الباك إند (PHP & MySQL)، هذا هو المخطط الجاهز للتكامل الفوري:

### 5.1 مخطط جداول قاعدة البيانات (MySQL Schema)

```sql
-- 1. جدول المستخدمين (عملاء وتجار)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('customer', 'merchant', 'admin') DEFAULT 'merchant',
    wallet_balance DECIMAL(10,2) DEFAULT 0.00,
    avatar_url VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. جدول ماركات وموديلات السيارات
CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(50) NOT NULL,           -- تويوتا، هيونداي، نيسان
    model VARCHAR(50) NOT NULL,          -- كامري، كورولا، سوناتا
    year_from INT NOT NULL,              -- 2018
    year_to INT NOT NULL,                -- 2025
    vin_prefix VARCHAR(10) NULL          -- 4T1B, JTDK
);

-- 3. جدول فئات قطع الغيار
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,          -- engine, brakes, electrical, oils, suspension, lighting
    name_ar VARCHAR(80) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    tile_color VARCHAR(30) NOT NULL,
    sort_order INT DEFAULT 0
);

-- 4. جدول المنتجات وقطع الغيار متضمناً مواصفات التاجر الـ 9
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,          -- prod-1, prod-2, prod-3
    name VARCHAR(150) NOT NULL,
    brand VARCHAR(80) NOT NULL,
    oem_number VARCHAR(60) NOT NULL,
    category_id VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT NOT NULL,
    seller_name VARCHAR(120) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    stock_quantity INT DEFAULT 10,
    is_available BOOLEAN DEFAULT TRUE,
    description TEXT NULL,

    -- بيانات ومواصفات القطعة التسعة المسجلة من قِبل التاجر:
    spec_part_name VARCHAR(150) NOT NULL,       -- 1. القطعة: فحمات / قماشات الفرامل (Brake Pad)
    spec_vin_number VARCHAR(50) NULL,           -- 2. رقم الهيكل إن وجد
    spec_vehicle_make VARCHAR(80) NOT NULL,     -- 4. نوع المركبة: تويوتا (Toyota)
    spec_vehicle_model VARCHAR(80) NOT NULL,    -- 5. الموديل: كامري (Camry)
    spec_years_range VARCHAR(50) NOT NULL,      -- 6. سنة الصنع: 2021 – 2023
    spec_engine VARCHAR(50) NOT NULL,           -- 7. المحرك: 2.5 ليتر (2.5L)
    spec_position VARCHAR(50) NOT NULL,         -- 8. الموقع: أمامي (Front)
    spec_compatibility VARCHAR(50) DEFAULT 'مؤكد (Confirmed)', -- 9. التوافق: مؤكد

    origin_country VARCHAR(60) NULL,
    warranty_period VARCHAR(80) NULL,
    weight_kg DECIMAL(5,2) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 5. جدول توافق القطع مع السيارات وأرقام الهيكل
CREATE TABLE product_compatibilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    vehicle_id INT NOT NULL,
    specific_year INT NULL,
    vin_pattern VARCHAR(30) NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);

-- 6. جدول عناوين الشحن
CREATE TABLE shipping_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    tag_name VARCHAR(50) DEFAULT 'المنزل',
    recipient_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(80) NOT NULL,
    district VARCHAR(100) NOT NULL,
    street_address TEXT NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. جدول الطلبات
CREATE TABLE orders (
    id VARCHAR(30) PRIMARY KEY,          -- KAFU-849201
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    vat_amount DECIMAL(10,2) NOT NULL,   -- 15%
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cod', 'wallet', 'card') DEFAULT 'cod',
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (address_id) REFERENCES shipping_addresses(id)
);

-- 8. تفاصيل بنود الطلب
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(30) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 9. جدول مستودع وعنوان التاجر
CREATE TABLE merchant_stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    merchant_id INT NOT NULL,
    store_name VARCHAR(120) NOT NULL,
    city VARCHAR(80) NOT NULL,
    district VARCHAR(100) NOT NULL,
    warehouse_street TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    operating_hours VARCHAR(120) NOT NULL,
    vat_number VARCHAR(50) DEFAULT '302918294800003',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (merchant_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 10. جدول استفسارات التسعير وعروض الأسعار بين العملاء والتاجر
CREATE TABLE quote_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    customer_name VARCHAR(120) NOT NULL,
    vehicle_model VARCHAR(100) NOT NULL,
    vin_number VARCHAR(30) NOT NULL,
    part_description TEXT NOT NULL,
    merchant_price DECIMAL(10,2) NULL,        -- السعر المكتوب من التاجر
    merchant_id INT NULL,                      -- التاجر الذي قام بالتسعير
    status ENUM('pending', 'quoted', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (merchant_id) REFERENCES users(id)
);
```

---

### 5.2 واجهات الـ API المقترحة (REST Endpoints)

| المسار | الطريقة | الوصف |
|--------|---------|-------|
| `/api/products.php?q={query}&vin={vin}&category={cat}` | `GET` | البحث المتقدم بالاسم أو برقم الهيكل (VIN) أو رقم القطعة (OEM) مع فحص التوافق |
| `/api/products.php?id={id}` | `GET` | جلب تفاصيل قطعة معينة والمواصفات الكاملة |
| `/api/merchant/products.php` | `POST` | إضافة قطعة جديدة وتحديد السعر مع المواصفات الـ 9 للتاجر |
| `/api/merchant/orders.php` | `GET` / `PUT` | متابعة طلبات العملاء الواردة للتاجر وتحديث حالة التجهيز والشحن |
| `/api/merchant/store.php` | `GET` / `PUT` | جلب وتحديث عنوان المتجر والمستودع وساعات العمل |
| `/api/merchant/quotes.php` | `GET` / `POST` | استعراض طلبات تسعير العملاء وكتابة وإرسال السعر المباشر للعميل |
| `/api/cart.php` | `GET` / `POST` / `DELETE` | إدارة عربة التسوق في جلسة المستخدم أو قاعدة البيانات |
| `/api/orders.php` | `POST` | إنشاء وتأكيد طلب جديد وحساب الضريبة وحسم الرصيد |
| `/api/orders.php?id={id}` | `GET` | جلب بيانات الفاتورة وتفاصيل الشحنة وتوليد PDF |
| `/api/vehicle-check.php?vin={vin}` | `POST` | فك شفرة رقم الهيكل وجلب تفاصيل الموديل وكتالوج القطع المتوافقة |

---

## 6. هيكل ملفات المشروع الحالي

```
/index.html & /index.php          الرئيسية (كارت الهيرو الجديد مع اللوجو على الشمال وفئات 3×2)
/search.html & /search.php        البحث باسم القطعة أو رقم الهيكل (VIN)
/image-search.html & /image-search.php البحث بالصورة ومسح الذكاء الاصطناعي
/library.html & /library.php      صفحة المكتبة (الكتالوجات، الصيانة، الفواتير، وفحص VIN)
/cart.html & /cart.php            السلة ومودال الشحن وتأكيد الطلب
/product.html & /product.php      تفاصيل القطعة ومطابقة السيارة الحالية
/account.html & /account.php      الملف الشخصي والخيارات
/addresses.html & /addresses.php  إدارة عناوين الشحن
/assets/css/tokens.css            المتغيرات والألوان والـ Glassmorphism
/assets/css/components.css        كافة مكونات الواجهة وشريط التنقل والأزرار
/assets/js/products.js            بيانات القطع ورسومات الـ SVG وفحص التوافق وأرقام الهيكل
/assets/js/store.js               إدارة الحالة وحسابات السلة بالـ localStorage
/assets/js/app.js                 شريط التنقل السفلي ومودال السيارة وإشعارات الـ Toast
/kafu-ui-spec.md                  ملف المواصفات الشامل للواجهة والباك إند
```

---

## 7. ملخص التعديلات وإصلاحات الشكل (Layout & Visual Fixes)

1. **تصحيح ترتيب الشريط السفلي (RTL):** ترتيب التبويبات يبدأ من اليمين بـ "الرئيسية" وصولاً لأقصى اليسار بـ "الملف الشخصي" (الرئيسية -> البحث -> المفضلة -> السلة -> الملف الشخصي) بما يتوافق مع القراءة العربية.
2. **إصلاح بروز وتشوّه التبويب النشط:** ضبط مقاس الأيقونة النشطة لـ 44×44px وتوسيطها مع `padding: 0 14px` وارتفاع 62px للشريط لمنع تداخل الدائرة النشطة مع الحواف المنحنية للكبسولة.
3. **إعادة توازن وتناسق كارت الهيرو (Hero Card):** وضع شعار كفو واسم المتجر والوصف في كتلة متناسقة على اليمين (RTL Start)، ووضع أزرار الإشعارات والحساب واللغة على اليسار، مع تقليص الارتفاع وتحسين شفافية العلامة المائية.
4. **شريط بحث موحد ومحاذاة دقيقة:** ضبط حقل البحث مع محاذاة النص العربي لليمين ملاصقاً للعدسة ودمج زر الفحص بالصورة بشكل داخلي انسيابي.
5. **معالجة حجب المحتوى السفلي:** إزالة الهوامش السفلية الضيقة (96px و 90px) وتوحيد الهامش السفلي لجميع الصفحات (`padding-bottom: 130px-140px`) لضمان ظهور كافة كروت لوحة تحكم التاجر والفئات والمنتجات دون أي حجب من الشريط العائم.
6. **تنسيق كارت بروفايل التاجر:** تجميع الصورة والاسم والبريد والشارة في تدفق محاذاة متناسق لليمين لمنع الفراغات المشتتة أو تداخل النصوص الإنجليزية.
