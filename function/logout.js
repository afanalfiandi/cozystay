import AsyncStorage from "@react-native-async-storage/async-storage"
import * as RootNavigation from './navigationRef';

const logout = () => {
    AsyncStorage.clear();
    RootNavigation.navigate('Auth');
}

export default logout