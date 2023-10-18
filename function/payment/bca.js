import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { serverKey } from '../../config/paymentKey';

const bca = async (
    no_transaksi,
    harga) => {
    const uri = 'https://api.sandbox.midtrans.com/v2/charge';
    try {
        let response = await fetch(uri, {
            headers: {
                'Accept': 'application/json',
                'Authorization': serverKey,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "payment_type": "bank_transfer",
                "transaction_details": {
                    "gross_amount": harga,
                    "order_id": no_transaksi
                },
                "bank_transfer": {
                    "bank": "bca"
                }
            })
        })

        const result = await response.json();
        return result;
    } catch (error) {

    }
}

export default bca