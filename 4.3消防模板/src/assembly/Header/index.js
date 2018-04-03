/**
 * layout - header
 * 顶部header布局
 * 显示logo、导航、登录人信息等
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import style from './style.sass';
import icon from '../Icon/style.sass';
import ErrorBoundary from '../ErrorBoundary/index';
import HumanInformation from './HumanInformation';
import '../Fonts/style.sass';

type options = {
  id: string,
  name: string,
  href: string,
  icon: string
};

export const navOptions: options[] = [
  {
    id: 'index',
    name: '主页',
    href: '/Index',
    icon: icon['icon-home']
  },
  {
    id: 'standard',
    name: '标准规范管理',
    href: '/Standard',
    icon: icon['icon-clipboard-list']
  },
  {
    id: 'componentParts',
    name: '部品部件管理',
    href: '/ComponentParts',
    icon: icon['icon-cogs']
  },
  {
    id: 'componentPartsReview',
    name: '部品部件审核',
    href: '/ComponentPartsReview',
    icon: icon['icon-ruler']
  },
  {
    id: 'factoryReview',
    name: '厂家审核',
    href: '/FactoryReview',
    icon: icon['icon-award-fill']
  },
  {
    id: 'onlineCommunication',
    name: '在线沟通',
    href: '/OnlineCommunication',
    icon: icon['icon-earth']
  },
  {
    id: 'system',
    name: '系统管理',
    href: '/System',
    icon: icon['icon-terminal']
  }
];
const len: boolean = navOptions.length > 0;

class Header extends Component{
  // 判断首页home
  oddEvent(item: options, match: Object, location: Object): boolean{
    const { pathname }: { pathname: string } = location;
    const { href }: { pathname: string } = item;
    const reg: RegExp = new RegExp(`^${ href }.*$`, 'ig');
    if(len && pathname === '/' && href === navOptions[0].href){
      return true;
    }
    return match && reg.test(pathname);
  }
  navList(options: options[]): Array{
    // const role: string[] = JSON.parse(sessionStorage.getItem('role')) || [];  // 判断权限
    return options.map((item: options, index: number): Object | boolean=>{
      // return role.includes(item.id) ? () : false;
      return (
        <li key={ item.id }>
          <NavLink to={ item.href } activeClassName={ style.navActive } isActive={ this.oddEvent.bind(this, item) }>
            <i className={ item.icon } />
            <span>{ item.name }</span>
          </NavLink>
        </li>
      );
    });
  }
  render(): Object{
    return (
      <ErrorBoundary>
        <h1 className={ `${ style.logo }` }>
          消防产品库
          <br />
          管理平台
        </h1>
        <nav className={ style.nav }>
          <ul className="clearfix">
            { this.navList(navOptions) }
          </ul>
        </nav>
        <HumanInformation />
      </ErrorBoundary>
    );
  }
}

export default Header;