<template>
  <div>
    <div class="my-component">
      <ServiceIntroduced
        :service-list="currentIndustryList"
        service-title="热门行业推荐"
      >
        <template v-slot:dropDown>
          <Dropdown
            v-model="industry"
            v-md-map
            v-md:webClick
            data-type="售前"
            data-name="互联网资质业务介绍_下拉表单"
            class="drop-margin"
            :options="industryList"
            @select="onSelect"
          />
        </template>
      </ServiceIntroduced>
    </div>
  </div>
</template>

<script>
import ServiceIntroduced from '~/components/spread/common/ServiceIntroduced'
import Dropdown from '@/components/spread/internetQualification/Dropdown'

export default {
  name: 'HotIndustryRecommend',
  components: {
    ServiceIntroduced,
    Dropdown,
  },
  data() {
    return {
      // @--行业下拉菜单
      industryList: [
        { index: 0, name: 'ICP许可证', color: '#5a79e8' },
        { index: 1, name: 'EDI许可证', color: '#222222' },
        { index: 2, name: 'IDC许可证', color: '#222222' },
        { index: 3, name: 'SP许可证', color: '#222222' },
        { index: 4, name: 'ISP许可证', color: '#222222' },
        { index: 5, name: '网络文化经营许可证', color: '#222222' },
      ], // 行业下拉菜单列表
      industry: null,
      // @--行业服务列表
      currentIndustryList: [], // 当前根据下拉菜单项，要展示的行业服务列表
    }
  },
  created() {
    this.currentIndustryList = [this.$parent.hotIndustryRecommendList[0]]
    this.industry = this.industryList[0]
  },
  methods: {
    // 选中下拉菜单中某项
    onSelect({ index }) {
      this.currentIndustryList = [this.$parent.hotIndustryRecommendList[index]]
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  ::v-deep .serviceList-content-head-title > span {
    color: #ffffff !important;
  }
  ::v-deep .serviceList-content-head > span {
    color: #cccccc !important;
  }
  ::v-deep .serviceList {
    margin-top: 0;
  }
  .drop-margin {
    margin: 30px 0 16px 0;
  }
}
</style>
