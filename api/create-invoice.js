export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обрабатываем preflight запрос
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Разрешаем только POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, asset, description } = req.body;

    console.log('📨 Creating invoice:', { amount, asset });

    // ТЕСТОВЫЕ ДАННЫЕ (работают без Crypto Bot)
    const testInvoice = {
      success: true,
      invoice: {
        invoice_id: 'test_invoice_' + Date.now(),
        hash: 'test_hash_' + Math.random().toString(36).substring(2),
        asset: asset || 'USDT',
        amount: parseFloat(amount),
        pay_url: `https://t.me/CryptoBot?start=TEST_${Date.now()}`,
        description: description || 'Пополнение баланса Stoke Shop',
        status: 'active',
        created_at: new Date().toISOString(),
        allow_comments: true,
        allow_anonymous: true,
        expiration_date: new Date(Date.now() + 3600000).toISOString()
      }
    };

    console.log('✅ Invoice created:', testInvoice.invoice.invoice_id);
    
    return res.status(200).json(testInvoice);

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error: ' + error.message 
    });
  }
}
