import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Touchable,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import LogoCommon from '../../../components/loginsignup/LogoCommon';
import {Button, Input, VStack, Link, HStack} from 'native-base';

//components
import {
  formContainer,
  text_input,
  login_button,
  login_button_text,
} from '../../../commonStyles/Forms';

const Login = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate('MainPage');
  };
  return (
    <View style={formContainer}>
      <VStack space={5} w="80%" alignItems={'center'}>
        <LogoCommon />
        <Text style={styles.login_text}>Login</Text>

        <TextInput
          style={text_input}
          placeholder="Enter Email"
          placeholderTextColor={'gray'}
        />

        <View style={{width: '100%'}}>
          <TextInput
            style={text_input}
            placeholder="Enter Password"
            placeholderTextColor={'gray'}
            secureTextEntry={true}
          />
          <Text
            style={[styles.link_text, {alignSelf: 'flex-end', marginTop: 5}]}
            onPress={() => {
              navigation.navigate('ForgotPassword_EnterEmail');
            }}>
            Forget Password?
          </Text>
        </View>

        <TouchableOpacity
          style={login_button}
          onPress={() => {
            handleLogin();
          }}>
          <Text style={login_button_text}>Login</Text>
        </TouchableOpacity>
        <HStack space={1}>
          <Text>I'm a new user.</Text>
          <Text
            style={styles.link_text}
            onPress={() => {
              navigation.navigate('Signup_Email');
            }}>
            Sign Up
          </Text>
        </HStack>
      </VStack>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  login_text: {
    fontSize: 25,
    fontWeight: '500',
  },
  link_text: {
    color: '#097de2',
    textDecorationLine: 'underline',
  },
});
