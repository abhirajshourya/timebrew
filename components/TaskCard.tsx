import { Task } from '@/constants/types';
import React from 'react';
import { Text, View } from 'react-native';

interface TaskProps {
  task: Task;
}

const TaskCard = ({ task }: TaskProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: '#005c99',
        }}
      >
        {task.description}
      </Text>
      <View>
        <Text
          style={{
            fontSize: 14,
            color: 'grey',
          }}
        >
          {task.id}
        </Text>
      </View>
    </View>
  );
};

export default TaskCard;
