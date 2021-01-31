import React, {
	useEffect,
	useMemo,
	useState,
	useRef,
	useLayoutEffect,
	useCallback,
} from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Text,
	TouchableWithoutFeedback,
	LayoutAnimation,
	Alert,
	ActivityIndicator,
} from 'react-native';
import Colors from '../utils/Colors';
import Fonts from "../utils/Fonts";

export default function ProductDetailDialog({}) {


	return (
		<View style={styles.container}>

			<Text style={styles.title}>
				Product Details
			</Text>
			<Text style={styles.description}>
				How fun and festive is this pumpkin graphic tee?? I love the black and white buffalo plaid and the super soft material!
			</Text>
			<Text style={styles.titleSize}>
				Available in these sizes
			</Text>
			<View style={{flexDirection: 'column'}}>

				<Text style={styles.itemWrapper}>
					<Text style={styles.titleItem}>S </Text>
					<Text style={styles.descriptionItem}>(2/4)</Text>
				</Text>
				<Text style={styles.itemWrapper}>
					<Text style={styles.title}>M </Text>
					<Text style={styles.descriptionItem}>(6/8)</Text>
				</Text>
				<Text style={styles.itemWrapper}>
					<Text style={styles.title}>L </Text>
					<Text style={styles.descriptionItem}>(10/12)</Text>
				</Text>
				<Text style={styles.itemWrapper}>
					<Text style={styles.title}>2XL </Text>
					<Text style={styles.descriptionItem}>(18)</Text>
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f00',
		height: '100%',
	},
	title: {
		fontFamily: 'Barlow-Medium',
		fontSize: 14,
		textTransform: 'uppercase',
		color: Colors.TEXT,
		marginBottom: 10,
	},

	titleSize: {
		fontFamily: 'Barlow-Medium',
		fontSize: 13,
		textTransform: 'uppercase',
		color: Colors.TEXT,
		marginTop: 20,
		marginBottom: 10,
	},
	description: {
		fontFamily: 'Barlow-Light',
		fontSize: 14,
		color: Colors.TEXT,
	},
	descriptionItem: {
		fontFamily: 'Barlow-Light',
		fontSize: 14,
		color: Colors.TEXT,
		padding: 10,
		margin: 10,
	},
	titleItem: {
		fontFamily: 'Barlow-Medium',
		fontSize: 14,
		textTransform: 'uppercase',
		color: Colors.TEXT,
	},
	itemWrapper: {}
});
