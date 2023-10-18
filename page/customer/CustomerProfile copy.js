import { ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions } from 'react-native'
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

const CustomerProfile = () => {

  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [modalPass, setModalPass] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bank, setBank] = useState();
  const [bankLabel, setBankLabel] = useState('Pilih Nama Bank');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(Math.random());
  const [uri, seturi] = useState();
  const [name, setname] = useState();
  const [type, settype] = useState();
  const [jk, setJk] = useState(1);
  const [imgPreview, setImgPreview] = useState(false);
  onSubmit = async () => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  const onPass = async () => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
      setModalPass(false);
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

      seturi(uri);
      setname(name);
      settype(type);
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
  return (
    <SafeAreaView style={[globalStyle.container, { width: '100%', padding: 0, paddingBottom: 80, backgroundColor: 'white' }]}>
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
                  <TextInput secureTextEntry placeholder='******' style={[globalStyle.inputText, styles.regular]} />
                </View>
              </View>
              <View>
                <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Belakang</Text>
                <View style={[globalStyle.formGroup, globalStyle.input]}>
                  <TextInput secureTextEntry placeholder='******' style={[globalStyle.inputText, styles.regular]} />
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
          <Image style={[globalStyle.showedImg,]} source={require('../../assets/img/user-default.png')} />
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
      <ScrollView contentContainerStyle={[globalStyle.scrollView, { width: Dimensions.get('screen').width, paddingHorizontal: 25 }]}>
        <View style={globalStyle.profileImgContainer}>
          <TouchableOpacity onPress={launchGallery} onLongPress={() => {
            setImgPreview(!imgPreview)
          }}>
            <Image resizeMode='contain' style={globalStyle.profileImg} source={require('../../assets/img/user-default.png')} />
          </TouchableOpacity>
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
          <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Depan</Text>
          <View style={[globalStyle.formGroup, globalStyle.input]}>
            <TextInput editable={disabled ? false : true} placeholder='Masukkan nama depan Anda' style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
          </View>
        </View>
        <View>
          <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Belakang</Text>
          <View style={[globalStyle.formGroup, globalStyle.input]}>
            <TextInput editable={disabled ? false : true} placeholder='Masukkan nama belakang Anda' style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
          </View>
        </View>
        <View>
          <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>No. Telepon/Whatsapp</Text>
          <View style={[globalStyle.formGroup, globalStyle.input]}>
            <TextInput editable={disabled ? false : true} placeholder='Masukkan nama belakang Anda' style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
          </View>
        </View>
        <View>
          <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>No. Rekening</Text>
          <View style={[globalStyle.formGroup, globalStyle.input]}>
            <TextInput editable={disabled ? false : true} placeholder='Masukkan no. rekening Anda' style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
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
            <TextInput editable={disabled ? false : true} placeholder='Masukkan alamat lengkap' style={[globalStyle.inputText, styles.regular, { height: 100 }]} />
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