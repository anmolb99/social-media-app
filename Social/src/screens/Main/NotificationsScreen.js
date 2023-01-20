import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>No Notifications Yet</Text>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
