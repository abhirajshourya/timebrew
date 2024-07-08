import React, { PropsWithChildren, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
    interpolate,
} from 'react-native-reanimated'
import { View, YStack } from 'tamagui'

type WavyRingsProps = PropsWithChildren<{
    rings: number
    width: number
    delay: number
    isRunning: boolean
}>

const WavyRings = ({
    children,
    rings,
    width,
    delay,
    isRunning,
}: WavyRingsProps) => {
    return (
        <>
            <YStack justifyContent="center" alignItems="center">
                <View
                    backgroundColor={'$background'}
                    width={width}
                    height={width}
                    zIndex={1}
                    borderRadius={999}
                    borderWidth={3}
                    borderColor={'$color10'}
                    shadowColor={'#000'}
                    shadowOffset={{ width: 0, height: 4 }}
                    shadowOpacity={0.3}
                    shadowRadius={4.65}
                ></View>

                {Array.from({ length: rings }).map((_, i) => (
                    <Ring
                        key={i}
                        delay={delay * i}
                        width={width}
                        isRunning={isRunning}
                    />
                ))}
                {/* <Animated.View style={[styles.circle, { width: width, height: width, position: "absolute" }, circleStyle]} /> */}

                <YStack position="absolute" zIndex={2}>
                    {children}
                </YStack>
            </YStack>
        </>
    )
}

type RingProps = {
    delay: number
    width: number
    isRunning: boolean
}

const AnimatedView = Animated.createAnimatedComponent(View)

const Ring = ({ delay, width, isRunning }: RingProps) => {
    const circle = useSharedValue(0)

    const circleStyle = useAnimatedStyle(() => {
        return {
            opacity: 0.8 - circle.value,
            transform: [
                {
                    scale: interpolate(circle.value, [0.1, 1], [1, 2.3]),
                },
            ],
        }
    })

    useEffect(() => {
        isRunning
            ? (circle.value = withDelay(
                  delay,
                  withRepeat(
                      withTiming(1, {
                          duration: 3000,
                      }),
                      -1,
                      false
                  )
              ))
            : (circle.value = withTiming(0))
    }, [isRunning])

    return (
        <AnimatedView
        borderColor={'$color11'}
            style={[
                styles.ring,
                { width: width, height: width, position: 'absolute' },
                circleStyle,
            ]}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    noOverlap: {
        backgroundColor: '#e6f5ff',
        zIndex: 1,
    },
    circle: {
        borderRadius: 999,
        borderColor: '#005c99',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    ring: {
        borderRadius: 999,
        borderColor: '$accentBorder',
        borderWidth: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default WavyRings
