import { ToastAndroid } from 'react-native';
import { apiUrl } from '../config/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from './navigationRef';

const registerCustomer = async (
    namaDepan,
    namaBelakang,
    whatsapp,
    email,
    username,
    alamat,
    jk,
    password) => {
    try {
        const response = await fetch(apiUrl + 'registerCustomer', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                namaDepan: namaDepan,
                namaBelakang: namaBelakang,
                whatsapp: whatsapp,
                email: email,
                username: username,
                alamat: alamat,
                jk: jk,
                password: password
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default registerCustomer