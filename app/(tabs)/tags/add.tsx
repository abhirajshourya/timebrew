import ColorPicker from '@/components/form/ColorPicker'
import i18n from '@/constants/translations'
import { Tag } from '@/constants/types'
import { cleanText } from '@/helpers/text-helpers'
import useDatabase from '@/hooks/useDatabase'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Button, Input, Label, Text, YGroup, YStack } from 'tamagui'

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
            navigation.setOptions({ title: i18n.t('tag_screen.add.edit_tag') })

            setName(params.name)
            setSelectedColor(params.color)
        }
    }, [])

    const handleSubmit = () => {
        if (checkErrors()) {
            // console.error('Errors found', errors)
            if (errors.name && errors.color) {
                Alert.alert(i18n.t('tag_screen.add.error'), i18n.t('tag_screen.add.requires'))
            } else if (errors.name) {
                Alert.alert(i18n.t('tag_screen.add.error'), i18n.t('tag_screen.add.name_required'))
            } else if (errors.color) {
                Alert.alert(i18n.t('tag_screen.add.error'), i18n.t('tag_screen.add.color_required'))
            }

            return
        }

        if (params.id) {
            updateTag({
                id: params.id,
                name: cleanText(name).toLowerCase(),
                color: selectedColor,
            }).catch((e) => {
            })

            router.dismiss()
            return
        } else {
            createTag(cleanText(name).toLowerCase(), selectedColor).catch((e) => {
            })

            router.dismiss()
            return
        }
    }

    const handleDelete = () => {
        Alert.alert(i18n.t('tag_screen.add.delete_alert'), i18n.t('tag_screen.add.delete_alert_msg'), [
            {
                text: i18n.t('tag_screen.add.cancel'),
                style: 'cancel',
            },
            {
                text: i18n.t('tag_screen.add.delete_btn'),
                onPress: () => {
                    deleteTag(params.id).catch((e) => {
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
                name: i18n.t('tag_screen.add.name_required'),
            }))
            returnVal = true
        }

        if (!selectedColor) {
            setErrors((errors) => ({
                ...errors,
                color: i18n.t('tag_screen.add.color_required'),
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
                    {params.id ? i18n.t('tag_screen.add.edit_tag') : i18n.t('tag_screen.add.create_tag')}
                </Text> */}

            <YGroup>
                <Label>{i18n.t('tag_screen.add.tag_name')}</Label>
                <Input
                    value={name}
                    onChangeText={setName}
                    placeholder={i18n.t('tag_screen.add.place_holder')}
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
                <Label>{i18n.t('tag_screen.add.tag_color')}</Label>

                <ColorPicker
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
                {/* <ErrorText error={errors.color} /> */}
            </YGroup>

            <YStack gap={10}>
                <Button onPress={handleSubmit} backgroundColor={'$borderColor'}>
                    <Text>{i18n.t('tag_screen.add.save_btn')}</Text>
                </Button>
                {params.id && (
                    <Button onPress={handleDelete} variant="outlined">
                        <Text color={'red'}>{i18n.t('tag_screen.add.delete_btn')}</Text>
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
