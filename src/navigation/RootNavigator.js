/**
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from '../pages/Signin'
import Home from '../pages/Home';
import routes from './routes';
import R from "../r/R";
import ShoppingCart from "../pages/ShoppingCart";

const Stack = createStackNavigator();
const theme = {
	...DefaultTheme,
	dark: false,
	colors: {
		...DefaultTheme.colors,
		primary: '#fff',
		background: '#fff',
		card: '#D73776',
		text: '#000',
	},
};

const RootNavigator = () => {
	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator initialRouteName={routes.LOGIN}>
				<Stack.Screen
					name={routes.HOME}
					component={Home}
					options={{
						headerStyle: {
							borderBottomColor: R.Colors.NAV_COLOR,
							backgroundColor: R.Colors.NAV_COLOR,
						},
					}}
				/>
				<Stack.Screen
					name={routes.LOGIN}
					component={Signin}
					options={{
						headerShown: false,
						animationTypeForReplace: 'pop'
					}}
				/>
				<Stack.Screen
					name={routes.SHOPPING_CART}
					component={ShoppingCart}
					options={{
						title: 'Shopping Cart',
						headerTintColor: '#fff',
						headerStyle: {
							borderBottomColor: R.Colors.NAV_COLOR,
							backgroundColor: R.Colors.NAV_COLOR,
						},
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
