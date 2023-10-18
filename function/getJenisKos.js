import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { apiUrl } from '../config/baseUrl'

async function getJenisKos() {
    try {
        const response = await fetch(apiUrl + 'getJenisKos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


export default getJenisKos