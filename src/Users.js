import React, { Component } from "react";
import { Layout, Input, Button, Icon, DatePicker } from "antd";

// We import our firestore module
import firestore from "./firestore";

import "./App.css";

const { Header, Footer, Content } = Layout;

//const data = [];

class Users extends Component {
  constructor(props) {
    super(props);
    // Set the default state of our application
    this.state = {
      addingUser: false,
      userFirstname: "",
      userLastname: "",
      userBirthday: new Date(),
      userAge: "",
      userHobby: "",
      users: []
    };
    // We want event handlers to share this context
    this.addUser = this.addUser.bind(this);
    this.deletedUser = this.deletedUser.bind(this);
    // We listen for live changes to our todos collection in Firebase
    firestore.collection("users").onSnapshot(snapshot => {
      let users = [];
      snapshot.forEach(doc => {
        const user = doc.data();
        user.id = doc.id;
        if (!user.deleted) users.push(user);
      });
      // Sort our users based on time added
      users.sort(function(a, b) {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
      // Anytime the state of our database changes, we update state
      this.setState({ users });
    });
  }

  renderTableData() {
    return this.state.users.map((user, index) => {
      const { id, firstname, lastname, birthday, age, hobby } = user; //destructuring
      return (
        <tr key={id}>
          <td>{firstname}</td>
          <td>{lastname}</td>
          <td>{birthday}</td>
          <td>{age}</td>
          <td>{hobby}</td>
          <td>
            <Icon
              onClick={evt => this.deletedUser(id)}
              className="App-todo-delete"
              type="close-circle"
            />
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    return (
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Birthday</th>
        <th>Age</th>
        <th>Hobby</th>
        <th>Delete</th>
      </tr>
    );
  }


  handleDateChange = date => {
    this.setState({
      userBirthday: date
    });
  };

  async deletedUser(id) {
    // Mark the user as deleted
    await firestore
      .collection("users")
      .doc(id)
      .set({
        firstname: this.state.userFirstname,
        lastname: this.state.userLastname,
        birthday: this.state.userBirthday,
        age: this.state.userAge,
        hobby: this.state.userHobby,
        deleted: true
      });
  }

  async addUser(evt) {
    if (
      this.state.userFirstname === "" ||
      this.state.userLastname === "" ||
      this.state.userAge === "" ||
      this.state.userHobby === ""
    )
      return;
    // Set a flag to indicate loading
    this.setState({ addingUser: true });
    // Add a new todo from the value of the input
    await firestore.collection("users").add({
      firstname: this.state.userFirstname,
      lastname: this.state.userLastname,
      birthday: this.state.userBirthday.toString(),
      age: this.state.userAge,
      hobby: this.state.userHobby,
      deleted: false,
      createdAt: new Date().toISOString()
    });
    // Remove the loading flag and clear the input
    this.setState({
      addingUser: false,
      userFirstname: "",
      userLastname: "",
      userBirthday: "",
      userAge: "",
      userHobby: ""
    });
  }

  render() {
    return (
      <Layout className="App">
        <Header className="App-header">
          <h1>Add Users</h1>
        </Header>
        <Content className="App-content">
          <div className="Users-content-form">
            <h2>
              <Icon type="plus" />
            </h2>
            <Input
              ref="firstname-users-input"
              className="App-add-users-input"
              size="large"
              placeholder="First Name"
              disabled={this.state.addingUser}
              onChange={evt =>
                this.setState({ userFirstname: evt.target.value })
              }
              value={this.state.userFirstname}
              required
            />
            <Input
              ref="lastname-users-input"
              className="App-add-users-input"
              size="large"
              placeholder="Last Name"
              disabled={this.state.addingUser}
              onChange={evt =>
                this.setState({ userLastname: evt.target.value })
              }
              value={this.state.userLastname}
              required
            />
            <DatePicker
              ref="birthday-users-input"
              className="App-add-users-input"
              size="large"
              style={{ width: 300 }}
              format="YYYY-MM-DD"
              placeholder="Select Birthdate"
              selected={this.state.userBirthday}
              onChange={this.handleDateChange}
            />
            <Input
              ref="age-users-input"
              className="App-add-users-input"
              size="large"
              placeholder="Age"
              disabled={this.state.addingUser}
              onChange={evt => this.setState({ userAge: evt.target.value })}
              value={this.state.userAge}
              required
            />
            <Input
              ref="hobby-users-input"
              className="App-add-users-input"
              size="large"
              placeholder="Hobby"
              disabled={this.state.addingUser}
              onChange={evt => this.setState({ userHobby: evt.target.value })}
              value={this.state.userHobby}
              required
            />
            <Button
              className="App-add-users-button"
              size="large"
              type="primary"
              onClick={this.addUser}
              loading={this.state.addingUser}
            >
              Add User
            </Button>
          </div>
          <div className="Users-content-list">
            <h2>Users List</h2>

            <table id="users">
              <tbody>
                {this.renderTableHeader()}
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
        </Content>
        <Footer className="App-footer">&copy; Enye Challenge</Footer>
      </Layout>
    );
  }
}

export default Users;
