import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import FlatButton from '../../Components/ButtonComponentSearch';



export default class SearchScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Le nom a été soumis : ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <View style={styles.container}>
            <Text style={{fontSize: 25}}>Github users</Text>
            <TextInput
             placeholder="search for github users"
             style={styles.input}
            />
            <FlatButton text='submit' onPress={this.handleSubmit}/>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 50
    },
    input: {
        borderWidth: 1,
        padding: 10,
        margin: 10,
        width: 400
    },
    button: {
        width: 200
    }
  });