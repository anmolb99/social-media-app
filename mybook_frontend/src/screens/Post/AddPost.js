import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextBase,
  TextInput,
} from 'react-native';
import React from 'react';
import {back_text} from '../../commonStyles/PagesStyle';
import {
  login_button,
  login_button_text,
  text_input,
} from '../../commonStyles/Forms';
import nopic from '../../assets/images/nopic.jpg';
import {Center, ScrollView} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';

const AddPost = () => {
  const selectImage = async () => {
    const result = await launchImageLibrary({
      aspect: [1, 1],
    });
    console.log(result);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.addpost_text}>Add Post</Text>
        <TouchableOpacity style={styles.post_button}>
          <Text style={[back_text, {fontSize: 17}]}>Post</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.main_view}>
        <Image source={nopic} style={styles.pic_style} />

        <TouchableOpacity
          style={login_button}
          onPress={() => {
            selectImage();
          }}>
          <Text style={login_button_text}>Choose Picture</Text>
        </TouchableOpacity>
        <View style={styles.inputs_style}></View>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          placeholder="Caption"
          style={styles.caption_style}
        />
        <TextInput placeholder="Location" style={text_input} />
      </ScrollView>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  addpost_text: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: 'black',
  },
  post_button: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
    fontSize: 25,
  },
  main_view: {
    paddingHorizontal: 20,
    // alignItems: 'center',
  },
  pic_style: {
    aspectRatio: 1,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 25,
    borderRadius: 10,
  },
  inputs_style: {
    textAlign: 'left',
  },
  caption_style: {
    borderWidth: 0.5,
    paddingHorizontal: 15,
    marginVertical: 20,
    borderRadius: 5,
  },
});
