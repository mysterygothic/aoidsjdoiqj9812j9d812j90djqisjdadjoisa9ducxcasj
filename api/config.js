/**
 * Vercel Serverless Function - Supabase Config Endpoint
 * يُرجع مفاتيح Supabase بشكل آمن من Environment Variables
 */

export default async function handler(req, res) {
  // السماح بـ CORS من أي مصدر (يمكنك تحديد النطاق الخاص بك)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // معالجة preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // السماح فقط بـ GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // التحقق من وجود المفاتيح في Environment Variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(500).json({ 
        error: 'Configuration error: Missing environment variables' 
      });
    }

    // إرجاع المفاتيح
    return res.status(200).json({
      supabaseUrl,
      supabaseAnonKey,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Config endpoint error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
