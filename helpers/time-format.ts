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
    return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m ` : ''}${
        seconds > 0 ? `${seconds}s` : ''
    }`.trim()
}
