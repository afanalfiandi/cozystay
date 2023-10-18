import { ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SkeletonList from '../../component/SkeletonList';
import OwnerTab from '../../component/OwnerTab';
import historyOwner from '../../function/historyOwner';
import EmptyData from '../../component/EmptyData';
import { dirUrl } from '../../config/baseUrl';
import moment from 'moment/moment';
import onAccept from '../../function/onAccept';

const History = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(Math.random());
    const [acceptModal, setAcceptModal] = useState(false);
    const [sewa, setSewa] = useState('');
    const [data, setData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            historyOwner().then((result) => {
                if (result.status != 0) {
                    setData(result);
                }
            })
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }, [refresh]));

    const Item = ({ id_sewa, id_pencari_kos, kos_id, id_pemilik, tgl_pengajuan, tgl_mulai, id_status_sewa, status_sewa, nama_kos, nama_pencari, img }) => (
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
                                setSewa(id_sewa);
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

                {!loading && data.length > 0 && (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 80 }}
                        data={data}
                        renderItem={({ item }) => <Item id_sewa={item.id_sewa} id_pencari_kos={item.id_pencari_kos} kos_id={item.kos_id} id_pemilik={item.id_pemilik} tgl_pengajuan={item.tgl_pengajuan} tgl_mulai={item.tgl_mulai} id_status_sewa={item.id_status_sewa} status_sewa={item.status_sewa} nama_kos={item.nama_kos} nama_pencari={item.nama_pencari} img={item.img} />}
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
})