import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TouchableWithoutFeedback} from 'react-native';
import R from '../r/R';

const CartTabBar = ({
	                    onPress = (position: number) => {
	                    },
	                    position = 1,
                    }) => {


	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => onPress(0)}
				style={[styles.item0, position == 0 ? styles.item0Active : {}]}>
				<Text style={position == 0 ? styles.textActive : styles.text}>
					Shipping
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => onPress(1)}
				style={[styles.item1,
					position == 1 ? styles.item1Active : {},
					position == 0 ? styles.item1LeftActive : {},
					position == 2 ? styles.item1RightActive : {}
				]}>
				<Text style={position == 1 ? styles.textActive : styles.text}>
					Billing
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => onPress(2)}
				style={[styles.item2, position == 2 ? styles.item2Active : {}]}>
				<Text style={position == 2 ? styles.textActive : styles.text}>
					Confirmation
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CartTabBar;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: 0,
		paddingTop: 18,
		height: 70,
	},
	item0: {
		flex: 1,
		flexGrow: 1,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderBottomWidth: 1,
		borderColor: R.Colors.BORDER_COLOR,
		borderBottomLeftRadius: 10,
		borderTopLeftRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	item0Active: {
		borderColor: R.Colors.LIGHT_PINK,
	},
	item1: {
		flex: 1,
		flexGrow: 1,
		borderWidth: 1,
		borderColor: R.Colors.BORDER_COLOR,
		justifyContent: 'center',
		alignItems: 'center',
	},
	item1Active: {
		borderColor: R.Colors.LIGHT_PINK,
	},
	item1LeftActive: {
		borderLeftColor: R.Colors.LIGHT_PINK,
	},
	item1RightActive: {
		borderRightColor: R.Colors.LIGHT_PINK,
	},
	item2: {
		flex: 1,
		flexGrow: 1,
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: R.Colors.BORDER_COLOR,
		borderBottomRightRadius: 10,
		borderTopRightRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	item2Active: {
		borderColor: R.Colors.LIGHT_PINK,
	},
	text: {
		fontSize: 17,
		fontFamily: R.Fonts.BARLOW_REGULAR,
		color: R.Colors.TEXT,
	},
	textActive: {
		fontSize: 17,
		color: R.Colors.LIGHT_PINK,
		fontFamily: R.Fonts.BARLOW_BOLD,
	},
})
