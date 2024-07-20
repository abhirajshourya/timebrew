import DropDownPicker from '@/components/form/DropDownPicker'
import BarGraph, { DataSet } from '@/components/graphs/BarGraph'
import TagStat from '@/components/graphs/TagStat'
import i18n from '@/constants/translations'
import { Duration, TagDataset } from '@/constants/types'
import {
    cleanTagsTimelogs,
    cleanTimelogsForChart,
} from '@/helpers/data-cleaner'
import useDatabase from '@/hooks/useDatabase'
import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useSegments } from 'expo-router'
import { Text, ScrollView, View, Label, YStack, Button } from 'tamagui'

const Index = () => {
    const { getTimeLogs, getTags, getTimelogByTag } = useDatabase()
    const [timelogs, setTimelogs] = useState<DataSet>({
        data: [],
        labels: [],
        taskIds: [],
    })
    const [selectedDuration, setSelectedDuration] = useState('week' as Duration)
    const [tagsStats, setTagsStats] = useState([] as TagDataset[])
    const memoTagsStats = useMemo(() => tagsStats, [tagsStats])
    const segment = useSegments()

    useEffect(() => {
        getTimeLogs({ forThis: selectedDuration }).then((logs) => {
            setTimelogs(cleanTimelogsForChart(logs))
        })

        getTags().then((tags) => {
            setTagsStats([])
            tags.forEach((tag) => {
                let tagStat = {} as TagDataset

                getTimelogByTag(tag.id, { forThis: selectedDuration }).then(
                    (timelogs) => {
                        tagStat = cleanTagsTimelogs(tag, timelogs)
                        setTagsStats((prev) => [...prev, tagStat])
                    }
                )
            })
        })
    }, [selectedDuration, segment])

    return (
        <SafeAreaView>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // margin: 20,
                    padding: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}
                >
                    {i18n.t('insights_screen.layout.title')}
                </Text>
                <Button chromeless marginEnd={-20} disabled />
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <YStack
                    style={{ marginBottom: 200 }}
                    gap={20}
                    marginHorizontal={20}
                >
                    <View style={{ marginBottom: 20 }}>
                        {timelogs.data.length === 0 && (
                            <Text>
                                {i18n.t('insights_screen.index.no_data')}
                            </Text>
                        )}
                        <BarGraph
                            style={{ zIndex: 1 }}
                            color="#005c99"
                            dataSet={timelogs}
                            duration={selectedDuration}
                            // dataSet={{
                            //     data: [
                            //         12, 5, 9, 30, 20, 51, 20, 10, 10, 20, 15,
                            //         10,
                            //     ],
                            //     labels: [
                            //         'Jan',
                            //         'Feb',
                            //         'Mar',
                            //         'Apr',
                            //         'May',
                            //         'Jun',
                            //         'Jul',
                            //         'Aug',
                            //         'Sep',
                            //         'Oct',
                            //         'Nov',
                            //         'Dec',
                            //     ],
                            // }}
                        />
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <View>
                            <Label
                            // style={[
                            //     { marginBottom: 10 },
                            //     styles.selectDurationLabel,
                            // ]}
                            >
                                {i18n.t('insights_screen.index.duration')}
                            </Label>
                        </View>
                        <DropDownPicker
                            style={{ minWidth: 100 }}
                            items={[
                                i18n.t('insights_screen.index.daily'),
                                i18n.t('insights_screen.index.weekly'),
                                i18n.t('insights_screen.index.monthly'),
                                i18n.t('insights_screen.index.yearly'),
                                i18n.t('insights_screen.index.all'),
                            ]}
                            selectedValue={
                                selectedDuration === 'today'
                                    ? i18n.t('insights_screen.index.daily')
                                    : selectedDuration === 'week'
                                    ? i18n.t('insights_screen.index.weekly')
                                    : selectedDuration === 'month'
                                    ? i18n.t('insights_screen.index.monthly')
                                    : selectedDuration === 'year'
                                    ? i18n.t('insights_screen.index.yearly')
                                    : selectedDuration === 'all'
                                    ? i18n.t('insights_screen.index.all')
                                    : ''
                            }
                            setValue={(value: string) => {
                                if (
                                    value ==
                                    i18n.t('insights_screen.index.daily')
                                ) {
                                    setSelectedDuration('today' as Duration)
                                } else if (
                                    value ==
                                    i18n.t('insights_screen.index.weekly')
                                ) {
                                    setSelectedDuration('week' as Duration)
                                } else if (
                                    value ==
                                    i18n.t('insights_screen.index.monthly')
                                ) {
                                    setSelectedDuration('month' as Duration)
                                } else if (
                                    value ==
                                    i18n.t('insights_screen.index.yearly')
                                ) {
                                    setSelectedDuration('year' as Duration)
                                } else if (
                                    value == i18n.t('insights_screen.index.all')
                                ) {
                                    setSelectedDuration('all' as Duration)
                                }
                            }}
                            placeholder={i18n.t(
                                'insights_screen.index.select_duration'
                            )}
                        />
                    </View>
                    <View>
                        <Text style={styles.insightLabel}>
                            {selectedDuration.toLowerCase() === 'today'
                                ? i18n.t('insights_screen.index.daily')
                                : selectedDuration.toLowerCase() === 'week' ||
                                  selectedDuration.toLowerCase() === 'month' ||
                                  selectedDuration.toLowerCase() === 'year'
                                ? i18n.t(
                                      'insights_screen.index.' +
                                          selectedDuration.toLowerCase() +
                                          'ly'
                                  )
                                : selectedDuration.toLowerCase() === 'all'
                                ? i18n.t('insights_screen.index.all')
                                : ''}
                        </Text>

                        <YStack gap={10}>
                            {timelogs.data.length === 0 && (
                                <Text>
                                    {i18n.t('insights_screen.index.no_data')}
                                </Text>
                            )}
                            {timelogs.data.length > 0 &&
                                tagsStats.map(
                                    (tagStat, i) =>
                                        tagStat.timeLogs.length > 0 && (
                                            <TagStat
                                                key={i}
                                                tagStat={tagStat}
                                            />
                                        )
                                )}
                        </YStack>
                    </View>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    scrollView: {
        display: 'flex',
        flexDirection: 'column',
    },
    selectDurationLabel: {
        fontSize: 20,
        // marginBottom: 10
    },
    selectDuration: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginBottom: 20,
    },
    insightLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})

export default Index
