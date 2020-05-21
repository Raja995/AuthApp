import React, { useEffect } from 'react';
import { useState } from 'react';
import { Text, View, TextInput, Button, Alert, FlatList, TouchableOpacity } from 'react-native';
import color from '../Colors/color'
import Styles from '../styles/Styles'
import * as firebase from 'firebase';
import { Notifications } from 'expo';
import 'firebase/functions'
import { AsyncStorage } from 'react-native';


const Login = props => {
  const [key, SetKey] = useState('');
  const [accName, setAccName] = useState('');
  const [accList, setAccList] = useState([]);
  const [retrieve, SetRetrieve] = useState(true);




  const keyHandler = (enteredText) => {
    SetKey(enteredText);
  }
  const accNameHandler = (enteredText) => {
    setAccName(enteredText);
  }


  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('list');

      if (value !== null) {
        setAccList(JSON.parse(value));
      }
    } catch (error) {

    }
  }
  if (retrieve) {
    _retrieveData();
    SetRetrieve(false);
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('list', JSON.stringify(accList));
    } catch (error) {

    }
  }


  let token;
  const addAcc = async () => {
    token = await Notifications.getExpoPushTokenAsync();
    var exist = false;
    for (var i = 0; i < accList.length; i++) {
      if (accList[i].id == key) {
        exist = true;
      }
    }
    if (exist) {
      Alert.alert("Key Already Exists");
    }
    else {
      if (key == "" || accName == "") {
        Alert.alert("Missing Data");
      } else {

        setAccList(accList => [...accList, { id: key, value: accName }]);
        _storeData();
        setAccName("");
        SetKey("");
        const test = firebase.functions().httpsCallable('addDevice');

        await test({ userId: key, deviceToken: token }).then(result => {

        }, (error) => {

        });

      }
    }


  }
  const removeAcc = async accId => {

    await setAccList(accList => {
      return accList.filter((acc) => acc.id !== accId);
    });
    const test2 = firebase.functions().httpsCallable('removeDevice');

    await test2({ userId: key }).then(result => {

    }, (error) => {

    });
    _storeData();

  }
  return (
    <View style={Styles.container}>
      <View>
        <Text style={Styles.text}>Welcome To My App</Text>
      </View>

      <View style={Styles.input}>
        <TextInput value={key} placeholder="Enter Key" onChangeText={keyHandler}></TextInput>
      </View>
      <View style={Styles.input}>
        <TextInput value={accName} placeholder="Account Name" onChangeText={accNameHandler}></TextInput>
      </View>
      <View style={Styles.button}>
        <Button color={color.primary} title="Add Account" onPress={addAcc}>

        </Button>
      </View>
      <Text style={Styles.text}>
        Your accounts
      </Text>
      <View style={Styles.list}>

        <FlatList data={accList} keyExtractor={(item, index) => item.id} renderItem={itemData => (
          <TouchableOpacity activeOpacity={0.8} onPress={removeAcc.bind(this, itemData.item.id)}>
            <View style={Styles.listItem}>
              <Text>
                {itemData.item.value}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        />

      </View>

    </View>

  )

}

export default Login;