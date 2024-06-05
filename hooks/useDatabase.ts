import { Tag, Task, Timelog } from '@/constants/types'
import { useSQLiteContext } from 'expo-sqlite'
import { useEffect } from 'react'

export default function useDatabase() {
    const db = useSQLiteContext()

    useEffect(() => {
        initDb()
    }, [])

    const initDb = async () => {
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY NOT NULL,
        description TEXT NOT NULL
      );
    `)

        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS timelogs (
        id INTEGER PRIMARY KEY NOT NULL,
        start_time INTEGER NOT NULL,
        end_time INTEGER NOT NULL,
        task_id INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        FOREIGN KEY(task_id) REFERENCES tasks(id)
      );
    `)

        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        color TEXT DEFAULT '#000000'
      );
    `)

        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS timelog_tags (
        timelog_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (timelog_id, tag_id),
        FOREIGN KEY(timelog_id) REFERENCES timelogs(id),
        FOREIGN KEY(tag_id) REFERENCES tags(id)
      );
    `)
    }

    const fillSampleData = async () => {
        await db.execAsync(`
      INSERT INTO tasks (description) VALUES ('Reading Book');
      INSERT INTO tasks (description) VALUES ('Writing Code');
      INSERT INTO tasks (description) VALUES ('Watching Movie');
      INSERT INTO tasks (description) VALUES ('Cooking Food');
      INSERT INTO tasks (description) VALUES ('Playing Games');
      INSERT INTO tasks (description) VALUES ('Working Out');
      INSERT INTO tasks (description) VALUES ('Playing Guitar');
      INSERT INTO tasks (description) VALUES ('Listening to Music');
      INSERT INTO tasks (description) VALUES ('Cleaning House');
    `)

        await db.execAsync(`
      INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (1717197052520, 1717197052520, 1, 3600);
      INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (1717197052520, 1717197052520, 2, 7200);
      INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (1717197052520, 1717197052520, 3, 1800);
      INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (1717197052520, 1717197052520, 4, 5400);
      INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (1717197052520, 1717197052520, 5, 9000);
      INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (1717197052520, 1717197052520, 6, 2700);
      INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (1717197052520, 1717197052520, 7, 4500);
      INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (1717197052520, 1717197052520, 8, 6300);
    `)

        await db.execAsync(`
      INSERT INTO tags (name, color) VALUES ('Reading', '#FF0000');
      INSERT INTO tags (name, color) VALUES ('Coding', '#00FF00');
      INSERT INTO tags (name, color) VALUES ('Watching', '#0000FF');
    `)

        await db.execAsync(`
      INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (1, 1);
      INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (2, 2);
      INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (3, 3);
    `)

        console.log('Sample data inserted')
    }

    const clearData = async () => {
        await db.execAsync('DELETE FROM timelogs')
        await db.execAsync('DELETE FROM tasks')
        await db.execAsync('DELETE FROM tags')
        await db.execAsync('DELETE FROM timelog_tags')

        console.log('Data cleared')
    }

    const dropDB = async () => {
        await db.execAsync('DROP TABLE IF EXISTS timelogs')
        await db.execAsync('DROP TABLE IF EXISTS tasks')
        await db.execAsync('DROP TABLE IF EXISTS tags')
        await db.execAsync('DROP TABLE IF EXISTS timelog_tags')

        console.log('Database dropped')
    }

    const getData = async () => {
        const [timelogs, tasks, tags] = await Promise.all([
            db.getAllAsync<Timelog>('SELECT * FROM timelogs'),
            db.getAllAsync<Task>('SELECT * FROM tasks'),
            db.getAllAsync<Tag>('SELECT * FROM tags'),
        ])

        return {
            timelogs,
            tasks,
            tags,
        }
    }

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
        const task = await db.runAsync(
            'INSERT INTO tasks (description) VALUES ($description)',
            {
                $description: description,
            }
        )

        return task.lastInsertRowId
    }

    /**
     * Get a task by id
     * @param id - Task id
     * @returns - Task
     */
    const getTask = async (id: number) => {
        return await db.getFirstAsync<Task>(
            'SELECT * FROM tasks WHERE id = $id',
            {
                $id: id,
            }
        )
    }

    /**
     * Get all tasks
     * @returns - All tasks
     */
    const getTasks = async () => {
        return await db.getAllAsync<Task>('SELECT * FROM tasks')
    }

    /**
     * Update a task description
     * @param id - Task id
     * @param description - New task description
     */
    const updateTask = async (task: Task) => {
        await db.runAsync(
            'UPDATE tasks SET description = $description WHERE id = $id',
            {
                $id: task.id,
                $description: task.description,
            }
        )
    }

    /**
     * Delete a task by id and associated timelogs
     * @param id - Task id
     */
    const deleteTask = async (id: number) => {
        await db.withExclusiveTransactionAsync(async () => {
            await db.runAsync('DELETE FROM tasks WHERE id = $id', {
                $id: id,
            })
            await db.runAsync('DELETE FROM timelogs WHERE task_id = $id', {
                $id: id,
            })
        })
    }

    /*
     * ****************************************************
     * 2. Timelog
     * ****************************************************
     */
    /**
     * Create a new timelog
     * @param start_time - Start time in ISO format
     * @param end_time - End time in ISO format
     * @param task_id - Task id
     * @param duration - Duration in seconds
     * @returns - Timelog id
     */
    const createTimelog = async (
        start_time: number,
        end_time: number,
        task_id: number,
        duration: number
    ) => {
        const timelog = await db.runAsync(
            'INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES ($start_time, $end_time, $task_id, $duration)',
            {
                $start_time: start_time,
                $end_time: end_time,
                $task_id: task_id,
                $duration: duration,
            }
        )

        return timelog.lastInsertRowId
    }

    /**
     * Get a timelog by id
     * @param id - Timelog id
     * @returns - Timelog
     */
    const getTimelog = async (id: number) => {
        return await db.getFirstAsync<Timelog>(
            'SELECT * FROM timelogs WHERE id = $id',
            {
                $id: id,
            }
        )
    }

    /**
     * Get all timelogs
     * @returns - All timelogs
     */
    const getTimeLogs = async () => {
        return await db.getAllAsync<Timelog>(
            'SELECT * FROM timelogs ORDER BY start_time DESC'
        )
    }

    /**
     * Get all timelogs for a task
     * @param taskId - Task id
     * @returns - Timelogs
     */
    const getTimelogsForTask = async (taskId: number) => {
        return await db.getAllAsync<Timelog>(
            'SELECT * FROM timelogs WHERE task_id = $taskId ORDER BY start_time DESC',
            {
                $taskId: taskId,
            }
        )
    }

    /**
     * Update a timelog
     * @param timelog - Timelog object
     */
    const updateTimelog = async (timelog: Timelog) => {
        await db.runAsync(
            'UPDATE timelogs SET start_time = $start_time, end_time = $end_time, task_id = $task_id, duration = $duration WHERE id = $id',
            {
                $id: timelog.id,
                $start_time: timelog.start_time,
                $end_time: timelog.end_time,
                $task_id: timelog.task_id,
                $duration: timelog.duration,
            }
        )
    }

    /**
     * Delete a timelog by id
     * @param id - Timelog id
     */
    const deleteTimelog = async (id: number) => {
        await db.runAsync('DELETE FROM timelogs WHERE id = $id', {
            $id: id,
        })
    }

    /**
     * ****************************************************
     * 3. Tag
     * ****************************************************
     */
    /**
     * Create a new tag and return the id
     * @param name - Tag name
     * @param color - Tag color
     */
    const createTag = async (name: string, color: string) => {
        const tag = await db.runAsync(
            'INSERT INTO tags (name, color) VALUES ($name, $color)',
            {
                $name: name,
                $color: color,
            }
        )

        return tag.lastInsertRowId
    }

    /**
     * Get a tag by id
     * @param id - Tag id
     * @returns - Tag
     */
    const getTag = async (id: number) => {
        return await db.getFirstAsync<Task>(
            'SELECT * FROM tags WHERE id = $id',
            {
                $id: id,
            }
        )
    }

    /**
     * Get all tags
     * @returns - Tag
     */
    const getTags = async () => {
        return await db.getAllAsync<Tag>('SELECT * FROM tags')
    }

    /**
     * ****************************************************
     * Update a tag
     * @param tag - Tag object
     * ****************************************************
     */
    const updateTag = async (tag: Tag) => {
        await db.runAsync(
            'UPDATE tags SET name = $name, color = $color WHERE id = $id',
            {
                $id: tag.id,
                $name: tag.name,
                $color: tag.color,
            }
        )
    }

    /**
     * Delete a tag by id
     * @param id - Tag id
     */
    const deleteTag = async (id: number) => {
        await db.runAsync('DELETE FROM tags WHERE id = $id', {
            $id: id,
        })

        await db.runAsync('DELETE FROM timelog_tags WHERE tag_id = $id', {
            $id: id,
        })
    }

    /**
     * Get Timelog by Tag
     * @param tagId - Tag id
     * @returns - Timelog
     */
    const getTimelogByTag = async (tagId: number) => {
        return await db.getAllAsync<Timelog>(
            'SELECT * FROM timelogs WHERE id IN (SELECT timelog_id FROM timelog_tags WHERE tag_id = $tagId)',
            { $tagId: tagId }
        )
    }

    /**
     * Delete tag from timelog_tags
     * @param tagId - Tag id
     */
    const deleteTagFromTimelog = async (tagId: number) => {
        await db.runAsync('DELETE FROM timelog_tags WHERE tag_id = $tagId', {
            $tagId: tagId,
        })
    }

    /**
     * ****************************************************
     * Helper functions
     * ****************************************************
     */

    const getTotalTimelogForTask = async (taskId: number) => {
        const timelogs = await db.getAllAsync<Timelog>(
            'SELECT * FROM timelogs WHERE task_id = $taskId',
            {
                $taskId: taskId,
            }
        )

        return timelogs.reduce((acc, curr) => acc + curr.duration, 0)
    }

    return {
        db,
        getData,
        fillSampleData,
        clearData,
        dropDB,
        createTask,
        getTask,
        getTasks,
        updateTask,
        deleteTask,
        createTimelog,
        getTimelog,
        getTimeLogs,
        getTimelogsForTask,
        updateTimelog,
        deleteTimelog,
        createTag,
        getTag,
        getTags,
        updateTag,
        deleteTag,
        getTimelogByTag,
        deleteTagFromTimelog,
        getTotalTimelogForTask,
    }
}
