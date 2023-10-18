import { ActivityIndicator, Modal, TextInput, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, Dimensions, BackHandler, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalColor } from '../style/globalColor';
import { globalStyle } from '../style/globalStyle';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import getPayment from '../function/getPayment';
import { apiUrl } from '../config/baseUrl';
import registerOwner from '../function/registerOwner';

const RegisterOwner = ({ route }) => {
  const navigation = useNavigation();
  const lvl = route.params.level;
  const [modal, setModal] = useState(false);

  const [namaDepan, setNamaDepan] = useState('');
  const [namaBelakang, setNamaBelakang] = useState('');
  const [telp, setTelp] = useState('');
  const [email, setEmail] = useState('');
  const [rekening, setRekening] = useState('');
  const [pemilikRekening, setPemilikRekening] = useState('');
  const [jenisPembayaran, setJenisPembayaran] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [bank, setBank] = useState([]);
  const [bankLabel, setBankLabel] = useState('Pilih Nama Bank');

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(Math.random());

  useFocusEffect(
    React.useCallback(() => {
      getPayment().then(result => {
        setBank(result);
      });

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
        registerOwner(jenisPembayaran, namaDepan, namaBelakang, telp, rekening, pemilikRekening, username, password, email);
      } else {
        ToastAndroid.show('Kata sandi tidak sesuai', 3000);
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <View style={globalStyle.modalFormContainer}>
          <View style={globalStyle.modalContainer}>
            <View style={globalStyle.modalFormHeader}>
              <View style={globalStyle.headerTitleContainer}>
                <Text style={[globalStyle.text, styles.regular]}>Pilih Bank</Text>
              </View>
              <View style={globalStyle.headerBtnContainer}>
                <TouchableOpacity style={globalStyle.closeBtn} onPress={() => { setModal(!modal) }}>
                  <Image source={require('../assets/icon/close-blue.png')} style={globalStyle.closeImg} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={globalStyle.modalForm}>
              {bank.map((item, index) => {
                return (
                  <TouchableOpacity style={globalStyle.modalOptBtn} onPress={() => {
                    setJenisPembayaran(item.id_jenis_pembayaran);
                    setBankLabel(item.jenis_pembayaran);
                    setModal(!modal);
                  }} key={index}>
                    <Text style={styles.regular}>{item.jenis_pembayaran}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </View>
      </Modal>
      <View style={[globalStyle.container, { marginBottom: Dimensions.get("screen").width / 1.1, }]}>
        <View style={[styles.header, { marginTop: Dimensions.get("screen").width / 1.1 }]}>
          <Image resizeMode='contain' source={require('../assets/logo/app-logo-blue.png')} />
          <Text style={[styles.bold, globalStyle.pageTitle]}>cozystay</Text>
        </View>
        <View style={globalStyle.form}>
          <Text style={[globalStyle.h1, styles.bold]}>Pendaftaran Akun Pemilik Kos</Text>
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
              <TextInput value={telp} onChangeText={setTelp} placeholder='Diawali dengan 628xxxx' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>E-mail</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={email} onChangeText={setEmail} placeholder='Masukkan e-mail Anda' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>No. Rekening</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={rekening} onChangeText={setRekening} placeholder='Masukkan no. rekening Anda' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Bank</Text>
            <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input]}>
              <TouchableOpacity style={globalStyle.inputSelect} onPress={() => {
                setModal(!modal);
              }}>
                <Text style={[styles.regular, { color: globalColor.muted }]}> {bankLabel} </Text>
              </TouchableOpacity>
              <View style={globalStyle.imgInputContainer}>
                <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../assets/icon/arrow-right-sm.png')} />
              </View>
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Pemilik Rekening</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={pemilikRekening} onChangeText={setPemilikRekening} placeholder='Masukkan nama pemilik rekening' style={[globalStyle.inputText, styles.regular]} />
            </View>
          </View>

          <View>
            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Username</Text>
            <View style={[globalStyle.formGroup, globalStyle.input]}>
              <TextInput value={username} onChangeText={setUsername} placeholder='Masukkan username' style={[globalStyle.inputText, styles.regular]} />
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
            <TouchableOpacity style={[globalStyle.btnPrimary, { opacity: namaDepan == '' || namaBelakang == '' || telp == '' || email == '' || rekening == '' || jenisPembayaran == '' || pemilikRekening == '' || password == '' || confirmPassword == '' ? 0.5 : 1 }]} onPress={onSubmit} disabled={namaDepan == '' || namaBelakang == '' || telp == '' || email == '' || rekening == '' || jenisPembayaran == '' || pemilikRekening == '' || password == '' || confirmPassword == '' ? true : false}>
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
    </ScrollView>
  )
}

export default RegisterOwner

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
    marginTop: Dimensions.get("screen").width / 1.4,
    // marginTop: 100,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }
})