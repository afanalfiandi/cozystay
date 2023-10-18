import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyle } from '../style/globalStyle'
import { globalColor } from '../style/globalColor'
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';

const BniInstruction = () => {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View>
      <View style={[globalStyle.spaceArround, { marginVertical: 5, alignItems: 'center' }]}>
        <View style={globalStyle.circle}>
          <Text style={[styles.semiBold, globalStyle.textWhite]}>1</Text>
        </View>
        <Text style={[styles.regular, globalStyle.text]}>Buka aplikasi BNI Mobile Banking</Text>
      </View>
      <View style={[globalStyle.spaceArround, { marginVertical: 5, alignItems: 'center' }]}>
        <View style={globalStyle.circle}>
          <Text style={[styles.semiBold, globalStyle.textWhite]}>2</Text>
        </View>
        <Text style={[styles.regular, globalStyle.text]}>Pilih Transfer {'>'} Pilih Virtual Account Billing</Text>
      </View>
      <View style={[globalStyle.spaceArround, { marginVertical: 5, alignItems: 'center' }]}>
        <View style={globalStyle.circle}>
          <Text style={[styles.semiBold, globalStyle.textWhite]}>3</Text>
        </View>
        <Text style={[styles.regular, globalStyle.text]}>Pilih Rekening Debet {'>'} Input Baru</Text>
      </View>
      <View style={[globalStyle.spaceArround, { marginVertical: 5, alignItems: 'center' }]}>
        <View style={globalStyle.circle}>
          <Text style={[styles.semiBold, globalStyle.textWhite]}>4</Text>
        </View>
        <Text style={[styles.regular, globalStyle.text]}>Masukkan 16 digit nomor Virtual Account</Text>
      </View>
      <View style={[globalStyle.spaceArround, { marginVertical: 5, alignItems: 'center' }]}>
        <View style={globalStyle.circle}>
          <Text style={[styles.semiBold, globalStyle.textWhite]}>4</Text>
        </View>
        <Text style={[styles.regular, globalStyle.text]}>Masukkan password Anda</Text>
      </View>
    </View>
  )
}

export default BniInstruction

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
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})