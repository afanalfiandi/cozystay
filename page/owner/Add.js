import { ImageBackground, ActivityIndicator, PermissionsAndroid, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RadioButton, Checkbox } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import { ToastAndroid } from 'react-native';

const Add = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
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

            } catch (error) {
                let text = 'Waiting..';
                if (errorMsg) {
                    text = errorMsg;
                } else if (location) {
                    text = JSON.stringify(location);
                }
            }
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getPosition()
            setTimeout(() => {
                getPosition()
            }, 500);
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


    const [location, setLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    })
    const [refresh, setRefresh] = useState(Math.random());

    const [mapModal, setMapModal] = useState(false);

    const [jenisKos, setJenisKos] = useState(1);
    const [jenisSewaKos, setJenisSewaKos] = useState(1);

    const [wifi, setWifi] = useState(false);
    const [km, setKM] = useState(false);
    const [listrik, setListrik] = useState(false);
    const [dapur, setDapur] = useState(false);
    const [parkir, setParkir] = useState(false);
    const [ac, setAC] = useState(false);

    const [fasilitas, setFasilitas] = useState([]);
    const [img, setImg] = useState([]);
    const [state, setState] = useState(Math.random());

    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const addFacility = (value) => {
        fasilitas.push(value);
    }

    const onBack = () => {
        navigation.goBack();
    }

    const onSubmit = async () => {
        setLoading(!loading);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('OwnerHome');
        }, 2000);
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


    return (
        <ScrollView contentContainerStyle={[globalStyle.scrollContainer, { backgroundColor: globalColor.white, justifyContent: 'flex-start' }]} style={{ marginBottom: 10, paddingBottom: 10, backgroundColor: globalColor.white }}>
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
                        initialRegion={initialRegion}
                        style={styles.map} >
                        <Marker coordinate={{
                            latitude: initialRegion.latitude,
                            longitude: initialRegion.longitude,
                        }} />
                    </MapView>
                    <View style={[globalStyle.mapModalHeader, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                        <TouchableOpacity style={[globalStyle.leftBtnTop, styles.closeBtn]} onPress={getPosition}>
                            <Image source={require('../../assets/icon/refresh-blue.png')} style={globalStyle.closeImg} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyle.leftBtnTop, styles.closeBtn]} onPress={() => { setMapModal(!mapModal) }}>
                            <Image source={require('../../assets/icon/close-blue.png')} style={globalStyle.closeImg} />
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
                            <TextInput placeholder='Masukkan nama kos Anda' style={[globalStyle.inputText, styles.regular]} />
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Jenis Kos</Text>
                        <View style={globalStyle.radioContainer}>
                            <View style={globalStyle.radio}>
                                <RadioButton
                                    value="1"
                                    status={jenisKos === 1 ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setJenisKos(1);
                                    }}
                                />
                                <Text>Putra</Text>
                            </View>
                            <View style={globalStyle.radio}>
                                <RadioButton
                                    value="2"
                                    status={jenisKos === 2 ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setJenisKos(2);
                                    }}
                                />
                                <Text>Putri</Text>
                            </View>
                            <View style={globalStyle.radio}>
                                <RadioButton
                                    value="2"
                                    status={jenisKos === 3 ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setJenisKos(3);
                                    }}
                                />
                                <Text>Campur</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Alamat Kos</Text>
                        <View style={[globalStyle.formGroup, globalStyle.input]}>
                            <TextInput secureTextEntry placeholder='Masukkan alamat lengkap kos Anda' style={[globalStyle.inputText, styles.regular, { height: 100 }]} />
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Fasilitas</Text>
                        <View style={globalStyle.radioContainer}>
                            <View style={globalStyle.radio}>
                                <Checkbox
                                    status={wifi ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setWifi(!wifi);
                                        addFacility(1)
                                    }}
                                />
                                <Text>Wifi</Text>
                            </View>
                            <View style={globalStyle.radio}>
                                <Checkbox
                                    status={km ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setKM(!km);
                                        addFacility(2)
                                    }}
                                />
                                <Text>Kamar Mandi Dalam</Text>
                            </View>
                            <View style={globalStyle.radio}>
                                <Checkbox
                                    status={listrik ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setListrik(!listrik);
                                        addFacility(3)
                                    }}
                                />
                                <Text>Listrik</Text>
                            </View>
                        </View>
                        <View style={globalStyle.radioContainer}>
                            <View style={globalStyle.radio}>
                                <Checkbox
                                    status={dapur ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setDapur(!dapur);
                                        addFacility(4)
                                    }}
                                />
                                <Text>Dapur Bersama</Text>
                            </View>
                            <View style={globalStyle.radio}>
                                <Checkbox
                                    status={parkir ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setParkir(!parkir);
                                        addFacility(4)
                                    }}
                                />
                                <Text>Parkir Mobil</Text>
                            </View>
                            <View style={globalStyle.radio}>
                                <Checkbox
                                    status={ac ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setAC(!ac);
                                        addFacility(4)
                                    }}
                                />
                                <Text>Parkir Mobil</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Jenis Sewa Kos</Text>
                        <View style={globalStyle.radioContainer}>
                            <View style={globalStyle.radio}>
                                <RadioButton
                                    value="1"
                                    status={jenisSewaKos === 1 ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setJenisSewaKos(1);
                                    }}
                                />
                                <Text>Harian</Text>
                            </View>
                            <View style={globalStyle.radio}>
                                <RadioButton
                                    value="2"
                                    status={jenisSewaKos === 2 ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setJenisSewaKos(2);
                                    }}
                                />
                                <Text>Mingguan</Text>
                            </View>
                            <View style={globalStyle.radio}>
                                <RadioButton
                                    value="3"
                                    status={jenisSewaKos === 3 ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setJenisSewaKos(3);
                                    }}
                                />
                                <Text>Bulanan</Text>
                            </View>
                            <View style={globalStyle.radio}>
                                <RadioButton
                                    value="4"
                                    status={jenisSewaKos === 4 ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setJenisSewaKos(4);
                                    }}
                                />
                                <Text>Tahunan</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Harga Sewa</Text>
                        <View style={[globalStyle.formGroup, globalStyle.input]}>
                            <TextInput placeholder='Rp. .....' style={[globalStyle.inputText, styles.regular]} />
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