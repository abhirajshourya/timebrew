import { Image, StyleSheet, Button, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useTimeTracker from '@/hooks/useTimeTracker';
import useDatabase from '@/hooks/useDatabase';
import { useEffect, useState } from 'react';
import { Task, Timelog } from '@/constants/types';
import { MMKV } from 'react-native-mmkv';

export default function HomeScreen() {
  const { duration, start, stop, pause, isRunning } = useTimeTracker();
  const { getData, fillSampleData, clearData } = useDatabase();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timelogs, setTimelogs] = useState<Timelog[]>([]);

  const secureStorage = new MMKV();

  useEffect(() => {
    secureStorage.set('isRunning', isRunning);
  }, [isRunning]);

  function onGetData() {
    getData().then(({ tasks, timelogs }) => {
      setTasks(tasks);
      setTimelogs(timelogs);
    });

    console.log('Is Running:', secureStorage.getBoolean('isRunning'));
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Time Tracker</ThemedText>
        <ThemedText type="subtitle">Time: {duration}s</ThemedText>
        <TextInput placeholder="Enter Task Description" />
        <Button title={isRunning ? 'Pause' : 'Start'} onPress={isRunning ? pause : start} />
        <Button title="Stop" onPress={stop} />
        <Button title="Fill Sample Data" onPress={fillSampleData} />
        <Button title="Get Data" onPress={onGetData} />
        <Button title="Clear Data" onPress={clearData} />
      </ThemedView>
      {tasks && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Tasks</ThemedText>
          {tasks.map((task) => (
            <ThemedText key={task.id}>{task.description}</ThemedText>
          ))}
        </ThemedView>
      )}
      {timelogs && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Timelogs</ThemedText>
          {timelogs.map((timelog) => (
            <ThemedText key={timelog.id}>
              {timelog.start_time} - {timelog.duration}s
            </ThemedText>
          ))}
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
