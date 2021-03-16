import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TouchableWithoutFeedback, TextInput} from 'react-native';
import R from '../r/R';

const TextInputCustom = ({
	                         onChangeText = (value: string) => {
	                         },
	                         value = '',
	                         label = '',
                         }) => {

	return (
		<View style={styles.container}>
			<Text style={styles.label}>First Name</Text>
			<TextInput
				style={styles.input}
				onChangeText={onChangeText}
				value={value}
			/>
		</View>
	);
};

export default TextInputCustom;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		paddingHorizontal: 0,
	},
	input: {
		width: '100%',
		height: 40,
		borderColor: R.Colors.INPUT_BORDER,
		borderRadius: 5,
		backgroundColor: R.Colors.WHITE,
	},
	label: {
		marginBottom: 10,
	}
})
