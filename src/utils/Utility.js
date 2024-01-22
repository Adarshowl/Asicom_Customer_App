import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import Snackbar from 'react-native-snackbar';
import moment from 'moment/moment';

export const ShowToastMessage = msg => {
  // Toast.showWithGravity(msg + '' || '', Toast.SHORT, Toast.BOTTOM);
  Snackbar.show({
    text: msg,
    duration: Snackbar.LENGTH_LONG,
  });
};
export const ShowConsoleLogMessage = msg => {
  console.log(msg, '');
};

export const validateFieldNotEmpty = text => {
  return text ? false : true;
};

export const validateEmail = text => {
  // console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    // console.log('Email is Not Correct');
    return false;
  } else {
    // console.log('Email is Correct');
    return true;
  }
};

export const getMacAddress = async () => {
  if (Platform.OS == 'ios') {
    return await DeviceInfo.getUniqueId().toString();
  } else {
    return await DeviceInfo.getMacAddress().toString();
  }
};

// export const getDateDiff = date => {
//   try {
//     let newData = moment(date).format('yyyy-MM-DD HH:mm:ss');
//     // ShowConsoleLogMessage(date + ' date new data');
//
//     // ShowConsoleLogMessage(newData + ' new data');
//     let d1 = new Date(newData).getTime();
//     // ShowConsoleLogMessage(d1 + ' d1 new data');
//     //
//     let d2 = new Date().getTime();
//     // ShowConsoleLogMessage(d2 + ' d2 new data');
//
//     // let d3 = d2 - d1;
//     let d3 = d1 - d2;
//
//     // ShowConsoleLogMessage(d3 + ' d3 new data');
//     //
//     let seconds = d3 / 1000;
//
//     // ShowConsoleLogMessage(seconds + ' seconds new data');
//
//     if (seconds > 0) {
//       return seconds;
//     } else {
//       return seconds;
//       // return seconds * -1;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

const addOneDay = currentDateTime => {
  try {
    const currentDate = new Date(currentDateTime); // Current date and time

    // Add one day (24 hours) to the current date
    const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

    console.debug('Next day:', nextDay);

    return nextDay;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
};
export const getDateDiff = date1 => {
  try {
    // const endDate = new Date(date1); // Set the end date and time
    // const currentDate = new Date();

    const endDate = new Date(addOneDay(date1));
    const currentDate = new Date(moment().format('YYYY-MM-DDTHH:mm:ss[Z]'));

    // const remainingTime = endDate.getTime() - currentDate.getTime(); // Get the difference in milliseconds
    const remainingTime = currentDate.getTime() - endDate.getTime();
    const remainingSeconds = Math.abs(remainingTime / 1000);

    // console.debug('Remaining time in se', remainingSeconds)

    return remainingSeconds;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// export const getDateDiff = date1 => {
//   try {
//     // Parse the input dates using the Date object
//     // ShowConsoleLogMessage(date1);
//
//     const d1 = new Date(date1);
//     const d2 = new Date(moment().format('YYYY-MM-DDTHH:mm:ss[Z]'));
//
//     // Calculate the time difference in milliseconds
//     const d3 = d1 - d2;
//
//     // Convert the time difference to seconds
//     const seconds = Math.abs(d3) / 1000;
//
//     return seconds;
//   } catch (err) {
//     console.log(err);
//     // Handle the error or return an appropriate value
//     return null;
//   }
// };

// export const getDateDiff = date => {
//   try {
//     // Parse the input date using moment and consider it to be in UTC
//     let momentDate = moment.utc(date);
//     ShowConsoleLogMessage(date);
//
//     // Format the date in the desired format, including time zone offset
//     let newData = momentDate.format('YYYY-MM-DD HH:mm:ss');
//     ShowConsoleLogMessage(newData);
//     // Calculate the time difference in milliseconds
//     let d1 = momentDate.valueOf();
//     let d2 = moment().valueOf();
//     ShowConsoleLogMessage(d1);
//     ShowConsoleLogMessage(d2);
//     ShowConsoleLogMessage(moment().utc());
//
//     let d3 = d1 - d2;
//
//     // Convert the time difference to seconds
//     let seconds = d3 / 1000;
//     ShowConsoleLogMessage(seconds);
//
//     if (seconds > 0) {
//       return seconds;
//     } else {
//       return seconds;
//       // return seconds * -1;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

const LINKING_ERROR =
  "The package 'react-native-timezone' doesn't seem to be linked. Make sure: \n\n" +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

//const Timezone = NativeModules.Timezone
//? NativeModules.Timezone
// : new Proxy(
//   {},
//   {
//     get() {
//       throw new Error(LINKING_ERROR);
//     },
//   },
// );

//export {Timezone};

export function getGreeting() {
  const currentHour = new Date().getHours();
  let greeting = '';

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good afternoon';
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = 'Good evening';
  } else {
    greeting = 'Good night';
  }

  return greeting;
}
