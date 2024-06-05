import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native'

type DropDownPickerProps = TextInputProps & {
    items: string[]
    selectedValue: string
    setValue: (value: string) => void
    placeholder: string
}

const DropDownPicker = ({
    items,
    selectedValue,
    setValue,
    placeholder,
}: DropDownPickerProps) => {
    const [textEnabled, setTextEnabled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState('')

    const inputRef = useRef<TextInput>(null)

    return (
        <View style={{ position: 'relative', marginBottom: 10 }}>
            <Pressable
                style={styles.inputContainer}
                onPressOut={() => setIsOpen((e) => !e)}
            >
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={
                        textEnabled
                            ? text
                            : items.find((item) => item === selectedValue) ||
                              ''
                    }
                    onChangeText={(text) => {
                        setText(text)
                        setValue(text)
                    }}
                    placeholder={placeholder}
                    // onFocus={() => setIsOpen(true)}
                    // onBlur={() => setIsOpen(false)}
                    onPressOut={() => setIsOpen((e) => !e)}
                    editable={textEnabled}
                />
                {isOpen ? (
                    <Ionicons name="caret-up" size={24} style={styles.caret} />
                ) : (
                    <Ionicons
                        name="caret-down"
                        size={24}
                        style={styles.caret}
                    />
                )}
            </Pressable>
            <View>
                {isOpen && (
                    <ScrollView style={styles.dropdownContainer}>
                        {items.map((item) => (
                            <Pressable
                                style={styles.dropdownItem}
                                key={item}
                                onPress={() => {
                                    setValue(item)
                                    setIsOpen(false)
                                    setText('')
                                    setTextEnabled(false)
                                }}
                            >
                                <Text>{item}</Text>
                            </Pressable>
                        ))}
                        <Pressable
                            style={styles.dropdownItem}
                            onPress={() => {
                                setIsOpen(false)
                                setTextEnabled(true)
                                inputRef.current?.focus()
                            }}
                        >
                            <Ionicons name="add" size={20} />
                            <Text>Add new</Text>
                        </Pressable>
                    </ScrollView>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#d8d8d8',
        borderRadius: 5,
        // marginBottom: 10,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 10,
    },
    dropdownContainer: {
        position: 'static',
        maxHeight: 150,
        borderWidth: 1,
        borderColor: '#d8d8d8',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8',
        flexDirection: 'row',
        alignItems: 'center',
    },
    caret: {
        position: 'absolute',
        right: 10,
        top: 10,
        color: 'grey',
    },
})

export default DropDownPicker
