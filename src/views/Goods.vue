<template>
  <div class="goods">
    <!-- 左侧内容 -->
    <div id="goods-left" class="goods-left">
      <ul class="content">
        <div
          :class="{select:selectIndex==index}"
          :key="index"
          v-for="(item,index) in goodsItem"
          @click="changeIndex(index)"
        >
          <label>{{item.name}}</label>
        </div>
      </ul>
    </div>

    <!-- 右侧内容 -->
    <div id="goods-right" class="goods-right">
      <ul class="content">
        <div class="mainContent" :id="index" v-for="(item,index) in goodsItem" :key="index.name">
          <h3>{{item.name}}</h3>
          <div class="product" v-for="(v,i) in item.foods" :key="i">
            <img :src="v.image" alt />
            <div class="info">
              <p>{{v.name}}</p>
              <p>{{v.description}}</p>
              <p>月售{{v.sellCount}}好评率{{v.rating}}%</p>
              <p>
                <span style="color:orange">&yen;{{v.price}}</span>
              </p>
              <Icon
                v-show="v.num>0"
                type="md-remove-circle"
                @click="changeNum(-1,v.name)"
                class="removeicon"
              />
              <span v-show="v.num>0">{{v.num}}</span>
              <Icon type="md-add-circle" @click="changeNum(1,v.name)" class="addicon" />
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      selectIndex: 0
    };
  },
  created() {
    this.$store.dispatch("getGoodsItem");
  },
  mounted() {
    let goodsleft = new BScroll("#goods-left", {
      click: true
    });
    this.goodsright = new BScroll("#goods-right", {
      click: true,
      probeType: 3
    });
    this.goodsright.on("scroll", ({ y }) => {
      // console.log(Math.abs(y));
      let _y = Math.abs(y);

      for (let obj of this.getDivHeight) {
        if (_y >= obj.min && _y < obj.max) {
          this.selectIndex = obj.index;
        }
      }
    });
  },
  computed: {
    getDivHeight() {
      // 定义一个空数组
      let arr = [];
      let total = 0;
      this.goodsItem.forEach((item, i) => {
        // 获取div的高度
        let divheight = document.getElementById(i).offsetHeight;
        arr.push({ min: total, max: total + divheight, index: i });
        total += divheight;
        // console.log(total);
      });

      return arr;
    },
    goodsItem() {
      return this.$store.state.goodsItem;
    }
  },
  methods: {
    changeIndex(i) {
      this.selectIndex = i;
      this.goodsright.scrollToElement(document.getElementById(i), 500);
    },
    changeNum(num, name) {
      this.$store.commit({
        type: "changeNum",
        num,
        name
      });
    }
  }
};
</script>

<style lang="less">
.select {
  background: white;
}
.goods {
  display: flex;
  flex: 1;
  height: 100%;
  .goods-left {
    height: 100%;
    flex: 0 0 116px;
    // line-height: 50px;
    overflow: auto;
    background: #eaeaea;
    label {
      height: 54px;
      display: block;
      line-height: 54px;
      text-align: center;
      padding: 2px;
      // border-bottom: 2px solid gray;
    }
  }
  .goods-right {
    flex: 1;
    overflow: auto;
    height: 100%;
    .mainContent {
      h3 {
        line-height: 30px;
        background: #f5f5f5;
      }
      .product {
        display: flex;
        padding-left: 10px;
        margin-top: 10px;
        img {
          width: 80px;
          height: 80px;
        }
        .info {
          margin-left: 10px;
          .removeicon,
          .addicon {
            font-size: 20px;
            color: #00a0dc;
          }
        }
      }
    }
  }

  // .goods-right {
  //   flex: 1;
  //   height: 300px;
  //   overflow: auto;
  //   h3 {
  //     background: #ccc;
  //     line-height: 30px;
  //   }
  //   .intro {
  //     display: flex;
  //     margin-top: 10px;
  //     img {
  //       width: 80px;
  //       height: 80px;
  //     }

  //   }
  // }
}
</style>