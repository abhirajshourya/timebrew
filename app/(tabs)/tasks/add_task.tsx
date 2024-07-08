import TextInput from '@/components/form/TextInput'
import { Timelog } from '@/constants/types'
import { formatTime } from '@/helpers/time-format'
import useDatabase from '@/hooks/useDatabase'
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import {
    Text,
    View,
    Button,
    ScrollView,
    Input,
    YStack,
    Label,
    YGroup,
} from 'tamagui'

const AddTask = () => {
    const { createTask } = useDatabase()

    const router = useRouter()

    const [taskDesc, setTaskDesc] = useState('')

    const handleDescriptionChange = (description: string) => {
        setTaskDesc(description)
    }

    const handleSave = async () => {
        if (!taskDesc) {
            Alert.alert('Task Description is required')
            return
        }

        try {
            await createTask(taskDesc)
            router.dismiss()
        } catch (error) {
            console.error('Error updating task')
        }
    }

    return (
        <YStack margin={20} gap={20}>
            <YGroup>
                <Label>Task Name</Label>
                <Input
                    placeholder="Enter Task Name"
                    value={taskDesc}
                    onChangeText={setTaskDesc}
                    placeholderTextColor={'$color'}
                />
            </YGroup>
            <View>
                <Button onPress={handleSave} backgroundColor={'$borderColor'}>
                    <Text>Save</Text>
                </Button>
            </View>
        </YStack>
    )
}

export default AddTask
