import React, { Component } from 'react';
import {
	View,
 	StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
    separator: {
        borderColor: '#E4E4E4',
        borderWidth: 1
    },
});

class Separator extends Component {
    render() {
        return (
            <View style={styles.separator} />
        );
    }
}

module.exports = Separator;