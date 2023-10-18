import { ToastAndroid } from 'react-native';
import { apiUrl } from '../config/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from './navigationRef';

const registerOwner = async (jenis_pembayaran, nama_depan, nama_belakang, whatsapp, no_rekening, nama_pemilik_rekening, username, password, email) => {
    try {
        fetch(apiUrl + 'registerPemilik', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jenis_pembayaran: jenis_pembayaran,
                nama_depan: nama_depan,
                nama_belakang: nama_belakang,
                whatsapp: whatsapp,
                no_rekening: no_rekening,
                nama_pemilik_rekening: nama_pemilik_rekening,
                username: username,
                password: password,
                email: email,
            })
        }).then((res) => res.json())
            .then((resp) => {
                if (resp.status == 0) {
                    ToastAndroid.show('Pendaftaran akun gagal!', 3000);
                } else {
                    ToastAndroid.show('Pendaftaran akun berhasil!', 3000);
                    RootNavigation.navigate('Auth');
                }
            })
    } catch (e) {
        ToastAndroid.show('Koneksi Bermasalah', 3000);
    }
}

export default registerOwner