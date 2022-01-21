import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

export default function Row(props) {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{props.text}</Text>
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
    text:{
        fontSize : 24,
        color: "#4d4d4d"
    }
});