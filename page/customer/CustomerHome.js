import { ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions, Touchable } from 'react-native'
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

const CustomerHome = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(Math.random());

  useFocusEffect(
    React.useCallback(() => {
      getData();
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

  const getData = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  const onDelete = () => {
    Alert.alert("", "Apakah Anda yakin ingin menghapus data?", [
      {
        text: "Batal",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Hapus", onPress: () => {
        }
      },
    ]);
  }

  const onView = async () => {
    navigation.navigate('CustomerView');
  }

  const ItemArround = ({ id, cat, img, name, address, facility, length }) => (
    <View key={id} style={globalStyle.cardContainer}>
      <Card style={globalStyle.card}>
        <Card.Cover source={img} />
        <Card.Content >
          <View style={[globalStyle.listHeader, { marginVertical: 10 }]}>
            <View style={[globalStyle.listCategoryContainer, { borderWidth: 0.5 }]}>
              <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{cat}</Text>
            </View>
            <Text style={[globalStyle.textSm, styles.bold, globalStyle.headerTxt]}>100 Meter</Text>
          </View>
          <Text style={[globalStyle.text, styles.semiBold]}>{name}</Text>
          <View style={globalStyle.listAddressContainer}>
            <Image style={{ marginRight: 5 }} source={require('../../assets/icon/location-sm.png')} />
            <Text style={[globalStyle.textSm, styles.bold, { flex: 1 }]}>{address}</Text>
          </View>
        </Card.Content>
      </Card>
      <Card.Actions style={{ width: '100%', position: 'absolute', flex: 1, bottom: 0 }}>
        <View style={[globalStyle.listHeader, { flex: 1 }]}>
          <Text style={[globalStyle.textSm, styles.bold]}>Rp. 500.000/bulan</Text>
          <View style={globalStyle.listBtnHeaderContainer}>
            <TouchableOpacity style={[globalStyle.headerBtn, { backgroundColor: globalColor.primary }]} onPress={onView}>
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

  return (
    <View>
      <ScrollView contentContainerStyle={{
        borderWidth: 0,
        backgroundColor: 'white',
        padding: 25,
      }} style={[{ marginBottom: 10, paddingBottom: 10 }]}>
        <View style={styles.header}>
          <Text style={[globalStyle.text, styles.semiBold]}>Hai, username</Text>
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
          {!loading && (
            <FlatList
              horizontal
              contentContainerStyle={{ paddingBottom: 10 }}
              data={DATA}
              renderItem={({ item }) => <ItemArround cat={item.cat} id={item.id} img={item.img} name={item.name} address={item.address} facility={item.fac} length={DATA.length} />}
              keyExtractor={(item, index) => {
                return item.id;
              }}
            />
          )}

          {loading && (
            <SkeletonCard />
          )}



          <Text style={[globalStyle.h1, styles.bold, { color: globalColor.dark, marginTop: 15 }]}>Terbaru</Text>
          {loading && (
            <SkeletonList />
          )}
          {!loading && DATA.map((item) => {
            return (
              <View style={globalStyle.listContainer} key={item.id}>
                <View style={[globalStyle.listCol, globalStyle.listColImg]}>
                  <Image style={globalStyle.listImg} source={item.img} />
                </View>
                <View style={globalStyle.listCol}>
                  <View style={globalStyle.listHeader}>
                    <View style={globalStyle.listCategoryContainer}>
                      <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{item.cat}</Text>
                    </View>
                    <View style={globalStyle.listBtnHeaderContainer}>
                      <TouchableOpacity style={[globalStyle.headerBtn, { backgroundColor: globalColor.primary }]} onPress={onView}>
                        <Image source={require('../../assets/icon/eye-white.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={globalStyle.listContent}>
                    <Text style={[globalStyle.text, styles.semiBold]}>{item.name}</Text>
                    <View style={globalStyle.listAddressContainer}>
                      <Image style={{ marginRight: 5 }} source={require('../../assets/icon/location-sm.png')} />
                      <Text style={[globalStyle.textSm, styles.regular]}>{item.address}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                      {item.fac.map((val, index) => {
                        return (
                          <View style={globalStyle.facilityContainer} key={index}>
                            <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{val.facility} </Text>
                          </View>
                        )
                      })}
                    </View>
                    <View style={globalStyle.costContainer}>
                      <Text style={[globalStyle.textSm, styles.bold]}>Rp. 500.000</Text>
                      <Text style={[globalStyle.textSm, styles.regular]}>/bulan</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
      <CustomerTab />
    </View>
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