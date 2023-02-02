import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../api/Api';
import nopic from '../../assets/images/nopic.jpg';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addUserData} from '../../redux/reducers/UserReducer';
import {back_text, back_icon} from '../../commonStyles/PagesStyle';
import {HStack} from 'native-base';

const UserProfile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const getUserProfile = async () => {
    try {
      const res = await axios.post(`${API_URL}/user_profile`, {
        id: '63cfe5b6a3c3a07522c9e986',
      });
      console.log(res.data.user);

      if (res.data.msg === 'user fetched') {
        setUserData(res.data.user);
      }
    } catch (error) {
      console.log(error);
      //   navigation.navigate('Login');
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [isFocused]);

  return (
    <>
      <View style={styles.container}>
        <HStack space={1} style={{paddingTop: 20, paddingLeft: 20}}>
          <Icon name="arrow-back-ios" style={back_icon} />
          <Text style={back_text}>Back</Text>
        </HStack>
        {userData ? (
          <FlatList
            contentContainerStyle={{alignItems: 'center'}}
            numColumns={3}
            data={userData.posts}
            keyExtractor={item => {
              return item.id;
            }}
            ListHeaderComponent={
              <View>
                {userData.profilepic.length > 0 ? (
                  <Image
                    source={{
                      uri: `${API_URL}/${userData.profilepic}`,
                    }}
                    style={styles.profile_pic_style}
                  />
                ) : (
                  <Image source={nopic} style={styles.profile_pic_style} />
                )}

                <Text style={styles.username_style}>@{userData.username}</Text>
                <View style={styles.userdata_style}>
                  <TouchableOpacity style={styles.particular_view}>
                    <Text style={styles.foll_style}>Followers</Text>
                    <Text style={styles.foll_count_style}>
                      {userData.followers.length}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.v_line}></View>
                  <TouchableOpacity style={styles.particular_view}>
                    <Text style={styles.foll_style}>Following</Text>
                    <Text style={styles.foll_count_style}>
                      {userData.following.length}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.userdata_style, {paddingTop: 0}]}>
                  <TouchableOpacity style={styles.btn_fm}>
                    <Text style={styles.foll_style}>Follow</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.btn_fm}>
                    <Text style={styles.foll_style}>Message</Text>
                  </TouchableOpacity>
                </View>
                {userData.bio.length > 0 ? (
                  <Text style={styles.bio_style}>{userData.bio}</Text>
                ) : null}

                {userData.posts.length > 0 ? (
                  <Text style={styles.post_text}>My Posts</Text>
                ) : (
                  <Text style={styles.nopost_text}>No Posts yet</Text>
                )}
              </View>
            }
            renderItem={({item}) => {
              return (
                <TouchableOpacity>
                  <Image
                    source={{uri: item.post_img}}
                    style={styles.post_small_card}
                  />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile_header: {
    height: 56,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settings_icon: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
    fontSize: 25,
  },
  profile_text: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: 'black',
  },
  profile_pic_style: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 75,
    marginVertical: 20,
  },
  username_style: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  userdata_style: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  particular_view: {
    alignItems: 'center',
  },
  foll_style: {
    fontSize: 17,
    fontWeight: '500',
  },
  foll_count_style: {
    fontWeight: '500',
  },
  v_line: {
    height: 45,
    width: 1,
    backgroundColor: 'gray',
  },

  post_text: {
    alignSelf: 'center',
    fontSize: 25,
    paddingVertical: 20,
  },
  bio_style: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    textAlign: 'center',
    backgroundColor: '#d4d2d2',
  },
  post_small_card: {
    height: 110,
    width: 110,
    margin: 2,
  },
  nopost_text: {
    alignSelf: 'center',
    marginTop: 50,
  },
  btn_fm: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 3,
  },
});
