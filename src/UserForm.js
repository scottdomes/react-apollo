import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const updateUser = gql`
  mutation updateUser(
    $id: ID!
    $first_name: String
    $last_name: String
    $phone: String
  ) {
    updateUser(
      id: $id
      first_name: $first_name
      last_name: $last_name
      phone: $phone
    ) {
      first_name
      last_name
      phone
    }
  }
`;

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.user,
      error: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, phone, id } = this.state;
    this.props
      .mutate({
        variables: { first_name, last_name, phone, id },
      })
      .then(({ data }) => {
        this.setState({ error: '' });
        console.log('got data', data);
      })
      .catch(error => {
        this.setState({ error });
        console.log('there was an error sending the query', error);
      });
  };

  render() {
    const { first_name, last_name, phone, error } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="first_name">First name</Label>
          <Input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="Your first name..."
            value={first_name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="first_name">Last name</Label>
          <Input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Your first name..."
            value={last_name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="Your phone number..."
            value={phone}
            onChange={this.handleChange}
          />
        </FormGroup>
        <p>{error.message}</p>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default graphql(updateUser)(UserForm);
