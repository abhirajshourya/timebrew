import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import {
    YStack,
    ListItem,
    YGroup,
    Switch,
    XStack,
    H4,
    ScrollView,
    Input,
    Button,
} from 'tamagui'
import { formatTime, formatTimeToSeconds } from '@/helpers/time-format'
import { mmkv_storage } from '@/app/_layout'

const Index = () => {
    const [dailyGoal, setDailyGoal] = useState(true)

    const [dailyGoalTime, setDailyGoalTime] = useState(0)

    function onSetDailyGoalTimeHandler() {
        mmkv_storage.set('goal.dailytime', dailyGoalTime)
        Alert.alert(
            'Goal Set', // Alert Title
            'Your goal has been successfully set!', // Alert Message
            [
                {
                    text: 'OK',
                    style: 'default',
                },
            ]
        )
    }

    useEffect(() => {
        const goal_daily = mmkv_storage.getBoolean('goal.daily')
        setDailyGoal(goal_daily || false)

        if (goal_daily) {
            const goal_dailytime = mmkv_storage.getNumber('goal.dailytime')
            setDailyGoalTime(goal_dailytime || 0)
        }
    }, [])

    return (
        <ScrollView>
            <YStack margin={20} gap={20}>
                <YGroup>
                    <H4>Goals are made to achieve!</H4>
                </YGroup>
                <YGroup>
                    <YGroup.Item>
                        <ListItem pressTheme title={`Daily Time Goal`}>
                            <XStack
                                gap={10}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <H4>{dailyGoal ? 'On' : 'Off'}</H4>
                                <Switch
                                    size={'$3'}
                                    checked={dailyGoal}
                                    onCheckedChange={async (checked) => {
                                        setDailyGoal(checked)
                                        mmkv_storage.set('goal.daily', checked)
                                    }}
                                    native
                                >
                                    <Switch.Thumb animation={'superBouncy'} />
                                </Switch>
                            </XStack>
                        </ListItem>
                    </YGroup.Item>
                    {dailyGoal && (
                        <YGroup.Item>
                            <ListItem pressTheme>
                                <XStack
                                    gap={10}
                                    justifyContent="space-between"
                                    width={'100%'}
                                >
                                    <Input
                                        placeholder="Enter Time Goal, e.g. 1h 30m"
                                        keyboardType="number-pad"
                                        enterKeyHint="done"
                                        onChangeText={(text) => {
                                            setDailyGoalTime(
                                                formatTimeToSeconds(text)
                                            )
                                        }}
                                        width={'80%'}
                                    />
                                    <Button onPress={onSetDailyGoalTimeHandler}>
                                        Set
                                    </Button>
                                </XStack>
                            </ListItem>
                        </YGroup.Item>
                    )}
                    {dailyGoal && (
                        <YGroup.Item>
                            <ListItem
                                pressTheme
                                title={`Previous Goal: ${formatTime(
                                    mmkv_storage.getNumber('goal.dailytime') ||
                                        dailyGoalTime
                                )}`}
                            />
                        </YGroup.Item>
                    )}
                </YGroup>
            </YStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})

export default Index
