import FAB from '@/components/FAB';
import ColorPicker from '@/components/form/ColorPicker';
import TextInput from '@/components/form/TextInput';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import useDatabase from '@/hooks/useDatabase';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Add = () => {
    const router = useRouter();
    const { createTag } = useDatabase();
    const [name, setName] = useState('' as string);
    const [selectedColor, setSelectedColor] = useState('' as string);

    const handleSubmmit = () => {

        if (!name || !selectedColor) {
            console.log("Please fill in all fields");
            return;
        }

        // TODO: add color in createTag
        createTag(name, selectedColor)
            .then(() => {
                console.log("Tag created successfully");
            })
            .catch(() => {
                console.log("Failed to create tag");
            });

        router.dismiss();

    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.heading}>Create New Tag</Text>

                <View style={styles.form}>
                    <TextInput value={name} setValue={setName} placeholder="Tag Name" onFocus={() => console.log("focus")} onBlur={() => console.log("blur")} />
                    {/* <TextInput placeholder="Tag Description" /> */}
                    <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                </View>

            </View>
            <FAB onPress={handleSubmmit}>
                <TabBarIcon name="checkmark" color="white" />
            </FAB>
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
