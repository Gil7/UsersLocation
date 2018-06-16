import React from 'react';
import { View, Button } from 'react-native';
export default class FetchLocation extends React.Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <View>
                <Button
                    title="Get Location"
                    onPress={this.props.onGetLocation}
                />
            </View>
        )
    }
}