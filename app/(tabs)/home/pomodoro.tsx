import CircleButton from '@/components/CircleButton'
import i18n from '@/constants/translations'
import { formatTime } from '@/helpers/time-format'
import useTimeTracker from '@/hooks/useTimeTracker'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { View, Text, Button, styled, useTheme } from 'tamagui'
import { X, TimerReset } from '@tamagui/lucide-icons'

const DEFAULT_POMO_DURATION = 25 * 60 // 25 minutes
const DEFAULT_BREAK_DURATION = 5 * 60 // 5 minutes

const StyledCircularProgress = styled(CircularProgress, {
    name: 'StyledCircularProgress',
})

const Pomodoro = () => {
    const theme = useTheme()
    
    const {
        duration: countDown,
        isRunning,
        start,
        stop,
    } = useTimeTracker('pomodoro', onComplete)
    const [progress, setProgress] = React.useState(0)
    const [pomoDuration, setPomoDuration] = React.useState(
        DEFAULT_POMO_DURATION
    )
    const [isBreak, setIsBreak] = React.useState(false)

    function onComplete() {
        let isBreakTime = !isBreak
        console.log('isBreakTime, onCOMPLETE ', isBreakTime)
        const newDuration = isBreakTime
            ? DEFAULT_BREAK_DURATION
            : DEFAULT_POMO_DURATION
        setPomoDuration(newDuration)
        setProgress(0)
        if (!isBreak) {
            Alert.alert(i18n.t('tracker_screen.poromodo.break_title') , i18n.t('tracker_screen.poromodo.break_msg'), [
                {
                    text: i18n.t('tracker_screen.poromodo.continue'),
                    onPress: () => {
                        handleStart(newDuration)
                    },
                },
            ])
        } else {
            Alert.alert(i18n.t('tracker_screen.poromodo.end_pomodoro'), i18n.t('tracker_screen.poromodo.stop_pomodoro_msg'), [
                {
                    text: i18n.t('tracker_screen.poromodo.no'),
                    onPress: () => {
                        handleStart(newDuration)
                    },
                },
                {
                    text: i18n.t('tracker_screen.poromodo.yes'),
                    onPress: () => {
                        handleStop()
                        router.navigate('home')
                    },
                },
            ])
        }
        setIsBreak(!isBreak)
    }

    function handleStart(newDuration: number = DEFAULT_POMO_DURATION) {
        start(newDuration)
    }

    function handleStop() {
        stop()
        setProgress(0)
    }

    React.useEffect(() => {
        setProgress(((pomoDuration - countDown) / pomoDuration) * 100)
    }, [countDown, isRunning])

    const router = useRouter()

    return (
        <>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                }}
            >
                {/* <TouchableOpacity
                    onPress={() => {
                        if (isRunning) {
                            Alert.alert(
                                i18n.t('tracker_screen.poromodo.break_title'),
                                i18n.t('tracker_screen.poromodo.break_title'),
                                [
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            handleStop()
                                            router.navigate('home')
                                        },
                                    },
                                    {
                                        text: 'No',
                                    },
                                ]
                            )
                            return
                        }
                        router.navigate('home')
                    }}
                >
                    <Ionicons
                        name="close-sharp"
                        size={30}
                        color="#323232"
                        style={{ margin: 20 }}
                    />
                </TouchableOpacity> */}
                <Button
                    marginRight={20}
                    marginTop={20}
                    onPress={() => {
                        if (isRunning) {
                            Alert.alert(
                                'Leave Pomodoro?',
                                'This will stop the pomodoro timer.',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            handleStop()
                                            router.navigate('home')
                                        },
                                    },
                                    {
                                        text: 'No',
                                    },
                                ]
                            )
                            return
                        }
                        router.navigate('home')
                    }}
                    icon={<X scale={2} />}
                    chromeless
                />
            </View>
            <View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    <TimerReset size={30} />
                    {/* <Ionicons name="timer" size={30}/> */}
                    <View>
                        <Text style={{ fontSize: 20 }}>
                            {isBreak ? i18n.t('tracker_screen.poromodo.break') : 'Pomodoro'}
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                            {formatTime(pomoDuration)}
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 50,
                }}
            >
                <StyledCircularProgress
                    value={progress}
                    showProgressValue={false}
                    title={formatTime(countDown || pomoDuration)}
                    titleColor={theme.color.get()}
                    titleStyle={{ fontWeight: '300' }}
                    radius={120}
                    inActiveStrokeOpacity={0.5}
                    activeStrokeWidth={15}
                    inActiveStrokeWidth={20}
                    activeStrokeColor={`${theme.color10.get()}`}
                    activeStrokeSecondaryColor={`${theme.color.get()}`}
                    inActiveStrokeColor={`${theme.accentBackground.get()}`}
                />
                {isRunning ? (
                    <CircleButton
                        onPress={handleStop}
                        style={styles.playPauseButton}
                    >
                        <Ionicons name="stop" size={35} color="white" />
                    </CircleButton>
                ) : (
                    <CircleButton
                        onPress={() => handleStart()}
                        style={styles.playPauseButton}
                    >
                        <Ionicons name="play" size={35} color="white" />
                    </CircleButton>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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
})

export default Pomodoro
