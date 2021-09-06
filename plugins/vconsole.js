import VConsole from 'vconsole'
const vConsole =
  process.env.DGG_SERVER_ENV === 'development' ||
  process.env.DGG_SERVER_ENV === 'release'
    ? new VConsole()
    : ''
// new VConsole()
export default vConsole
