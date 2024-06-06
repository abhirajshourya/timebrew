import React, { useState } from 'react'
import { StyleSheet, View, TextInput as TI, TextInputProps } from 'react-native'

type myTextInputProps = {
    value: string
    setValue: Function
} & TextInputProps & {
        /**
         * Style to be applied on focus and blur events
         */
        styleOnEvents?: {
            /**
             * Style to be applied on focus event
             */
            focus?: object
            /**
             * Style to be applied on blur event
             */
            blur?: object
        }
    }

const TextInput = ({
    value,
    setValue,
    styleOnEvents,
    onFocus,
    onBlur,
    ...rest
}: myTextInputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    const onFocusHandler = () => {
        setIsFocused(true)
        onFocus && onFocus()
    }

    const onBlurHandler = () => {
        setIsFocused(false)
        onBlur && onBlur()
    }

    return (
        <TI
            {...rest}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            value={value}
            onChangeText={(text) => setValue(text)}
            style={[
                styles.input,
                isFocused && styles.inputOnFocus,
                isFocused && styleOnEvents?.focus,
                !isFocused && styleOnEvents?.blur,
            ]}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        // marginBottom: 20,
        backgroundColor: '#fff',
    },
    inputOnFocus: {
        borderColor: '#005085',
    },
})

export default TextInput
