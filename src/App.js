import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import UserForm from './UserForm';

const GET_USER = gql`
  query {
    user(id: 1) {
      first_name
      last_name
      phone
      id
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          return (
            <UserForm user={data.user} />
          );
        }}
      </Query>
    );
  }
}

export default App;
