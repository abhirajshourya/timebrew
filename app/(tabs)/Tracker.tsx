import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { Image, ScrollView } from 'react-native';
import useTimeTracker from '@/hooks/useTimeTracker';
import PolygonRings from '@/components/PolygonRings';
import CircleButton from '@/components/CircleButton';
import { Ionicons } from '@expo/vector-icons';
import WavyCircle from '@/components/WavyCircle';
import WavyRings from '@/components/WavyRings';



const Tracker = () => {
    const { duration, start, stop, pause, isRunning } = useTimeTracker();

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.mainTrackerContainer}>
                    {/* <WavyCircle /> */}
                    <WavyRings width={250} rings={3} delay={900} isRunning={isRunning}>
                        <View>
                            <Text style={{ fontSize: 20 }}>{duration}s</Text>
                        </View>
                    </WavyRings>

                    {/* <PolygonRings numberOfRings={3} ringSize={295} ringWidth={8} isRunning={isRunning}>
                        <View>
                            <Text style={{ fontSize: 20 }}>{duration}s</Text>
                        </View>
                    </PolygonRings> */}


                    {/* <View style={styles.mianCircleRing1}>
                        <View style={styles.mianCircleRing2}>
                            <Text>{duration}s</Text>
                        </View>
                    </View> */}

                    <View style={styles.controlsContainer}>

                        {isRunning ? (
                            <CircleButton onPress={pause} style={styles.button}>
                                <Ionicons name="pause" size={24} color="white" />
                            </CircleButton>
                        ) : (
                            <CircleButton onPress={start} style={styles.button}>
                                <Ionicons name="play" size={24} color="white" />
                            </CircleButton>
                        )}
                        <CircleButton onPress={stop} style={styles.button}>
                            <Ionicons name="stop" size={24} color="white" />
                        </CircleButton>
                        {/* <Button title="Start" onPress={start} />
                            <Button title="Pause" onPress={pause} />
                            <Button title="Stop" onPress={stop} /> */}
                    </View>
                </View>
                {/* <View style={styles.logsContainer}>
                    <Text>Logs</Text>
                </View> */}
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 150
    },
    mainTrackerContainer: {
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    mianCircle: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mianCircleRing1: {
        borderRadius: 150,
        width: 300,
        height: 300,
        // backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: 'blue',
    },
    mianCircleRing2: {
        borderRadius: 150,
        width: 250,
        height: 250,
        // backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: 'blue',
    },
    controlsContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 20,
    },
    logsContainer: {
        padding: 20,
    },
    button: {
        backgroundColor: '#53b1fd',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },

});

export default Tracker;
