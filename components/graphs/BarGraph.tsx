import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import * as d3 from 'd3'
import {
    Svg,
    Path,
    G,
    Defs,
    Stop,
    LinearGradient,
    Line,
    Rect,
    Text as SvgText,
} from 'react-native-svg'
import {
    formatDateToDayofWeek,
    formatTimeToHours,
    isInThisWeek,
} from '@/helpers/time-format'

export type BarGraphProps = {
    dataSet: DataSet
    color?: string
    stat: string
    style?: StyleProp<ViewStyle>
}

export type DataSet = {
    // both should be of the same length
    data: readonly number[]
    labels: readonly string[] | readonly number[]
}

const GRAPH_ASPECT_RATIO = 9 / 16

const BarGraph = ({ dataSet, color, stat, style }: BarGraphProps) => {
    const { data, labels } = dataSet

    useEffect(() => {
        // console.log(data, labels)
        if (data.length !== labels.length) {
            throw new Error('Data and labels should be of the same length')
        }
    }, [dataSet])

    const [width, setWidth] = useState(0)
    const height = width * GRAPH_ASPECT_RATIO
    const marginTop = 20
    const marginBottom = 20
    const marginLeft = 45
    const marginRight = 0

    const x = d3
        .scaleBand()
        .domain(
            d3.groupSort(
                labels,
                (a, b) => a - b,
                (d) => d
            )
        )
        .range([marginLeft, width - marginRight])
        .padding(0.1)

    const y = d3
        .scaleLinear()
        .domain([0, d3.max(data) || 0])
        .range([height - marginBottom, marginTop])

    return (
        <View
            onLayout={(event) => {
                setWidth(event.nativeEvent.layout.width)
            }}
            style={style}
        >
            <Svg height={height} width={width}>
                {data.map((d, i) => (
                    <Rect
                        key={i}
                        fill={color}
                        fillOpacity={0.5}
                        x={x(labels[i])}
                        y={y(d)}
                        height={y(0) - y(d)}
                        width={x.bandwidth()}
                    />
                ))}

                {/* Y Axis */}
                <G fill={color}>
                    <Line
                        x1={marginLeft}
                        y1={marginTop}
                        x2={marginLeft}
                        y2={height - marginBottom}
                        stroke="black"
                        strokeWidth={1}
                    />
                </G>
                <G fill="black">
                    {/* every hour */}
                    {y.ticks(5).map((d, i) => (
                        <SvgText
                            key={i}
                            x={marginLeft - 5}
                            y={y(d)}
                            fill="black"
                            fontSize="12"
                            textAnchor="end"
                        >
                            {formatTimeToHours(d)}
                        </SvgText>
                    ))}
                </G>

                {/* X Axis */}
                <G fill={color}>
                    <Line
                        x1={marginLeft}
                        y1={y(0)}
                        x2={width - marginRight}
                        y2={y(0)}
                        stroke="black"
                        strokeWidth={1}
                    />
                </G>
                <G fill="black">
                    {labels.map((label, i) => (
                        <SvgText
                            key={i}
                            x={x(label) + x.bandwidth() / 2}
                            y={height - marginBottom + 15}
                            fill="black"
                            fontSize="12"
                            textAnchor="middle"
                        >
                            {formatDateToDayofWeek(label)}
                        </SvgText>
                    ))}
                </G>
                <G fill="black">
                    {data.map((d, i) => (
                        <SvgText
                            key={i}
                            x={x(labels[i]) + x.bandwidth() / 2}
                            y={y(d) - 5}
                            fill="black"
                            fontSize="12"
                            textAnchor="middle"
                        >
                            {
                                formatTimeToHours(d)
                                // d
                            }
                        </SvgText>
                    ))}
                </G>
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({})

export default BarGraph
