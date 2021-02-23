import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TouchableWithoutFeedback} from 'react-native';
import R from '../r/R';

const CartItem = ({
	                  onPress = () => {
	                  },
	                  item = {name: 'PHilip Lim Nova', size: 'M', price: '695.00'},
                  }) => {

	const [getQuantity, setQuantity] = useState(1);


	return (
		<TouchableWithoutFeedback
			onPress={onPress}>
			<View style={styles.container}>
				<Image style={styles.image} source={require('../../assets/images/demo_image_1.png')}/>
				<View style={styles.rightContainer}>
					<Text style={styles.text}>
						{item.name}
					</Text>
					<Text style={styles.text}>
						{item.size}
					</Text>
					<Text style={styles.text}>
						${item.price}
					</Text>
					<View style={styles.actionsContainer}>
						<TouchableOpacity
							onPress={() => {
								setQuantity(getQuantity == 1 ? getQuantity : getQuantity - 1);
							}}>

							<Image style={styles.icon} source={getQuantity == 1 ? R.Images.REMOVE_ICON : R.Images.MINES_ICON}/>
						</TouchableOpacity>
						<Text style={styles.quantity}>{getQuantity}</Text>
						<TouchableOpacity
							onPress={() => {
								setQuantity(getQuantity + 1);
							}}>
							<Image style={styles.icon} source={R.Images.ADD_ICON}/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CartItem;

const styles = StyleSheet.create({
	image: {
		width: 120,
		height: 120,
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: 18,
		paddingTop: 18,
		alignItems: 'stretch',
	},
	rightContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		flexGrow: 1,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
	},
	text: {
		fontFamily: R.Fonts.BARLOW_REGULAR,
		color: R.Colors.TEXT,
		fontSize: 17,
	},
	actionsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {},
	quantity: {
		fontSize: 19,
		paddingLeft: 12,
		paddingRight: 12,
		fontFamily: R.Fonts.BARLOW_LIGHT,
	},
})
