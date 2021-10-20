<template>
  <div class="banner">
    <sp-swipe
      class="my-swipe"
      :autoplay="5000"
      :show-indicators="bannerList.length > 1"
      indicator-color="white"
    >
      <sp-swipe-item v-for="(item, index) in bannerList" :key="index">
        <div class="img-box" @click="jump(item)">
          <img
            :src="`${
              item && item.materialUrl
            }?x-oss-process=image/resize,m_fill,w_750,h_326,limit_0`"
            alt=""
          />
        </div>
      </sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
import { plannerApi, newSpreadApi } from '@/api/spread'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  props: {},
  data() {
    return {
      bannerList: [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios
        .get(newSpreadApi.list, {
          params: {
            locationCodes: 'jygcMmlc',
            navCodes: '',
            code: 'jy-sb',
          },
        })
        .then((res) => {
          console.log(res)
          if (res.code === 200) {
            res.data.adList.forEach((item) => {
              if (item.locationCode === 'jygcMmlc') {
                this.bannerList = this.getData(item.sortMaterialList)
                console.log(this.bannerList)
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getData(item) {
      const arr = []
      item.forEach((ele) => {
        arr.push(ele.materialList[0])
      })
      return arr
    },
    jump() {},
  },
}
</script>
<style lang="less" scoped>
.banner {
  width: 100vw;
  height: 326px;
  .my-swipe {
    width: 100%;
    height: 100%;
    .img-box {
      width: 100%;
      height: 100%;
      font-size: 0;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
