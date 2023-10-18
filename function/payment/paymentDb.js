import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { apiUrl } from '../../config/baseUrl'

const paymentDb = async (
    no_transaksi,
    jenis_pembayaran,
) => {
    try {
        let db = await fetch(apiUrl + 'payment', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                no_transaksi: no_transaksi,
                jenis_pembayaran: jenis_pembayaran,
            })
        })

        let dbResult = db.json();
        return dbResult;
    } catch (error) {
        console.log(error)
    }
}

export default paymentDb