import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Toast, Text, Typography, Colors } from 'react-native-ui-lib';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../routes/NavigationType';

import LineAreaChartComponent from '../components/charts/LineAreaChartComponent';
import CardComponent from '../components/cards/CardComponent';
import CardControlComponent from '../components/cards/CardControlComponent';
import { useChartStore } from '../store/chartStore';

type LineAreaChartScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailPage = () => {
  const { openValve } = useChartStore();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVolume, setSelectedVolume] = useState('');

  const route = useRoute<LineAreaChartScreenRouteProp>();
  const { deviceId } = route.params;

  const handleChangeVolume = async (volume: string) => {
    await openValve(deviceId, volume);
    console.log(volume);
    setSelectedVolume(volume);
    setIsVisible(true);
  };

  Typography.loadTypographies({
    text60BL: { fontSize: 18, fontWeight: '700', color: Colors.dark80 },
  });

  const RenderToast = ({ volume }: any) => {
    return (
      <Toast
        visible={isVisible}
        position={'top'}
        autoDismiss={5000}
        onDismiss={() => setIsVisible(false)}
        backgroundColor={Colors.green30}
        message={`Nutrisi Berhasil Ditambah ${volume}ml`}
        style={styles.toast}>
        <Text text60BL color={Colors.grey80} center>
          Nutrisi Berhasil Ditambah {volume}
        </Text>
      </Toast>
    );
  };

  return (
    <View useSafeArea={true}>
      <CardComponent />
      <LineAreaChartComponent />
      <CardControlComponent handleChangeVolume={handleChangeVolume} />

      {isVisible && (
        <View margin-24 style={styles.toastContainer}>
          <RenderToast volume={selectedVolume} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    padding: 20,
    borderRadius: 8,
    fontWeight: '800',
  },
  toastContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export default DetailPage;
