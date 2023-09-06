import { ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SkeletonList from '../../component/SkeletonList';
import CustomerTab from '../../component/CustomerTab';

const CustomerHistory = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(Math.random());
  const [acceptModal, setAcceptModal] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [refresh]));
  const DATA = [
    {
      id: '1',
      cat: 'Putra',
      img: require('../../assets/kost/potrait-1.png'),
      date: '28 Juni 2023',
      name: 'The Retro Residence',
      address: 'Jl. Jendral Soedirman No. 17',
      cs: 'Prilly',
      status: 'menunggu persetujuan',
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
      date: '28 Juni 2023',
      name: 'Bauhaus Kost',
      address: 'Jl. Jendral Sunan Bonang No. 19, Desa Pekuncen',
      cs: 'Prilly',
      status: 'menunggu persetujuan',
      fac: [
        { facility: 'Kamar mandi dalam' },
        { facility: 'AC' },
      ]
    },
    {
      id: '3',
      cat: 'Putra',
      img: require('../../assets/kost/potrait-3.png'),
      date: '28 Juni 2023',
      name: 'Oemahku',
      address: 'Jl. Jendral Soedirman No. 17',
      cs: 'Prilly',
      status: 'menunggu persetujuan',
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
      date: '28 Juni 2023',
      name: 'The Retro Residence',
      address: 'Jl. Jendral Soedirman No. 17',
      cs: 'Prilly',
      status: 'menunggu persetujuan',
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
      date: '28 Juni 2023',
      name: 'Bauhaus Kost',
      address: 'Jl. Jendral Sunan Bonang No. 19, Desa Pekuncen',
      cs: 'Prilly',
      status: 'menunggu persetujuan',
      fac: [
        { facility: 'Kamar mandi dalam' },
        { facility: 'AC' },
      ]
    },
    {
      id: '6',
      cat: 'Putra',
      img: require('../../assets/kost/potrait-3.png'),
      date: '28 Juni 2023',
      name: 'Oemahku',
      address: 'Jl. Jendral Soedirman No. 17',
      cs: 'Prilly',
      status: 'menunggu persetujuan',
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
      id: '7',
      cat: 'Putra',
      img: require('../../assets/kost/potrait-3.png'),
      date: '28 Juni 2023',
      name: 'Oemahku',
      address: 'Jl. Jendral Soedirman No. 17',
      cs: 'Prilly',
      status: 'menunggu persetujuan',
      fac: [
        { facility: 'Kamar mandi dalam' },
        { facility: 'AC' },
        { facility: 'Wi-Fi' },
        { facility: 'Listrik' },
        { facility: 'PDAM' },
        { facility: 'Dapur bersama' },
      ]
    }, {
      id: '8',
      cat: 'Putra',
      img: require('../../assets/kost/potrait-3.png'),
      date: '28 Juni 2023',
      name: 'Oemahku',
      address: 'Jl. Jendral Soedirman No. 17',
      cs: 'Prilly',
      status: 'menunggu persetujuan',
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

  const onCancel = (id) => {
    // console.warn(id);
    Alert.alert("", "Apakah Anda yakin ingin membatalkan pengajuan?", [
      {
        text: "Batal",
        onPress: () => null,
        style: "cancel",
      },
      { text: "Ya", onPress: () => { } },
    ]);
  };

  const Item = ({ id, cat, img, name, address, facility, length, date, cs, status }) => (
    <View key={id}>
      <View style={globalStyle.listContainer}>
        <View style={[globalStyle.listCol, globalStyle.listColImg]}>
          <Image style={globalStyle.listImg} source={img} />
        </View>
        <View style={globalStyle.listCol}>
          <View style={globalStyle.listHeader}>
            <View style={globalStyle.listCategoryContainer}>
              <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{date}</Text>
            </View>
          </View>

          <View style={[globalStyle.listContent, { marginTop: 10 }]}>
            <Text style={[globalStyle.text, styles.semiBold]}>{name}</Text>
            <View style={globalStyle.listAddressContainer}>
              <Text style={[globalStyle.textSm, styles.regular]}>Oleh</Text>
              <Text style={[globalStyle.textSm, styles.bold]}>: {cs}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <Text style={[globalStyle.label, styles.boldItalic]}>{status}</Text>
            </View>
            <View style={globalStyle.costContainer}>
              <TouchableOpacity style={globalStyle.acceptBtn} onPress={() => {
                onCancel(id)
              }}>
                <Text style={[globalStyle.textSm, globalStyle.textWhite, styles.regular]}>Batal</Text>
              </TouchableOpacity>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={acceptModal}
        onRequestClose={() => {
          setAcceptModal(!acceptModal);
        }}>
        <View style={globalStyle.modalFormContainer}>
          <View style={globalStyle.modalContainer}>
            <View style={globalStyle.modalFormHeader}>
              <View style={globalStyle.headerTitleContainer}>
                <Text style={[globalStyle.text, styles.regular]}>Ubah Persetujuan</Text>
              </View>
              <View style={globalStyle.headerBtnContainer}>
                <TouchableOpacity style={globalStyle.closeBtn} onPress={() => { setAcceptModal(!acceptModal) }}>
                  <Image source={require('../../assets/icon/close-blue.png')} style={globalStyle.closeImg} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={globalStyle.modalForm}>
              <TouchableOpacity style={globalStyle.modalOptBtn} onPress={() => {
                setAcceptModal(!acceptModal);
              }}>
                <Text style={styles.regular}>Terima</Text>
              </TouchableOpacity>
              <TouchableOpacity style={globalStyle.modalOptBtn} onPress={() => {
                setAcceptModal(!acceptModal);
              }}>
                <Text style={styles.regular}>Tolak</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={[styles.header,]}>
        <TouchableOpacity style={globalStyle.leftBtnTop} onPress={() => {
          navigation.goBack();
        }}>
          <Image source={require('../../assets/icon/arrow-left.png')} />
        </TouchableOpacity>
        <View style={globalStyle.headerTitleContainer}>
          <Text style={[globalStyle.text, styles.semiBold]}>Riwayat Sewa Kos</Text>
        </View>
      </View>
      <View style={[globalStyle.content, { backgroundColor: 'transparent' }]}>
        {loading && (
          <SkeletonList />
        )}

        {!loading && (
          <FlatList
            contentContainerStyle={{ paddingBottom: 80 }}
            data={DATA}
            renderItem={({ item }) => <Item cat={item.cat} id={item.id} img={item.img} name={item.name} address={item.address} facility={item.fac} length={DATA.length} date={item.date} cs={item.cs} status={item.status} />}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        )}
      </View>
      <CustomerTab />

    </SafeAreaView>
  )
}

export default CustomerHistory

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