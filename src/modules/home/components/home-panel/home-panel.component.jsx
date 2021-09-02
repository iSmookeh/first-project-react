import React, { useState, useCallback, useEffect } from "react";
import { Button, Drawer, Carousel, Input, Form, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "core/services/api";

import Image from "core/components/image/image.component";

import "./home-panel.styles.scss";

const Component = () => {
  const [visible, setVisible] = useState(false);
  const [carousel, setCarousel] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [form] = Form.useForm();

  const onGetCarouselCallback = useCallback(async () => {
    const response = await api.get("carousel");
    setCarousel(response.data.list);
  }, [api]);

  useEffect(() => {
    onGetCarouselCallback();
  }, [onGetCarouselCallback]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const removeCarouselItem = async (id) => {
    const response = await api.delete(`carousel/${id}`);
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
    onGetCarouselCallback();
  };
 

  const onFinish = async (values) => {
    setLoadingButton(true);

    const response = await api.post("carousel", values);

    setTimeout(() => {
      if (response.status === 200) {
        notification["success"]({
          message: "Sucesso!",
          description: "Seu item foi adicionado com sucesso",
        });
      } else {
        notification["error"]({
          message: "Erro!",
          description: "Erro inesperado",
        });
      }
      setLoadingButton(false);
      onGetCarouselCallback();
      setVisible(false);
    }, 2000);
  };



  return (
    <div className="container">
      <Drawer
        title="Adicionar Imagem"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            label="Digite a URL:"
            name="link"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loadingButton}>
            Salvar
          </Button>
        </Form>
      </Drawer>
      <Carousel style={{ width: 500 }}>
        {carousel.map(({link, id}) => {
          return (
            <div>
              <div onClick={() => removeCarouselItem(id)}>X</div>
              <h3 className="carousel-item">
                <Image
                  width={"500px"}
                  height={"180px"}
                  image={link}
                />
              </h3>
            </div>
          );
        })}
      </Carousel>
      <div className="add-button">
        <Button icon={<UploadOutlined />} type="primary" onClick={showDrawer}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Component;
