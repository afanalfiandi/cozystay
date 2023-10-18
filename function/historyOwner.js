import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { apiUrl } from '../config/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

async function historyOwner() {
    
    const userData = JSON.parse(await AsyncStorage.getItem('userData'));
    try {
        const response = await fetch(apiUrl + 'getRiwayatSewaPemilik', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userData.id_user
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


export default historyOwner