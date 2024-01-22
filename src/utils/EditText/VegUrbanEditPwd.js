import React, {useContext,useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import styles from './styles';
import themeContext from '../../constants/themeContext';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Octicons from 'react-native-vector-icons/Octicons';



const VegUrbanEditPwd = ({ placeholder, iconPosition, secureTextEntry, onChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: COLORS.black,
      }}
    >
      {iconPosition === 'left' && (
        <SimpleLineIcons
          name="lock"
          size={20}
          color={COLORS.black}
          style={{ marginHorizontal: 15 }}
        />
      )}

      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !showPassword}
        onChangeText={onChangeText}
        style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 5 }}
      />

      {iconPosition === 'right' && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Octicons
            name={showPassword ? 'eye-closed' : 'eye'}
            size={20}
            color={COLORS.primary}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VegUrbanEditPwd;
