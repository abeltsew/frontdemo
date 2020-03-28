import React, { Component } from 'react';
import axios from 'axios';




class App extends Component {

  state = {
    employees: [],
    firstName: '',
    lastName: ''
  }

  componentDidMount() {
    const emp = axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        console.log(res.data)
      })

    this.setState({ employees: emp })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/posts',
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userId: 1
      }
    )
      .then(res => console.log('json', res.data))
    console.log('event', e)
  }


  render() {
    return (
      <div >
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="fname">First name:</label><br />
          <input
            type="text"
            id="fname"
            name="fname"
            value={this.state.firstName}
            onChange={(e) => this.setState({ firstName: e.target.value })} /><br />
          <label htmlFor="lname">Last name:</label><br />
          <input type="text" id="lname" name="lname"
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          /><br /><br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

export default App;
