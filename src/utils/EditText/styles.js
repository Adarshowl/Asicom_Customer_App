import {I18nManager, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/Colors';

export default StyleSheet.create({
  wrapper: {
    height: 60,
    // borderRadius: 0,
    paddingHorizontal: 10,
    // marginTop: 5,
    alinItem: 'center',
    marginBottom: 10,
    // backgroundColor: COLORS.gray,
  },
  inputContainer: {
    // paddingVertical: 10,
    // paddingHorizontal: 5,
    // backgroundColor: COLORS.gray,
  },
  textInput: {
    flex: 1,
    width: '100%',
    // fontSize: 12,
    fontFamily: 'Gilroy-Bold',
    color: COLORS.black,
    letterSpacing: 1,
    borderRadius: 5,
    // backgroundColor: COLORS.gray,

    fontFamily: 'Quicksand-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  error: {
    color: COLORS.red,
    paddingTop: 4,
    fontSize: 13,
    fontFamily: 'Gilroy-Bold',

    // fontFamily: 'Quicksand-Regular',
  },
  label: {
    fontSize: 16.5,
    color: COLORS.black,
    // fontWeight:'bold',
    // fontFamily: 'Gilroy-Bold',
  },
});
/**
 *
 wrapper: {
    height: 55,
    borderRadius: 0,
    paddingHorizontal: 5,
    marginTop: 5,
    // backgroundColor: COLORS.white,
  },
 inputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
 textInput: {
    flex: 1,
    width: '80%',
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    color: COLORS.black,
    letterSpacing: 1,
    // fontFamily: 'Quicksand-Regular',
  },
 error: {
    color: COLORS.red,
    paddingTop: 4,
    fontSize: 13,
    fontFamily: 'Gilroy-Bold',

    // fontFamily: 'Quicksand-Regular',
  },
 label: {
    fontSize: 16,
    color: COLORS.labelColor,
    // fontFamily: 'Quicksand-Regular',
    fontFamily: 'Gilroy-Bold',
  },
 */
