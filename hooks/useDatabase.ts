import { Task, Timelog } from '@/constants/types';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect } from 'react';

export default function useDatabase() {
  const db = useSQLiteContext();

  useEffect(() => {
    initDb();
  }, []);

  const initDb = async () => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY NOT NULL,
        description TEXT NOT NULL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS timelogs (
        id INTEGER PRIMARY KEY NOT NULL,
        start_time TEXT NOT NULL,
        task_id INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        FOREIGN KEY(task_id) REFERENCES tasks(id)
      );
    `);
  };

  const fillSampleData = async () => {
    await db.execAsync(`
      INSERT INTO tasks (description) VALUES ('Task 1');
      INSERT INTO tasks (description) VALUES ('Task 2');
      INSERT INTO tasks (description) VALUES ('Task 3');
    `);

    await db.execAsync(`
      INSERT INTO timelogs (start_time, task_id, duration) VALUES ('2021-12-01 09:00:00', 1, 3600);
      INSERT INTO timelogs (start_time, task_id, duration) VALUES ('2021-12-01 10:00:00', 2, 3600);
      INSERT INTO timelogs (start_time, task_id, duration) VALUES ('2021-12-01 11:00:00', 3, 3600);
    `);

    console.log('Sample data inserted');
  };

  const clearData = async () => {
    await db.execAsync('DELETE FROM timelogs');
    await db.execAsync('DELETE FROM tasks');

    console.log('Data cleared');
  };

  const getData = async () => {
    const [timelogs, task] = await Promise.all([
      db.getAllAsync<Timelog[]>('SELECT * FROM timelogs'),
      db.getAllAsync<Task[]>('SELECT * FROM tasks'),
    ]);

    console.log('timelogs', timelogs);
    console.log('tasks', task);
  };

  return {
    getData,
    fillSampleData,
    clearData,
  };
}
