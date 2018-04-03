/**
 * Modal表单组件
 * Modal + Form都继承此类
 * 里面封装了一些常用的函数
 */
import React, { Component } from 'react';
import { message, Button } from 'antd';
import $ from 'jquery';
import { accessToken, headers, id } from '../../function';
import style from './style.sass';

class FormModalComponent extends Component{
  // Modal Footer，由于Form表单的问题，替换原有的Footer
  ModalFooter({ btnLoading, onCancel }: { btnLoading: boolean, onCancel: Function }): Object{
    return (
      <div className={ `ant-modal-footer ${ style.antModalFooter }` }>
        <div>
          <Button loading={ btnLoading } onClick={ onCancel }>取消</Button>
          <Button type="primary" htmlType="submit" loading={ btnLoading }>确认</Button>
        </div>
      </div>
    );
  }
  // 取消
  onCancel(event: Event): void{
    this.props.form.resetFields();
    this.props.onCancel();
  }
  // 上传前验证文件类型是否是ifc格式的文件
  onBeforeUploadIfc(file: Object, FileList: Object[]): void{
    const isIfc: boolean = /^.+\.ifc$/.test(file.name);
    if(!isIfc) message.warn('请上传ifc格式的文件！');  // 验证上传前文件格式
    return isIfc;
  }
  /**
   * 上传文件清除权限
   * @param { string } code: 文件的code
   */
  deleteFilesGacl(code: string): void{
    $.ajax({
      url: window.config.gacl,
      type: 'DELETE',
      dataType: 'text',
      async: true,
      data: JSON.stringify([
        {
          bosclass: 'files',
          code,
          principal: `user/${ id() }`
        }
      ]),
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, headers())
    });
  }
  /**
   * 重写文件上传
   * @param { string } id : ajax文件上传的form标签id
   * @param { string } key: 需要修改的state的key
   * @param { any } item
   */
  onCustomRequest(id: string, key: string, item: any): void{
    const _this: this = this;
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    const data: FormData = new FormData(document.getElementById(id));
    data.append('file', item.file);
    // 上传
    xhr.open('POST', item.action, true);
    xhr.setRequestHeader('Authorization', `AccessToken ${ accessToken() }`);
    xhr.addEventListener('readystatechange', function(event: Event): void{
      if(xhr.readyState === 4){
        // 获取响应头内的Location
        const responseHeaders: string = xhr.getResponseHeader('Location');
        const key2: string[] = responseHeaders.split('/');
        const location: string = key2[key2.length - 1];
        // 清除权限
        _this.deleteFilesGacl(location);

        const name: string = item.file.name;
        const uploadList: uploadList = _this.state[key];
        uploadList.push({
          uid: location,
          name,
          url: location
        });
        _this.setState({
          [key]: uploadList
        });
      }
    }, false);
    xhr.send(data);
  }
  // Upload组件的点击文件链接，下载文件
  async onPreviewDownload(id: string, file: Object): Promise<void>{
    const { name, url }: {
      name: string,
      url: string
    } = file;
    // 下载文件
    const blob: Blob = await fetch(window.config.upload + url + '/download/', {
      headers: headers()
    }).then((res: any): Blob=>{
      return res.blob();
    });
    // 生成链接
    const objectUrl: any = window.URL.createObjectURL(blob);
    const $aEle: jQuery = $('#' + id);
    $aEle.prop('href', objectUrl).prop('download', name);
    $aEle[0].click();
    window.URL.revokeObjectURL(objectUrl);
  }
  // 删除文件
  onRemoveFile(key: string, file: Object): boolean{
    const l: Array = this.state[key];
    let index: number = null;
    for(let i: number = 0, j: number = l.length; i < j; i++){
      if(file.uid === l[i].uid){
        index = i;
        break;
      }
    }
    l.splice(index, 1);
    this.setState({
      [key]: l
    });
    return index !== null;
  }
}

export default FormModalComponent;