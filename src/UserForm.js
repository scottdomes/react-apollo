import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
      newAddress: {
        street: '',
      },
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

  handleNewAddressChange = e => {
    this.setState({
      newAddress: { ...this.state.newAddress, [e.target.name]: e.target.value },
    });
  };

  render() {
    const {
      first_name,
      last_name,
      phone,
      error,
      addresses,
      newAddress,
    } = this.state;
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
        {addresses.map((address, i) => {
          return (
            <FormGroup key={address.id}>
              <Label for={`addresss${address.id}`}>Address #{i + 1}</Label>
              <Input
                type="text"
                name={`addresss[${i}].name`}
                id={`addresss${address.id}`}
                placeholder="Your street"
                value={address.street}
                onChange={this.handleChange}
              />
            </FormGroup>
          );
        })}
        <FormGroup>
          <Label for="new-address">Add Address:</Label>
          <Input
            type="text"
            name="street"
            id="new-address"
            placeholder="Your street"
            value={newAddress.street}
            onChange={this.handleNewAddressChange}
          />
        </FormGroup>
        <p>{error.message}</p>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default graphql(updateUser)(UserForm);
