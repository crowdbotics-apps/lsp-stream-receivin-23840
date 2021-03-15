import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TouchableWithoutFeedback} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import R from '../r/R';

const CartDeliveryTabBar = ({
	                            onPress = (position: number) => {
	                            },
	                            position = 0,
                            }) => {


	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => onPress(0)}
				style={[styles.item0, position == 0 ? styles.item0Active : {}]}>
				<RadioButtonInput
					obj={{label: '', value: 0}}
					index={0}
					isSelected={position === 0}
					onPress={onPress}
					borderWidth={3}
					buttonInnerColor={R.Colors.LIGHT_PINK}
					buttonOuterColor={R.Colors.LIGHT_PINK}
					buttonSize={7}
					buttonOuterSize={18}
					buttonStyle={{}}
					buttonWrapStyle={{marginLeft: 0, marginRight: 10}}
				/>
				<Text style={position == 0 ? styles.textActive : styles.text}>
					Delivery
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => onPress(2)}
				style={[styles.item2, position == 2 ? styles.item2Active : {}]}>
				<RadioButtonInput
					obj={{label: '', value: 2}}
					index={0}
					isSelected={position === 2}
					onPress={onPress}
					borderWidth={3}
					buttonInnerColor={R.Colors.LIGHT_PINK}
					buttonOuterColor={R.Colors.LIGHT_PINK}
					buttonSize={6}
					buttonOuterSize={17}
					buttonStyle={{}}
					buttonWrapStyle={{marginLeft: 0, marginRight: 10}}
				/>
				<Text style={position == 2 ? styles.textActive : styles.text}>
					Local Pickup
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CartDeliveryTabBar;

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
		flexDirection: 'row',
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderBottomWidth: 1,
		borderColor: R.Colors.BORDER_COLOR,
		borderBottomLeftRadius: 10,
		borderTopLeftRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: R.Colors.WHITE,
	},
	item0Active: {
		borderColor: R.Colors.LIGHT_PINK,
		borderRightWidth: 1,
	},
	item2: {
		flex: 1,
		flexGrow: 1,
		flexDirection: 'row',
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: R.Colors.BORDER_COLOR,
		borderBottomRightRadius: 10,
		borderTopRightRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: R.Colors.WHITE,
	},
	item2Active: {
		borderColor: R.Colors.LIGHT_PINK,
		borderLeftWidth: 1,
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
