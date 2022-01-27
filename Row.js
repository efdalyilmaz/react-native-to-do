import React from 'react';
import { Text, View, StyleSheet, Switch} from 'react-native';

export default function Row(props) {
  const {complete} = props;
  console.log("🚀 ~ file: Row.js ~ line 6 ~ Row ~ props", props);
  
  return (
    <View style={styles.container}>
      <Switch value={complete} onValueChange={props.onComplete}/>
      <View style={styles.textWrap}>
        <Text style={[styles.text, complete && styles.complete]}>{props.text}</Text>
      </View>
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
    text:{
        fontSize : 24,
        color: "#4d4d4d"
    },
    complete:{
      textDecorationLine:"line-through"
    }

});