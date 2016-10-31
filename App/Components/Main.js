import React, { Component } from 'react';
import {
	View,
 	Text,
 	TextInput,
 	TouchableHighlight,
 	StyleSheet,
 	ActivityIndicator
} from 'react-native';

import Dashboard from './Dashboard';

import api from '../Utils/api';

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#48BBEC'
	},
	title: {
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center',
		color: '#fff'
	},
	searchInput: {
		height: 50,
		padding: 4,
		marginRight: 5,
		fontSize: 23,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 8,
		color: 'white'
	},
	buttonText: {
		fontSize: 18,
		color: '#111',
		alignSelf: 'center'
	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
});

class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userName: '',
			isLoading: false,
			error: false
		};
	}

	handleChange(e) {
		this.setState({
			userName: e.nativeEvent.text
		});
	}

	handleSubmit(e) {
		this.setState({
			isLoading: !this.state.isLoading
		});

		api.getBio(this.state.userName)
			.then(function(res) {
				 if (res.message === 'Not Found') {
				 	this.setState({
				 		error: 'User Not Found',
				 		isLoading: false
				 	})
				 } else {
				 	this.props.navigator.push({
				 		title: res.name || 'Select an option',
				 		component: Dashboard,
				 		passProps: {userInfo: res}
				 	});

				 	this.setState({
				 		isLoading: false,
				 		error: false,
				 		userName: ''
				 	});
				 }
			}.bind(this));
	}

	render() {
		let displayError = (
			this.state.error ? <Text> {this.state.error} </Text> : <View></View>
		);

		return (
			<View style={styles.mainContainer}>
				<Text style={styles.title}> Search for a github User</Text>
				<TextInput
					style={styles.searchInput}
					value={this.state.userName}
					onChange={this.handleChange.bind(this)}
				/>
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="white">
						<Text style={styles.buttonText}> SEARCH </Text>
				</TouchableHighlight>
				{displayError}
				<ActivityIndicator
					animating={this.state.isLoading}
					color="#111"
					size="large">
				</ActivityIndicator>
			</View>
		)
	}
};

module.exports = Main;