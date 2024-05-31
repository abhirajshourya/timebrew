import { Task, Timelog } from '@/constants/types';
import { formatTime } from '@/helpers/time-format';
import useDatabase from '@/hooks/useDatabase';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TimelogCardProps {
  timelog: Timelog;
}

const TimelogCard = ({ timelog }: TimelogCardProps) => {
  const { getTask } = useDatabase();

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    getTask(timelog.task_id).then(setTask);
  }, []);

  return (
    <View style={styles.timelogCard}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.timelogText}>{formatTime(timelog.duration)}</Text>
        <Text
          style={{
            fontSize: 14,
            color: 'grey',
          }}
        >
          {moment(timelog.start_time).format('h:mm a')}
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 16, color: '#005c99' }}>
          {task ? task.description : 'Loading...'}
        </Text>
      </View>
      {/* TODO: Add Tags */}
    </View>
  );
};

const styles = StyleSheet.create({
  timelogCard: {
    padding: 15,
    borderColor: 'black',
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  timelogText: {
    fontSize: 24,
    color: 'black',
  },
});

export default TimelogCard;