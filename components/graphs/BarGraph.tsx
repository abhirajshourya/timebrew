import React, { useEffect, useState } from 'react'
import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import * as d3 from 'd3'
import { Svg, G, Line, Rect, Text as SvgText } from 'react-native-svg'
import { formatDateToDayofWeek, formatTimeToHours } from '@/helpers/time-format'
import { Duration } from '@/constants/types'
import { View, Text, styled, useTheme } from 'tamagui'

const StyledSvg = styled(Svg, {
    width: '100%',
    height: '100%',
})

export type BarGraphProps = {
    dataSet: DataSet
    color?: string
    style?: StyleProp<ViewStyle>
    duration?: Duration
}

export type DataSet = {
    // both should be of the same length
    data: readonly number[]
    labels: readonly string[] | readonly number[]
    taskIds: readonly number[]
}

const GRAPH_ASPECT_RATIO = 9 / 16

const BarGraph = ({ dataSet, color, style }: BarGraphProps) => {
    const { data, labels, taskIds } = dataSet
    const theme = useTheme()

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
            <StyledSvg
                height={height}
                width={width}
            >
                {data.map((d, i) => (
                    <Rect
                        key={i}
                        fill={theme.borderColorPress.val}
                        fillOpacity={0.5}
                        x={x(labels[i])}
                        y={y(d)}
                        height={y(0) - y(d)}
                        width={x.bandwidth()}
                        stroke={theme.borderColorHover.val}
                        strokeWidth={2}
                    />
                ))}
                {/* Bar Labels */}
                <G>
                    {data.map((d, i) => (
                        <SvgText
                            key={i}
                            x={x(labels[i]) + x.bandwidth() / 2}
                            y={y(d) - 5}
                            fill={theme.color.val}
                            fontSize="10"
                            textAnchor="middle"
                        >
                            {
                                formatTimeToHours(d)
                                // d
                            }
                        </SvgText>
                    ))}
                </G>

                {/* Y Axis */}
                <G fill={color}>
                    <Line
                        x1={marginLeft}
                        y1={marginTop}
                        x2={marginLeft}
                        y2={height - marginBottom}
                        stroke={theme.color.val}
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
                            fill={theme.color.val}
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
                        stroke={theme.color.val}
                        strokeWidth={1}
                    />
                </G>
                <G fill="black">
                    {labels.map((label, i) => (
                        <SvgText
                            key={i}
                            x={x(label) + x.bandwidth() / 2}
                            y={height - marginBottom + 15}
                            fill={theme.color.val}
                            fontSize="12"
                            textAnchor="middle"
                        >
                            {formatDateToDayofWeek(label)}
                            {/* {label} */}
                        </SvgText>
                    ))}
                </G>
            </StyledSvg>
        </View>
    )
}

const styles = StyleSheet.create({})

export default BarGraph
