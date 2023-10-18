import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import { apiUrl, paymentUri } from '../../config/baseUrl'
import paymentDb from './paymentDb'
import { serverKey } from '../../config/paymentKey'

const bni = async (
    no_transaksi,
    harga,
) => {
    try {
        let response = await fetch(paymentUri, {
            headers: {
                'Accept': 'application/json',
                'Authorization': serverKey,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                payment_type: "bank_transfer",
                transaction_details: {
                    order_id: no_transaksi,
                    gross_amount: harga
                },
                bank_transfer: {
                    bank: "bni"
                }
            })
        })

        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}
export default bni