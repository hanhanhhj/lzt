<template>
  <van-cell center 
          :title="name" :label="author + ' - ' + name">
      <template #right-icon>
        <van-icon name="play-circle-o" size="0.65rem" @click="playFn"/>
      </template>
    </van-cell>
</template>

<script>
export default {
  props:['name','author','id'],
  methods: {
  playFn(){
    this.$router.push({
      path:'/play',
      query:{
        id:this.id
      }
    })
  }
},
}

</script>

<style scoped>
  .van-cell {
  border-bottom: 1px solid lightgray;
}
</style>