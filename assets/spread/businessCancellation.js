const plannersData = [
  {
    id: '3394',
    type: '金牌规划师',
    imgSrc:
      'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    avatarImg:
      'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    name: '刘琴',
    shupianfen: 11,
    serverNum: 250,
    telephone: '13350072314',
    labels: ['工商注册', '财税咨询', '税务筹划'],
    jobNum: '2022554',
  },
  {
    id: '7704199733711282176',
    type: '金牌规划师',
    imgSrc:
      'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    avatarImg:
      'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    name: '岳雪冬',
    shupianfen: 11,
    serverNum: 250,
    telephone: '13908231675',
    labels: ['工商注册', '财税咨询', '税务筹划'],
    jobNum: '96352931',
  },
  {
    id: '7930253930615472128',
    type: '金牌规划师',
    imgSrc:
      'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    avatarImg:
      'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    name: '李海怡',
    shupianfen: 11,
    serverNum: 250,
    telephone: '13696057459',
    labels: ['工商注册', '财税咨询', '税务筹划'],
    jobNum: '109870',
  },
  {
    id: '7887200447257313280',
    type: '金牌规划师',
    imgSrc:
      'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    avatarImg:
      'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    name: '李劲',
    shupianfen: 11,
    serverNum: 250,
    telephone: '18884259139',
    labels: ['工商注册', '财税咨询', '税务筹划'],
    jobNum: '108862',
  },
  {
    id: '66475',
    type: '金牌规划师',
    imgSrc:
      'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    avatarImg:
      'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    name: '钟霞',
    shupianfen: 11,
    serverNum: 250,
    telephone: '13730634929',
    labels: ['工商注册', '财税咨询', '税务筹划'],
    jobNum: '38798340',
  },
]
const serviceListData = [
  {
    title: '公司注销',
    // titlelable:
    //   'https://cdn.shupian.cn/sp-pt/wap/images/cr4yfd0fvhk0000.png',
    serviceTag: ['快至30个工作日', '成功率高，省心省钱'], // 服务标签
    activityTag: '限时优惠', // 活动标签
    salesTag: '', // 销售标签
    titleContent: '当公司不经营时申请注销，终止公司法人资格。',
    lowerPrice: 2500,
    number: [
      { content: '在线咨询', num: 484 },
      { content: '累计成交', num: 302 },
      { content: '成功案例', num: 293 },
    ],
    planner: {
      id: 3394,
      name: '刘琴',
      jobNum: '2022554',
      telephone: '13350072314',
      imgSrc:
        'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    },
  },
  {
    title: '工商注销',
    bgImg: 'https://cdn.shupian.cn/sp-pt/wap/d4ynsvxsx9c0000.png',
    // titlelable: 'https://cdn.shupian.cn/sp-pt/wap/images/cr4yfd0fvhk0000.png',
    serviceTag: ['快至30个工作日', '成功率高，省心省钱'], // 服务标签
    activityTag: '限时优惠', // 活动标签
    salesTag: '', // 销售标签
    titleContent: '企业税务或税务已清税的情况下的营业执照注销。',
    lowerPrice: 1000,
    // tags: ['快至30个工作日', '流程手续正规化'],
    number: [
      { content: '在线咨询', num: 370 },
      { content: '累计成交', num: 296 },
      { content: '成功案例', num: 290 },
    ],
    planner: {
      id: '7704199733711282176',
      name: '岳雪冬',
      jobNum: '96352931',
      telephone: '13908231675',
      imgSrc:
        'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    },
  },
  {
    title: '个体注销',
    bgImg: 'https://cdn.shupian.cn/sp-pt/wap/d4ynsvxsx9c0000.png',
    // titlelable: 'https://cdn.shupian.cn/sp-pt/wap/images/cr4yfd0fvhk0000.png',
    serviceTag: ['快至30个工作日', '成功率高，省心省钱'], // 服务标签
    activityTag: '限时优惠', // 活动标签
    salesTag: '', // 销售标签
    titleContent: '个体工商户不再从事经营活动办理的注销登记。',
    lowerPrice: 2000,
    tags: ['快至30个工作日', '专业团队申请，快速高效'],
    number: [
      { content: '在线咨询', num: 334 },
      { content: '累计成交', num: 316 },
      { content: '成功案例', num: 316 },
    ],
    planner: {
      id: '7930253930615472128',
      name: '李海怡',
      jobNum: '109870',
      telephone: '13696057459',
      imgSrc:
        'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    },
  },
  {
    title: '简易注销',
    bgImg: 'https://cdn.shupian.cn/sp-pt/wap/d4ynsvxsx9c0000.png',
    // titlelable: 'https://cdn.shupian.cn/sp-pt/wap/images/cr4yfd0fvhk0000.png',
    serviceTag: ['快至30个工作日', '成功率高，省心省钱'], // 服务标签
    activityTag: '限时优惠', // 活动标签
    salesTag: '', // 销售标签
    titleContent: '企业无经营活动，无债权债务的企业注销。',
    lowerPrice: 998,
    tags: ['快至30个工作日', '流程透明化，节点清晰可查'],
    number: [
      { content: '在线咨询', num: 135 },
      { content: '累计成交', num: 107 },
      { content: '成功案例', num: 102 },
    ],
    planner: {
      id: '7887200447257313280',
      name: '李劲',
      jobNum: '108862',
      telephone: '18884259139',
      imgSrc:
        'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
    },
  },
]
const planner = {
  id: '3394',
  type: '金牌规划师',
  imgSrc:
    'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
  avatarImg:
    'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
  name: '刘琴',
  shupianfen: 11,
  serverNum: 250,
  telephone: '13350072314',
  labels: ['工商注册', '财税咨询', '税务筹划'],
  jobNum: '2022554',
}
module.exports = { plannersData, serviceListData, planner }
