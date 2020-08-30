import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component{  
  
  constructor(props){
    super(props);
    console.log('App.js constructor');
  }

  getDerivedStateFromProps(props,state){
    return true;
  }

  state = {
    persons: [
      {name:"Max", age:28, id:1},
      {name:"Manu", age:29, id:2},
      {name:"Stephanie", age:26, id:3}
    ],
    otherState:'some other state',
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {return p.id===id});
    const person={
      ...this.state.persons[personIndex]
    };
    person.name=event.target.value;
    const persons = [...this.state.persons]
    persons[personIndex] = person;

    this.setState({ persons:persons });
  };

  togglePersonsHandler = () =>{
    const oldState= this.state.showPersons;
    this.setState({showPersons:!oldState})
  }

  deletePersonHandler = (personIndex) =>{
    const persons=this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render () {  
    console.log('App.js render...')  
    let persons = null;    

    if(this.state.showPersons){
      persons = (
        <div>
          <Persons 
            persons = {this.state.persons}
            clicked = {this.deletePersonHandler} 
            changed = {this.nameChangedHandler}/>          
        </div>
      );

    }   

      return (
          <div className = {classes.App}>
            <Cockpit
              title={this.props.title}
               persons = {this.state.persons}
               togglePersons = {this.togglePersonsHandler} 
               showPersons = {this.state.showPersons} />
            {persons}
          </div>
      );
    }
}

export default App;