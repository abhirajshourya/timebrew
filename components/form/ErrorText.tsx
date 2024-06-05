import React, { ComponentProps } from 'react'
import { StyleSheet, View, Text } from 'react-native'

type ErrorTextProps = ComponentProps <typeof Text> & {
    error: string | undefined
}

const ErrorText = ({ error, ...rest }: ErrorTextProps) => {
    return (
        <View style={[styles.error, rest.style]} {...rest}>
            <Text style={styles.errorText}>
                {error || ' '}
                </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    error: {
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
    },
})

export default ErrorText
