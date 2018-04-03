# 华北技术支持项目开发规范2.0版
## 前端项目规范
- 使用React框架
- 使用ES6语法
- 使用flow插件语法规范
- 使用less作为样式语言

## 文档架构
- 文档架构地址
- 项目的代码架构说明

```
- .babelCache 缓存，不需要修改
- .dll 静态文件依赖，不需要修改
- config webpack配置，不需要修改
- server 编译本地服务器配置
    - dev 开发环境
    - pro 生产环境
- src 项目源代码
    - assembly 布局模板组件
        - Content 内容布局组件
        - ErrorBoundary 错误模板组件
        - Header 布局Header
        - Icon 图标字体
        - Layout 整体布局
        - Main 主内容布局
        - Sider 侧边栏组件
        - Title 标题组件
    - modules 业务模块
        - List List组件，以此为例
            - Index
                - index.js 业务模块下的组件，可以添加
            - store
                - reducer 此业务模块的reducer
            - Layout.js 此业务模块的布局
    - router 路由组件
        - asyncModule.js 异步注入模块函数
        - Bundle.js 异步模块组件
        - router.js 主路由配置
    - store 主store
        - reducers.js 创建store的reducer函数
        - store 主store的创建
    - store redux的Store
    - app.js 项目主入口，指明React组件插入哪个HTML的标签下
    - AppModule 项目顶级组件层级架构
    - common.sass 样式
    - favicon 标题图标
    - function 公用函数
    - index.pug HTML模板
- .eslintignore eslint代码规范忽略的部分
- .eslintrc.yml eslint代码规范文件
- .gitignore git忽略的文件
- LICENSE 证书说明
- package.json 项目依赖配置文件
```

## 编码流程
### 1.添加功能模块
以测试模块为例，要增加此模块
![Snip20180313_8](http://p1z5x0ead.bkt.clouddn.com/Snip20180313_8.png)
首先需要配置src/header/index文件，在`navOptions`添加一个对象
![Snip20180313_11](http://p1z5x0ead.bkt.clouddn.com/Snip20180313_11.png)

### 2. 路由配置
在`src/router/routers`里首先将编写好的模块导入，然后配置该模块的路由地址
![Snip20180313_15](http://p1z5x0ead.bkt.clouddn.com/Snip20180313_15.png)

### 3. 数据管理
- 以Test模块为例，在TestComponent文件夹内，如果要创建一个组件，就创建Index文件夹，在`TestComponent/Index/index.js` 为此组件的入口文件，其他组件在同级目录下创建。  
 ![Snip20180313_17](http://p1z5x0ead.bkt.clouddn.com/Snip20180313_17.png)

- 数据管理在`TestComponent/store/reducer.js`里创建reducer
 ![Snip20180313_18](http://p1z5x0ead.bkt.clouddn.com/Snip20180313_18.png)

## 代码风格规范
### 1.项目命名
- 项目名全部采用小写方式，以中划线分隔，禁止驼峰式命名。比如：my-project-name
- ...

### 2.项目结构规范
- 按照以业务为最小文件夹组织代码，结构参照《BOS组件开发手册》的代码结构
- 以提供的代码框架为准



### 3.文件命名
- 文件命名参照上一条规则，多个单词组成时，采用中划线连接方式，比如说: error-report.html
- 有复数结构时，要采用复数命名法，比如说： scripts, styles, images, data-models
- 文件名中只可由小写英文字母az、排序数字09或间隔符-组成，禁止包含特殊符号，比如空格、$等
- 为更好的表达语义，文件名使用英文名词命名，或英文简写
- ...

### 4.环境依赖
####若项目用到React，规范环境依赖版本
- antd:"^ 3.0.0"
- react:"^ 16.2.0"
- react-dom:"^ 16.2.0"
- react-router: "^ 4.2.0"
- react-router-dom: "^ 4.2.2",
- react-scripts: "1.0.17"
- redux: "^ 3.7.2",
- react-redux: "^ 5.0.6",
- redux-devtools-extension:"^ 2.13.2",
- redux-thunk: "^ 2.2.0"
- 有待添加...

#### webpack版本
- 4.4.1

### 5. 服务发布依赖
- Tomcat:
- IIS:

### 4.HTML 规范
#### 语法
- 使用四个空格的缩进，这是保证代码在各种环境下显示一致的唯一方式。
- 嵌套的节点应该缩进（四个空格）
- 在属性上，使用双引号，不要使用单引号。
- 不要在自动闭合标签结尾处使用斜线 - HTML5 规范 指出他们是可选的。
- 不要忽略可选的关闭标签（例如，</li> 和 </body>）。

#### HTML5 doctype
- 在每个 HTML 页面开头使用这个简单地 doctype 来启用标准模式，使其每个浏览器中尽可能一致的展现
- 虽然doctype不区分大小写，但是按照惯例，doctype大写

    ```
    <!DOCTYPE html>
    ```
    
#### 语言属性

    ```
    <html lang="en">
    
    </html>
    ```
#### 字符编码
- 通过明确声明字符编码，能够确保浏览器快速并容易的判断页面内容的渲染方式。这样做的好处是，可以避免在 HTML 中使用字符实体标记（character entity），从而全部与文档编码一致（一般采用 UTF-8 编码）。

    ```
    <meta charset="UTF-8">
    ```
    
#### 响应式
```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

#### 引入 CSS 和 JavaScript
- 根据 HTML5 规范, 通常在引入 CSS 和 JavaScript 时不需要指明 type，因为 text/css 和 text/javascript 分别是他们的默认值。

    ```
        <!-- External CSS -->
        <link rel="stylesheet" href="code-guide.css">
        
        <!-- In-document CSS -->
        <style>
            /* ... */
        </style>
        <!-- JavaScript -->
        <script src="code-guide.js"></script>
    ```
    
#### 实用高于完美
- 尽量遵循 HTML 标准和语义，但是不应该以浪费实用性作为代价。任何时候都要用尽量小的复杂度和尽量少的标签来解决问题

#### 属性顺序
- HTML 属性应该按照特定的顺序出现以保证易读性。

- class
- id
- name
- data-*
- src, for, type, href, value , max-length, max, min, pattern
- placeholder, title, alt
- aria-*, role
- required, readonly, disabled

### 5.CSS 规范
#### 语法
- 使用四个空格的缩进，这是保证代码在各种环境下显示一致的唯一方式
- ....

#### 声明顺序
1. Positioning
2. Box model 盒模型
3. Typographic 排版
4. Visual 外观

#### 代码注释
- 代码是由人来编写和维护的。保证你的代码是描述性的，包含好的注释，并且容易被他人理解。好的代码注释传达上下文和目标。不要简单地重申组件或者 class 名称。

#### class 命名
- 保持 class 命名为全小写，可以使用短划线（不要使用下划线和 camelCase 命名）。短划线应该作为相关类的自然间断。(例如，.btn 和 .btn-danger)。

#### 选择器
- 使用 class 而不是通用元素标签来优化渲染性能。
- ....

#### 代码组织
- 以组件为单位组织代码。
- 制定一个一致的注释层级结构。
- ...

### 6.JS规范
#### ES5规范
用ES5写代码的规范,后续补充
#### ES6规范
用ES6写代码的规范，后续补充
#### React规范
用React时候的规范，后续补充
### 

### 7.注释规范
#### 文件注释
说明此项目文件的编写人，编写时间，以及本文档的功能描述
- 示例

    ```
    /*
     *@author: who are you
     *@date: when you write it
     *@description: the function of this file.
     */
    ```
#### 通用注释
#### 注释的写法
-  HTML注释
-  CSS注释
-  JS注释

#### 单行注释规范
单行注释规范
#### 多行注释规范
多行注释规范
### javaScript注释
- 方法与函数的注释
- 属性注释

### 何时写注释
- 难于理解的代码段
- 业务逻辑强相关的代码
- 通用功能性函数

### 8.项目README规范
#### 标题
简要说明本项目文件的功能
#### 代码结构说明
描述本项目的代码结构，以及每一个结构的说明
#### 配置文件说明
描述重要的配置文件以及版本
#### 安装说明
说明安装项目的步骤，以及所依赖的环境，每个依赖的版本

#### 使用说明
描述本项目的功能使用说明

## 参考资料
- [代码规范最佳实践](https://www.jianshu.com/p/8cad7cb9d6ef)
- [编程注释规范](https://www.jianshu.com/p/822aa0077595)
- BOS组件开发手册
- [WEB前端规范](https://www.jianshu.com/p/66f066126f5f)
- [Web 前端代码规范](https://www.jianshu.com/p/4967aae8227e)


