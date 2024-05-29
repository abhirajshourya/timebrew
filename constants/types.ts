export interface Timelog {
    id: number;
    created_at: string;
    task_id: number;
    duration: number;
}

export interface Task {
    id: number;
    description: string;
}