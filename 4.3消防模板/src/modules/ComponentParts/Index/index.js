import React, { Component, Fragment } from 'react';
import { Input, Button, Table } from 'antd';
import ListComponent from '../../../components/ListComponent';
import publicStyle from '../../../components/publicStyle/style.sass';
import Add from './Add';

class ComponentParts extends ListComponent{
  state: {
    addModal: boolean
  };

  constructor(): void{
    super(...arguments);

    this.state = {
      addModal: false
    };
  }
  // 表格表头
  columns(): Array{
    return [
      {
        title: '部件名称',
        key: 'name',
        dataIndex: 'name',
        width: '20%'
      },
      {
        title: '部件编号',
        key: 'number',
        dataIndex: 'number',
        width: '20%'
      },
      {
        title: '审核情况',
        key: 'active',
        dataIndex: 'active',
        width: '20%'
      },
      {
        title: '模型下载次数',
        key: 'downloadTimes',
        dataIndex: 'downloadTimes',
        width: '20%'
      },
      {
        title: '操作',
        key: 'handle',
        width: '20%'
      }
    ];
  }
  render(): Object{
    return (
      <Fragment>
        <div className={ publicStyle.searchTools }>
          <label htmlFor="component-parts-search">搜索部品部件：</label>
          <Input className={ publicStyle.searchCtrl } id="component-parts-search" />
          <Button className={ publicStyle.searchSpaceLeft }>搜索</Button>
          <Button className={ publicStyle.searchSpaceLeft } type="primary" onClick={ this.onModalDisplay.bind(this, 'addModal', true) }>添加部品部件</Button>
        </div>
        <Table size="middle" columns={ this.columns() } bordered={ true } dataSource={[]} rowKey={ (item: Object): string => item.code } />
        <Add visible={ this.state.addModal } onCancel={ this.onModalDisplay.bind(this, 'addModal', false) } />
      </Fragment>
    );
  }
}

export default ComponentParts;