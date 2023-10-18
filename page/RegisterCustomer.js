import { Modal, ActivityIndicator, TextInput, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, Dimensions, BackHandler, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalColor } from '../style/globalColor';
import { globalStyle } from '../style/globalStyle';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RadioButton, Checkbox } from 'react-native-paper';
import registerCustomer from '../function/registerCustomer';

const RegisterCustomer = ({ route }) => {
  const navigation = useNavigation();
  const lvl = route.params.level;
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(Math.random());

  const [namaDepan, setNamaDepan] = useState();
  const [namaBelakang, setNamaBelakang] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [email, setEmail] = useState();
  const [alamat, setAlamat] = useState();
  const [username, setUsername] = useState();
  const [jk, setJk] = useState(1);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();


  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        navigation.navigate('ChooseLevel')
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [refresh]));

  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const signIn = () => {
    navigation.navigate('Auth');
  }

  const onSubmit = () => {
    setLoading(!loading);

    setTimeout(() => {
      if (password == confirmPassword) {
        registerCustomer(
          namaDepan,
          namaBelakang,
          whatsapp,
          email,
          username,
          alamat,
          jk,
          password).then((result) => {
            if (result.status == 1) {
              ToastAndroid.show('Berhasil!', 3000);
              navigation.navigate('Auth');
            } else {
              ToastAndroid.show('Gagal!', 3000);
            }
          })
      } else {
        ToastAndroid.show('Kata sandi tidak sesuai!', 3000);
      }
      setLoading(false);
    }, 2000);
  }
  return (
    <ScrollView style={globalStyle.scrollView}>
      <StatusBar
        animated={true}
        backgroundColor={globalColor.white}
        barStyle='dark-content'
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          setLoading(!loading);
        }}>
        <View style={globalStyle.loadingContainer}>
          <ActivityIndicator size="large" color={globalColor.primary} />
        </View>
      </Modal>
      <View style={[globalStyle.container, { marginBottom: Dimensions.get("screen").width / 1.2, }]}>
        <View style={styles.header}>
          <Image resizeMode='contain' source={require('../assets/logo/app-logo-blue.png')} />
          <Text style={[styles.bold, globalStyle.pageTitle]}>cozystay</Text>
        </View>
        <View style={globalStyle.form}>
          <Text style={[globalStyle.h1, styles.bold]}>Pendaftaran Akun Pencari Kos</Text>
          <Text style={[globalStyle.text, styles.regular, globalStyle.mb20]}>Silahkan lengkapi data dibawah ini</Text>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Depan</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={namaDepan} onChangeText={setNamaDepan} placeholder='Masukkan nama depan Anda' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Belakang</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={namaBelakang} onChangeText={setNamaBelakang} placeholder='Masukkan belakang Anda' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>No. Telepon/Whatsapp</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={whatsapp} onChangeText={setWhatsapp} placeholder='Diawali dengan 628xxxx' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Username</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={username} onChangeText={setUsername} placeholder='Masukkan username Anda' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>E-mail</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={email} onChangeText={setEmail} placeholder='Masukkan e-mail Anda' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Jenis Kelamin</Text>
            <View style={globalStyle.radioContainer}>
              <View style={globalStyle.radio}>
                <RadioButton
                  value="1"
                  status={jk === 1 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setJk(1);
                  }}
                />
                <Text>Laki-laki</Text>
              </View>
              <View style={globalStyle.radio}>
                <RadioButton
                  value="2"
                  status={jk === 2 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setJk(2);
                  }}
                />
                <Text>Perempuan</Text>
              </View>
            </View>
          </View>

          {/* <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Pekerjaan</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput placeholder='Masukkan pekerjaan' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View> */}

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Alamat</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={alamat} onChangeText={setAlamat} placeholder='Masukkan alamat lengkap' style={[globalStyle.inputText, styles.regular, { height: 100 }]} />
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Kata Sandi</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder='Masukkan kata sandi' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Konfirmasi Kata Sandi</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry placeholder='Masukkan ulang kata sandi' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View>

          <View style={[globalStyle.formGroup]}>
            <TouchableOpacity style={globalStyle.btnPrimary} onPress={onSubmit}>
              <Text style={[globalStyle.btnText, styles.bold]}>daftar</Text>
            </TouchableOpacity>
          </View>

          <View style={[globalStyle.formGroup]}>
            <View style={[globalStyle.spaceBetween, { justifyContent: 'center' }]}>
              <Text style={[globalStyle.text, styles.regular]}>Sudah punya akun? </Text>
              <TouchableOpacity onPress={signIn}>
                <Text style={[globalStyle.text, styles.bold, { color: globalColor.primary }]}>Masuk</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView >
  )
}

export default RegisterCustomer

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
    marginTop: Dimensions.get("screen").width / 1.3,
    // marginTop: 100,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
})