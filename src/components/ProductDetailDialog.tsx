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
import R from "../r/R";

export default function ProductDetailDialog({}) {


	return (
		<View style={styles.container}>


			<View style={styles.closeIconWrapper}>
				<TouchableWithoutFeedback
					onPress={() => {
					}}>
					<Image
						style={styles.closeIcon}
						source={R.Images.CLOSE_DARK_ICON}
					/>
				</TouchableWithoutFeedback>
			</View>


			<Text
				style={styles.title}>
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
		height: '100%',
	},
	title: {
		fontFamily: R.Fonts.BARLOW_MEDIUM,
		fontSize: 14,
		textTransform: 'uppercase',
		color: R.Colors.TEXT,
		marginBottom: 10,
	},

	titleSize: {
		fontFamily: R.Fonts.BARLOW_MEDIUM,
		fontSize: 13,
		textTransform: 'uppercase',
		color: R.Colors.TEXT,
		marginTop: 20,
		marginBottom: 10,
	},
	description: {
		fontFamily: R.Fonts.BARLOW_LIGHT,
		fontSize: 14,
		color: R.Colors.TEXT,
	},
	descriptionItem: {
		fontFamily: R.Fonts.BARLOW_LIGHT,
		fontSize: 14,
		color: R.Colors.TEXT,
		padding: 10,
		margin: 10,
	},
	titleItem: {
		fontFamily: R.Fonts.BARLOW_MEDIUM,
		fontSize: 14,
		textTransform: 'uppercase',
		color: R.Colors.TEXT,
	},
	itemWrapper: {},
	closeIcon: {
		width: 20,
		height: 20,
	},
	closeIconWrapper: {
		width: 20,
		height: 20,
		alignSelf: 'flex-end',
		top: 0,
		right: 0,
		position: 'absolute'
	},
});
