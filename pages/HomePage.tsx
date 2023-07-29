import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ListComponent from '../components/lists/ListComponent';

const HomePage = () => {
  return (
    <ScrollView>
      <ListComponent />
    </ScrollView>
  );
};

export default HomePage;
