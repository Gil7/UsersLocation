import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import FetchLocation from './components/FetchLocation'
import UsersMap from './components/UsersMap'
export default class App extends React.Component {
  state = {
    userLocation: null,
    userPlaces: []
  }
  getUserPlacesHandler = () => {
    fetch('https://react-native-loc-1529175765265.firebaseio.com/places.json')
    .then(res => res.json())
    .then(places => {
      const placesArray = []
      for(const key in places){
        placesArray.push({
          longitude: places[key].longitude,
          latitude : places[key].latitude,
          id : key
        })
      }
      this.setState({
        userPlaces : placesArray
      })
    })
  }
  getUserLocationHandler = () => {    
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({userLocation : {
        latitude : position.coords.latitude,
        longitude : position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }})
      fetch('https://react-native-loc-1529175765265.firebaseio.com/places.json',{
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }, error => {
      console.log(error)
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom:20}}>
          <Button 
            onPress={this.getUserPlacesHandler}
            title="Get my Places"
          />
        </View>
        <FetchLocation 
          onGetLocation={this.getUserLocationHandler}
        />
        <UsersMap
          userLocation={this.state.userLocation}
          userPlaces={this.state.userPlaces}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
