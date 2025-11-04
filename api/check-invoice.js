export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { invoice_id } = req.body;

    console.log('🔍 Checking invoice:', invoice_id);

    // Случайный статус для тестирования
    const statuses = ['active', 'active', 'active', 'paid']; // 25% шанс оплаты
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    const result = {
      success: true,
      invoice: {
        invoice_id: invoice_id,
        status: randomStatus,
        hash: 'check_' + Math.random().toString(36).substring(2),
        asset: 'USDT',
        amount: 10.00,
        pay_url: `https://t.me/CryptoBot?start=CHECK_${invoice_id}`,
        created_at: new Date().toISOString(),
        paid_at: randomStatus === 'paid' ? new Date().toISOString() : null
      }
    };

    console.log('✅ Invoice status:', randomStatus);
    
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
