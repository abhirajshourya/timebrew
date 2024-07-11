import FAB from '@/components/FAB'
import ColorPicker from '@/components/form/ColorPicker'
import TextInput from '@/components/form/TextInput'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import useDatabase from '@/hooks/useDatabase'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Pressable, Alert } from 'react-native'
import { Tag } from '@/constants/types'
import ErrorText from '@/components/form/ErrorText'
import { cleanText } from '@/helpers/text-helpers'
import { DangerButton, PrimaryButton } from '@/components/Buttons'
import { Button, Input, Label, Text, View, YGroup, YStack } from 'tamagui'

const Add = () => {
    const router = useRouter()
    const navigation = useNavigation()
    const params = useLocalSearchParams() as unknown as Tag
    const { createTag, updateTag, deleteTag } = useDatabase()
    const [name, setName] = useState('' as string)
    const [selectedColor, setSelectedColor] = useState('' as string)
    const [errors, setErrors] = useState({} as Record<string, string>)

    useEffect(() => {
        if (params.id) {
            navigation.setOptions({ title: 'Edit Tag' })

            setName(params.name)
            setSelectedColor(params.color)
        }
    }, [])

    const handleSubmit = () => {
        if (checkErrors()) {
            // console.error('Errors found', errors)
            if (errors.name && errors.color) {
                Alert.alert('Error', 'Name and Color are required')
            } else if (errors.name) {
                Alert.alert('Error', 'Name is required')
            } else if (errors.color) {
                Alert.alert('Error', 'Color is required')
            }

            return
        }

        if (params.id) {
            updateTag({
                id: params.id,
                name: cleanText(name),
                color: selectedColor,
            }).catch((e) => {
                console.log('Failed to update tag', e)
            })

            router.dismiss()
            return
        } else {
            createTag(cleanText(name), selectedColor).catch((e) => {
                console.log('Failed to create tag', e)
            })

            router.dismiss()
            return
        }
    }

    const handleDelete = () => {
        Alert.alert('Delete Tag', 'Are you sure you want to delete this tag?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => {
                    deleteTag(params.id).catch((e) => {
                        console.log('Failed to delete tag', e)
                    })

                    router.dismiss()
                },
                style: 'destructive',
            },
        ])
    }

    const checkErrors = () => {
        setErrors({})
        let returnVal = false

        if (!(name && cleanText(name))) {
            setErrors((errors) => ({
                ...errors,
                name: 'Name is required',
            }))
            returnVal = true
        }

        if (!selectedColor) {
            setErrors((errors) => ({
                ...errors,
                color: 'Color is required',
            }))
            returnVal = true
        }

        return returnVal
    }

    useEffect(() => {
        checkErrors()
    }, [name, selectedColor])

    return (
        <YStack margin={20} gap={20}>
            {/* <Text style={styles.heading}>
                    {params.id ? 'Edit Tag' : 'Create New Tag'}
                </Text> */}

            <YGroup>
                <Label>Tag Name</Label>
                <Input
                    value={name}
                    onChangeText={setName}
                    placeholder="E.g. work, personal, study, etc."
                    placeholderTextColor={'$color'}
                />
                {/* <TextInput
                        value={name}
                        setValue={(text: string) => setName(text.toLowerCase())}
                        placeholder="E.g. work, personal, study, etc."
                        // onFocus={() => console.log('focus')}
                        // onBlur={() => console.log('blur')}
                    /> */}
                {/* <ErrorText error={errors.name} /> */}
                {/* <TextInput placeholder="Tag Description" /> */}
            </YGroup>

            <YGroup>
                <Label>Tag Color</Label>

                <ColorPicker
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
                {/* <ErrorText error={errors.color} /> */}
            </YGroup>

            <YStack gap={10}>
                <Button onPress={handleSubmit} backgroundColor={'$borderColor'}>
                    <Text>Save</Text>
                </Button>
                {params.id && (
                    <Button onPress={handleDelete} variant="outlined">
                        <Text color={'red'}>Delete</Text>
                    </Button>
                )}
            </YStack>

            {/* {params.id && (
                <View style={styles.formActions}>
                    <DangerButton onPress={handleDelete}>
                        Delete Tag
                    </DangerButton>
                </View>
            )} */}
        </YStack>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    formActions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    deleteButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#f8d7da',
        padding: 10,
        borderRadius: 5,
    },
    deleteText: {
        color: 'red',
        fontSize: 16,
    },
})

export default Add
