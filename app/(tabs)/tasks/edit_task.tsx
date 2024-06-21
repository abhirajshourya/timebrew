import { PrimaryButton, RegularButton } from '@/components/Buttons'
import TextInput from '@/components/form/TextInput'
import { Timelog } from '@/constants/types'
import { formatTime } from '@/helpers/time-format'
import useDatabase from '@/hooks/useDatabase'
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types'
import * as DocumentPricker from 'expo-document-picker'
import * as File from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Platform, ScrollView, Text, View } from 'react-native'

interface EditTaskProps {
    route: any
    navigation: NativeStackNavigationHelpers
}

const EditTask = ({ route, navigation }: EditTaskProps) => {
    const { updateTask, deleteTask, getTimelogsForTask, createTimelog, updateTimelog } = useDatabase()

    const [taskDesc, setTaskDesc] = useState(route.params.task.description)
    const [timelogs, setTimelogs] = useState<Timelog[]>([])
    const taskId = route.params.task.id

    useEffect(() => {
        const fetchTimelogs = async () => {
            const timelogs = await getTimelogsForTask(route.params.task.id)
            setTimelogs(timelogs)
        }

        fetchTimelogs()
    }, [timelogs])

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

    const handleExport = async () => {
        try {
            const data = {
                task: route.params.task.description,
                timelogs: timelogs,
            }
            const json = JSON.stringify(data)
            var filePath = ''
            
            if(Platform.OS === 'ios') {
                filePath = File.documentDirectory + `${taskDesc}.json`
            }else if(Platform.OS === 'android'){
                filePath = File.cacheDirectory + `${taskDesc}.json`
            }
            await File.writeAsStringAsync(filePath, json)
            sharingFile(filePath);
        } catch (error) {
            console.error('Error exporting data')
        }
    }

    const sharingFile = async (filePath: string) => {
        try {
          const result = await Sharing.shareAsync(filePath);
          return result;
        } catch (error) {
          console.error('Error sharing file:', error);
          throw error; // Or handle the error differently
        }
    }

    const handleImport = async () => {
        try {
            const file = await DocumentPricker.getDocumentAsync();
            if (file.canceled === false) {
                const uri = file.assets[0].uri;
                const data = await File.readAsStringAsync(uri);
                const { task, timelogs:  timelogsData} = JSON.parse(data);
                setTaskDesc(task);

                if(taskId == timelogsData[0].task_id){
                    for (let i = 0; i < timelogsData.length; i++) {
                        const timelog = timelogs.filter((timelog) => timelog.id === timelogsData[i].id);
                        if (timelog.length === 0) {
                            timelogs.push(timelogsData[i]);
                            setTimelogs([...timelogs]);
                            await createTimelog(timelogsData[i].start_time, timelogsData[i].end_time, timelogsData[i].task_id, timelogsData[i].duration);
                        }else {
                            const index = timelogs.findIndex((timelog) => timelog.id === timelogsData[i].id);
                            timelogs[index] = timelogsData[i];
                            setTimelogs([...timelogs]);
                            await updateTimelog(timelogs[index]);
                        }
                    }
                }else{
                    Alert.alert(
                        'Error',
                        'The timelogs are not for this task',
                        [
                            {
                                text: 'Ok',
                                style: 'cancel',
                            },
                        ]
                    )
                }

            }
        } catch (error) {
            console.error('Error importing data');
        }

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

            <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginBottom: 20,
                    }}
                >
                    <RegularButton onPress={handleImport}>Import</RegularButton>
                    <PrimaryButton onPress={handleExport}>Export</PrimaryButton>
            </View>
        </ScrollView>
    )
}

export default EditTask
