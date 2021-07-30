# Typescript+React+webpack5 项目环境

1.从零开始搭建至完整的项目开发环境流程！ 2.欢迎提出问题和指导！

- 项目中常用配置文件的作用及配置方式
- eslint、stylelint 及 prettier 的配置
- 代码提交规范的第三方工具强制约束方式实现
- webpack 配置 react + typescript 开发与生产环境及优化

## 项目初始化及配置

项目 [react-ts-template](https://github.com/kris-liu-happy/react-ts-template.git) ,欢迎大家 pr 以及 star

### 1. package.json

每一个项目都需要一个 `package.json` 文件，它的作用是记录项目的配置信息，比如我们的项目名称、包的入口文件、项目版本等，也会记录所需的各种依赖，还有很重要的 `script` 字段，它指定了运行脚本命令的 `npm` 命令行缩写

```js
npm init -y


{
  "name": "react-ts-template",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {},
  "repository": {
    "type": "git",
    "url": ""
  },
  "keywords": ["react-project", "typescript-project", "react-typescript"],
  "author": {
    "name": "kris",
    "url": "",
    "email": ""
  },
  "license": "MIT",
  "bugs": {
    "url": ""
  },
  "homepage": ""
}

description ：增加了对该项目的描述，github 进行 repo 搜索时，关键字匹配会使你的项目更容易被搜索到。
scripts ：把默认生成的删了，没啥用。
keywords ：增加了项目关键字，其他开发者在 npm 上搜索的时候，适合的关键字能你的包更容易被搜索到。
author ：添加了更具体的作者信息。
license ：修改为MIT协议。
```

### 2. .gitignore

该文件决定了项目进行 git 提交时所需要忽略掉的文件或文件夹，编辑器如 vscode 也会监听 `.gitignore` 之外的所有文件，如果没有进行忽略的文件有所变动时，在进行 git 提交时就会被识别为需要提交的文件

那么这些系统或编辑器自动生成的文件，但是又不被我们很容易查知的该怎么办呢？使用 vscode 的 [gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore) 插件，下载安装该插件之后， `ctrl+shift+p` 召唤命令面板，输入 `Add gitignore` 命令，即可在输入框输入系统或编辑器名字，来自动添加需要忽略的文件或文件夹至 `.gitignore` 中。

### 3. .npmrc

大家一开始使用 npm 安装依赖包时，肯定感受过那挤牙膏般的下载速度，上网一查只需要将 npm 源设置为淘宝镜像源就行，在控制台执行一下以下命令：

```
npm config set registry https://registry.npm.taobao.org
```

某个同学想克隆了你的项目之后，准备在他本地开发的时候，并没有设置淘宝镜像源，又要人家去手动设置一遍，我们作为项目的发起者，就先给别人省下这份时间吧，只需要在根目录添加一个 `.npmrc` 并做简单的配置即可：

```
# 创建 .npmrc 文件
touch .npmrc
# 在该文件内输入配置
registry=https://registry.npm.taobao.org/
```

## 规范代码与提交

### 1. EditorConfig

`.editorconfig` 是跨编辑器维护一致编码风格的配置文件，有的编辑器会默认集成读取该配置文件的功能，但是 vscode 需要安装相应的扩展 [EditorConfig For vs Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) 。

安装完此扩展后，在 vscode 中使用快捷键 `ctrl+shift+p` 打开命令台，输入 `Generate .editorcofig` 即可快速生成 `.editorconfig` 文件，当然，有时候 vscode 抽风找不到命令也是可能的，比如我就经常遇到输入该命令没用，需要重启才会重新出现，那么就手动创建该文件也是没问题的。

```
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf

[*.md]
trim_trailing_whitespace = false



indent_style ：缩进风格，可选配置有 tab 和 space 。
indent_size ：缩进大小，可设定为 1-8 的数字，比如设定为 2 ，那就是缩进 2 个空格。
charset ：编码格式，通常都是选 utf-8 。
trim_trailing_whitespace ：去除多余的空格，比如你不小心在尾巴多打了个空格，它会给你自动去掉。
insert_final_newline ：在尾部插入一行，个人很喜欢这个风格，当最后一行代码很长的时候，你又想对该行代码比较靠后的位置编辑时，不要太好用哦，建议大家也开上。
end_of_line ：换行符，可选配置有 lf ，cr ，crlf ，会有三种的原因是因为各个操作系统之间的换行符不一致，这里有历史原因，有兴趣的同学自行了解吧，许多有名的开源库都是使用 lf ，我们姑且也跟跟风吧。
因为 markdown 语法中，我想要换行需要在上一行多打 2 个以上的空格，为了不影响该语法，故 .md 文件中把去除多余空格关掉了
```

### 2. Prettier

如果说 `EditorConfig` 帮你统一编辑器风格，那 `Prettier` 就是帮你统一项目风格的。 `Prettier` 拥有更多配置项（实际上也不多，数了下二十个），且能在发布流程中执行命令自动格式化，能够有效的使项目代码风格趋于统一。

在我们的项目中执行以下命令安装我们的第一个依赖包：

```
npm install prettier -D
```

安装成功之后在根目录新建文件 `.prettierrc` ，输入以下配置：

```
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "endOfLine": "lf",
  "printWidth": 120,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

其实 `Prettier` 的配置项很少，大家可以去 [Prettier Playground](https://prettier.io/playground/) 大概把玩一会儿，下面我简单介绍下上述的配置：

- `trailingComma` ：对象的最后一个属性末尾也会添加 `,` ，比如 `{ a: 1, b: 2 }` 会格式为 `{ a: 1, b: 2, }` 。
- `tabWidth` ：缩进大小。
- `semi` ：分号是否添加，我以前从 C++转前端的，有一段时间非常不能忍受不加分号的行为，现在香的一匹。
- `singleQuote` ：是否单引号，绝壁选择单引号啊，不会真有人还用双引号吧？不会吧！😏
- `jsxSingleQuote` ：jsx 语法下是否单引号，同上。
- `endOfLine` ：与 `.editorconfig` 保持一致设置。
- `printWidth` ：单行代码最长字符长度，超过之后会自动格式化换行。
- `bracketSpacing` ：在对象中的括号之间打印空格， `{a: 5}` 格式化为 `{ a: 5 }` 。
- `arrowParens` ：箭头函数的参数无论有几个，都要括号包裹。比如 `(a) => {}` ，如果设为 `avoid` ，会自动格式化为 `a => {}` 。

那我们现在也配置好了，但是咋用的呢？

- 一个是我们可以通过命令的形式去格式化某个文件下的代码，但是我们基本不会去使用，最终都是通过 `ESlint` 去检测代码是否符合规范。
- 二是当我们编辑完代码之后，按下 `ctrl+s` 保存就给我们自动把当前文件代码格式化了，既能实时查看格式化后的代码风格，又省去了命令执行代码格式化的多余工作

你所需要做的是先安装扩展 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) ：

当安装结束后， 在项目根目录新建一个文件夹 `.vscode` ，在此文件下再建一个 `settings.json` 文件：

该文件的配置优先于 vscode 全局的 `settings.json` ，这样别人下载了你的项目进行开发，也不会因为全局 `setting.json` 的配置不同而导致 `Prettier` 或之后会说到的 `ESLint` 、 `StyleLint` 失效，接下来在该文件内输入以下代码：

```
{
  // 指定哪些文件不参与搜索
  "search.exclude": {
    "**/node_modules": true,
    "dist": true,
    "yarn.lock": true
  },
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

`"editor.formatOnSave"` 的作用是在我们保存时，会自动执行一次代码格式化，而我们该使用什么格式化器？接下来的代码便是设置默认的格式化器，看名字大家也能看得出来了吧！

在遇到 `.js` 、 `.jsx` 、`.ts` 、`.tsx` 、`.json` 、`.html` 、`.md` 、 `.css` 、 `.less` 、 `.scss` 为后缀的文件时，都会去使用 `Prettier` 去格式化代码，而格式化的规则就是我们配置的 `.prettierrc` 决定的！

`.editorconfig` 配置文件中某些配置项是会和 `Prettier` 重合的，例如 指定缩进大小 两者都可以配置。

那么两者有什么区别呢？

我们可以看到 `EditorConfig` 的配置项都是一些不涉及具体语法的，比如 缩进大小、文移除多余空格等。

而 `Prettier` 是一个格式化工具，要根据具体语法格式化，对于不同的语法用单引号还是双引号，加不加分号，哪里换行等，当然，肯定也有缩进大小。

EditorConfig： 输入

Prettier： 保存

即使缩进大小这些共同都有的设置，两者也是不冲突的，设置 `EditorConfig` 的 `indent_size` 为 `4` ， `Prettier` 的 `tabWidth` 为 `2`

### 3. ESLint

在上面我们配置了 `EditorConfig` 和 `Prettier` 都是为了解决**代码风格问题**，而 `ESLint` 是主要为了解决**代码质量问题**，它能在我们编写代码时就检测出程序可能出现的隐性 BUG，通过 `eslint --fix` 还能自动修复一些代码写法问题，比如你定义了 `var a = 3` ，自动修复后为 `const a = 3` 。还有许多类似的强制扭转代码最佳写法的规则，在无法自动修复时，会给出红线提示，强迫开发人员为其寻求更好的解决方案。

> prettier 代码风格统一支持的语言更多，而且差异化小，eslint 一大堆的配置能弄出一堆风格，prettier 能对 ts js html css json md 做风格统一，这方面 eslint 比不过。 --来自“三元小迷妹”

我们先把它用起来，直观感受一下其带来的好处！

首先在项目中安装 `eslint` ：

```
 npm install eslint -D
```

安装成功后，执行以下命令：

```
npx eslint --init
```

不建议全局安装 eslint

全局进行 `eslint` 的安装，这会占据我们电脑的硬盘空间，且会将安装文件放到挺隐蔽的地方，个人有心里洁癖，非常接受不了这种全局安装的方式，特别是越来越多全局包的时候。再有一个比较大的问题是，因为我们执行 `eslint --init` 是使用全局安装的版本去初始化的，这有可能会和你现在项目中的 `eslint` 版本不一致。这个问题我就出现了

已经执行 `npx eslint --init` 的小伙伴现在会依次遇到下面问题，请跟我慢慢看来：

- How would you like to use ESLint?

  果断选择第三条 `To check syntax, find problems, and enforce code style` ，检查语法、检测问题并强制代码风格。

- What type of modules does your project use?

  项目非配置代码都是采用的 ES6 模块系统导入导出，选择 `JavaScript modules (import/export)` 。

- Which framework does your project use?

  显而易见，选择 `React` 。

- Does your project use TypeScript?

  果断用上 `Typescript` 啊，还记得我们文章的标题吗？选择 `Yes` 后生成的 `eslint` 配置文件会给我们默认配上支持 `Typescript` 的 `parse` 以及插件 `plugins` 等。

- Where does your code run?

`Browser` 和 `Node` 环境都选上，之后可能会编写一些 `node` 代码。

- How would you like to define a style for your project?

  选择 `Use a popular style guide` ，即使用社区已经制定好的代码风格，我们去遵守就行。

- Which style guide do you want to follow?

  选择 `Airbnb` 风格，都是社区总结出来的最佳实践。

- What format do you want your config file to be in?

  选择 `JavaScript` ，即生成的配置文件是 js 文件，配置更加灵活。

- Would you like to install them now with npm?

  当然 `Yes` 了～

在漫长的安装结束后，项目根目录下多出了新的文件 `.eslintrc.js` ，这便是我们的 `eslint` 配置文件了。其默认内容如下：

```
module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {},
}
```

各个属性字段的作用可在 [Configuring ESLint](https://eslint.bootcss.com/docs/user-guide/configuring) 仔细了解，可能会比较迷惑的地方是 `extends` 和 `plugins` 的关系，其实 `plugins` 就是**插件**的意思，都是需要 npm 包的安装才可以使用，只不过默认支持简写，官网都有说；至于 `extneds` 其实就是使用我们已经下载的插件的某些预设规则。

其它的 eslint 配置，请参考 github

### 4. StyleLint

样式代码的风格也需要统一

根据 [stylelint 官网介绍](https://stylelint.io/user-guide/get-started)，我们先安装两个基本的包：

```
npm install stylelint stylelint-config-standard -D
```

然后在项目根目录新建 `.stylelintrc.js` 文件，输入以下内容：

```
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': 'always',
  },
  ignoreFiles: ['node_modules/**/*', 'build/**/*'],
}
```

同样，简单介绍下配置上的三个属性：

- `extends` ：其实和 `eslint` 的类似，都是扩展，使用 `stylelint` 已经预设好的一些规则。
- `rules` ：就是具体的规则，如果默认的你不满意，可以自己决定某个规则的具体形式。
- `ignoreFiles` ：不像 `eslint` 需要新建 ignore 文件， `stylelint` 配置就支持忽略配置字段，我们先添加 `node_modules` 和 `build` ，之后有需要大家可自行添加。

> 其中关于 `xxx/**/*` 这种写法的意思有不理解的，大家可在 `google` （或百度）**glob 模式**。

与 `eslint` 一样，想要在编辑代码时有错误提示以及自动修复功能，我们需要 vscode 安装一个扩展

:StyleLint

并且在 `.vscode/settings.json` 中增加以下代码：

```json
{
  // 使用 stylelint 自身的校验即可
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,

  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  }
}
```

安装插件 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) ，这个插件会禁用所有和 prettier 起冲突的规则：

```
npm install eslint-config-prettier -D
```

添加以下配置到 `.eslintrc.js` 的 `extends` 中：

```
{
  extends: [
    // other configs ...
   	'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/unicorn',
  ]
}
```

这里需要注意， `'prettier'` 及之后的配置要放到原来添加的配置的后面，这样才能让 `prettier` 禁用之后与其冲突的规则。

`stylelint` 的冲突解决也是一样的，先安装插件 [stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier) ：

```
npm install stylelint-config-prettier -D
```

添加以下配置到 `.stylelintrc.js` 的 `extends` 中：

```
{
	extends: [
  	// other configs ...
    'stylelint-config-prettier'
  ]
}
```

## Webpack 基本配置

我这个 webpack4 升级 webpack 5

### Webpack4 的记录

我们最终的配置要支持 `React` 和 `Typescript` 的开发与生产，现在的我们的思路是将对这两个部分的支持放到最后去配置，一开始先把必要的都配好，这样大家能有一个很直观的印象，什么时候该做什么？怎么做？

对于 `Webpack` 的配置，我会尽量地去解释清楚每一个新增的配置都有什么用，希望大家耐心阅读～

> ⚠️ 目前讲解的 webpack 版本为 4+

###

#### 1. 开始

想要使用 webpack，这两个包你不得不装：

```
npm install webpack webpack-cli -D
```

- `webpack` ：这不必多说，其用于编译 JavaScript 模块。
- `webpack-cli` ：此工具用于在命令行中运行 webpack。

紧接着我们在根目录下新建文件夹 `scripts` ，在之下再建一个文件夹 `config` ，在 `config` 中再建一个 `.js` 文件 `webpack.common.js` ，此结构如下：

```
scripts/
    config/
    webpack.common.js
```

为什么会是这样的目录结构，主要考虑到之后讲了 `webpack-merge` 之后，会把 webpack 的核心配置文件放到 `config` 下，其余的例如导出文件路径的文件模块放到 `config` 同级。总之大家先这样搞着，之后咱慢慢解释。

#### 2. input、output

**入口(input)**和**出口(output)**是 webpack 的核心概念之二，从名字就能大概感知他们是干什么的：**指定一个（或多个）入口文件，经过一系列的操作之后转换成另一个（或多个）文件**。

接下来在 `webpack.common.js` 中输入以下代码：

```
const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../../src/app.js'),
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../../dist'),
  },
}
```

> webpack 配置是标准的 Node.js 的 CommonJS 模块，它通过 `require` 来引入其他模块，通过 `module.exports` 导出模块，由 webpack 根据对象定义的属性进行解析。

- `entry` ：定义了入口文件路径，其属性名 `app` 表示引入文件的名字。
- `output` ：定义了编译打包之后的文件名以及所在路径。

这段代码的意思就是告诉 webpack，入口文件是根目录下的 `src` 下的 `app.js` 文件，打包输出的文件位置为根目录下的 `dist` 中，注意到 `filename` 为 `js/[name].[hash:8].js` ，那么就会在 `dist` 目录下再建一个 `js` 文件夹，其中放了命名与入口文件命名一致，并带有 hash 值的打包之后的 js 文件。

接下来在根目录创建 `src` 文件夹，新建 `app.js` 文件，输入以下代码：

```
const root = document.querySelector('#root')
root.innerHTML = 'hello, webpack!'
```

现在我们尝试使用刚才的 webpack 配置对其进行打包，那如何操作呢？打开 `package.json` ，为其添加一条 npm 命令：

```
{
  "scripts": {
+   "build": "webpack --config ./scripts/config/webpack.common.js",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "lint": "npm run lint-eslint && npm run lint-stylelint",
    "lint-eslint": "eslint -c .eslintrc.js --ext .ts,.tsx,.js src",
    "lint-stylelint": "stylelint --config .stylelintrc.js src/**/*.{less,css,scss}"
  },
}
```

> `--config` 选项来指定配置文件

然后在控制台输入：

```
npm run build
```

等待一两秒后，你会发现根目录下真的多出了一个 `dist` 文件夹，里面的内容和我们 webpack 配置所想要达到的效果是一样的：一个 js 文件夹以及下面的（比如） `app.e406fb9b.js` 的文件。

至此，我们已经初步使用 webpack 打了一个包，接下来我们逐步开始扩展其他的配置以及相应优化吧！～

#### 3. 公用变量文件

在上面简单的 webpack 配置中，我们发现有两个表示路径的语句：

```
path.resolve(__dirname, '../../src/app.js')
path.resolve(__dirname, '../../dist')
```

- `path.resolve` ：node 的官方 api，可以将路径或者路径片段解析成绝对路径。
- `__dirname` ：其总是指向被执行 js 文件的绝对路径，比如在我们 webpack 文件中访问了 `__dirname` ，那么它的值就是在电脑系统上的绝对路径，比如在我电脑上就是：

```
/Users/RMBP/Desktop/react-ts-quick-starter/scripts/config
```

所以我们上面的写法，大家可以简单理解为， `path.resolve` 把**根据当前文件的执行路径下**而找到的想要访问到的**文件相对路径**转换成了：**该文件在系统中的绝对路径！**

比如我的就是：

```
/Users/RMBP/Desktop/react-ts-quick-starter/src/app.js
```

但是大家也看出来了，这种写法需要不断的 `../../` ，这个在文件层级较深时，很容易出错且很不优雅。那我们就换个思路，都从根目录开始找所需的文件路径不久很简单了吗，相当于省略了 `../../` 这一步。

在 `scripts` 下新建一个 `constant.js` 文件，专门用于存放我们的公用变量（之后还会有其他的）：

```
scripts/
	config/
  	webpack.common.js
+ constant.js
```

在里面定义我们的变量：

```
const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '../')
const PROJECT_NAME = path.parse(PROJECT_PATH).name

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME
}
```

- `PROJECT_PATH` ：表示项目的根目录。
- `PROJECT_NAME` ：表示项目名，目前不用，但之后的配置会用到，我们就先定义好吧～

> 上面两个简单的 node api 大家可以自己简单了解一下，不想了解也可以，只要明白其有啥作用就行。

然后在 `webpack.common.js` 中引入，修改代码：

```
const { resolve } = require('path')
const { PROJECT_PATH } = require('../constants')

module.exports = {
  entry: {
    app: resolve(PROJECT_PATH, './src/app.js'),
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: resolve(PROJECT_PATH, './dist'),
  },
}
```

好了，现在是不是看起来清爽多了，大家可以 `npm run build` 验证下自己代码是不是有写错或遗漏啥的～ 🐶

#### 4. 区分开发/生产环境

在 webpack 中针对开发环境与生产环境我们要分别配置，以适应不同的环境需求，比如在开发环境中，报错要能定位到源代码的具体位置，而这又需要打出额外的 `.map` 文件，所以在生产环境中为了不牺牲页面性能，不需要添加此功能，毕竟，没人会在生产上调试代码吧？

虽然都要分别配置，但是又有挺多基础配置是开发和生产都需要且相同的，那我们不可能写两份文件，写两次基础配置吧？这也太冗余了，不过不用担心，[webpack-merge](https://github.com/survivejs/webpack-merge) 为我们都想好了。

安装它：

```
npm install webpack-merge -D
```

在 `scripts/config` 下新建文件 `webpack.dev.js` 作为开发环境配置，并输入以下代码：

```
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
})
```

同样地，在 `scripts/config` 下新建文件 `webpack.prod.js` 作为生产环境配置，并输入以下代码：

```
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
})
```

> 在我使用 `require('webpack-merge')` 时，给我报了以下 eslint 的报错： 'webpack-merge' should be listed in the project's dependencies, not devDependencies. 只需要在 `.eslintrc.js` 中添加以下规则即可解决： `'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }]`

虽然都分开了配置，但是在公共配置中，还是可能会出现某个配置的某个选项在开发环境和生产环境中采用不同的配置，这个时候我们有两种选择：

- 一是分别在 dev 和 prod 配置文件中写一遍，common 中就不写了。
- 二是设置某个环境变量，根据这个环境变量来判别不同环境。

显而易见，为了使代码最大的优雅，采用第二种。

[cross-env](https://www.npmjs.com/package/cross-env) 可跨平台设置和使用环境变量，不同操作系统设置环境变量的方式不一定相同，比如 Mac 电脑上使用 `export NODE_ENV=development` ，而 Windows 电脑上使用的是 `set NODE_ENV=development` ，有了这个利器，我们无需在考虑操作系统带来的差异性。

安装它：

```
npm install cross-env -D
```

然后在 `package.json` 中添加修改以下代码：

```
{
  "scripts": {
+   "start": "cross-env NODE_ENV=development webpack --config ./scripts/config/webpack.dev.js",
+   "build": "cross-env NODE_ENV=production webpack --config ./scripts/config/webpack.prod.js",
-   "build": "webpack --config ./scripts/config/webpack.common.js",
  },
}
```

修改 `srcipt/constants.js` 文件，增加一个公用布尔变量 `isDev` ：

```
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  isDev,
	// other
}
```

我们现在就使用这个环境变量做点事吧！记得之前配的公共配置中，我们给出口文件的名字配了 `hash:8` ，原因是在生产环境中，即用户已经在访问我们的页面了，他第一次访问时，请求了比如 `app.js` 文件，根据浏览器的缓存策略会将这个文件缓存起来。然后我们开发代码完成了一版功能迭代，涉及到打包后的 `app.js` 发生了大变化，但是该用户继续访问我们的页面时，如果缓存时间没有超出或者没有人为清除缓存，那么他将继续得到的是已缓存的 `app.js` ，这就糟糕了。

于是，当我们文件加了 hash 后，根据入口文件内容的不同，这个 hash 值就会发生非常夸张的变化，当更新到线上，用户再次请求，因为缓存文件中找不到同名文件，就会向服务器拿最新的文件数据，这下就能保证用户使用到最新的功能。

不过，这个 hash 值在开发环境中并不需要，于是我们修改 `webpack.common.js` 文件：

```
- const { PROJECT_PATH } = require('../constants')
+ const { isDev, PROJECT_PATH } = require('../constants')

module.exports = {
	// other...
  output: {
-   filename: 'js/[name].[hash:8].js',
+   filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: resolve(PROJECT_PATH, './dist'),
  },
}
```

#### 5. mode

在我们没有设置 `mode` 时，webpack 默认为我们设为了 `mode: 'prodution'` ，所以之前打包后的 js 文件代码都没法看，因为在 `production` 模式下，webpack 默认会丑化、压缩代码，还有其他一些默认开启的配置。

我们只要知道，不同模式下 webpack 为为其默认开启不同的配置，有不同的优化，详细可见 [webpack.mode](https://webpack.js.org/configuration/mode/#root)。

然后接下来大家可以分别执行以下命令，看看分别打的包有啥区别，主要感知下我们上面所说的：

```
# 开发环境打包
npm run start

# 生产环境打包
npm run build
```

#### 6. 本地服务实时查看页面

说了这么多，我们到现在甚至连个页面都看不到，使用过各种脚手架的朋友一定很熟悉 `npm run start` ，它直接起一个本地服务，然后页面就出来了。而我们现在执行这个命令却只能简单的打个包，别急，我们借助 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 和 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 就能实现，现在先把它们安装下来：

```
npm install webpack-dev-server html-webpack-plugin -D
```

简单介绍一下两个工具的作用：

- `html-webpack-plugin` ：每一个页面是一定要有 `html` 文件的，而这个插件能帮助我们将打包后的 js 文件自动引进 `html` 文件中，毕竟你不可能每次更改代码后都手动去引入 js 文件。
- `webpack-dev-server` ：可以在本地起一个 http 服务，通过简单的配置还可指定其端口、热更新的开启等。

现在，我们先在项目根目录下新建一个 `public` 文件夹，里面存放一些公用的静态资源，现在我们先在其中新建一个 `index.html` ，写入以下内容：

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React+Typescript 快速开发脚手架</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

> 注意 ⚠️：里面有一个 div 标签，id 值为 root

因为 `html-webpack-plugin` 在开发和生产环境我们都需要配置，于是我们打开 `webpck.common.js` 增加以下内容：

```
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {...},
  output: {...},
  plugins: [
  	new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: fale, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev ? false : {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        useShortDoctype: true,
      },
    }),
  ]
}
```

可以看到，我们以 `public/index.html` 文件为模板，并且在生产环境中对生成的 `html` 文件进行了代码压缩，比如去除注释、去除空格等。

> plugin 是 webpack 的核心功能，它丰富了 webpack 本身，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务。

随后在 `webpack.dev.js` 下增加本地服务的配置：

```
const { SERVER_HOST, SERVER_PORT } = require('../constants')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    stats: 'errors-only', // 终端仅打印 error
    clientLogLevel: 'silent', // 日志等级
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
  },
})
```

我们定义了两个新的变量 `SERVER_HOST` 和 `SERVER_PORT` ，在 `constants.js` 中定义它们：

```
const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = 9000

module.exports = {
  SERVER_HOST,
  SERVER_PORT,
	// ...
}
```

#### 7. devtool

`devtool` 中的一些设置，可以帮助我们将编译后的代码映射回原始源代码，即大家经常听到的 `source-map` ，这对于调试代码错误的时候特别重要，而不同的设置会明显影响到构建和重新构建的速度。所以选择一个适合自己的很重要。

它都有哪些值可以设置，[官方 devtool 说明](https://webpack.js.org/configuration/devtool/)中说的很详细，我就不具体展开了，**在这里我非常非常无敌强烈建议大家故意写一些有错误的代码，然后使用每个设置都试试看！**在开发环境中，我个人比较能接受的是 `eval-source-map` ，所以我会在 `webpack.dev.js` 中添加以下代码：

```
module.exports = merge(common, {
  mode: 'development',
+ devtool: 'eval-source-map',
})
```

在生产环境中我直接设为 `none` ，不需要 `source-map` 功能，在 `webpack.prod.js` 中添加以下代码：

```
module.exports = merge(common, {
  mode: 'production',
+ devtool: 'none',
})
```

### 8. 打包编译前清理 dist 目录

我们发现每次打出来的文件都会继续残留在 dist 目录中，当然如果你足够勤快，可以每次打包前手动清理一下，但是这种勤劳是毫无意义的。

借助 [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) 可以实现每次打包前先处理掉之前的 dist 目录，以保证每次打出的都是当前最新的，我们先安装它：

```
npm install clean-webpack-plugin -D
```

打开 `webpack.prod.js` 文件，增加以下代码：

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	// other...
  plugins: [
    new CleanWebpackPlugin(),
  ],
}
```

它不需要你去指定要删除的目录的位置，会自动找到 `output` 中的 `path` 然后进行清除。现在再执行一下 `npm run build` ，看看打出来的 dist 目录是不是干净清爽了许多？

#### 9. 样式文件处理

如果你现在在 `src/` 目录下新建一个 `app.css` 文件，给 `#root` 随便添加一个样式， `app.js` 中通过 `import './app.css'` ，再进行打包或本地服务启动，webpack 直接就会报错，因为 webpack 只会编译 `.js` 文件，它是不支持直接处理 `.css` 、 `.less` 或 `.scss` 文件的，我们需要借助 webpack 中另一个很核心的东西：**loader **。

> loader 用于对模块的源代码进行转换。loader 可以使你在 `import` 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 `import` CSS 文件！

##### CSS 样式文件处理

处理 `.css` 文件我们需要安装 [style-loader](https://github.com/webpack-contrib/style-loader) 和 [css-loader](https://github.com/webpack-contrib/css-loader) ：

```
npm install style-loader css-loader -D
```

- 遇到后缀为 `.css` 的文件，webpack 先用 `css-loader` 加载器去解析这个文件，遇到 `@import` 等语句就将相应样式文件引入（所以如果没有 `css-loader` ，就没法解析这类语句），计算后生成**css 字符串**，接下来 `style-loader` 处理此字符串生成一个内容为最终解析完的 css 代码的 style 标签，放到 head 标签里。
- `loader` 是有顺序的，webpack 肯定是先将所有 css 模块依赖解析完得到计算结果再创建 style 标签。因此应该把 `style-loader` 放在 `css-loader` 的前面（**webpack loader 的执行顺序是从右到左，即从后往前**）。

于是，打开我们的 `webpack.common.js` ，写入以下代码：

```
module.exports = {
	// other...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false, // 默认就是 false, 若要开启，可在官网具体查看可配置项
              sourceMap: isDev, // 开启后与 devtool 设置一致, 开发环境开启，生产环境关闭
              importLoaders: 0, // 指定在 CSS loader 处理前使用的 laoder 数量
            },
          },
        ],
      },
    ]
  },
}
```

`test` 字段是匹配规则，针对符合规则的文件进行处理。

`use` 字段有几种写法：

- 可以是一个字符串，假如我们只使用 `style-loader` ，只需要 `use: 'style-loader'` 。
- 可以是一个数组，假如我们不对 `css-loader` 做额外配置，只需要 `use: ['style-loader', 'css-loader']` 。
- 数组的每一项既可以是字符串也可以是一个对象，当我们需要在`webpack` 的配置文件中对 `loader` 进行配置，就需要将其编写为一个对象，并且在此对象的 `options` 字段中进行配置。比如我们上面要对 `css-loader` 做配置的写法。

##### LESS 样式文件处理

处理 `.less` 文件我们需要安装 [less](https://github.com/less/less.js) 和 [less-loader](https://github.com/webpack-contrib/less-loader) ：

```
npm install less less-loader -D
```

- 遇到后缀为 `.less` 文件， `less-loader` 会将你写的 less 语法转换为 css 语法，并转为 `.css` 文件。
- `less-loader` 依赖于 `less` ，所以必须都安装。

继续在 `webpack.common.js` 中写入代码：

```
module.exports = {
	// other...
  module: {
    rules: [
      { /* ... */ },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDev,
              importLoaders: 1, // 需要先被 less-loader 处理，所以这里设置为 1
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ]
  },
}
```

##### SASS 样式文件处理

处理 `.scss` 文件我们需要安装 [node-sass](https://github.com/sass/node-sass) 和 [sass-loader](https://github.com/webpack-contrib/sass-loader) ：

```
npm install node-sass sass-loader -D
```

- 遇到 `.scss` 后缀的文件， `sass-loader` 会将你写的 sass 语法转为 css 语法，并转为 `.css` 文件。
- 同样地， `sass-loader` 依赖于 `node-sass` ，所以两个都需要安装。（ `node-sass` 我不用代理就没有正常安装上过，还好我们一开始就在配置文件里设了淘宝镜像源）

继续在 `webpack.common.js` 中写入代码：

```
module.exports = {
	// other...
  module: {
    rules: [
      { /* ... */ },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDev,
              importLoaders: 1, // 需要先被 sass-loader 处理，所以这里设置为 1
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ]
  },
}
```

现在，通过以上配置之后，你再把 `src/app.css` 改为 `app.less` 或 `app.scss` ，执行 `npm run start` ，你会发现咱们的样式正常加载了出来，开心噢～

##### PostCSS 处理浏览器兼容问题

postcss 一种对 css 编译的工具，类似 babel 对 js 一样通过各种插件对 css 进行处理，在这里我们主要使用以下插件：

- [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes) ：用于修复一些和 flex 布局相关的 bug。
- [postcss-preset-env](https://github.com/csstools/postcss-preset-env) ：将最新的 CSS 语法转换为目标环境的浏览器能够理解的 CSS 语法，目的是使开发者不用考虑浏览器兼容问题。我们使用 [autoprefixer](https://github.com/postcss/autoprefixer) 来自动添加浏览器头。
- [postcss-normalize](https://github.com/csstools/postcss-normalize) ：从 browserslist 中自动导入所需要的 normalize.css 内容。

安装上面提到的所需的包：

```
npm install postcss-loader postcss-flexbugs-fixes postcss-preset-env autoprefixer postcss-normalize -D
```

将 `postcss-loader` 放到 `css-loader` 后面，配置如下：

```
{
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          grid: true,
          flexbox: 'no-2009'
        },
        stage: 3,
      }),
      require('postcss-normalize'),
    ],
    sourceMap: isDev,
  },
},
```

但是我们要为每一个之前配置的样式 loader 中都要加一段这个，这代码会显得非常冗余，于是我们把公共逻辑抽离成一个函数，与 `cra` 一致，命名为 `getCssLoaders` ，因为新增了 `postcss-loader` ，所以我们要修改 `importLoaders` ，于是我们现在的 `webpack.common.js` 修改为以下这样：

```
const getCssLoaders = (importLoaders) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        // 修复一些和 flex 布局相关的 bug
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            grid: true,
            flexbox: 'no-2009'
          },
          stage: 3,
        }),
        require('postcss-normalize'),
      ],
      sourceMap: isDev,
    },
  },
]

module.exports = {
	// other...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ]
  },
  plugins: [//...],
}
```

最后，我们还得在 `package.json` 中添加 `browserslist` （指定了项目的目标浏览器的范围）：

```
{
  "browserslist": [
    ">0.2%",
    "not dead",
    "ie >= 9",
    "not op_mini all"
  ],
}
```

现在，在如果你在入口文件（比如我之前一直用的 `app.js` ）随便引一个写了 `display: flex` 语法的样式文件， `npm run start` 看看是不是自动加了浏览器前缀了呢？快试试吧！

额外补充：添加 css.module, module.less, module.scss 等。webpack.common.js

#### 升级 webpack5 出现的问题

1.  Web pack-dev-serve 修改 webpack serve

2.  browserslist 相关问题

    // webpack 4 升级 webpack 5 出现的问题

    target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',

3.  出现 postcss 相关问题 postcss 和 postcss-cli。升级到 8.0.0 以上
