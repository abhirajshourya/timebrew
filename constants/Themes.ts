import { Theme as NavigationThemeType } from '@react-navigation/native/src/types'
import { useState } from 'react'
import { useMMKVString } from 'react-native-mmkv'
import { useTheme } from 'tamagui'
import { Theme } from './types'
import { useColorScheme } from 'react-native'

export const ThemesColors = [
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'pink',
    'red',
]
