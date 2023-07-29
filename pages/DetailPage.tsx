import React from 'react';
import { View } from 'react-native-ui-lib';

import LineAreaChartComponent from '../components/charts/LineAreaChartComponent';
import CardComponent from '../components/cards/CardComponent';

const DetailPage = () => {
  return (
    <View useSafeArea={true}>
      <CardComponent />
      <LineAreaChartComponent />
    </View>
  );
};

export default DetailPage;
