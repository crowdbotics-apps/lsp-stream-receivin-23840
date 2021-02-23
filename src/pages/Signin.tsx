import React, {useState} from 'react'
import {Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator} from 'react-native'
import {authenticateUser} from "../api/auth"
import routes from '../navigation/routes';
import R from "../r/R";

export default function Signin({navigation}) {

	const [loading, setLoading] = useState(false);

	const handleLogin = () => {

		setLoading(true)
		const completion = () => {
			setLoading(false)
			navigation.replace(routes.SHOPS)
		}

		authenticateUser()
			?.then(completion)
			?.catch(completion)
	}

	return (
		<View style={{flex: 1}}>
			<SafeAreaView style={{flex: 0, backgroundColor: R.Colors.LIGHT_PINK}}/>
			<SafeAreaView style={{flex: 1}}>
				<View style={{backgroundColor: '#D73776', flexGrow: 0.2, justifyContent: 'center', alignItems: 'center'}}>
					<Image source={R.Images.LOGO_IMAGE}/>
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', flexGrow: 0.3}}>
					<View style={{flexDirection: 'row'}}>
						<Text style={{fontSize: 24, fontFamily: 'Barlow', fontWeight: '400'}}>Welcome to </Text>
						<Text style={{fontSize: 24, fontFamily: 'Barlow', fontWeight: '700'}}>Live Stream</Text>
					</View>
					<Text style={{fontSize: 18, fontFamily: 'Barlow'}}>Sign In</Text>
				</View>
				<View style={styles.buttonContainer}>
					{loading ? <ActivityIndicator animating={true} color={R.Colors.PINK}/> :
						<TouchableOpacity style={styles.button} onPress={() => {
							handleLogin()
						}}><Text style={styles.buttonText}>Sign In</Text></TouchableOpacity>
					}
				</View>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: R.Colors.LIGHT_PINK,
		borderRadius: 25,
		height: 50,
		paddingVertical: 15
	},
	buttonText: {
		color: R.Colors.WHITE,
		textAlign: 'center',
		fontFamily: 'Roboto',
		fontSize: 16,
		fontWeight: 'bold'
	},
	inputLabel: {
		fontFamily: 'Barlow',
		fontWeight: '400',
		fontSize: 18,
		color: '#c4c4c4'
	},
	inputText: {
		fontFamily: 'Roboto',
		fontWeight: '400',
		fontSize: 18,
		color: '#464646',
	},
	inputContainer: {
		height: 80,
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		borderBottomColor: '#c4c4c4',
		borderBottomWidth: 1
	},
	buttonContainer: {
		paddingHorizontal: 40,
		flexGrow: 0.5,
		justifyContent: 'center'
	}
})
