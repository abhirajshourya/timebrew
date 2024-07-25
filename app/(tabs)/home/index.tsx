import CircleButton from '@/components/CircleButton'
import TimeLogModal from '@/components/Modals/TimeLogModal'
import TimelogCard from '@/components/TimelogCard'
import WavyRings from '@/components/WavyRings'
import DropDownPicker from '@/components/form/DropDownPicker'
import MultiDropDownPicker from '@/components/form/MultiDropDownTagsPicker'
import i18n from '@/constants/translations'
import { Tag, Task, Timelog } from '@/constants/types'
import { cleanText } from '@/helpers/text-helpers'
import { formatTime } from '@/helpers/time-format'
import useDatabase from '@/hooks/useDatabase'
import useTimeTracker from '@/hooks/useTimeTracker'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useMemo, useState } from 'react'
import { Alert, RefreshControl, StyleSheet } from 'react-native'
import {
    Separator,
    Text,
    View,
    H1,
    H2,
    XStack,
    YStack,
    ScrollView,
    Button,
    useTheme,
    Spinner,
} from 'tamagui'
import { useRouter, useSegments } from 'expo-router'
import { Settings, TimerReset } from '@tamagui/lucide-icons'
import { mmkv_storage } from '@/app/_layout'
import * as Progress from 'react-native-progress'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Tracker = ({}) => {
    const inset = useSafeAreaInsets()
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
        getTotalTimelogForToday,
    } = useDatabase()
    const [timelogs, setTimelogs] = useState<Timelog[]>([])
    const memoTimelogs = useMemo(() => timelogs, [timelogs])
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTask, setSelectedTask] = useState<string>('')
    const [tags, setTags] = useState<Tag[]>([])
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [reload, setReload] = useState(false)

    const router = useRouter()
    const segments = useSegments()

    const dailyGoal = mmkv_storage.getBoolean('goal.daily')
    const dailyGoalTime = mmkv_storage.getNumber('goal.dailytime')

    const [todayTime, setTodayTime] = useState(0)

    useEffect(() => {
        getTotalTimelogForToday().then((total) => {
            setTodayTime(total)
            setReload(false)
        })
    }, [segments, reload])

    useEffect(() => {
        getTimeLogs().then((timelogs) => {
            setTimelogs(timelogs)
            setReload(false)
        })
    }, [segments, reload])

    function handleOnStop() {
        pause()

        if (!isModalVisible) {
            getTasks().then(setTasks)
            getTags().then(setTags)
            setIsModalVisible(duration > 0)
        }

        if (!duration) {
            Alert.alert(
                i18n.t('tracker_screen.index.oops_alert'),
                i18n.t('tracker_screen.index.no_time')
            )
            return
        }
    }

    const handleSave = () => {
        if (!cleanText(selectedTask)) {
            Alert.alert(
                i18n.t('tracker_screen.index.oops_alert'),
                i18n.t('tracker_screen.index.no_task')
            )
            return
        }

        let taskId = 0

        if (
            !tasks.find((task) => task.description === cleanText(selectedTask))
        ) {
            // Create a new task if it doesn't exist
            // this is disabled for now
            createTask(cleanText(selectedTask))
                .then((id) => {
                    taskId = id

                    stop()
                    handleCreateTimelog(startTime, endTime, taskId, duration)
                })
                .catch(() => {
                    Alert.alert(
                        i18n.t('tracker_screen.index.error_alert'),
                        i18n.t('tracker_screen.index.task_create_failed')
                    )
                })
        } else {
            taskId = tasks.find(
                (task) => task.description === cleanText(selectedTask)
            )?.id as number

            stop()
            handleCreateTimelog(startTime, endTime, taskId, duration)
        }
        setReload(true)
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
                // getTimeLogs().then(setTimelogs)
                selectedTags.forEach((tag) => {
                    handleCreateTimelogTag(id, tag.id)
                })
                // Reset the selected tag state after saving
                setSelectedTags([])
                Alert.alert(
                    i18n.t('tracker_screen.index.success_alert'),
                    i18n.t('tracker_screen.index.log_create_success')
                )
            })
            .catch(() => {
                Alert.alert(
                    i18n.t('tracker_screen.index.error_alert'),
                    i18n.t('tracker_screen.index.log_create_failed')
                )
            })
    }

    const handleCreateTimelogTag = (timelogId: number, tagId: number) => {
        createTimelogTag(timelogId, tagId).catch(() => {
            Alert.alert(
                i18n.t('tracker_screen.index.error_alert'),
                i18n.t('tracker_screen.index.tag_create_failed')
            )
        })
    }

    const theme = useTheme()

    return (
        <YStack paddingTop={inset.top} backgroundColor={'$background025'}>
            <XStack
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
                    }}
                    color={'$color10'}
                >
                    timebrew
                </H2>

                <View>
                    <Button
                        onPress={() => {
                            router.push({ pathname: 'settings' })
                        }}
                        chromeless
                        marginEnd={-20}
                    >
                        <Settings size={24} />
                    </Button>
                </View>
            </XStack>
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={reload}
                        onRefresh={() => setReload(true)}
                        colors={[theme.color.get()]}
                        progressBackgroundColor={theme.background.get()}
                        tintColor={theme.color.get()}
                    />
                }
            >
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
                            <H1>{formatTime(duration) || '0s'}</H1>
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
                    {dailyGoal && dailyGoalTime && (
                        <View
                            style={{
                                borderRadius: 10,
                                marginHorizontal: 10,
                                backgroundColor: theme.background075.get(),
                                padding: 20,
                            }}
                        >
                            <YStack alignItems="center">
                                <Text
                                    style={{
                                        color: theme.color.get(),
                                        marginBottom: 10,
                                    }}
                                >
                                    {i18n.t(
                                        'tracker_screen.index.daily_goal_title'
                                    )}
                                    : {formatTime(todayTime)} /{' '}
                                    {formatTime(dailyGoalTime)} (
                                    {(
                                        (todayTime / dailyGoalTime) *
                                        100
                                    ).toFixed(0)}
                                    %)
                                </Text>
                                <Progress.Bar
                                    progress={todayTime / dailyGoalTime}
                                    width={300}
                                    animated
                                    animationType="timing"
                                    color={theme.color10.get()}
                                />
                            </YStack>
                        </View>
                    )}
                    <Separator marginVertical={20} />
                    <H2 alignSelf="center" marginBottom={20}>
                        {i18n.t('tracker_screen.index.title')}
                    </H2>
                    {reload && (
                        <Spinner size="large" color={theme.color.get()} />
                    )}
                    {!reload &&
                        memoTimelogs.map((timelog) => (
                            <View key={timelog.id} style={{ marginBottom: 10 }}>
                                <TimelogCard
                                    timelog={timelog}
                                    reload={reload}
                                    setReload={setReload}
                                />
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
                        {i18n.t('tracker_screen.index.no_logs')}
                    </Text>
                )}
            </ScrollView>

            <TimeLogModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                title={i18n.t('tracker_screen.index.time_log')}
            >
                <View>
                    <Text style={styles.label}>
                        {i18n.t('tracker_screen.index.questions')}
                    </Text>
                    <DropDownPicker
                        items={tasks.map((task) => task.description)}
                        selectedValue={selectedTask}
                        setValue={(value) => setSelectedTask(value)}
                        placeholder={i18n.t('tracker_screen.index.questions')}
                    />
                </View>

                <View>
                    <Text style={styles.label}>
                        {i18n.t('tracker_screen.index.tags')}
                    </Text>
                    <MultiDropDownPicker
                        items={tags}
                        selectedValues={selectedTags}
                        setValues={(values) => setSelectedTags(values)}
                        placeholder={i18n.t('tracker_screen.index.add_tag')}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Button
                        onPress={handleSave}
                        backgroundColor={'$borderColor'}
                    >
                        <Text>{i18n.t('tracker_screen.index.save_btn')}</Text>
                    </Button>
                </View>
            </TimeLogModal>
        </YStack>
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
