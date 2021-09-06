import React, { useState, useCallback, useEffect, createElement } from "react";
import {
  Button,
  Drawer,
  Carousel,
  Input,
  Form,
  notification,
  Comment,
  Avatar,
  Tooltip,
} from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  UploadOutlined,
} from "@ant-design/icons";
import api from "core/services/api";
import moment from "moment";
import Image from "core/components/image/image.component";

import "./home-panel.styles.scss";

const { TextArea } = Input;
const Component = () => {
  const [visible, setVisible] = useState(false);
  const [carousel, setCarousel] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [form] = Form.useForm();
  const [visibleReply, setVisibleReply] = useState(false);
  const [comment, setComment] = useState([]);

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

  const onGetCommentCallback = useCallback(async () => {
    const response = await api.get("comment");
    console.log(response.data.list);
    setComment(response.data.list);
  }, [api]);

  useEffect(() => {
    onGetCommentCallback();
  }, [onGetCommentCallback]);

  const Editor = ({ onChange, value }) => {
    return (
      <Form onFinish={addComment}>
        <Form.Item name="message">
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Comentar
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const addComment = async (values) => {
    const response = await api.post("comment", values);
    if (response.status === 200) {
      onGetCommentCallback();
      setVisibleReply(false);
    } else {
      notification["error"]({
        message: "Erro!",
        description: "Erro inesperado",
      });
    }
  };

  const like = async (id) => {
    const response = await api.put("like", { id_comment: id, id_user: "1" });
    if (response.status === 200) {
      onGetCommentCallback();
    } else {
      notification["error"]({
        message: "Erro!",
        description: "Erro inesperado",
      });
    }
  };

  const reply = () => {
    setVisibleReply(true);
  };

  const deleteComment = async (id) => {
    const response = await api.delete(`comment/${id}`);
    if (response.status === 200) {
      notification["success"]({
        message: "Apagado com sucesso!",
        description: "Seu comentário foi apagado",
      });
    } else {
      notification["error"]({
        message: "Erro!",
        description: "Erro inesperado",
      });
    }
    onGetCommentCallback();
  };
  

  const ExampleComment = ({ message, likes, id }) => (
    <Comment
      actions={[
        <span onClick={() => like(id)}>
          {React.createElement(LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>,
        <span onClick={reply} key="comment-list-reply-to-0">
          Responder
        </span>,
      ]}
      author={<div className="deleteComment"><a>Octavio</a> <p className="X" onClick={() => deleteComment(id)}>X</p></div>}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Octavio"
        />
      }
      content={<p>{message}</p>}
      
    />
  );

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
        {carousel.map(({ link, id }) => {
          return (
            <div>
              <div className="excluir-img">
                <div className="X" onClick={() => removeCarouselItem(id)}>
                  X
                </div>
              </div>
              <h3 className="carousel-item">
                <Image width={"500px"} height={"180px"} image={link} />
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
      {comment.map(({ message, likes, id }) => {
        return (
          <ExampleComment
            message={message}
            likes={likes.length}
            id={id}
          ></ExampleComment>
        );
      })}

      {visibleReply == true ? <Editor /> : null}
    </div>
  );
};

export default Component;
