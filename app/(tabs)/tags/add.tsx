import ColorPicker from '@/components/form/ColorPicker';
import TextInput from '@/components/form/TextInput';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Add = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create New Tag</Text>

            <View style={styles.form}>
                <TextInput placeholder="Tag Name" onFocus={() => console.log("focus")} onBlur={() => console.log("blur")} />
                {/* <TextInput placeholder="Tag Description" /> */}
                <ColorPicker />
            </View>

        </View>
    );
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
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
})

export default Add;
