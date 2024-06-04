import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { TabBarIcon } from '../navigation/TabBarIcon';

const ColorPicker = () => {

    const [selectedColor, setSelectedColor] = useState('' as string);

    const colors = [
        'red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'white'
    ];

    return (
        <View style={styles.container}>

            <View style={styles.colorContainer}>
                {colors.map(color => 
                    <Pressable key={color} style={[styles.color, {backgroundColor: color}]} onPress={() => setSelectedColor(color)}>
                        {selectedColor === color && <TabBarIcon name="checkmark" color="black" />}
                    </Pressable>
                )}

                <Pressable style={[styles.color, styles.transparentPicker]} onPress={() => setSelectedColor('')}>
                    <TabBarIcon name="color-palette" color="black" />
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    colorContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    color: {
        width: 50,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
    },
    transparentPicker: {
        borderWidth: 1,
    }
})

export default ColorPicker;
