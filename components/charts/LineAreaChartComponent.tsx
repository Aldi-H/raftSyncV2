import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, PanResponder, View, StyleSheet } from 'react-native';
import { AreaChart, XAxis } from 'react-native-svg-charts';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as shape from 'd3-shape';

import { useChartStore } from '../../store/chartStore';
import { RootStackParamList } from '../../routes/NavigationType';
import {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import LinkButtonComponent from '../button/LinkButtonComponent';

const apx = (size: number = 0) => {
  let width = Dimensions.get('window').width;
  return (width / 750) * size;
};

type LineAreaChartScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const LineAreaChartComponent = () => {
  const { yAxisPpmValue, xAxisDateValue, periods, getAllChartData } =
    useChartStore();

  const [positionX, setPositionX] = useState(-1);

  const route = useRoute<LineAreaChartScreenRouteProp>();
  const { deviceId } = route.params;

  const size = useRef(xAxisDateValue.length);

  useEffect(() => {
    getAllChartData(deviceId, periods);
  }, []);

  useEffect(() => {
    size.current = xAxisDateValue.length;
  }, [xAxisDateValue]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => true,

      onPanResponderGrant: evt => {
        updatePosition(evt.nativeEvent.locationX);
        return true;
      },

      onPanResponderMove: evt => {
        updatePosition(evt.nativeEvent.locationX);
        return true;
      },

      onPanResponderRelease: () => {
        setPositionX(-1);
      },
    }),
  );

  const updatePosition = (x: number) => {
    const yAxisWidth = apx(130);
    const x0 = apx(0);
    const chartWidth = apx(750) - yAxisWidth - x0;
    const xN = x0 + chartWidth;
    const xDistance = chartWidth / size.current;

    if (x <= x0) {
      x = x0;
    }

    if (x >= xN) {
      x = xN;
    }

    let value = Math.round((x - x0) / xDistance);
    if (value >= size.current - 1) {
      value = size.current - 1;
    }

    setPositionX(Number(value));
  };

  const CustomLine = ({ line }: any) => {
    return (
      <Path
        key="line"
        d={line}
        stroke="#FEBE18"
        strokeWidth={apx(4)}
        fill="none"
      />
    );
  };

  const CustomGradient = () => {
    return (
      <Defs key="gradient">
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FEBE18" stopOpacity={0.25} />
          <Stop offset="100%" stopColor="#FEBE18" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    );
  };

  const Tooltip = ({ x, y, ticks }: any) => {
    if (positionX < 0) {
      return null;
    }

    const date = xAxisDateValue[positionX];
    const ppm = yAxisPpmValue[positionX];

    return (
      <G x={x(positionX)} key="tooltip">
        <G
          x={positionX > yAxisPpmValue.length / 2 ? -apx(300 + 10) : apx(10)}
          y={y(ppm) - apx(10)}>
          <Rect
            y={-apx(24 + 24 + 20) / 2}
            rx={apx(12)}
            ry={apx(12)}
            width={apx(200)}
            height={apx(96)}
            stroke="rgba(254, 190, 24, 0.27)"
            fill="rgba(255, 255, 255, 0.8)"
          />

          <SvgText x={apx(20)} fill="#617485" opacity={0.65} fontSize={apx(24)}>
            {date}
          </SvgText>
          <SvgText
            x={apx(20)}
            y={apx(24 + 20)}
            fontSize={apx(24)}
            fontWeight="bold"
            fill="rgba(224, 188, 136, 1)">
            {ppm} ppm
          </SvgText>
        </G>

        <G x={x}>
          <Line
            y1={ticks[0]}
            y2={ticks[Number(ticks.length)]}
            stroke="#FEBE18"
            strokeWidth={apx(4)}
            strokeDasharray={[6, 3]}
          />

          <Circle
            cy={y(ppm)}
            r={apx(20 / 2)}
            stroke="#fff"
            strokeWidth={apx(2)}
            fill="#FEBE18"
          />
        </G>
      </G>
    );
  };

  const verticalContentInset = { top: apx(40), bottom: apx(40) };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View
          style={styles.chartContainer}
          {...panResponder.current.panHandlers}>
          <AreaChart
            style={styles.areaChart}
            data={yAxisPpmValue}
            curve={shape.curveMonotoneX}
            contentInset={{ ...verticalContentInset }}
            svg={{ fill: 'url(#gradient)' }}>
            <CustomLine />
            <CustomGradient />
            <Tooltip />
          </AreaChart>
        </View>
      </View>
      <XAxis
        style={styles.xAxisContainer}
        numberOfTicks={3}
        data={yAxisPpmValue}
        formatLabel={value => xAxisDateValue[value]}
        contentInset={{
          left: apx(50),
          right: apx(120),
        }}
        svg={{
          fontSize: apx(20),
          fill: '#617485',
          y: apx(20),
        }}
      />

      <LinkButtonComponent deviceId={deviceId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
  },
  flexContainer: {
    flexDirection: 'row',
    width: apx(750),
    height: apx(570),
    alignSelf: 'stretch',
    paddingHorizontal: apx(8),
  },
  chartContainer: { flex: 1 },
  areaChart: {
    flex: 1,
  },
  xAxisContainer: {
    alignSelf: 'stretch',
    width: apx(800),
    height: apx(60),
  },
});

export default LineAreaChartComponent;
