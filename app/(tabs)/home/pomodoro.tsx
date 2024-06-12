import CircleButton from '@/components/CircleButton'
import { formatTime } from '@/helpers/time-format'
import useTimeTracker from '@/hooks/useTimeTracker'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'

const DEFAULT_POMO_DURATION = 10
const DEFAULT_BREAK_DURATION = 5

const Pomodoro = () => {
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
        console.log('newDuration', newDuration)
        setPomoDuration(newDuration)
        setIsBreak(!isBreak)
        setProgress(0)
        Alert.alert('Pomodoro Completed', 'Time to take a break!', [
            {
                text: 'Continue',
                onPress: () => {
                    handleStart(newDuration)
                },
            },
        ])
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
                <TouchableOpacity
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
                >
                    <Ionicons
                        name="close-sharp"
                        size={30}
                        color="#323232"
                        style={{ margin: 20 }}
                    />
                </TouchableOpacity>
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
                    <Ionicons name="stopwatch" size={30} color="#323232" />
                    <View>
                        <Text style={{ fontSize: 20, color: '#323232' }}>
                            {isBreak ? 'Break' : 'Pomodoro'}
                        </Text>
                        <Text style={{ fontSize: 12, color: '#323232' }}>
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
                <CircularProgress
                    value={progress}
                    showProgressValue={false}
                    title={formatTime(countDown || pomoDuration)}
                    titleColor="#323232"
                    titleStyle={{ fontWeight: '300' }}
                    radius={120}
                    inActiveStrokeOpacity={0.5}
                    activeStrokeWidth={15}
                    inActiveStrokeWidth={20}
                    activeStrokeSecondaryColor="#00aeff"
                    inActiveStrokeColor="#d8d8d8"
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
})

export default Pomodoro
