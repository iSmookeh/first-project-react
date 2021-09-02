import React, { useState, useCallback, useEffect } from "react";
import {
  Table,
  Button,
  Drawer,
  Input,
  Form,
  InputNumber,
  notification,
} from "antd";
import api from "core/services/api";

import "./products-table.styles.scss";

const Component = () => {
  const [products, setProducts] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("register");
  const [form] = Form.useForm();

  const onGetProductsCallback = useCallback(async () => {
    setLoadingTable(true);
    const response = await api.get("products");
    setLoadingTable(false);
    setProducts(response.data.list);
  }, [api]);

  useEffect(() => {
    onGetProductsCallback();
  }, [onGetProductsCallback]);

  const deleteItem = async (id) => {
    const response = await api.delete(`products/${id}`);
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
    onGetProductsCallback();
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
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        console.log(record);
        return (
          <Button
            type="link"
            onClick={() => {
              showDrawer();
              setType("edit");
              form.setFieldsValue(record);
            }}
          >
            Editar
          </Button>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, index) => {
        console.log(id);
        return (
          <Button type="link" onClick={() => deleteItem(id)}>
            Excluir
          </Button>
        );
      },
    },
  ];

  const onClose = () => {
    setVisible(false);
  };

  const showDrawer = () => {
    setType("register")
    setVisible(true);
  };

  const onFinish = async (values) => {
    setLoadingButton(true);

    let response;
    if (type == "edit") {
      response = await api.put(`products/${form.getFieldValue("id")}`, values);
    } else {
      response = await api.post("products", values);
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
      onGetProductsCallback();
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
          <Form.Item label="Value:" name="value" rules={[{ required: true }]}>
            <InputNumber min={1} max={999} />
          </Form.Item>
          <Form.Item
            label="Quantity:"
            name="quantity"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={999} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loadingButton}>
            Salvar
          </Button>
        </Form>
      </Drawer>
      <div className="under-line">
        <p>Quantidade de itens: {products.length}</p>
        <Button type="primary" onClick={showDrawer}>
          Adicionar
        </Button>
      </div>
      <Table
        className="table-container"
        loading={loadingTable}
        dataSource={products}
        columns={columns}
      />
    </div>
  );
};

export default Component;
