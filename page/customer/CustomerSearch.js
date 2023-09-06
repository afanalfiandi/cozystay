import { ActivityIndicator, DrawerLayoutAndroid, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions, Touchable } from 'react-native'
import React, { useRef, useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SkeletonList from '../../component/SkeletonList';
import SkeletonCard from '../../component/SkeletonCard';
import { Avatar, Button, Card } from 'react-native-paper';
import CustomerTab from '../../component/CustomerTab';
import { RadioButton, Checkbox } from 'react-native-paper';

const CustomerHome = () => {
  const drawer = useRef(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [modalFilter, setModalFilter] = useState(false);
  const [refresh, setRefresh] = useState(Math.random());
  const [jk, setJk] = useState(1);
  const [wifi, setWifi] = useState(false);
  const [km, setKM] = useState(false);
  const [listrik, setListrik] = useState(false);
  const [dapur, setDapur] = useState(false);
  const [parkir, setParkir] = useState(false);
  const [ac, setAC] = useState(false);
  const [fasilitas, setFasilitas] = useState([]);

  const addFacility = (value) => {
    fasilitas.push(value);
    setFasilitas(fasilitas);
  }

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

  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const onSubmit = () => {
    drawer.current.closeDrawer()
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  const onReset = () => {
    drawer.current.closeDrawer();
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={[globalStyle.text, styles.bold]}>Filter Pencarian Kos</Text>

      <View>
        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Jenis Kos</Text>
        <View style={[globalStyle.radioContainer, { flexWrap: 'wrap' }]}>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <RadioButton
              value="1"
              status={jk === 1 ? 'checked' : 'unchecked'}
              onPress={() => {
                setJk(1);
              }}
            />
            <Text style={styles.regular}>Laki-laki</Text>
          </View>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <RadioButton
              value="2"
              status={jk === 2 ? 'checked' : 'unchecked'}
              onPress={() => {
                setJk(2);
              }}
            />
            <Text style={styles.regular}>Perempuan</Text>
          </View>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <RadioButton
              value="3"
              status={jk === 3 ? 'checked' : 'unchecked'}
              onPress={() => {
                setJk(3);
              }}
            />
            <Text style={styles.regular}>Campur</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Fasilitas</Text>
        <View style={[globalStyle.radioContainer, { flexWrap: 'wrap' }]}>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <Checkbox
              status={wifi ? 'checked' : 'unchecked'}
              onPress={() => {
                setWifi(!wifi);
                addFacility(1)
              }}
            />
            <Text style={styles.regular}>Wifi</Text>
          </View>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <Checkbox
              status={km ? 'checked' : 'unchecked'}
              onPress={() => {
                setKM(!km);
                addFacility(2)
              }}
            />
            <Text style={styles.regular}>KM Dalam</Text>
          </View>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <Checkbox
              status={listrik ? 'checked' : 'unchecked'}
              onPress={() => {
                setListrik(!listrik);
                addFacility(3)
              }}
            />
            <Text style={styles.regular}>Listrik</Text>
          </View>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <Checkbox
              status={dapur ? 'checked' : 'unchecked'}
              onPress={() => {
                setDapur(!dapur);
                addFacility(4)
              }}
            />
            <Text style={styles.regular}>Dapur Bersama</Text>
          </View>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <Checkbox
              status={parkir ? 'checked' : 'unchecked'}
              onPress={() => {
                setParkir(!parkir);
                addFacility(4)
              }}
            />
            <Text style={styles.regular}>Parkir Mobil</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Jenis Sewa Kos</Text>
        <View style={[globalStyle.radioContainer, { flexWrap: 'wrap' }]}>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <RadioButton
              value="1"
              status={jk === 1 ? 'checked' : 'unchecked'}
              onPress={() => {
                setJk(1);
              }}
            />
            <Text style={styles.regular}>Harian</Text>
          </View>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <RadioButton
              value="2"
              status={jk === 2 ? 'checked' : 'unchecked'}
              onPress={() => {
                setJk(2);
              }}
            />
            <Text style={styles.regular}>Mingguan</Text>
          </View>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <RadioButton
              value="3"
              status={jk === 3 ? 'checked' : 'unchecked'}
              onPress={() => {
                setJk(3);
              }}
            />
            <Text style={styles.regular}>Bulanan</Text>
          </View>
          <View style={[globalStyle.radio, { width: '50%' }]}>
            <RadioButton
              value="3"
              status={jk === 3 ? 'checked' : 'unchecked'}
              onPress={() => {
                setJk(3);
              }}
            />
            <Text style={styles.regular}>Tahunan</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Harga (Rp. )</Text>
        <View style={globalStyle.costFilterContainer}>
          <View style={[globalStyle.formGroup, globalStyle.input, { width: '48%' }]}>
            <TextInput placeholder='MIN' style={[globalStyle.inputText, styles.regular]} />
          </View>
          <Text style={styles.bold}>-</Text>
          <View style={[globalStyle.formGroup, globalStyle.input, { width: '48%' }]}>
            <TextInput placeholder='MAX' style={[globalStyle.inputText, styles.regular]} />
          </View>
        </View>
      </View>

      <View style={[globalStyle.formGroup]}>
        <TouchableOpacity style={globalStyle.btnPrimary} onPress={onSubmit}>
          <Text style={[globalStyle.btnText, styles.bold]}>pakai</Text>
        </TouchableOpacity>
      </View>
      <View style={[globalStyle.formGroup, { marginVertical: 0 }]}>
        <TouchableOpacity style={globalStyle.btnOutlinePrimary} onPress={onReset}>
          <Text style={[globalStyle.btnText, styles.bold, { color: globalColor.primary }]}>atur ulang</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'right'}
      renderNavigationView={navigationView}
    >
      <ScrollView contentContainerStyle={{
        borderWidth: 0,
        backgroundColor: 'white',
        padding: 25,
      }} style={[{ marginBottom: 10, paddingBottom: 10 }]}>
        <View style={[styles.header,]}>
          <TouchableOpacity style={globalStyle.leftBtnTop} onPress={() => {
            navigation.goBack();
          }}>
            <Image source={require('../../assets/icon/arrow-left.png')} />
          </TouchableOpacity>
          <View style={globalStyle.headerTitleContainer}>
            <Text style={[globalStyle.text, styles.semiBold]}>Cari Kos</Text>
          </View>
        </View>
        <View style={[globalStyle.content, { backgroundColor: 'transparent' }]}>
          <View style={globalStyle.searchForm}>
            <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input, globalStyle.searchInput, { width: '85%' }]}>
              <View style={globalStyle.imgInputContainer}>
                <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../../assets/icon/lup-sm-grey.png')} />
              </View>
              <TextInput placeholder='Cari nama kos...' style={[globalStyle.inputText, styles.regular]} />
            </View>
            <TouchableOpacity style={globalStyle.searchBtn} onPress={() => {
              drawer.current.openDrawer()
            }}>
              <Image source={require('../../assets/icon/filter-white.png')} />
            </TouchableOpacity>
          </View>

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
    </DrawerLayoutAndroid >
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


  container: {
    flex: 1,
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: 'white',
  },
})