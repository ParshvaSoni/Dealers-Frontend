import { DatePicker, Form, Input, InputNumber, Select } from 'antd';
import React, { useState } from 'react'
import styled from 'styled-components';

interface billdata {
    _id: string,
    accountId: string,
    customername: string,
    productname: string,
    customermobile: string,
    metaltype: string,
    metalweight: number | null,
    metalpurity: string,
    rate: number | null,
    labour: number | null,
    extra: number | null,
    message: string,
    huid?: string,
    imageurl: string,
    deliverdate: string,
    transaction:
    {
        transactiondate: string,
        amount: number,
        _id: string
    }[],
    createdAt: string,
    updatedAt: string,
    __v: number
}

interface props {
    data?: billdata
}
const initialValue: billdata = {
    _id: '',
    accountId: '',
    customername: '',
    productname: '',
    customermobile: '',
    metaltype: '',
    metalweight: 0,
    metalpurity: '',
    rate: 0,
    labour: 0,
    extra: 0,
    message: '',
    huid: '',
    imageurl: '',
    deliverdate: '',
    transaction: [
        {
            transactiondate: '',
            amount: 0,
            _id: ''
        }
    ],
    createdAt: '',
    updatedAt: '',
    __v: 0
}

const BakibillUpdate = ({ data }: props) => {
    const [billData, setBillData] = useState(data || initialValue);
    return (
        <BakiBillUpdate__Container>
            <fieldset>
                <legend>Customer Info</legend>
                <div className="hflex">
                    <Form.Item
                        label="Customer Name"
                    >
                        <Input placeholder='Enter Customer Name...' value={billData.customername} onChange={(e) => { setBillData({ ...billData, customername: e.target.value }) }} />
                    </Form.Item>
                    <Form.Item
                        label="Customer Mobile"
                    >
                        <Input placeholder='Enter Customer Mobile...' value={billData.customermobile} onChange={(e) => { setBillData({ ...billData, customermobile: e.target.value }) }} />
                    </Form.Item>
                </div>
            </fieldset>
            <fieldset>
                <legend>Product Info</legend>
                <div className="hflex">
                    <Form.Item
                        label="Product Name"
                    >
                        <Input placeholder='Enter Product Name...' value={billData.productname} onChange={(e) => { setBillData({ ...billData, productname: e.target.value }) }} />
                    </Form.Item>
                    <Form.Item
                        label="Metal Type"
                    >
                        <Select
                            showSearch
                            placeholder="Select Metal Type"
                            onChange={(value) => { setBillData({ ...billData, metaltype: value }) }}
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
                </div>
                <div className="hflex">
                    <Form.Item
                        label="Metal Purity"
                    >
                        <Select
                            showSearch
                            placeholder="Select Metal Purity"
                            onChange={(value) => { setBillData({ ...billData, metalpurity: value }) }}
                            onSearch={(value) => { console.log(value) }}
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
                    <Form.Item
                        label="HUID"
                    >
                        <Input placeholder='Enter huid' value={billData.huid} onChange={(e) => { setBillData({ ...billData, huid: e.target.value }) }} />
                    </Form.Item>
                    <Form.Item
                        label="Metal Weight"
                    >
                        <InputNumber placeholder='Enter Metal Weight' value={billData.metalweight} onChange={(val) => { setBillData({ ...billData, metalweight: val }) }} />
                    </Form.Item>
                </div>
            </fieldset>
            <fieldset>
                <legend>Rates & Charges</legend>
                <div className="hflex">
                    <Form.Item
                        label='Rate'
                    >
                        <InputNumber placeholder='Enter Rate' value={billData.rate} onChange={(val) => { setBillData({ ...billData, rate: val }) }} />
                    </Form.Item>
                    <Form.Item
                        label='Labour'
                    >
                        <InputNumber placeholder='Enter Labour' value={billData.labour} onChange={(val) => { setBillData({ ...billData, labour: val }) }} />
                    </Form.Item>
                    <Form.Item
                        label='Extra'
                    >
                        <InputNumber placeholder='Enter Extra Charge' value={billData.extra} onChange={(val) => { setBillData({ ...billData, extra: val }) }} />
                    </Form.Item>
                </div>
                <div className='hflex'>
                    <Form.Item
                        label="Message"
                    >
                        <Input placeholder='Enter Message' value={billData.message} onChange={(e) => { setBillData({ ...billData, message: e.target.value }) }} />
                    </Form.Item>
                    <Form.Item
                        label="Delivery Date"
                    >
                        {/* <DatePicker onChange={(date, dateString) => { setBillData({ ...billData, deliverdate: date?.toISOString() }) }} /> */}
                    </Form.Item>
                </div>
            </fieldset>
        </BakiBillUpdate__Container>
    )
}

export default BakibillUpdate;

const BakiBillUpdate__Container = styled.div`

    padding:12px;

    .hflex{
        justify-content:space-around;
        padding:12px;
        display:flex;
        width:100%;
        gap:1rem;
    }
    .ant-form-item, .ant-input-number{
        width:100% !important;
    }
    legend{
        border-bottom:1px solid white;
    }
    
    @media only screen and (max-device-width: 555px) {
        .hflex{
                flex-direction:column !important;
                gap:0.5rem;
        }
    }
`;