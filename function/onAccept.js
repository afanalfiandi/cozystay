import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { apiUrl } from '../config/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

async function onAccept(no_transaksi, status) {
    try {
        const response = await fetch(apiUrl + 'onAccept', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                no_transaksi: no_transaksi,
                status: status,
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default onAccept