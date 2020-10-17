import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles/ascStrg';
import AsyncStorage from '@react-native-community/async-storage';
import trash from '../assets/trash.png';

export class ascStrg extends Component {
  constructor() {
    super();
    this.state = {
      textInput: '',
      data: ['Fadilah'],
      check: true,
    };
  }

  addData() {
    const {textInput, data} = this.state;
    this.setState({data: [textInput, ...data]}, function () {
      this.saveData();
    });
  }

  deleteData(index) {
    const {data} = this.state;
    this.setState(
      {
        data: data.filter((value, id) => id != index),
      },
      function () {
        this.saveData();
      },
    );
  }

  saveData() {
    AsyncStorage.setItem('data', JSON.stringify(this.state.data)).catch((err) =>
      console.log(err),
    );
  }

  componentDidMount() {
    AsyncStorage.getItem('data')
      .then((response) => {
        if (response) {
          console.log(response);
          let data = JSON.parse(response);
          this.setState({data: data});
        } else {
          console.log(response);
        }
      })
      .catch((err) => console.log(err));
  }

  mata = () => {
    const eye = !this.state.check;
    this.setState({check: eye});
  };

  render() {
    return (
      <View style={{backgroundColor: '#00000087', flex: 1}}>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={styles.textInputView}>
            <TextInput
              placeholder="Add to do..."
              onChangeText={(input) => this.setState({textInput: input})}
            />
          </View>
          <TouchableOpacity onPress={() => this.addData()}>
            <View style={styles.plusView}>
              <Text style={styles.plusText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.data.map((value, index) => (
          <View style={styles.viewList} key={index}>
            <View style={styles.viewTask}>
              <Text>{value}</Text>
            </View>
            <TouchableOpacity onPress={() => this.mata()}>
              <Image
                source={
                  this.state.check
                    ? require('../assets/checkboxempt.png')
                    : require('../assets/checkboxfilled.png')
                }
                style={{width: 30, height: 30, marginLeft: 10}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.deleteData(index)}>
              <Image source={trash} style={{width: 25, height: 30}} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

export default ascStrg;
