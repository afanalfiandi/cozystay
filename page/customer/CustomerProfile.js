import { RefreshControl, ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SkeletonList from '../../component/SkeletonList';
import mime from 'mime';
import * as ImagePicker from 'expo-image-picker';
import CustomerTab from '../../component/CustomerTab';
import { RadioButton, Checkbox } from 'react-native-paper';
import logout from '../../function/logout';
import getUser from '../../function/getUser';
import { dirUrl } from '../../config/baseUrl';
import customerProfile from '../../function/customerProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customerPass from '../../function/customerPass';
import profilePict from '../../function/profilePict';

const CustomerProfile = () => {

  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [modalPass, setModalPass] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(Math.random());
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [namaDepan, setNamaDepan] = useState('');
  const [namaBelakang, setNamaBelakang] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jk, setJk] = useState(1);

  const [lama, setLama] = useState();
  const [baru, setBaru] = useState();

  const [uri, seturi] = useState();
  const [name, setname] = useState();
  const [type, settype] = useState();
  const [imgPreview, setImgPreview] = useState(false);

  const [data, setData] = useState([]);
  onSubmit = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('userData'));

    setLoading(!loading);
    setTimeout(async () => {
      customerProfile(userData.id_user, username, email, namaDepan, namaBelakang, whatsapp, jk, alamat).then((result) => {
        if (result.status == 0) {
          ToastAndroid.show('Gagal!', 3000);
        } else {

          var jenis_kelamin = '';
          if (jk == 1) {
            var jenis_kelamin = 'Laki-laki';
          } else {
            var jenis_kelamin = 'Perempuan';
          }

          const newData = {
            alamat: alamat,
            email: email,
            id_jenis_kelamin: jk,
            id_level: userData.id_level,
            id_user: userData.id_user,
            jenis_kelamin: jenis_kelamin,
            message: userData.message,
            nama_belakang: namaBelakang,
            nama_depan: namaDepan,
            password: userData.password,
            profile_pict: userData.profile_pict,
            status: userData.status,
            username: username,
            whatsapp: whatsapp,
          };

          AsyncStorage.setItem('userData', JSON.stringify(newData));

          console.log(newData.profile_pict);
          seturi(uri);
          setname(newData.profile_pict);
          settype(type);

          ToastAndroid.show('Berhasil!', 3000);
        }


      })
      setLoading(false);
    }, 2000);
  }

  const onPass = async () => {

    const userData = JSON.parse(await AsyncStorage.getItem('userData'));
    setLoading(!loading);
    setTimeout(() => {
      customerPass(userData.id_user, lama, baru).then((result) => {
        if (result.status == 1) {
          ToastAndroid.show('Berhasil', 3000);
          setModalPass(false);
        } else if (result.status == 0) {
          ToastAndroid.show('Gagal', 3000);
          setModalPass(false);
        } else {
          ToastAndroid.show('Kata sandi tidak sesuai', 3000);
        }
        setLoading(false);
      });
    }, 2000);
  }

  const launchGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      let uri = result.assets[0].uri;
      let name = result.assets[0].uri.split('/').pop();;
      let type = mime.getType(result.assets[0].uri);
      const id = data.id_user;
      const level = data.id_level;

      profilePict(id, level, uri, name, type).then(async (result) => {
        if (result.status == 0) {
          ToastAndroid.show('Gagal!', 3000);
        } else {
          const currData = JSON.parse(await AsyncStorage.getItem('userData'));

          const newData = {
            alamat: currData.alamat,
            email: currData.email,
            id_jenis_kelamin: currData.id_jenis_kelamin,
            id_level: currData.id_level,
            id_user: currData.id_user,
            jenis_kelamin: currData.jenis_kelamin,
            nama_belakang: currData.nama_belakang,
            nama_depan: currData.nama_depan,
            profile_pict: result.img,
            username: currData.username,
            whatsapp: currData.whatsapp
          }
          AsyncStorage.setItem('userData', JSON.stringify(newData));
          seturi(uri);
          setname(result.img);
          settype(type);
          ToastAndroid.show('Berhasil!', 3000);
        }
      })
    }
  }

  const onLogout = async () => {
    Alert.alert("", "Apakah Anda yakin ingin keluar?", [
      {
        text: "Batal",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Keluar", onPress: () => {
          logout()
        }
      },
    ]);
  }

  useFocusEffect(
    React.useCallback(() => {
      getUser().then((result) => {
        setData(result);
        setUsername(result.username);
        setEmail(result.email);
        setNamaDepan(result.nama_depan);
        setNamaBelakang(result.nama_belakang);
        setWhatsapp(result.whatsapp);
        setAlamat(result.alamat);
        setJk(result.id_jenis_kelamin);
        setname(result.profile_pict);
      });

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }, [refresh]));
  return (
    <SafeAreaView style={[globalStyle.container, { width: '100%', padding: 0, paddingBottom: 80, backgroundColor: 'white' }]}>
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
                  <Image source={require('../../assets/icon/close-blue.png')} style={globalStyle.closeImg} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={globalStyle.modalForm}>
              <TouchableOpacity style={globalStyle.modalOptBtn} onPress={() => {
                setBank(1);
                setBankLabel('Mandiri');
                setModal(!modal);
              }}>
                <Text style={styles.regular}>Mandiri</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPass}
        onRequestClose={() => {
          setModalPass(!modalPass);
        }}>
        <View style={globalStyle.modalFormContainer}>
          <View style={globalStyle.modalContainer}>
            <View style={globalStyle.modalFormHeader}>
              <View style={globalStyle.headerTitleContainer}>
                <Text style={[globalStyle.text, styles.regular]}>Ubah Kata Sandi</Text>
              </View>
              <View style={globalStyle.headerBtnContainer}>
                <TouchableOpacity style={globalStyle.closeBtn} onPress={() => { setModalPass(!modalPass) }}>
                  <Image source={require('../../assets/icon/close-blue.png')} style={globalStyle.closeImg} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={globalStyle.modalForm}>
              <View>
                <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Kata Sandi Sebelumnya</Text>
                <View style={[globalStyle.formGroup, globalStyle.input]}>
                  <TextInput secureTextEntry placeholder='******' style={[globalStyle.inputText, styles.regular]} value={lama} onChangeText={setLama} />
                </View>
              </View>
              <View>
                <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Kata Sandi Baru</Text>
                <View style={[globalStyle.formGroup, globalStyle.input]}>
                  <TextInput secureTextEntry placeholder='******' style={[globalStyle.inputText, styles.regular]} value={baru} onChangeText={setBaru} />
                </View>
              </View>
              <View style={[globalStyle.formGroup]}>
                <TouchableOpacity style={[globalStyle.btnPrimary]} onPress={onPass}>
                  <Text style={[globalStyle.btnText, styles.bold]}>simpan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={imgPreview}
        onRequestClose={() => {
          setImgPreview(!imgPreview);
        }}>
        <View style={[globalStyle.imgModalContainer, { backgroundColor: 'transparent' }]}>
          <TouchableOpacity style={[globalStyle.closeImgModalBtn, globalStyle.rightBtnTop]} onPress={() => { setImgPreview(!imgPreview) }}>
            <Image style={globalStyle.closeImg} source={require('../../assets/icon/close-blue.png')} />
          </TouchableOpacity>
          <Image style={[globalStyle.showedImg,]} source={{ uri: dirUrl + 'profile_pict/' + name }} />
        </View>
      </Modal>
      <View style={[styles.header, { padding: 25 }]}>
        <View style={[globalStyle.headerTitleContainer, { alignItems: 'flex-start' }]}>
          <Text style={[globalStyle.text, styles.semiBold]}>Akun Saya</Text>
        </View>
        <TouchableOpacity onPress={onLogout}>
          <Text style={[globalStyle.text, styles.bold, { color: globalColor.red }]}>Keluar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={[globalStyle.scrollView, { width: Dimensions.get('screen').width, paddingHorizontal: 25 }]} refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => {
          setRefresh(Math.random())
        }} />
      }>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
          <View style={globalStyle.profileImgContainer}>
            <TouchableOpacity onPress={launchGallery} onLongPress={() => {
              setImgPreview(!imgPreview)
            }}>
              <Image resizeMode='contain' style={globalStyle.profileImg} source={{ uri: dirUrl + 'profile_pict/' + name }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={globalStyle.spaceBetween}>
          <Text style={[globalStyle.text, styles.bold]}>Data Diri</Text>
          <TouchableOpacity onPress={() => {
            setDisabled(!disabled)
          }}>
            <Text style={[globalStyle.text, styles.regular]}>{disabled ? 'Ubah' : 'Batal'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Username</Text>
          <View style={[globalStyle.formGroup, globalStyle.input]}>
            <TextInput editable={disabled ? false : true} value={username} onChangeText={setUsername} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
          </View>
        </View>
        <View>
          <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Email</Text>
          <View style={[globalStyle.formGroup, globalStyle.input]}>
            <TextInput editable={disabled ? false : true} value={email} onChangeText={setEmail} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
          </View>
        </View>
        <View>
          <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Depan</Text>
          <View style={[globalStyle.formGroup, globalStyle.input]}>
            <TextInput editable={disabled ? false : true} value={namaDepan} onChangeText={setNamaDepan} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
          </View>
        </View>
        <View>
          <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Belakang</Text>
          <View style={[globalStyle.formGroup, globalStyle.input]}>
            <TextInput editable={disabled ? false : true} value={namaBelakang} onChangeText={setNamaBelakang} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
          </View>
        </View>
        <View>
          <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>No. Telepon/Whatsapp</Text>
          <View style={[globalStyle.formGroup, globalStyle.input]}>
            <TextInput editable={disabled ? false : true} value={whatsapp} onChangeText={setWhatsapp} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
          </View>
        </View>
        <View>
          <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Jenis Kelamin</Text>
          <View style={globalStyle.radioContainer}>
            <View style={[globalStyle.radio, { width: '50%' }]}>
              <RadioButton
                disabled={disabled ? true : false}
                value="1"
                status={jk === 1 ? 'checked' : 'unchecked'}
                onPress={() => {
                  setJk(1);
                }}
              />
              <Text>Laki-laki</Text>
            </View>
            <View style={[globalStyle.radio, { width: '50%' }]}>
              <RadioButton
                disabled={disabled ? true : false}
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

        <View>
          <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Alamat</Text>
          <View style={[globalStyle.formGroup, globalStyle.input]}>
            <TextInput editable={disabled ? false : true} value={alamat} onChangeText={setAlamat} style={[globalStyle.inputText, styles.regular, { height: 100 }]} />
          </View>
        </View>

        <View style={[globalStyle.formGroup]}>
          <TouchableOpacity disabled={disabled ? true : false} style={[globalStyle.btnPrimary, { opacity: disabled ? 0.5 : 1 }]} onPress={onSubmit}>
            <Text style={[globalStyle.btnText, styles.bold]}>simpan</Text>
          </TouchableOpacity>
        </View>

        <View style={[globalStyle.divider, { marginBottom: 1 }]}></View>
        <View style={[globalStyle.formGroup, { paddingBottom: 200 }]}>
          <View style={[globalStyle.spaceBetween, { justifyContent: 'center' }]}>
            <Text style={[globalStyle.text, styles.regular]}>Ingin mengubah kata sandi? </Text>
            <TouchableOpacity onPress={() => {
              setModalPass(true);
            }}>
              <Text style={[globalStyle.text, styles.bold, { color: globalColor.primary }]}>Ubah disini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CustomerTab />
    </SafeAreaView >
  )
}

export default CustomerProfile


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