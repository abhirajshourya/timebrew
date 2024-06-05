import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, Pressable, PressableProps } from 'react-native';

type FABProps = PropsWithChildren & PressableProps


const FAB = ({ children, ...rest }: FABProps) => {
    return (
        <Pressable style={[styles.fab]} {...rest}>
            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#005c99',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
    },
});

export default FAB;
