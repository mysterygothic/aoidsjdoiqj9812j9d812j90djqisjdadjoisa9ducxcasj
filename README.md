# 🔐 Supabase Config Proxy - Vercel Deployment

هذا المشروع عبارة عن **Serverless Function** بسيط على Vercel يُخفي مفاتيح Supabase ويُرجعها بشكل آمن.

## 📋 المتطلبات

- حساب [Vercel](https://vercel.com) (مجاني)
- [Vercel CLI](https://vercel.com/cli) (اختياري للتطوير المحلي)

## 🚀 خطوات النشر

### 1️⃣ تثبيت Vercel CLI (اختياري)

```bash
npm install -g vercel
```

### 2️⃣ نشر المشروع على Vercel

#### الطريقة الأولى: من خلال Vercel Dashboard (الأسهل)

1. افتح [Vercel Dashboard](https://vercel.com/dashboard)
2. اضغط على **"Add New Project"**
3. اختر **"Import Git Repository"** أو ارفع المجلد مباشرة
4. حدد مجلد `vercel-config`
5. اضغط **"Deploy"**

#### الطريقة الثانية: من خلال CLI

```bash
cd vercel-config
vercel
```

اتبع التعليمات:
- اختر **"Yes"** لإنشاء مشروع جديد
- اختر اسم المشروع
- اضغط Enter للإعدادات الافتراضية

### 3️⃣ إضافة Environment Variables

بعد النشر، أضف المفاتيح في Vercel Dashboard:

1. افتح مشروعك في [Vercel Dashboard](https://vercel.com/dashboard)
2. اذهب إلى **Settings** → **Environment Variables**
3. أضف المتغيرات التالية:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | `https://noooysoqieuuaogrhlty.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vb295c29xaWV1dWFvZ3JobHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTExMjgsImV4cCI6MjA3NjgyNzEyOH0.W9EexKNYoErZf_8DmiBv0KfvYKy-pbBlvC3lMVEf7Bc` |

4. اضغط **"Save"**
5. أعد نشر المشروع (Redeploy) لتطبيق التغييرات

### 4️⃣ الحصول على رابط Vercel

بعد النشر، ستحصل على رابط مثل:
```
https://your-project-name.vercel.app
```

### 5️⃣ تحديث الكود في GitHub Pages

افتح ملف `supabase-secure-config-vercel.js` وحدث السطر 5:

```javascript
const VERCEL_CONFIG_ENDPOINT = 'https://your-project-name.vercel.app/api/config';
```

### 6️⃣ استبدال الملف القديم

في صفحات HTML، استبدل:
```html
<script src="supabase-secure-config.js"></script>
```

بـ:
```html
<script src="supabase-secure-config-vercel.js"></script>
```

## 🧪 اختبار الـ API

بعد النشر، اختبر الـ endpoint:

```bash
curl https://your-project-name.vercel.app/api/config
```

يجب أن ترى:
```json
{
  "supabaseUrl": "https://noooysoqieuuaogrhlty.supabase.co",
  "supabaseAnonKey": "eyJhbGc...",
  "timestamp": "2025-01-10T19:09:00.000Z"
}
```

## 📁 هيكل المشروع

```
vercel-config/
├── api/
│   └── config.js          # Serverless Function
├── package.json           # تعريف المشروع
├── vercel.json           # إعدادات Vercel
├── .gitignore            # ملفات مستبعدة من Git
└── README.md             # هذا الملف
```

## 🔒 الأمان

- ✅ المفاتيح مخزنة في **Environment Variables** على Vercel
- ✅ لا توجد مفاتيح في الكود المصدري
- ✅ CORS مفعّل للسماح بالوصول من GitHub Pages
- ✅ الـ endpoint يقبل فقط GET requests

## 🌐 CORS Configuration (اختياري)

إذا أردت تحديد النطاقات المسموحة فقط، عدّل `api/config.js`:

```javascript
// بدلاً من '*' ضع نطاقك
res.setHeader('Access-Control-Allow-Origin', 'https://your-github-pages.github.io');
```

## 🔄 التحديثات المستقبلية

لتحديث المفاتيح:
1. اذهب إلى **Vercel Dashboard** → **Settings** → **Environment Variables**
2. عدّل القيم
3. أعد نشر المشروع (Redeploy)

## 💡 نصائح

- **مجاني تماماً**: Vercel يوفر 100GB bandwidth شهرياً مجاناً
- **سريع**: Serverless Functions تعمل على Edge Network
- **آمن**: المفاتيح لا تظهر أبداً في الكود المصدري
- **سهل التحديث**: غيّر المفاتيح من Dashboard فقط

## 📞 الدعم

إذا واجهت مشاكل:
1. تحقق من Environment Variables في Vercel
2. تأكد من رابط الـ endpoint صحيح
3. افحص Console في المتصفح للأخطاء

---

**تم! 🎉** الآن مفاتيح Supabase مخفية بشكل كامل على Vercel.
