import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = { todos: [] };
    this.add = this.add.bind(this);
    // this.remove = this.remove.bind(this,v.todos);
  }
  add() {
    
    console.log("add")
    // let items = {
    //   textfield: this.refs.textfield.getValue(),
    // };

    let refRoot = firebase.database().ref('listItems')
    refRoot.push({ textfield: this.refs.textfield.getValue() });
    // console.log(items);

  }//add funtion

  remove(v,id) {
    // console.log("remove");
    console.log(v);
    let refRoot = firebase.database().ref(`/listItems/${v.id}`)
    refRoot.remove().then((nothing) => {
    console.log(v,v.id);
      let allTodos = this.state.todos;
      let indexRemove;
      for (var i = 0; i < allTodos.length; i++) {
        if (allTodos[i].id === v.id) {
          indexRemove = i;
        }
      }
      allTodos = allTodos.slice(0, indexRemove).concat(allTodos.slice(indexRemove + 1))
      this.setState({ todos: allTodos });
    })
  }; //remove function

  componentWillMount() {
    let refRoot = firebase.database().ref('/listItems')
    refRoot.on('child_added', (data) => {
      var obj = data.val();
      obj.id = data.key;
      console.log(obj)
      let currentTodo = this.state.todos;
      
      currentTodo.push(obj)

      this.setState({
        todos: currentTodo
      })
      console.log(this.state.todos);
    })
  } // componentWillMount funtion

  render() {
    const style = {
      marginLeft: 10,

    };

    return (
      <div className="App">
        <AppBar title="To Do App" />
        <br /><br /><br /><br />

        <TextField
          ref="textfield"
          hintText="Enter any thing"
          
        />

        <FloatingActionButton onTouchTap={this.add} mini={true} style={style}>
          <ContentAdd />
        </FloatingActionButton>


        {this.state.todos.map((v, index) => {
          return (
            <Table  >
              <TableBody  >
                <TableRow >
                  <TableRowColumn key={index}> {v.textfield}  </TableRowColumn>
                  <TableRowColumn><IconButton onTouchTap={this.remove.bind(this, v)}><NavigationClose /></IconButton></TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          ) // return
        })
        }
      </div>

    ) //render return
  } // render
} // class

export default App;
