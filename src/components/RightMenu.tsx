import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TouchableWithoutFeedback} from 'react-native';
import R from '../r/R';
import MenuItem from "./MenuItem";
import {logout} from "../api/auth";
import {StackScreenProps} from "@react-navigation/stack";
import routes from '../navigation/routes';

const RightMenu = ({navigation}: StackScreenProps<{ Profile: any }>) => {

	const handleLogout = () => {
		const completion = () => {
			navigation.replace(routes.LOGIN)
		}

		logout()
			.then(completion)
			.catch(completion)
	}

	return (
		<View style={[styles.menu]}>
			<MenuItem
				onPress={() => {
					navigation.navigate(R.Routes.SHOPS);
				}}
				iconSource={R.Images.SHOP_ICON}
				label={'Shops'}
			/>
			<MenuItem
				onPress={() => {
					navigation.navigate(R.Routes.ORDERS);
				}}
				iconSource={R.Images.ORDER_ICON}
				label={'Orders'}
			/>
			<MenuItem
				onPress={() => {
					handleLogout()
				}}
				iconSource={R.Images.LOGOUT_ICON}
				label={'Log out'}
			/>
		</View>
	);

};

export default RightMenu;

const styles = StyleSheet.create({
	menu: {
		width: '100%',
		backgroundColor: '#BA1F5C',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 10,
	},
})
