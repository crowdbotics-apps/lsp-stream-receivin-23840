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
	FlatList,
} from 'react-native';
import Colors from '../utils/Colors';
import Fonts from "../utils/Fonts";
import Images from "../utils/Images";

export default function ProductImageDialog({}) {

	const data = [
		{path: require('../../assets/images/demo_image_1.png')},
		{path: require('../../assets/images/demo_image_2.png')},
		{path: require('../../assets/images/demo_image_3.png')},
		{path: require('../../assets/images/demo_image_4.png')},
	];

	return (
		<View style={styles.container}>


			<View style={styles.closeIconWrapper}>
				<TouchableWithoutFeedback
					onPress={() => {
					}}>
					<Image
						style={styles.closeIcon}
						source={Images.CLOSE_DARK_ICON}
					/>
				</TouchableWithoutFeedback>
			</View>

			<Text
				style={styles.title}>
				Product Images
			</Text>

			<FlatList
				data={data}
				columnWrapperStyle={{}}
				renderItem={({item}) => (
					<View
						style={{
							flex: 0.5,
							marginHorizontal: 3,
							marginVertical: 3,
						}}>
						<Image
							style={styles.imageThumbnail}
							source={item.path}
							resizeMode={"stretch"}
						/>
					</View>
				)}
				//Setting the number of column
				numColumns={2}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		flexDirection: 'column',
	},
	title: {
		fontFamily: Fonts.BARLOW_BOLD,
		fontSize: 14,
		textTransform: 'uppercase',
		color: Colors.TEXT,
		marginBottom: 10,
	},
	titleSize: {
		fontFamily: Fonts.BARLOW_MEDIUM,
		fontSize: 13,
		textTransform: 'uppercase',
		color: Colors.TEXT,
		marginTop: 20,
		marginBottom: 10,
	},
	description: {
		fontFamily: Fonts.BARLOW_LIGHT,
		fontSize: 14,
		color: Colors.TEXT,
	},
	descriptionItem: {
		fontFamily: Fonts.BARLOW_LIGHT,
		fontSize: 14,
		color: Colors.TEXT,
		padding: 10,
		margin: 10,
	},
	titleItem: {
		fontFamily: Fonts.BARLOW_MEDIUM,
		fontSize: 14,
		textTransform: 'uppercase',
		color: Colors.TEXT,
	},
	itemWrapper: {},
	imageThumbnail: {
		width: '100%',
		resizeMode: 'contain',
		height: undefined,
		aspectRatio: 1,
		padding: 0,
		margin: 0,
	},
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
