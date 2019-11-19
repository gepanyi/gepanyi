<template>
  <div class="home">
    <!-- 头部 -->
    <div class="shop-header" :style="{backgroundImage:'url('+shopseller.avatar+')'}">
      
      <!-- 左侧 -->
      <div class="shop-left-box">
        <img :src="shopseller.avatar" alt />
        <div class="intro">
          <p>{{shopseller.name}}</p>
          <p>{{shopseller.description}}/{{shopseller.deliveryTime}}分钟送达</p>
          <p class="sale">{{supportStr}}</p>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="shop-right-box">
        <div>5个</div>
      </div>
    </div>
    <!-- 公告 -->
    <!-- <div class="notice">公告：{{shopseller.bulletin}}</div> -->
    <!-- 导航 -->
    <div class="shop-nav">
      <label :class="{active:currentPath=='/'}" @click="changeIndex('/')">商品</label>
      <label :class="{active:currentPath=='/evaluate'}" @click="changeIndex('/evaluate')">评价</label>
      <label :class="{active:currentPath=='/merchant'}" @click="changeIndex('/merchant')">商家</label>
    </div>

    <!-- 路由出口 -->
    <router-view></router-view>

    <!-- 购物车 -->
    <transition name="slide-fade">
      <div class="shop-cart-bar" v-show="show">
        <ShopCard />
      </div>
    </transition>
    <div class="shop-cart">
      <div class="left-box">
        <div v-show="show" class="icon">{{changeAmount}}</div>
        <img :src="changeshopIcon" alt @click="changeshopBar" />
        <p style="font-size:20px;color:white">&yen;{{changeTotal}}</p>
      </div>
      <div class="right-box">
        <div  v-show="changeTotal<shopseller.minPrice">{{shopseller.minPrice}}元起送</div>
        <div v-show="changeTotal>=shopseller.minPrice" class="light">去结算</div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopCard from "@/views/ShopCard.vue";
import { getSeller } from "@/api/apis.js";
export default {
  components: {
    ShopCard
  },
  data() {
    return {
      shopseller: {},
      currentPath: "/",
      show: false
      // img: require("../assets/imgs/shop-cart.png")
    };
  },
  methods: {
    changeIndex(path) {
      this.currentPath = path;
      this.$router.push(path);
    },

    changeshopBar() {
      this.show = !this.show;
    }
  },
  async created() {
    this.currentPath = location.hash.replace("#", "");
    let res = await getSeller();
    // console.log(res.data.data);
    this.shopseller = res.data.data;
  },
  computed: {
    supportStr() {
      if (!this.shopseller.supports) return "";
      let str = ``;
      for (let key of this.shopseller.supports) {
        str += key.description + " ";
      }
      return str;
    },
    changeshopIcon() {
      if (this.$store.getters.getShopCarList.length > 0) {
        this.show = true;
        return require("../assets/imgs/shop-cart-light.png");
      } else {
        this.show = false;
        return require("../assets/imgs/shop-cart.png");
      }
    },
    changeTotal() {
      let total = 0;
      for (let obj of this.$store.getters.getShopCarList) {
        total += obj.num * obj.price;
      }
      return total;
    },
    changeAmount() {
      let amount = 0;
      for (let obj of this.$store.getters.getShopCarList) {
        amount += obj.num;
      }
      return amount;
    }
  }
};
</script>

<style lang="less">
.home {
  // 头部
  height: 100%;
  display: flex;
  flex-direction: column;

  .shop-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    // background: #352a24;
    color: #333333;
    .shop-left-box {
      display: flex;
      img {
        width: 80px;
        height: 80px;
      }
      .intro {
        padding-left: 10px;
        line-height: 26px;
        .sale {
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  // 公告
  .notice {
    padding: 10px;
    width: 380px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  // 导航
  .shop-nav {
    line-height: 30px;
    display: flex;
    justify-content: space-around;
  }

  // 购物车
  .shop-cart {
    width: 100%;
    height: 60px;
    background: #141c27;
    position: fixed;
    bottom: 0;
    display: flex;
    .left-box {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        color: white;
        text-align: center;
        background: red;
        position: fixed;
        bottom: 40px;
        left: 80px;
      }
      // position: relative;

      // .circle{
      //   width: 10px;
      //   height: 10px;
      //   // color: red;
      //   background: red;
      //   position: absolute;
      //   top: 10px;
      //   left: 61px;
      // }
      img {
        width: 40px;
        height: 40px;
      }
    }
    .right-box {
      flex: 0 0 120px;
      background: #2b343b;
      color: #6b7276;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .light {
        color: #333333;
        background: #ffc133;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 60px;
      }
    }
  }
  .shop-cart-bar {
    width: 100%;
    background: white;
    // height: 200px;
    position: fixed;
    bottom: 60px;
  }

  // 购物车
  // .shop-card{
  //   height: 60px;
  //   background: red;
  //   // display: flex;
  //   position: fixed;
  //   bottom: 0;
  // .left-box {
  //   font-size: 16px;
  //   flex: 1;
  //   display: flex;
  //   // justify-content: space-around;
  //   align-items: center;
  //   .icon {
  //     font-size: 30px;
  //     width: 50px;
  //     height: 50px;
  //     border-radius: 50%;
  //     background: #2b343d;
  //     line-height: 50px;
  //   }
  // }
  // .right-box {
  //   font-size: 16px;
  //   color: #929699;
  //   flex: 0 0 120px;
  //   background: #2b343b;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
  // }
}
.active {
  color: red;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(200px);
  opacity: 0;
}
</style>