import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TextInput,
    Alert,
} from 'react-native'
import { ScrollView } from 'react-native'
import useTimeTracker from '@/hooks/useTimeTracker'
import CircleButton from '@/components/CircleButton'
import { Ionicons } from '@expo/vector-icons'
import WavyRings from '@/components/WavyRings'
import { formatTime } from '@/helpers/time-format'
import useDatabase from '@/hooks/useDatabase'
import { Timelog } from '@/constants/types'
import TimelogCard from '@/components/TimelogCard'

const Tracker = () => {
    const {
        duration,
        start,
        stop,
        pause,
        isRunning,
        advanceTime,
        status,
        startTime,
        endTime,
    } = useTimeTracker()
    const { getTimeLogs, createTimelog } = useDatabase()
    const [timelogs, setTimelogs] = useState<Timelog[]>([])

    useEffect(() => {
        getTimeLogs().then(setTimelogs)
    })

    function handleOnStop() {
        stop()

        if (!duration) {
            Alert.alert('Oops!', 'No time to log')
            return
        }

        createTimelog(startTime, endTime, 1, duration)
            .then(() => {
                getTimeLogs().then(setTimelogs)
                Alert.alert('Success', 'Timelog created successfully')
            })
            .catch(() => {
                Alert.alert('Error', 'Failed to create timelog')
            })
    }

    return (
        // <SafeAreaView>
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
                        {duration > 0 && (
                            <CircleButton
                                onPress={() => advanceTime(duration * -1)}
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
                                <Ionicons name="play" size={35} color="white" />
                            </CircleButton>
                        )}
                    </View>
                    <View>
                        {duration > 0 && (
                            <CircleButton
                                onPress={handleOnStop}
                                style={styles.button}
                            >
                                <Ionicons name="stop" size={24} color="white" />
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
                    }}
                >
                    Logs
                </Text>
                {timelogs && (
                    <View>
                        {timelogs.map((timelog) => (
                            <View key={timelog.id} style={{ marginBottom: 10 }}>
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
        // </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    mainTrackerContainer: {
        paddingTop: 150,
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
})

export default Tracker
