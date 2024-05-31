import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import useTimeTracker from '@/hooks/useTimeTracker';
import CircleButton from '@/components/CircleButton';
import { Ionicons } from '@expo/vector-icons';
import WavyRings from '@/components/WavyRings';
import { formatTime } from '@/helpers/time-format';
import useDatabase from '@/hooks/useDatabase';
import { Timelog } from '@/constants/types';
import TimelogCard from '@/components/TimelogCard';

const Tracker = () => {
  const { duration, start, stop, pause, isRunning, advanceTime, status } = useTimeTracker();
  const { getTimeLogs } = useDatabase();
  const [timelogs, setTimelogs] = useState<Timelog[]>([]);

  useEffect(() => {
    getTimeLogs().then(setTimelogs);
  });

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
        {timelogs && (
          <View style={styles.logsContainer}>
            <Text style={{ fontSize: 24, color: '#005c99', textAlign: 'center' }}>Logs</Text>
            <View style={styles.logsList}>
              {timelogs.map((timelog) => (
                <View key={timelog.id} style={{ marginBottom: 10 }}>
                  <TimelogCard timelog={timelog} />
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainTrackerContainer: {
    paddingTop: 50,
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
  logsList: {
    paddingTop: 20,
  },
});

export default Tracker;
