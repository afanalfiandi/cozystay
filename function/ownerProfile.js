import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { apiUrl } from '../config/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

async function ownerProfile(id, username, email, namaDepan, namaBelakang, whatsapp, noRekening, bank, namaPemilikRekening) {
    try {
        const response = await fetch(apiUrl + 'ownerProfile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                username: username,
                email: email,
                namaDepan: namaDepan,
                namaBelakang: namaBelakang,
                whatsapp: whatsapp,
                noRekening: noRekening,
                bank: bank,
                namaPemilikRekening: namaPemilikRekening
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default ownerProfile