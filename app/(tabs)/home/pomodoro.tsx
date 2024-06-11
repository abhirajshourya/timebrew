import CircleButton from '@/components/CircleButton'
import { formatTime } from '@/helpers/time-format'
import useTimeTracker from '@/hooks/useTimeTracker'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'

const Pomodoro = () => {
    const {
        duration: countDown,
        isRunning,
        start,
        stop,
        POMODORO_DURATION,
    } = useTimeTracker('pomodoro', onComplete)
    const [progress, setProgress] = React.useState(0)

    function onComplete() {
        Alert.alert('Pomodoro Completed', 'Time to take a break!', [
            {
                text: 'OK',
            },
        ])
    }

    React.useEffect(() => {
        setProgress(((POMODORO_DURATION - countDown) / POMODORO_DURATION) * 100)
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
                <CircleButton onPress={stop} style={styles.playPauseButton}>
                    <Ionicons name="stop" size={35} color="white" />
                </CircleButton>
            ) : (
                <CircleButton onPress={start} style={styles.playPauseButton}>
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
