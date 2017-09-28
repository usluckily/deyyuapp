<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import base from '@/assets/js/base'

  export default {
    name: 'app',
    data(){
      return {

      }
    },
    created(){
      base.rootFontSize()
    }
  }
</script>
<style src="./assets/css/base.css"></style>
<style src="./assets/css/mobiscroll.css"></style>
<style src="./assets/css/ani.css"></style>
<style src="./assets/css/loader.css"></style>
<style src="./assets/css/swiper-3.3.1.min.css"></style>
