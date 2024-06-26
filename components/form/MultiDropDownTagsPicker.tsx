import { Tag } from '@/constants/types'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    TextInputProps,
} from 'react-native'
import TagChip from '../TagChip'
import { Adapt, Select, Sheet, Text, View } from 'tamagui'

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
    const [val, setVal] = useState('')

    const [localSelectedValues, setLocalSelectedValues] =
        useState<Tag[]>(selectedValues)

    useEffect(() => {
        setValues(localSelectedValues)
    }, [localSelectedValues])

    const inputRef = useRef<TextInput>(null)

    return (
        <View style={{ position: 'relative', marginBottom: 10 }}>
            {/* <Pressable
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
                                    style={[styles.dropdownItem]}
                                    key={item.id}
                                    onPress={() => {
                                        setLocalSelectedValues((tags) => [
                                            ...tags,
                                            item,
                                        ])
                                    }}
                                    disabled={localSelectedValues.length >= 5}
                                >
                                    <TagChip
                                        tag={{
                                            ...item,
                                            color:
                                                localSelectedValues.length >= 5
                                                    ? '#a4a4a4'
                                                    : item.color,
                                        }}
                                    />
                                </Pressable>
                            )
                        )}
                        <Pressable
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
                        </Pressable>
                    </ScrollView>
                )}
            </View> */}

            <Select
                value={val}
                onValueChange={(val) => {
                    setVal(val)
                    let tag = items.find((item) => item.name === val)
                    if (tag) {
                        if (localSelectedValues.find((t) => t.id === tag.id)) {
                            setLocalSelectedValues((tags) =>
                                tags.filter((t) => t.id !== tag.id)
                            )
                        } else {
                            setLocalSelectedValues((tags) => [...tags, tag])
                        }
                    }
                }}
                disablePreventBodyScroll
            >
                <Select.Trigger
                    iconAfter={<Ionicons name="caret-down" size={24} />}
                >
                    <Select.Value placeholder={placeholder}>
                        {/* {localSelectedValues.length > 0
                            ? localSelectedValues
                                  .map((tag) => tag.name)
                                  .join(', ')
                            : placeholder} */}
                        {placeholder}
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
                            <Select.Label backgroundColor={'$accentBackground'}>{placeholder}</Select.Label>
                            {items.map((item, i) => (
                                <Select.Item
                                    index={i}
                                    key={item.id}
                                    value={item.name}
                                >
                                    {item.name}
                                    {localSelectedValues.find(
                                        (tag) => tag.name === item.name
                                    ) ? (
                                        <Ionicons
                                            name="checkmark"
                                            size={20}
                                            color="green"
                                        />
                                    ) : null}
                                </Select.Item>
                            ))}
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                </Select.Content>
            </Select>

            {localSelectedValues.length > 0 && (
                <View
                    style={{
                        paddingTop: 10,
                    }}
                >
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
