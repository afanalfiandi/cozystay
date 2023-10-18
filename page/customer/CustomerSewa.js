import { ImageBackground, Modal, ActivityIndicator, TextInput, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, Dimensions, BackHandler, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalColor } from '../../style/globalColor';
import { globalStyle } from '../../style/globalStyle';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RadioButton, Checkbox } from 'react-native-paper';
import Rupiah from '../../component/Rupiah';
import mime from 'mime';
import * as ImagePicker from 'expo-image-picker';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment/moment';
import 'moment/locale/id';
import { dirUrl } from '../../config/baseUrl';
import applyRent from '../../function/applyRent';

const CustomerSewa = ({ route }) => {
    moment.locale('id');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [uri, setUri] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [refresh, setRefresh] = useState(Math.random());
    const [picker, setPicker] = useState(false); // membuka timepicker
    const [date, setDate] = useState('');

    const id = route.params.id;
    const alamat = route.params.alamat;
    const fasilitas = route.params.fasilitas;
    const harga = route.params.harga;
    const label = route.params.label;
    const jenis_kos = route.params.jenis_kos;
    const nama_user = route.params.nama_user;
    const whatsapp = route.params.whatsapp;
    const jenis_kelamin = route.params.jenis_kelamin
    const img = route.params.img;
    const nama_kos = route.params.nama_kos;
    const no_transaksi = route.params.no_transaksi;

    useFocusEffect(
        React.useCallback(() => {

        }, [refresh]));

    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const onSewa = () => {
        setLoading(!loading);
        setTimeout(() => {
            applyRent(id, date).then((result) => {
                if (result.status == 1) {
                    ToastAndroid.show('Pengajuan sewa berhasil!', 3000);
                    navigation.navigate('CustomerTransaction', {
                        id_kos: id,
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
                        no_transaksi: result.no_transaksi
                    });
                } else {
                    ToastAndroid.show('Pengajuan sewa gagal!', 3000);
                }
            })

            setLoading(false);
        }, 2000);
    }

    let PreviewImg = () => {
        return (
            <TouchableOpacity style={globalStyle.photoBtn} onPress={openGallery}>
                <Image source={{ uri: uri }} style={{ width: 75, height: 77, borderRadius: 10, }} />
            </TouchableOpacity>

        )
    }


    const onDatePicker = () => {
        setPicker(true);
    }

    return (
        <SafeAreaView style={[globalStyle.container, { justifyContent: 'flex-start', padding: 0 }]}>
            <StatusBar
                animated={true}
                backgroundColor={globalColor.white}
                barStyle='dark-content'
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={picker}
                onRequestClose={() => {
                    setPicker(!picker);
                }}>
                <View style={[globalStyle.loadingContainer]}>
                    <DatePicker
                        onSelectedChange={date => {
                            const newDate = date.replace('/', '-');
                            const newDate2 = newDate.replace('/', '-');
                            const convDate = moment(newDate2).format('YYYY-MM-DD');
                            setDate(convDate);
                            setPicker(false)
                        }}
                        mode="calendar"
                        options={{
                            backgroundColor: globalColor.white,
                            textHeaderColor: globalColor.primary,
                            textDefaultColor: globalColor.primary,
                            selectedTextColor: '#fff',
                            mainColor: globalColor.primary,
                            textSecondaryColor: globalColor.muted,
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                        }}
                        style={{ margin: 100 }}
                    />
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}
                onRequestClose={() => {
                    setLoading(!loading);
                }}>
                <View style={globalStyle.loadingContainer}>
                    <ActivityIndicator size="large" color={globalColor.primary} />
                </View>
            </Modal>
            <View style={[styles.header, { paddingHorizontal: 10, paddingTop: 15 }]}>
                <TouchableOpacity style={globalStyle.leftBtnTop} onPress={() => {
                    navigation.goBack();
                }}>
                    <Image source={require('../../assets/icon/arrow-left.png')} />
                </TouchableOpacity>
                <View style={globalStyle.headerTitleContainer}>
                    <Text style={[globalStyle.text, styles.semiBold]}>Pengajuan Sewa</Text>
                </View>
            </View>

            <View style={[globalStyle.content, { backgroundColor: 'transparent', paddingHorizontal: 25 }]}>
                <ScrollView>
                    <View style={[globalStyle.listContainer]}>
                        <View style={[globalStyle.listCol, globalStyle.listColImg]}>
                            <Image style={globalStyle.listImg} source={{ uri: dirUrl + 'kos/' + img }} />
                        </View>
                        <View style={globalStyle.listCol}>
                            <View style={globalStyle.listHeader}>
                                <View style={globalStyle.listCategoryContainer}>
                                    <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{jenis_kos}</Text>
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
                                    <Text style={[globalStyle.textSm, styles.regular]}>/{label}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={globalStyle.divider}></View>
                    <View style={globalStyle.form}>
                        <Text style={[globalStyle.text, styles.bold]}>Informasi Penyewa</Text>
                        <View>
                            <Text style={[styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Nama</Text>
                            <Text style={[styles.semiBold, globalStyle.text, { color: globalColor.muted }]}>{nama_user}</Text>
                        </View>
                        <View>
                            <Text style={[styles.semiBold, globalStyle.text, { marginTop: 7 }]}>No. Telepon/Whatsapp</Text>
                            <Text style={[styles.semiBold, globalStyle.text, { color: globalColor.muted }]}>+{whatsapp}</Text>
                        </View>
                        <View>
                            <Text style={[styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Jenis Kelamin</Text>
                            <Text style={[styles.semiBold, globalStyle.text, { color: globalColor.muted }]}>{jenis_kelamin}</Text>
                        </View>
                    </View>
                    <View style={globalStyle.divider}></View>
                    <View style={globalStyle.form}>
                        <View>
                            <View style={globalStyle.spaceBetween}>
                                <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Tanggal Mulai Kos</Text>
                                <TouchableOpacity onPress={onDatePicker}>
                                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Atur</Text>
                                </TouchableOpacity>
                            </View>
                            {date == '' && (
                                <Text style={[styles.semiBold, globalStyle.text, { color: globalColor.muted }]}>Tanggal Belum Diatur</Text>
                            )}
                            {date != '' && (
                                <Text style={[styles.semiBold, globalStyle.text, { color: globalColor.muted }]}>{moment(date).format('dddd, DD MMMM YYYY')}</Text>
                            )}
                        </View>
                    </View>
                    <View style={[globalStyle.noteContainer, globalStyle.spaceBetween, { flexWrap: 'wrap' }]}>
                        <Image source={require('../../assets/icon/outline-warning-blue.png')} style={{ marginRight: 20 }} />
                        <View style={[{ flex: 1 }]}>
                            <Text style={[styles.bold, globalStyle.text, { textAlign: 'justify' }]}>Note :
                                <Text style={[styles.regular]}> Pembayaran dilakukan setelah pemilik kos menerima pengajuan.</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 100 }}></View>
                </ScrollView>
            </View>
            <View style={[globalStyle.contentFooter, { paddingTop: 15, position: 'absolute', bottom: 0, width: Dimensions.get("screen").width, backgroundColor: 'white' }]}>
                <View style={[globalStyle.spaceArround, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Rupiah numb={harga} />
                    <Text style={[styles.regular, globalStyle.textSm]}>/{label}</Text>
                </View>
                <TouchableOpacity style={[globalStyle.footerBtn, { opacity: date != '' ? 1 : 0.8 }]} onPress={onSewa} disabled={date != '' ? false : true}>
                    <Text style={[globalStyle.textWhite, styles.bold]}>Ajukan sewa</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default CustomerSewa

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
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})