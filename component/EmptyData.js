import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { globalStyle } from '../style/globalStyle';
import { globalColor } from '../style/globalColor';

const EmptyData = () => {
    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <View style={{ width: '100%', height: Dimensions.get('screen').width + 100, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <View style={[globalStyle.spaceArround, { justifyContent: 'center', alignItems: 'center' }]}>
                <View style={{ width: 7, height: 125, margin: 5, backgroundColor: 'transparent', borderRadius: 100 }}></View>
            </View>
            <Text style={[styles.bold, globalStyle.inputLabel, { color: globalColor.dark }]}>Belum ada data</Text>
            <Text style={[styles.regular, { color: globalColor.muted }]}>Tidak ada data untuk ditampilkan</Text>
        </View>
    )
}

export default EmptyData

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
})