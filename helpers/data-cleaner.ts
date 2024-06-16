import { Timelog } from '@/constants/types'
import { DataSet } from '@/components/graphs/BarGraph'
import { formatDateToDayofWeek } from './time-format'

export function cleanTimelogsForChart(timelogs: Timelog[]): DataSet {
    const data: number[] = []
    const labels: number[] = []

    timelogs.forEach((log) => {
        data.push(log.duration)
        labels.push(log.start_time)        
    })

    return { data, labels }

}
