import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

type Props = PropsWithChildren<{
    numberOfRings: number;
    ringSize: number;
    ringWidth: number;
}>;

const PolygonRings = ({children, ringSize, ringWidth }: Props) => {
    return (
        <View style={styles.container}>
            {/* rings will be nested in each other */}
            <View style={styles.ringContainer}>
                <View style={[styles.ring, styles.ring1, { width: ringSize, height: ringSize, borderWidth: ringWidth }]} />
                <View style={[styles.ring, styles.ring2, { width: ringSize - ringWidth * 2, height: ringSize - ringWidth * 2, borderWidth: ringWidth }]} />
                <View style={[styles.ring, styles.ring3, { width: ringSize - ringWidth * 4, height: ringSize - ringWidth * 4, borderWidth: ringWidth }]} />
                {children}
            </View>
            {/* <View style={styles.ringContainer}>
                <View style={[styles.ring, styles.ring1, { width: ringSize, height: ringSize, borderWidth: ringWidth }]} />
                <View style={[styles.ring, styles.ring2, { width: ringSize - ringWidth * 2, height: ringSize - ringWidth * 2, borderWidth: ringWidth }]} />
                <View style={[styles.ring, styles.ring3, { width: ringSize - ringWidth * 4, height: ringSize - ringWidth * 4, borderWidth: ringWidth }]} />
                {children}
            </View> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ringContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
    },
    ring: {
        position: 'absolute',
        // wavy border
        borderRadius: 1000,
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
    }
});

export default PolygonRings;
