import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Button,
  Card,
  Text,
  Typography,
  View,
  GridView,
} from 'react-native-ui-lib';

const CardControlComponent = ({ handleChangeVolume }: any) => {
  Typography.loadTypographies({
    text60BL: { fontSize: 18, fontWeight: '700' },
  });

  return (
    <View useSafeArea={true} center>
      <Card margin-24 paddingV-24 style={styles.cardContainer}>
        <Text text60BL marginL-24 marginB-15>
          Tambah Nutrisi
        </Text>
        <View row center paddingL-10>
          {['20', '50'].map((volume: string, index: number) => {
            return (
              <GridView
                key={index}
                items={[
                  {
                    title: volume,
                    onPress: () => handleChangeVolume(volume),
                  },
                ]}
                numColumns={2}
                viewWidth={100}
                renderCustomItem={() => {
                  return (
                    <Button
                      key={index}
                      marginV-5
                      label={`${volume} ml`}
                      labelStyle={styles.buttonLabelStyle}
                      size="medium"
                      style={{ width: Dimensions.get('window').width / 10 }}
                      onPress={() => handleChangeVolume(volume)}
                    />
                  );
                }}
              />
            );
          })}
        </View>
        <View row center paddingL-10>
          {['100', '200'].map((volume: string, index: number) => {
            return (
              <GridView
                key={index}
                items={[
                  {
                    title: volume,
                    onPress: () => handleChangeVolume(volume),
                  },
                ]}
                numColumns={2}
                viewWidth={100}
                renderCustomItem={() => {
                  return (
                    <Button
                      key={index}
                      marginV-5
                      label={`${volume} ml`}
                      labelStyle={styles.buttonLabelStyle}
                      size="medium"
                      style={{ width: Dimensions.get('window').width / 10 }}
                      onPress={() => handleChangeVolume(volume)}
                    />
                  );
                }}
              />
            );
          })}
        </View>
      </Card>
    </View>
  );
};

/* <GridView key={index} paddingR-10>
                <Button
                  label={`${volume} ml`}
                  labelStyle={styles.buttonLabelStyle}
                  size="medium"
                  style={{ width: Dimensions.get('window').width / 5 }}
                  onPress={() => handleChangeVolume(volume)}
                />
              </GridView> */

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width - 60,
  },
  buttonLabelStyle: {
    fontWeight: '700',
    fontSize: 14,
  },
  toastContainer: {
    position: 'absolute',
    top: '5%',
    left: 0,
    right: 0,
    alignItems: 'center', // Center horizontally
  },
});

export default CardControlComponent;
