// Import React in our code
import React, {useState} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';

GoogleSignin.configure({
  ClientId:
    '739384333-3ugtu1pv5870523m54s7f0ok9qr2l2u0.apps.googleusercontent.com',
  offlineAccess: false,
});

export default function App() {

  const [userGoogleInfo, setUserGoogleInfo] = useState({});
  const [gettingLoginStatus, setGettingLoginStatus] = useState(false);

  const auth = async () => {
    // console.log(userInfo);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserGoogleInfo(userInfo);
      console.log(userInfo, 'details');
      setGettingLoginStatus(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setGettingLoginStatus(false);
      setUserGoogleInfo({});
    } catch (error) {
      console.error(error);
    }
  };
  return (

    <SafeAreaView style={styles.mainCointainer}>
      <View>
        {gettingLoginStatus ? (
          <>
            <View style={styles.detailsColumn}>
              <View style={{flex: 1}}>
                <Image
                  source={{uri: userGoogleInfo.user.photo}}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    borderWidth: 5,
                    borderColor: 'blue',
                    // alignSelf: "center",
                    paddingVertical: 10,
                  }}
                />
              </View>
              <View style={{flex: 2}}>
                <Text
                  style={{
                    paddingVertical: 5,
                    fontWeight: '800',
                    color: '#800039',
                    fontSize: 23,
                  }}>
                  {userGoogleInfo.user.name}
                </Text>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontWeight: '800',
                    color: '#000000',
                    fontSize: 14,
                  }}>
                  {userGoogleInfo.user.email}
                </Text>
              </View>
            </View>

            <View style={{height: '75%'}}>
              <View style={styles.taskContainer}>
                <View style={styles.firstDiv}></View>
                <View style={styles.secondDiv}></View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.block}></View>
              </View>

              <View style={styles.forthDiv}></View>

              <View style={styles.fifthDiv}></View>
            </View>

            <TouchableOpacity style={styles.logout} onPress={signOut}>
              <Text style={styles.text}>LOGOUT</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={{alignSelf: 'center', paddingVertical: '50%'}}>
            <GoogleSigninButton
              color={GoogleSigninButton.Color.Dark}
              size={GoogleSigninButton.Size.Wide}
              style={{width: 312, height: 48}}
              onPress={auth}
            />
          </View>
        )}
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  mainCointainer: {
    flex: 1,
  },
  detailsColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },

  firstDiv: {
    height: 40,
    width: 40,
    backgroundColor: 'yellow',
  },
  secondDiv: {
    height: 40,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },

  forthDiv: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
    backgroundColor: 'yellow',
  },
  fifthDiv: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 40,
    width: 40,
    backgroundColor: 'purple',
  },
  block: {
    backgroundColor: 'blue',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },

  logout: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#ff1919',
    marginTop: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
