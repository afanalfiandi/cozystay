import { ImageBackground, ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import viewKos from '../../function/viewKos';
import viewKosFasilitas from '../../function/viewKosFasilitas';
import Rupiah from '../../component/Rupiah';
import viewKosImg from '../../function/viewKosImg';
import { dirUrl } from '../../config/baseUrl';
import deleteKos from '../../function/deleteKos';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerView = ({ route }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(Math.random());

    const [modal, setModal] = useState(false);
    const [imgToPreview, setImgToPreview] = useState();
    const id = route.params.id;
    const [data, setData] = useState([]);
    const [fasilitas, setFasilitas] = useState([]);
    const [imgJumbo, setimgJumbo] = useState([]);
    const [image, setImage] = useState([]);


    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                viewKos(id).then((result) => {
                    setData(result[0]);
                    console.log(result);
                });

                viewKosFasilitas(id).then((result) => {
                    setFasilitas(result);
                })

                viewKosImg(id).then((result) => {
                    setImage(result);
                    setimgJumbo(result[0].img)
                })
            }, 500);
        }, [refresh]));

    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const onSewa = async (id, alamat, fasilitas, harga, label, jenis_kos, img, nama_kos) => {
        const userData = JSON.parse(await AsyncStorage.getItem('userData'));
        const nama_user = userData.nama_depan + ' ' + userData.nama_belakang;
        const whatsapp = userData.whatsapp;
        const jenis_kelamin = userData.jenis_kelamin;
        navigation.navigate('CustomerSewa', {
            id: id, alamat: alamat, fasilitas: fasilitas, harga: harga, label: label,
            jenis_kos: jenis_kos, nama_user: nama_user, whatsapp: whatsapp, jenis_kelamin: jenis_kelamin, img: img, nama_kos: nama_kos
        });
    }

    const onPreviewImg = (img) => {
        setModal(!modal);
        setImgToPreview(img)
    }

    const onMap = (lat, long) => {
        Linking.openURL('google.navigation:q=' + lat + '+' + long)
    }

    const onWhatsapp = async (numb, nama_kos, nama_depan) => {
        const userData = JSON.parse(await AsyncStorage.getItem('userData'));
        const nama = userData.nama_depan + ' ' + userData.nama_belakang;

        const text = 'Halo Bpk/Ibu ' + nama_depan + '.%0a%0aSaya tertarik untuk mengetahui lebih lanjut tentang kos *' + nama_kos + '* yang Anda tawarkan pada aplikasi CozyStay. Bisakah Anda memberikan informasi tentang harga, lokasi, dan ketersediaan kamar kos? Terima kasih atas bantuannya.%0a%0aSalam, ' + nama;
        Linking.openURL('whatsapp://send?phone=' + numb + '&text=' + text)
    }
    const PreviewImg = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}>
                <View style={globalStyle.imgModalContainer}>
                    <TouchableOpacity style={globalStyle.closeImgModalBtn} onPress={() => { setModal(!modal) }}>
                        <Image style={globalStyle.closeImg} source={require('../../assets/icon/close-white.png')} />
                    </TouchableOpacity>
                    <Image style={globalStyle.showedImg} source={{ uri: dirUrl + 'kos/' + imgToPreview }} />
                </View>
            </Modal>
        )
    }
    return (
        <SafeAreaView style={[globalStyle.container, { padding: 0, justifyContent: 'flex-start' }]}>
            <PreviewImg />
            <View style={globalStyle.topView}>
                <ImageBackground source={{ uri: dirUrl + 'kos/' + imgJumbo }} resizeMode="cover" style={globalStyle.imageView}>
                    <TouchableOpacity style={[globalStyle.rightBtnTop, { borderRadius: 100, margin: 15 }]} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Image source={require('../../assets/icon/arrow-left.png')} style={globalStyle.imgSmBack} resizeMode='contain' />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={[globalStyle.previewContainer]}>
                    <FlatList
                        horizontal
                        data={image}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity key={index} style={{ marginHorizontal: 3 }} onPress={() => {
                                    onPreviewImg(item.img)
                                }}>
                                    <Image source={{ uri: dirUrl + 'kos/' + item.img }} style={globalStyle.imgPreview} />
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>
            <View style={[globalStyle.content, { paddingHorizontal: 15 }]}>
                <View style={globalStyle.contentHeader}>
                    <View style={globalStyle.catContainerPreview}>
                        <Text style={[globalStyle.textSm, styles.regular]}>{data.jenis_kos}</Text>
                    </View>
                    <TouchableOpacity style={globalStyle.previewBtnPrimary} onPress={() => { onMap(data.latitude, data.longitude) }}>
                        <Image source={require('../../assets/icon/location-white-md.png')} />
                    </TouchableOpacity>
                </View>
                <View style={[globalStyle.spaceBetween, { alignItems: 'center' }]}>
                    <View style={[globalStyle.profileImgContainer, { width: '10%', flex: 1, backgroundColor: 'white' }]}>
                        <Image resizeMode='contain' style={globalStyle.profileImg} source={{ uri: dirUrl + 'profile_pict/' + data.profile_pict }} />
                    </View>
                    <View style={{ width: '60%' }}>
                        <Text style={[globalStyle.h1, styles.bold, { marginTop: 15 }]}>{data.nama_kos}</Text>
                        <Text style={[globalStyle.label, styles.regular,]}>{data.alamat} </Text>
                    </View>
                    <View style={{ width: '15%', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={[globalStyle.roundBtn]} onPress={() => {
                            onWhatsapp(data.whatsapp, data.nama_kos, data.nama_depan, data.nama_pemilik)
                        }}>
                            <Image source={require('../../assets/icon/outline-whatsapp-blue.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={[globalStyle.inputLabel, styles.bold, { marginTop: 15 }]}>Fasilitas</Text>

                <View style={[globalStyle.facilityContainerPreview, { alignSelf: 'flex-start' }]}>
                    <Text style={[styles.regular]}>{data.fasilitas}</Text>
                </View>
            </View>
            <View style={[globalStyle.contentFooter, { paddingHorizontal: 15 }]}>
                <View style={[globalStyle.spaceArround, { alignItems: 'center' }]}>
                    <Rupiah numb={data.harga} />
                    <Text style={[styles.regular, globalStyle.textSm]}>/{data.label}</Text>
                </View>

                <TouchableOpacity style={[globalStyle.footerBtn, { backgroundColor: globalColor.primary }]} onPress={() => {
                    var id = data.kos_id;
                    var alamat = data.alamat;
                    var fasilitas = data.fasilitas;
                    var harga = data.harga;
                    var label = data.label;
                    var jenis_kos = data.jenis_kos;
                    var img = data.img;
                    var nama_kos = data.nama_kos;

                    onSewa(id, alamat, fasilitas, harga, label, jenis_kos, img, nama_kos);
                }}>
                    <Text style={[globalStyle.textWhite, styles.bold]}>Sewa</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default CustomerView

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