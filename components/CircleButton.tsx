import React, { PropsWithChildren, ReactNode } from 'react';
import { Pressable, StyleProp } from 'react-native';

type Props = PropsWithChildren<{
    onPress: () => void;
    style: StyleProp<any>;
    rest?: any;
}>

const CircleButton = ({ children, onPress, style, ...rest }: Props) => {
    return (
        <Pressable
            style={[{
                width: 50,
                height: 50,
                borderRadius: 25,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
            }, style]}
            onPress={onPress}
            {...rest}
        >
            {children}
        </Pressable>
    );
};

export default CircleButton;