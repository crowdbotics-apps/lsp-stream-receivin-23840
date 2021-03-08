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
	SafeAreaView,
	Button,
} from 'react-native';
import ProductDetailDialog from '../components/ProductDetailDialog';
import ProductImageDialog from '../components/ProductImageDialog';
import DialogManager, {DialogComponent, DialogContent, ScaleAnimation, SlideAnimation} from "react-native-dialog-component";
import {
	GET_INGEST_SERVER_DETAILS,
	GET_PRODUCTS,
} from '../api/queries';
import {useLazyQuery} from '@apollo/client'
import {IngestServerDetailsRequest} from "../models/IngestServerDetailsRequest";
import {IngestServerDetailsResponse} from "../models/IngestServerDetailsResponse";
import NavigationButton from "../components/NavigationButton";
import R from "../r/R";
import RightMenu from "../components/RightMenu";
import {NodePlayerView} from 'react-native-nodemediaclient';
import routes from "../navigation/routes";


export default function HomeScreen({navigation, route: {params: {event, shop}}}) {

	const [isLeftMenuActive, setIsLeftMenuActive] = useState(false);
	const [getIngestServerDetails, ingestServerDetailsResponse] = useLazyQuery<IngestServerDetailsResponse, IngestServerDetailsRequest>(GET_INGEST_SERVER_DETAILS);
	const [getProducts, products] = useLazyQuery(GET_PRODUCTS);
	const [getIngestServer, setIngestServer] = useState(null);


	useEffect(() => {
		getIngestServerDetails({variables: {shopId: shop._id, eventId: event._id}});
		getProducts({variables: {shopId: shop._id, id: event._id}});
	}, []);


	useEffect(() => {
		console.log(ingestServerDetailsResponse);
		if (ingestServerDetailsResponse.data && ingestServerDetailsResponse.data.getIngestServerDetails) {
			setIngestServer(ingestServerDetailsResponse.data.getIngestServerDetails);
		}
	}, [ingestServerDetailsResponse])

	useEffect(() => {
		console.log('products', products);
	}, [products])

	const goToShoppingScreen = () => {
		navigation.navigate(routes.SHOPPING_CART);
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
			headerTitle: () => (
				<View>
					<Text style={styles.navTitle}> {event.title}</Text>
				</View>
			),
			headerRight: () => (
				<TouchableOpacity onPress={goToShoppingScreen} style={styles.cartIconContainer}>
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


	const showDetailDialog = () => {
		let config = {
			animationDuration: 200,
			ScaleAnimation: new ScaleAnimation(),
			dialogAnimation: new SlideAnimation({slideFrom: 'bottom'}),
			dialogStyle: [{padding: 0, borderRadius: 14, width: '90%', height: '45%', margin: 10,}],
			children: (
				<DialogContent style={{height: '100%', marginHorizontal: 0, padding: 0}}>
					<ProductDetailDialog/>
				</DialogContent>
			),
		};
		DialogManager.show(config, () => {
			console.log('callback - update dialog');
		});
	}

	const showImagesDialog = () => {
		let config = {
			animationDuration: 200,
			ScaleAnimation: new ScaleAnimation(),
			dialogAnimation: new SlideAnimation({slideFrom: 'bottom'}),
			dialogStyle: [{padding: 0, borderRadius: 14, width: '90%', height: '45%', margin: 10,}],
			children: (
				<DialogContent style={{height: '100%', marginHorizontal: 0, padding: 0}}>
					<ProductImageDialog/>
				</DialogContent>
			),
		};
		DialogManager.show(config, () => {
			console.log('callback - update dialog');
		});
	}

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: R.Colors.NAV_COLOR}}>
			<TouchableWithoutFeedback
				onPress={() => {
					setIsLeftMenuActive(false);
				}}>
				<View style={styles.container}>
					{isLeftMenuActive && (
						<RightMenu navigation={navigation}/>
					)}

					<View style={styles.container}>
						{/*<Image source={R.Images.PLACE_HOLDER_IMAGE} style={styles.mainImage}/>*/}
						<NodePlayerView
							style={styles.mainImage}
							inputUrl={getIngestServer?.outputUrl}
							scaleMode={"ScaleAspectFit"}
							bufferTime={300}
							maxBufferTime={1000}
							autoplay={true}
						/>
					</View>

					<View style={styles.bottomBar}>

						<View style={styles.bottomBarLeft}>

							<TouchableWithoutFeedback style={styles.cartIconContainer} onPress={() => showImagesDialog()}>
								<View style={styles.cartIconContainer}>
									<View style={styles.cartIconWrapper}>
										<Image source={R.Images.IMAGE_ICON} style={styles.cartIcon}/>
									</View>
								</View>
							</TouchableWithoutFeedback>

							<TouchableWithoutFeedback style={styles.cartIconContainer} onPress={() => showDetailDialog()}>
								<View style={styles.cartIconWrapper}>
									<Image source={R.Images.INFO_ICON} style={styles.cartIcon}/>
								</View>
							</TouchableWithoutFeedback>

						</View>

						<View style={styles.BottomBarRight}>
							<Text style={styles.BottomBarRightText}>$620.00</Text>

							<View style={styles.cartIconContainer}>
								<View style={styles.cartIconWrapper}>
									<Image source={R.Images.BUY_ICON} style={styles.cartIcon}/>
								</View>
							</View>
						</View>


					</View>

				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);

}

const styles = StyleSheet.create({
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
	},
	mainImage: {
		width: '100%',
		flex: 1,
	},
	bottomBar: {
		backgroundColor: R.Colors.NAV_COLOR,
		height: 45,
		flexDirection: 'row',
		alignItems: 'center',
	},
	bottomBarLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
	},
	BottomBarRight: {
		backgroundColor: R.Colors.BOTTOM_BAR_COLOR,
		height: '100%',
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	BottomBarRightText: {
		fontFamily: R.Fonts.BARLOW_LIGHT,
		flex: 1,
		color: R.Colors.WHITE,
		fontSize: 17,
		marginHorizontal: 20,
	},
});
