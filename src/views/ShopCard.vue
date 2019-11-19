<template>
  <div class="shop-card">
    <!-- <h1>购物车</h1> -->
    <Button class="btn" @click="btn">清空购物车</Button>
    <div class="changeList" v-for="(item,index) in goodsItem" :key="index">
      <label class="name">{{item.name}}</label>
      <div class="changeTotal">
        <Icon type="md-remove-circle" class="removeicon" @click="changeNumber(-1,item.name)" />
        {{item.num}}
        <Icon type="md-add-circle" class="addicon" @click="changeNumber(1,item.name)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    goodsItem() {
      return this.$store.getters.getShopCarList;
    }
  },
  methods: {
    changeNumber(num, name) {
      this.$store.commit({
        type: "changeNum",
        num,
        name
      });
    },
    btn(){

      this.$store.commit('getBtn');
      
    }
  }
};
</script>

<style lang="less" >
.changeList {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .btn{
    background: red;
    line-height: 50px;
  }
 
  .name {
    flex: 1;
  }
  .changeTotal {
    flex: 0 0 100px;
    .addicon,
    .removeicon {
      font-size: 20px;
    }
  }
}
</style>

