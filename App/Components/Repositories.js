import React, { Component } from 'react';
import {
	View,
 	StyleSheet,
 	TouchableHighlight,
 	ScrollView,
 	Text
} from 'react-native';

import Badge from './Badge';
import Separator from './Helpers/Separator';
import _WebView from './Helpers/WebView';

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

class Repositories extends Component {
	openPage(url) {
		this.props.navigator.push({
			component: _WebView,
			title: 'Web page view',
			passProps: {url}
		});
	}

	render() {
		let repos = this.props.repos;

		let listOfRepos = repos.map((repo, index) => {
			var description = repos[index].description ?
				<Text style={styles.description}> {repos[index].description} </Text> :
				<View />

			return (
				<View key={index}>
					<View style={styles.rowContainer}>
						<TouchableHighlight
							onPress={this.openPage.bind(this, repos[index].html_url)}
							underlayColor="transparent">
							<Text style={styles.name}> {repos[index].name} </Text>
						</TouchableHighlight>
						<Text style={styles.stars}>Stars: {repos[index].stargazers_count} </Text>
						{description}
					</View>
					<Separator />
				</View>
			);
		});

		return (
			<ScrollView style={styles.container}>
				<Badge userInfo={this.props.userInfo} />
				{listOfRepos}
			</ScrollView>
		);
	}
}

Repositories.propTypes = {
	userInfo: React.PropTypes.object.isRequired,
	repos: React.PropTypes.array.isRequired
};

module.exports = Repositories;