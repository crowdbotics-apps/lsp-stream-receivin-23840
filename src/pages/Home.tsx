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
import routes from '../navigation/routes';
import {logout} from '../api/auth';
import Images from '../utils/Images';
import StreamListItem from '../components/StreamListItem';
import ProductDetailDialog from '../components/ProductDetailDialog';
import {FlatList} from 'react-native-gesture-handler';
import {useLazyQuery, useMutation} from '@apollo/client'
import DialogManager, {DialogComponent, DialogContent, ScaleAnimation, SlideAnimation} from "react-native-dialog-component";
import {
	GET_SHOP_ID,
	GET_LIVE_SALES_EVENTS,
	CREATE_INGEST_SERVER
} from '../api/queries';
import Colors from '../utils/Colors';

const pushserver = 'rtmp://3580eb.entrypoint.cloud.wowza.com/app-T2c38TX8/';
const stream = 'ea0c69ca';

const RESOLUTIONS = [
	{
		label: '540',
		preset: 3,
	},
	{
		label: '720',
		preset: 4,
	},
	{
		label: '1080',
		preset: 5,
	},
];

export default function HomeScreen({navigation}) {

	const cameraRef = useRef();
	const [isRightMenuActive, setIsRightMenuActive] = useState(false);
	const [isLeftMenuActive, setIsLeftMenuActive] = useState(false);
	const [isBottomMenuActive, setIsBottomMenuActive] = useState(false);
	const [isStopModalVisible, setIsStopModalVisible] = useState(false);
	const [expandedStreamId, setExpandedStreamId] = useState(0);
	const [getShopId, shopIdResponse] = useLazyQuery(GET_SHOP_ID);
	const [getLiveSales, liveSalesResponse] = useLazyQuery(GET_LIVE_SALES_EVENTS);
	const [createIngestServer, createIngestServerResponse] = useMutation(CREATE_INGEST_SERVER);

	const [options, setOptions] = useState({
		sound: true,
		resolution: RESOLUTIONS[RESOLUTIONS.length - 1],
	});


	const setResolution = (resolution) => {
		setOptions({
			...options,
			resolution,
		});
	};

	const stopStream = () => {
		setIsStopModalVisible(false);
	};

	const handleLogout = () => {
		const completion = () => {
			navigation.replace(routes.LOGIN)
		}

		logout()
			.then(completion)
			.catch(completion)
	}

	const showMyStreams = () => {
		LayoutAnimation.easeInEaseOut();
		setIsRightMenuActive(false)
		setIsLeftMenuActive(false)
		setIsBottomMenuActive(!isBottomMenuActive)
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<NavigationButton
					onPress={() => {
						setIsLeftMenuActive(!isLeftMenuActive);
						setIsRightMenuActive(false);
						setIsBottomMenuActive(false);
					}}
					iconSource={Images.MENU_ICON}
					active={isLeftMenuActive}
				/>
			),
			headerRight: () => (
				<NavigationButton
					onPress={() => {
						setIsRightMenuActive(!isRightMenuActive);
						setIsLeftMenuActive(false);
						setIsBottomMenuActive(false);
					}}
					iconSource={Images.SETTINGS_ICON}
					active={isRightMenuActive}
				/>
			),
		});
	}, [navigation, isLeftMenuActive, isRightMenuActive]);

	useEffect(() => {
		getShopId()
	}, [])

	useEffect(() => {
		if (shopIdResponse.data && shopIdResponse.data.primaryShopId) {
			getLiveSales({variables: {shopId: shopIdResponse.data.primaryShopId}})
		}
	}, [shopIdResponse])

	const renderBottomMenuItem = ({item}) => {
		const onStart = () => {
			console.log("Starting Ingest server with ID: ", item.id)
			// const params = {
			//     input: {
			//         shopId: shopIdResponse.data.primaryShopId
			//     }
			// }
			// createIngestServer({ variables: params })
			// console.log("Create Ingest Server Response: ", createIngestServerResponse.data)
		}

		return <StreamListItem
			onPress={() => {
				expandedStreamId === item.id ? setExpandedStreamId(0) : setExpandedStreamId(item.id)
			}}
			date={item.date}
			time={item.time}
			isExpanded={expandedStreamId == item.id}
			onStart={onStart}
		/>
	};

	if (shopIdResponse.loading) {
		return <ActivityIndicator size="large" color={Colors.PINK}/>
	} else if (shopIdResponse.data && shopIdResponse.data.primaryShopId) {
		console.log("SHOP ID: ", shopIdResponse.data)
		console.log("LIVE SALES: ", liveSalesResponse)
		console.log("LIVE SALES ERROR: ", liveSalesResponse.error)
	}

	const showImagesDialog = () => {
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

	return (
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
				<Image source={Images.PLACE_HOLDER_IMAGE}/>
			</View>

			<View style={styles.bottomBar}>

				<View style={styles.bottomBarLeft}>

					<View style={styles.cartIconContainer}>
						<View style={styles.cartIconWrapper}>
							<Image source={Images.IMAGE_ICON} style={styles.cartIcon}/>
						</View>
					</View>

					<TouchableWithoutFeedback style={styles.cartIconContainer} onPress={() => showImagesDialog()}>
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
		fontFamily: 'Barlow-Light',
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
		fontFamily: 'Barlow-Light',
		fontSize: 12,
		padding: 0,
		marginLeft: -3,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	container: {
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
		fontFamily: 'Barlow-Light',
		flex: 1,
		color: Colors.WHITE,
		fontSize: 17,
		marginHorizontal: 20,
	}
});
