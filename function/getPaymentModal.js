import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { apiUrl } from '../config/baseUrl'

async function getPaymentModal() {
    try {
        const response = await fetch(apiUrl + 'getPaymentModal');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


export default getPaymentModal