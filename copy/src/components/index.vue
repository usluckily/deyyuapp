<template>

  <transition name="page">

    <div class="all">

      <m_nav :navCur="navCur" :list="navList"></m_nav>

      <div class="content" style="background:#F2F2F2;">
        <div class="swiper-container" id="tabs-container" >
          <div class="swiper-wrapper">
            <div :class="swiperSliderClass" v-for="(i,index) in (navList.length || 1)">

              <m_ballpulse v-show="loaderShow && index == loaderCur"></m_ballpulse>

              <div class="con-box head"><!--#24B17C-->

                <div class="title">
                    <p>
                      {{ semester }}第{{ cycle }}周
                    </p>
                    <div>
                      <img src="../assets/img/head_tit.png"/>
                    </div>
                </div>

                <div class="rank-box head">

                  <div class="rank-card" @click="toDetails(rankObj.no2.classid)">
                    <div>
                      <img src="../assets/img/no2.png"/>
                      <p>{{ rankObj.no2.classname | classNameFilt }}</p>
                    </div>
                    <div>{{ rankObj.no2.totalscore || '0' }}</div>
                  </div>

                  <div class="rank-card no1" @click="toDetails(rankObj.no1.classid)">
                    <div>
                      <img src="../assets/img/no1.png"/>
                      <p>{{ rankObj.no1.classname | classNameFilt }}</p>
                    </div>
                    <div>{{ rankObj.no1.totalscore || '0' }}</div>
                  </div>

                  <div class="rank-card" @click="toDetails(rankObj.no3.classid)">
                    <div>
                      <img src="../assets/img/no3.png"/>
                      <p>{{ rankObj.no3.classname | classNameFilt }}</p>
                    </div>
                    <div>{{ rankObj.no3.totalscore || '0' }}</div>
                  </div>

                </div>

              </div>
              <div class="con-box" style="padding:0 0.2rem;">

                <div class="rank-box normal">

                  <div class="rank-card normal" v-for="i in rankObj.list" @click="toDetails( i.classid )">
                    <div>
                      <p>{{ i.classname | classNameFilt }}</p>
                    </div>
                    <div>{{ i.totalscore }}</div>
                  </div>

                </div>

                <p v-if="rankObj.list <= 0" style="color:#888;text-align:center;">暂时没有数据</p>

              </div>

              <div class="out-con-tit">
                年级评语
              </div>
              <div class="con-box" style="padding:1rem;color:#666;font-size: 0.9rem;letter-spacing: 1px;">
                {{ comment }}  {{ test }}
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>

  </transition>

</template>
<script>
  import $ from 'jquery'
  import Swiper from 'swiper'
  import ajax from '@/assets/js/ajax'
  import IF from '@/assets/js/interface'

  import nav from '@/components/common/nav'
  import ballPulse from '@/components/loader/ballpulse'

    export default({
        name: 'index',
        data(){
            return {
              navCur:this.$route.params.index || '1',
              navList:[],
              resRank:[],
              comment:'暂时没有数据',
              mySwiper:'',
              noSwiping:false,
              loaderShow:false,
              loaderCur:0,
              semester:'',
              cycle:'',
              test:''
            }
        },
      methods:{
          slider:function(){
            let vm = this
            vm.mySwiper = new Swiper('.swiper-container',{
//              initialSlide:1,
              loop: false,
              freeMode:false,
              speed:300,
              noSwiping : true,
              onSlideChangeStart: function(){
                vm.noSwiping = true

                vm.loaderCur = vm.mySwiper.activeIndex
                vm.loaderShow = true
              },
              onSlideChangeEnd: function(){
                vm.noSwiping = false
              },
              onSlidePrevEnd: function(){
                let index = vm.mySwiper.activeIndex
                vm.$router.replace({ path:'/index/'+(index+1)+'?gid='+vm.navList[index].id })
              },
              onSlideNextEnd: function(){
                let index = vm.mySwiper.activeIndex
                vm.$router.replace({ path:'/index/'+(index+1)+'?gid='+vm.navList[index].id })
              }
            });
          },
        getRank(){
          let vm = this , d = vm.navList , gid

          if(vm.$route.query.gid){
            gid = vm.$route.query.gid
          }else if(d[0]){
            gid = d[0].id
          }

          if(!d[0]){
            vm.loaderShow = false
            return
          }

          ajax.post(IF.getRank,{ sid:vm.BP().sid , gid:gid },function(d){
            let res = d.data[0]

            vm.resRank = d.data[0].classrankinglist

            vm.comment = res.comment

            vm.semester = res.semester.substring(9)

            vm.cycle = res.cycle

            setTimeout(function(){
              vm.loaderShow = false
            },500)

          },['comment'])
        },
        toDetails(id){
          if(!id){
            return
          }
          this.$router.push({ path:'/details/'+id })
        }
      },
      computed:{
        rankObj(){
          let vm = this , d = vm.resRank , res = { no1:{ classname:'',totalscore:'' } , no2:{ classname:'',totalscore:'' } , no3:{ classname:'',totalscore:'' } , list:[] }
          d.forEach(function(i){
            if(i.ranking == '1'){
              res.no1 = i
            }else if(i.ranking == '2'){
              res.no2 = i
            }else if(i.ranking == '3'){
              res.no3 = i
            }else{
              res.list.push(i)
            }
          })
          return res
        },
        swiperSliderClass(){
          let res , vm = this
          if( vm.noSwiping ){
            res = ['swiper-slide','swiper-no-swiping']
          }else{
            res = ['swiper-slide']
          }
          return res
        }
      },
      filters:{
        classNameFilt(val){
          if(val != ''){
            return val.split('年级')[1]
          }else{
            return '无'
          }

        }
      },
      created(){
        let vm = this

        vm.loaderShow = true

        if( vm.$store.state.grade.length > 0 ){
          vm.navList = vm.$store.state.grade
          vm.getRank()
        }else{
          ajax.post(IF.getGrade,{ sid:vm.BP().sid,userid:vm.BP().userid },function(d){
//          console.log(d)

            vm.navList = d.data

            vm.$store.state.grade = d.data

            vm.getRank()

          })
        }

      },
      mounted(){

      },
      components:{
          m_nav:nav,
          m_ballpulse:ballPulse
      },
      watch:{
        '$route'(to,from){
            let vm = this
            vm.navCur = to.params.index
            vm.mySwiper.slideTo(to.params.index - 1,300)
            vm.getRank()

        },
        'navList'(val){
          let vm = this , allH , navH

          vm.$nextTick(function(){

            allH = $('.all').height()
            navH = $('.nav').height()

            $('#tabs-container .swiper-slide').css({ height:allH - navH })

            vm.slider()
          })
        }
      }
    })
</script>
<style scoped>
  .all{
    overflow:hidden;
  }
  .swiper-slide{
    overflow-y:scroll;
  }
  .con-box.head{
    background:url('../assets/img/head_bg.png') scroll center no-repeat #24B27B;
    background-size:auto 100%;
  }
</style>
