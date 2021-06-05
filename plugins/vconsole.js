import VConsole from 'vconsole'
const vConsole =
  process.env.DGG_SERVER_ENV === 'development' ? new VConsole() : ''
// new VConsole()
export default vConsole
