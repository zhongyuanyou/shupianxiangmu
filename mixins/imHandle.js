/**
 * @author maliang
 * @description: IM 创建会发与发送模板消息封装
 * @since 2020/11/22
 */
'use strict'
import { Toast } from '@chipspc/vant-dgg'
import { mapState, mapMutations } from 'vuex'
import config from '@/config'
export default {
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      userType: (state) => state.user.userType,
      imExample: (state) => state.im.imExample, // IM 实例
      isInApp: (state) => state.app.isInApp,
    }),
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'user/SET_USER',
      clearUserInfo: 'user/CLEAR_USER',
    }),
    // 发起聊天
    uPIM(planner, sessionParams, msgParams) {
      const { mchUserId, userName, type, msgParam, templateIds } = planner
      const tepMsgParams = {
        title: msgParam.title, // 客户名称
        area: msgParam.area, // 客户地址
        intention: msgParam.intention, // 客户意向
        productName: msgParam.productName, // 产品名称
        forwardAbstract: msgParam.forwardAbstract, // 摘要信息，可与显示内容保持一致
      }
      // 如果当前页面在app中，则调用原生IM的方法
      if (this.isInApp) {
        try {
          // 需要判断登陆没有，没有登录就是调用登录
          this.$appFn.dggGetUserInfo((res) => {
            const { code, data } = res || {}
            if (code !== 200) {
              this.$appFn.dggLogin((loginRes) => {
                if (loginRes.code === 200) {
                  if (templateIds !== '') {
                    this.$appFn.dggOpenIM(
                      {
                        templateId: templateIds,
                        extContent: tepMsgParams,
                        name: userName,
                        userId: mchUserId,
                        userType: type || 'MERCHANT_B',
                      },
                      (res) => {
                        const { code } = res || {}
                        if (code !== 200)
                          this.$xToast.show({
                            message: `联系失败`,
                            duration: 1000,
                            forbidClick: true,
                            icon: 'toast_ic_remind',
                          })
                      }
                    )
                  } else {
                    this.$appFn.dggOpenIM(
                      {
                        name: userName,
                        userId: mchUserId,
                        userType: type || 'MERCHANT_B',
                      },
                      (res) => {
                        const { code } = res || {}
                        if (code !== 200)
                          this.$xToast.show({
                            message: `联系失败`,
                            duration: 1000,
                            forbidClick: true,
                            icon: 'toast_ic_remind',
                          })
                      }
                    )
                  }
                }
              })
            } else if (templateIds !== '') {
              this.$appFn.dggOpenIM(
                {
                  templateId: templateIds,
                  extContent: tepMsgParams,
                  name: userName,
                  userId: mchUserId,
                  userType: type || 'MERCHANT_B',
                },
                (res) => {
                  const { code } = res || {}

                  if (code !== 200)
                    this.$xToast.show({
                      message: `联系失败`,
                      duration: 1000,
                      forbidClick: true,
                      icon: 'toast_ic_remind',
                    })
                }
              )
            } else {
              this.$appFn.dggOpenIM(
                {
                  name: userName,
                  userId: mchUserId,
                  userType: type || 'MERCHANT_B',
                },
                (res) => {
                  const { code } = res || {}

                  if (code !== 200)
                    this.$xToast.show({
                      message: `联系失败`,
                      duration: 1000,
                      forbidClick: true,
                      icon: 'toast_ic_remind',
                    })
                }
              )
            }
          })
        } catch (error) {
          console.error('uPIM error:', error)
        }
      } else if (sessionParams && msgParams) {
        this.sendTemplateMsgMixin({ sessionParams, msgParams })
      } else {
        const imUserType = type || 'MERCHANT_B' // 用户类型: ORDINARY_B 启大顺 ;MERCHANT_S 启大包
        const operUserType =
          this.userType ||
          this.$cookies.get('userType', { path: '/' }) ||
          'VISITOR'
        this.creatImSessionMixin({
          imUserId: mchUserId,
          imUserType,
          operUserType,
        })
      }
    },

    // app获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.userInfo.userId) {
          resolve(this.userInfo.userId)
          return
        }
        this.$appFn.dggGetUserInfo((res) => {
          const { code, data } = res || {}
          // 未登录需要登录
          if (code !== 200) {
            this.$appFn.dggLogin((loginRes) => {
              if (loginRes && loginRes.code === 200) {
                console.log('loginRes : ', loginRes)
                if (
                  loginRes.data &&
                  loginRes.data.userId &&
                  loginRes.data.token
                ) {
                  this.setUserInfo(loginRes.data)
                  resolve(loginRes.data.userId)
                  return
                }
                reject(new Error('登录后userId或者token缺失'))
                return
              }
              reject(new Error('登录失败'))
            })
            return
          }
          if (data && data.userId && data.token) {
            this.setUserInfo(data)
            resolve(data.userId)
            return
          }
          reject(new Error('用户信息中userId或者token缺失'))
        })
      })
    },
    /**
     * @description: 创建IM会话 （私聊）
     * @param {Object} data: 必传
     * @param {String} data.imUserId: 对方用户ID（用户唯一标识） 必传
     * @param {String} data.imUserType: 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户 必传
     * @param {Object} data.ext: 扩展字段，客户端自定义 非必传
     * @param {String} data.ext.intentionType: 意向业务 非必传
     * @param {String} data.ext.intentionCity: 意向城市 非必传
     * @param {String} data.ext.recommendId: 推荐ID 非必传
     * @param {Object} data.ext.recommendAttrJson: 推荐属性 Object 非必传
     * @return: void
     */

    creatImSessionMixin(data) {
      const userInfo = this.$store.state.user.userInfo
      if (userInfo) {
        let params = {
          imUserId: '',
          imUserType: '',
          operUserType: '',
          ext: {
            intentionType: '',
            intentionCity: '',
            recommendId: '',
            recommendAttrJson: {},
            startUserType: 'cps-app',
          },
        }
        params = Object.assign(params, data)
        this.imExample.createSession(params, (res) => {
          if (res.code === 200) {
            const myInfo = localStorage.getItem('myInfo')
              ? JSON.parse(localStorage.getItem('myInfo'))
              : {}
            const token =
              this.$cookies.get('token', { path: '/' }) ||
              this.token ||
              myInfo.token
            const userId =
              this.$cookies.get('userId', { path: '/' }) ||
              this.userId ||
              myInfo.userId
            const userType =
              this.$cookies.get('userType', { path: '/' }) ||
              this.userType ||
              'VISITOR'
            window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&id=${res.data.groupId}`
          } else if (res.code === 5223) {
            this.clearUserInfoAndJumpLoging()
          } else {
            this.$xToast.warning(res.msg)
          }
        })
      }
    },
    /**
     * @description: 发送模板消息
     * @param {Object} sessionParams: 创建会话用到的参数 必传
     * @param {String} sessionParams.imUserId: 对方用户ID（用户唯一标识） 必传
     * @param {String} sessionParams.imUserType: 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户 必传
     * @param {Object} sessionParams.ext: 扩展字段，客户端自定义 非必传
     * @param {String} sessionParams.ext.intentionType: 意向业务 非必传
     * @param {String} sessionParams.ext.intentionCity: 意向城市 非必传
     * @param {String} sessionParams.ext.recommendId: 推荐ID 非必传
     * @param {Object} sessionParams.ext.recommendAttrJson: 推荐属性 Object 非必传
     * @param {Object} msgParams: 发送模板消息用到的参数 必传
     * @param {String} msgParams.sendType: 0：带图片的模板消息  1：不带图片的模板消息 必传
     * @param {String} msgParams.senderName: 发送者昵称 非必传
     * @param {String} msgParams.msgType: 消息类型 必传
     * @param {Object} msgParams.extContent: 路由参数 必传
     * @param {String} msgParams.productName: 产品名称 必传
     * @param {String} msgParams.productContent: 产品信息 必传
     * @param {String} msgParams.price: 价格 必传
     * @param {String} msgParams.forwardAbstract: 摘要信息，可与显示内容保持一致 必传
     * @param {String} msgParams.routerId: 路由ID（配置路由的id）
     * @param {String} msgParams.imageUrl: 产品图片 （sendType = 0 必传）
     * @param {String} msgParams.unit: 小数点后面带单位的字符串（示例：20.20元，就需要传入20元） （sendType = 0 必传）
     * @return: void
     */
    regularVisitor({ visitorId, userId }) {
      console.log(visitorId, userId, 321)
      this.imExample.regularVisitor(
        {
          visitorId,
          userId,
        },
        (res) => {
          console.log(res, 123)
        }
      )
    },
    sendTemplateMsgMixin({ sessionParams, msgParams }) {
      const userInfo = this.$store.state.user.userInfo
      // this.judgeLoginMixin(true).then((userInfo) => {
      if (userInfo) {
        let params = {
          imUserId: '',
          imUserType: '',
          ext: {
            intentionType: '',
            intentionCity: '',
            recommendId: '',
            recommendAttrJson: {},
            startUserType: 'cps-app',
          },
        }
        params = Object.assign(params, sessionParams)
        // 发送模板消息前先创建会话
        this.imExample.createSession(params, (res) => {
          if (res.code === 200) {
            const tepMsgParams = {
              templateId: '', // 模板 id
              receiver: res.data.receiveId, // 会话 id
              senderName: userInfo.nickName || '访客', // 发送者昵称
              msgType: msgParams.msgType, // 消息类型
              extContent: JSON.stringify(msgParams.extContent), // 路由参数
              paramJsonStr: {
                title: msgParams.title, // 客户名称
                area: msgParams.area, // 客户地址
                intention: msgParams.intention, // 客户意向
                productName: msgParams.productName, // 产品名称
                productContent: msgParams.productContent, // 产品信息
                // eslint-disable-next-line eqeqeq
                price: msgParams.price == '0.00元' ? '面议' : msgParams.price, // 价格
                forwardAbstract: msgParams.forwardAbstract, // 摘要信息，可与显示内容保持一致
                routerId: msgParams.routerId, // 路由ID
              },
            }
            switch (msgParams.sendType) {
              // 带图片的模板消息
              case 0:
                tepMsgParams.paramJsonStr.imageUrl = msgParams.imageUrl // 产品图片
                tepMsgParams.paramJsonStr.unit =
                  // eslint-disable-next-line eqeqeq
                  msgParams.price == '0.00元' ? '' : msgParams.unit // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
                tepMsgParams.templateId = '5fcef0aec24ddd00065a8c93' // 模板id
                break
              // 不带图片的模板消息
              case 1:
                tepMsgParams.templateId = '5fcef0aec24ddd00065a8c83' // 模板id
                break
              case 2:
                tepMsgParams.templateId = '60a46c4e344fb6000633c37a' // 模板id
                break
              default:
                break
            }
            tepMsgParams.paramJsonStr = JSON.stringify(
              tepMsgParams.paramJsonStr
            )
            // 发送模板消息
            this.imExample.sendTemplateMsg(tepMsgParams, (resData) => {
              if (resData.code === 200) {
                // 延时1s进入IM,避免模板消息未发生完成就已进入IM
                this.$xToast.showLoading({ message: '正在联系规划师...' })
                const timer = setTimeout(() => {
                  clearTimeout(timer)
                  this.$xToast.hideLoading()
                  const myInfo = localStorage.getItem('myInfo')
                    ? JSON.parse(localStorage.getItem('myInfo'))
                    : {}
                  const token = this.token ? this.token : myInfo.token
                  const userId = this.userId ? this.userId : myInfo.userId
                  const userType = this.userType || 'VISITOR'
                  if (this.isApplets) {
                    window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&id=${res.data.groupId}&requireCode=${sessionParams.requireCode}&requireName=${sessionParams.requireName}&isApplets=true`
                  } else {
                    window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&id=${res.data.groupId}&requireCode=${sessionParams.requireCode}&requireName=${sessionParams.requireName}`
                  }
                }, 2000)
                // window.location.href = `${config.imBaseUrl}/chat?token=${this.token}&userId=${this.userId}&userType=${this.userType}&id=${res.data.groupId}`
              } else if (res.code === 5223) {
                this.clearUserInfoAndJumpLoging()
              } else {
                this.$xToast.warning(resData.msg)
              }
            })
          } else if (res.code === 5223) {
            this.clearUserInfoAndJumpLoging()
          } else {
            this.$xToast.warning(res.msg)
          }
        })
      }
      // })
    },
  },
}
