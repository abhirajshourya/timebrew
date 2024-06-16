import DropDownPicker from '@/components/form/DropDownPicker'
import BarGraph, { DataSet } from '@/components/graphs/BarGraph'
import TagStat from '@/components/graphs/TagStat'
import { TagDataset } from '@/constants/types'
import {
    cleanTagsTimelogs,
    cleanTimelogsForChart,
} from '@/helpers/data-cleaner'
import { capitalizeFirstLetter } from '@/helpers/text-helpers'
import useDatabase from '@/hooks/useDatabase'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native'
import { Duration } from '@/constants/types'


const Index = () => {
    const { getTimeLogs, getTags, getTimelogByTag } = useDatabase()
    const [timelogs, setTimelogs] = useState<DataSet>({ data: [], labels: [], taskIds: [] })
    const [selectedDuration, setSelectedDuration] = useState('week' as Duration)
    const [tagsStats, setTagsStats] = useState([] as TagDataset[])

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
    }, [selectedDuration])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.heading}>Insights</Text>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={{ marginBottom: 200 }}>
                        <View style={{ marginBottom: 20 }}>
                            {timelogs.data.length === 0 && (
                                <Text>No data to show</Text>
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
                                <Text
                                    style={[
                                        { marginBottom: 10 },
                                        styles.selectDurationLabel,
                                    ]}
                                >
                                    Duration
                                </Text>
                            </View>
                            <DropDownPicker
                                style={{ minWidth: 100 }}
                                items={[
                                    'Today',
                                    'Week',
                                    'Month',
                                    'Year',
                                    'All',
                                ]}
                                selectedValue={capitalizeFirstLetter(
                                    selectedDuration
                                )}
                                setValue={setSelectedDuration as any}
                                placeholder="Select a duration"
                            />
                        </View>
                        <View>
                            <Text style={styles.insightLabel}>
                                {selectedDuration.toLowerCase() === 'today'
                                    ? 'Today'
                                    : selectedDuration.toLowerCase() ===
                                          'week' ||
                                      selectedDuration.toLowerCase() ===
                                          'month' ||
                                      selectedDuration.toLowerCase() === 'year'
                                    ? 'This ' + selectedDuration
                                    : selectedDuration.toLowerCase() === 'all'
                                    ? 'All time'
                                    : ''}
                            </Text>

                            <View>
                                {timelogs.data.length === 0 && (
                                    <Text>No data to show</Text>
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
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
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
        marginBottom: 20,
    },
    scrollView: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
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
