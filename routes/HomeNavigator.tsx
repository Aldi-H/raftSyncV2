import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';

const Tab = createMaterialBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: '#F1F1F1' }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddPage}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
  /* return (
    <TabController items={[{ label: 'Home' }, { label: 'Add' }]}>
      <View flex>
        <TabController.TabPage index={0}>{HomePage()}</TabController.TabPage>
      </View>
      <TabController.TabBar enableShadows />
    </TabController>
  ); */
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
