import DropDownPicker from '@/components/form/DropDownPicker'
import LineGraph from '@/components/graphs/LineGraph'
import { capitalizeFirstLetter } from '@/helpers/text-helpers'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native'

type Duration = 'today' | 'week' | 'month' | 'year' | 'all' | 'custom'

const Index = () => {
    const [selectedDuration, setSelectedDuration] = useState('week' as Duration)

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.heading}>Insights</Text>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.selectDuration}>
                        <Text>Duration</Text>
                        <DropDownPicker items={['Today', 'Week', 'Month', 'Year', 'All']} selectedValue='Week' setValue={(val) => setSelectedDuration(val as Duration)} placeholder='Select a duration' />
                    </View>

                    <LineGraph
                        data={[
                            12, 5, 9, 30, 20, 51, 20, -10, 10, 20, 15, 10, 5,
                        ]}
                        color="black"
                        label="Week"
                        stat="120k"
                    />
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
    },
    selectDuration: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
})

export default Index
