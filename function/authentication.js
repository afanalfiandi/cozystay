import { ToastAndroid } from 'react-native';
import { apiUrl } from '../config/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from './navigationRef';

const authentication = async (username, password, level) => {
    try {
        fetch(apiUrl + 'auth', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                level: level
            })
        }).then((res) => res.json())
            .then((resp) => {
                if (resp.status == 0) {
                    ToastAndroid.show('Username atau password salah!', 3000);
                } else {
                    if (level == 1) {
                        RootNavigation.navigate('CustomerHome');
                    } else {
                        RootNavigation.navigate('OwnerHome');
                    }
                    AsyncStorage.setItem('userData', JSON.stringify(resp));
                    AsyncStorage.setItem('loggedIn', 'true');
                }
            })
    } catch (e) {
        ToastAndroid.show('Koneksi Bermasalah', 3000);
    }
}

export default authentication