import React, { Component } from 'react';
import { Row, Col } from 'antd';
import style from './style.sass';
import UserInformation from './UserInformation';

class Index extends Component{
  render(): Object{
    return (
      <div>
        <Row type="flex" gutter={ 10 }>
          <Col className={ style.col } xs={ 24 } sm={ 24 } md={ 24 } lg={ 8 }>
            <UserInformation />
          </Col>
          <Col xs={ 24 } sm={ 24 } md={ 24 } lg={ 16 } />
        </Row>
      </div>
    );
  }
}

export default Index;