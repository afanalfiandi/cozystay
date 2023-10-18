import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { apiUrl } from '../config/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage';

const addKos = async (namaKos, jenisKos, alamat, fasilitas, jenisSewaKos, harga, latitude, longitude, img) => {

    const userData = JSON.parse(await AsyncStorage.getItem('userData'));
    const data = new FormData();
    data.append('idPemilik', userData.id_user);
    data.append('namaKos', namaKos);
    data.append('jenisKos', jenisKos);
    data.append('alamat', alamat);
    fasilitas.forEach((item) =>{
        data.append('fasilitas[]', item);
    })
    data.append('jenisSewaKos', jenisSewaKos);
    data.append('harga', harga);
    data.append('latitude', latitude);
    data.append('longitude', longitude);

    img.forEach((item, i) => {
        data.append('file[]', {
            uri: item.uri,
            type: item.type,
            name: item.name
        });
    })
    try {
        let res = await fetch(apiUrl + "addKos", {
            method: 'post',
            body: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        });

        let result = await res.json();

        return result;
    } catch (error) {
        console.log('error upload', error);
    }
}


export default addKos