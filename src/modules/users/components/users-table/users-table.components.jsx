import React, { useState, useCallback, useEffect } from "react";
import { Table } from "antd";
import api from "core/services/api";

import "./users-table.styles.scss";

const Component = () => {
  const [users, setUsers] = useState([]);

  const columns = [
    {
      
      title: "ID",
      dataIndex: "id",
      key: "id",
    }, 
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    }, 
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    }, 
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      render: (lastName)=>{
        return <b>{lastName}</b>
    } 
    }, 
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (link)=>{
          return <img src={link}/>
      }
    }, 
  ];

  const onGetUsersCallback = useCallback(async () => {
    const response = await api.get("users?page=2");
    console.log(response);
    setUsers(response.data.data);
  }, [api]);

  useEffect(() => {
    onGetUsersCallback();
  }, [onGetUsersCallback]);

  return (
    <div>
      <Table dataSource={users} columns={columns} />;
    </div>
  );
};

export default Component;
