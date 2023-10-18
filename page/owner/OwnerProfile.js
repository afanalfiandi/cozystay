import { RefreshControl, ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SkeletonList from '../../component/SkeletonList';
import mime from 'mime';
import * as ImagePicker from 'expo-image-picker';
import OwnerTab from '../../component/OwnerTab';
import getUser from '../../function/getUser';
import getPaymentModal from '../../function/getPaymentModal';
import ownerProfile from '../../function/ownerProfile';
import ownerPass from '../../function/ownerPass';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profilePict from '../../function/profilePict';
import logout from '../../function/logout';
import { dirUrl } from '../../config/baseUrl';

const OwnerProfile = () => {

    const navigation = useNavigation();
    const [modal, setModal] = useState(false);
    const [modalPass, setModalPass] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [data, setData] = useState([]);
    const [payment, setPayment] = useState([]);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [namaDepan, setNamaDepan] = useState();
    const [namaBelakang, setNamaBelakang] = useState();
    const [whatsapp, setWhatsapp] = useState();
    const [noRekening, setNoRekening] = useState();
    const [bank, setBank] = useState();
    const [bankLabel, setBankLabel] = useState();
    const [namaPemilikRekening, setNamaPemilikRekening] = useState();

    const [lama, setLama] = useState();
    const [baru, setBaru] = useState();

    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(Math.random());


    const [uri, seturi] = useState();
    const [name, setname] = useState();
    const [type, settype] = useState();

    onSubmit = async () => {
        setLoading(!loading);
        const id = data.id_user;
        ownerProfile(id, username, email, namaDepan, namaBelakang, whatsapp, noRekening, bank, namaPemilikRekening).then(async (result) => {

            if (result.status == 1) {
                const currData = JSON.parse(await AsyncStorage.getItem('userData'));
                const newData = {
                    email: email,
                    id_jenis_pembayaran: bank,
                    id_level: 2,
                    id_user: currData.id_user,
                    img: currData.img,
                    jenis_pembayaran: currData.jenis_pembayaran,
                    message: currData.message,
                    nama_belakang: namaBelakang,
                    nama_depan: namaDepan,
                    nama_pemilik_rekening: namaPemilikRekening,
                    no_rekening: noRekening,
                    profile_pict: result.img,
                    status: currData.status,
                    username: username,
                    whatsapp: whatsapp
                };

                AsyncStorage.setItem('userData', JSON.stringify(newData));

                setData(newData);

                setBankLabel(bankLabel);
                setBank(bank);

                setEmail(email);
                setUsername(username);
                setNamaDepan(namaDepan);
                setNamaBelakang(namaBelakang);
                setWhatsapp(whatsapp);
                setNoRekening(noRekening);
                setNamaPemilikRekening(namaPemilikRekening);
                ToastAndroid.show('Berhasil!', 3000);
            } else {
                ToastAndroid.show('Gagal!', 3000);
            }
        });
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    const onPass = async () => {
        setLoading(!loading);
        setTimeout(() => {
            const id = data.id_user;
            ownerPass(id, lama, baru).then((result) => {
                if (result.status == 2) {
                    ToastAndroid.show('Kata sandi tidak sesuai', 3000);
                } else if (result.status == 0) {
                    ToastAndroid.show('Gagal!', 3000);
                } else {
                    ToastAndroid.show('Berhasil!', 3000);
                    setModalPass(false);
                }
            })
            setLoading(false);
        }, 2000);
    }

    const launchGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            let uri = result.assets[0].uri;
            let name = result.assets[0].uri.split('/').pop();;
            let type = mime.getType(result.assets[0].uri);
            const id = data.id_user;
            const level = data.id_level;

            profilePict(id, level, uri, name, type).then(async (result) => {
                if (result.status == 0) {
                    ToastAndroid.show('Gagal!', 3000);
                } else {
                    const currData = JSON.parse(await AsyncStorage.getItem('userData'));
                    const newData = {
                        email: currData.email,
                        id_jenis_pembayaran: currData.id_jenis_pembayaran,
                        id_level: currData.id_level,
                        id_user: currData.id_user,
                        img: currData.img,
                        jenis_pembayaran: currData.jenis_pembayaran,
                        message: currData.message,
                        nama_belakang: currData.nama_belakang,
                        nama_depan: currData.nama_depan,
                        nama_pemilik_rekening: currData.nama_pemilik_rekening,
                        no_rekening: currData.no_rekening,
                        profile_pict: result.img,
                        status: currData.status,
                        username: currData.username,
                        whatsapp: currData.whatsapp
                    };

                    AsyncStorage.setItem('userData', JSON.stringify(newData));

                    seturi(uri);
                    setname(result.img);
                    settype(type);

                    ToastAndroid.show('Berhasil!', 3000);
                }
            });

        } else {
            return null;
        }
    }

    const onLogout = async () => {
        Alert.alert("", "Apakah Anda yakin ingin keluar?", [
            {
                text: "Batal",
                onPress: () => null,
                style: "cancel",
            },
            {
                text: "Keluar", onPress: () => {
                    logout();
                }
            },
        ]);
    }

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            getUser().then((result) => {
                setData(result);
                setBankLabel(result.jenis_pembayaran);
                setBank(result.id_jenis_pembayaran);

                setEmail(result.email);
                setUsername(result.username);
                setNamaDepan(result.nama_depan);
                setNamaBelakang(result.nama_belakang);
                setWhatsapp(result.whatsapp);
                setNoRekening(result.no_rekening);
                setNamaPemilikRekening(result.nama_pemilik_rekening);
                setname(result.profile_pict);
            });

            getPaymentModal().then((result) => {
                setPayment(result);
            })
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }, [refresh]));
    return (
        <SafeAreaView style={[globalStyle.container, { paddingHorizontal: 10 }]}>
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
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}>
                <View style={globalStyle.modalFormContainer}>
                    <View style={globalStyle.modalContainer}>
                        <View style={globalStyle.modalFormHeader}>
                            <View style={globalStyle.headerTitleContainer}>
                                <Text style={[globalStyle.text, styles.regular]}>Pilih Bank</Text>
                            </View>
                            <View style={globalStyle.headerBtnContainer}>
                                <TouchableOpacity style={globalStyle.closeBtn} onPress={() => { setModal(!modal) }}>
                                    <Image source={require('../../assets/icon/close-blue.png')} style={globalStyle.closeImg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={globalStyle.modalForm}>
                            {payment.map((item, index) => {
                                return (
                                    <TouchableOpacity style={globalStyle.modalOptBtn} onPress={() => {
                                        setBank(item.id_jenis_pembayaran);
                                        setBankLabel(item.jenis_pembayaran);
                                        setModal(!modal);
                                    }} key={index}>
                                        <Text style={styles.regular}>{item.jenis_pembayaran}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalPass}
                onRequestClose={() => {
                    setModalPass(!modalPass);
                }}>
                <View style={globalStyle.modalFormContainer}>
                    <View style={globalStyle.modalContainer}>
                        <View style={globalStyle.modalFormHeader}>
                            <View style={globalStyle.headerTitleContainer}>
                                <Text style={[globalStyle.text, styles.regular]}>Ubah Kata Sandi</Text>
                            </View>
                            <View style={globalStyle.headerBtnContainer}>
                                <TouchableOpacity style={globalStyle.closeBtn} onPress={() => { setModalPass(!modalPass) }}>
                                    <Image source={require('../../assets/icon/close-blue.png')} style={globalStyle.closeImg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={globalStyle.modalForm}>
                            <View>
                                <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Kata Sandi Sebelumnya</Text>
                                <View style={[globalStyle.formGroup, globalStyle.input]}>
                                    <TextInput value={lama} onChangeText={setLama} secureTextEntry placeholder='******' style={[globalStyle.inputText, styles.regular]} />
                                </View>
                            </View>
                            <View>
                                <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Kata Sandi Baru</Text>
                                <View style={[globalStyle.formGroup, globalStyle.input]}>
                                    <TextInput value={baru} onChangeText={setBaru} secureTextEntry placeholder='******' style={[globalStyle.inputText, styles.regular]} />
                                </View>
                            </View>
                            <View style={[globalStyle.formGroup]}>
                                <TouchableOpacity style={[globalStyle.btnPrimary]} onPress={onPass}>
                                    <Text style={[globalStyle.btnText, styles.bold]}>simpan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={[styles.header, { paddingHorizontal: 15 }]}>
                <View style={[globalStyle.headerTitleContainer, { alignItems: 'flex-start' }]}>
                    <Text style={[globalStyle.text, styles.semiBold]}>Akun Saya</Text>
                </View>
                <TouchableOpacity onPress={onLogout}>
                    <Text style={[globalStyle.text, styles.bold, { color: globalColor.red }]}>Keluar</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={[globalStyle.scrollView]} refreshControl={
                <RefreshControl refreshing={loading} onRefresh={() => {
                    setRefresh(Math.random())
                }} />
            }>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <View style={globalStyle.profileImgContainer}>
                        <TouchableOpacity onPress={launchGallery}>
                            <Image resizeMode='contain' style={globalStyle.profileImg} source={{ uri: dirUrl + 'profile_pict/' + name }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={globalStyle.spaceBetween}>
                    <Text style={[globalStyle.text, styles.bold]}>Data Diri</Text>
                    <TouchableOpacity onPress={() => {
                        setDisabled(!disabled)
                    }}>
                        <Text style={[globalStyle.text, styles.regular]}>{disabled ? 'Ubah' : 'Batal'}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Username</Text>
                    <View style={[globalStyle.formGroup, globalStyle.input]}>
                        <TextInput editable={disabled ? false : true} value={username} onChangeText={setUsername} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
                    </View>
                </View>
                <View>
                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Email</Text>
                    <View style={[globalStyle.formGroup, globalStyle.input]}>
                        <TextInput editable={disabled ? false : true} value={email} onChangeText={setEmail} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
                    </View>
                </View>
                <View>
                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Depan</Text>
                    <View style={[globalStyle.formGroup, globalStyle.input]}>
                        <TextInput editable={disabled ? false : true} value={namaDepan} onChangeText={setNamaDepan} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
                    </View>
                </View>
                <View>
                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Belakang</Text>
                    <View style={[globalStyle.formGroup, globalStyle.input]}>
                        <TextInput editable={disabled ? false : true} value={namaBelakang} onChangeText={setNamaBelakang} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
                    </View>
                </View>
                <View>
                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>No. Telepon/Whatsapp</Text>
                    <View style={[globalStyle.formGroup, globalStyle.input]}>
                        <TextInput editable={disabled ? false : true} value={whatsapp} onChangeText={setWhatsapp} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
                    </View>
                </View>
                <View>
                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>No. Rekening</Text>
                    <View style={[globalStyle.formGroup, globalStyle.input]}>
                        <TextInput editable={disabled ? false : true} value={noRekening} onChangeText={setNoRekening} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
                    </View>
                </View>
                <View>
                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Bank</Text>
                    <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input, { opacity: disabled ? 0.5 : 1 }]}>
                        <TouchableOpacity style={globalStyle.inputSelect} onPress={() => {
                            setModal(!modal);
                        }} disabled={disabled ? true : false}>
                            <Text style={[styles.regular, { color: globalColor.muted }]}> {bankLabel} </Text>
                        </TouchableOpacity>
                        <View style={globalStyle.imgInputContainer}>
                            <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../../assets/icon/arrow-right-sm.png')} />
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { color: globalColor.primary, marginTop: 7 }]}>Nama Pemilik Rekening</Text>
                    <View style={[globalStyle.formGroup, globalStyle.input]}>
                        <TextInput editable={disabled ? false : true} value={namaPemilikRekening} onChangeText={setNamaPemilikRekening} style={[globalStyle.inputText, styles.regular, { opacity: disabled ? 0.5 : 1 }]} />
                    </View>
                </View>

                <View style={[globalStyle.formGroup]}>
                    <TouchableOpacity disabled={disabled ? true : false} style={[globalStyle.btnPrimary, { opacity: disabled ? 0.5 : 1 }]} onPress={onSubmit}>
                        <Text style={[globalStyle.btnText, styles.bold]}>simpan</Text>
                    </TouchableOpacity>
                </View>

                <View style={[globalStyle.divider, { marginBottom: 1 }]}></View>
                <View style={[globalStyle.formGroup, { marginBottom: 100 }]}>
                    <View style={[globalStyle.spaceBetween, { justifyContent: 'center' }]}>
                        <Text style={[globalStyle.text, styles.regular]}>Ingin mengubah kata sandi? </Text>
                        <TouchableOpacity onPress={() => {
                            setModalPass(true);
                        }}>
                            <Text style={[globalStyle.text, styles.bold, { color: globalColor.primary }]}>Ubah disini</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <OwnerTab />
        </SafeAreaView >
    )
}

export default OwnerProfile


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