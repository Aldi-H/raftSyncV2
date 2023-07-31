/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Colors, Drawer, ListItem, Text, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

import { useDeviceStore } from '../../store/deviceStore';
import { useNavigation } from '@react-navigation/native';

const ListComponent = () => {
  const navigation = useNavigation();
  const { DataDevices, getAllDevices, deleteDevice } = useDeviceStore();

  useEffect(() => {
    getAllDevices();
  }, []);

  const handleDelete = async (deviceId: string) => {
    await deleteDevice(deviceId);
    getAllDevices();
  };

  const handleItemPress = (deviceId: string) => {
    navigation.navigate('Detail', { deviceId });
  };

  return (
    <View>
      {DataDevices.map((DataDevice: { id: string; name: string }) => {
        return (
          <Drawer
            key={DataDevice.id}
            style={styles.border}
            leftItem={{
              text: 'Delete',
              background: Colors.red30,
              onPress: () => handleDelete(DataDevice.id),
            }}>
            <ListItem
              bg-white
              height={96}
              onPress={() => {
                handleItemPress(DataDevice.id);
                console.log(`Pressed ${DataDevice.id}`);
              }}>
              <ListItem.Part column containerStyle={{ paddingLeft: 32 }}>
                <ListItem.Part containerStyle={{ marginBottom: 8 }}>
                  <Text grey10 text60>
                    {DataDevice.name}
                  </Text>
                </ListItem.Part>
                <ListItem.Part>
                  <Text
                    style={{ flex: 1, marginRight: 10 }}
                    text80
                    grey40
                    numberOfLines={1}>
                    {DataDevice.id}
                  </Text>
                </ListItem.Part>
              </ListItem.Part>
            </ListItem>
          </Drawer>
        );
      })}
    </View>
    /* <Drawer
      // fullSwipeLeft={true}
      leftItem={{
        text: 'Delete',
        background: Colors.red30,
        onPress: () => console.log('delete pressed'),
      }}>
      <View centerV padding-s4 bg-white style={{ height: 60 }}>
        <Text text70>Item</Text>
      </View>
    </Drawer> */
  );
};

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey80,
  },
});

export default ListComponent;
