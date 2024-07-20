import { PrimaryButton, RegularButton } from '@/components/Buttons'
import TextInput from '@/components/form/TextInput'
import i18n from '@/constants/translations'
import { Task, Timelog } from '@/constants/types'
import { formatTime } from '@/helpers/time-format'
import useDatabase from '@/hooks/useDatabase'
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types'
import { X } from '@tamagui/lucide-icons'
import * as DocumentPricker from 'expo-document-picker'
import * as File from 'expo-file-system'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Sharing from 'expo-sharing'
import React, { useEffect, useState } from 'react'
import { Alert, Platform } from 'react-native'
import {
    Text,
    View,
    ScrollView,
    Button,
    Input,
    YStack,
    Label,
    YGroup,
    H2,
    H3,
    XStack,
    Separator,
    Group,
    XGroup,
} from 'tamagui'

const EditTask = () => {
    const {
        updateTask,
        deleteTask,
        getTimelogsForTask,
        createTimelog,
        updateTimelog,
    } = useDatabase()
    const router = useRouter()
    const params = useLocalSearchParams() as unknown as Task
    const [taskDesc, setTaskDesc] = useState(params.description)
    const [timelogs, setTimelogs] = useState<Timelog[]>([])
    const taskId = params.id

    useEffect(() => {
        const fetchTimelogs = async () => {
            const timelogs = await getTimelogsForTask(params.id)
            setTimelogs(timelogs)
        }

        fetchTimelogs()
    }, [timelogs])

    const handleDescriptionChange = (description: string) => {
        setTaskDesc(description)
    }

    const handleSave = async () => {
        try {
            await updateTask({ id: params.id, description: taskDesc })
            router.dismiss()
        } catch (error) {
        }
    }

    const handleDelete = async () => {
        Alert.alert(
            i18n.t('task_screen.add.delete_alert_title'),
            i18n.t('task_screen.add.delete_alert_msg'),
            [
                {
                    text: i18n.t('task_screen.add.cancel'),
                    style: 'cancel',
                },
                {
                    text: i18n.t('task_screen.add.delete'),
                    onPress: async () => {
                        try {
                            await deleteTask(params.id)
                            router.dismiss()
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
                task: taskDesc,
                timelogs: timelogs,
            }
            const json = JSON.stringify(data)
            var filePath = ''

            if (Platform.OS === 'ios') {
                filePath = File.documentDirectory + `${taskDesc}.json`
            } else if (Platform.OS === 'android') {
                filePath = File.cacheDirectory + `${taskDesc}.json`
            }
            await File.writeAsStringAsync(filePath, json)
            sharingFile(filePath)
        } catch (error) {
            console.error('Error exporting data')
        }
    }

    const sharingFile = async (filePath: string) => {
        try {
            const result = await Sharing.shareAsync(filePath)
            return result
        } catch (error) {
            console.error('Error sharing file:', error)
            throw error // Or handle the error differently
        }
    }

    const handleImport = async () => {
        try {
            const file = await DocumentPricker.getDocumentAsync()
            if (file.canceled === false) {
                const uri = file.assets[0].uri
                const data = await File.readAsStringAsync(uri)
                const { task, timelogs: timelogsData } = JSON.parse(data)
                setTaskDesc(task)

                if (taskId == timelogsData[0].task_id) {
                    for (let i = 0; i < timelogsData.length; i++) {
                        const timelog = timelogs.filter(
                            (timelog) => timelog.id === timelogsData[i].id
                        )
                        if (timelog.length === 0) {
                            timelogs.push(timelogsData[i])
                            setTimelogs([...timelogs])
                            await createTimelog(
                                timelogsData[i].start_time,
                                timelogsData[i].end_time,
                                timelogsData[i].task_id,
                                timelogsData[i].duration
                            )
                        } else {
                            const index = timelogs.findIndex(
                                (timelog) => timelog.id === timelogsData[i].id
                            )
                            timelogs[index] = timelogsData[i]
                            setTimelogs([...timelogs])
                            await updateTimelog(timelogs[index])
                        }
                    }
                }else{
                    Alert.alert(
                        i18n.t('task_screen.edit.error'),
                        i18n.t('task_screen.edit.error_msg'),
                        [
                            {
                                text: i18n.t('task_screen.edit.ok'),
                                style: 'cancel',
                            },
                        ]
                    )
                }
            }
        } catch (error) {
            console.error('Error importing data')
        }
    }

    return (
        <ScrollView
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '90%',
            }}
            gap={10}
        >
            <YStack gap={20} margin={20}>
                <YGroup>
                    {/* TODO: i18n */}
                    <Label>Task Name</Label>
                    <Input
                        placeholder={i18n.t('task_screen.add.name_placeholder')}
                        value={taskDesc}
                        onChangeText={setTaskDesc}
                        placeholderTextColor={'$color'}
                    />
                </YGroup>
                <YStack gap={10}>
                    <Button
                        onPress={handleSave}
                        backgroundColor={'$borderColor'}
                    >
                        <Text>{i18n.t('task_screen.edit.save')}</Text>
                    </Button>
                    <Button onPress={handleDelete} variant="outlined">
                        <Text color={'red'}>{i18n.t('task_screen.edit.delete')}</Text>
                    </Button>
                </YStack>
            </YStack>

            <YStack gap={20} margin={20}>
                <H3>
                { i18n.t('task_screen.edit.total_time') }{' '}
                    {formatTime(
                        timelogs.reduce(
                            (acc, timelog) => acc + timelog.duration,
                            0
                        )
                    )}
                </H3>
                <YGroup>
                    {timelogs &&
                        timelogs.map((timelog) => (
                            <View key={timelog.id}>
                                <YGroup.Item>
                                    <XStack
                                        justifyContent="space-between"
                                        padding={20}
                                        backgroundColor={'$background'}
                                        borderRadius={5}
                                    >
                                        <Text fontSize={16}>
                                            {formatTime(timelog.duration)}
                                        </Text>
                                        <Text>
                                            {new Date(
                                                timelog.start_time
                                            ).toDateString()}
                                        </Text>
                                    </XStack>
                                </YGroup.Item>
                                <Separator />
                            </View>
                        ))}
                </YGroup>
            </YStack>

            <XStack gap={20} margin={20} alignSelf="center">
                <XGroup justifyContent="space-between">
                    <XGroup.Item>
                        <Button
                            onPress={handleImport}
                            borderEndWidth={0}
                            borderColor={'$borderColor'}
                            backgroundColor={'$background0'}
                        >
                            <Text>{i18n.t('task_screen.edit.import')}</Text>
                        </Button>
                    </XGroup.Item>
                    {/* <Separator vertical /> */}
                    <XGroup.Item>
                        <Button
                            onPress={handleExport}
                            // borderStartWidth={0}
                            borderColor={'$borderColor'}
                            backgroundColor={'$background0'}
                            
                        >
                            <Text>{i18n.t('task_screen.edit.export')}</Text>
                        </Button>
                    </XGroup.Item>
                </XGroup>

                {/* <RegularButton onPress={handleImport}>Import</RegularButton>
                <PrimaryButton onPress={handleExport}>Export</PrimaryButton> */}
            </XStack>
        </ScrollView>
    )
}

export default EditTask
