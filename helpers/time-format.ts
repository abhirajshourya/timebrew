/**
 * Format time in seconds to a human readable format
 * @param time - Time in seconds
 * @returns Formatted time string
 */
export const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    // Format time to HHh MMm SSs and remove leading zeros
    return `${hours > 0 ? `${hours}h ` : ''}${
        minutes > 0 ? `${minutes}m ` : ''
    }${seconds > 0 ? `${seconds}s` : ''}`.trim()
}

/**
 * Format time in seconds to hours
 * @param time - Time in seconds
 * @returns Formatted time string
 */
export const formatTimeToHours = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    if (hours === 0 && minutes === 0) {
        return `${seconds}s`
    } else if (hours === 0) {
        return `${minutes}m`
    } else if (minutes === 0) {
        return `${hours}h`
    } else {
        return `${hours}h ${minutes}m`
    }
}

/**
 * Format date to day of the week
 * @param date - Date in number or string format
 * @returns Formatted date string
 */
export const formatDateToDayofWeek = (date: number | string) => {
    const dateObj = new Date(date)

    if (isToday(date)) {
        return 'Today'
    } else if (isInThisWeek(date)) {
        return dateObj.toLocaleDateString('en-US', { weekday: 'short' })
    } else {
        return dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })
    }
    // return dateObj.toLocaleDateString('en-US', { weekday: 'long' })
}

/**
 * Format date to month
 * @param date - Date in number or string format
 * @returns Formatted date string
 */
export const formatDateToMonth = (date: number | string) => {
    const dateObj = new Date(date)

    return dateObj.toLocaleDateString('en-US', { month: 'short' })
}

/**
 * Check if the date is in the current week
 * @param date
 * @returns
 */
export const isInThisWeek = (date: number | string) => {
    const today = new Date()
    const dateObj = new Date(date)

    const todayWeek = getWeekNumber(today)
    const dateWeek = getWeekNumber(dateObj)
    console.log(todayWeek, dateWeek)

    return todayWeek === dateWeek
}

/**
 * Get the week number of the year
 * @param date
 * @returns
 */
const getWeekNumber = (date: Date) => {
    const d = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

/**
 * Capitalize the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const isToday = (date: number | string) => {
    const today = new Date()
    const dateObj = new Date(date)

    return (
        today.getDate() === dateObj.getDate() &&
        today.getMonth() === dateObj.getMonth() &&
        today.getFullYear() === dateObj.getFullYear()
    )
}
