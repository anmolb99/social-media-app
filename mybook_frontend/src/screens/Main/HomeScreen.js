import {View, Text, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import TopNavBar from '../../components/pages/TopNavBar';
import {FlatList} from 'native-base';
import PostBigcard from '../../components/posts/PostBigcard';

const HomeScreen = ({navigation}) => {
  const data = [
    {
      id: '1',
      username: 'avantika_123',
      profile_pic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuQEOS-b83YWOSeYdBzWWsEeENYrajb8sROQ&usqp=CAU',
      post_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuQEOS-b83YWOSeYdBzWWsEeENYrajb8sROQ&usqp=CAU',
      comments: [
        {
          id: 1,
          username: 'aarav_44',
          msg: 'nice pic hottey',
        },
        {
          id: 2,
          username: 'sudha_01',
          msg: 'looking good',
        },
      ],
      likes: [
        {id: 1, username: 'aarav_44'},
        {
          id: 2,
          username: 'sudha_01',
        },
      ],
    },
    {
      id: '2',
      username: 'aarav_44',
      profile_pic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDj_181UeVmuUwFz0PWUGc1bRTfcHfoFNmog&usqp=CAU',
      post_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDj_181UeVmuUwFz0PWUGc1bRTfcHfoFNmog&usqp=CAU',
      comments: [
        {
          id: 1,
          username: 'avantika_123',
          msg: 'nice pic hottey',
        },
        {
          id: 2,
          username: 'sudha_01',
          msg: 'looking good',
        },
      ],
      likes: [
        {id: 1, username: 'avantika_44'},
        {
          id: 2,
          username: 'sudha_01',
        },
      ],
    },
    {
      id: '3',
      username: 'sudha_01',
      profile_pic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      post_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      comments: [
        {
          id: 1,
          username: 'aarav_44',
          msg: 'nice pic hottey',
        },
        {
          id: 2,
          username: 'avantika_01',
          msg: 'looking good',
        },
      ],
      likes: [
        {id: 1, username: 'aarav_44'},
        {
          id: 2,
          username: 'avantika_01',
        },
      ],
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavBar navigation={navigation} />
      <FlatList
        data={data}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <PostBigcard
              username={item.username}
              profile_pic={item.profile_pic}
              post_image={item.post_image}
              comments={item.comments}
              likes={item.likes}
            />
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
});
