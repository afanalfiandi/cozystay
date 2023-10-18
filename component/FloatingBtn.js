import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import React from 'react'
import { globalStyle } from '../style/globalStyle';
import * as RootNavigation from '../function/navigationRef';

const FloatingBtn = () => {
    return (
        <TouchableOpacity style={globalStyle.floatingBtn} onPress={() => {
            RootNavigation.navigate('Add');
        }}>
            <Image source={require('../assets/icon/plus-blue.png')} />
        </TouchableOpacity>
    )
}

export default FloatingBtn

const styles = StyleSheet.create({})