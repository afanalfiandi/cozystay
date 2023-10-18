import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { globalStyle } from '../style/globalStyle';
import { globalColor } from '../style/globalColor';

const Empty = () => {
    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: Dimensions.get("screen").height * 0.35 }}>
            <Text style={[styles.bold, globalStyle.inputLabel, { color: globalColor.dark }]}>Belum ada data</Text>
            <Text style={[styles.regular, { color: globalColor.muted }]}>Tidak ada data untuk ditampilkan</Text>
            <View style={[globalStyle.spaceArround, { justifyContent: 'center', alignItems: 'center' }]}>
                <View style={{ width: 7, margin: 5, backgroundColor: 'transparent', borderRadius: 100 }}></View>
            </View>
        </View>
    )
}

export default Empty

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