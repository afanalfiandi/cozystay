import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import { Text, StyleSheet } from "react-native";
import { globalStyle } from "../style/globalStyle";
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';

const Rupiah = ({ numb }) => {
    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
    const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
        formatCurrency({ amount: Number(numb), code: 'IDR' });

    return (
        <Text style={[ globalStyle.textSm, styles.bold]}>{valueFormattedWithSymbol}</Text>
    );
};

export default Rupiah

const styles = StyleSheet.create({
    regular: {
        fontFamily: 'Poppins_400Regular'
    },
    regularItalic: {
        fontFamily: 'Poppins_400Regular_Italic'
    },
    semiBold: {
        fontFamily: 'Poppins_600SemiBold'
    },
    semiBoldItalic: {
        fontFamily: 'Poppins_600SemiBold_Italic'
    },
    bold: {
        fontFamily: 'Poppins_700Bold'
    },
    boldItalic: {
        fontFamily: 'Poppins_700Bold_Italic'
    },
    header: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})