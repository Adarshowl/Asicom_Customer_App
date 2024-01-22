import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

const CountdownTimer = ({targetDate}) => {
  const calculateTimeRemaining = targetDate => {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const timeDifference = targetTime - now;

    if (timeDifference > 0) {
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
      );
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      return {
        days,
        hours,
        minutes,
        seconds,
      };
    } else {
      // Countdown has expired
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  };

  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(targetDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(newTimeRemaining);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <View>
      <Text>
        {timeRemaining.days.toString().padStart(2, '0')}d :{' '}
        {timeRemaining.hours.toString().padStart(2, '0')}h :{' '}
        {timeRemaining.minutes.toString().padStart(2, '0')}m :{' '}
        {timeRemaining.seconds.toString().padStart(2, '0')}s
      </Text>
    </View>
  );
};
export default CountdownTimer;
