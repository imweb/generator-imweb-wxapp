'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');
const getName = require('imweb-git-user-name');
const chalk = require('chalk');

const validator = require('../../lib/validator');

const assets = ['.eslintrc', '.eslintignore', '.stylelintrc', '.editorconfig', 'bin/beforeUpload.sh', 'bin/npm.sh', 'miniprogram', 'gulpfile.js', 'postcss.config.js', '.vscode/settings.json'];

const dirs = ['miniprogram/assets/images', 'miniprogram/components', 'miniprogram/pages'];

const tpls = ['README.md', 'project.config.json', 'package.json', 'miniprogram/app.json'];

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.userName = getName(true);
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: '小程序名字[用于 projectname]:',
        validate: (v) => {
          v = v.trim();

          if (!validator.pageName(v)) {
            return `小程序名字 [${v}] 非法, 名字必须符合：[/^[0-9a-z][0-9a-zA-Z]*$/]`;
          }

          return true;
        },
      },
      {
        type: 'input',
        name: 'appNameInChinese',
        message: '小程序名字[中文，用于展示 title]:',
      },
      {
        type: 'input',
        name: 'appid',
        message: '小程序 appid:',
        default: 'touristappid',
      },
      {
        type: 'input',
        name: 'author',
        message: '作者:',
        validate: (v) => {
          if (!validator.notEmpty(v)) {
            return 'Author can not be null';
          }

          return true;
        },
        when: () => {
          return !this.userName;
        },
      },
    ];

    return this.prompt(prompts).then((props) => {
      props.appName = props.appName.trim();
      props.appNameInChinese = props.appNameInChinese.trim();
      props.appid = props.appid.trim();
      if (!props.author) {
        props.author = this.userName;
      }

      this.props = props;
    });
  }

  writing() {
    // 发布 npm 的时候，.gitignore 文件会被替换为 .npmignore，因此这里需要改文件名
    this.fs.copy(this.templatePath('.gitignorefile'), this.destinationPath('.gitignore'));

    assets.forEach((item) => {
      this.fs.copy(this.templatePath(item), this.destinationPath(item));
    });

    tpls.forEach((item) => {
      this.fs.copyTpl(this.templatePath(item), this.destinationPath(item), this.props);
    });
  }

  end() {
    dirs.forEach((item) => {
      fs.mkdirSync(this.destinationPath(item));
    });

    this.log(`创建项目 ${chalk.green(`${this.props.appName}[${this.props.appNameInChinese}小程序]`)} 成功!`);
  }
};
