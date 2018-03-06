import { Layout, Menu, Breadcrumb } from 'antd';
import  React, { Component } from 'react'
import ShowModel from './ShowModel'
import UploadModel from './UploadModel'
import { Route } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import AnalyzeModel from './AnalyzeModel'
import {clearOutBosState } from '../actions'

const { Header, Content, Footer } = Layout;
const storage = window.sessionStorage

class MyLayout extends Component{

    componentWillMount(){

        if(!storage.getItem('accessToken') || !storage.getItem('appkey'))
            this.props.dispatch(push('/login'))

    }


    handleClick = (e) => {


        console.log('click ', e);
        e.key === 'uploadModel' && this.props.dispatch(push('/uploadModel'))
        e.key === 'showModel' && this.props.dispatch(push('/showModel'))
        e.key === 'analyzeModel' && this.props.dispatch(push('/analyzeModel'))
        if(e.key === 'logout' ){
            storage.clear()
            this.props.dispatch(push('/login'))
            this.props.dispatch(clearOutBosState())
        }


    }

    render(){


        return(
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['uploadModel']}
                        style={{ lineHeight: '64px' }}
                        onClick={this.handleClick}
                    >
                        <Menu.Item key="uploadModel">上传解析模型</Menu.Item>
                        <Menu.Item key="analyzeModel">解析模型</Menu.Item>
                        <Menu.Item key="showModel">加载模型</Menu.Item>
                        <Menu.Item key="logout">登出</Menu.Item>

                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }} className='mylayout-content'>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 780 }}>
                        <Route  path={'/uploadModel'} render={()=><UploadModel  />} />
                        <Route  path={'/showModel'} render={()=><ShowModel  />} />
                        <Route  path={'/analyzeModel'} render={()=><AnalyzeModel  />} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    盈嘉互联 ©2017 Created by BIM WINNER
                </Footer>
            </Layout>
        )
    }

}

export default connect()(MyLayout)