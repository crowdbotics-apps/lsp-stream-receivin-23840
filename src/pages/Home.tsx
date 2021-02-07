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
} from 'react-native';
import routes from '../navigation/routes';
import {logout} from '../api/auth';
import Images from '../utils/Images';
import ProductDetailDialog from '../components/ProductDetailDialog';
import ProductImageDialog from '../components/ProductImageDialog';
import DialogManager, {DialogComponent, DialogContent, ScaleAnimation, SlideAnimation} from "react-native-dialog-component";
import Colors from '../utils/Colors';
import Fonts from "../utils/Fonts";


export default function HomeScreen({navigation}) {


	const handleLogout = () => {
		const completion = () => {
			navigation.replace(routes.LOGIN)
		}

		logout()
			.then(completion)
			.catch(completion)
	}

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
		<>
			<SafeAreaView style={{flex: 0, backgroundColor: Colors.NAV_COLOR}}/>
			<SafeAreaView style={{flex: 1, backgroundColor: Colors.NAV_COLOR, overflow: 'hidden'}}>
				<View style={styles.container}>

					<View style={styles.navBar}>

						<View style={styles.menuIconWrapper}>
							<Image source={Images.MENU_ICON} style={styles.menuIcon}/>
						</View>

						<Text style={styles.navTitle}> Order #100</Text>

						<View style={styles.cartIconContainer}>
							<View style={styles.cartIconWrapper}>
								<Image source={Images.CART_ICON} style={styles.cartIcon}/>
							</View>
							<View style={styles.cartTitleWrapper}>
								<Text style={styles.cartTitle}> 3</Text>
							</View>
						</View>

					</View>

					<View style={styles.container}>
						<Image source={Images.PLACE_HOLDER_IMAGE} style={styles.mainImage}/>
					</View>

					<View style={styles.bottomBar}>

						<View style={styles.bottomBarLeft}>

							<TouchableWithoutFeedback style={styles.cartIconContainer} onPress={() => showImagesDialog()}>
								<View style={styles.cartIconContainer}>
									<View style={styles.cartIconWrapper}>
										<Image source={Images.IMAGE_ICON} style={styles.cartIcon}/>
									</View>
								</View>
							</TouchableWithoutFeedback>

							<TouchableWithoutFeedback style={styles.cartIconContainer} onPress={() => showDetailDialog()}>
								<View style={styles.cartIconWrapper}>
									<Image source={Images.INFO_ICON} style={styles.cartIcon}/>
								</View>
							</TouchableWithoutFeedback>

						</View>

						<View style={styles.BottomBarRight}>
							<Text style={styles.BottomBarRightText}>$620.00</Text>

							<View style={styles.cartIconContainer}>
								<View style={styles.cartIconWrapper}>
									<Image source={Images.BUY_ICON} style={styles.cartIcon}/>
								</View>
							</View>
						</View>


					</View>

				</View>
			</SafeAreaView>
		</>

	);

}

const styles = StyleSheet.create({
	navBar: {
		backgroundColor: Colors.NAV_COLOR,
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
		fontFamily: Fonts.BARLOW_LIGHT,
		fontSize: 18,
		color: Colors.WHITE,
		flex: 1,
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
		backgroundColor: Colors.WHITE,
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
		backgroundColor: Colors.WHITE,
		borderRadius: 40,
		borderColor: Colors.NAV_COLOR,
		borderWidth: 2,
		width: 19,
		height: 19,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cartTitle: {
		fontFamily: Fonts.BARLOW_LIGHT,
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
	menu: {
		width: '100%',
		backgroundColor: '#BA1F5C',
		position: 'absolute',
		top: 0,
		left: 0,
	},
	bottomMenu: {
		width: '100%',
		backgroundColor: '#BA1F5C',
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
	bottomBar: {
		backgroundColor: Colors.NAV_COLOR,
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
		backgroundColor: Colors.BOTTOM_BAR_COLOR,
		height: '100%',
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	BottomBarRightText: {
		fontFamily: Fonts.BARLOW_LIGHT,
		flex: 1,
		color: Colors.WHITE,
		fontSize: 17,
		marginHorizontal: 20,
	}
});
