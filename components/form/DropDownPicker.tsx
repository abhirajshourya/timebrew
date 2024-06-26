import { Ionicons } from '@expo/vector-icons'
import React, { useMemo, useRef, useState } from 'react'
import {
    Pressable,
    ScrollView,
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    ViewStyle,
} from 'react-native'
import { Adapt, Select, Sheet, YStack, Text, View } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

type DropDownPickerProps = TextInputProps & {
    items: string[]
    selectedValue: string
    setValue: (value: string) => void
    placeholder: string
    style?: StyleProp<ViewStyle>
}

const DropDownPicker = ({
    items,
    selectedValue,
    setValue,
    placeholder,
    style,
}: DropDownPickerProps) => {
    const [textEnabled, setTextEnabled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState('')

    const [tmpState, setTmpState] = useState<string>('Apple')

    const inputRef = useRef<TextInput>(null)

    return (
        <View style={[{ position: 'relative' }, style]}>
            {/* <Pressable
                style={styles.inputContainer}
                onPressOut={() => setIsOpen((e) => !e)}
            >
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={
                        textEnabled
                            ? text
                            : items.find((item) => item === selectedValue) || ''
                    }
                    onChangeText={(text) => {
                        setText(text)
                        setValue(text)
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={'grey'}
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
            </View> */}

            <Select
                value={selectedValue}
                onValueChange={setValue}
                disablePreventBodyScroll
            >
                <Select.Trigger
                    iconAfter={<Ionicons name="caret-down" size={24} />}
                >
                    <Select.Value placeholder={placeholder}>
                        {selectedValue}
                    </Select.Value>
                </Select.Trigger>

                <Adapt when={'sm'} platform="touch">
                    <Sheet
                        native={true}
                        modal
                        dismissOnSnapToBottom
                        animationConfig={{
                            type: 'spring',
                            damping: 20,
                            mass: 0.5,
                            stiffness: 100,
                        }}
                    >
                        <Sheet.Frame>
                            <Sheet.ScrollView>
                                <Adapt.Contents />
                            </Sheet.ScrollView>
                        </Sheet.Frame>
                        <Sheet.Overlay
                            animation={'lazy'}
                            enterStyle={{ opacity: 0 }}
                            exitStyle={{ opacity: 0 }}
                        />
                    </Sheet>
                </Adapt>

                <Select.Content zIndex={200000}>
                    <Select.ScrollUpButton />
                    <Select.Viewport animation={'quick'}>
                        <Select.Group>
                            <Select.Label backgroundColor={'$accentBackground'}>
                                {placeholder}
                            </Select.Label>
                            {useMemo(
                                () =>
                                    items.map((item, i) => (
                                        <Select.Item
                                            index={i}
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </Select.Item>
                                    )),
                                [items]
                            )}
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                </Select.Content>
            </Select>
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
