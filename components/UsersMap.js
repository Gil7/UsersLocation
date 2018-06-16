import React from 'react';
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
export default class UsersMap extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let userLocationMarker = null
        if(this.props.userLocation){
            userLocationMarker = <MapView.Marker
                coordinate={
                    this.props.userLocation
                }
            />
        }
        const usersPlaces = this.props.userPlaces.map((userPlace) => {
            return (
                <MapView.Marker 
                    coordinate={userPlace}
                    key={userPlace.id}
                />
            )
        })
        return (
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={this.props.userLocation}
                >
                    {userLocationMarker}      
                    {usersPlaces}
                </MapView>
            </View>
        )
    }
}

const styles = {
    mapContainer : {
        width : '100%',
        height: 400
    },
    map : {
        width : '100%',
        height: '100%'
    }
}