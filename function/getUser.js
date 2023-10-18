import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiUrl } from "../config/baseUrl";

async function getUser() {
    try {
        const data = JSON.parse(await AsyncStorage.getItem('userData'));
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default getUser