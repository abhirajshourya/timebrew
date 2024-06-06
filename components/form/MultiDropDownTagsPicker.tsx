import { Tag } from '@/constants/types'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native'
import TagChip from '../TagChip'

type MultiDropDownTagsPickerProps = TextInputProps & {
    items: Tag[]
    selectedValues: Tag[]
    setValues: (value: Tag[]) => void
    placeholder: string
}

const MultiDropDownPicker = ({
    items,
    selectedValues,
    setValues,
    placeholder,
}: MultiDropDownTagsPickerProps) => {
    const router = useRouter()
    const [textEnabled, setTextEnabled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState('')

    const [localSelectedValues, setLocalSelectedValues] =
        useState<Tag[]>(selectedValues)

        useEffect(() => {
            setValues(localSelectedValues)
        }, [localSelectedValues])

    const inputRef = useRef<TextInput>(null)

    return (
        <View style={{ position: 'relative', marginBottom: 10 }}>
            <Pressable
                style={styles.inputContainer}
                onPressOut={() => setIsOpen((e) => !e)}
            >
                <View
                    ref={inputRef}
                    style={styles.input}
                    // onFocus={() => setIsOpen(true)}
                    // onBlur={() => setIsOpen(false)}
                >
                    <Text style={{ color: 'grey' }}>{placeholder}</Text>
                    {textEnabled && (
                        <TextInput
                            style={{ flex: 1 }}
                            value={text}
                            onChangeText={(text) => setText(text)}
                            placeholder={placeholder}
                            placeholderTextColor={'grey'}
                            editable={textEnabled}
                        />
                    )}
                </View>
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
                        {items.map((item) =>
                            localSelectedValues.find(
                                (tag) => tag.id === item.id
                            ) ? null : (
                                <Pressable
                                    style={[
                                        styles.dropdownItem,
                                        {
                                            backgroundColor:
                                                localSelectedValues.length >= 5
                                                    ? '#a4a4a42a'
                                                    : item.color + '2a',
                                        },
                                    ]}
                                    key={item.id}
                                    onPress={() => {
                                        // setIsOpen(false)
                                        // setText('')
                                        // setTextEnabled(false)
                                        setLocalSelectedValues((tags) => [
                                            ...tags,
                                            item,
                                        ])
                                    }}
                                    disabled={localSelectedValues.length >= 5}
                                >
                                    <Text>{item.name}</Text>
                                </Pressable>
                            )
                        )}
                        {/* <Pressable
                            style={styles.dropdownItem}
                            onPress={() => {
                                // setIsOpen(false)
                                // setTextEnabled(true)
                                // inputRef.current?.focus()
                                router.push({ pathname: 'tags/add' })
                            }}
                        >
                            <Ionicons name="add" size={20} />
                            <Text>Add new</Text>
                        </Pressable> */}
                    </ScrollView>
                )}
            </View>

            {localSelectedValues.length > 0 && (
                <View>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 12,
                            marginBottom: 5,
                        }}
                    >
                        Selected Tags:
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 5,
                        }}
                    >
                        {localSelectedValues.map((tag) => (
                            <Pressable
                                key={tag.id}
                                onPress={() => {
                                    setLocalSelectedValues((tags) =>
                                        tags.filter((t) => t.id !== tag.id)
                                    )
                                }}
                            >
                                <TagChip tag={tag}>
                                    <Ionicons name="close" size={12} />
                                </TagChip>
                            </Pressable>
                        ))}
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#d8d8d8',
        borderRadius: 5,
        minHeight: 40,
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
        // flexDirection:'row',
        // flexWrap:'wrap',
        gap: 5,
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

export default MultiDropDownPicker
