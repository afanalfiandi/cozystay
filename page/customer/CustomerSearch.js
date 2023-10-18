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
import Rupiah from '../../component/Rupiah';
import { RadioButton, Checkbox } from 'react-native-paper';
import getKos from '../../function/getKos';
import getJenisKos from '../../function/getJenisKos';
import getJenisSewa from '../../function/getJenisSewa';
import getFasilitas from '../../function/getFasilitas';
import { dirUrl } from '../../config/baseUrl';
import searchKos from '../../function/searchKos';
import EmptyData from '../../component/EmptyData';

const CustomerHome = () => {
  const drawer = useRef(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [modalFilter, setModalFilter] = useState(false);
  const [refresh, setRefresh] = useState(Math.random());

  const [dataJenisKos, setDataJenisKos] = useState([]);
  const [dataJenisSewa, setDataJenisSewa] = useState([]);
  const [dataFasilitas, setDataFasilitas] = useState([]);


  const [jenisKos, setJenisKos] = useState(1);
  const [jenisSewa, setJenisSewa] = useState(1);
  const [hargaMulai, setHargaMulai] = useState('');
  const [hargaAkhir, setHargaAkhir] = useState('');

  const [data, setData] = useState([]);

  const [fasilitas, setFasilitas] = useState([]);

  const addFacility = (value) => {
    if (fasilitas.includes(value)) {
      const index = fasilitas.indexOf(value);
      if (index !== -1) {
        const arr = [...fasilitas];
        arr.splice(index, 1);
        setFasilitas(arr);
      }
    } else {
      const arr = [...fasilitas];
      arr.push(value);
      setFasilitas(arr);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        getKos().then((result) => {
          if (result[0].status == 1) {
            setData(result);
          }
        })

        getJenisKos().then((result) => {
          setDataJenisKos(result);
        });

        getJenisSewa().then((result) => {
          setDataJenisSewa(result);
        })

        getFasilitas().then((result) => {

          setDataFasilitas(result);
        })
        setLoading(false);
      }, 3000);
    }, [refresh]));

  const onView = async (id) => {
    navigation.navigate('CustomerView', {
      id: id
    });
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
      onSearch('');
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
        <View style={[globalStyle.radioContainer, { flexWrap: 'wrap' }]} >
          {dataJenisKos.map((item, index) => {
            return (
              <View style={[globalStyle.radio, { width: '50%' }]} key={index}>
                <RadioButton
                  value={item.id_jenis_kos}
                  status={jenisKos === item.id_jenis_kos ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setJenisKos(item.id_jenis_kos);
                  }}
                />
                <Text style={styles.regular}>{item.jenis_kos}</Text>
              </View>
            )
          })}
        </View>
      </View>

      <View>
        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Fasilitas</Text>
        <View style={[globalStyle.radioContainer, { flexWrap: 'wrap' }]}>
          {dataFasilitas.map((item, index) => {
            return (
              <View style={[globalStyle.radio, { width: '50%' }]} key={index}>
                <Checkbox
                  status={fasilitas.includes(parseInt(item.id_fasilitas)) ? 'checked' : 'unchecked'}
                  onPress={() => {
                    // setWifi(!wifi);
                    addFacility(parseInt(item.id_fasilitas))
                  }}
                />
                <Text style={styles.regular}>{item.fasilitas}</Text>
              </View>
            )
          })}
        </View>
      </View>

      <View>
        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Jenis Sewa Kos</Text>
        <View style={[globalStyle.radioContainer, { flexWrap: 'wrap' }]}>
          {dataJenisSewa.map((item, index) => {
            return (
              <View style={[globalStyle.radio, { width: '50%' }]} key={index}>
                <RadioButton
                  value={item.id_jenis_sewa}
                  status={jenisSewa === item.id_jenis_sewa ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setJenisSewa(item.id_jenis_sewa);
                  }}
                />
                <Text style={styles.regular}>{item.jenis_sewa}</Text>
              </View>
            )
          })}
        </View>
      </View>
      <View>
        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Harga (Rp. )</Text>
        <View style={globalStyle.costFilterContainer}>
          <View style={[globalStyle.formGroup, globalStyle.input, { width: '48%' }]}>
            <TextInput placeholder='MIN' style={[globalStyle.inputText, styles.regular]} value={hargaMulai} onChangeText={setHargaMulai} />
          </View>
          <Text style={styles.bold}>-</Text>
          <View style={[globalStyle.formGroup, globalStyle.input, { width: '48%' }]}>
            <TextInput placeholder='MAX' style={[globalStyle.inputText, styles.regular]} value={hargaAkhir} onChangeText={setHargaAkhir} />
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

  const onSearch = (text) => {
    setLoading(true);
    setTimeout(() => {
      searchKos(text).then((result) => {


        if (result.status != 0) {
          setData(result);
        }
      })

      setLoading(false);
    }, 1500);
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
      }
      } style={[{ marginBottom: 10, paddingBottom: 10 }]} >
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
            <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input, globalStyle.searchInput, { width: '100%' }]}>
              <View style={[globalStyle.imgInputContainer]}>
                <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../../assets/icon/lup-sm-grey.png')} />
              </View>
              <TextInput placeholder='Cari nama kos...' onChangeText={text => { onSearch(text) }} style={[globalStyle.inputText, styles.regular]} />
            </View>
            {/* <TouchableOpacity style={globalStyle.searchBtn} onPress={() => {
              drawer.current.openDrawer()
            }}>
              <Image source={require('../../assets/icon/filter-white.png')} />
            </TouchableOpacity> */}
          </View>


          {loading && (
            <SkeletonList />
          )}
          {!loading && data.length > 0 && data.map((item) => {
            return (
              <View key={item.kos_id}>
                <View style={globalStyle.listContainer} >
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
          {!loading && data.length <= 0 && (
            <EmptyData />
          )}
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
  container: {
    flex: 1,
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: 'white',
  },
})