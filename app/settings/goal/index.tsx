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
import i18n from '@/constants/translations'

const Index = () => {
    const [dailyGoal, setDailyGoal] = useState(true)

    const [dailyGoalTime, setDailyGoalTime] = useState(0)

    function onSetDailyGoalTimeHandler() {
        if (dailyGoalTime === 0) {
            Alert.alert(i18n.t('alert.error'), i18n.t('alert.goalSetError'), [
                {
                    text: i18n.t('alert.ok'),
                    style: 'default',
                },
            ])
            return
        }
        mmkv_storage.set('goal.dailytime', dailyGoalTime)
        Alert.alert(i18n.t('alert.goalSet'), i18n.t('alert.goalSetMessage'), [
            {
                text: i18n.t('alert.ok'),
                style: 'default',
            },
        ])
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
                    <H4>{i18n.t('goals_screen.title')}</H4>
                </YGroup>
                <YGroup>
                    <YGroup.Item>
                        <ListItem
                            pressTheme
                            title={i18n.t('goals_screen.dailyGoalTitile')}
                        >
                            <XStack
                                gap={10}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <H4>
                                    {dailyGoal
                                        ? i18n.t('goals_screen.on')
                                        : i18n.t('goals_screen.off')}
                                </H4>
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
                                <XStack gap={10} justifyContent="space-between">
                                    <Input
                                        placeholder={i18n.t(
                                            'goals_screen.inputPlaceholder'
                                        )}
                                        enterKeyHint="done"
                                        onChangeText={(text) => {
                                            setDailyGoalTime(
                                                formatTimeToSeconds(text)
                                            )
                                        }}
                                        flex={1}
                                    />
                                    <Button onPress={onSetDailyGoalTimeHandler}>
                                        {i18n.t('goals_screen.setBtn')}
                                    </Button>
                                </XStack>
                            </ListItem>
                        </YGroup.Item>
                    )}
                    {dailyGoal && (
                        <YGroup.Item>
                            <ListItem
                                pressTheme
                                title={`${i18n.t(
                                    'goals_screen.prevGoalTime'
                                )}: ${formatTime(
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
