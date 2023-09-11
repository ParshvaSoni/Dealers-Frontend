import React,{useEffect} from 'react'
import { Input, Select, Button, Switch, Progress, Space,Checkbox, Slider } from 'antd'
import styled from 'styled-components'
import { useCurrentTheme } from '../Context/ThemeContext'
import { OpenNotification } from '../HelperFunction'
import SpeechToTextInput from '../Components/SpeechToTextInput'
// import  PrintBillLayout  from '../Components/PrintBillLayout'
import PrintBillLayout from '../Components/PrintBillLayout'
import CameraCapture from '../Components/CameraCapture'
import CreateBakiBill from '../Pages/BakiBill/CreateBakiBill'
import BakibillUpdate from './BakiBill/BakibillUpdate'

let Data = {
        "_id": "64e4fb639b177b3c37643d50",
        "accountId": "64d7f1e9a1cc25fefbe60473",
        "customername": "pasoni",
        "productname": "gold ring",
        "customermobile": "9408331244",
        "metaltype": "gold",
        "metalweight": 5,
        "metalpurity": "22KT",
        "rate": 5,
        "labour": 500,
        "extra": 500,
        "message": "",
        "deliverdate": "2023-08-21T18:15:52.815Z",
        "transaction": [
            {
                "transactiondate": "2023-08-22T18:15:56.904Z",
                "amount": 200,
                "_id": "64e4fb639b177b3c37643d51"
            }
        ],
        "createdAt": "2023-08-22T18:16:03.035Z",
        "updatedAt": "2023-08-22T18:16:03.035Z",
        "__v": 0,
        "imageurl": "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwb2b28f69/images/hi-res/512018FKDAB00_1.jpg"
}

const Test = () => {

    return ( 
        <DivContainer>
            {/* <Space direction='vertical'> */}
                {/* <PrintBillLayout data={Data} /> */}
                {/* <CameraCapture /> */}
                <BakibillUpdate data={Data}/>
                {/* <SpeechToTextInput />
                <div style={{display:'flex'}}>
                    <span className='Wbox1' style={{padding:"20px"}}>Box 1</span>
                    <span className='Wbox2' style={{padding:"20px"}}>Box 2</span>
                    <span className='Wbox3' style={{padding:"20px"}}>Box 3</span>
                    <span className='Wbox4' style={{padding:"20px"}}>Box 4</span>
                </div>
                <div style={{display:'flex'}}>
                    <span className='Bbox1' style={{padding:"20px"}}>Box 1</span>
                    <span className='Bbox2' style={{padding:"20px"}}>Box 2</span>
                    <span className='Bbox3' style={{padding:"20px"}}>Box 3</span>
                    <span className='Bbox4' style={{padding:"20px"}}>Box 4</span>
                </div>

                <span>span</span>
                <Input placeholder='hello' />
                <Input.Password placeholder='password' />
                <Input.TextArea placeholder='Textarea' />
                <Select placeholder="Please selkecr"> 
                    <Select.Option value="Hello0">Hello0</Select.Option>
                    <Select.Option value="Hello1">Hello0</Select.Option>
                    <Select.Option value="Hello2">Hello0</Select.Option>
                    <Select.Option value="Hello3">Hello0</Select.Option>

                </Select>
                <Button>Hello</Button>
                <Switch checkedChildren="Light" unCheckedChildren="Dark" defaultChecked />
                <Progress percent={30} />
                <Progress percent={50} status="active" />
                <Progress percent={70} status="exception" />
                <Progress percent={100} />
                <Progress percent={50} showInfo={false} />
                <Checkbox >Checkbox</Checkbox>
                <Slider defaultValue={30}/> */}
            {/* </Space> */}
        </DivContainer>
    )
}

export default Test;

const DivContainer=styled.div`
    width:100%;
    border:1px solid yellow;
    .Wbox1{
        background-color:${(prop)=>{return prop.theme.color.color1}};
    }
    .Wbox2{
        background-color:${(prop)=>prop.theme.color.color2};
    }
    .Wbox3{
        background-color:${(prop)=>prop.theme.color.color3};
    }
    .Wbox4{
        background-color:${(prop)=>prop.theme.color.color4};
    }
    .Bbox1{
        background-color:${(prop)=>prop.theme.color.color1};
    }
    .Bbox2{
        background-color:${(prop)=>prop.theme.color.color2};
    }
    .Bbox3{
        background-color:${(prop)=>prop.theme.color.color3};
    }
    .Bbox4{
        background-color:${(prop)=>prop.theme.color.color4};
    }
`;