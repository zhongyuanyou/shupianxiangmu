import { CHIPS_WAP_BASE_URL } from '../../config/constant'

const spreadApi = {
  list: `${CHIPS_WAP_BASE_URL}/nk/spread/v1/list.do`,
}
const plannerApi = {
  planner: `${CHIPS_WAP_BASE_URL}/nk/spread/v1/planner.do`,
}
const chipSpread = {
  list: `${CHIPS_WAP_BASE_URL}/nk/chipSpread/v1/list.do`,
  // list: `http://172.16.132.70:7001/service/nk/chipSpread/v1/list.do`,
  // productList: `${CHIPS_WAP_BASE_URL}/nk/chipSpread/v1/productList.do`,
}

export { spreadApi, plannerApi, chipSpread }
