import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TouchableWithoutFeedback} from 'react-native';
import R from '../r/R';

interface NavigationButtonProps {
	active: boolean;
	onPress?: () => void;
	iconSource: any;
}

const NavigationButton = ({onPress, iconSource, active}: NavigationButtonProps) => (
	<TouchableOpacity
		onPress={onPress}
		style={[styles.navButton, active ? styles.navButtonActive : undefined]}>
		<Image source={iconSource} style={styles.navButtonImg}/>
	</TouchableOpacity>
);

export default NavigationButton;

const styles = StyleSheet.create({
	navButton: {
		width: 55,
		height: 55,
		justifyContent: 'center',
		alignItems: 'center',
	},
	navButtonActive: {
		backgroundColor: '#BA1F5C',
	},
	navButtonImg: {}
})
