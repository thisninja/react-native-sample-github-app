import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';

import Notes from './Notes';
import Profile from './Profile';
import api from '../Utils/api';
import Repositories from './Repositories';

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        flex: 1
    },
    image: {
        height: 350,
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        alignSelf: 'center'
    }
});

class Dashboard extends Component {
    makeBackgroundColor() {
        var stylesObj = {
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            flex: 1
        };

        var getRandomHEXColor = function() {
            return "#" + Math.random().toString(16).slice(2, 8);
        };

        stylesObj.backgroundColor = getRandomHEXColor();

        return stylesObj;
    }

    goToUserProfile() {
        this.props.navigator.push({
            component: Profile,
            title: 'User profile',
            passProps: {userInfo: this.props.userInfo}
        });
    }

    goToRepos() {
        api.getRepos(this.props.userInfo.login)
            .then((res) => {
                this.props.navigator.push({
                    component: Repositories,
                    title: 'User repositories',
                    passProps: {
                        userInfo: this.props.userInfo,
                        repos: res
                    }
                });
            });
    }

    goToNotes() {
        api.getNotes(this.props.userInfo.login)
            .then((res) => {
                res = res || {};
                this.props.navigator.push({
                    component: Notes,
                    userInfo: this.props.userInfo,
                    passProps: {
                        userInfo: this.props.userInfo,
                        notes: res
                    }
                });
            }).catch((err) => {
                console.log('Error fetching data: ', err);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.userInfo.avatar_url}} style={styles .image}/>
                <TouchableHighlight
                    style={this.makeBackgroundColor()}
                    onPress={this.goToUserProfile.bind(this)}
                    underlayColor="#88D4F5">
                        <Text style={styles.buttonText}> View Profile </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackgroundColor()}
                    onPress={this.goToRepos.bind(this)}
                    underlayColor="#88D4F5">
                        <Text style={styles.buttonText}> View Repos </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackgroundColor()}
                    onPress={this.goToNotes.bind(this)}
                    underlayColor="#88D4F5">
                        <Text style={styles.buttonText}> View Notes </Text>
                </TouchableHighlight>
            </View>
        );
    }
};

module.exports = Dashboard;