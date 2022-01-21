import React, {Component} from 'react';
import { StyleSheet, View , Platform, FlatList} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Row from './Row';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allComplete: false,
      value: "",
      items: [],
      dataSource : []
    },

    this.setSource = this.setSource.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }

  setSource(items, itemsDataSource, otherState = {}){
    this.setState({
      items,
      dataSource: itemsDataSource,
      ...otherState
    });
  }

  handleToggleAllComplete(){
    const complete = !this.state.allComplete;

    const newItems = this.state.items.map((item) => ({
      ...item,
      complete
    }));

    this.setSource(newItems, newItems, {allComplete: complete});
  }

  handleAddItem(){
    if(!this.state.value){
      return;
    }

    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ];

    this.setSource(newItems, newItems, {value: ""});
  }

 renderItem(item){
   console.log("renderItem item", item);
  return  (<Row text={item.text} />);
 }

render() {
  return (
    <View style={styles.container}>
      <Header 
        value={this.state.value}
        onAddItem={this.handleAddItem}
        onChange={(value) => this.setState({value})}
        onToggleAllComplete={this.handleToggleAllComplete}
      />
      <View style={styles.content}>
        <FlatList
          style={styles.list}
          data={this.state.dataSource}
          renderItem={( {item} ) => {return this.renderItem(item);}}
          keyExtractor={item => item.key}
        />
      </View>
      <Footer />
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ...Platform.select({
      ios:{ paddingTop:30 }
    })
  },
  content: {
    flex: 1
  },
  list:{
    backgroundColor: '#FFF',
  },
  seperator:{
    borderWidth:1,
    borderColor:"#F5F5F5"
  }
});
