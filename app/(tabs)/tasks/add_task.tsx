import TextInput from '@/components/form/TextInput'
import { Timelog } from '@/constants/types'
import { formatTime } from '@/helpers/time-format'
import useDatabase from '@/hooks/useDatabase'
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types'
import React, { useEffect, useState } from 'react'
import { Alert, Button, ScrollView, Text, View } from 'react-native'

interface EditTaskProps {
    route: any
    navigation: NativeStackNavigationHelpers
}

const AddTask = ({ route, navigation }: EditTaskProps) => {
    const { createTask } = useDatabase()

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
            navigation.goBack()
        } catch (error) {
            console.error('Error updating task')
        }
    }

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: 20,
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 20,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
            }}
        >
            <TextInput
                value={taskDesc}
                setValue={handleDescriptionChange}
                placeholder="Enter Task Name"
            />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignContent: 'center',
                }}
            >
                <Button title="Save" onPress={handleSave} />
            </View>
        </View>
    )
}

export default AddTask
