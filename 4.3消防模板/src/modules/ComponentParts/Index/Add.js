/* 添加备品备件 */
import React, { Component } from 'react';
import { Modal, Form, Row, Col, Input, Tag, Icon, Upload, Button } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import FormModalComponent from '../../../components/FormModalComponent/index';
import style from './style.sass';

@Form.create()
class Add extends FormModalComponent{
  render(): Object{
    const { getFieldDecorator }: { getFieldDecorator: Function } = this.props.form;
    const label: number = 9;
    const wrapper: number = 24 - label;
    const label2: number = 3;
    const wrapper2: number = 24 - label2;
    return (
      <Modal title="添加备品备件"
        visible={ this.props.visible }
        width="1200px"
        style={{ top: '50px' }}
        maskClosable={ false }
        destroyOnClose={ true }
        footer={ null }
      >
        <Form>
          <Row type="flex">
            <Col span={ 8 }>
              <Form.Item label="部件名称" labelCol={{ span: label }} wrapperCol={{ span: wrapper }}>
                {
                  getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '必须输入部件名称！'
                      }
                    ]
                  })(<Input />)
                }
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="部件型号" labelCol={{ span: label }} wrapperCol={{ span: wrapper }}>
                {
                  getFieldDecorator('number', {
                    rules: [
                      {
                        required: true,
                        message: '必须输入部件型号！'
                      }
                    ]
                  })(<Input />)
                }
              </Form.Item>
            </Col>
            <Col span={ 24 }>
              <Form.Item label="部件分类" labelCol={{ span: label2 }} wrapperCol={{ span: wrapper2 }}>
                <div>
                  <Tag closable={ true }>分类1</Tag>
                  <Tag closable={ true }>分类2</Tag>
                  <Tag closable={ true }>分类3</Tag>
                  <Tag closable={ true }>分类4</Tag>
                  <Tag closable={ true }>分类5</Tag>
                  <Tag style={{ borderStyle: 'dashed', background: '#fff' }}>
                    <Icon type="plus" />
                    添加分类
                  </Tag>
                </div>
              </Form.Item>
            </Col>
            <Col span={ 24 }>
              <Form.Item label="部件参数" labelCol={{ span: label2 }} wrapperCol={{ span: wrapper2 }}>
                <div className={ style.editor }>
                  <BraftEditor height={ 240 } />
                </div>
              </Form.Item>
            </Col>
            <Col span={ 24 }>
              <Form.Item label="模型上传" labelCol={{ span: label2 }} wrapperCol={{ span: wrapper2 }}>
                <Upload>
                  <Button icon="file">模型上传</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          {
            this.ModalFooter({
              onCancel: this.onCancel.bind(this)
            })
          }
        </Form>
      </Modal>
    );
  }
}

export default Add;