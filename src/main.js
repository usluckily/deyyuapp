// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import utils from './assets/js/utils'

Vue.use(Vuex)

Vue.use(utils)//Vue全局能访问

Vue.config.productionTip = false

// let basic = {userid:'866658324',sid:'143',roleid:'2460,2463',stuTid:'74927175'};//171
let basic = {userid:'731353944',sid:'4',perm:['CKSYNJPM'],roleid:'2460,2481',stuTid:'92152844',role:'JZ',roleFlag:''};
// let basic = {userid:'910736255',sid:'41',perm:['XKBM'],roleid:'219',stuTid:'39550650',role:'JZ',roleFlag:''};//local

const store = new Vuex.Store({
  state:{
    basic:basic,
    grade:[]
  },
  mutations:{

  }
})

const mainVueObj = {
  el: '#app',
  router,
  store,
  data:{
    eventHub:new Vue()
  },
  methods:{

  },
  created(){

  },
  template: '<App/>',
  components: { App }
}

if(window.GreenSchool){
  GreenSchool.showLeftBtn(false)

  basic.stuTid = GreenSchool.getStudentId()
  basic.userid = GreenSchool.getUserID()
  basic.sid = GreenSchool.getSchoolId()
  basic.roleFlag = GreenSchool.getRoleFlag()
  basic.perm = GreenSchool.getPermissions('DYPJ')

  basic.roleid = GreenSchool.getRoleId()

  new Vue(mainVueObj)

  // alert(basic.perm)

}else if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
  let SI = setInterval(function(){
    if(window.iosParams.userid != ''){

      basic.userid = window.iosParams.userid
      basic.stuTid = window.iosParams.stuTid
      basic.sid = window.iosParams.sid
      basic.roleid = window.iosParams.roleid
      basic.roleFlag = window.iosParams.roleFlag
      basic.perm = window.iosParams.perm;

      // alert(JSON.stringify(basic))

      new Vue(mainVueObj)

      clearInterval(SI)
    }
  },100)
}else{

  new Vue(mainVueObj)

}


