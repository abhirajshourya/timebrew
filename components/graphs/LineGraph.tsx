import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as d3 from 'd3'
import { Svg, Path } from 'react-native-svg'

export type LineGraphProps = {
    data: number[]
    color: string
    label: string
    stat: string
}

const GRAPH_ASPECT_RATIO = 9 / 16

const LineGraph = ({ data, color, label, stat }: LineGraphProps) => {
    const [width, setWidth] = useState(0)
    const height = width * GRAPH_ASPECT_RATIO

    const min = Math.min(...data)
    const max = Math.max(...data)

    const yScale = d3.scaleLinear().domain([min, max]).range([height, 0])
    const xScale = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width])

    const LineCurve = d3.curveMonotoneX

    const lineFn = d3
        .line<number>()
        .x((d: any, i: any) => xScale(i))
        .y((d: any) => yScale(d))
        .curve(LineCurve)
    const areaFn = d3
        .area<number>()
        .x((d: any, i: any) => xScale(i))
        .y0(height)
        .y1((d: any) => yScale(d))
        .curve(LineCurve)

    const zeroLine = yScale(0)

    const svgLine = lineFn(data)
    const svgArea = areaFn(data)

    return (
        <View
            onLayout={(event) => {
                setWidth(event.nativeEvent.layout.width)
            }}
        >
            <Svg height={height} width={width}>
                <Path d={svgLine} fill="none" stroke={color} strokeWidth="2" />
                <Path
                    d={`M0 ${zeroLine} H${width}`}
                    stroke="black"
                    strokeWidth="1"
                    strokeDasharray="4"
                />
                <Path d={svgArea} fill={color} fillOpacity="0.1" />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({})

export default LineGraph
