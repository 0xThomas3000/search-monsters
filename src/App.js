import React, { useEffect, useState } from 'react';
import { SearchBox } from './components/search-box/search-box.component';
import {CardList} from './components/card-list/card-list.component';
import './App.css';

/*  
 *  Functional Component: 
 *    + All React is going to do is run this function top to bottom.
 *    + Finally, the UI will be the thing that this function returns.
 *    + No more need for "constructor(), lifecycle methods, render() method"
 */
const App = () => {
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [stringField, setStringField] = useState('');

  console.log('render');
  
  useEffect(() => {
    console.log('effect fired');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => setMonsters(users));
  }, []);
  
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  const onStringChange = (event) => {
    setStringField(event.target.value);
  }

  const filteredMonsters = monsters.filter((monster) => {
    return monster.name.toLocaleLowerCase().includes(searchField);
  });

  console.log(filteredMonsters);

  return ( 
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox
        className='monsters-search-box'
        placeholder='search monsters'
        onChangeHandler={onSearchChange}
      />
      <SearchBox
        placeholder='set string'
        onChangeHandler={onStringChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: '',
//     }

//     this.handleChange = this.handleChange.bind(this);
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(users => this.setState({ monsters: users }));
//   }

//   handleChange(e) {
//     this.setState({ searchField: e.target.value });
//   }

//   render() {
//     const { monsters, searchField } = this.state;
//     const filteredMonsters = monsters.filter(monster =>
//       monster.name.toLowerCase().includes(searchField.toLowerCase())
//     );
//     return (
//       <div className="App">
//         <h1>Monsters Rolodex</h1>
//         <SearchBox
//           placeholder='search monsters'
//           handleChange={this.handleChange}
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     )
//   };
// }

export default App;