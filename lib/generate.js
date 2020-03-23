const chalk = require("chalk")
const Prompt = require("inquirer")
const download = require("./download")
const origin = "https://github.com:BjMemoryQ/initPragram#master"

const initQuestions = name => [{
  type: "confirm",
  name: "isInit",
  message: `确定要在${chalk.green(name)}文件夹下创建项目?`,
  prefix: "?"
}, {
  name: 'appid',
  message: 'appid:'
}]
const init = async name => {
  try {
    const {
      isInit,
      appid
    } = await Prompt.prompt(initQuestions(name))
    if (isInit) {
      await download(origin, name, {
        appid
      })
    } else {
      console.log(chalk.red("程序未完成"))
    }
  } catch (error) {
    console.log(chalk.red(error))
  }
}

module.exports = init