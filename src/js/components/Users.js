import React from "react";
import { Layout, Icon } from "antd";

import "../../App.css";
import List from "./List";
import MyForm from "./MyForm";

const { Header, Footer, Content } = Layout;

const Users = () => (
  <Layout className="App">
    <Header className="App-header">
      <h1>Add Users</h1>
    </Header>

    <Content className="App-content">
      <div className="Users-content-form">
        <h2>
          <Icon type="plus" />
        </h2>
        <MyForm />
      </div>
      <div className="Users-content-list">
        <h2>
          <Icon type="table" />
        </h2>
        <List />
      </div>
    </Content>

    <Footer className="App-footer">&copy; Enye Challenge</Footer>
  </Layout>
);

export default Users;
