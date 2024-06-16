import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Pressable } from 'react-native'

export default function TabLayout() {
    const colorScheme = useColorScheme()
    const isDev = true

    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Tracker',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'stopwatch' : 'stopwatch-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    title: 'Tasks',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'list' : 'list-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="tags"
                options={{
                    title: 'Tags',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'pricetag' : 'pricetag-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="insights"
                options={{
                    title: 'Insights',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'bar-chart' : 'bar-chart-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="devtools"
                options={{
                    title: 'Dev Tools',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'code-slash' : 'code-slash-outline'}
                            color={color}
                        />
                    ),
                    tabBarButton: (props) =>
                        isDev ? (
                            <Pressable {...props}>{props.children}</Pressable>
                        ) : null,
                }}
            />
        </Tabs>
    )
}
