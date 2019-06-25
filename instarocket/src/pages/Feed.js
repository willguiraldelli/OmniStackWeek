import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View, Left, Text, FlatList, StyleSheet } from "react-native";
import camera from "../../assets/camera.png";
import io from "socket.io-client";
// importando API
import api from "../services/api";

//importando icones
import more from "../../assets/more.png";
import like from "../../assets/like.png";
import comment from "../../assets/comment.png";
import send from "../../assets/send.png";

// import { Container } from './styles';

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => {
          navigation.navigate("New");
        }}
      >
        <Image source={camera} />
      </TouchableOpacity>
    ),
    headerLeft: <View style={{ flex: 1 }} />
  });

  state = {
    feed: []
  };

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get("post");
    console.log(response.data);
    this.setState({
      feed: response.data
    });
  }

  registerToSocket = () => {
    const socket = io("http://10.0.2.2:3333");

    socket.on("post", newPost => {
      this.setState({
        feed: [newPost, ...this.state.feed]
      });
    });

    socket.on("like", likedPost =>
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post
        )
      })
    );
  };

  handleLike = id => {
    api.post(`post/${id}/like`);
  };

  render() {
    return (
      <View style={style.containar}>
        <FlatList
          data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <View style={style.feedItem}>
              <View style={style.feedItemHeader}>
                <View style={style.userInfo}>
                  <Text style={style.name}>{item.author}</Text>
                  <Text style={style.place}>{item.place}</Text>
                </View>
                <Image source={more} />
              </View>
              <Image
                style={style.feedImage}
                source={{ uri: `http://10.0.2.2:3333/files/${item.image}` }}
              />
              <View style={style.feedItemFooter}>
                <View style={style.actions}>
                  <TouchableOpacity
                    style={style.action}
                    onPress={() => {
                      this.handleLike(item._id);
                    }}
                  >
                    <Image source={like} />
                  </TouchableOpacity>

                  <TouchableOpacity style={style.action} onPress={() => {}}>
                    <Image source={comment} />
                  </TouchableOpacity>

                  <TouchableOpacity style={style.action} onPress={() => {}}>
                    <Image source={send} />
                  </TouchableOpacity>
                </View>
                <Text style={style.likes}>{item.likes} curtidas</Text>
                <Text style={style.description}>{item.description}</Text>
                <Text style={style.hashtags}>{item.hashtags}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  containar: {
    flex: 1
  },

  feedItem: {
    marginTop: 20
  },

  feedItemHeader: {
    paddingHorizontal: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  name: {
    color: "#000",
    fontSize: 14
  },

  place: {
    color: "#666",
    fontSize: 12
  },

  feedImage: {
    width: "100%",
    height: 400,
    marginVertical: 15
  },
  feedItemFooter: {
    paddingHorizontal: 15
  },

  actions: {
    flexDirection: "row"
  },

  action: {
    marginRight: 8
  },

  likes: {
    fontWeight: "bold",
    color: "#000",
    marginTop: 15
  },

  description: {
    lineHeight: 15,
    color: "#000"
  },

  hashtags: {
    color: "#7159c1"
  }
});
