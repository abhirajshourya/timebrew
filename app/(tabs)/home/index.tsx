import { PrimaryButton } from '@/components/Buttons'
import CircleButton from '@/components/CircleButton'
import TimeLogModal from '@/components/Modals/TimeLogModal'
import TimelogCard from '@/components/TimelogCard'
import WavyRings from '@/components/WavyRings'
import DropDownPicker from '@/components/form/DropDownPicker'
import MultiDropDownPicker from '@/components/form/MultiDropDownTagsPicker'
import { Tag, Task, Timelog } from '@/constants/types'
import { cleanText } from '@/helpers/text-helpers'
import { formatTime } from '@/helpers/time-format'
import useDatabase from '@/hooks/useDatabase'
import useTimeTracker from '@/hooks/useTimeTracker'
import { Ionicons } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    // Text,
    // View,
} from 'react-native'
import {
    Separator,
    Text,
    View,
    H1,
    H2,
    H3,
    XStack,
    YStack,
    ScrollView,
    Button,
    Spacer,
} from 'tamagui'
import Pomodoro from './pomodoro'
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types'
import { useRouter, useSegments } from 'expo-router'
import { TimerReset } from '@tamagui/lucide-icons'

const Tracker = ({}) => {
    const {
        duration,
        start,
        stop,
        pause,
        isRunning,
        advanceTime,
        reset,
        status,
        startTime,
        endTime,
    } = useTimeTracker()
    const {
        getTimeLogs,
        createTimelog,
        getTasks,
        createTask,
        getTags,
        createTimelogTag,
    } = useDatabase()
    const [timelogs, setTimelogs] = useState<Timelog[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTask, setSelectedTask] = useState<string>('')
    const [tags, setTags] = useState<Tag[]>([])
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    const router = useRouter()
    const segments = useSegments()

    useEffect(() => {
        getTimeLogs().then((timelogs) => {
            setTimelogs(timelogs)
        })
    }, [segments])

    function handleOnStop() {
        pause()

        if (!isModalVisible) {
            getTasks().then(setTasks)
            getTags().then(setTags)
            setIsModalVisible(duration > 0)
        }

        if (!duration) {
            Alert.alert('Oops!', 'No time to log')
            return
        }
    }

    const handleSave = () => {
        if (!cleanText(selectedTask)) {
            Alert.alert('Oops!', 'Please select a task')
            return
        }

        let taskId = 0

        if (
            !tasks.find((task) => task.description === cleanText(selectedTask))
        ) {
            createTask(cleanText(selectedTask))
                .then((id) => {
                    taskId = id

                    stop()
                    handleCreateTimelog(startTime, endTime, taskId, duration)
                })
                .catch(() => {
                    Alert.alert('Error', 'Failed to create task')
                })
        } else {
            taskId = tasks.find(
                (task) => task.description === cleanText(selectedTask)
            )?.id as number

            stop()

            handleCreateTimelog(startTime, endTime, taskId, duration)
        }
        // Reset the selected task state after saving
        setSelectedTask('')
        setIsModalVisible(false)
    }

    const handleCreateTimelog = (
        startTime: number,
        endTime: number,
        taskId: number,
        duration: number
    ) => {
        createTimelog(startTime, endTime, taskId, duration)
            .then((id) => {
                getTimeLogs().then(setTimelogs)
                selectedTags.forEach((tag) => {
                    handleCreateTimelogTag(id, tag.id)
                })
                // Reset the selected tag state after saving
                setSelectedTags([])
                Alert.alert('Success', 'Timelog created successfully')
            })
            .catch(() => {
                Alert.alert('Error', 'Failed to create timelog')
            })
    }

    const handleCreateTimelogTag = (timelogId: number, tagId: number) => {
        createTimelogTag(timelogId, tagId).catch(() => {
            Alert.alert('Error', 'Failed to create timelog tag')
        })
    }

    return (
        <SafeAreaView>
            <YStack>
                <XStack
                    paddingTop={20}
                    paddingBottom={10}
                    marginHorizontal={20}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <H2
                        style={{
                            // fontSize: 24,
                            fontWeight: '600',
                            margin: 20,
                            fontStyle: 'italic',
                            color: '#005c99',
                        }}
                    >
                        timebrew
                    </H2>

                    <View>
                        {/* <TouchableOpacity
                        onPress={() => {
                            router.push('home/pomodoro')
                        }}
                        style={{
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 50,
                            backgroundColor: '#fff',
                            borderColor: 'red',
                            shadowColor: '#005c99',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 4.86,
                            elevation: 10,
                        }}
                    >
                        <Ionicons name="timer" size={30} color="#005c99" />
                    </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={() => {
                                router.push({ pathname: 'settings' })
                            }}
                        >
                            <Ionicons
                                name="settings-outline"
                                size={24}
                                color="#005c99"
                            />
                        </TouchableOpacity>
                    </View>
                </XStack>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.mainTrackerContainer}>
                        <WavyRings
                            width={250}
                            rings={3}
                            delay={900}
                            isRunning={isRunning}
                        >
                            <YStack
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                {/* <Spacer /> */}
                                <H1>{formatTime(duration) || '0s'}</H1>
                                {/* <TouchableOpacity
                                    onPress={() => {
                                        router.push('home/pomodoro')
                                    }}
                                    style={{
                                        padding: 5,
                                        paddingHorizontal: 10,
                                        borderRadius: 50,
                                        backgroundColor: '#fff',
                                        borderColor: 'red',
                                        shadowColor: '#005c99',
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 4.86,
                                        elevation: 10,
                                        position: 'relative',
                                    }}
                                >
                                    <Ionicons
                                        name="timer"
                                        size={30}
                                        color="#005c99"
                                    />
                                </TouchableOpacity> */}
                                <Button
                                    scale={0.7}
                                    borderRadius={50}
                                    variant="outlined"
                                    borderColor={'$borderColor'}
                                    onPress={() => router.push('home/pomodoro')}
                                    icon={<TimerReset size={24} />}
                                >
                                    <Text fontSize={'$6'}>Pomodoro</Text>
                                </Button>
                            </YStack>
                        </WavyRings>
                        <View style={styles.controlsContainer}>
                            <View>
                                {(status === 'paused' || isRunning) && (
                                    <CircleButton
                                        onPress={() => reset()}
                                        style={styles.button}
                                    >
                                        <Ionicons
                                            name="refresh"
                                            size={24}
                                            color="white"
                                        />
                                    </CircleButton>
                                )}
                            </View>
                            <View>
                                {isRunning ? (
                                    <CircleButton
                                        onPress={pause}
                                        style={styles.playPauseButton}
                                    >
                                        <Ionicons
                                            name="pause"
                                            size={35}
                                            color="white"
                                        />
                                    </CircleButton>
                                ) : (
                                    <CircleButton
                                        onPress={start}
                                        style={styles.playPauseButton}
                                    >
                                        <Ionicons
                                            name="play"
                                            size={35}
                                            color="white"
                                        />
                                    </CircleButton>
                                )}
                            </View>
                            <View>
                                {(status === 'paused' || isRunning) && (
                                    <CircleButton
                                        onPress={handleOnStop}
                                        style={styles.button}
                                    >
                                        <Ionicons
                                            name="stop"
                                            size={24}
                                            color="white"
                                        />
                                    </CircleButton>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.logsContainer}>
                        <Separator marginVertical={20} />
                        <H2
                            alignSelf="center"
                            // color={'$accentBackground'}
                            marginBottom={20}
                        >
                            Logs
                        </H2>
                        {timelogs &&
                            timelogs.map((timelog) => (
                                <View
                                    key={timelog.id}
                                    style={{ marginBottom: 10 }}
                                >
                                    <TimelogCard timelog={timelog} />
                                </View>
                            ))}
                    </View>
                    {!timelogs.length && (
                        <Text
                            style={{
                                fontSize: 16,
                                color: 'grey',
                                textAlign: 'center',
                            }}
                        >
                            No logs
                        </Text>
                    )}
                </ScrollView>

                <TimeLogModal
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    title="Time log"
                >
                    <View>
                        <Text style={styles.label}>What did you do?</Text>
                        <DropDownPicker
                            items={tasks.map((task) => task.description)}
                            selectedValue={selectedTask}
                            setValue={(value) => setSelectedTask(value)}
                            placeholder="What did you do?"
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Tags</Text>
                        <MultiDropDownPicker
                                items={tags}
                                selectedValues={selectedTags}
                                setValues={(values) => setSelectedTags(values)}
                                placeholder="Add tags"
                            />
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <PrimaryButton onPress={handleSave}>
                            <Text>Save</Text>
                        </PrimaryButton>
                    </View>
                </TimeLogModal>
            </YStack>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    mainTrackerContainer: {
        paddingTop: 110,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    controlsContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    logsContainer: {
        padding: 20,
        height: '100%',
        marginBottom: 200,
    },
    button: {
        // backgroundColor: '#005c99',
        // color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        // width: 'auto',
        borderRadius: 40,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    playPauseButton: {
        // backgroundColor: '#005c99',
        // color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        width: 80,
        height: 80,
        borderRadius: 40,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    label: {
        fontSize: 16,
        color: 'grey',
        marginBottom: 10,
    },
})

export default Tracker
