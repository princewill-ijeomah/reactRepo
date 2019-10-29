// src/js/components/List.js
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { users: state.users };
};

const ConnectedList = ({ users }) => (
  <table id="users">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Birthday</th>
        <th>Age</th>
        <th>Hobby</th>
      </tr>
    </thead>
    <tbody>
      {users.map(el => (
        <tr key={el.id}>
          <td>{el.firstname}</td>
          <td>{el.lastname}</td>
          <td>{el.birthday}</td>
          <td>{el.age}</td>
          <td>{el.hobby}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;
