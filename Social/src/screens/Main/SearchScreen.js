import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

const SearchScreen = () => {
  return (
    <View>
      <TextInput
        style={styles.search_accounts}
        placeholder="Search  Accounts"
        autoFocus={true}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  search_accounts: {
    height: 50,
    width: '90%',
    borderWidth: 0.5,
    marginVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginHorizontal: '5%',
  },
});
