import React, { useState, useCallback, useEffect } from "react";
import { Table, Button, Drawer, Input, Form, notification, Space } from "antd";
import api from "core/services/api";

import "./categories-table.styles.scss";

const Component = () => {
  const [categories, setCategories] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [type, setType] = useState("register");
  const [form] = Form.useForm();

  const onGetCategoriesCallback = useCallback(async () => {
    setLoadingTable(true);
    const response = await api.get("categories");
    setLoadingTable(false);
    setCategories(response.data.list);
  }, [api]);

  useEffect(() => {
    onGetCategoriesCallback();
  }, [onGetCategoriesCallback]);

  const deleteItem = async (id) => {
    const response = await api.delete(`categories/${id}`);
    if (response.status === 200) {
      notification["success"]({
        message: "Excluido com sucesso!",
        description: "Seu item foi deletado",
      });
    } else {
      notification["error"]({
        message: "Erro!",
        description: "Erro inesperado",
      });
    }
    onGetCategoriesCallback();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <Space size="middle">
          <a
            type="link"
            onClick={() => {
              showDrawer();
              setType("edit");
              form.setFieldsValue(record);
            }}
          >
            Editar
          </a>
          <a type="link" onClick={() => deleteItem(id)}>Excluir</a>
        </Space>
      ),
    },
  ];

  const onClose = () => {
    setVisible(false);
  };

  const showDrawer = () => {
    setType("register");
    setVisible(true);
  };

  const onFinish = async (values) => {
    setLoadingButton(true);

    let response;
    if (type == "edit") {
      response = await api.put(
        `categories/${form.getFieldValue("id")}`,
        values
      );
    } else {
      response = await api.post("categories", values);
    }
    setTimeout(() => {
      if (response.status === 200) {
        notification["success"]({
          message: "Sucesso!",
          description:
            type == "edit"
              ? "Seu item foi alterado com sucesso"
              : "Seu item foi adicionado com sucesso",
        });
      } else {
        notification["error"]({
          message: "Erro!",
          description: "Erro inesperado",
        });
      }
      setLoadingButton(false);
      onGetCategoriesCallback();
      setVisible(false);
    }, 2000);
  };

  return (
    <div className="container">
      <Drawer
        title={type === "register" ? "Registrar" : "Alterar"}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item label="Name:" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Description:"
            name="description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loadingButton}>
            Salvar
          </Button>
        </Form>
      </Drawer>
      <div className="under-line">
        <p>Quantidade de itens: {categories.length}</p>
        <Button type="primary" onClick={showDrawer}>
          Adicionar
        </Button>
      </div>
      <Table
        className="table-container"
        loading={loadingTable}
        columns={columns}
        dataSource={categories}
      />
    </div>
  );
};

export default Component;
