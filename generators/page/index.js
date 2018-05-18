'use strict'

const path = require('path')
const Generator = require('yeoman-generator')
const chalk = require('chalk')

const validator = require('../../lib/validator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.pageDirPath = path.join(this.destinationRoot(), 'src/pages')
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'pageName',
        message: '页面名称[英文，用于文件名]:',
        validate: v => {
          v = v.trim()

          if (!validator.pageName(v)) {
            return `小程序名字 [${v}] 非法, 名字必须符合：[/^[0-9a-z][0-9a-zA-Z]*$/]`
          }

          if (validator.fileExist(v, this.pageDirPath)) {
            return `页面 [${v}] 已经存在`
          }

          return true
        }
      },
      {
        type: 'input',
        name: 'title',
        message: '页面 title [中文，用于展示 title]:'
      }
    ]

    return this.prompt(prompts).then(props => {
      props.pageName = props.pageName.trim()
      props.className = `${props.pageName[0].toUpperCase()}${props.pageName.substr(1)}`
      props.title = props.title.trim()

      this.props = props
    })
  }

  writing() {
    this.fs.copyTpl(this.templatePath('index.wpy'), `${this.pageDirPath}/${this.props.pageName}.wpy`, this.props)
  }

  end() {
    this.log(`创建页面 ${chalk.green(this.props.pageName)} 成功!`)
  }
}
