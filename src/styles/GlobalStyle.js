import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/Colors';
import {SIZES} from '../constants/themes';
import {FONTS} from '../constants/Fonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.bg_color,
  },
  shareLikeItemText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.black,
    // marginHorizontal: 10,
  },
  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddingVertical10: {
    paddingVertical: 10,
  },
  paddingHorizontal15: {
    paddingHorizontal: 15,
  },
  bgWrapper: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    padding: 10,
  },
  shareLikeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // paddingVertical: 10,
    justifyContent: 'space-evenly',
  },
  shareLikeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    width: '90%',
    paddingVertical: 10,
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    // marginEnd:15
  },
  bothSideText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.black,
  },
  bothSideMediumText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 16,
    color: COLORS.black,
  },
  divideLine: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.gray,
    marginVertical: 3,
  },
  orderHeaderToolIcon: {
    marginEnd: 8,
    borderRadius: 50,
    height: 20,
    width: 20,
  },
  orderHeaderToolText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: COLORS.black,
  },
  orderHeaderItemWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: 'white',
  },
  viewAll: {
    marginHorizontal: 15,
    fontFamily: FONTS.semi_old,
    color: COLORS.colorPrimary,
    fontSize: 14,
    // fontWeight: 'bold',
  },
  headingText: {
    marginHorizontal: 15,
    marginVertical: 10,
    fontFamily: FONTS.semi_old,

    color: COLORS.black,
    fontSize: 18,
    // flex: 1,
  },
  sliderMainContainer: {
    height: 150,
    //   backgroundColor: 'red',
    // width: SIZES.width - 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderMainWrapper: {
    width: SIZES.width,
    height: 250,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop:0,
    // paddingHorizontal:10,
    // backgroundColor: COLORS.white,
  },
  checkoutHeading: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: COLORS.black,
    marginStart: 15,
    marginTop: 8,
  },
  cartQtyText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
    maxWidth: 40,
    minWidth: 30,
  },
  floatingAddBtn: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: COLORS.colorPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  addUpSelectionText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: COLORS.black,
    marginStart: 5,
  },
  addUpdateBG: {
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop:20
  },

  flexAlignJustifyCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  alignJustifyCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSideBlackText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.black,
    marginStart: 2,
  },
  rightSideBlackText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.black,
    marginEnd: 2,
  },
  flexRowJustifyBtwn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInputStyles: {
    fontSize: 20,
    fontFamily: FONTS.semi_old,

    textAlign: 'center',
    color: COLORS.black,
  },
  phoneContainer: {
    width: '97%',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    elevation: 0,
    height: 60,
    marginTop: 5,
    borderBottomWidth: 1,
  },
  inputContainerStyles: {
    borderBottomWidth: 2,
    borderColor: COLORS.colorPrimary,
    marginHorizontal: 4,
    height: 50,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.black,
  },
  textContainerStyle: {
    paddingVertical: 0,
    backgroundColor: COLORS.white,
    fontFamily: 'OpenSans-Medium',
    paddingHorizontal: 0,
  },
  signupModalBgTrans: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signupModalBg: {
    backgroundColor: '#00000000',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  mainContainerBgColor: {
    flex: 1,
    // backgroundColor: COLORS.bg_color,
    backgroundColor: COLORS?.white,
  },
  OnBoardingFooter: {
    backgroundColor: COLORS.white,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipNextText: {
    fontSize: 13,
    paddingVertical: 15,
    // paddingHorizontal: 40,
    marginStart: 10,
    marginEnd: 10,
    // color: COLORS.white,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'OpenSans-SemiBold',
    width: 100,
  },
  OnBoardingCenter: {
    position: 'absolute',
    right: SIZES.width / 2 - 100,
    left: SIZES.width / 2 - 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row-reverse',
  },
  loginModalBg: {
    backgroundColor: COLORS.white,
    // height: SIZES.height / 2,
    flex: 1,
    marginTop: 0,
    // borderTopRightRadius: 25,
    // borderTopLeftRadius: 25,
    padding: 10,
  },
  toolbarIconBg: {
    width: 30,
    height: 30,
    marginStart: 15,
    borderRadius: 5,
    backgroundColor: COLORS.light_gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarLastIconBg: {
    width: 30,
    height: 30,
    marginStart: 15,
    marginEnd: 10,
    borderRadius: 5,
    backgroundColor: COLORS.light_gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarAppIcon: {
    width: 30,
    height: 30,
    marginEnd: 5,
    marginStart: 15,
    borderRadius: 5,
  },
  locationBarWrapper: {
    height: 40,
    width: '93%',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    // margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    fontFamily: 'OpenSans-Regular',
    color: COLORS.black,
    fontSize: 14,
  },
  // basic margin
  allSideMargin5: {
    margin: 5,
  },
  allSideMargin10: {
    margin: 10,
  },
  marginHorizontal5: {
    marginHorizontal: 5,
  },
  marginHorizontal10: {
    marginHorizontal: 10,
  },
  marginVertical5: {
    marginVertical: 5,
  },
  marginVertical10: {
    marginVertical: 10,
  },
  marginHorizontal15: {
    marginHorizontal: 15,
  },
  marginVertical15: {
    marginVertical: 15,
  },
  marginLeft: {
    marginLeft: 10,
  },
  marginRight: {
    marginRight: 10,
  },
  marginTop: {
    marginTop: 10,
  },
  marginBottom: {
    marginBottom: 10,
  },
  // basic padding
  allSidePadding5: {
    margin: 5,
  },
  allSidePadding10: {
    margin: 10,
  },
  paddingHorizontal5: {
    paddingHorizontal: 5,
  },
  paddingHorizontal10: {
    paddingHorizontal: 10,
  },
  paddingVertical5: {
    paddingVertical: 5,
  },
  paddingVertical10: {
    paddingVertical: 10,
  },
  paddingHorizontal15: {
    paddingHorizontal: 15,
  },
  paddingVertical15: {
    paddingVertical: 15,
  },
  paddingLeft: {
    paddingLeft: 10,
  },
  paddingRight: {
    paddingRight: 10,
  },
  paddingTop: {
    paddingTop: 10,
  },
  paddingBottom: {
    paddingBottom: 10,
  },

  commonToolbarBG: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    minHeight: 56,
    elevation: 10,
  },
});
