import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TextInput,
    Alert,
    TouchableHighlight,
} from 'react-native'
import { ScrollView } from 'react-native'
import useTimeTracker from '@/hooks/useTimeTracker'
import CircleButton from '@/components/CircleButton'
import { Feather, Ionicons } from '@expo/vector-icons'
import WavyRings from '@/components/WavyRings'
import { formatTime } from '@/helpers/time-format'
import useDatabase from '@/hooks/useDatabase'
import { Task, Timelog } from '@/constants/types'
import TimelogCard from '@/components/TimelogCard'
import TimeLogModal from '@/components/Modals/TimeLogModal'
import DropDownPicker from '@/components/form/DropDownPicker'
import { get } from 'lodash'
import { PrimaryButton } from '@/components/Buttons'
import { cleanText } from '@/helpers/text-helpers'

const Tracker = () => {
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
    const { getTimeLogs, createTimelog, getTasks, createTask } = useDatabase()
    const [timelogs, setTimelogs] = useState<Timelog[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTask, setSelectedTask] = useState<string>('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        getTimeLogs().then(setTimelogs)
    })

    function handleOnStop() {
        pause()

        if (!isModalVisible) {
            getTasks().then(setTasks)
            setIsModalVisible(duration > 0)
        }

        if (!duration) {
            Alert.alert('Oops!', 'No time to log')
            return
        }

        // createTimelog(startTime, endTime, 1, duration)
        //     .then(() => {
        //         getTimeLogs().then(setTimelogs)
        //         Alert.alert('Success', 'Timelog created successfully')
        //     })
        //     .catch(() => {
        //         Alert.alert('Error', 'Failed to create timelog')
        //     })
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

        setIsModalVisible(false)
    }

    const handleCreateTimelog = (
        startTime: number,
        endTime: number,
        taskId: number,
        duration: number
    ) => {
        createTimelog(startTime, endTime, taskId, duration)
            .then(() => {
                getTimeLogs().then(setTimelogs)
                Alert.alert('Success', 'Timelog created successfully')
            })
            .catch(() => {
                Alert.alert('Error', 'Failed to create timelog')
            })
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: '600',
                        margin: 20,
                        fontStyle: 'italic',
                        color: '#005c99',
                    }}
                >
                    timebrew
                </Text>

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginRight: 20,
                        gap: 10,
                    }}
                >
                    {/* Pomodoro Activator */}
                    {/* <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: 'red',
                            }}
                        >
                            P
                        </Text>
                        <Ionicons name="timer-outline" size={24} color="red" />
                    </View> */}
                    <Ionicons name="settings-outline" size={24} color="black" />
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.mainTrackerContainer}>
                    <WavyRings
                        width={250}
                        rings={3}
                        delay={900}
                        isRunning={isRunning}
                    >
                        <View>
                            <Text
                                style={{
                                    fontSize: 36,
                                    color: '#005c99',
                                }}
                            >
                                {formatTime(duration) || '0s'}
                            </Text>
                        </View>
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
                    <View
                        style={{
                            borderBottomColor: '#d8d8d8',
                            borderBottomWidth: 1,
                            marginBottom: 20,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 24,
                            color: '#005c99',
                            textAlign: 'center',
                            marginBottom: 15,
                        }}
                    >
                        Logs
                    </Text>
                    {timelogs && (
                        <View>
                            {timelogs.map((timelog) => (
                                <View
                                    key={timelog.id}
                                    style={{ marginBottom: 10 }}
                                >
                                    <TimelogCard timelog={timelog} />
                                </View>
                            ))}
                        </View>
                    )}
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
                <Text style={styles.label}>What did you do?</Text>
                <DropDownPicker
                    items={tasks.map((task) => task.description)}
                    selectedValue={selectedTask}
                    setValue={(value) => setSelectedTask(value)}
                    placeholder="What did you do?"
                />

                <View style={{ marginBottom: 20 }}>
                    <PrimaryButton onPress={handleSave}>Save</PrimaryButton>
                </View>
            </TimeLogModal>
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
    },
    button: {
        backgroundColor: '#005c99',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
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
        backgroundColor: '#005c99',
        color: 'white',
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
