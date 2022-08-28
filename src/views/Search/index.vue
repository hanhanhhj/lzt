<template>
  <div>
    <van-search
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
      @input="inputFn"
    />

    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          v-for="(data, ind) in searchList"
          :key="ind"
          @click="Fn(data)"
        >
          {{ data }}
        </span>
      </div>
    </div>

    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >

      <SongItem v-for="obj in resultList" 
      :key="obj.id"
      :name="obj.name"
      :author="obj.ar[0].name"
      :id="obj.id"
      />
        <!-- <van-cell class="search"
          v-for="obj in resultList"
          :key="obj.id"
          center
          :title="obj.name"
          :label="obj.ar[0].name + '-' + obj.name"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.65rem" />
          </template>
        </van-cell> -->
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchResultListAPI } from "@/api";
import SongItem from "@/components/SongItem.vue";
export default {
  components:{
    SongItem
  },
  data() {
    return {
      value: "",
      searchList: [
        "婷婷",
        "婷婷是大傻子吗",
        "卤猪蹄",
        "霓虹甜心",
        "再见杰克",
        "火车日记",
        "外婆桥",
        "马頔",
        "你过得还好吗",
        "你要跳舞吗",
        "我是一只鱼",
        "夏日漱石",
      ],
      resultList: [],
      loading: false,
      finished: false,
      page:1
    };
  },
  methods: {
    async getListFn() {
      return await searchResultListAPI({
        keywords: this.value,
        limit: 20,
        offset:(this.page-1)*20
      });
    },
    async Fn(val) {
      this.page = 1;
      this.finished = false;
      this.value = val;
      const res = await this.getListFn();
      this.resultList = res.data.result.songs;
       this.loading = false;
      // console.log(this.resultList);
    },
    async inputFn() {
       if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          this.page = 1;

      this.finished = false
      if (this.value.length === 0) {
        this.resultList = [];
        return;
      }
      const res = await this.getListFn();
      if(res.data.result.songs===undefined){
        this.resultList=[];
        return
      }
      this.resultList = res.data.result.songs;
      this.loading = false;

        },900)
      
    },
    async onLoad(){
      this.page++;
      const res = await this.getListFn();
      if(res.data.result.songs===undefined){
        this.resultList=[];
        return
      }
      this.resultList = [...this.resultList, ...res.data.result.songs];
      this.loading=false
    },
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.search{
  border-bottom: 1px solid lightgray;
}
</style>