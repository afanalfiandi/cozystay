import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { serverKey } from '../../config/paymentKey';

const payout = async () => {

    const no_rekening = 2222333344444;
    const nama_pemilik = 'Mandiri Simulator B';
    const nama_alias = 'simulatorbalias';
    const bank = 'mandiri';
    const email = 'beneficiary@example.com';

    try {
        let response = await fetch('https://app.sandbox.midtrans.com/iris', {
            headers: {
                'Accept': 'application/json',
                'Authorization': serverKey,
                'Content-Type': 'application/json',
                'X-Idempotency-Key': '980f4643-df3b-4fce-bb26-569948eaa53a'
            },
            method: 'POST',
            body: JSON.stringify({
                "payouts": [
                    {
                        "beneficiary_name": "Jon Snow",
                        "beneficiary_account": "1172993826",
                        "beneficiary_bank": "bni",
                        "beneficiary_email": "beneficiary@example.com",
                        "amount": "100000.00",
                        "notes": "Payout April 17"
                    },
                    {
                        "beneficiary_name": "John Doe",
                        "beneficiary_account": "112673910288",
                        "beneficiary_bank": "mandiri",
                        "amount": "50000.00",
                        "notes": "Payout May 17"
                    }
                ]
            })
        });

        let result = await response.json();
        return result;
    } catch (error) {

    }
}

export default payout