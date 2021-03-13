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
	SafeAreaView, FlatList, Button, TouchableHighlight,
} from 'react-native';
import routes from '../navigation/routes';
import {logout} from '../api/auth';
import CartItem from "../components/CartItem";
import R from "../r/R";
import NavigationButton from "../components/NavigationButton";
import {StackScreenProps} from "@react-navigation/stack";
import RightMenu from "../components/RightMenu";
import CartTabBar from "../components/CartTabBar";
import CartSubTabBar from "../components/CartSubTabBar";

export default function ShoppingCartDetail({navigation}: StackScreenProps<{ Profile: any }>) {

	const [isLeftMenuActive, setIsLeftMenuActive] = useState(false);
	const [tabPosition, setTabPosition] = useState(0);

	const items = [{}, {}, {}];


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
			headerRight: () => (
				<TouchableOpacity style={styles.cartIconContainer}>
					<View style={styles.cartIconWrapper}>
						<Image source={R.Images.CART_ICON} style={styles.cartIcon}/>
					</View>
					<View style={styles.cartTitleWrapper}>
						<Text style={styles.cartTitle}> 3</Text>
					</View>
				</TouchableOpacity>
			),
		});
	}, [navigation, isLeftMenuActive]);


	return (
		<SafeAreaView style={{flex: 1, backgroundColor: R.Colors.BACKGROUND_SECONDARY}}>
			<TouchableWithoutFeedback
				onPress={() => {
					setIsLeftMenuActive(false);
				}}>
				<View style={styles.container}>
					{isLeftMenuActive && (
						<RightMenu navigation={navigation}/>
					)}
					<View style={styles.container}>

						<View style={styles.priceContainer}>
							<Text style={styles.orderTitle}>Order Summery</Text>
							<View style={styles.spacer}/>
							<View style={styles.orderWrapper}>
								<Text style={styles.orderText}>Subtotal</Text>
								<Text style={styles.orderText}>$695.00</Text>
							</View>
							<View style={styles.orderWrapper}>
								<Text style={styles.orderText}>Shipping + handling</Text>
								<Text style={styles.orderText}>$10.00</Text>
							</View>
							<View style={styles.orderWrapper}>
								<Text style={styles.orderText}>Taxes</Text>
								<Text style={styles.orderText}>$0.00</Text>
							</View>
							<View style={styles.orderWrapperTotal}>
								<Text style={styles.orderTotal}>Total</Text>
								<Text style={styles.orderTotal}>$705.00</Text>
							</View>

						</View>

						<View style={styles.contentContainer}>

							<CartTabBar
								position={tabPosition}
								onPress={(position) => {
									// setTabPosition(position);
								}}/>

							<CartSubTabBar
								position={tabPosition}
								onPress={(position) => {
									// setTabPosition(position);
								}}/>


							<View style={styles.orderWrapper}>
								<Text style={styles.orderText}>Deliver to</Text>
							</View>
							<View style={styles.orderWrapper}>
								<Text style={styles.orderText}>No Address on file - </Text>
								<Text style={styles.orderText}>add address</Text>
							</View>

							<TouchableHighlight
								disabled
								style={styles.button}>
								<Text style={styles.buttonText}>Next</Text>
							</TouchableHighlight>

						</View>


					</View>


				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);

}

const styles = StyleSheet.create({
	orderTitle: {
		color: R.Colors.TEXT,
		fontSize: 15,
		fontFamily: R.Fonts.BARLOW_REGULAR,
		fontWeight: '700',
	},
	spacer: {
		height: 1,
		backgroundColor: '#E2E2E2',
		marginTop: 14,
		marginBottom: 5,
	},
	orderText: {
		color: R.Colors.TEXT,
		fontSize: 14,
		fontFamily: R.Fonts.BARLOW_REGULAR,
		fontWeight: '700',
		paddingTop: 5,
	},
	orderTotal: {
		color: R.Colors.TEXT,
		fontSize: 16,
		fontFamily: R.Fonts.BARLOW_REGULAR,
		fontWeight: '700',
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 25,
	},
	orderWrapper: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	orderWrapperTotal: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	priceContainer: {
		backgroundColor: R.Colors.BACKGROUND_SECONDARY,
		paddingRight: 14,
		paddingLeft: 14,
		paddingTop: 25,
	},
	contentContainer: {
		backgroundColor: R.Colors.BACKGROUND_SECONDARY,
		paddingRight: 14,
		paddingLeft: 14,
		marginTop: 10,
		flex: 1,
	},
	button: {
		height: 50,
		borderRadius: 10,
		backgroundColor: "#D73776",
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
	},
	navBar: {
		backgroundColor: R.Colors.NAV_COLOR,
		height: 45,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuIconWrapper: {
		height: 45,
		width: 45,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	navTitle: {
		fontFamily: R.Fonts.BARLOW_LIGHT,
		fontSize: 18,
		color: R.Colors.WHITE,
	},
	menuIcon: {
		height: 16,
		width: 20,
	},
	cartIconContainer: {
		height: 42,
		width: 42,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 5,
	},
	cartIconWrapper: {
		backgroundColor: R.Colors.WHITE,
		height: 30,
		width: 30,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cartIcon: {
		height: 16,
		width: 16,
		alignSelf: 'center',
		resizeMode: 'contain',
	},
	cartTitleWrapper: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		backgroundColor: R.Colors.WHITE,
		borderRadius: 40,
		borderColor: R.Colors.NAV_COLOR,
		borderWidth: 2,
		width: 19,
		height: 19,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cartTitle: {
		fontFamily: R.Fonts.BARLOW_LIGHT,
		fontSize: 12,
		padding: 0,
		marginLeft: -3,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	menu: {
		width: '100%',
		backgroundColor: '#BA1F5C',
		position: 'absolute',
		top: 0,
		left: 0,
	},
});
