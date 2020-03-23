const {
  promisify
} = require("util")
const fs = require("fs")
const ora = require("ora")
const chalk = require("chalk")
const handlebars = require("handlebars")
const download = promisify(require('download-git-repo'))
// repo github模板 地址
// name 文件夹名称
const dw = async function (repo, name, options = {}) {
  const process = ora(`开始下载 ${chalk.blue(repo)}`)
  process.start()
  process.color = 'yellow'
  process.text = `正在下载...${chalk.yellow(repo)}`
  try {
    download(repo, name, {
      clone: true
    }, err => {

      if (err) {
        process.fail()
        console.error(
          chalk.red(`${err}download template fail, please check your network connection`)
        )
        return
      }
      process.color = 'green'
      process.text = `下载成功${chalk.green(repo)}`
      process.succeed()
      const filename = `${name}/project.config.json`
      const content = fs.readFileSync(filename).toString()
      const result = handlebars.compile(content)(options)
      fs.writeFileSync(filename, result)
    })
  } catch (error) {
    process.color = 'res'
    process.text = `下载失败`
    process.fail()
  }
}
module.exports = dw