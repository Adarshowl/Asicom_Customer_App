import {Platform, PermissionsAndroid} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import {STRING} from '../constants';

export const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else return true;
};

export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    getCurrentLatLong();
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        STRING.CAN_ACCESS_LOCATION = true;
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(data => {})
          .catch(err => {});
        getCurrentLatLong();
      } else if (granted === 'never_ask_again') {
        STRING.CAN_ACCESS_LOCATION = false;
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(data => {})
          .catch(err => {});
      }
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }
  }
};

export const requestContactPermission = async () => {
  if (Platform.OS === 'ios') {
    return true;
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else if (granted === 'never_ask_again') {
      }
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }
  }
};

export const getCurrentLatLong = () => {
  var currentLongitude = 0.0;
  var currentLatitude = 0.0;
  Geolocation.getCurrentPosition(
    //Will give you the current location
    position => {
      //getting the Longitude from the location json
      currentLongitude = JSON.stringify(position.coords.longitude);
      STRING.CURRENT_LONG = currentLongitude;
      //getting the Latitude from the location json
      currentLatitude = JSON.stringify(position.coords.latitude);
      STRING.CURRENT_LAT = currentLatitude;
      STRING.CAN_ACCESS_LOCATION = true;
    },
    error => {},
    {
      timeout: 30000,
    },
  );
};
