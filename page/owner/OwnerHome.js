import { ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SkeletonList from '../../component/SkeletonList';
import OwnerTab from '../../component/OwnerTab';

const OwnerHome = () => {
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
      address: 'Jl. Jendral Sunan Bonang No. 19, Desa Pekuncen',
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
    navigation.navigate('OwnerView');
  }
  const Item = ({ id, cat, img, name, address, facility, length }) => (
    <View key={id}>
      <View style={globalStyle.listContainer}>
        <View style={[globalStyle.listCol, globalStyle.listColImg]}>
          <Image style={globalStyle.listImg} source={img} />
        </View>
        <View style={globalStyle.listCol}>
          <View style={globalStyle.listHeader}>
            <View style={globalStyle.listCategoryContainer}>
              <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{cat}</Text>
            </View>
            <View style={globalStyle.listBtnHeaderContainer}>
              <TouchableOpacity style={[globalStyle.headerBtn, { backgroundColor: globalColor.red }]} onPress={onDelete}>
                <Image source={require('../../assets/icon/trash-white.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyle.headerBtn, { backgroundColor: globalColor.primary }]} onPress={onView}>
                <Image source={require('../../assets/icon/eye-white.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={globalStyle.listContent}>
            <Text style={[globalStyle.text, styles.semiBold]}>{name}</Text>
            <View style={globalStyle.listAddressContainer}>
              <Image style={{ marginRight: 5 }} source={require('../../assets/icon/location-sm.png')} />
              <Text style={[globalStyle.textSm, styles.regular]}>{address}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              {facility.map((val, index) => {
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
      <View style={styles.header}>
        <Text style={[globalStyle.text, styles.semiBold]}>Hai, username</Text>
        <TouchableOpacity style={globalStyle.rightBtnTop} onPress={() => {
          navigation.navigate('Add');
        }}>
          <Image source={require('../../assets/icon/plus-blue.png')} />
        </TouchableOpacity>
      </View>
      <View style={[globalStyle.content, { backgroundColor: 'transparent' }]}>
        <Text style={[globalStyle.h1, styles.bold, { color: globalColor.dark }]}>Daftar Kos Anda</Text>
        {loading && (
          <SkeletonList />
        )}

        {!loading && (
          <FlatList
            contentContainerStyle={{ paddingBottom: 80 }}
            data={DATA}
            renderItem={({ item }) => <Item cat={item.cat} id={item.id} img={item.img} name={item.name} address={item.address} facility={item.fac} length={DATA.length} />}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        )}
      </View>
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