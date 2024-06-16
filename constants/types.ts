export interface Timelog {
    id: number
    start_time: number
    end_time: number
    task_id: number
    duration: number
}

export interface TimelogWithTags extends Timelog {
    tags: Tag[]
}

export interface Task {
    id: number
    description: string
}

export interface Tag {
    id: number
    name: string
    color: string
}

export interface TimelogTag {
    id: number
    timelog_id: number
    tag_id: number
}

export interface TimelogsDataset {
    data: number[]
    labels: number[]
}

export interface TagDataset {
    tag: Tag
    totalDuration: number
    timeLogs: Timelog[]
}

export type Duration = 'today' | 'week' | 'month' | 'year' | 'all'
