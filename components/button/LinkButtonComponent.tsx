import React from 'react';
import { Button, View } from 'react-native-ui-lib';
import { useChartStore } from '../../store/chartStore';
import { StyleSheet } from 'react-native';

const LinkButtonComponent = ({ deviceId }: any) => {
  const { periods, changePeriods, getAllChartData } = useChartStore();

  const handleChangePeriods = async (period: string) => {
    await getAllChartData(deviceId, period);
    console.log(period);
    changePeriods(period);
  };

  return (
    <View row center>
      {['', '1d', '1w'].map((period: string, index: number) => {
        return (
          <View key={index}>
            <Button
              row
              label={period === '' ? '30m' : period}
              link
              size="large"
              color={periods === period ? '#FEBE18' : '#617485'}
              labelStyle={styles.buttonLabelStyle}
              style={styles.buttonContainer}
              onPress={() => handleChangePeriods(period)}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  buttonLabelStyle: {
    fontWeight: '700',
    fontSize: 16,
  },
});

export default LinkButtonComponent;
