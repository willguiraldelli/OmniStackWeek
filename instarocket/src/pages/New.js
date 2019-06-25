import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet
} from "react-native";
import api from "../services/api";

export default class New extends Component {
  static navigationOptions = {
    headerRight: <View style={{ flex: 1 }} />
  };

  state = {
    preview: null,
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSubmit = async e => {
    const data = new FormData();

    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("/post", data);

    this.props.navigation.navigate("Feed");

    console.log(this.state);
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker(
      {
        title: "Select a pricture"
      },
      upload => {
        if (upload.error) {
          console.log(error);
        } else if (upload.didCancel) {
          console.log("User cenceled");
        } else {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split(".");
            ext = ext.toLowerCase() === "heic" ? "jpg" : ext;
          } else {
            prefix = new Date().getTime();
            ext = "jpg";
          }

          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`
          };

          this.setState({
            preview,
            image
          });
        }
      }
    );
  };

  render() {
    return (
      <View style={style.container}>
        <TouchableOpacity
          style={style.selectButtom}
          onPress={this.handleSelectImage}
        >
          <Text style={style.selectButtomText}>Select a image to add</Text>
        </TouchableOpacity>

        {this.state.preview && (
          <Image style={style.preview} source={this.state.preview} />
        )}

        <TextInput
          style={style.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Author's name"
          placeholderTextColor="#999"
          value={this.state.author}
          onChangeText={author => this.setState({ author })}
        />

        <TextInput
          style={style.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Where this picture was taken?"
          placeholderTextColor="#999"
          value={this.state.place}
          onChangeText={place => this.setState({ place })}
        />

        <TextInput
          style={style.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Tell something about it"
          placeholderTextColor="#999"
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />

        <TextInput
          style={style.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Add some hashtags"
          placeholderTextColor="#999"
          value={this.state.hashtags}
          onChangeText={hashtags => this.setState({ hashtags })}
        />

        <TouchableOpacity style={style.shareButton} onPress={this.handleSubmit}>
          <Text style={style.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30
  },

  selectButtom: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CCC",
    borderStyle: "dashed",
    height: 42,

    justifyContent: "center",
    alignItems: "center"
  },

  selectButtomText: {
    fontSize: 16,
    color: "#666"
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 4
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginTop: 10,
    fontSize: 16
  },

  shareButton: {
    backgroundColor: "#7159c1",
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: "center",
    alignItems: "center"
  },

  shareButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF"
  }
});
