import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { apiUrl } from '../config/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage';

const applyRent = async (id_kos, tgl_mulai) => {
    const userData = JSON.parse(await AsyncStorage.getItem('userData'));
    try {
        const response = await fetch(apiUrl + 'applyRent', {
            method: 'POST',
            body: JSON.stringify({
                id_kos: id_kos,
                id_pencari: userData.id_user,
                tgl_mulai: tgl_mulai
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {

    }

}


export default applyRent