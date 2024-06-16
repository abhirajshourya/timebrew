import {
    Tag,
    Task,
    Timelog,
    TimelogTag,
    TimelogWithTags,
} from '@/constants/types'
import { useSQLiteContext } from 'expo-sqlite'
import { get } from 'lodash'
import { useEffect } from 'react'

export default function useDatabase() {
    const db = useSQLiteContext()

    useEffect(() => {
        try {
            initDb()
        } catch (error) {
            console.error('Error initializing database:', error)
        }
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
        id INTEGER PRIMARY KEY NOT NULL,
        timelog_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
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

        // different data of timelogs for charts

        await db.execAsync(`
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().getTime()}, ${new Date().getTime()}, 1, 3600);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().getTime()}, ${new Date().getTime()}, 2, 7200);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().getTime()}, ${new Date().getTime()}, 3, 1800);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().getTime()}, ${new Date().getTime()}, 4, 5400);

    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setDate(
        new Date().getDate() - new Date().getDay()
    )}, ${new Date().setDate(
            new Date().getDate() - new Date().getDay()
        )}, 5, 9000);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setDate(
        new Date().getDate() - new Date().getDay()
    )}, ${new Date().setDate(
            new Date().getDate() - new Date().getDay()
        )}, 6, 2700);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setDate(
        new Date().getDate() - new Date().getDay()
    )}, ${new Date().setDate(
            new Date().getDate() - new Date().getDay()
        )}, 7, 4500);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setDate(
        new Date().getDate() - new Date().getDay()
    )}, ${new Date().setDate(
            new Date().getDate() - new Date().getDay()
        )}, 8, 6300);

    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setDate(
        1
    )}, ${new Date().setDate(1)}, 1, 3600);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setDate(
        1
    )}, ${new Date().setDate(1)}, 2, 7200);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setDate(
        1
    )}, ${new Date().setDate(1)}, 3, 1800);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setDate(
        1
    )}, ${new Date().setDate(1)}, 4, 5400);

    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setMonth(
        0,
        1
    )}, ${new Date().setMonth(0, 1)}, 5, 9000);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setMonth(
        0,
        1
    )}, ${new Date().setMonth(0, 1)}, 6, 2700);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setMonth(
        0,
        1
    )}, ${new Date().setMonth(0, 1)}, 7, 4500);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setMonth(
        0,
        1
    )}, ${new Date().setMonth(0, 1)}, 8, 6300);

    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setFullYear(
        2021
    )}, ${new Date().setFullYear(2021)}, 1, 3600);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setFullYear(
        2021
    )}, ${new Date().setFullYear(2021)}, 2, 7200);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setFullYear(
        2021
    )}, ${new Date().setFullYear(2021)}, 3, 1800);
    INSERT INTO timelogs (start_time, end_time, task_id, duration) VALUES (${new Date().setFullYear(
        2021
    )}, ${new Date().setFullYear(2021)}, 4, 5400);
    `)

        await db.execAsync(`
      INSERT INTO tags (name, color) VALUES ('read', '#FF0000');
      INSERT INTO tags (name, color) VALUES ('code', '#FFA500');
      INSERT INTO tags (name, color) VALUES ('watch', '#0000FF');
      INSERT INTO tags (name, color) VALUES ('work', '#4B0082');
      INSERT INTO tags (name, color) VALUES ('play', '#008000');
      INSERT INTO tags (name, color) VALUES ('chore', '#EE82EE');
      INSERT INTO tags (name, color) VALUES ('self', '#FF0000');
    `)

        await db.execAsync(`
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (1, 1);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (1, 7);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (2, 2);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (2, 7);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (3, 3);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (3, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (4, 6);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (5, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (6, 4);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (7, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (8, 6);

        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (9, 1);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (9, 7);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (10, 2);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (10, 7);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (11, 3);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (11, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (12, 6);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (13, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (14, 4);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (15, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (16, 6);

        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (17, 1);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (17, 7);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (18, 2);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (18, 7);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (19, 3);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (19, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (20, 6);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (21, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (22, 4);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (23, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (24, 6);

        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (25, 1);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (25, 7);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (26, 2);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (26, 7);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (27, 3);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (27, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (28, 6);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (29, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (30, 4);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (31, 5);
        INSERT INTO timelog_tags (timelog_id, tag_id) VALUES (32, 6);
    `)

        console.log('Sample data inserted')
    }

    const clearData = async () => {
        try {
            await db.execAsync('DELETE FROM timelogs')
            await db.execAsync('DELETE FROM tasks')
            await db.execAsync('DELETE FROM tags')
            await db.execAsync('DELETE FROM timelog_tags')

            console.log('Data cleared')
        } catch (error) {
            console.error('Error clearing data: ', error)
        }
    }

    const dropDB = async () => {
        await clearData()
        await db.execAsync('DROP TABLE IF EXISTS timelogs')
        await db.execAsync('DROP TABLE IF EXISTS tasks')
        await db.execAsync('DROP TABLE IF EXISTS tags')
        await db.execAsync('DROP TABLE IF EXISTS timelog_tags')

        console.log('Database dropped')
    }

    const createDb = async () => {
        await initDb()
        console.log('Database created')
    }

    const getData = async () => {
        const [timelogs, tasks, tags, timelog_tags] = await Promise.all([
            db.getAllAsync<Timelog>('SELECT * FROM timelogs'),
            db.getAllAsync<Task>('SELECT * FROM tasks'),
            db.getAllAsync<Tag>('SELECT * FROM tags'),
            db.getAllAsync<TimelogTag>('SELECT * FROM timelog_tags'),
        ])

        return {
            timelogs,
            tasks,
            tags,
            timelog_tags,
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

    type TimelogsForThis = 'today' | 'week' | 'month' | 'year' | 'all'
    type GetTimeLogsProps = {
        forThis?: TimelogsForThis
    }
    /**
     * Get all timelogs
     * @returns - All timelogs
     */
    const getTimeLogs = async (
        { forThis }: GetTimeLogsProps = { forThis: 'all' }
    ) => {
        try {
            let query = 'SELECT * FROM timelogs ORDER BY start_time DESC'
            switch (forThis?.toLowerCase()) {
                case 'today':
                    let today = new Date()
                    today.setHours(0, 0, 0, 0)
                    // console.log(today)
                    query = `SELECT * FROM timelogs WHERE start_time >= ${today.getTime()} ORDER BY start_time DESC`
                    break

                case 'week':
                    let week = new Date()
                    week.setDate(week.getDate() - week.getDay())
                    week.setHours(0, 0, 0, 0)
                    // console.log(week)
                    query = `SELECT * FROM timelogs WHERE start_time >= ${week.getTime()} ORDER BY start_time DESC`
                    break

                case 'month':
                    let month = new Date()
                    month.setDate(1)
                    month.setHours(0, 0, 0, 0)
                    // console.log(month)
                    query = `SELECT * FROM timelogs WHERE start_time >= ${month.getTime()} ORDER BY start_time DESC`
                    break

                case 'year':
                    let year = new Date()
                    year.setMonth(0, 1)
                    year.setHours(0, 0, 0, 0)
                    // console.log(year)
                    query = `SELECT * FROM timelogs WHERE start_time >= ${year.getTime()} ORDER BY start_time DESC`
                    break

                case 'all':
                    break

                default:
                    break
            }
            return await db.getAllAsync<Timelog>(query)
        } catch (error) {
            return []
        }
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

        await db.runAsync('DELETE FROM timelog_tags WHERE timelog_id = $id', {
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
     * Get tags for a timelog
     * @param id - Timelog id
     * @returns - Tags
     */
    const getTagsForTimelog = async (id: number) => {
        return await db.getAllAsync<Tag>(
            'SELECT * FROM tags WHERE id IN (SELECT tag_id FROM timelog_tags WHERE timelog_id = $id)',
            {
                $id: id,
            }
        )
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
    const getTimelogByTag = async (
        tagId: number,
        { forThis }: GetTimeLogsProps = { forThis: 'all' }
    ) => {
        try {
            let query = `SELECT * FROM timelogs WHERE id IN (SELECT timelog_id FROM timelog_tags WHERE tag_id = ${tagId}) ORDER BY start_time DESC`
            switch (forThis?.toLowerCase()) {
                case 'today':
                    let today = new Date()
                    today.setHours(0, 0, 0, 0)
                    // console.log(today)
                    query = `SELECT * FROM timelogs WHERE start_time >= ${today.getTime()} AND id IN (SELECT timelog_id FROM timelog_tags WHERE tag_id = ${tagId}) ORDER BY start_time DESC`
                    break

                case 'week':
                    let week = new Date()
                    week.setDate(week.getDate() - week.getDay())
                    week.setHours(0, 0, 0, 0)
                    // console.log(week)
                    query = `SELECT * FROM timelogs WHERE start_time >= ${week.getTime()} AND id IN (SELECT timelog_id FROM timelog_tags WHERE tag_id = ${tagId}) ORDER BY start_time DESC`
                    break

                case 'month':
                    let month = new Date()
                    month.setDate(1)
                    month.setHours(0, 0, 0, 0)
                    // console.log(month)
                    query = `SELECT * FROM timelogs WHERE start_time >= ${month.getTime()} AND id IN (SELECT timelog_id FROM timelog_tags WHERE tag_id = ${tagId}) ORDER BY start_time DESC`
                    break

                case 'year':
                    let year = new Date()
                    year.setMonth(0, 1)
                    year.setHours(0, 0, 0, 0)
                    // console.log(year)
                    query = `SELECT * FROM timelogs WHERE start_time >= ${year.getTime()} AND id IN (SELECT timelog_id FROM timelog_tags WHERE tag_id = ${tagId}) ORDER BY start_time DESC`
                    break

                case 'all':
                    break

                default:
                    break
            }
            return await db.getAllAsync<Timelog>(query)
        } catch (error) {
            return []
        }
    }

    /**
     * Delete tag from timelog
     * @param tagId - Tag id
     * @param timelogId - Timelog id
     */
    const deleteTagFromTimelog = async (tagId: number, timelogId: number) => {
        await db.runAsync(
            'DELETE FROM timelog_tags WHERE tag_id = $tagId AND timelog_id = $timelogId',
            {
                $tagId: tagId,
                $timelogId: timelogId,
            }
        )
    }

    /**
     * ****************************************************
     * 4. TimelogTag
     * ****************************************************
     */

    const createTimelogTag = async (timelogId: number, tagId: number) => {
        await db.runAsync(
            'INSERT INTO timelog_tags (timelog_id, tag_id) VALUES ($timelogId, $tagId)',
            {
                $timelogId: timelogId,
                $tagId: tagId,
            }
        )
    }

    const deleteTimelogTag = async (timelogId: number, tagId: number) => {
        await db.runAsync(
            'DELETE FROM timelog_tags WHERE timelog_id = $timelogId AND tag_id = $tagId',
            {
                $timelogId: timelogId,
                $tagId: tagId,
            }
        )
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

    /**
     * Get total timelog for a tag
     * @param tagId 
     * @returns 
     */
    const getTotalTimelogForTag = async (tagId: number) => {
        const timelogs = await db.getAllAsync<Timelog>(
            'SELECT * FROM timelogs WHERE id IN (SELECT timelog_id FROM timelog_tags WHERE tag_id = $tagId)',
            {
                $tagId: tagId,
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
        createDb,
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
        getTagsForTimelog,
        updateTag,
        deleteTag,
        getTimelogByTag,
        deleteTagFromTimelog,
        createTimelogTag,
        deleteTimelogTag,
        getTotalTimelogForTask,
        getTotalTimelogForTag,
    }
}
