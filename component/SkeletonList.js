import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { globalColor } from '../style/globalColor'
import { globalStyle } from '../style/globalStyle'

const SkeletonList = () => {
    return (
        <View>
            <ContentLoader
                height={175}
                speed={1}
                backgroundColor={globalColor.overlay}
                foregroundColor={'#fff'}
                viewBox="0 0 380 175"
            >
                <Rect x="0" y="0" rx="4" ry="4" width={(Dimensions.get("screen").width - 35) * 0.35} height="175" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="0" rx="4" ry="4" width="50" height="15" />
                <Circle cx={368} cy="15" r="12" />
                <Circle cx={340} cy="15" r="12" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="25" rx="4" ry="4" width="120" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="50" rx="4" ry="4" width="150" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="75" rx="4" ry="4" width="50" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.80} y="160" rx="4" ry="4" width="100" height="15" />
            </ContentLoader>
            <ContentLoader
                height={175}
                speed={1}
                backgroundColor={globalColor.overlay}
                foregroundColor={'#fff'}
                viewBox="0 0 380 175"
            >
                <Rect x="0" y="0" rx="4" ry="4" width={(Dimensions.get("screen").width - 35) * 0.35} height="175" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="0" rx="4" ry="4" width="50" height="15" />
                <Circle cx={368} cy="15" r="12" />
                <Circle cx={340} cy="15" r="12" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="25" rx="4" ry="4" width="120" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="50" rx="4" ry="4" width="150" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="75" rx="4" ry="4" width="50" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.80} y="160" rx="4" ry="4" width="100" height="15" />
            </ContentLoader>
            <ContentLoader
                height={175}
                speed={1}
                backgroundColor={globalColor.overlay}
                foregroundColor={'#fff'}
                viewBox="0 0 380 175"
            >
                <Rect x="0" y="0" rx="4" ry="4" width={(Dimensions.get("screen").width - 35) * 0.35} height="175" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="0" rx="4" ry="4" width="50" height="15" />
                <Circle cx={368} cy="15" r="12" />
                <Circle cx={340} cy="15" r="12" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="25" rx="4" ry="4" width="120" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="50" rx="4" ry="4" width="150" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="75" rx="4" ry="4" width="50" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.80} y="160" rx="4" ry="4" width="100" height="15" />
            </ContentLoader>
            <ContentLoader
                height={175}
                speed={1}
                backgroundColor={globalColor.overlay}
                foregroundColor={'#fff'}
                viewBox="0 0 380 175"
            >
                <Rect x="0" y="0" rx="4" ry="4" width={(Dimensions.get("screen").width - 35) * 0.35} height="175" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="0" rx="4" ry="4" width="50" height="15" />
                <Circle cx={368} cy="15" r="12" />
                <Circle cx={340} cy="15" r="12" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="25" rx="4" ry="4" width="120" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="50" rx="4" ry="4" width="150" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="75" rx="4" ry="4" width="50" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.80} y="160" rx="4" ry="4" width="100" height="15" />
            </ContentLoader>
            <ContentLoader
                height={175}
                speed={1}
                backgroundColor={globalColor.overlay}
                foregroundColor={'#fff'}
                viewBox="0 0 380 175"
            >
                <Rect x="0" y="0" rx="4" ry="4" width={(Dimensions.get("screen").width - 35) * 0.35} height="175" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="0" rx="4" ry="4" width="50" height="15" />
                <Circle cx={368} cy="15" r="12" />
                <Circle cx={340} cy="15" r="12" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="25" rx="4" ry="4" width="120" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="50" rx="4" ry="4" width="150" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="75" rx="4" ry="4" width="50" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.80} y="160" rx="4" ry="4" width="100" height="15" />
            </ContentLoader>
            <ContentLoader
                height={175}
                speed={1}
                backgroundColor={globalColor.overlay}
                foregroundColor={'#fff'}
                viewBox="0 0 380 175"
            >
                <Rect x="0" y="0" rx="4" ry="4" width={(Dimensions.get("screen").width - 35) * 0.35} height="175" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="0" rx="4" ry="4" width="50" height="15" />
                <Circle cx={368} cy="15" r="12" />
                <Circle cx={340} cy="15" r="12" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="25" rx="4" ry="4" width="120" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="50" rx="4" ry="4" width="150" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.40} y="75" rx="4" ry="4" width="50" height="15" />
                <Rect x={(Dimensions.get("screen").width - 35) * 0.80} y="160" rx="4" ry="4" width="100" height="15" />
            </ContentLoader>
        </View>
    )
}

export default SkeletonList

const styles = StyleSheet.create({})