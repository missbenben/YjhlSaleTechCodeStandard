/**
 * 列表组件
 * 顶部搜索添加，中部显示表格的页面都会继承此类
 * 封装了一些常用的函数
 */
import React, { Component } from 'react';
import { formatKeywords, id } from '../../function';

class ListComponent extends Component{
  // Modal的显示和隐藏
  onModalDisplay(key: string, value: boolean, event: Event): void{
    this.setState({
      [key]: value
    });
  }
  // 查看的Modal层的显示和隐藏
  onLookItem(item: ?Object, modalKey: string, event: Event): void{
    event.stopPropagation();
    this.setState({
      [modalKey]: true,
      item
    });
  }
  // input表单同步
  onInputChange(key: string, event: Event): void{
    this.setState({
      [key]: event.target.value
    });
  }
  /**
   * 添加权限的接口
   * @param { string } bosclass: 类
   * @param { string } code    : code
   * @return { Array<Object> }
   */
  interface_gacl(bosclass: string, code: string): Array<{
    bosclass: string,
    key: string,
    flags: string,
    principal: string,
    permissions: string
  }>{
    return [
      {
        bosclass,
        key: code,
        flags: 'g',
        principal: 'roles/_ALL',
        permissions: 'rwdc'
      }
    ];
  }
  /**
   * 关键字搜索过滤
   * 关键字匹配多个key，如果有一个key满足，就返回数据
   * ！该函数用于接口返回所有数据时的数据筛选，现在大部分模块是异步分页，但仍有少部分模块是返回所有数据的，所以要暂时保留此函数
   * @param { Array } rawData      : 需要过滤的数据
   * @param { RegExp } searchKeyReg: 匹配的正则表达式
   * @param { number } from        : 起始匹配索引
   * @param { number } to          : 结束匹配索引
   * @param { Array<string> } key  : 匹配的key
   * @return { Array }
   */
  searchFiltering(rawData: Array, searchKeyReg: RegExp, from: number, to: number, key: string[]): Array{
    if(!searchKeyReg || rawData.length === 0) return rawData;
    // from === to时，判断name和code
    if(from === to){
      const item: Object = rawData[from];
      for(let i: number = key.length - 1; i >= 0; i--){
        if(searchKeyReg.test(item[key[i]])) return [item];
      }
      return [];
    }
    // 拆分
    const middle: number = Math.floor((to - from) / 2) + from;
    return this.searchFiltering(rawData, searchKeyReg, from, middle, key).concat(
      this.searchFiltering(rawData, searchKeyReg, middle + 1, to, key)
    );
  }

  /**
   * 搜索，点击搜索按钮或在搜索框回车后的事件
   * 改变的是搜索需要匹配的正则表达式
   * ！该函数用于接口返回所有数据时的数据筛选匹配的正则表达式，现在大部分模块是异步分页，但仍有少部分模块是返回所有数据的，所以要暂时保留此函数
   * @param { string } key : this.setState 要改变的值的key
   * @param { Event } event
   */
  onSearch(key: string, event: Event): void{
    const reg: ?RegExp = /^\s*$/.test(this.state.searchKeyString)
      ? null : new RegExp(`(${ formatKeywords(this.state.searchKeyString).join('|') })`, 'i');
    this.setState({
      [key]: reg
    });
  }
}

export default ListComponent;