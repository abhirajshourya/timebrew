import TaskCard from '@/components/TaskCard';
import { Task } from '@/constants/types';
import useDatabase from '@/hooks/useDatabase';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, Text } from 'react-native';

const index = () => {
  const { getTasks } = useDatabase();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          margin: 20,
        }}
      >
        All Tasks
      </Text>
      <ScrollView
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '90%',
          padding: 20,
          paddingTop: 2,
        }}
      >
        {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
