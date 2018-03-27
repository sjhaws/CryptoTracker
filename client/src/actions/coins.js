import axios from "axios"

export const COINS = "COINS"
export const ADD_COIN = "ADD_COIN"
export const REMOVE_COIN = "REMOVE_COIN"

export const addCoins = (coin) => {
  return (dispatch) => {
    axios.post("/api/coins", {coin})
    .then(({data, headers}) => dispatch({type: ADD_COIN, coins: data, headers}))
  }
}

export const getCoins = () => {
  return (dispatch) => {
    axios.get("./api/coins")
    .then(({data, headers}) => dispatch({type: COINS, coins: data, headers}))
  }
  
}

export const removeCoins = (id) => {
  return (dispatch) => {
    axios.put(`/api/coins/${id}`)
    .then(({headers}) => dispatch({tyep: REMOVE_COIN, headers, id}))
  }
  
}