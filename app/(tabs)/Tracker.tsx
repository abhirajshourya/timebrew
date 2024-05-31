import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import useTimeTracker from '@/hooks/useTimeTracker';
import CircleButton from '@/components/CircleButton';
import { Ionicons } from '@expo/vector-icons';
import WavyRings from '@/components/WavyRings';
import { formatTime } from '@/helpers/time-format';

const Tracker = () => {
  const { duration, start, stop, pause, isRunning, advanceTime, status } = useTimeTracker();

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.mainTrackerContainer}>
          <WavyRings width={250} rings={3} delay={900} isRunning={isRunning}>
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
            <CircleButton
              onPress={() => {
                advanceTime(1830);
              }}
              style={styles.button}
            >
              <Ionicons name="play-skip-forward" size={24} color="white" />
            </CircleButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 150,
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
    backgroundColor: '#005c99',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default Tracker;
