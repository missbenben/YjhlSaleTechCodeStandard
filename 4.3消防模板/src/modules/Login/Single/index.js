/* 注册 */
import React, { Component } from 'react';
import { Tabs } from 'antd';
import Title from '../../../assembly/Title/index';
import style from './style.sass';
import GeneralUserSingle from './GeneralUserSingle';
import FactorySingle from './FactorySingle';
import DesignerSingle from './DesignerSingle';

class Single extends Component{
  render(): Array{
    return [
      <Title key={ 0 }>注册账号</Title>,
      <div key={ 1 } className={ style.single }>
        <div className={ style.singleTabs }>
          <Tabs>
            <Tabs.TabPane key="1" tab="普通用户注册">
              <GeneralUserSingle />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="生产厂家注册">
              <FactorySingle />
            </Tabs.TabPane>
            <Tabs.TabPane key="3" tab="设计师注册">
              <DesignerSingle />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    ];
  }
}

export default Single;