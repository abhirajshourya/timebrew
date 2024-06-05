import React, { ComponentProps } from 'react'
import { StyleSheet, View, Text, Pressable, PressableProps } from 'react-native'

type DangerButtonProps = PressableProps &
    ComponentProps<typeof View> & {
        varient?: 'regular' | 'outline'
        size?: 'small' | 'medium' | 'large'
        disabled?: boolean
    }

const DangerButton = ({
    children,
    varient = 'regular',
    size = 'medium',
    ...rest
}: DangerButtonProps) => {
    return (
        <Pressable
            style={[styles.button, styles[varient], styles[size]]}
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
        backgroundColor: '#d9544f',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'red',
    },
    regular: {
        backgroundColor: '#d9544f45',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#d9544f',
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
        color: '#d9544f',
    },
    outlineText: {
        color: '#d9544f',
    },
    smallText: {
        fontSize: 12,
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 20,
    },
})

export default DangerButton
