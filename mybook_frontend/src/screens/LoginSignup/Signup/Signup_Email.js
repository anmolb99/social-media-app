import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React from 'react';

import {VStack, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import {
  formContainer,
  login_button,
  login_button_text,
  login_text,
  text_input,
} from '../../../commonStyles/Forms';

import LogoCommon from '../../../components/loginsignup/LogoCommon';
import {
  goback_button,
  back_icon,
  back_text,
  header_text,
} from '../../../commonStyles/PagesStyle';

const Signup_Email = ({navigation}) => {
  const submitEmail = () => {
    navigation.navigate('Signup_Code');
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

      <VStack space={5} w="80%" alignItems={'center'}>
        <LogoCommon />
        <Text style={header_text}>Create a new Account</Text>
        <TextInput
          style={text_input}
          placeholder="Enter Email"
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity
          style={login_button}
          onPress={() => {
            submitEmail();
          }}>
          <Text style={login_button_text}>Next</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  );
};

export default Signup_Email;
