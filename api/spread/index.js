import { CHIPS_WAP_BASE_URL } from '../../config/constant'

const spreadApi = {
  list: `${CHIPS_WAP_BASE_URL}/nk/spread/v1/list.do`,
}
const plannerApi = {
  planner: `${CHIPS_WAP_BASE_URL}/nk/spread/v1/planner.do`,
}

const chipSpread = {
  // list: `${CHIPS_WAP_BASE_URL}/nk/chipSpread/v1/list.do`,
  list: `http://172.16.132.116:7001/service/nk/chipSpread/v1/list.do`,
  // productList: `${CHIPS_WAP_BASE_URL}/nk/chipSpread/v1/productList.do`,
}

const spread2Api = {
  list: `${CHIPS_WAP_BASE_URL}/nk/spread2/v1/list.do`,
}

// 新推荐规划师
// const recPlaner = `${CHIPS_WAP_BASE_URL}/nk/spread2/v1/recPlanner.do`
const recPlaner =
  'https://spmicrouag.shupian.cn/crisps-app-wap-bff-api/service/nk/recommend/v1/planner.do'
export { spreadApi, plannerApi, recPlaner, spread2Api, chipSpread }
