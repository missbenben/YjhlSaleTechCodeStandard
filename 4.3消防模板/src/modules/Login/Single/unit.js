/* 注册接口 */
export function interface_users(value: Object): Object{
  return {
    bosclass: 'users',
    code: value.username,
    password: value.password,
    fullName: value.username,
    telephone: value.telephone,
    userType: '1'
  };
}

/* 将用户添加到用户组 */
export function interface_roles2Users(code: string): Object{
  return {
    users: [code]
  };
}

/**
 * usersInfor
 * @param { Object } value  : 表单值
 * @param { string } roles  : 用户权限
 * @param { boolean } active: 用户激活状态
 */
export function interface_usersInfor(value: Object, roles: string, active: boolean): Object{
  // 剔除表单中的对应字段，并将剩下的属性写入到infor
  const keys: string[] = ['username', 'password', 'password2', 'telephone'];
  const infor: Object = {};
  for(const key: string in value){
    if(!keys.includes(key)){
      infor[key] = value[key];
    }
  }
  return {
    bosclass: 'usersInfor',
    code: value.username,
    roles,
    active: `${ active }`,
    infor
  };
}

/**
 * 添加权限的接口
 * @param { string } code    : code
 * @return { Array<Object> }
 */
export function interface_gacl(code: string): Array<{
  bosclass: string,
  key: string,
  flags: string,
  principal: string,
  permissions: string
}>{
  return [
    {
      bosclass: 'usersInfor',
      key: code,
      flags: 'g',
      principal: 'roles/_ALL',
      permissions: 'rwdc'
    }
  ];
}