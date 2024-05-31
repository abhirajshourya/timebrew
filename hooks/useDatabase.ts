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
        created_at TEXT NOT NULL,
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
      INSERT INTO timelogs (created_at, task_id, duration) VALUES ('2021-12-01 09:00:00', 1, 3600);
      INSERT INTO timelogs (created_at, task_id, duration) VALUES ('2021-12-01 10:00:00', 2, 3600);
      INSERT INTO timelogs (created_at, task_id, duration) VALUES ('2021-12-01 11:00:00', 3, 3600);
    `);

    console.log('Sample data inserted');
  };

  const clearData = async () => {
    await db.execAsync('DELETE FROM timelogs');
    await db.execAsync('DELETE FROM tasks');

    console.log('Data cleared');
  };

  const dropDB = async () => {
    await db.execAsync('DROP TABLE IF EXISTS timelogs');
    await db.execAsync('DROP TABLE IF EXISTS tasks');

    console.log('Database dropped');
  };

  const getData = async () => {
    const [timelogs, tasks] = await Promise.all([
      db.getAllAsync<Timelog>('SELECT * FROM timelogs'),
      db.getAllAsync<Task>('SELECT * FROM tasks'),
    ]);

    return {
      timelogs,
      tasks,
    };
  };

  /**
   * ****************************************************
   * **************** CRUD Operations *******************
   * 1. Task
   * 2. Timelog
   * 3. Tag
   * 4. TimelogTag
   * ****************************************************
   */

  /**
   * ****************************************************
   * 1. Task
   * ****************************************************
   */
  /**
   * Create a new task and return the id
   * @param description - Task description
   */
  const createTask = async (description: string) => {
    const task = await db.runAsync('INSERT INTO tasks (description) VALUES ($description)', {
      $description: description,
    });

    return task.lastInsertRowId;
  };

  /**
   * Get a task by id
   * @param id - Task id
   * @returns - Task
   */
  const getTask = async (id: number) => {
    return await db.getFirstAsync<Task>('SELECT * FROM tasks WHERE id = $id', {
      $id: id,
    });
  };

  /**
   * Update a task description
   * @param id - Task id
   * @param description - New task description
   */
  const updateTask = async (task: Task) => {
    await db.runAsync('UPDATE tasks SET description = $description WHERE id = $id', {
      $id: task.id,
      $description: task.description,
    });
  };

  /**
   * Delete a task by id
   * @param id - Task id
   */
  const deleteTask = async (id: number) => {
    await db.runAsync('DELETE FROM tasks WHERE id = $id', {
      $id: id,
    });
  };

  return {
    getData,
    fillSampleData,
    clearData,
    dropDB,
    createTask,
    getTask,
    updateTask,
    deleteTask,
  };
}
