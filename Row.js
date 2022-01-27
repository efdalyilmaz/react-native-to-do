import React from 'react';
import { Text, View, StyleSheet, Switch, TouchableOpacity} from 'react-native';

export default function Row(props) {
  const {complete} = props;
  
  return (
    <View style={styles.container}>
      <Switch value={complete} onValueChange={props.onComplete}/>
      <View style={styles.textWrap}>
        <Text style={[styles.text, complete && styles.complete]}>{props.text}</Text>
      </View>
      <TouchableOpacity onPress={props.onRemove}>  
        <Text style={styles.destroy}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent:"space-around"
    },
    textWrap:{
      flex:1,
      marginHorizontal:10,
    },
    
    complete:{
      textDecorationLine:"line-through"
    },
    text:{
      fontSize : 24,
      color: "#4d4d4d"
    },
    destroy:{
      fontSize : 20,
      color: "#cc9a9a"
    }
});