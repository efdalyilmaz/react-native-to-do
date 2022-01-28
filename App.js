import React, {Component} from 'react';
import { StyleSheet, View , Platform, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';
import Row from './Row';

const filterItems = (filter, items) => {
  if(items == null){
    return [];
  }

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
    this.renderLoading = this.renderLoading.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleClearComplete = this.handleClearComplete.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handleToggleEditing = this.handleToggleEditing.bind(this);
    
  }

  componentDidMount(){
    AsyncStorage.getItem("Items").then(json => {
      try {
        if(json != null){
          const items = JSON.parse(json);
          this.setSource(items, items);
        }
      } catch (error) {

      }
    });
  }

  setSource(items, itemsDataSource, otherState = {}){
    if(items == null){
      return;
    }

    this.setState({
      items,
      dataSource: itemsDataSource,
      ...otherState
      });
  
        AsyncStorage.setItem("Items", JSON.stringify(items));
      
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


  handleClearComplete(){
    const newItems = filterItems("ACTIVE", this.state.items);
    this.setSource(newItems, newItems);
  }

  handleUpdateText(key, text){
    const newItems = this.state.items.map((item) => {
      if(item.key != key){
        return item;
      }
      return {
        ...item,
        text
      };
    });

    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleEditing(key, editing){
    const newItems = this.state.items.map((item) => {
      if(item.key != key){
        return item;
      }
      return {
        ...item,
        editing
      };
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
              onUpdate={(text) => this.handleUpdateText(item.key, text)}
              onToggleEdit={(editing) => this.handleToggleEditing(item.key, editing)}
              onComplete={(complete) => this.handleToggleComplete(item.key, complete)}
              onRemove={() => this.handleRemoveItem(item.key)} 
              {...item}
          />);
 }

 renderLoading(){
   if(!this.state.loading)
   {
     return <View></View>;
   }
   
   return (<View style={styles.loading}>
              <ActivityIndicator 
                animating
                size="large"
              />
            </View>);
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
        onClearComplete = {this.handleClearComplete}
      />
      {this.renderLoading()}
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
  },
  loading:{
    position:"absolute",
    top:0,
    right:0,
    bottom:0,
    left:0,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,.2)"
  }
});
