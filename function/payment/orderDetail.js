import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { serverKey } from '../../config/paymentKey';

const mandiri = async (orderID) => {
    const uri = 'https://api.sandbox.midtrans.com/v2/' + orderID + '/status';
    try {
        let response = await fetch(uri, {
            headers: {
                'Accept': 'application/json',
                'Authorization': serverKey,
                'Content-Type': 'application/json'
            },
        })

        const result = await response.json();
        return result;
    } catch (error) {

    }
}

export default mandiri