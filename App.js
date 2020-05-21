import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './screens/Login'
import ApiKeys from './Constants/ApiKeys';
import * as firebase from 'firebase';











export default function App() {









  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);

  }







  return (



    <View style={styles.container} >

      <Login>

      </Login>

    </View>
  );




}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

});
