import { RefreshControl, ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions, ToastAndroid, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SkeletonList from '../../component/SkeletonList';
import EmptyData from '../../component/EmptyData';
import { dirUrl } from '../../config/baseUrl';
import moment from 'moment';
import 'moment/locale/id';
import Rupiah from '../../component/Rupiah';
import historyOwner from '../../function/historyOwner';
import OwnerTab from '../../component/OwnerTab';
import getOwnerPaymentDetail from '../../function/payment/getOwnerPaymentDetail';
import onAccept from '../../function/onAccept';

const History = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(Math.random());
    const [acceptModal, setAcceptModal] = useState(false);
    const [sewa, setSewa] = useState('');
    const [data, setData] = useState([]);
    const [transaction, setTransaction] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            historyOwner().then((result) => {
                if (result.status != 0) {
                    setData(result);
                }
            })

            getOwnerPaymentDetail().then(async (result) => {
                console.log(result);
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
                                no_transaksi: b.order_id,
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
                setLoading(false);
            }, 3000);
        }, [refresh]));

    const Item = ({ no_transaksi, id_pencari_kos, kos_id, id_pemilik, tgl_pengajuan, tgl_mulai, id_status_sewa, status_sewa, nama_kos, nama_pencari, img }) => (
        <View>
            <View style={globalStyle.listContainer}>
                <View style={[globalStyle.listCol, globalStyle.listColImg]}>
                    <Image style={globalStyle.listImg} source={{ uri: dirUrl + 'kos/' + img }} />
                </View>
                <View style={globalStyle.listCol}>
                    <View style={globalStyle.listHeader}>
                        <View style={[globalStyle.listCategoryContainer, { borderWidth: 1 }]}>
                            <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{moment(tgl_pengajuan).format('dddd, DD MMMM YYYY')}</Text>
                        </View>
                    </View>

                    <View style={[globalStyle.listContent, { marginTop: 10 }]}>
                        <Text style={[globalStyle.text, styles.semiBold]}>{nama_kos}</Text>
                        <View style={globalStyle.listAddressContainer}>
                            <Text style={[globalStyle.textSm, styles.regular]}>Oleh</Text>
                            <Text style={[globalStyle.textSm, styles.bold]}>: {nama_pencari}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <Text style={[globalStyle.label, styles.boldItalic]}>{status_sewa}</Text>
                        </View>
                        <View style={globalStyle.costContainer}>
                            <TouchableOpacity style={[globalStyle.acceptBtn, { opacity: id_status_sewa == 4 ? 0.8 : 1 }]} onPress={() => {
                                setSewa(no_transaksi);
                                setAcceptModal(!acceptModal);
                            }} disabled={id_status_sewa == 4 ? true : false}>
                                <Text style={[globalStyle.textSm, globalStyle.textWhite, styles.regular]}>Ubah Persetujuan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
                                setLoading(true);
                                onAccept(sewa, 2).then((result) => {
                                    if (result != 0) {
                                        ToastAndroid.show('Berhasil!', 3000);
                                    } else {
                                        ToastAndroid.show('Gagal!', 3000);
                                    }
                                })

                                setRefresh(Math.random());
                                setAcceptModal(!acceptModal);
                                setTimeout(() => {
                                    setLoading(false);
                                }, 3000);
                            }}>
                                <Text style={styles.regular}>Terima</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={globalStyle.modalOptBtn} onPress={() => {
                                setLoading(true);
                                onAccept(sewa, 3).then((result) => {
                                    if (result != 0) {
                                        ToastAndroid.show('Berhasil!', 3000);
                                    } else {
                                        ToastAndroid.show('Gagal!', 3000);
                                    }
                                })
                                setRefresh(Math.random());
                                setAcceptModal(!acceptModal);
                                setTimeout(() => {
                                    setLoading(false);
                                }, 3000);
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
                        contentContainerStyle={{ paddingBottom: 80 }}
                        data={data}
                        renderItem={({ item }) => <Item no_transaksi={item.no_transaksi} id_pencari_kos={item.id_pencari_kos} kos_id={item.kos_id} id_pemilik={item.id_pemilik} tgl_pengajuan={item.tgl_pengajuan} tgl_mulai={item.tgl_mulai} id_status_sewa={item.id_status_sewa} status_sewa={item.status_sewa} nama_kos={item.nama_kos} nama_pencari={item.nama_pencari} img={item.img} />}
                        keyExtractor={(item, index) => {
                            return index;
                        }}
                    />
                )}

                {!loading && data.length <= 0 && (
                    <EmptyData />
                )}
            </View>
            <OwnerTab />
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
                        renderItem={({ item, index }) => {
                            return (
                                <View key={index}>
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
                    />
                )}


                {transaction.length <= 0 && (
                    <EmptyData />
                )}
            </View>
            <OwnerTab />
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
                    <Text style={[styles.bold, { opacity: index == 1 ? 1 : 0.5 }]}>Transaksi Masuk</Text>
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
        </View>
    )
}

export default History

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