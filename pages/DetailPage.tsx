import React from 'react';
import { Text, View } from 'react-native-ui-lib';

import LineAreaChartComponent from '../components/charts/LineAreaChartComponent';

const DetailPage = () => {
  return (
    <View>
      <Text>Detail Page</Text>
      <LineAreaChartComponent />
    </View>
  );
};

export default DetailPage;
