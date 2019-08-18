import React from 'react'
import {Input,Button,List} from 'antd'
import 'antd/dist/antd.css'
export default function  TodoListUI(props){
    return (
        <div style={{width:'350px',margin:'10px'}}>
            <div style={{padding:'10px'}}>
                <Input 
                    placeholder={'添加日程'} 
                    value={props.inputValue}
                    style={{width:'250px',marginRight:'10px'}}
                    onChange={props.changeInputValue}
                />
                <Button 
                    type="primary"
                    onClick={props.handleClick}
                >增加</Button>
            </div>
            <div>
                <List 
                    bordered 
                    dataSource={props.listValue} 
                    renderItem={(item,index)=>(
                        <List.Item 
                            onClick={()=>
                                props.deleteItem(index)
                            }
                        >
                        {item}
                        </List.Item>)
                    }
                />
            </div>
        </div>
    )
}

    


