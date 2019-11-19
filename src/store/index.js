import Vue from 'vue'
import Vuex from 'vuex'
import { getGoods, getSeller } from "@/api/apis";


Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        // 菜单列表
        goodsItem: [],

        // 商家
        merchant: []
    },
    mutations: {
        // 菜单列表数据
        getGoodsItem(state, obj) {
            state.goodsItem = obj.data;
        },

        getSellerItem(state, obj) {
            state.merchant = obj.data

        },
        // 加 减号
        changeNum(state, obj) {
            // 遍历
            console.log(state.goodsItem);
            for (let data of state.goodsItem) {
                for (let foods of data.foods) {
                    if (foods.name === obj.name) {
                        foods.num += obj.num
                        return
                    }
                }
            }
        },

        getBtn(state) {
            for (let data of state.goodsItem) {
                for (let foods of data.foods) {
                    foods.num = 0
                }
                return
            }

        }
    },
    actions: {
        // 菜单列表
        async getGoodsItem({ commit }) {
            let res = await getGoods()
            commit({
                type: 'getGoodsItem',
                data: res.data.data
            })
        },

        // 商家
        async getSellerItem({ commit }) {
            let res = await getSeller()
            commit({
                type: 'getSellerItem',
                data: res.data.data
            })
        },


    },
    getters: {
        getShopCarList(state) {
            let arr = [];
            // 遍历数组
            for (let data of state.goodsItem) {
                for (let foods of data.foods) {
                    if (foods.num > 0) {
                        arr.push(foods)
                    }
                }
            }
            return arr;
        },

    }

})


export default store;