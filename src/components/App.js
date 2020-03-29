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
      .then(this.componentDidMount())

  }

  handleDelete(emp) {
    axios.delete(`http://localhost:5000/${emp}`)
      .then(this.componentDidMount())
  }

  renderBody() {
    const { employees } = this.state
    if (employees.length === 0) {
      return ''
    } else {
      return employees.map((emp, i) => {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{emp.firstName}</td>
            <td>{emp.lastName}</td>
            <td><button onClick={() => this.handleDelete(emp.firstName)}>Delete</button></td>
          </tr>
        )
      })
    }
  }


  render() {
    return (
      <div >
        <h1>Student Record</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {this.renderBody()}
          </tbody>
        </table>
        <h2>Add Record</h2>
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
