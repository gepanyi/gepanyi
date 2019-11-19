<template>
  <div class="merchant">
    <!-- 标题 -->
    <div class="title">
      <div class="left-box">
        <p style="font-size:24px">{{merchant.name}}</p>
        <img src="../assets/imgs/star24_on@3x.png" alt />
        <img src="../assets/imgs/star24_on@3x.png" alt />
        <img src="../assets/imgs/star24_on@3x.png" alt />
        <img src="../assets/imgs/star24_on@3x.png" alt />
        <img src="../assets/imgs/star36_half@2x.png" alt />
        <span>(661)</span>
        <span style="margin-left:10px;">月售690单</span>
      </div>
    </div>
    <!-- 价格 -->
    <div class="price">
      <div class="left">
        <p>起送价</p>
        <p style="text-align: center">{{merchant.minPrice}}元</p>
      </div>
      <div class="center">
        <p>商家配送</p>
        <p style="text-align: center">{{merchant.deliveryPrice}}元</p>
      </div>
      <div class="right">
        <p>平均配送时间</p>
        <p style="text-align: center">{{merchant.deliveryTime}}元</p>
      </div>
    </div>
    <!-- 公告 -->
    <div class="affiche">
      <h1>公告与活动</h1>
      <p class="merb">{{merchant.bulletin}}</p>
      <div v-for="(item,index) in merchant.supports" :key="index">
        <p>{{item.description}}</p>
      </div>
    </div>

    <!-- 商家实景 -->
    <div class="box">
      <h3>商家实景</h3>
      <div class="live" v-for="(item,index) in merchant.pics" :key="index">
        <img :src="item" alt />
      </div>
    </div>

    <!-- 商家 -->
    <div class="intro">
      <div>商家信息</div>
      <div class="info" v-for="(v,i) in merchant.infos" :key="i">
        <p>{{v}}</p>
      </div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
// import { getSeller } from "@/api/apis";
export default {
  data() {
    return {
      // merchant: []
    };
  },
 created() {
    // let res = await getSeller();
    // this.merchant = res.data.data;
    // console.log(res.data.data);
    this.$store.dispatch("getSellerItem")
  },
  computed:{
    merchant(){
      return this.$store.state.merchant
    }
  }
};
</script>

<style lang="less" >
.merchant {
  flex: 1;
  overflow: scroll;
  .title {
    padding: 10px;
    line-height: 30px;
    border-top: 2px solid #eaeaea;
    .left-box {
      border-bottom: 1px solid #eaeaea;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  .price {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #eaeaea;
    line-height: 30px;
    align-items: center;
  }
  .affiche {
    padding: 10px;
    border-bottom: 2px solid #eaeaea;
    .merb {
      // border-bottom: 1px solid #eaeaea;
      line-height: 30px;
      padding-left: 10px;
      color: #f03539;
      border: none;
    }
    p {
      padding-left: 10px;
      line-height: 40px;
      border-top: 1px solid #eaeaea;
      font-size: 16px;
    }
  }
  .info {
    padding: 10px;
  }
  .intro {
    padding: 10px;
    .info {
      border: none;
    }
    p {
      font-size: 16px;
      line-height: 40px;
      border-top: 1px solid #eaeaea;
    }
  }

  .box {
    //
    padding: 10px;
    .live {
      // display: flex;
      // flex-direction: column;
      img {
       width: 100%;
        height: 100%;
      }
    }
  }
  .footer {
    height: 80px;
  }
}
</style>