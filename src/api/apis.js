import axios from "axios"

const IP = "http://127.0.0.1:3000"


// 获取商家信息
export var getSeller = () => {
    return axios.get(IP + "/api/seller")
}

// 获取商品列表
export var getGoods = () => {
    return axios.get(IP + "/api/goods")
}

// 评价
export var getRatings = () => {
    return axios.get(IP + "/api/ratings")
}

