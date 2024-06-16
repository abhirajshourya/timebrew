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
 * Check if the date is in the current week
 * @param date
 * @returns
 */
export const isInThisWeek = (date: number | string) => {
    const today = new Date()
    const dateObj = new Date(date)

    const todayWeek = today.getDay()
    const dateWeek = dateObj.getDay()

    return todayWeek === dateWeek
}

export const isToday = (date: number | string) => {
    const today = new Date()
    const dateObj = new Date(date)

    return (
        today.getDate() === dateObj.getDate() &&
        today.getMonth() === dateObj.getMonth() &&
        today.getFullYear() === dateObj.getFullYear()
    )
}
