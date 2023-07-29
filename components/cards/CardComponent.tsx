import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Card, Spacings, Text, Typography, View } from 'react-native-ui-lib';

const CardComponent = () => {
  Typography.loadTypographies({
    text60BL: { fontSize: 18, fontWeight: '700' },
    text60B: { fontSize: 16, fontWeight: '500' },
    text70BL: { fontSize: 20, fontWeight: '700' },
    text70B: { fontSize: 18, fontWeight: '500' },
  });

  Spacings.loadSpacings({
    s2: 12,
  });

  return (
    <View useSafeArea={true} center>
      <Card margin-24 paddingV-32 paddingL-24 style={styles.cardContainer}>
        <View row centerV>
          <Text text60BL>Waktu : </Text>
          <Text text60B>07 Jul 2020</Text>
        </View>

        <View row centerV>
          <Text text70BL>Kadar Nutrisi : </Text>
          <Text text70B>10000 ppm</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width - 60,
  },
});

export default CardComponent;
