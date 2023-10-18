import { RefreshControl, ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions, ToastAndroid, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SkeletonList from '../../component/SkeletonList';
import CustomerTab from '../../component/CustomerTab';
import historyCustomer from '../../function/historyCustomer';
import EmptyData from '../../component/EmptyData';
import { dirUrl } from '../../config/baseUrl';
import moment from 'moment';
import 'moment/locale/id';
import deletePengajuan from '../../function/deletePengajuan';
import Rupiah from '../../component/Rupiah';
import getPaymentDetail from '../../function/payment/getPaymentDetail';
import { serverKey } from '../../config/paymentKey';

const CustomerHistory = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(Math.random());
  const [acceptModal, setAcceptModal] = useState(false);
  const [data, setData] = useState([]);
  const [transaction, setTransaction] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        historyCustomer().then((result) => {
          console.log(result);
          if (result[0].status == 1) {
            setData(result);
          } else {
            setData([]);
          }
        })

        getPaymentDetail().then(async (result) => {
          if (result[0].status == '0') {
            setTransaction([]);
          } else {
            const arr = [];
            for (const i of result) {
              try {
                const response = await fetch('https://api.sandbox.midtrans.com/v2/' + i.no_transaksi + '/status', {
                  headers: {
                    'Accept': 'application/json',
                    'Authorization': serverKey,
                    'Content-Type': 'application/json'
                  },
                });
                const b = await response.json();
                arr.push({
                  gross_amount: b.gross_amount,
                  no_transaksi: i.no_transaksi,
                  payment_type: b.payment_type,
                  transaction_id: b.transaction_id,
                  transaction_status: b.transaction_status,
                  transaction_time: b.transaction_time,
                  img: i.img,
                  nama_kos: i.nama_kos,
                  jenis_pembayaran: i.jenis_pembayaran,
                });
              } catch (error) {
                console.log(error)
              }
            }
            setTransaction(arr)
          }
        })
        setLoading(false);
      }, 3000);
    }, [refresh]));

  const onCancel = (no_transaksi) => {
    Alert.alert("", "Apakah Anda yakin ingin membatalkan pengajuan?", [
      {
        text: "Batal",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Ya", onPress: () => {
          setLoading(true);
          deletePengajuan(no_transaksi).then((result) => {
            setTimeout(() => {
              if (result.status == 1) {
                ToastAndroid.show('Berhasil!', 3000);
              } else {
                ToastAndroid.show('Gagal!', 3000);
              }
              historyCustomer().then((result) => {
                console.log(result);
                if (result[0].status != 0) {
                  setData(result);
                } else {
                  setData([]);
                }
              })
              setLoading(false);
            }, 3000);
          })
        }
      },
    ]);
  };

  const Item = ({ no_transaksi, fasilitas, label, harga, jenis_kos, nama_user, whatsapp, jenis_kelamin, alamat, img, tgl_pengajuan, tgl_mulai, nama_kos, status_sewa, id_status_sewa }) => (
    <View>
      <View style={globalStyle.listContainer}>
        <View style={[globalStyle.listCol, globalStyle.listColImg]}>
          <Image style={globalStyle.listImg} source={{ uri: dirUrl + 'kos/' + img }} />
        </View>
        <View style={globalStyle.listCol}>
          <View style={globalStyle.listHeader}>
            <View style={globalStyle.listCategoryContainer}>
              <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{no_transaksi}</Text>
            </View>
            <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{moment(tgl_pengajuan).format('DD MMMM YYYY')}</Text>
          </View>

          <View style={[globalStyle.listContent, { marginTop: 10 }]}>
            <Text style={[globalStyle.text, styles.semiBold]}>{nama_kos}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <Text style={[globalStyle.label, styles.regular]}>{status_sewa}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Rupiah numb={harga} />
            </View>

          </View>
        </View>
      </View>
      <View style={globalStyle.divider}></View>
      <View style={globalStyle.spaceBetween}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {id_status_sewa == '1' && (
            <Text style={[styles.regular, globalStyle.textSm]}>Pembayaran belum dapat dilakukan</Text>
          )}
          {id_status_sewa == '2' && (
            <Text style={[styles.regular, globalStyle.textSm]}>Pembayaran sudah dapat dilakukan</Text>
          )}
          {id_status_sewa == '3' && (
            <Text style={[styles.regular, globalStyle.textSm]}>Pembayaran tidak dapat dilakukan</Text>
          )}
          {id_status_sewa == '4' && (
            <Text style={[styles.regular, globalStyle.textSm]}>Pembayaran sudah dilakukan</Text>
          )}
        </View>
        <View style={[globalStyle.spaceBetween, { marginBottom: 8 }]}>
          <TouchableOpacity style={[globalStyle.acceptBtn, { marginRight: 10, opacity: id_status_sewa == 1 ? 1 : 0.8 }]} onPress={() => {
            onCancel(no_transaksi)
          }} disabled={id_status_sewa == 1 ? false : true}>
            <Text style={globalStyle.textWhite}>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyle.acceptBtn, { opacity: id_status_sewa != 2 ? 0.8 : 1 }]} disabled={id_status_sewa != 2 ? true : false} onPress={() => {
            navigation.navigate('CustomerTransaction', {
              alamat: alamat,
              fasilitas: fasilitas,
              harga: harga,
              label: label,
              jenis_kos: jenis_kos,
              nama_user: nama_user,
              whatsapp: whatsapp,
              jenis_kelamin: jenis_kelamin,
              img: img,
              nama_kos: nama_kos,
              no_transaksi: no_transaksi,
            });
          }}>
            <Text style={globalStyle.textWhite}>Bayar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={globalStyle.divider}></View>
    </View>
  );

  const FirstRoute = () => (
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
      <View style={[globalStyle.content, { backgroundColor: 'transparent' }]}>
        {loading && (
          <SkeletonList />
        )}

        {!loading && data.length > 0 && (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={() => {
                setLoading(true);
                getPaymentDetail().then(async (result) => {
                  if (result[0].status == '0') {
                    setTransaction([]);
                  } else {
                    const arr = [];
                    for (const i of result) {
                      try {
                        const response = await fetch('https://api.sandbox.midtrans.com/v2/' + i.no_transaksi + '/status', {
                          headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Basic U0ItTWlkLXNlcnZlci10Qmk3ZnFYVTdyN3F4dXpZVHlZMFFZQ0Y=',
                            'Content-Type': 'application/json'
                          },
                        });
                        const b = await response.json();
                        arr.push({
                          gross_amount: b.gross_amount,
                          no_transaksi: i.no_transaksi,
                          payment_type: b.payment_type,
                          transaction_id: b.transaction_id,
                          transaction_status: b.transaction_status,
                          transaction_time: b.transaction_time,
                          img: i.img,
                          nama_kos: i.nama_kos,
                          jenis_pembayaran: i.jenis_pembayaran,
                        });
                      } catch (error) {
                        console.log(error)
                      }
                    }
                    setTransaction(arr)
                  }
                })
                setTimeout(() => {
                  setRefresh(Math.random())
                  setLoading(false);
                }, 3000);
              }} />
            }
            contentContainerStyle={{ paddingBottom: 80 }}
            data={data}
            renderItem={({ item }) => <Item no_transaksi={item.no_transaksi} jenis_kelamin={item.jenis_kelamin} nama_user={'asdasdsad'} whatsapp={item.whatsapp} jenis_kos={item.jenis_kos} harga={item.harga} label={item.label} fasilitas={item.fasilitas} alamat={item.alamat} img={item.img} tgl_pengajuan={item.tgl_pengajuan} tgl_mulai={item.tgl_mulai} nama_kos={item.nama_kos} status_sewa={item.status_sewa} id_status_sewa={item.id_status_sewa} />}
            keyExtractor={(item, index) => {
              return index;
            }}
          />
        )}

        {!loading && data.length <= 0 && (
          <EmptyData />
        )}
      </View>
    </SafeAreaView>
  );

  const SecondRoute = () => (
    <SafeAreaView style={[globalStyle.container, { marginBottom: 10, paddingBottom: 10, justifyContent: 'flex-start' }]}>
      <View style={[globalStyle.content, { backgroundColor: 'transparent' }]}>
        {loading && (
          <SkeletonList />
        )}

        {transaction.length > 0 && (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={() => {
                setLoading(true);
                setTimeout(() => {
                  setRefresh(Math.random())
                  setLoading(false);
                }, 3000);
              }} />
            }
            contentContainerStyle={{ paddingBottom: 80 }}
            data={transaction}
            renderItem={({ item }) => {
              return (
                <View>
                  <View style={globalStyle.listContainer}>
                    <View style={[globalStyle.listCol, globalStyle.listColImg]}>
                      <Image style={globalStyle.listImg} source={{ uri: dirUrl + 'kos/' + item.img }} />
                    </View>
                    <View style={globalStyle.listCol}>
                      <View style={globalStyle.listHeader}>
                        <View style={globalStyle.listCategoryContainer}>
                          <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{item.no_transaksi}</Text>
                        </View>
                      </View>

                      <View style={[globalStyle.listContent, { marginTop: 10 }]}>
                        <Text style={[globalStyle.text, styles.semiBold]}>{item.nama_kos}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          <Text style={[globalStyle.label, styles.regular]}>{moment(item.transaction_time).format('dddd, DD MM YYYY - HH:mm')}</Text>
                        </View>
                        <View style={{ flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          {item.transaction_status == 'expire' && (
                            <Text style={[globalStyle.label, styles.regular]}>Kedaluarsa</Text>
                          )}
                          {item.transaction_status == 'settlement' && (
                            <Text style={[globalStyle.label, styles.regular]}>Transaksi Berhasil</Text>
                          )}
                          {item.transaction_status == 'pending' && (
                            <Text style={[globalStyle.label, styles.regular]}>Belum dibayar</Text>
                          )}
                          {item.transaction_status == 'failure' && (
                            <Text style={[globalStyle.label, styles.regular]}>Transaksi gagal</Text>
                          )}
                          {item.transaction_status == 'deny' && (
                            <Text style={[globalStyle.label, styles.regular]}>Transaksi ditolak</Text>
                          )}
                          {item.transaction_status == 'cancel' && (
                            <Text style={[globalStyle.label, styles.regular]}>Transaksi dibatalkan</Text>
                          )}
                          {item.transaction_status == 'captured' && (
                            <Text style={[globalStyle.label, styles.regular]}>Transaksi captured</Text>
                          )}
                          <Text style={[globalStyle.label, styles.regular]}>{item.jenis_pembayaran}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                          <Rupiah numb={item.gross_amount} />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={globalStyle.divider}></View>
                </View>
              )
            }}
            keyExtractor={(item, index) => {
              return index;
            }}
          />
        )}
        {transaction.length <= 0 && (
          <EmptyData />
        )}
      </View>

    </SafeAreaView >
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Pengajuan Sewa' },
    { key: 'second', title: 'Transaksi' },
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, { borderBottomWidth: index == 0 ? 2 : 0, borderBottomColor: globalColor.primary, paddingBottom: 10 }]}
          onPress={() => setIndex(0)}>
          <Text style={[styles.bold, { opacity: index == 0 ? 1 : 0.5 }]}>Pengajuan Sewa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, { borderBottomWidth: index == 1 ? 2 : 0, borderBottomColor: globalColor.primary, paddingBottom: 10 }]}
          onPress={() => setIndex(1)}>
          <Text style={[styles.bold, { opacity: index == 1 ? 1 : 0.5 }]}>Transaksi</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        style={{ backgroundColor: 'white' }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        indicatorStyle={{ backgroundColor: 'black', height: 2 }}
      >
      </TabView>
      <CustomerTab />
    </View>
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
  tabBar: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
})