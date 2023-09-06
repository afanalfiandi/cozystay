import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({page}) => {
  return (
    <View>
      <Text>{page}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})