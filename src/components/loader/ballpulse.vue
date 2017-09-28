<template>

  <div class="loader-cover">
    <div class="loader-inner ball-pulse">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>

</template>
<script>
    export default({
      name: 'ballPulse',
      data(){
        return {}
      }
    })
</script>
<style>
  .loader-cover{
    position:absolute;
    z-index:100;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:#fff;
    display:flex;
    justify-content:center;
    font-size: 0.8rem;
    align-items:center;
  }
</style>
