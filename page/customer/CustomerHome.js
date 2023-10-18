import { RefreshControl, PermissionsAndroid, ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions, Touchable, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SkeletonList from '../../component/SkeletonList';
import SkeletonCard from '../../component/SkeletonCard';
import { Avatar, Button, Card } from 'react-native-paper';
import CustomerTab from '../../component/CustomerTab';
import getUser from '../../function/getUser';
import getKos from '../../function/getKos';
import Empty from '../../component/Empty';
import { dirUrl } from '../../config/baseUrl';
import Rupiah from '../../component/Rupiah';
import getNearestKos from '../../function/getNearestKos';
import * as Location from 'expo-location';

const CustomerHome = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(Math.random());
  const [userData, setUserData] = useState([]);
  const [newest, setNewest] = useState([]);
  const [nearest, setNearest] = useState([]);
  const [reload, setReload] = useState(false);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  const getLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let lat = location.coords.latitude;
        let long = location.coords.longitude;

        setLat(lat);
        setLong(long);
      } catch (error) {
        console.log(error)
        ToastAndroid.show("Koneksi bermasalah!", 3000);
      }
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      getUser().then(result => {
        setUserData(result);
      });

      getKos().then((result) => {
        if (result.status != 0) {
          setNewest(result);
        }
      })

      getLocation();

      getNearestKos(lat, long).then((result) => {
        if (result.status != 0) {
          setNearest(result);
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

  const DATA = [
    {
      id: '1',
      cat: 'Putra',
      img: require('../../assets/kost/potrait-1.png'),
      name: 'The Retro Residence',
      address: 'Jl. Jendral Soedirman No. 17',
      fac: [
        { facility: 'Kamar mandi dalam' },
        { facility: 'AC' },
        { facility: 'Wi-Fi' },
        { facility: 'Listrik' },
        { facility: 'PDAM' },
        { facility: 'Dapur bersama' },
      ]
    },
    {
      id: '2',
      cat: 'Putri',
      img: require('../../assets/kost/potrait-2.png'),
      name: 'Bauhaus Kost',
      address: 'Jl. Jendral Sunan Bonang No. 19, Desa Pekuncen, Kec. Pekuncen, Kab. Banyumas',
      fac: [
        { facility: 'Kamar mandi dalam' },
        { facility: 'AC' },
      ]
    },
    {
      id: '3',
      cat: 'Putra',
      img: require('../../assets/kost/potrait-3.png'),
      name: 'Oemahku',
      address: 'Jl. Jendral Soedirman No. 17',
      fac: [
        { facility: 'Kamar mandi dalam' },
        { facility: 'AC' },
        { facility: 'Wi-Fi' },
        { facility: 'Listrik' },
        { facility: 'PDAM' },
        { facility: 'Dapur bersama' },
      ]
    },
    {
      id: '4',
      cat: 'Putra',
      img: require('../../assets/kost/potrait-1.png'),
      name: 'The Retro Residence',
      address: 'Jl. Jendral Soedirman No. 17',
      fac: [
        { facility: 'Kamar mandi dalam' },
        { facility: 'AC' },
        { facility: 'Wi-Fi' },
        { facility: 'Listrik' },
        { facility: 'PDAM' },
        { facility: 'Dapur bersama' },
      ]
    },
    {
      id: '5',
      cat: 'Putri',
      img: require('../../assets/kost/potrait-2.png'),
      name: 'Bauhaus Kost',
      address: 'Jl. Jendral Sunan Bonang No. 19, Desa Pekuncen',
      fac: [
        { facility: 'Kamar mandi dalam' },
        { facility: 'AC' },
      ]
    },
    {
      id: '6',
      cat: 'Putra',
      img: require('../../assets/kost/potrait-3.png'),
      name: 'Oemahku',
      address: 'Jl. Jendral Soedirman No. 17',
      fac: [
        { facility: 'Kamar mandi dalam' },
        { facility: 'AC' },
        { facility: 'Wi-Fi' },
        { facility: 'Listrik' },
        { facility: 'PDAM' },
        { facility: 'Dapur bersama' },
      ]
    },
  ];



  const onView = async (id) => {
    navigation.navigate('CustomerView', {
      id: id
    });
  }

  const ItemArround = ({ jenis_kos, jarak, nama_kos, harga, jenis_sewa, id, img, alamat, label }) => (
    <View key={id} style={globalStyle.cardContainer}>
      <Card style={globalStyle.card}>
        <Card.Cover source={{ uri: dirUrl + 'kos/' + img }} />
        <Card.Content >
          <View style={[globalStyle.listHeader, { marginVertical: 10 }]}>
            <View style={[globalStyle.listCategoryContainer, { borderWidth: 0.5 }]}>
              <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{jenis_kos}</Text>
            </View>
            <Text style={[globalStyle.textSm, styles.bold, globalStyle.headerTxt]}>{jarak} Meter</Text>
          </View>
          <Text style={[globalStyle.text, styles.semiBold]}>{nama_kos}</Text>
          <View style={globalStyle.listAddressContainer}>
            <Image style={{ marginRight: 5 }} source={require('../../assets/icon/location-sm.png')} />
            <Text style={[globalStyle.textSm, styles.bold, { flex: 1 }]}>{alamat}</Text>
          </View>
        </Card.Content>
      </Card>
      <Card.Actions style={{ width: '100%', position: 'absolute', flex: 1, bottom: 0 }}>
        <View style={[globalStyle.listHeader, { flex: 1 }]}>
          <View style={[globalStyle.spaceBetween, { alignItems: 'center' }]}>
            <Rupiah numb={harga} />
            <Text style={[globalStyle.textSm, styles.regular]}>/{label}</Text>
          </View>
          <View style={globalStyle.listBtnHeaderContainer}>
            <TouchableOpacity style={[globalStyle.headerBtn, { backgroundColor: globalColor.primary }]} onPress={() => { onView(id) }}>
              <Image source={require('../../assets/icon/eye-white.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </Card.Actions>
    </View>
  );

  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const onRefresh = () => {
    setReload(true);
    setLoading(true);
    setTimeout(() => {
      setReload(false);
      setLoading(false);
    }, 3000);
  }
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor={globalColor.white}
        barStyle='dark-content'
      />
      <ScrollView contentContainerStyle={{
        borderWidth: 0,
        backgroundColor: 'white',
        padding: 25,
      }} style={[{ marginBottom: 0, paddingBottom: 50 }]} refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => {
          setRefresh(Math.random())
        }} />
      }>
        <View style={styles.header}>
          <Text style={[globalStyle.text, styles.semiBold]}>Hai, {userData.nama_depan}</Text>
          <View style={globalStyle.spaceBetween}>
            {/* <TouchableOpacity style={[globalStyle.rightBtnTop, { marginRight: 7 }]} onPress={() => {
              navigation.navigate('CustomerNotification');
            }}>
              <Image source={require('../../assets/icon/outline-bell-blue.png')} />
            </TouchableOpacity> */}
            <TouchableOpacity style={globalStyle.rightBtnTop} onPress={() => {
              navigation.navigate('CustomerProfile');
            }}>
              <Image source={require('../../assets/icon/user-blue.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[globalStyle.content, { backgroundColor: 'transparent' }]}>
          {/* <Text style={[globalStyle.h1, styles.bold, { color: globalColor.dark }]}>Cari berdasarkan nama kos</Text>
          <View style={globalStyle.searchForm}>
            <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input, globalStyle.searchInput]}>
              <View style={globalStyle.imgInputContainer}>
                <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../../assets/icon/lup-sm-grey.png')} />
              </View>
              <TextInput placeholder='Cari nama kos...' style={[globalStyle.inputText, styles.regular]} />
            </View>
            <TouchableOpacity style={globalStyle.searchBtn}>
            <Image source={require('../../assets/icon/lup-sm-white.png')} />
          </TouchableOpacity>
          </View> */}

          <Text style={[globalStyle.h1, styles.bold, { color: globalColor.dark }]}>Disekitarmu</Text>

          {!loading && nearest.length > 0 && (
            <FlatList
              horizontal
              contentContainerStyle={{ paddingBottom: 10 }}
              data={nearest}
              renderItem={({ item }) => <ItemArround jenis_kos={item.jenis_kos} jarak={item.jarak} nama_kos={item.nama_kos} harga={item.harga} jenis_sewa={item.jenis_sewa} id={item.kos_id} img={item.img} alamat={item.alamat} label={item.label} />}
              keyExtractor={(item, index) => {
                return index;
              }}
            />
          )}

          {!loading && nearest.length <= 0 && (
            <Empty />
          )}


          {loading && (
            <SkeletonCard />
          )}

          <Text style={[globalStyle.h1, styles.bold, { color: globalColor.dark, marginTop: 15 }]}>Terbaru</Text>
          {loading && (
            <SkeletonList />
          )}
          {!loading && newest.length > 0 && newest.map((item, index) => {
            return (
              <View key={index}>
                <View style={[globalStyle.listContainer]}>
                  <View style={[globalStyle.listCol, globalStyle.listColImg]}>
                    <Image style={globalStyle.listImg} source={{ uri: dirUrl + 'kos/' + item.img }} />
                  </View>
                  <View style={globalStyle.listCol}>
                    <View style={globalStyle.listHeader}>
                      <View style={globalStyle.listCategoryContainer}>
                        <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{item.jenis_kos}</Text>
                      </View>
                      <View style={globalStyle.listBtnHeaderContainer}>
                        <TouchableOpacity style={[globalStyle.headerBtn, { backgroundColor: globalColor.primary }]} onPress={() => { onView(item.kos_id) }}>
                          <Image source={require('../../assets/icon/eye-white.png')} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={globalStyle.listContent}>
                      <Text style={[globalStyle.text, styles.semiBold]}>{item.nama_kos}</Text>
                      <View style={globalStyle.listAddressContainer}>
                        <Image style={{ marginRight: 5 }} source={require('../../assets/icon/location-sm.png')} />
                        <Text style={[globalStyle.textSm, styles.regular]}>{item.alamat}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <View style={globalStyle.facilityContainer}>
                          <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{item.fasilitas} </Text>
                        </View>
                      </View>
                      <View style={[globalStyle.costContainer, { alignItems: 'center' }]}>
                        <Rupiah numb={item.harga} />
                        <Text style={[globalStyle.textSm, styles.regular]}>/{item.label}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={globalStyle.divider}></View>
              </View>
            )
          })}

          {!loading && newest.length <= 0 && (
            <Empty />
          )}
        </View>
      </ScrollView >
      <CustomerTab />
    </View >
  )
}

export default CustomerHome

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