import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { TabBarIcon } from '../navigation/TabBarIcon';

const ColorPicker = ({ selectedColor, setSelectedColor }: { selectedColor: string, setSelectedColor: Function }) => {

    const colors = [
        'rgba(255, 0, 0, 0.25)',
        'rgba(0, 0, 255, 0.25)',
        'rgba(255, 0, 255, 0.25)',
        'rgba(0, 255, 0, 0.25)',
        'rgba(255, 255, 0, 0.25)',
        'rgba(0, 255, 255, 0.25)',
    ];

    return (
        <View style={styles.container}>
            <View style={styles.colorContainer}>
                {colors.map((color) => (
                    <Pressable
                        key={color}
                        style={[styles.color, { backgroundColor: color }, { borderColor: color }]}
                        onPress={() => setSelectedColor(color)}
                    >
                        {selectedColor === color && <TabBarIcon name="checkmark" color="black" />}
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

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
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 1,
    },
    transparentPicker: {
        borderWidth: 1,
    },
});

export default ColorPicker;
