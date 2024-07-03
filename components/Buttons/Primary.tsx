import React, { ComponentProps } from 'react'
import { StyleSheet, View, Pressable, PressableProps } from 'react-native'
import { Button, ButtonProps, Text } from 'tamagui'

type PrimaryButtonProps = ButtonProps &
    ComponentProps<typeof View> & {
        varient?: 'regular' | 'outline'
        disabled?: boolean
    }

const PrimaryButton = ({
    children,
    varient = 'regular',
    ...rest
}: PrimaryButtonProps) => {
    return (
        // <Pressable
        //     style={[styles.button, styles[varient], styles[size]]}
        //     {...rest}
        // >
        //     <Text
        //         style={[
        //             styles.text,
        //             styles[`${varient}Text`],
        //             styles[`${size}Text`],
        //         ]}
        //     >
        //         {children}
        //     </Text>
        // </Pressable>
        <Button
            backgroundColor={'$accentColor'}
            color={'$background'}
            // variant='outlined'
            {...rest}
        >
            {children}
        </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#016bb2',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    },
    regular: {
        backgroundColor: '#016bb2',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#005085',
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
        color: 'white',
    },
    outlineText: {
        color: '#005085',
    },
    smallText: {
        fontSize: 12,
    },
    mediumText: {
        fontSize: 14,
    },
    largeText: {
        fontSize: 16,
    },
})

export default PrimaryButton
