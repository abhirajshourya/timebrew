import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Settings</Text>

            <View style={styles.section}>
                <Text style={styles.sectionHeading}>General</Text>


                <Text>Theme</Text>
            </View>
        </View>
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
    section: {
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})

export default Settings
