import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileSetting = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.edit_profile}>
        <Text style={styles.text_style}>Edit Profile</Text>
        <Icon name="keyboard-arrow-right" style={styles.icon_style} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.edit_profile}>
        <Text style={styles.text_style}>Change Password</Text>
        <Icon name="keyboard-arrow-right" style={styles.icon_style} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.edit_profile}>
        <Text style={styles.text_style}>Community Guidelines</Text>
        <Icon name="keyboard-arrow-right" style={styles.icon_style} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.edit_profile,
          {
            marginTop: 100,
            borderColor: 'red',
            borderWidth: 0.5,
          },
        ]}>
        <Text style={[styles.text_style, {fontSize: 15, color: 'red'}]}>
          Permanently Delete your Account
        </Text>
        <Icon
          name="delete"
          style={[styles.icon_style, {fontSize: 17, color: 'red'}]}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutbutton}>
        <Text style={styles.logout_text}>Log Out</Text>
        <Icon name="logout" size={20} color={'red'} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  edit_profile: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  text_style: {
    fontSize: 18,
  },
  icon_style: {
    fontSize: 25,
    position: 'absolute',
    right: 0,
    paddingRight: 20,
  },
  logoutbutton: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: 150,
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'red',
    borderRadius: 5,
  },
  logout_text: {
    color: 'red',
    fontSize: 19,
    paddingHorizontal: 10,
  },
});
