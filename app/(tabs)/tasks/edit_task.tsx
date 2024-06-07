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

const EditTask = ({ route, navigation }: EditTaskProps) => {
    const { updateTask, deleteTask, getTimelogsForTask } = useDatabase()

    const [taskDesc, setTaskDesc] = useState(route.params.task.description)
    const [timelogs, setTimelogs] = useState<Timelog[]>([])

    useEffect(() => {
        const fetchTimelogs = async () => {
            const timelogs = await getTimelogsForTask(route.params.task.id)
            setTimelogs(timelogs)
        }

        fetchTimelogs()
    }, [])

    const handleDescriptionChange = (description: string) => {
        setTaskDesc(description)
    }

    const handleSave = async () => {
        try {
            await updateTask({ ...route.params.task, description: taskDesc })
            navigation.goBack()
        } catch (error) {
            console.error('Error updating task')
        }
    }

    const handleDelete = async () => {
        Alert.alert(
            'Delete Task',
            'This will delete associated Timelogs, are you sure you want to delete this task?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteTask(route.params.task.id)
                            navigation.goBack()
                        } catch (error) {
                            console.error('Error deleting task')
                        }
                    },
                    style: 'destructive',
                },
            ]
        )
    }

    return (
        <ScrollView
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '90%',
            }}
        >
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
                    <Button
                        title="Delete"
                        onPress={handleDelete}
                        color={'red'}
                    />
                    <Button title="Save" onPress={handleSave} />
                </View>
            </View>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        marginBottom: 10,
                    }}
                >
                    Total Time Spent:{' '}
                    {formatTime(
                        timelogs.reduce(
                            (acc, timelog) => acc + timelog.duration,
                            0
                        )
                    )}
                </Text>
                {timelogs &&
                    timelogs.map((timelog) => (
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                marginBottom: 10,
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
                            key={timelog.id}
                        >
                            <Text>{formatTime(timelog.duration)}</Text>
                            <Text>
                                {new Date(timelog.start_time).toDateString()}
                            </Text>
                        </View>
                    ))}
            </View>
        </ScrollView>
    )
}

export default EditTask
