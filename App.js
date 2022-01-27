import React, {Component} from 'react';
import { StyleSheet, View , Platform, FlatList} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Row from './Row';

const filterItems = (filter, items) => {
console.log("🚀 ~ file: App.js ~ line 8 ~ filterItems ~ items", items);
console.log("🚀 ~ file: App.js ~ line 16 ~ filterItems ~ filter", filter);
  
  return items.filter(item => {
    if(filter === "ALL") return true;
    if(filter === "COMPLETED") return item.complete;
    if(filter === "ACTIVE") return !item.complete;
  });
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allComplete: false,
      filter: "ALL",
      value: "",
      items: [],
      dataSource : []
    },

    this.setSource = this.setSource.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }

  setSource(items, itemsDataSource, otherState = {}){
    this.setState({
      items,
      dataSource: itemsDataSource,
      ...otherState
    });
  }

  handleFilter(filter){
    this.setSource( this.state.items, filterItems(filter, this.state.items), {filter});
  }

  handleRemoveItem(key){
    const newItems = this.state.items.filter((item) => {
      return item.key != key;
    });

    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleComplete(key, complete){
 
    const newItems = this.state.items.map((item) => {

      if(item.key != key){
        return item;
      }
      return {
        ...item,
        complete
      };
    });

    this.setSource(newItems, filterItems(this.state.filter, newItems));
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
  return  (<Row text={item.text} 
              onComplete={(complete) => this.handleToggleComplete(item.key, complete)}
              onRemove={() => this.handleRemoveItem(item.key)} 
              {...item}
          />);
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
      <Footer 
        count={filterItems("ACTIVE", this.state.items).length}
        filter={this.state.filter}
        onFilter={this.handleFilter}
      />
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
