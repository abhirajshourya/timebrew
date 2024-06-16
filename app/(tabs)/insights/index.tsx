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
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollView}
                >
                    <View style={{ marginBottom: 20 }}>
                        <LineGraph
                            style={{ zIndex: 1 }}
                            data={[
                                12, 5, 9, 30, 20, 51, 20, 10, 10, 20, 15, 10,
                            ]}
                            color="#005c99"
                            labels={[ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
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
                            setValue={setSelectedDuration}
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
