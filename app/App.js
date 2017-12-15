import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from'./components/Home';

export default lost = StackNavigator(
	{
		Home: {screen: Home},
	},
	{
		headerMode: 'screen',
		navigationOptions: {
			header: (
	 		<View>
	 		<View style={{
				zIndex: 99,
				height: Platform.OS === 'ios' ? 20 : 0,
				backgroundColor: 'black',
				}}/>
			<StatusBar barStyle='light-content'/>
			</View>
			),
		},
	}
);
