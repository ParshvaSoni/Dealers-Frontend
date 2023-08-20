import React, { useState } from 'react';
import { Button, Input, Steps, Form, Select, InputNumber, DatePicker } from 'antd';
import styled from 'styled-components';
import { FaMicrophone } from 'react-icons/fa';
import FileUpload from '../../Components/FileUpload';
import PrintComponent from '../../Components/PrintComponent';

interface obj {
    [key: string]: string | number | null | any
}

const initalData: obj = {
    customername: "",
    customermobile: "",
    productname: "",
    metaltype: "",
    metalpurity: "",
    metalweight: 0,
    rate: 0,
    labour: 0,
    extra: 0,
    message: "",
    deliverdate: "",
    imageurl: "",
    huid: "",
    transaction: []
}

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

function round(n: number) {
    return n + (10 - n % 10);
}

function calc(gram: number, rate: number, labour: number, extra: number) {
    // gram = parseFloat(gram);
    // labour = parseFloat(labour);
    // rate = parseFloat(rate);
    // extra = parseFloat(extra);
    let amount = ((gram * (rate + labour)) + extra);
    return round(amount + amount * 0.03);
}

const BakiBillForm = () => {
    const [current, setCurrent] = useState(0);
    // const [fieldname, setFieldname] = useState("");
    let fieldname = "";
    const [billData, setBillData] = useState(initalData);
    const [isListening, setIsListening] = useState(false);

    let finalAmount = calc(billData['metalweight'], billData['rate'], billData['labour'], billData['extra']);

    const startListening = () => {
        setIsListening(true);
        const recognition = new window.webkitSpeechRecognition(); // Initialize SpeechRecognition API
        // recognition.lang = ['en-US','gu-IN']; // Set language to English
        recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
            const transcript = event.results[0][0].transcript;
            let temp: obj = {}
            temp[fieldname] = transcript;
            setBillData({ ...billData, ...temp });
        };
        recognition.onend = () => {
            setIsListening(false);
        };
        recognition.start();
    };

    let content = <></>;
    switch (current) {
        case 0:
            // setFieldname("customername");
            fieldname = "customername"
            content = (<div className='content'>
                <h2>Q) Enter Customer Name :</h2>
                <Form.Item
                    label="Customen Name"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Customer Name Is Required!',
                        },
                    ]}
                >
                    <Input width={"100%"} suffix={<FaMicrophone onClick={startListening} />} value={billData[fieldname]} onChange={(e) => { setBillData({ ...billData, customername: e.target.value }) }} />
                </Form.Item>
            </div>);
            break;
        case 1:
            fieldname = "customermobile";
            content = (<div className='content'>
                <h2>Q) Enter Customer Mobile Number :</h2>
                <Form.Item
                    label="Customen Mobile"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Customer Mobile Is Required!',
                        },
                    ]}
                >
                    <Input width={"100%"} suffix={<FaMicrophone onClick={startListening} />} value={billData[fieldname]} onChange={(e) => { setBillData({ ...billData, customermobile: e.target.value }) }} />
                </Form.Item>
            </div>);
            break;
        case 2:
            fieldname = "productname";
            content = (<div className='content'>
                <h2>Q) Enter Product Name :</h2>
                <Form.Item
                    label="Product Name"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Product Name Is Required!',
                        },
                    ]}
                >
                    <Input width={"100%"} suffix={<FaMicrophone onClick={startListening} />} value={billData[fieldname]} onChange={(e) => { setBillData({ ...billData, productname: e.target.value }) }} />
                </Form.Item>
            </div>);
            break;
        case 3:
            fieldname = "metaltype&metalpurity";
            content = (<div>
                <h2>Q) Select Metal Type :</h2>
                <Form.Item
                    label="Metal Type"
                    required
                    rules={[{
                        required: true,
                        message: "Metal Type Is Required!"
                    }]}
                >
                    <Select
                        showSearch
                        placeholder="Select Metal Type"
                        onChange={(value) => { value !== 'gold' ? (setBillData({ ...billData, metaltype: value, metalpurity: '100%' })) : (setBillData({ ...billData, metaltype: value, metalpurity: null })) }}
                        onSearch={(value) => { console.log(value); }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        value={billData.metaltype}
                        options={[
                            {
                                value: 'gold',
                                label: 'Gold',
                            },
                            {
                                value: 'silver',
                                label: 'Silver',
                            },
                            {
                                value: 'immitation',
                                label: 'Immitation',
                            },
                        ]}
                    />
                </Form.Item>
                {billData.metaltype === 'gold' ? (
                    <>
                        <h2>Q) Select Metal Purity :</h2>
                        <Form.Item
                            label="Metal Purity"
                            required
                            rules={[{
                                required: true,
                                message: "Metal Purity Is Required!"
                            }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Metal Purity"
                                onChange={(value) => { setBillData({ ...billData, metalpurity: value }) }}
                                onSearch={(value) => { console.log(value); }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                value={billData.metalpurity}
                                options={[
                                    {
                                        value: '24KT',
                                        label: '24KT',
                                    },
                                    {
                                        value: '22KT',
                                        label: '22KT',
                                    },
                                    {
                                        value: '18KT',
                                        label: '18KT',
                                    },

                                ]}
                            />
                        </Form.Item>
                    </>
                ) : (<></>)}

            </div>);
            break;
        case 4:
            fieldname = 'metalweight';
            content = (
                <div className="content">
                    <h2>Enter Metal Weight :</h2>
                    <Form.Item
                        label="Product Weight"
                        required
                        rules={[{
                            required: true,
                            message: "Product Weight Is Required!"
                        }]}
                    >
                        <InputNumber min={0} addonAfter="gram" value={billData[fieldname]} onChange={(e) => { setBillData({ ...billData, metalweight: e }) }} />
                    </Form.Item>
                </div>
            );
            break;
        case 5:
            fieldname = "rates&charges";
            content = (<div className='content'>
                <h2>Q) Enter Rate, Labour And Extra Charges Name :</h2>
                <div className='hflex' >

                    <Form.Item
                        label="Rate"
                        required
                        rules={[{
                            required: true,
                            message: "Rate Is Required!"
                        }]}
                    >
                        <InputNumber min={0} addonAfter={"₹"} value={billData["rate"]} onChange={(e) => setBillData({ ...billData, rate: e })} />
                    </Form.Item>
                    <Form.Item
                        label="Labour Charge"
                        required
                        rules={[{
                            required: true,
                            message: "Labour Charge Is Required!"
                        }]}
                    >
                        <InputNumber min={0} addonAfter={"₹"} value={billData["labour"]} onChange={(e) => setBillData({ ...billData, labour: e })} />
                    </Form.Item>
                </div>
                <div className='hflex'>

                    <Form.Item
                        label="Extra Charge"
                    >
                        <InputNumber min={0} addonAfter={"₹"} value={billData["extra"]} onChange={(e) => setBillData({ ...billData, extra: e })} />
                    </Form.Item>
                    <Form.Item
                        label="Final Amount"
                    >
                        <InputNumber addonAfter={"₹"} value={finalAmount} disabled />
                    </Form.Item>
                </div>
            </div>);
            break;
        case 6:
            fieldname = "Payment Info";
            content = (<div className='content'>
                <div className="hflex">
                    <Form.Item
                        label="Delivery Date"
                        required
                        rules={[
                            {
                                required: true,
                                message: "Labour Charge Is Required!"
                            }
                        ]}
                    >
                        <DatePicker onChange={(date, dateString) => { setBillData({ ...billData, deliverdate: date?.toISOString() }) }} />
                    </Form.Item>
                    <Form.Item
                        label={'Total Amount'}
                    >
                        <InputNumber disabled addonBefore="₹" value={finalAmount} />
                    </Form.Item>
                </div>
                <div className="hflex">
                    <Form.Item
                        label="Advance Payment"
                    >
                        <InputNumber defaultValue={0} addonAfter="₹" onChange={(value) => {
                            let tempAmount = [];
                            tempAmount.push({ transactiondate: new Date().toISOString(), amount: value });
                            console.log(tempAmount);
                            setBillData({ ...billData, transaction: tempAmount })
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="Remaining Amount"
                    >
                        <InputNumber status="error" addonAfter="₹" disabled value={finalAmount - (billData['transaction'][0]?.amount) || 0} />
                    </Form.Item>
                </div>
            </div>)
            break;
        case 7:
            fieldname = "message"
            content = (
                <div className="content">
                    <Form.Item
                        label="Final Message"
                    >
                        <Input value={billData['message']} suffix={<FaMicrophone onClick={startListening} />} onChange={(e) => { setBillData({ ...billData, message: e.target.value }) }} />
                    </Form.Item>
                    <PrintComponent>
                        <div>
                            <Button type={'primary'}>Testing</Button>
                            <h1 style={{ color: "red" }}>Test 1</h1>
                            <h1 style={{ color: "blue" }}>Test 1</h1>
                            <img src="https://www.section.io/engineering-education/authors/sarthak-duggal/avatar_hue80417caa19405e90def6356d60f65e7_30777_180x0_resize_q75_box.jpg" alt="Image to Print" width={"200px"} height={"300px"} loading={'lazy'} />
                        </div>
                    </PrintComponent>
                </div>
            );
    }

    return (
        <BakiBillFormContainer>
            <div className="stepsclass hflex">
                <Steps size='small' onChange={(step) => { setCurrent(step) }} responsive={true} direction='horizontal' labelPlacement='vertical' current={current} >
                    <Steps.Step key={1} title="Customer Name" status={billData['customername'] !== "" ? 'finish' : 'process'} />
                    <Steps.Step key={2} title="Customer Mobile" status={billData['customermobile'] !== "" ? 'finish' : 'process'} />
                    <Steps.Step key={3} title="Product Name" status={billData['productname'] !== "" ? 'finish' : 'process'} />
                    <Steps.Step key={4} title="Metal Type & Purity" status={(billData['metaltype'] === "" || billData["metalpurity"] === "") ? 'process' : 'finish'} />
                    <Steps.Step key={5} title="Product Weight" status={billData['metalweight'] > 0 ? 'finish' : 'process'} />
                    <Steps.Step key={6} title="Rate & Charges" status={(billData['rate'] > 0 && billData['extra'] >= 0 && billData['labour'] > 0) ? 'finish' : 'process'} />
                    <Steps.Step key={7} title="Extra Info" />
                    <Steps.Step key={8} title="Optional Info" />
                </Steps>
            </div>
            <div className="contentContainer hflex">
                {content}
                {current < 6 ? (<Button type={'primary'} onClick={() => { setCurrent(current + 1)}}>Next</Button>) : (<Button type={'primary'}>Submit</Button>)}
            </div>
            {/* {JSON.stringify(billData)} */}
        </BakiBillFormContainer>
    );
}

export default BakiBillForm;

const BakiBillFormContainer = styled.div`
    width:100%;
    // border:1px solid red;
    display:flex;
    flex-direction:column;

    .hflex{
        display:flex;
        flex-direction:row;
        width:100%;
        justify-content:space-evenly;
    }

    .vflex{
        display:flex;
        flex-direction:column;
        width:100%;
    }
    
    .contentContainer{
        height:60vh;
        display: flex;
        justify-content: center;
        align-items: center;
        width:100%;
        // border:1px solid pink;
        // margin: 0 auto;
        justify-content:space-evenly;
    }

    .content{
        // border:1px solid blue;
        width:70%;
    }

    @media ${(prop) => prop.theme.device.mobile} { 
        flex-direction:row;
        .stepsclass{
            width:30%;
        }
        .vflex{
            flex-direction:row;
        }
        .hflex{
            flex-direction:columnl
        }
    }
    @media ${(prop) => prop.theme.device.tablet} {
        flex-direction:row;
        .stepsclass{
            width:30%;
        }
        .hflex{
            flex-direction:column;
        }
        .vflex{
            flex-direction:row;
        }
    }
    @media ${(prop) => prop.theme.device.laptop} { 
        
    }
`;