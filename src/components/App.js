import React, { Component } from 'react';
import axios from 'axios';




class App extends Component {

  state = {
    employees: [],
    firstName: '',
    lastName: ''
  }

  componentDidMount() {
    const emp = axios.get('http://localhost:5000/')
      .then(res => {
        console.log(res.data.recordset)
        this.setState({ employees: res.data.recordset })
      })


  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/',
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      }
    )
      .then(res => console.log('json', res.data))
    console.log('event', e)
  }

  renderBody() {
    const { employees } = this.state
    console.log(employees)
    if (employees.length === 0) {
      return ''
    } else {
      return employees.map((emp, i) => {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{emp.firstName}</td>
            <td>{emp.lastName}</td>
          </tr>
        )
      })
    }




  }


  render() {
    return (
      <div >

        <table>
          <thead>
            <tr>
              <th>no</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {this.renderBody()}
          </tbody>
        </table>
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
