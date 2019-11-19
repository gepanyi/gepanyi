<template>
  <div class="evaluate">
    <!-- 上面内容 -->
    <div class="evaluate-box">
      <div class="left-box">
        <div>
          <h3 style="font-size:30px;color:orange">{{dataBase.score}}</h3>
          <p style="color:black">综合评分</p>
          <p>高于周边商家{{dataBase.rankRate}}分</p>
        </div>
      </div>
      <div class="right-box">
        <p>
          服务态度:
          <img src="../assets/imgs/star24_on@3x.png" alt />
          <img src="../assets/imgs/star24_on@3x.png" alt />
          <img src="../assets/imgs/star24_on@3x.png" alt />
          <img src="../assets/imgs/star24_on@3x.png" alt />
          <img src="../assets/imgs/star36_half@2x.png" alt="">
          <span style="color:orange">{{dataBase.foodScore}}</span>
        </p>
        <p>
          服务态度:
          <img src="../assets/imgs/star24_on@3x.png" alt />
          <img src="../assets/imgs/star24_on@3x.png" alt />
          <img src="../assets/imgs/star24_on@3x.png" alt />
          <img src="../assets/imgs/star24_on@3x.png" alt />
            <img src="../assets/imgs/star36_half@2x.png" alt="">
          <span style="color:orange">{{dataBase.serviceScore}}</span>
        </p>
        <p>送达时间：{{dataBase.deliveryTime}}分钟</p>
      </div>
    </div>
    <!-- 下面内容 -->
    <div class="evaluate-bottom">
      <div class="btn">
        <p style="background:#00A0DC;color:white">全部57</p>
        <p style="background:#CCECF7">满意47</p>
        <p style="background:#EAEBED">不满意10</p>
      </div>
      <p class="appraise">只看有内容的评价</p>
      <div class="box" v-for="(item,index) in datalist" :key="index">
        <div class="info">
          <img :src="item.avatar" alt />
          <div class="main">
            <p>{{item.username}}</p>
            <p>{{item.deliveryTime}}分钟送达</p>
            <p>{{item.text}}</p>
            <p>{{item.recommend|recommend}}</p>
          </div>
        </div>
        <div>{{item.rateTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings, getSeller} from "@/api/apis";

import moment from "moment";
export default {
  data() {
    return {
      dataBase: {},
      datalist: []
    };
  },
  async created() {
    let res = await getRatings();
    this.datalist = res.data.data;
    // console.log(this.datalist);
    this.datalist.forEach(v => {
      v.rateTime = moment(v.rateTime).format("YYYY/MM/DD hh:mm:ss");
    });

    let response = await getSeller();
    // console.log(response);
    this.dataBase = response.data.data;
  },
  filters: {
    recommend(f) {
      return f.join(" " + "//" + " ");
    }
  }
};
</script>

<style lang="less">
.evaluate {
  flex: 1;
  height: 100%;
  overflow: auto;
  .evaluate-box {
    display: flex;
    padding: 5px;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    .left-box {
      border-right: 1px solid gray;
      flex: 0 0 150px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
    .right-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 16px;
      padding-left: 10px;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  .evaluate-bottom {
    margin-top: 10px;
    margin-bottom: 10px;
    .btn {
      display: flex;
      justify-content: space-around;
      // border-bottom: 1px solid red;
      p {
        line-height: 50px;
        text-align: center;
        width: 70px;
        height: 50px;
      }
    }
    .appraise {
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      margin-top: 10px;
    }
    .box {
      display: flex;
      padding: 10px;
      justify-content: space-between;
      .info {
        // padding-left: 10px;
        display: flex;
        img {
          // display: block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          // background: red;
        }
        .main {
          padding-left: 10px;
        }
      }
    }
  }
}
</style>