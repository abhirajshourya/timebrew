import React, { ComponentProps } from 'react'
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'

type RegularButtonProps = PressableProps &
    ComponentProps<typeof View> & {
        varient?: 'regular' | 'outline'
        size?: 'small' | 'medium' | 'large'
        disabled?: boolean
    }

const RegularButton = ({
    children,
    varient = 'regular',
    size = 'medium',
    ...rest
}: RegularButtonProps) => {
    return (
        <Pressable
            style={[styles.button, styles.outline, styles[varient], styles[size]]}
            {...rest}
        >
            <Text
                style={[
                    styles.text,
                    styles[`${varient}Text`],
                    styles[`${size}Text`],
                ]}
            >
                {children}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    },
    regular: {
        // backgroundColor: '#016bb2',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#016bb2',
    },
    small: {
        padding: 5,
    },
    medium: {
        padding: 10,
    },
    large: {
        padding: 15,
    },
    regularText: {
        color: '#016bb2',
    },
    outlineText: {
        color: '#005085',
    },
    smallText: {
        fontSize: 12,
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 16,
    },
})

export default RegularButton