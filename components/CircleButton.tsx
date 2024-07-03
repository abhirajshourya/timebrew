import React, { PropsWithChildren, ReactNode } from 'react'
import { StyleProp, StyleSheet } from 'react-native'
import { Button, Circle } from 'tamagui'

type Props = PropsWithChildren<{
    onPress: () => void
    style: StyleProp<any>
    size?: number
    rest?: any
}>

const CircleButton = ({ children, onPress, style, size, ...rest }: Props) => {
    return (
        <Button backgroundColor={'$accentColor'} onPress={onPress} style={[styles.btn, style]} {...rest}>
            <Circle size={100}>{children}</Circle>
        </Button>
    )
}

export default CircleButton

const styles = StyleSheet.create({
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
