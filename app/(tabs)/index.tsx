import { Image, StyleSheet, Button, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useTimeTracker from '@/hooks/useTimeTracker';
import useDatabase from '@/hooks/useDatabase';
import { useEffect, useState } from 'react';
import { Tag, Task, Timelog } from '@/constants/types';
import { MMKV } from 'react-native-mmkv';
import { Collapsible } from '@/components/Collapsible';


export default function HomeScreen() {
  const { duration, start, stop, pause, isRunning } = useTimeTracker();
  const {
    getData,
    fillSampleData,
    clearData,
    dropDB,
    createTask,
    getTask,
    updateTask,
    deleteTask,
  } = useDatabase();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [timelogs, setTimelogs] = useState<Timelog[]>([]);
  const [task, setTask] = useState<Task>({ description: '', id: 0 });

  const secureStorage = new MMKV();

  useEffect(() => {
    secureStorage.set('isRunning', isRunning);
  }, [isRunning]);

  function onGetData() {
    getData().then(({ tasks, timelogs, tags }) => {
      setTasks(tasks);
      setTimelogs(timelogs);
      setTags(tags);
    });

    console.log('Is Running:', secureStorage.getBoolean('isRunning'));
  }

  const handleAddTask = async () => {
    try {
      const newTaskId = await createTask(task.description);
      const newTask = await getTask(newTaskId);
      setTasks([...tasks, newTask!]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(task);
      const updatedTask = await getTask(task.id);
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask! : t)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task.id);
      setTasks(tasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error(error);
    }
  };

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
        <TextInput
          placeholder="Enter Task Description"
          onChangeText={(value) => {
            setTask({ ...task, description: value });
          }}
          value={task.description}
        />
        <TextInput
          placeholder="Enter Task ID"
          onChangeText={(value) => {
            setTask({ ...task, id: value ? parseInt(value) : 0 });
            console.log(value);
          }}
          value={task.id.toString()}
        />

        <ThemedText type="subtitle">Actions</ThemedText>
        <ThemedView style={styles.row}>
          <Button title={isRunning ? 'Pause' : 'Start'} onPress={isRunning ? pause : start} />
          <Button title="Stop" onPress={stop} />
        </ThemedView>

        <ThemedText type="subtitle">Task</ThemedText>
        <Collapsible title="Task Actions">
          <Button title="Add Task" onPress={handleAddTask} />
          <Button title="Get Task" onPress={() => getTask(task.id).then(console.log)} />
          <Button title="Update Task" onPress={handleUpdateTask} />
          <Button title="Delete Task" onPress={handleDeleteTask} />
        </Collapsible>

        <ThemedText type="subtitle">Tags</ThemedText>
        <Collapsible title="Tag Actions">
          <Button title="Add Tag" onPress={() => console.log('Add Tag')} />
          <Button title="Get Tag" onPress={() => console.log('Get Tag')} />
          <Button title="Update Tag" onPress={() => console.log('Update Tag')} />
          <Button title="Delete Tag" onPress={() => console.log('Delete Tag')} />
        </Collapsible>

        <ThemedText type="subtitle">Database</ThemedText>
        <Collapsible title="Database Actions">
          <Button title="Fill Sample Data" onPress={fillSampleData} />
          <Button title="Get Data" onPress={onGetData} />
          <Button title="Clear Data" onPress={clearData} />
          <Button title="Drop DB" onPress={dropDB} />
        </Collapsible>
      </ThemedView>
      {tasks && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Tasks</ThemedText>
          {tasks.map((task) => (
            <ThemedText key={task.id}>
              {task.id} - {task.description}
            </ThemedText>
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
      {tags && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Tags</ThemedText>
          {tags.map((tag) => (
            <ThemedText key={tag.id}>
              {tag.id} - {tag.name}
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
  col: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});
