import React,{Component} from 'react'
import TodoListUI from './TodoListUI'
import store from './store/index'
import {changeInputAction,addItem,deleteItem,getToDoList } from './store/actionCreate.js'


class TodoList extends Component{
    constructor(props){
        super(props)
        console.log(store.getState())
        this.state=store.getState()
        this.changeInputValue=this.changeInputValue.bind(this)
        this.storeChange=this.storeChange.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.deleteItem=this.deleteItem.bind(this)
        store.subscribe(this.storeChange)//订阅模式
    }
    render(){
        return (
           <TodoListUI 
                inputValue={this.state.inputValue}
                changeInputValue={this.changeInputValue}
                handleClick={this.handleClick}
                deleteItem={this.deleteItem}
                listValue={this.state.listValue}
           />
        )
    }
    componentDidMount(){
        const action = getToDoList()
        store.dispatch(action)
    }
    changeInputValue(e){      
        const action = changeInputAction(e.target.value)
        store.dispatch(action)           
    }
    storeChange(){
        this.setState(store.getState())
    }
    handleClick(){
        const action = addItem()
        store.dispatch(action)
    }
    deleteItem(index){
        const action = deleteItem(index)
        store.dispatch(action)
    }
}
export default TodoList