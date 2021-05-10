import { CHIPS_WAP_SPREAD_BASE_URL } from '../../config/constant'

const newSpreadApi = {
  list: `${CHIPS_WAP_SPREAD_BASE_URL}/nk/newChipSpread/v1/list.do`,
  service_product_list: `${CHIPS_WAP_SPREAD_BASE_URL}/nk/newChipSpread/v1/service_product_list.do`,
  trade_product_list: `${CHIPS_WAP_SPREAD_BASE_URL}/nk/newChipSpread/v1/trade_product_list.do`,
}

const spreadApi = {
  list: `${CHIPS_WAP_SPREAD_BASE_URL}/nk/spread/v1/list.do`,
}
const plannerApi = {
  planner: `${CHIPS_WAP_SPREAD_BASE_URL}/nk/spread/v1/planner.do`,
  plannerReferrals: `${CHIPS_WAP_SPREAD_BASE_URL}/nk/planner_referrals/v1/planner.do`,
  // plannerReferrals: `http://172.16.132.116:7001/service/nk/planner_referrals/v1/planner.do`,
}

const chipSpread = {
  list: `${CHIPS_WAP_SPREAD_BASE_URL}/nk/newChipSpread/v1/list.do`,
  // list: `http://172.16.132.116:7001/service/nk/newChipSpread/v1/list.do`,
  // productList: `${CHIPS_WAP_BASE_URL}/nk/chipSpread/v1/productList.do`,
}

const spread2Api = {
  list: `${CHIPS_WAP_SPREAD_BASE_URL}/nk/spread2/v1/list.do`,
}

// 新推荐规划师
// const recPlaner = `${CHIPS_WAP_BASE_URL}/nk/spread2/v1/recPlanner.do`
const recPlaner =
  'https://spmicrouag.shupian.cn/crisps-app-wap-bff-api/service/nk/recommend/v1/planner.do'
const productListApi = {
  list: `${CHIPS_WAP_SPREAD_BASE_URL}nk/newChipSpread/v1/service_product_list.do`,
}
const trading = {
  list: `${CHIPS_WAP_SPREAD_BASE_URL}nk/newChipSpread//v1/trade_product_list.do`,
}
export {
  spreadApi,
  plannerApi,
  recPlaner,
  spread2Api,
  chipSpread,
  newSpreadApi,
  productListApi,
  trading,
}
