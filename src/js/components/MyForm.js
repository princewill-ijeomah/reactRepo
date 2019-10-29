import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../actions/index";
import { Form, Input, Button, DatePicker } from "antd";

function mapDispatchToProps(dispatch) {
  return {
    addUser: user => dispatch(addUser(user))
  };
}

class ConnectedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      birthday: new Date(),
      age: "",
      hobby: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.addUser({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      birthday: this.state.birthday,
      age: this.state.age,
      hobby: this.state.hobby
    });
    this.setState({
      firstname: "",
      lastname: "",
      birthday: "",
      age: "",
      hobby: ""
    });

    /**const {
      form: { validateFields }
    } = this.props;

    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values);
    });**/
  };

  handleDateChange = date => {
    this.setState({
      birthday: date.toISOString()
    });
  };

  render() {
    /**const {
      form: { getFieldDecorator }
    } = this.props;

    const firstnameDecorator = getFieldDecorator("firstname");
    const lastnameDecorator = getFieldDecorator("lastname");
    const birthdayDecorator = getFieldDecorator("birthday");
    const ageDecorator = getFieldDecorator("age");
    const hobbyDecorator = getFieldDecorator("hobby");**/

    return (
      <section>
        <Form name="form" layout="horizontal" onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input
              id="firstname"
              placeholder="First name"
              onChange={this.handleChange}
              value={this.state.firstname}
            />
          </Form.Item>

          <Form.Item>
            <Input
              id="lastname"
              placeholder="Last name"
              onChange={this.handleChange}
              value={this.state.lastname}
            />
          </Form.Item>

          <Form.Item>
            <DatePicker
              id="birthday"
              format="YYYY-MM-DD"
              style={{ width: 380 }}
              placeholder="Birthday"
              selected={this.state.birthday}
              onChange={this.handleDateChange}
            />
          </Form.Item>

          <Form.Item>
            <Input
              id="age"
              placeholder="Age"
              onChange={this.handleChange}
              value={this.state.age}
            />
          </Form.Item>

          <Form.Item>
            <Input
              id="hobby"
              placeholder="Hobby"
              onChange={this.handleChange}
              value={this.state.hobby}
            />
          </Form.Item>

          <Form.Item buttonsContainer>
            <Button type="primary" size="default" htmlType="submit">
              Add User
            </Button>
          </Form.Item>
        </Form>
      </section>
    );
  }
}

const MyForm = connect(
  null,
  mapDispatchToProps
)(ConnectedForm);

export default Form.create()(MyForm);
