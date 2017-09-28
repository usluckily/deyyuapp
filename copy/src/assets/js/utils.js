
export default{
  install(Vue,options){
    Vue.prototype.mergeArrsSame = function(arr){
      let arr2 = arr

      for(var i in arr){
        for(var j in arr){
          if(arr[i].studentid == arr[j].studentid && i != j){
            arr2[i].course+='、'+arr[j].course
            arr2.splice(j,1)
          }
        }
      }
      return arr2

    }
    Vue.prototype.isPer = function(d){
      let arr , res = false
      arr = this.$store.state.basic.role.split(',')
      for(var i in arr){
        if(d == arr[i]){
          res =  true
        }
      }
      return res
    }
    Vue.prototype.BP = function(){
      return this.$store.state.basic
    }
    Vue.prototype.weekCN = function(week){
      var vm = this , res
      switch(week){
        case 0:
          res = '星期日'
          break;
        case 1:
          res = '星期一'
          break;
        case 2:
          res = '星期二'
          break;
        case 3:
          res = '星期三'
          break;
        case 4:
          res = '星期四'
          break;
        case 5:
          res = '星期五'
          break;
        case 6:
          res = '星期六'
          break;
      }
      return res
    }
    Vue.prototype.vHhost = 'http://'+location.host+'/html5/chooseCourse/index.html#/' //  /html5/chooseCourse/index.html#/   or /#/
  }
}
