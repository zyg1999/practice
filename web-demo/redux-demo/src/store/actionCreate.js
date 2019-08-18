import {CHANGE_INPUT,ADD_ITEM,DELETE_ITEM, GET_DATA} from './actionTypes.js'
import axios from 'axios'
export const changeInputAction=(value)=>({
    type:CHANGE_INPUT,
    value
})
export const addItem=()=>({
    type:ADD_ITEM
})
export const deleteItem=(index)=>({
    type:DELETE_ITEM,
    index
})
export const getData = (data)=>({
    type:GET_DATA,
    data
})
export const getToDoList = ()=>{
    return (dispatch)=>{
        axios.get('https://easy-mock.com/mock/5d5669913dd0926b09c6be28/example/getData')
        .then((res)=>{
            const data= res.data
            const action = getData(data)
            dispatch(action)
            /* const action = getData(data)
            store.dispatch(action) */
        })
    }
}