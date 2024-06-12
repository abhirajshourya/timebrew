import CircleButton from '@/components/CircleButton'
import { formatTime } from '@/helpers/time-format'
import useTimeTracker from '@/hooks/useTimeTracker'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'

const DEFAULT_POMO_DURATION = 25 * 60
const DEFAULT_BREAK_DURATION = 5 * 60

const Pomodoro = () => {
    const {
        duration: countDown,
        isRunning,
        start,
        stop,
    } = useTimeTracker('pomodoro', onComplete)
    const [progress, setProgress] = React.useState(0)
    const [pomoDuration, setPomoDuration] = React.useState(0)
    const [isBreakTime, setIsBreakTime] = React.useState(false)

    function onComplete() {
        setProgress(0)
        setIsBreakTime(() => !isBreakTime)
        Alert.alert('Pomodoro Completed', 'Time to take a break!', [
            {
                text: 'OK',
                onPress: () => {
                    handleStart()
                },
            },
        ])
    }

    function handleStart() {
        const newDuration = isBreakTime
            ? DEFAULT_BREAK_DURATION
            : DEFAULT_POMO_DURATION
        setPomoDuration(newDuration)
        start(newDuration)
    }

    function handleStop() {
        stop()
    }

    React.useEffect(() => {
        setProgress(((pomoDuration - countDown) / pomoDuration) * 100)
    }, [countDown, isRunning])

    return (
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
                title={formatTime(countDown) || 'Pomodoro!!'}
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
                    onPress={handleStart}
                    style={styles.playPauseButton}
                >
                    <Ionicons name="play" size={35} color="white" />
                </CircleButton>
            )}
        </View>
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
