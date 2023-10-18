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

const OwnerView = ({ route }) => {
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

    const onDelete = (id) => {
        Alert.alert("", "Apakah Anda yakin ingin menghapus data?", [
            {
                text: "Batal",
                onPress: () => null,
                style: "cancel",
            },
            {
                text: "Hapus", onPress: () => {
                    deleteKos(id).then((result) => {
                        if (result.status == 1) {
                            ToastAndroid.show('Berhasil!', 3000);
                            navigation.navigate('OwnerHome')
                        } else {
                            ToastAndroid.show('Gagal!', 3000);
                        }
                    })
                }
            },
        ]);
    }

    const onPreviewImg = (img) => {
        setModal(!modal);
        setImgToPreview(img)
    }

    const onMap = (lat, long) => {
        Linking.openURL('google.navigation:q=' + lat + '+' + long)
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
            <StatusBar
                animated={true}
                backgroundColor={globalColor.white}
                barStyle='light-content'
            />
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
                <Text style={[globalStyle.h1, styles.bold, { marginTop: 15 }]}>{data.nama_kos}</Text>
                <Text style={[globalStyle.label, styles.regular,]}>{data.alamat} </Text>

                <Text style={[globalStyle.inputLabel, styles.bold, { marginTop: 15 }]}>Fasilitas</Text>
                <View style={[globalStyle.ownerInfoContainer, { marginTop: 0, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                    {fasilitas.map((item, index) => {
                        return (
                            <View style={[globalStyle.facilityContainerPreview]} key={index}>
                                <Text style={[globalStyle.textSm, styles.regular]}>{item.fasilitas}</Text>
                            </View>
                        )
                    })}
                </View>


                <Text style={[globalStyle.inputLabel, styles.bold, { marginTop: 15 }]}>Harga</Text>
                <View style={globalStyle.spaceArround}>
                    <Rupiah numb={data.harga} />
                    <Text style={[styles.regular]}>/{data.label}</Text>
                </View>
            </View>
            <View style={[globalStyle.contentFooter, { paddingHorizontal: 15 }]}>
                <Text style={[globalStyle.text, styles.bold]}></Text>

                <TouchableOpacity style={[globalStyle.footerBtn, { backgroundColor: globalColor.red }]} onPress={() => { onDelete(data.kos_id) }}>
                    <Text style={[globalStyle.textWhite, styles.bold]}>Hapus</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default OwnerView

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