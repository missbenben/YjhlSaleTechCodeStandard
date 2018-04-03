/**
 * 百度echarts图表
 * 按需加载
 */
import React, { Component } from 'react';
import eCharts from 'echarts/lib/echarts';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'zrender/lib/svg/svg';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import { randomStr } from '../../function';

/*
     模块传入props参数（对象、属性、功能）
     ------------------------------------
       option | Object  | 图表配置
     ------------------------------------
       svg    | boolean | 是否使用svg渲染
     ------------------------------------
 */
class EChartsModule extends Component{
  id: string;
  element: ?Element;
  echarts: ?eCharts;
  onWindowResize: Function;

  constructor(): void{
    super(...arguments);

    this.id = randomStr(5);  // id
    this.element = null;     // 节点
    this.echarts = null;     // echarts对象
    this.onWindowResize = this._onWindowResize.bind(this);
  }
  componentDidMount(): void{
    // 初始化图表
    this.element = document.getElementById(this.id);
    // 计算宽度和高度
    const w: number = this.element.clientWidth;
    const h: number = w * 2 / 3;
    this.echarts = eCharts.init(this.element, null, {
      renderer: this.props.svg ? 'svg' : 'canvas',
      width: w,
      height: h
    });
    this.echarts.setOption(this.props.option);
    window.addEventListener('resize', this.onWindowResize, false);
  }
  componentWillUnmount(): void{
    // 销毁实例
    this.echarts.dispose(this.element);
    this.element = null;
    window.removeEventListener('resize', this.onWindowResize);
  }
  // 窗口变化
  _onWindowResize(event: Event): void{
    const r: Function = (): void=>{
      const w: number = this.element.clientWidth;
      const h: number = w * 2 / 3;
      this.echarts.resize({
        width: w,
        height: h
      });
    };
    requestAnimationFrame(r);
  }
  render(): Object{
    return (
      <div id={ this.id } />
    );
  }
}

export default EChartsModule;