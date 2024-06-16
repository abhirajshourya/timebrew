import React from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'

const Index = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.heading}>Insights</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
})

export default Index
