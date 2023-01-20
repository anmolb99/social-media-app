import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyProfile = ({navigation}) => {
  const data = {
    username: 'btw_anmol',
    profile_img:
      'https://instagram.faip1-1.fna.fbcdn.net/v/t51.2885-19/316364486_212472394534039_8196845778409415151_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.faip1-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=EcywsLx1e5sAX92KR0t&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfB06hZgucBivt_IViza0sc2CzzIcBC4gzKItxBvkT3MuQ&oe=63CD4535&_nc_sid=8fd12b',
    followers: 1100,
    following: 65,
    bio: 'Hey, Anmol here ! I am a software developer and I love to code.',
    posts: [
      {
        id: '1',
        post_img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3HCJlI_HQvwiok906NGGbyLwFCKes2Dx21Q&usqp=CAU',
      },
      {
        id: '2',
        post_img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvjOkn2Ef2RE4zKQP8vnVAKQ2pNQBi2mhN2A&usqp=CAU',
      },
      {
        id: '3',
        post_img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnb_I_OQt7Mcts15Kf9qwVchNCE7SJlkfYQ&usqp=CAU',
      },
      {
        id: '4',
        post_img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkGzrdV7SI-28gVFrC-16ALVQdZwEU3un89g&usqp=CAU',
      },
      {
        id: '5',
        post_img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKdYHYqYAeQP2Ryi-RRRxjHiVp972rmfMHQ&usqp=CAU',
      },
      {
        id: '6',
        post_img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKdYHYqYAeQP2Ryi-RRRxjHiVp972rmfMHQ&usqp=CAU',
      },
      {
        id: '7',
        post_img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKdYHYqYAeQP2Ryi-RRRxjHiVp972rmfMHQ&usqp=CAU',
      },
      {
        id: '8',
        post_img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKdYHYqYAeQP2Ryi-RRRxjHiVp972rmfMHQ&usqp=CAU',
      },
      {
        id: '9',
        post_img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKdYHYqYAeQP2Ryi-RRRxjHiVp972rmfMHQ&usqp=CAU',
      },
      {
        id: '10',
        post_img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKdYHYqYAeQP2Ryi-RRRxjHiVp972rmfMHQ&usqp=CAU',
      },
      {
        id: '11',
        post_img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKdYHYqYAeQP2Ryi-RRRxjHiVp972rmfMHQ&usqp=CAU',
      },
    ],
  };
  return (
    <View style={styles.container}>
      <View style={styles.profile_header}>
        <Text style={styles.profile_text}>My Profile</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileSetting')}
          style={styles.settings_icon}>
          <Icon name="settings" size={25} />
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        numColumns={3}
        data={data.posts}
        keyExtractor={item => {
          return item.id;
        }}
        ListHeaderComponent={
          <View>
            <Image
              source={{
                uri: data.profile_img,
              }}
              style={styles.profile_pic_style}
            />
            <Text style={styles.username_style}>@{data.username}</Text>
            <View style={styles.userdata_style}>
              <TouchableOpacity style={styles.particular_view}>
                <Text style={styles.foll_style}>Followers</Text>
                <Text style={styles.foll_count_style}>{data.followers}</Text>
              </TouchableOpacity>
              <View style={styles.v_line}></View>
              <TouchableOpacity style={styles.particular_view}>
                <Text style={styles.foll_style}>Following</Text>
                <Text style={styles.foll_count_style}>{data.following}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.bio_style}>{data.bio} </Text>
            <Text style={styles.post_text}>My Posts</Text>
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
    </View>
  );
};

export default MyProfile;

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
    textAlign: 'center',
    // borderWidth: 1,
  },
  post_small_card: {
    height: 110,
    width: 110,
    margin: 2,
  },
});
