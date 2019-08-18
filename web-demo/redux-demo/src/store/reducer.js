import {CHANGE_INPUT,ADD_ITEM,DELETE_ITEM,GET_DATA} from './actionTypes.js'
const defaultState={
    inputValue:'',
    listValue:[
        /* '8:00 起床',
        '8:20 早餐',
        '8:30 学习' */
    ]
}
export default (state=defaultState,action)=>{
    //reducer里只能接受state，不能改变state
    if(action.type===CHANGE_INPUT){
        //深拷贝
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue=action.value
        return newState
    }else if(action.type===ADD_ITEM){
        let newState = JSON.parse(JSON.stringify(state))
        newState.listValue.push(newState.inputValue) 
        newState.inputValue=''
        return newState
    }else if(action.type===DELETE_ITEM){
        let newState = JSON.parse(JSON.stringify(state))
        newState.listValue.splice(action.index,1)
        return newState
    }else if(action.type===GET_DATA){
        let newState = JSON.parse(JSON.stringify(state))
        newState.listValue=action.data.data.list
        return newState
    }
        
    return state
}