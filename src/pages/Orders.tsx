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
	SafeAreaView, Button, FlatList,
} from 'react-native';
import {
	GET_SHOPS,
} from '../api/queries';
import {useLazyQuery} from '@apollo/client'
import NavigationButton from "../components/NavigationButton";
import R from "../r/R";
import RightMenu from "../components/RightMenu";
import {StackScreenProps} from "@react-navigation/stack";
import routes from "../navigation/routes";


export default function Orders({navigation}: StackScreenProps<{ Profile: any }>) {

	const [isLeftMenuActive, setIsLeftMenuActive] = useState(false);
	const [getShopsList, setShopsList] = useState([]);
	const [getShops, shopsResponse] = useLazyQuery(GET_SHOPS);

	useEffect(() => {
		getShops()
	}, [])


	useEffect(() => {
		console.log(shopsResponse);
		if (shopsResponse.data && shopsResponse.data.shops && shopsResponse.data.shops.nodes) {
			if (shopsResponse.data.shops.nodes.length == 1) {
				goToShop(shopsResponse.data.shops.nodes[0]);
			}
			setShopsList(shopsResponse.data.shops.nodes);
		}
	}, [shopsResponse])

	const goToShop = (shop) => {
		navigation.navigate(routes.EVENTS, {shop: shop});
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<NavigationButton
					onPress={() => {
						setIsLeftMenuActive(!isLeftMenuActive);
					}}
					iconSource={R.Images.MENU_ICON}
					active={isLeftMenuActive}
				/>
			),
		});
	}, [navigation, isLeftMenuActive]);

	const renderShopItem = ({item}) => {
		return (
			<TouchableOpacity
				onPress={() => {
					goToShop(item);
				}}>
				<View style={styles.itemWrapper}>
					<Image source={{uri: item.shopLogoUrls?.primaryShopLogoUrl}} style={styles.itemImage}/>
					<Text style={styles.itemText}>{item.name}</Text>
					<Image source={R.Images.PLAY_ICON} style={styles.itemPlayIcon}/>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: R.Colors.WHITE}}>
			<TouchableWithoutFeedback
				onPress={() => {
					setIsLeftMenuActive(false);
				}}>
				<View style={styles.container}>
					{isLeftMenuActive && (
						<RightMenu navigation={navigation}/>
					)}

					<View style={styles.container}>

						{/*<FlatList data={getShopsList} renderItem={renderShopItem}/>*/}

						<Text>No Order</Text>
					</View>


				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);

}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontFamily: R.Fonts.BARLOW_REGULAR,
		alignSelf: 'center',
		marginTop: 30,
	},
	titleBold: {
		fontWeight: 'bold',
	},
	description: {
		fontSize: 20,
		fontFamily: R.Fonts.BARLOW_REGULAR,
		alignSelf: 'center',
		marginTop: 10,
	},
	itemWrapper: {
		backgroundColor: '#F9F9F9',
		borderRadius: 10,
		minHeight: 52,
		marginTop: 14,
		marginRight: 14,
		marginLeft: 14,
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center',
	},
	itemText: {
		color: R.Colors.TEXT,
		fontFamily: R.Fonts.BARLOW_REGULAR,
		fontSize: 16,
		marginLeft: 20,
		flex: 1,
	},
	itemImage: {
		width: 50,
		height: 50,
	},
	itemPlayIcon: {
		width: 14,
		height: 14,
		resizeMode: 'contain',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
