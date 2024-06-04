import FAB from '@/components/FAB';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';

const Tags = () => {
    const router = useRouter();

    const handleFABPress = () => {
        router.push('tags/add');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={styles.heading}>Tags</Text>

                <View>
                    <Text>Tags go here</Text>
                </View>


            </ScrollView>
            <FAB onPress={handleFABPress} />
        </SafeAreaView>
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
})

export default Tags;
