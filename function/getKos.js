import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { apiUrl } from '../config/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

async function getKos() {
    try {
        const response = await fetch(apiUrl + 'getKos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default getKos