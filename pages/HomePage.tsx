import React, { useState, useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import ListComponent from '../components/lists/ListComponent';

import { useDeviceStore } from '../store/deviceStore';

const HomePage = () => {
  const { getAllDevices } = useDeviceStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getAllDevices();
    setRefreshing(false);
  }, [getAllDevices]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ListComponent />
    </ScrollView>
  );
};

export default HomePage;
