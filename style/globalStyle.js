import { Dimensions, StyleSheet } from "react-native";
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import { globalColor } from "./globalColor";

export const globalStyle = StyleSheet.create({
    mb10: {
        marginBottom: 10
    },
    mb15: {
        marginBottom: 15
    },
    mb20: {
        marginBottom: 20
    },
    mb25: {
        marginBottom: 25
    },
    scrollView: {
        height: height,
        backgroundColor: globalColor.white
    },
    scrollContainer: {
        borderWidth: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 25,
    },
    container: {
        borderWidth: 0,
        flex: 1,
        height: height,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },
    form: {
        width: '100%',
    },
    formGroup: {
        marginVertical: 10
    },
    input: {
        borderWidth: 1.8,
        borderRadius: 8,
        paddingVertical: 7,
        marginTop: 7,
        borderColor: globalColor.light,
        alignItems: 'center',
        paddingHorizontal: 5
    },
    inputLabel: {
        fontSize: 17,
        color: globalColor.primary,
    },
    h1: {
        fontSize: 24,
        color: globalColor.primary,
    },
    text: {
        fontSize: 16,
        color: globalColor.dark,
    },
    textSm: {
        fontSize: 12,
        color: globalColor.dark,
    },
    spaceBetween: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    spaceArround: {
        justifyContent: 'space-arround',
        flexDirection: 'row'
    },
    inputText: {
        width: '90%',
        color: globalColor.muted
    },
    inputSelect: {
        width: '80%',
        paddingVertical: 5
    },
    imgInputContainer: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnPrimary: {
        width: '100%',
        backgroundColor: globalColor.primary,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    btnOutlinePrimary: {
        width: '100%',
        borderWidth: 2,
        borderColor: globalColor.primary,
        backgroundColor: globalColor.white,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    btnText: {
        color: globalColor.white,
        textTransform: 'uppercase',
        fontSize: 16
    },
    header: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        top: 0,
        paddingVertical: 10,
    },
    modalFormContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        flex: 1
    },
    modalForm: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    modalFormHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    headerTitleContainer: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerBtnContainer: {
        width: '10%'
    },
    closeBtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: globalColor.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalOptBtn: {
        justifyContent: 'center',
        paddingVertical: 10,
    },
    closeImg: {
        width: 13,
        height: 13,
    },
    pageTitle: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: globalColor.primary,
        letterSpacing: 2,
    },
    rightBtnTop: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColor.cement,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    leftBtnTop: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    content: {
        width: '100%',
        marginTop: 15,
        marginBottom: 50,
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
    },
    listCol: {
        width: '65%'
    },
    listColImg: {
        width: '33%',
        borderRadius: 10,
    },
    listImg: {
        height: 175,
        width: '100%',
        borderRadius: 15,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listBtnHeaderContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerBtn: {
        marginLeft: 5,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        borderRadius: 100
    },
    listCategoryContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: globalColor.muted,
        borderWidth: 1,
    },
    headerTxt: {
        color: globalColor.muted
    },
    listContent: {
        flex: 1
    },
    listAddressContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 5
    },
    facilityContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        borderRadius: 4,
        borderColor: globalColor.muted,
        marginRight: 5,
        marginBottom: 5,
        borderWidth: 1
    },
    costContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    divider: {
        height: 0.1,
        borderBottomWidth: 1,
        opacity: 0.5,
        borderColor: globalColor.light,
        marginTop: 5,
        marginBottom: 10,
    },
    space: {
        height: 100,
        width: '100%'
    },
    pageTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapModalContainer: {
        alignItems: 'center',
        flex: 1,
    },
    mapModalHeader: {
        padding: 10,
        width: '100%',
        alignItems: 'flex-end',
        position: 'absolute',
        top: 0,
        right: 0
    },
    loadingContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    acceptBtn: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        backgroundColor: globalColor.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    textWhite: {
        color: globalColor.white
    },
    profileImgContainer: {
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImg: {
        borderRadius: 100,
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    imageView: {
        height: height * 0.35,
        width: '100%',
    },
    imgSmBack: {
        width: 10,
        height: 15
    },
    previewContainer: {
        marginTop: -40,
        paddingVertical: 25,
        width: width,
        backgroundColor: globalColor.overlay,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    imgPreview: {
        width: 80,
        height: 55,
        resizeMode: 'contain',
        borderRadius: 10
    },
    catContainerPreview: {
        backgroundColor: globalColor.overlay,
        paddingVertical: 3,
        paddingHorizontal: 8,
        width: '18%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    previewBtnPrimary: {
        backgroundColor: globalColor.primary,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    ownerInfoContainer: {
        marginTop: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ownerImgContainer: {
        marginRight: 10
    },
    ownerIdentityContainer: {
        flex: 1
    },
    previewBtnSecondary: {
        backgroundColor: globalColor.overlay,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    ownerContactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    facilityContainerPreview: {
        backgroundColor: globalColor.overlay,
        paddingVertical: 3,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 5,
        marginVertical: 5
    },
    contentFooter: {
        padding: 15,
        borderTopWidth: 0.5,
        borderTopColor: globalColor.muted,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footerBtn: {
        backgroundColor: globalColor.primary,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5
    },
    imgModalContainer: {
        backgroundColor: globalColor.dark,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeImgModalBtn: {
        margin: 15,
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 15
    },
    showedImg: {
        width: '100%',
        height: 300,
        resizeMode: 'contain'
    },
    searchForm: {
        width: '100%',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchBtn: {
        backgroundColor: globalColor.primary,
        flex: 1,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    searchInput: {
        marginVertical: 0,
        marginTop: 0,
        // width: '85%'
    },
    cardContainer: {
        width: width * 0.6,
        marginHorizontal: 5,
    },
    card: {
        backgroundColor: 'white',
        height: height * 0.41,
    },
    costFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    photoBtn: {
        backgroundColor: globalColor.overlay,
        width: 75,
        height: 77,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
        marginRight: 10
    },
    noteContainer: {
        borderWidth: 1,
        borderColor: globalColor.muted,
        padding: 15,
        marginTop: 10,
        borderRadius: 8,
        backgroundColor: globalColor.overlay,
    },
    circle: {
        width: 30,
        height: 30,
        backgroundColor: globalColor.primary,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    }
})