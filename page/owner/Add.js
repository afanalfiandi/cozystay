import { ImageBackground, ActivityIndicator, PermissionsAndroid, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RadioButton, Checkbox } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import { ToastAndroid } from 'react-native';
import getJenisSewa from '../../function/getJenisSewa';
import getJenisKos from '../../function/getJenisKos';
import getFasilitas from '../../function/getFasilitas';
import addKos from '../../function/addKos';

const Add = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [dataJenisSewa, setDataJenisSewa] = useState([]);
    const [dataJenisKos, setDataJenisKos] = useState([]);
    const [dataFasilitas, setDataFasilitas] = useState([]);

    const [namaKos, setNamaKos] = useState('');
    const [jenisKos, setJenisKos] = useState('');
    const [alamat, setAlamat] = useState('');
    const [fasilitas, setFasilitas] = useState([]);
    const [jenisSewaKos, setJenisSewaKos] = useState('');
    const [harga, setHarga] = useState('');
    const [img, setImg] = useState([]);

    const getPosition = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                let lat = location.coords.latitude;
                let long = location.coords.longitude;

                setInitialRegion({
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                });

                console.log(lat);
            } catch (error) {
                ToastAndroid.show("Koneksi bermasalah!", 3000);
            }
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getPosition();

            getJenisSewa().then(result => {
                setDataJenisSewa(result);
            })

            getJenisKos().then(result => {
                setDataJenisKos(result);
            })

            getFasilitas().then(result => {
                setDataFasilitas(result);
            })
            // setTimeout(() => {
            //     getPosition()
            // }, 500);
            const backAction = () => {
                navigation.navigate('OwnerHome')
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove();
        }, [refresh]));


    const [initialRegion, setInitialRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    })
    const [refresh, setRefresh] = useState(Math.random());

    const [mapModal, setMapModal] = useState(false);


    const [state, setState] = useState(Math.random());

    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

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

    const onBack = () => {
        navigation.goBack();
    }

    const onSubmit = async () => {
        setLoading(!loading);
        addKos(namaKos, jenisKos, alamat, fasilitas, jenisSewaKos, harga, initialRegion.latitude, initialRegion.longitude, img)
            .then(result => {
                if (result.status == 1) {
                    ToastAndroid.show('Berhasil', 3000);
                    navigation.navigate('OwnerHome');
                } else {
                    ToastAndroid.show('Gagal', 3000);
                }
            });
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    const openGallery = async () => {
        if (img.length < 5) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                // allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                let uri = result.assets[0].uri;
                let name = result.assets[0].uri.split('/').pop();;
                let type = mime.getType(result.assets[0].uri);

                img.push({
                    uri: uri,
                    name: name,
                    type: type
                });

                setImg(img);
                setState(Math.random());
            }
        } else {
            ToastAndroid.show('Jumlah maximal sudah terpenuhi', 2000)
        }
    }
    const onRemove = (name, index) => {
        arr = [...img];
        if (index !== -1) {
            arr.splice(index, 1);
        }
        setImg(arr)
    }
    let previewImg = img.map((item, index) => {
        return (
            <ImageBackground key={index} source={{ uri: item.uri }} style={styles.imgBg}>
                <TouchableOpacity style={{ flex: 1, width: '100%', backgroundColor: globalColor.dark, opacity: 0.65, justifyContent: 'center', alignItems: 'center' }} onPress={() => { onRemove(item.name, index) }}>
                    <Image source={require('../../assets/icon/close-white.png')} />
                </TouchableOpacity>
            </ImageBackground>

        )
    })

    const onRegionChangeComplete = (region) => {
        setInitialRegion({
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        })
    }

    return (
        <ScrollView contentContainerStyle={[globalStyle.scrollContainer, { backgroundColor: globalColor.white, justifyContent: 'flex-start' }]} style={{ marginBottom: 10, paddingBottom: 10, backgroundColor: globalColor.white }}>
            <StatusBar
                animated={true}
                backgroundColor={globalColor.white}
                barStyle='dark-content'
            />
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={mapModal}
                onRequestClose={() => {
                    setMapModal(!mapModal);
                }}>
                <View style={globalStyle.mapModalContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={initialRegion}
                        style={[styles.map]}
                        onRegionChangeComplete={onRegionChangeComplete}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                    >
                    </MapView>

                    <View style={[globalStyle.markerContainer]}>
                        <Image source={require('../../assets/icon/location-lg.png')} style={{ width: 30, height: 30, resizeMode: 'contain', marginTop: -20 }} />
                    </View>
                    <View style={[globalStyle.mapModalFooter]}>
                        <TouchableOpacity style={globalStyle.btnPrimary} onPress={() => {
                            setLoading(!loading);
                            setTimeout(() => {
                                setLoading(false);
                                setMapModal(false);
                            }, 1500);
                        }}>
                            <Text style={[globalStyle.btnText, styles.bold]}>simpan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={[styles.header]}>
                <TouchableOpacity style={globalStyle.leftBtnTop} onPress={onBack}>
                    <Image source={require('../../assets/icon/arrow-left.png')} style={{ height: 18 }} resizeMode='contain' />
                </TouchableOpacity>
                <View style={globalStyle.pageTitleContainer}>
                    <Text style={[styles.bold, globalStyle.pageTitle]}>Tambah Kos</Text>
                </View>
            </View>
            <View style={[globalStyle.content, { backgroundColor: globalColor.white }]}>
                <View style={globalStyle.form}>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Kos</Text>
                        <View style={[globalStyle.formGroup, globalStyle.input]}>
                            <TextInput value={namaKos} onChangeText={setNamaKos} placeholder='Masukkan nama kos Anda' style={[globalStyle.inputText, styles.regular]} />
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Jenis Kos</Text>
                        <View style={globalStyle.radioContainer}>
                            {dataJenisKos.map((item, index) => {
                                return (
                                    <View style={globalStyle.radio} key={index}>
                                        <RadioButton
                                            value={item.id_jenis_kos}
                                            status={jenisKos === item.id_jenis_kos ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setJenisKos(item.id_jenis_kos);
                                            }}
                                        />
                                        <Text>{item.jenis_kos}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Alamat Kos</Text>
                        <View style={[globalStyle.formGroup, globalStyle.input]}>
                            <TextInput value={alamat} onChangeText={setAlamat} placeholder='Masukkan alamat lengkap kos Anda' style={[globalStyle.inputText, styles.regular, { height: 100 }]} />
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Fasilitas</Text>
                        <View style={[globalStyle.radioContainer, { flexWrap: 'wrap', justifyContent: 'flex-start' }]}>
                            {dataFasilitas.map((item, index) => {
                                return (
                                    <View style={globalStyle.radio} key={index}>
                                        <Checkbox
                                            status={fasilitas.includes(parseInt(item.id_fasilitas)) ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                addFacility(parseInt(item.id_fasilitas));
                                            }}
                                        />
                                        <Text>{item.fasilitas}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Jenis Sewa Kos</Text>
                        <View style={globalStyle.radioContainer}>
                            {dataJenisSewa.map((item, index) => {
                                return (
                                    <View style={globalStyle.radio} key={index}>
                                        <RadioButton
                                            value={item.id_jenis_sewa}
                                            status={jenisSewaKos === item.id_jenis_sewa ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setJenisSewaKos(item.id_jenis_sewa);
                                            }}
                                        />
                                        <Text>{item.jenis_sewa}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Harga Sewa</Text>
                        <View style={[globalStyle.formGroup, globalStyle.input]}>
                            <TextInput value={harga} onChangeText={setHarga} placeholder='Rp. .....' style={[globalStyle.inputText, styles.regular]} />
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Lokasi</Text>
                        <View style={[globalStyle.formGroup, globalStyle.input]}>
                            <TouchableOpacity style={[globalStyle.inputSelect, { width: '92%' }]} onPress={() => {
                                setMapModal(!mapModal);
                            }}>
                                <Text style={[styles.regular, { color: globalColor.muted }]}> Pilih Lokasi Dari Peta </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Tambahkan Foto</Text>
                        <View style={[globalStyle.spaceArround, { flexWrap: 'wrap' }]}>
                            {previewImg}
                            <TouchableOpacity style={globalStyle.photoBtn} onPress={openGallery}>
                                <Image source={require('../../assets/icon/plus-lg-blue.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[globalStyle.formGroup]}>
                        <TouchableOpacity style={globalStyle.btnPrimary} onPress={onSubmit}>
                            <Text style={[globalStyle.btnText, styles.bold]}>simpan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView >
    )
}

export default Add

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
        justifyContent: 'space-between',
    },
    map: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtn: {
        borderRadius: 100,
        opacity: 0.8,
        backgroundColor: globalColor.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 5,
        marginRight: 5,
    },
    img: {
        borderRadius: 10,
        width: '23%',
        height: 80,
        resizeMode: 'cover'
    },
    imgBg: {
        width: 75,
        height: 77,
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    }
})