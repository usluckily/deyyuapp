<template>

  <transition name="page">

    <div class="all" style="background:#fff;">

      <div v-show="list.length < 1" class="prompt">
        <p>{{ prompt.msg }}</p>
      </div>
      <!--无数据时的提示-->

      <m_ballpulse v-show="loaderShow"></m_ballpulse>

      <div class="dateBar">
        <div class="bar" id="startdate">
          <span>第{{ cycle }}周</span>&nbsp;
          <span id="date">{{ years }}年{{ month }}月{{ days }}日</span>&nbsp;
          <span>( {{ localWeek }} )</span>
        </div>
      </div>

      <div class="list">
        <ul>
          <li v-for="i in list">
            <span>{{ i.scoreRulesName }}</span>
            <span :class="scoreColor(i.score)">{{ i.score | isAdd }}</span>
          </li>
          <li class="total" v-if="total">今日总分<span class="c_green">{{ total }}</span></li>
        </ul>
      </div>

    </div>

  </transition>

</template>
<script>
  import ajax from '@/assets/js/ajax'
  import IF from '@/assets/js/interface'
  import $ from 'jquery'

  import ballPulse from '@/components/loader/ballpulse'

  require('@/assets/js/mobiscroll.js')

    export default({
      name: 'details',
      data(){
        return {
          years:new Date().getFullYear(),
          month:new Date().getMonth() + 1,
          days:new Date().getDate(),
          week:new Date().getDay(),
          chooseWeek:new Date().getDay(),
          prompt:{
            msg:'暂时没有数据'
          },
          list:[],
          total:'',
          cycle:'',
          loaderShow:false
          }
        },
      methods:{
        scoreColor(num){
          if( parseInt(num) < 0 ){
            return 'c_red'
          }else{
            return ''
          }
        },
        getData(){
          let vm = this

          vm.loaderShow = true

          ajax.post(IF.getDetails,{ sid:vm.BP().sid,classid:vm.$route.params.classid,time:vm.years+'/'+vm.month+'/'+vm.days },function(d){
            console.log(d)
            vm.list = d.data[0].scoreRecordList
            vm.total = d.data[0].totalscore
            vm.cycle = d.data[0].cycle

            setTimeout(function(){
              vm.loaderShow = false
            },500)

          })
        }
      },
      computed:{
        localWeek(){
          let vm = this
          return vm.weekCN(vm.week)
        }
      },
      filters:{
        isAdd(val){
          if(parseInt(val) > 0){
            return '+'+val
          }else{
            return val
          }
        }
      },
      created(){
        this.getData()
      },
      mounted(){
        let currYear = (new Date()).getFullYear() , vm = this
        $("#startdate").mobiscroll().date({
          theme: "android-ics light",
          lang: "zh",
          cancelText: null,
          startYear: currYear-5,
          dateFormat: 'yy-mm-dd', //返回结果格式化为年月格式
          onSelect: function(inst){
            inst = inst.split('-')
            vm.years = inst[0]
            vm.month = inst[1]
            vm.days = inst[2]

            vm.week = new Date( vm.years +'/'+ vm.month +'/'+ vm.days ).getDay()

            vm.getData()
          }
        });
      },
      components:{
        m_ballpulse:ballPulse
      }
    })
</script>
<style>
  .list{
    width:100%;
    padding:0 1rem;
  }
  .list ul{

  }
  .list ul li{
    padding:0.7rem 0;
    border-bottom:1px solid #F3F3F3;
    color:#888;
    display:flex;
    justify-content:space-between;
  }
  .list li.total{
    font-size:1rem;
    font-weight:bold;
  }
  .dateBar{
    width:100%;
    padding:0 1rem;
    margin:0.5rem 0;
  }
  .dateBar .bar{
    width:100%;
    padding:0.3rem 0;
    border:1px solid #D7D7D7;
    border-radius:2rem;
    color:#999;
    font-size:0.8rem;
    position:relative;
    text-align:center;
  }
</style>
