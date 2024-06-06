import React, { PropsWithChildren, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
    Easing,
    JumpingTransition,
    Layout,
    LinearTransition,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from 'react-native-reanimated'

type Props = PropsWithChildren<{
    numberOfRings: number
    ringSize: number
    ringWidth: number
    isRunning: boolean
}>

const time = 1000
const easing = Easing.quad

const transition = LinearTransition.duration(1000).build()

const PolygonRings = ({ children, ringSize, ringWidth, isRunning }: Props) => {
    const width = useSharedValue(0)
    const borderStyle: SharedValue<'solid' | 'dashed'> =
        useSharedValue('dashed')

    useEffect(() => {
        // width.value = withRepeat(withTiming(1, { duration: time, easing }), -1, true);

        if (isRunning) {
            width.value = withRepeat(
                withTiming(1, { duration: time, easing }),
                -1,
                true
            )
            borderStyle.value = 'dashed'
        } else {
            width.value = withTiming(0)
            borderStyle.value = 'solid'
        }

        // width.value = withRepeat(withTiming(2, { duration: time, easing }), 0, true);
    }, [isRunning])

    const animatedRing = useAnimatedStyle(() => ({
        transform: [{ rotate: `${width.value * 12}deg` }],
    }))

    const animatedRing2 = useAnimatedStyle(() => ({
        transform: [{ rotate: `-${width.value * 12}deg` }],
    }))

    const animatedBorderStyle = useAnimatedStyle(() => ({
        borderStyle: borderStyle.value,
    }))

    const CircleWidthReduce = (width: number, ringWidth: number) => {
        const circleDegree = 360
    }

    return (
        <View style={styles.container}>
            {/* rings will be nested in each other */}
            <View style={styles.ringContainer}>
                <Animated.View
                    layout={transition}
                    style={[
                        styles.ring,
                        animatedBorderStyle,
                        animatedRing,
                        styles.ring1,
                        {
                            width: ringSize,
                            height: ringSize,
                            borderWidth: ringWidth,
                        },
                    ]}
                />
                <Animated.View
                    layout={transition}
                    style={[
                        styles.ring,
                        animatedBorderStyle,
                        animatedRing2,
                        styles.ring2,
                        {
                            width: ringSize - ringWidth * 2,
                            height: ringSize - ringWidth * 2,
                            borderWidth: ringWidth,
                        },
                    ]}
                />
                <Animated.View
                    layout={transition}
                    style={[
                        styles.ring,
                        animatedBorderStyle,
                        animatedRing,
                        styles.ring3,
                        {
                            width: ringSize - ringWidth * 4,
                            height: ringSize - ringWidth * 4,
                            borderWidth: ringWidth,
                        },
                    ]}
                />

                {children}
            </View>
            {/* <View style={styles.ringContainer}>
                <View style={[styles.ring, styles.ring1, { width: ringSize, height: ringSize, borderWidth: ringWidth }]} />
                <View style={[styles.ring, styles.ring2, { width: ringSize - ringWidth * 2, height: ringSize - ringWidth * 2, borderWidth: ringWidth }]} />
                <View style={[styles.ring, styles.ring3, { width: ringSize - ringWidth * 4, height: ringSize - ringWidth * 4, borderWidth: ringWidth }]} />
                {children}
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: 300,
    },
    ringContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ring: {
        position: 'absolute',
        // wavy border
        borderRadius: 1000,
        // borderStyle: 'dashed',
        // border colors
        // border width
        borderWidth: 5,
    },
    ring1: {
        borderColor: 'red',
    },
    ring2: {
        borderColor: 'green',
    },
    ring3: {
        borderColor: 'blue',
    },
})

export default PolygonRings
