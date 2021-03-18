import { CHIPS_WAP_BASE_URL } from '../../config/constant'

const spreadApi = {
  list: `${CHIPS_WAP_BASE_URL}/nk/spread/v1/list.do`,
}
const plannerApi = {
  planner: `${CHIPS_WAP_BASE_URL}/nk/spread/v1/planner.do`,
}
const chipSpread = {
  list: `${CHIPS_WAP_BASE_URL}/nk/chipSpread/v1/list.do`,
}

export { spreadApi, plannerApi, chipSpread }
