import {getToken, setToken, removeToken} from "../../utils";
import axios from "axios"
import $config from "../../config/index"
import md5 from "js-md5"
import Qs from "qs"


let timestamp = Date.parse(new Date())

const user = {
  state: {
    userInfo: getToken(),
    responseCode: "",
    openid: "",

    ConfirmationOrderList: [],   //确认订单时，商品数据  。含数量
    orderTotal: 0,              // 订单总价

    EvaluationData: {},     // 去评价时 保存的订单对象


  },
  mutations: {
    SET_userInfo(state, obj) {
      state.userInfo = obj
    },
    SET_responseCode(state, str) {
      state.responseCode = str
    },
    SET_openid(state, str) {
      state.openid = str
    },

    SET_ConfirmationOrderList(state, list) {
      state.ConfirmationOrderList = list
    },
    //  获取 总价
    SET_total(state) {
      state.orderTotal = 0
      state.ConfirmationOrderList.forEach((res, index) => {
        state.orderTotal = (state.orderTotal + (res.CommodityNum * res.price)).toFixed(2)
      })

    },

    SET_EvaluationData(state, obj) {
      state.EvaluationData = obj
    },
  },
  actions: {

    // wx 登录
    wxlogin({state, commit, dispatch}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          code: obj.code
        })
        axios.post($config.bizserverApi + "/valuevipwxtra/bandchecklogin", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登录
    AppLogin({state, commit, dispatch}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          mobile_phone_no: obj.phone,
          password: obj.password,
          timestamp: timestamp,
          sign: md5(obj.phone + timestamp)
        })
        axios.post($config.loginserver + "/userservice/login", data)
          .then(response => {
            if (response.data.success) {

              commit("SET_userInfo", response.data.result)
              localStorage.setItem("UserInfo", JSON.stringify(response.data.result))
            }
            resolve(response.data)
          })
      })
    },

    // 获取注册验证码
    _addCaptcha({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          mobile_phone_no: obj.phone,
          timestamp: timestamp,
          sign: md5(obj.phone + timestamp)
        })
        axios.post($config.loginserver + "/userservice/verifycodebyphone", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 用户注册
    _register({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          realname: obj.username,
          mobile_phone_no: obj.phone,
          addr: obj.address,
          timestamp: timestamp,
          sign: md5(obj.phone + timestamp),
          verifycode: obj.verifycode,
          openid: state.openid
        });

        axios.post($config.bizserverApi + "/valuevipwxtra/bandreg", data)
          .then(response => {
            if (response.data.success) {
              commit("SET_userInfo", response.data.result)
              // localStorage.setItem("UserInfo", JSON.stringify(response.data.result))
            }
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //密码找回 修改
    _Retrieve({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          mobile_phone_no: obj.phone,
          timestamp: timestamp,
          sign: md5(obj.phone + timestamp),
          verifycode: obj.captcha,
          password: obj.newpwd
        })
        axios.post($config.loginserver + "/userservice/modpwd", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    // 用户信息 查询
    _userInfoFind({state}) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          token: state.userInfo.token,
        })
        axios.post($config.bizserverApi + "/userservice/wxpubuserinfo", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    /******************** 业务 接口********************************/

    //  首页商品
    _homeProduct({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          token: state.userInfo.token,
          page: obj.page,
          pageSize: obj.pageSize
        })
        axios.post($config.bizserverApi + "/mallindexservice/productlist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  添加收货地址
    addAddress({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          userName: obj.name,
          mobilePhoneNo: obj.tel,
          region: obj.province + "-" + obj.city + "-" + obj.county,
          address: obj.address_detail
        })
        axios.post($config.bizserverApi + "/userservice/addrecvaddr", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  查看收货地址
    findAddress({state, commit}) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
        })
        axios.post($config.bizserverApi + "/userservice/recvaddrlist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 删除收货地址
    removeAddress({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          addrId: obj.addrId
        })
        axios.post($config.bizserverApi + "/userservice/delrecvaddr", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 查看商品详情
    findProduct({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          productId: obj.productId
        })
        axios.post($config.bizserverApi + "/productservice/productinfo", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //商品评价 查询
    productEvaluate({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          productId: obj.productId,
          page: obj.page,
          pageSize: obj.pageSize
        })
        axios.post($config.bizserverApi + "/productservice/evaluatelist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })

      })
    },
    //  确认订单
    confirmOrder({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          productId: obj.productId,
          purchaseCount: obj.purchaseCount,
          postage: obj.postage,
          recvAddrId: obj.recvAddrId
        })
        axios.post($config.bizserverApi + "/orderservice/addorder", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  支付
    BridgePay({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          orderNo: obj.orderNo
        })
        axios.post($config.bizserverApi + "/orderservice/paymentorder", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 钱包 充值
    WXRecharge({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          rechargeSum: obj.rechargeSum
        });
        axios.post($config.bizserverApi + "/orderservice/recharge", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 钱包信息 查询
    FindMyWallet({state, commit}) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
        })

        axios.post($config.bizserverApi + "/userservice/walletinfo", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //交易记录 查询
    TransactionRecordFind({state, commit}) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
        })
        axios.post($config.bizserverApi + "/userservice/walletrecord", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  订单查询
    FindMyOrder({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          orderStatus: obj.orderStatus
        })
        axios.post($config.bizserverApi + "/orderservice/buyerorderlist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  取消订单
    cancelOrder({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          orderId: obj.orderId
        })
        axios.post($config.bizserverApi + "/orderservice/cancelorder", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //确认收货
    orderReceipt({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          orderId: obj.orderId
        })
        axios.post($config.bizserverApi + "/orderservice/confirmreceipt", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  订单 商品评价
    orderProductEvaluation({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          orderId: state.EvaluationData.id,
          productId: state.EvaluationData.detailList[0].productInfo.id,
          productScore: obj.productScore + ".0",
          content: obj.content
        });

        axios.post($config.bizserverApi + "/orderservice/evaluateorder", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //分类 查询
    FindClassification({state, commit}) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({})
        axios.post($config.bizserverApi + "/productservice/categorylist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 商品查询
    FindProducList({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify(obj)
        axios.post($config.bizserverApi + "/productservice/productlist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //提现申请
    ApplicationCash({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.token,
          userId: state.userInfo.userid,
          timestamp: timestamp,
          sign: md5(state.userInfo.token + timestamp),
          userName: obj.userName,
          cardNumber: obj.cardNumber,
          withdrawalSum: obj.withdrawalSum
        })

        axios.post($config.bizserverApi + "/orderservice/applywithdrawal", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })

      })
    },
/*
    //  Test 支付
    TestPay({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          token: state.userInfo.userid,
          samount: "0.01",
          description: "money",
          wxorderno: obj.orderNo
        })
        axios.post($config.bizserverApi + "/wxpay/tobuy", data)
          .then(response => {
            resolve(response.data)
          })
      })
    }
*/

  }
}


export default user
