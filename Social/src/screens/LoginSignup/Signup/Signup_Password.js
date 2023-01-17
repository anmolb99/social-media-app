import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  formContainer,
  login_button,
  login_button_text,
  text_input,
} from '../../../commonStyles/Forms';
import {
  goback_button,
  back_icon,
  back_text,
  header_text,
} from '../../../commonStyles/PagesStyle';
import LogoCommon from '../../../components/loginsignup/LogoCommon';

const Signup_Password = ({navigation}) => {
  const submitPassword = () => {
    navigation.navigate('Signup_AccountCreated');
  };
  return (
    <View style={formContainer}>
      <TouchableOpacity
        style={goback_button}
        onPress={() => navigation.goBack()}>
        <HStack space={1}>
          <Icon name="arrow-back-ios" style={back_icon} />
          <Text style={back_text}>Back</Text>
        </HStack>
      </TouchableOpacity>
      <VStack space={5} w="85%" alignItems={'center'}>
        <LogoCommon />
        <Text style={header_text}>Choose a strong password</Text>
        <TextInput
          style={text_input}
          placeholder="Enter Password"
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={text_input}
          placeholder="Confirm Password"
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity style={login_button} onPress={() => submitPassword()}>
          <Text style={login_button_text}>Next</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  );
};

export default Signup_Password;
