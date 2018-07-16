import Vue from 'vue'
import Router from 'vue-router'

import home from "../view/home"
import PersonalCenter from "../view/PersonalCenter"
import CommodityDetails from "../view/CommodityDetails"
import error from "../view/404"
import login from "../view/login"
import register from "../view/register"
import retrieve from "../view/Retrievepwd"
import myOrder from "../view/myOrder"
import ReceivingAddress from "../view/ReceivingAddress"
import Choice from "../view/Choice"
import binding from "../view/binding"
import classification from "../view/classification"
import buffer from "../view/buffer"
import address from "../view/address"
import ConfirmationOrder from "../view/ConfirmationOrder"
import MyWallet from "../view/MyWallet"
import Recharge from "../view/Recharge"
import TransactionRecord from "../view/TransactionRecord"
import ProductList from "../view/ProductList"
import ApplicationPresentation from "../view/ApplicationPresentation"
import CommodityEvaluation from "../view/CommodityEvaluation"

Vue.use(Router)

export default new Router({
  /*  mode: "history",
    scrollBehavior(to, from, savedPosition) {
      // 如果你的連結是帶 # 這種
      // to.hash 就會有值(值就是連結)
      // 例如 #3
      if (to.hash) {
        return {
          // 這個是透過 to.hash 的值來找到對應的元素
          // 照你的 html 來看是不用多加處理這樣就可以了
          // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
          selector: to.hash
        }
      }
    },*/
  routes: [
    {path: "/", name: 'buffer', component: buffer},
    {path: "/home", name: 'home', component: home},
    {path: "/PersonalCenter", name: 'PersonalCenter', component: PersonalCenter},
    {path: "/CommodityDetails/:CID", name: 'CommodityDetails', component: CommodityDetails},
    {path: "/login", name: 'login', component: login},
    {path: "/register", name: 'register', component: register},
    {path: "/retrieve", name: 'retrieve', component: retrieve},
    {path: "/myOrder/:isIndex", name: 'myOrder', component: myOrder},
    {path: "/ReceivingAddress", name: 'ReceivingAddress', component: ReceivingAddress},
    {path: "/Choice", name: 'Choice', component: Choice},
    {path: "/binding", name: 'binding', component: binding},
    {path: "/classification", name: 'classification', component: classification},
    {path: "/address", name: 'address', component: address},
    {path: "/ConfirmationOrder", name: 'ConfirmationOrder', component: ConfirmationOrder},
    {path: "/MyWallet", name: 'MyWallet', component: MyWallet},
    {path: "/Recharge", name: 'Recharge', component: Recharge},
    {path: "/TransactionRecord", name: 'TransactionRecord', component: TransactionRecord},
    {path: "/ProductList/:cid", name: 'ProductList', component: ProductList},
    {path: "/ApplicationPresentation", name: 'ApplicationPresentation', component: ApplicationPresentation},
    {path: "/CommodityEvaluation", name: 'CommodityEvaluation', component: CommodityEvaluation},
    {path: "*", name: 'error', component: error},
  ]
})
