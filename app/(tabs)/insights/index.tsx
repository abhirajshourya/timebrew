import DropDownPicker from '@/components/form/DropDownPicker'

import BarGraph, { DataSet } from '@/components/graphs/BarGraph'
import { cleanTimelogsForChart } from '@/helpers/data-cleaner'
import { capitalizeFirstLetter } from '@/helpers/text-helpers'
import useDatabase from '@/hooks/useDatabase'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native'

type Duration = 'today' | 'week' | 'month' | 'year' | 'all'

const Index = () => {
    const { getTimeLogs } = useDatabase()
    const [timelogs, setTimelogs] = useState<DataSet>({ data: [], labels: [] })
    const [selectedDuration, setSelectedDuration] = useState('today' as Duration)

    useEffect(() => {
        let timelogs: any[] = []

        getTimeLogs({ forThis: selectedDuration }).then((logs) => {
            // console.log(cleanTimelogsForChart(logs), selectedDuration)
            setTimelogs(cleanTimelogsForChart(logs))
        })
    }, [selectedDuration])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.heading}>Insights</Text>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollView}
                >
                    <View style={{ marginBottom: 20 }}>
                        <BarGraph
                            style={{ zIndex: 1 }}
                            color="#005c99"
                            dataSet={timelogs}
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
                            stat="120k"
                        />
                    </View>
                    <View>
                        <View>
                            <Text
                                style={[
                                    { marginBottom: 10 },
                                    styles.selectDurationTag,
                                ]}
                            >
                                Duration
                            </Text>
                        </View>
                        <DropDownPicker
                            style={{ minWidth: 100 }}
                            items={['Today', 'Week', 'Month', 'Year', 'All']}
                            selectedValue={capitalizeFirstLetter(
                                selectedDuration
                            )}
                            setValue={setSelectedDuration as any}
                            placeholder="Select a duration"
                        />
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
    selectDurationTag: {
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
})

export default Index
