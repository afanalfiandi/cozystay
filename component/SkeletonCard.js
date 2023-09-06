import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { globalColor } from '../style/globalColor'
import { globalStyle } from '../style/globalStyle'

const SkeletonCard = () => {
    return (
        <View>
            <ContentLoader
                height={175}
                speed={1}
                backgroundColor={globalColor.overlay}
                foregroundColor={'#fff'}
                viewBox="0 0 380 175"
                style={{ marginRight: 10 }}
            >
                <Rect x={(Dimensions.get("screen").width - 35) * 0.90} y="0" rx="4" ry="4" width={(Dimensions.get("screen").width - 35) * 0.88} height="100" />
                <Rect x="0" y="0" rx="4" ry="4" width={(Dimensions.get("screen").width - 35) * 0.88} height="100" />


                <Rect x="0" y="110" rx="4" ry="4" width="100" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.90}  y="110" rx="4" ry="4" width="100" height="15" />

                <Rect x="0" y="135" rx="4" ry="4" width="120" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.90}  y="135" rx="4" ry="4" width="120" height="15" />
            </ContentLoader>
        </View>
    )
}

export default SkeletonCard

const styles = StyleSheet.create({})