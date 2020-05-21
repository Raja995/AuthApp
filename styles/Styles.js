import React from 'react';
import { StyleSheet } from 'react-native';
import color from '../Colors/color'





const Styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: '300',
    fontSize: 22,
    marginBottom: 30,
  },
  input: {

    width: '70%',
    height: 35,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 30,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    minWidth: '100%',
    backgroundColor: '#303f9f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 15,

    width: '70%',
  },
  list: {
    height: '30%',
    width: '70%',


  },
  listItem: {
    backgroundColor: color.accent,
    width: '100%',
    alignItems: 'center',
    marginVertical:2,

  }
});
export default Styles;
