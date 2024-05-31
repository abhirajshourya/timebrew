export interface Timelog {
  id: number;
  start_time: string;
  end_time: string;
  task_id: number;
  duration: number;
}

export interface Task {
  id: number;
  description: string;
}
