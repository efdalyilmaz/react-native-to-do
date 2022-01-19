import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Header(props) {
  return (
    <View  style={styles.header}>
        <TouchableOpacity onPress={props.onToggleAllComplete}>
            <Text style={styles.toggleIcon}>{String.fromCharCode(10003)}</Text>
        </TouchableOpacity>
        <TextInput 
            value={props.value}
            onChangeText={props.onChange}
            onSubmitEditing={props.onAddItem}
            placeholder="What needs to be done"
            blurOnSubmit={false}
            returnKeyType="done"
            style={styles.input}/>
        </View>
  );
}

const styles = StyleSheet.create({
    header:{
        paddingHorizontal : 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    toggleIcon:{
        fontSize:30,
        color:"#CCC"
    },
    input: {
        flex:1,
        height: 50
    }
});