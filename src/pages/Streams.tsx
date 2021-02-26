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
	GET_LIVE_SALES_EVENTS,
} from '../api/queries';
import {useLazyQuery} from '@apollo/client'
import NavigationButton from "../components/NavigationButton";
import R from "../r/R";
import RightMenu from "../components/RightMenu";
import routes from "../navigation/routes";
import moment from "moment";

// rename streams to events
export default function Streams({navigation, route: {params: {shop}}}) {

	const [isLeftMenuActive, setIsLeftMenuActive] = useState(false);
	const [getEventsList, setEventsList] = useState([]);
	const [getEvents, eventsResponse] = useLazyQuery(GET_LIVE_SALES_EVENTS);

	useEffect(() => {
		getEvents({variables: {shopId: shop._id}})
	}, []);


	useEffect(() => {
		console.log(eventsResponse);
		if (eventsResponse.data && eventsResponse.data.liveSalesEvents) {
			setEventsList(eventsResponse.data.liveSalesEvents.nodes);
		}
	}, [eventsResponse])

	const goToEvent = (event) => {
		if (moment(event.startDate).isBefore(moment())) {
			navigation.navigate(routes.HOME, {event, shop});
		}
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
					goToEvent(item);
				}}>
				<View style={styles.itemWrapper}>
					<Text style={styles.itemTitle}>{item.title}</Text>
					<View style={styles.textTimeWrapper}>
						<Text style={styles.textTimeTitle}>{moment(item.startDate).format('MMMM DD')}</Text>
						<Text style={styles.textTimeDesc}>{moment(item.startDate).format('YYYY')}</Text>
						<Text style={styles.textTimeTitle}>{moment(item.startDate).format('HH.mm')}</Text>
						<Text style={styles.textTimeDesc}>{moment(item.startDate).format('A')}</Text>
					</View>

					<View style={styles.textStatusWrapper}>
						<Text style={styles.textStatusTitle}>Status</Text>
						<Text style={styles.textStatus}>{moment(item.startDate).isBefore(moment()) ? 'LIVE' : 'Upcoming'}</Text>
					</View>
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
						<Text style={styles.title}>Welcome to <Text style={styles.titleBold}>{shop.name}</Text></Text>
						<Text style={styles.description}>Select Stream Event</Text>

						<FlatList style={{flex: 1,}} data={getEventsList} renderItem={renderShopItem}/>

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
		borderRadius: 20,
		minHeight: 52,
		marginTop: 14,
		marginRight: 14,
		marginLeft: 14,
		flexDirection: 'column',
		padding: 20,
	},
	itemText: {
		color: R.Colors.TEXT,
		fontFamily: R.Fonts.BARLOW_REGULAR,
		fontSize: 16,
		marginLeft: 20,
		flex: 1,
	},
	itemTitle: {
		color: R.Colors.TEXT,
		fontFamily: R.Fonts.BARLOW_MEDIUM,
		fontSize: 18,
		marginLeft: 20,
		flex: 1,
		alignSelf: 'center',
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
	},
	textStatusWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
		marginTop: 10,
	},
	textStatusTitle: {
		fontFamily: R.Fonts.BARLOW_REGULAR,
		fontSize: 18,
		color: R.Colors.TEXT,

	},
	textStatus: {
		fontFamily: R.Fonts.BARLOW_MEDIUM,
		fontSize: 18,
		color: R.Colors.TEXT,
	},
	textTimeWrapper: {
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 10,
		marginTop: 15,
		marginBottom: 10,
	},
	textTimeTitle: {
		fontFamily: R.Fonts.BARLOW_MEDIUM,
		color: R.Colors.TEXT,
		fontSize: 18,
		marginRight: 5,
	},
	textTimeDesc: {
		fontFamily: R.Fonts.BARLOW_LIGHT,
		color: R.Colors.TEXT,
		fontSize: 12,
		alignSelf: 'flex-end',
		marginRight: 20,
	},
});
