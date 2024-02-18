// pages/api/transfer.js
import axios from 'axios';

function generateUniqueReference() {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `TRANSFER-${timestamp}-${randomString}`;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const apiKey = 'FLWSECK-3ce73f7b6e82521acef66ddd483efccf-18d897f8ca0vt-X';
      const flutterwaveTransferEndpoint = 'https://api.flutterwave.com/v3/transfers';
      const recipientBankCode = '044'; // Replace with the recipient's bank code
      const recipientAccountNumber = '1691736580'; // Replace with the recipient's account number
      const amount = 200;
      const narration = 'Payment for things';

      const reference = generateUniqueReference();

      const response = await axios.post(
        flutterwaveTransferEndpoint,
        {
          account_bank: recipientBankCode,
          account_number: recipientAccountNumber,
          amount: amount,
          narration: narration,
          currency: 'NGN',
          reference: reference,
          callback_url: 'https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d',
          debit_currency: 'NGN',
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      console.log(response.data);

      // Store the reference in your database or system if needed

      res.status(200).json({ success: true, message: 'Transfer successful', reference: reference });
    } catch (error) {
      console.error('Flutterwave API Error:', error.response.data);
      res.status(500).json({ success: false, message: 'Transfer failed', error: error.response.data });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
