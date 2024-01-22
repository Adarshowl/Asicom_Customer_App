import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {COLORS} from '../constants/Colors';

export const ProductDetailsSkeleton = () => {
  return (
    <View>
      <View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={350}
          width={Dimensions.get('window').width - 0}
          style={{
            backgroundColor: COLORS.colorPrimary,
            alignItems: 'center',
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={40}
          width={80}
          style={{
            alignSelf: 'flex-end',
            marginTop: -40,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        height={40}
        width={Dimensions.get('window').width - 0}
        style={{
          marginTop: 1,
        }}
      />
      <View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={120}
          height={20}
          style={{
            alignSelf: 'center',
            marginTop: 15,
            borderRadius: 5,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={38}
          width={Dimensions.get('window').width - 55}
          style={{
            alignSelf: 'center',
            borderRadius: 5,
            marginTop: 15,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={130}
          height={20}
          style={{
            alignSelf: 'center',
            borderRadius: 5,
            marginTop: 15,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={290}
          height={70}
          style={{
            alignSelf: 'flex-start',
            marginStart: 25,
            marginTop: 20,
            borderRadius: 5,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={95}
          height={20}
          style={{
            alignSelf: 'center',
            marginTop: 40,
            borderRadius: 5,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={200}
          height={20}
          style={{
            alignSelf: 'flex-start',
            marginTop: 20,
            marginStart: 25,
            borderRadius: 5,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={80}
          height={20}
          style={{
            alignSelf: 'center',
            marginTop: 25,
            borderRadius: 5,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={290}
          height={70}
          style={{
            alignSelf: 'flex-start',
            marginStart: 25,
            marginTop: 20,
            borderRadius: 5,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={140}
          height={20}
          style={{
            alignSelf: 'center',
            marginTop: 25,
            borderRadius: 5,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={290}
          height={120}
          style={{
            alignSelf: 'flex-start',
            marginStart: 25,
            marginTop: 20,
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  );
};

export const NotificationSkeleton = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={60}
        height={60}
        style={{
          marginTop: 10,
          marginStart: 5,
          borderRadius: 60,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={185}
          height={15}
          style={{
            marginTop: -60,
            marginStart: 80,
            borderRadius: 5,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={230}
          height={50}
          style={{
            marginTop: 5,
            marginStart: 80,
            borderRadius: 5,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={60}
        height={60}
        style={{
          marginTop: 20,
          marginStart: 5,
          borderRadius: 60,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={185}
          height={15}
          style={{
            marginTop: -60,
            marginStart: 80,
            borderRadius: 5,
          }}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={230}
          height={50}
          style={{
            marginTop: 5,
            marginStart: 80,
            borderRadius: 5,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={60}
        height={60}
        style={{
          marginTop: 20,
          marginStart: 5,
          borderRadius: 60,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={185}
          height={15}
          style={{
            marginTop: -60,
            marginStart: 80,
            borderRadius: 5,
          }}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={230}
          height={50}
          style={{
            marginTop: 5,
            marginStart: 80,
            borderRadius: 5,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={60}
        height={60}
        style={{
          marginTop: 20,
          marginStart: 5,
          borderRadius: 60,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={185}
          height={15}
          style={{
            marginTop: -60,
            marginStart: 80,
            borderRadius: 5,
          }}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={230}
          height={50}
          style={{
            marginTop: 5,
            marginStart: 80,
            borderRadius: 5,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={60}
        height={60}
        style={{
          marginTop: 20,
          marginStart: 5,
          borderRadius: 60,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={185}
          height={15}
          style={{
            marginTop: -60,
            marginStart: 80,
            borderRadius: 5,
          }}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={230}
          height={50}
          style={{
            marginTop: 5,
            marginStart: 80,
            borderRadius: 5,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={60}
        height={60}
        style={{
          marginTop: 20,
          marginStart: 5,
          borderRadius: 60,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={185}
          height={15}
          style={{
            marginTop: -60,
            marginStart: 80,
            borderRadius: 5,
          }}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={230}
          height={50}
          style={{
            marginTop: 5,
            marginStart: 80,
            borderRadius: 5,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={60}
        height={60}
        style={{
          marginTop: 20,
          marginStart: 5,
          borderRadius: 60,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={185}
          height={15}
          style={{
            marginTop: -60,
            marginStart: 80,
            borderRadius: 5,
          }}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={230}
          height={50}
          style={{
            marginTop: 5,
            marginStart: 80,
            borderRadius: 5,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={60}
        height={60}
        style={{
          marginTop: 20,
          marginStart: 5,
          borderRadius: 60,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={185}
          height={15}
          style={{
            marginTop: -60,
            marginStart: 80,
            borderRadius: 5,
          }}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={230}
          height={50}
          style={{
            marginTop: 5,
            marginStart: 80,
            borderRadius: 5,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={60}
        height={60}
        style={{
          marginTop: 20,
          marginStart: 5,
          borderRadius: 60,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={185}
          height={15}
          style={{
            marginTop: -60,
            marginStart: 80,
            borderRadius: 5,
          }}
        />

        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={230}
          height={50}
          style={{
            marginTop: 5,
            marginStart: 80,
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  );
};
export const InvoiceListSkeleton = () => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={65}
            height={15}
            style={{
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={43}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={35}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={20}
            height={20}
            style={{
              alignSelf: 'flex-end',
              marginStart: 155,
              borderRadius: 5,
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={170}
          height={18}
          style={{
            borderRadius: 5,
            marginTop: 5,
          }}
        />
        <View
          LinearGradient={LinearGradient}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 10,
            borderBottomColor: COLORS.lightGrey,
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={65}
            height={15}
            style={{
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={43}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={35}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={20}
            height={20}
            style={{
              alignSelf: 'flex-end',
              marginStart: 155,
              borderRadius: 5,
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={170}
          height={18}
          style={{
            borderRadius: 5,
            marginTop: -10,
          }}
        />
        <View
          LinearGradient={LinearGradient}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 10,
            borderBottomColor: COLORS.lightGrey,
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={65}
            height={15}
            style={{
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={43}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={35}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={20}
            height={20}
            style={{
              alignSelf: 'flex-end',
              marginStart: 155,
              borderRadius: 5,
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={170}
          height={18}
          style={{
            borderRadius: 5,
            marginTop: -10,
          }}
        />
        <View
          LinearGradient={LinearGradient}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 10,
            borderBottomColor: COLORS.lightGrey,
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={65}
            height={15}
            style={{
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={43}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={35}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={20}
            height={20}
            style={{
              alignSelf: 'flex-end',
              marginStart: 155,
              borderRadius: 5,
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={170}
          height={18}
          style={{
            borderRadius: 5,
            marginTop: -10,
          }}
        />
        <View
          LinearGradient={LinearGradient}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 10,
            borderBottomColor: COLORS.lightGrey,
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={65}
            height={15}
            style={{
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={43}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={35}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={20}
            height={20}
            style={{
              alignSelf: 'flex-end',
              marginStart: 155,
              borderRadius: 5,
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={170}
          height={18}
          style={{
            borderRadius: 5,
            marginTop: -10,
          }}
        />
        <View
          LinearGradient={LinearGradient}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 10,
            borderBottomColor: COLORS.lightGrey,
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={65}
            height={15}
            style={{
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={43}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={35}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={20}
            height={20}
            style={{
              alignSelf: 'flex-end',
              marginStart: 155,
              borderRadius: 5,
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={170}
          height={18}
          style={{
            borderRadius: 5,
            marginTop: -10,
          }}
        />
        <View
          LinearGradient={LinearGradient}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 10,
            borderBottomColor: COLORS.lightGrey,
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={65}
            height={15}
            style={{
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={43}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={35}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={20}
            height={20}
            style={{
              alignSelf: 'flex-end',
              marginStart: 155,
              borderRadius: 5,
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={170}
          height={18}
          style={{
            borderRadius: 5,
            marginTop: -10,
          }}
        />
        <View
          LinearGradient={LinearGradient}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 10,
            borderBottomColor: COLORS.lightGrey,
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={65}
            height={15}
            style={{
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={43}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={35}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={20}
            height={20}
            style={{
              alignSelf: 'flex-end',
              marginStart: 155,
              borderRadius: 5,
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={170}
          height={18}
          style={{
            borderRadius: 5,
            marginTop: -10,
          }}
        />
        <View
          LinearGradient={LinearGradient}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 10,
            borderBottomColor: COLORS.lightGrey,
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={65}
            height={15}
            style={{
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={43}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={35}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={20}
            height={20}
            style={{
              alignSelf: 'flex-end',
              marginStart: 155,
              borderRadius: 5,
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={170}
          height={18}
          style={{
            borderRadius: 5,
            marginTop: -10,
          }}
        />
        <View
          LinearGradient={LinearGradient}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 10,
            borderBottomColor: COLORS.lightGrey,
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={65}
            height={15}
            style={{
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={43}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={35}
            height={17}
            style={{
              borderRadius: 20,
              marginStart: 10,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={20}
            height={20}
            style={{
              alignSelf: 'flex-end',
              marginStart: 155,
              borderRadius: 5,
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          width={170}
          height={18}
          style={{
            borderRadius: 5,
            marginTop: -10,
          }}
        />
        <View
          LinearGradient={LinearGradient}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 10,
            borderBottomColor: COLORS.lightGrey,
            borderBottomWidth: 0.5,
          }}
        />
      </View>
    </View>
  );
};

export const OfferSkeleton = () => {
  return (
    <View>
      <View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['silver', '#ebebeb', '#ebebeb']}
          height={175}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 5,
            borderRadius: 5,
            alignSelf: 'center',
            alignItems: 'center',
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
          height={22}
          width={120}
          style={{
            borderRadius: 5,
            marginHorizontal: 220,
            position: 'absolute',
            marginTop: 15,
          }}
        />
        <View style={{flexDirection: 'column', position: 'absolute'}}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 115,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
            }}
          />
        </View>
      </View>
      <View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['silver', '#ebebeb', '#ebebeb']}
          height={175}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 5,
            borderRadius: 5,
            alignSelf: 'center',
            alignItems: 'center',
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
          height={22}
          width={120}
          style={{
            borderRadius: 5,
            marginHorizontal: 220,
            position: 'absolute',
            marginTop: 15,
          }}
        />
        <View style={{flexDirection: 'column', position: 'absolute'}}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 115,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
            }}
          />
        </View>
      </View>
      <View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['silver', '#ebebeb', '#ebebeb']}
          height={175}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 5,
            borderRadius: 5,
            alignSelf: 'center',
            alignItems: 'center',
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
          height={22}
          width={120}
          style={{
            borderRadius: 5,
            marginHorizontal: 220,
            position: 'absolute',
            marginTop: 15,
          }}
        />
        <View style={{flexDirection: 'column', position: 'absolute'}}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 115,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
            }}
          />
        </View>
      </View>
      <View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['silver', '#ebebeb', '#ebebeb']}
          height={175}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 5,
            borderRadius: 5,
            alignSelf: 'center',
            alignItems: 'center',
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
          height={22}
          width={120}
          style={{
            borderRadius: 5,
            marginHorizontal: 220,
            position: 'absolute',
            marginTop: 15,
          }}
        />
        <View style={{flexDirection: 'column', position: 'absolute'}}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 115,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
            }}
          />
        </View>
      </View>
      <View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['silver', '#ebebeb', '#ebebeb']}
          height={175}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 5,
            borderRadius: 5,
            alignSelf: 'center',
            alignItems: 'center',
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
          height={22}
          width={120}
          style={{
            borderRadius: 5,
            marginHorizontal: 220,
            position: 'absolute',
            marginTop: 15,
          }}
        />
        <View style={{flexDirection: 'column', position: 'absolute'}}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 115,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
            }}
          />
        </View>
      </View>
      <View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['silver', '#ebebeb', '#ebebeb']}
          height={175}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 5,
            borderRadius: 5,
            alignSelf: 'center',
            alignItems: 'center',
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
          height={22}
          width={120}
          style={{
            borderRadius: 5,
            marginHorizontal: 220,
            position: 'absolute',
            marginTop: 15,
          }}
        />
        <View style={{flexDirection: 'column', position: 'absolute'}}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 115,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
            }}
          />
        </View>
      </View>
      <View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['silver', '#ebebeb', '#ebebeb']}
          height={175}
          width={Dimensions.get('window').width - 20}
          style={{
            marginTop: 5,
            borderRadius: 5,
            alignSelf: 'center',
            alignItems: 'center',
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
          height={22}
          width={120}
          style={{
            borderRadius: 5,
            marginHorizontal: 220,
            position: 'absolute',
            marginTop: 15,
          }}
        />
        <View style={{flexDirection: 'column', position: 'absolute'}}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 115,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
            height={22}
            width={310}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const StoreDetailsSkeleton = () => {
  return (
    <View>
      <View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={300}
          width={Dimensions.get('window').width - 0}
          style={{
            backgroundColor: COLORS.colorPrimary,
            alignItems: 'center',
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={40}
          width={80}
          style={{
            alignSelf: 'flex-end',
            marginTop: -40,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        height={60}
        width={Dimensions.get('window').width - 20}
        style={{
          marginTop: 10,
          marginStart: 10,
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={45}
          width={110}
          style={{
            marginTop: 10,
            marginStart: 10,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={45}
          width={115}
          style={{
            marginTop: 10,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={45}
          width={115}
          style={{
            marginTop: 10,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        height={60}
        width={55}
        style={{
          marginTop: 10,
          marginStart: 20,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={15}
          width={140}
          style={{
            marginTop: -50,
            marginStart: 90,
            borderRadius: 5,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={15}
          width={210}
          style={{
            marginTop: 5,
            marginStart: 90,
            borderRadius: 5,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        height={20}
        width={65}
        style={{
          marginTop: 5,
          alignSelf: 'flex-end',
          borderRadius: 5,
          marginHorizontal: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={45}
          width={105}
          style={{
            marginTop: 10,
            marginStart: 10,
            borderRadius: 5,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={45}
          width={105}
          style={{
            marginTop: 10,
            marginStart: 10,
            borderRadius: 5,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={45}
          width={105}
          style={{
            marginTop: 10,
            marginStart: 10,
            borderRadius: 5,
          }}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        height={60}
        width={Dimensions.get('window').width - 20}
        style={{
          marginStart: 10,
          marginTop: 20,
        }}
      />
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        height={60}
        width={Dimensions.get('window').width - 20}
        style={{
          marginStart: 10,
          marginTop: 10,
        }}
      />
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        height={300}
        width={Dimensions.get('window').width - 20}
        style={{
          marginStart: 10,
          marginTop: 10,
        }}
      />
    </View>
  );
};
export const AboutSkeleton = () => {
  return (
    <View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        height={260}
        width={Dimensions.get('window').width - 0}
        style={{
          alignSelf: 'center',
        }}
      />
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={85}
        height={15}
        style={{
          marginTop: 20,
          marginStart: 10,
          borderRadius: 5,
        }}
      />
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={280}
        height={110}
        style={{
          marginTop: 30,
          marginStart: 10,
          borderRadius: 5,
        }}
      />
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={50}
        height={15}
        style={{
          marginTop: 40,
          marginStart: 10,
          borderRadius: 5,
        }}
      />
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={180}
        height={15}
        style={{
          marginTop: 30,
          marginStart: 10,
          borderRadius: 5,
        }}
      />
    </View>
  );
};
export const SettingSkeleton = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderBottomColor: COLORS.lightGrey,
          borderBottomWidth: 1,
          paddingVertical: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ShimmerPlaceHolder
            // shimmerColors={['#F2F8FC', '#F2F8FC', '#F2F8FC']}
            LinearGradient={LinearGradient}
            height={15}
            width={85}
            style={{
              marginStart: 10,
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            height={20}
            width={20}
            style={{
              marginHorizontal: 10,
              alignSelf: 'flex-end',
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={15}
          width={110}
          style={{
            marginStart: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={10}
          width={175}
          style={{
            marginStart: 10,
            borderRadius: 5,
            marginTop: 5,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderBottomColor: COLORS.lightGrey,
          borderBottomWidth: 1,
          paddingVertical: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ShimmerPlaceHolder
            // shimmerColors={['#F2F8FC', '#F2F8FC', '#F2F8FC']}
            LinearGradient={LinearGradient}
            height={15}
            width={155}
            style={{
              marginStart: 10,
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            height={20}
            width={20}
            style={{
              marginHorizontal: 10,
              alignSelf: 'flex-end',
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={30}
          width={210}
          style={{
            marginStart: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderBottomColor: COLORS.lightGrey,
          borderBottomWidth: 1,
          paddingVertical: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ShimmerPlaceHolder
            // shimmerColors={['#F2F8FC', '#F2F8FC', '#F2F8FC']}
            LinearGradient={LinearGradient}
            height={15}
            width={145}
            style={{
              marginStart: 10,
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            height={20}
            width={20}
            style={{
              marginHorizontal: 10,
              alignSelf: 'flex-end',
            }}
          />
        </View>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={30}
          width={190}
          style={{
            marginStart: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={15}
          width={80}
          style={{
            marginStart: 10,
            borderRadius: 5,
            marginVertical: 20,
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          height={15}
          width={80}
          style={{
            marginStart: 10,
            borderRadius: 5,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderBottomColor: COLORS.lightGrey,
          borderBottomWidth: 1,
          paddingVertical: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            height={15}
            width={85}
            style={{
              marginStart: 10,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderBottomColor: COLORS.lightGrey,
          borderBottomWidth: 1,
          paddingVertical: 15,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            height={15}
            width={85}
            style={{
              marginStart: 10,
              borderRadius: 5,
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            height={15}
            width={40}
            style={{
              marginStart: 10,
              borderRadius: 5,
              marginTop: 5,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const InvoiceDetailsSkeleton = () => {
  return (
    <ShimmerPlaceHolder
      LinearGradient={LinearGradient}
      style={{
        marginTop: 5,
        marginStart: 15,
      }}
      width={Dimensions.get('window').width - 30}></ShimmerPlaceHolder>
  );
};


export const StoreSkeleton = () => {
    return (
        <View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                    height={140}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: 5,
                        borderRadius: 5,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
                    height={25}
                    width={90}
                    style={{
                        borderRadius: 5,
                        marginHorizontal: 250,
                        position: 'absolute',
                        marginTop: 110

                    }}
                />
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['white', '#ebebeb', '#ebebeb']}
                    height={65}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: -5,
                        borderRadius: 2,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <View style={{ flexDirection: 'column', position: 'absolute', }}>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                            marginTop: 5,
                            marginVertical: 5

                        }}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                        }}
                    />
                </View>
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                    height={140}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: 5,
                        borderRadius: 5,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
                    height={25}
                    width={90}
                    style={{
                        borderRadius: 5,
                        marginHorizontal: 250,
                        position: 'absolute',
                        marginTop: 110

                    }}
                />
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['white', '#ebebeb', '#ebebeb']}
                    height={65}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: -5,
                        borderRadius: 2,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <View style={{ flexDirection: 'column', position: 'absolute', }}>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                            marginTop: 5,
                            marginVertical: 5

                        }}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                        }}
                    />
                </View>
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                    height={140}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: 5,
                        borderRadius: 5,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
                    height={25}
                    width={90}
                    style={{
                        borderRadius: 5,
                        marginHorizontal: 250,
                        position: 'absolute',
                        marginTop: 110

                    }}
                />
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['white', '#ebebeb', '#ebebeb']}
                    height={65}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: -5,
                        borderRadius: 2,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <View style={{ flexDirection: 'column', position: 'absolute', }}>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                            marginTop: 5,
                            marginVertical: 5

                        }}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                        }}
                    />
                </View>
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                    height={140}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: 5,
                        borderRadius: 5,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
                    height={25}
                    width={90}
                    style={{
                        borderRadius: 5,
                        marginHorizontal: 250,
                        position: 'absolute',
                        marginTop: 110

                    }}
                />
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['white', '#ebebeb', '#ebebeb']}
                    height={65}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: -5,
                        borderRadius: 2,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <View style={{ flexDirection: 'column', position: 'absolute', }}>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                            marginTop: 5,
                            marginVertical: 5

                        }}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                        }}
                    />
                </View>
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                    height={140}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: 5,
                        borderRadius: 5,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
                    height={25}
                    width={90}
                    style={{
                        borderRadius: 5,
                        marginHorizontal: 250,
                        position: 'absolute',
                        marginTop: 110

                    }}
                />
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['white', '#ebebeb', '#ebebeb']}
                    height={65}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: -5,
                        borderRadius: 2,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <View style={{ flexDirection: 'column', position: 'absolute', }}>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                            marginTop: 5,
                            marginVertical: 5

                        }}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                        }}
                    />
                </View>
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                    height={140}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: 5,
                        borderRadius: 5,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
                    height={25}
                    width={90}
                    style={{
                        borderRadius: 5,
                        marginHorizontal: 250,
                        position: 'absolute',
                        marginTop: 110

                    }}
                />
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['white', '#ebebeb', '#ebebeb']}
                    height={65}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: -5,
                        borderRadius: 2,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <View style={{ flexDirection: 'column', position: 'absolute', }}>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                            marginTop: 5,
                            marginVertical: 5

                        }}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                        }}
                    />
                </View>
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                    height={140}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: 5,
                        borderRadius: 5,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['darkgray', '#ebebeb', '#ebebeb']}
                    height={25}
                    width={90}
                    style={{
                        borderRadius: 5,
                        marginHorizontal: 250,
                        position: 'absolute',
                        marginTop: 110

                    }}
                />
            </View>
            <View>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    shimmerColors={['white', '#ebebeb', '#ebebeb']}
                    height={65}
                    width={Dimensions.get('window').width - 20}
                    style={{
                        marginTop: -5,
                        borderRadius: 2,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 10

                    }}
                />
                <View style={{ flexDirection: 'column', position: 'absolute', }}>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                            marginTop: 5,
                            marginVertical: 5

                        }}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={['silver', '#ebebeb', '#ebebeb']}
                        height={22}
                        width={320}
                        style={{
                            borderRadius: 5,
                            marginHorizontal: 20,
                        }}
                    />
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({});
