import { useEffect, useState } from 'react'

type time = {
    duration: number
    start: () => void
    stop: () => void
    pause: () => void
    isRunning: boolean
    advanceTime: (time: number) => void
    reset: () => void
    status: status
    startTime: number
    endTime: number
    POMODORO_DURATION: number
}

type status = 'running' | 'paused' | 'stopped'
type timerType = 'pomodoro' | 'timer'

const POMODORO_DURATION = 25 * 60

/**
 * A custom hook to track time. It returns the current time in seconds and provides methods to start, pause and stop the timer.
 * @returns {time: number, start: () => void, stop: () => void, pause: () => void, isRunning: boolean, advanceTime: (time: number) => void, reset: () => void, status: status, startTime: number, endTime: number}
 */
const useTimeTracker = (
    type: timerType = 'timer',
    onComplete?: () => void
): time => {
    const [duration, setDuration] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [status, setStatus] = useState<status>('stopped')
    const [startTime, setStartTime] = useState<number>(0)
    const [endTime, setEndTime] = useState<number>(0)

    const start = () => {
        setIsRunning(true)
        setStatus('running')
        setStartTime(Date.now())
    }

    const pause = () => {
        setIsRunning(false)
        setStatus('paused')
    }

    const stop = () => {
        if (type === 'pomodoro') {
            setDuration(POMODORO_DURATION)
        } else {
            setDuration(0)
        }
        setIsRunning(false)
        setStatus('stopped')
        setEndTime(Date.now())
    }

    const advanceTime = (time: number) => {
        setDuration((duration) => duration + time)
    }

    const reset = () => {
        setDuration(0)
        setIsRunning(false)
        setStatus('stopped')
        setStartTime(Date.now())
        setEndTime(Date.now())
    }

    const handleFinish = (interval: NodeJS.Timeout) => {
        clearInterval(interval)
        stop()
        onComplete!()
    }

    useEffect(() => {
        if (type === 'pomodoro') {
            setDuration(POMODORO_DURATION)
        }
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (isRunning) {
            interval = setInterval(() => {
                if (type === 'timer') {
                    setDuration((prevTime) => prevTime + 1)
                } else if (type === 'pomodoro') {
                    setDuration((prevTime) => {
                        if (prevTime === 0) {
                            handleFinish(interval)
                            return prevTime
                        }
                        return prevTime - 1
                    })
                }
            }, 1000)
        } else {
            clearInterval(interval!)
        }

        return () => clearInterval(interval)
    }, [isRunning])

    return {
        duration,
        start,
        pause,
        stop,
        isRunning,
        advanceTime,
        reset,
        status,
        startTime,
        endTime,
        POMODORO_DURATION,
    }
}

export default useTimeTracker
