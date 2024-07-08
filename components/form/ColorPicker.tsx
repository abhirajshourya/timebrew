import React, { useState } from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { TabBarIcon } from '../navigation/TabBarIcon'
import { Circle, View } from 'tamagui'
import { Check } from '@tamagui/lucide-icons'

const ColorPicker = ({
    selectedColor,
    setSelectedColor,
}: {
    selectedColor: string
    setSelectedColor: Function
}) => {
    const colors = [
        '#FF0000',
        '#FFA500',
        '#FFFF00',
        '#008000',
        '#0000FF',
        '#4B0082',
        '#EE82EE',
        '#000000',
        '#808080',
    ]

    return (
        <View style={styles.container}>
            <View style={styles.colorContainer}>
                {colors.map((color) => (
                    <Circle
                        key={color}
                        style={[
                            styles.color,
                            { backgroundColor: color + '80' },
                        ]}
                        onPress={() => setSelectedColor(color)}
                        borderColor={'$color8'}
                    >
                        {selectedColor === color && <Check size={20} />}
                    </Circle>
                ))}
            </View>
        </View>
    )
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
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 1,
    },
    transparentPicker: {
        borderWidth: 1,
    },
})

export default ColorPicker
