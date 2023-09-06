import { ImageBackground, ActivityIndicator, Alert, BackHandler, FlatList, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../style/globalStyle';
import { globalColor } from '../../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SkeletonList from '../../component/SkeletonList';
import { Linking } from 'react-native';

const CustomerView = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(Math.random());
    const [modal, setModal] = useState(false);
    const [imgToPreview, setImgToPreview] = useState();
    
    const img = [
        {
            id: 1,
            img: require('../../assets/kost/landscape-1.png')
        },
        {
            id: 2,
            img: require('../../assets/kost/landscape-2.png')
        },
        {
            id: 3,
            img: require('../../assets/kost/landscape-3.png')
        },
        {
            id: 4,
            img: require('../../assets/kost/landscape-5.png')
        },
        {
            id: 5,
            img: require('../../assets/kost/landscape-5.png')
        },
        {
            id: 6,
            img: require('../../assets/kost/landscape-5.png')
        },
    ]

    const fasilitas = [
        {
            id: 1,
            facility: 'Kamar mandi dalam'
        },
        {
            id: 2,
            facility: 'AC'
        },
        {
            id: 3,
            facility: 'Wi-Fi'
        },
        {
            id: 4,
            facility: 'Listrik'
        },
        {
            id: 5,
            facility: 'PDAM'
        },
        {
            id: 6,
            facility: 'Dapur bersama'
        },
    ]
    useFocusEffect(
        React.useCallback(() => {
        }, [refresh]));

    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
    const onPreviewImg = (img) => {
        setModal(!modal);
        setImgToPreview(img)
    }
    return (
        <SafeAreaView style={[globalStyle.container, { padding: 0, justifyContent: 'flex-start' }]}>
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
                    <Image style={globalStyle.showedImg} source={imgToPreview} />
                </View>
            </Modal>
            <View style={globalStyle.topView}>
                <ImageBackground source={require('../../assets/kost/potrait-1.png')} resizeMode="cover" style={globalStyle.imageView}>
                    <TouchableOpacity style={[globalStyle.rightBtnTop, { borderRadius: 100, margin: 15 }]} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Image source={require('../../assets/icon/arrow-left.png')} style={globalStyle.imgSmBack} resizeMode='contain' />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={[globalStyle.previewContainer]}>
                    <FlatList
                        horizontal
                        data={img}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity key={item.id} style={{ marginHorizontal: 3 }} onPress={() => {
                                    onPreviewImg(item.img)
                                }}>
                                    <Image source={item.img} style={globalStyle.imgPreview} />
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <View style={[globalStyle.content, { paddingHorizontal: 15 }]}>
                <View style={globalStyle.contentHeader}>
                    <View style={globalStyle.catContainerPreview}>
                        <Text style={[globalStyle.textSm, styles.regular]}>Putri</Text>
                    </View>
                    <TouchableOpacity style={globalStyle.previewBtnPrimary}>
                        <Image source={require('../../assets/icon/location-white-md.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={[globalStyle.h1, styles.bold, { marginTop: 15 }]}>The Retro Residence</Text>
                <Text style={[globalStyle.label, styles.regular,]}>Jl. Raya Dukuhwaluh No.17 </Text>

                <View style={globalStyle.ownerInfoContainer}>
                    <View style={globalStyle.ownerImgContainer}>
                        <Image style={globalStyle.profileImg} source={require('../../assets/img/user-default.png')} />
                    </View>
                    <View style={globalStyle.ownerIdentityContainer}>
                        <Text style={[globalStyle.inputLabel, styles.bold, { color: globalColor.dark }]}>Bernadya</Text>
                        <Text style={[globalStyle.label, styles.regular]}>Pemilik</Text>
                    </View>
                    <View style={globalStyle.ownerContactContainer}>
                        <TouchableOpacity style={[globalStyle.previewBtnSecondary, { padding: 20, marginHorizontal: 2 }]} onPress={() => {
                            Linking.openURL('http://api.whatsapp.com/send?phone=6283195270389');
                        }}>
                            <Image source={require('../../assets/icon/outline-whatsapp-blue.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={[globalStyle.inputLabel, styles.bold, { marginTop: 15 }]}>Fasilitas</Text>
                <View style={[globalStyle.ownerInfoContainer, { marginTop: 0, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                    {fasilitas.map((item) => {
                        return (
                            <View style={[globalStyle.facilityContainerPreview]} key={item.id}>
                                <Text style={[globalStyle.textSm, styles.regular]}>{item.facility}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
            <View style={[globalStyle.contentFooter, { paddingHorizontal: 15 }]}>
                <Text style={[globalStyle.text, styles.bold]}>Rp. 500.000/bulan</Text>

                <TouchableOpacity style={globalStyle.footerBtn} onPress={()=>{
                    navigation.navigate('CustomerSewa')
                }}>
                    <Text style={[globalStyle.textWhite, styles.bold]}>Ajukan sewa</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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