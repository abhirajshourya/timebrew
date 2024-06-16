import { Tag, TagDataset, Timelog } from '@/constants/types'
import { DataSet } from '@/components/graphs/BarGraph'
import { formatDateToDayofWeek } from './time-format'

/**
 * Clean timelogs data for chart
 * @param timelogs - Array of timelogs
 * @returns DataSet
 */
export function cleanTimelogsForChart(timelogs: Timelog[]): DataSet {
    const data: number[] = []
    const labels: number[] = []

    timelogs.forEach((log) => {
        data.push(log.duration)
        labels.push(log.start_time)
    })

    return { data, labels }
}

export function cleanTagsTimelogs(tag: Tag, timelogs: Timelog[]): TagDataset {
    const totalDuration = timelogs.reduce((acc, log) => acc + log.duration, 0)

    return {
        tag,
        totalDuration,
        timeLogs: timelogs,
    }
}
