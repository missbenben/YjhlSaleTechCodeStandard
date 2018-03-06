import React, { Component } from 'react';
import './App.css';
import Tree from './Tree'

class App extends Component {

   state={
       bim:null,
       fileKey:null,
       account:{
           name:'longhu',
           password:'longhu123'
       },
       accessToken:null,
   }

   nameOrder = (a,b) =>{
       return (a.name < b.name )? -1 : 1
   }


 componentDidMount(){
     fetch("http://api.rickricks.com/v1/account/login",{ headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },method:'POST',body:JSON.stringify(this.state.account)}).then(response => response.json()).then(responseJson =>{

         console.log('登录成功返回的额值=========',responseJson)

     //拿到返回的accessToken
     let access=responseJson.data.access_token

     //bos需要的参数
     let op = {
         //注意这里需要和上面创建<div>的id名称一样
         viewport: "viewport",
         baseaddress: "http://api.rickricks.com/v1/",
         type:"app",
         accessToken:access,
         appKey:"ma05576872d6444eb09fde7bf56a3e6a",
         imgURL:"./libs/viewerplus/3.0.0/css/img"
     };

     //创建一个主对象，将上面配置好的参数放入
     var wgb = new window.BIMWINNER.Viewer(op);

         wgb.autoResize=false

     wgb.resize(800,1300)
     //     wgb.resize(400,615)


         wgb.listentoSelectObjs(function (aaa, bbb) {
         console.log(aaa);
         console.log(bbb);
     });

     // 创建工具栏。 创建Tool对象时需要上一步中创建的主对象作为参数传递到Tool对象中去。
     var tool = new window.BIMWINNER.Tool(wgb);
     tool.createTool();

     this.setState({bim:wgb})
     //显示模型，按照文件加载，将filekey作为参数传入

     return access
 }).then(access => {
         this.setState({accessToken: access})
         fetch("http://api.rickricks.com/v1/ma05576872d6444eb09fde7bf56a3e6a/files?noRelation=true", {
             headers: {
                 'Authorization': `AccessToken ${access}`
             }
         })
             .then(response => response.json())
             .then(filekeys => this.setState({fileKey: filekeys.sort(this.nameOrder)}))
     })
 }


  render() {
      console.log("App的files===========",this.state.fileKey)

      return (
          <div className="App">
              <Tree  bim={this.state.bim} file={this.state.fileKey}  access={this.state.accessToken} />
              <div className="model" id="viewport"/>
          </div>
    );
  }
}

export default App;
