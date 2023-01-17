import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

//components
import Login from './src/screens/LoginSignup/Login/Login';
import Signup_Username from './src/screens/LoginSignup/Signup/Signup_Username';
import Signup_Email from './src/screens/LoginSignup/Signup/Signup_Email';
import Signup_Password from './src/screens/LoginSignup/Signup/Signup_Password';
import Signup_Code from './src/screens/LoginSignup/Signup/Signup_Code';
import Signup_AccountCreated from './src/screens/LoginSignup/Signup/Signup_AccountCreated';
import ForgotPassword_AccountRecovered from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_AccountRecovered';
import ForgotPassword_ChoosePassword from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_ChoosePassword';
import ForgotPassword_Code from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_Code';
import ForgotPassword_EnterEmail from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_EnterEmail';
import BottomTab from './src/components/pages/BottomTab';

const Routing = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup_Username" component={Signup_Username} />
        <Stack.Screen name="Signup_Email" component={Signup_Email} />
        <Stack.Screen name="Signup_Password" component={Signup_Password} />
        <Stack.Screen name="Signup_Code" component={Signup_Code} />
        <Stack.Screen
          name="Signup_AccountCreated"
          component={Signup_AccountCreated}
        />
        <Stack.Screen
          name="ForgotPassword_AccountRecovered"
          component={ForgotPassword_AccountRecovered}
        />
        <Stack.Screen
          name="ForgotPassword_ChoosePassword"
          component={ForgotPassword_ChoosePassword}
        />
        <Stack.Screen
          name="ForgotPassword_EnterEmail"
          component={ForgotPassword_EnterEmail}
        />
        <Stack.Screen
          name="ForgotPassword_Code"
          component={ForgotPassword_Code}
        />
        <Stack.Screen name="MainPage" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routing;
