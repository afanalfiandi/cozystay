import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { apiUrl } from '../../config/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getPaymentDetail = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('userData'));
    try {
        let response = await fetch(apiUrl + 'getTransaction', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id_user: userData.id_user
            })
        });

        let result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
    }
}

export default getPaymentDetail