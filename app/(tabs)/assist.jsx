import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const Assist = () => {
  return (
    <SafeAreaView> style={styles.safe}
        <Text>Assist Screen</Text>
    </SafeAreaView>
  )
}

export default Assist

const styles = StyleSheet.create({})