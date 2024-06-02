import { Tag, Task, Timelog } from '@/constants/types';
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

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS timelog_tags (
        timelog_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (timelog_id, tag_id),
        FOREIGN KEY(timelog_id) REFERENCES timelogs(id),
        FOREIGN KEY(tag_id) REFERENCES tags(id)
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

    await db.execAsync(`
      INSERT INTO tags (name) VALUES ('Tag 1');
      INSERT INTO tags (name) VALUES ('Tag 2');
      INSERT INTO tags (name) VALUES ('Tag 3');
    `);

    await db.execAsync(`
      INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (1, 1);
      INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (2, 2);
      INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (3, 3);
    `);

    console.log('Sample data inserted');
  };

  const clearData = async () => {
    await db.execAsync('DELETE FROM timelogs');
    await db.execAsync('DELETE FROM tasks');
    await db.execAsync('DELETE FROM tags');
    await db.execAsync('DELETE FROM timelog_tags');

    console.log('Data cleared');
  };

  const dropDB = async () => {
    await db.execAsync('DROP TABLE IF EXISTS timelogs');
    await db.execAsync('DROP TABLE IF EXISTS tasks');
    await db.execAsync('DROP TABLE IF EXISTS tags');
    await db.execAsync('DROP TABLE IF EXISTS timelog_tags');

    console.log('Database dropped');
  };

  const getData = async () => {
    const [timelogs, tasks, tags] = await Promise.all([
      db.getAllAsync<Timelog>('SELECT * FROM timelogs'),
      db.getAllAsync<Task>('SELECT * FROM tasks'),
      db.getAllAsync<Tag>('SELECT * FROM tags'),
    ]);

    return {
      timelogs,
      tasks,
      tags
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

  /**
   * ****************************************************
   * 1. Tag
   * ****************************************************
   */
  /**
   * Create a new tag and return the id
   * @param name - Tag name
   */
  const createTag = async (name: string) => {
    const tag = await db.runAsync('INSERT INTO tags (name) VALUES ($name)', {
      $name: name,
    });

    return tag.lastInsertRowId;
  }

  /**
   * Get a tag by id
   * @param id - Tag id
   * @returns - Tag
   */
  const getATag = async (id: number) => {
    return await db.getFirstAsync<Task>('SELECT * FROM tags WHERE id = $id', {
      $id: id,
    });
  };

  /**
   * Get all tags
   * @returns - Tag
   */
  const getTags = async () => {
    return await db.getAllAsync<Tag>('SELECT * FROM tags');
  }

  /**
   * Delete a tag by id
   * @param id - Tag id
   */
  const deleteTag = async (id: number) => {
    await db.runAsync('DELETE FROM tags WHERE id = $id', {
      $id: id,
    });

    await db.runAsync('DELETE FROM timelog_tags WHERE tag_id = $id', {
      $id: id,
    });
  }

  /**
   * Get Timelog by Tag
   * @param tagId - Tag id
   * @returns - Timelog
   */
  const getTimelogByTag = async (tagId: number) => {
    return await db.getAllAsync<Timelog>(
      'SELECT * FROM timelogs WHERE id IN (SELECT timelog_id FROM timelog_tags WHERE tag_id = $tagId)',
      { $tagId: tagId,});
  }

  /**
   * Delete tag from timelog
   * @param tagId - Tag id
   * @param timelogId - Timelog id
   */
  const deleteTagFromTimelog = async (tagId: number, timelogId: number) => {
    await db.runAsync('DELETE FROM timelog_tags WHERE tag_id = $tagId AND timelog_id = $timelogId', {
      $tagId: tagId,
      $timelogId: timelogId,
    });
  }


  return {
    getData,
    fillSampleData,
    clearData,
    dropDB,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    createTag,
    getATag,
    getTags,
    deleteTag,
    getTimelogByTag,
    deleteTagFromTimelog
  };
}
