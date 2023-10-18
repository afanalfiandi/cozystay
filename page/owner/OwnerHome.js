import { RefreshControl, ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SkeletonList from '../../component/SkeletonList';
import OwnerTab from '../../component/OwnerTab';
import getUser from '../../function/getUser';
import getOwnerKos from '../../function/getOwnerKos';
import EmptyData from '../../component/EmptyData';
import FloatingBtn from '../../component/FloatingBtn';
import { dirUrl } from '../../config/baseUrl'
import Rupiah from '../../component/Rupiah';
import deleteKos from '../../function/deleteKos';

const OwnerHome = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(Math.random());
  const [userData, setUserData] = useState([]);
  const [kosData, setKosData] = useState([]);
  const [newNotification, setNewNotification] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getUser().then(result => {
        setUserData(result);
      });

      getOwnerKos().then(result => {
        console.log(result);
        if (result.status != 0) {
          setKosData(result);
        }
      })
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      const backAction = () => {
        Alert.alert("", "Apakah Anda yakin ingin keluar dari aplikasi?", [
          {
            text: "Batal",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Keluar", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [refresh]));

  const onDelete = (id) => {
    Alert.alert("", "Apakah Anda yakin ingin menghapus data?", [
      {
        text: "Batal",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Hapus", onPress: () => {
          deleteKos(id).then((result) => {
            setRefresh(Math.random());
            if (result.status == 1) {
              setLoading(true);
              getOwnerKos().then(result => {
                if (result.status != 0) {
                  setKosData(result);
                } else {
                  setKosData([]);
                }
              })
              setTimeout(() => {
                ToastAndroid.show('Berhasil!', 3000);
                setLoading(false);
              }, 3000);
            } else {
              ToastAndroid.show('Gagal!', 3000);
            }
          })
        }
      },
    ]);
  }

  const onView = async (id) => {
    // console.warn(id);
    navigation.navigate('OwnerView', {
      id: id
    });
  }
  const Item = ({
    alamat,
    fasilitas,
    harga,
    id_jenis_kos,
    id_jenis_sewa,
    id_pemilik,
    kos_id,
    latitude,
    longitude,
    message,
    nama_depan,
    nama_kos,
    nama_pemilik_rekening,
    no_rekening,
    status,
    tgl_input,
    whatsapp,
    img,
    jenis_kos,
    jenis_sewa,
    label,
    key
  }) => (
    <View>
      <View style={globalStyle.listContainer}>
        <View style={[globalStyle.listCol, globalStyle.listColImg]}>
          <Image style={globalStyle.listImg} source={{ uri: dirUrl + 'kos/' + img }} />
        </View>
        <View style={globalStyle.listCol}>
          <View style={globalStyle.listHeader}>
            <View style={globalStyle.listCategoryContainer}>
              <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{jenis_kos}</Text>
            </View>
            <View style={globalStyle.listBtnHeaderContainer}>
              <TouchableOpacity style={[globalStyle.headerBtn, { backgroundColor: globalColor.red }]} onPress={() => { onDelete(kos_id) }}>
                <Image source={require('../../assets/icon/trash-white.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyle.headerBtn, { backgroundColor: globalColor.primary }]} onPress={() => {
                onView(kos_id)
              }}>
                <Image source={require('../../assets/icon/eye-white.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={globalStyle.listContent}>
            <Text style={[globalStyle.text, styles.semiBold]}>{nama_kos}</Text>
            <View style={globalStyle.listAddressContainer}>
              <Image style={{ marginRight: 5 }} source={require('../../assets/icon/location-sm.png')} />
              <Text style={[globalStyle.textSm, styles.regular]}>{alamat}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <View style={globalStyle.facilityContainer}>
                <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{fasilitas} </Text>
              </View>
            </View>
            <View style={[globalStyle.costContainer, { alignItems: 'center' }]}>
              <Rupiah numb={harga} />
              <Text style={[styles.regular, globalStyle.textSm]}>/{label}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={globalStyle.divider}></View>
    </View>
  );

  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={[globalStyle.container, { marginBottom: 10, paddingBottom: 10, justifyContent: 'flex-start' }]}>
      <StatusBar
        animated={true}
        backgroundColor={globalColor.white}
        barStyle='dark-content'
      />
      <View style={styles.header}>
        <Text style={[globalStyle.text, styles.semiBold]}>Hai, {userData.nama_depan}</Text>
        <View>
          <TouchableOpacity style={globalStyle.rightBtnTop} onPress={() => {
            navigation.navigate('OwnerProfile');
          }}>
            <Image source={require('../../assets/icon/user-blue.png')} />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={globalStyle.rightBtnTop}>
            <Image source={require('../../assets/icon/outline-bell-blue.png')} />
          </TouchableOpacity> 
          {newNotification && (
            <View style={globalStyle.badge}></View>
          )}
        </View> */}
      </View>
      <View style={[globalStyle.content, { backgroundColor: 'transparent' }]}>
        <Text style={[globalStyle.h1, styles.bold, { color: globalColor.dark }]}>Daftar Kos Anda</Text>
        {loading && (
          <SkeletonList />
        )}

        {!loading && kosData.length > 0 && (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={() => {
                setRefresh(Math.random())
              }} />
            }
            contentContainerStyle={{ paddingBottom: 80 }}
            data={kosData}
            renderItem={({ item, index }) => <Item
              alamat={item.alamat}
              fasilitas={item.fasilitas}
              harga={item.harga}
              id_jenis_kos={item.id_jenis_kos}
              id_jenis_sewa={item.id_jenis_sewa}
              id_pemilik={item.id_pemilik}
              kos_id={item.kos_id}
              latitude={item.latitude}
              longitude={item.longitude}
              message={item.message}
              nama_depan={item.nama_depan}
              nama_kos={item.nama_kos}
              nama_pemilik_rekening={item.nama_pemilik_rekening}
              no_rekening={item.no_rekening}
              status={item.status}
              tgl_input={item.tgl_input}
              whatsapp={item.whatsapp}
              img={item.img}
              jenis_kos={item.jenis_kos}
              jenis_sewa={item.jenis_sewa}
              label={item.label}
            />}
            keyExtractor={(item, index) => {
              return index;
            }}
          />
        )}

        {!loading && kosData.length <= 0 && (
          <EmptyData refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => {
              setRefresh(Math.random())
            }} />
          } />
        )}

      </View>
      <FloatingBtn />
      <OwnerTab />
    </SafeAreaView>
  )
}

export default OwnerHome

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