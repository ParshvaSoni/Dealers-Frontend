import { Button, Form, Input } from 'antd';
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styled from 'styled-components';

const AccountDetailsForm = () => {
    const [form] = Form.useForm();
    const handleSubmit = (val: { username: string }) => {
        console.log(val);
    }
    return (
        <div className='Account__Details__Form'>
            <Form
                form={form}
                onFinish={handleSubmit}
            >
                <div className='hflex'>
                    <Form.Item
                        label={'Account Username'}
                        name={'username'}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                min: 5
                            },
                            {
                                max: 50
                            }
                        ]}
                    >
                        <Input placeholder='Account username' name='username' />
                    </Form.Item>
                    <Form.Item
                        label={'Account Mobile'}
                        name={'mobile'}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                min: 8
                            },
                            {
                                max: 13
                            }
                        ]}
                    >
                        <Input placeholder='Account mobile' name='mobile' />
                    </Form.Item>
                </div>
                <div className='hflex'>
                    <Form.Item
                        name={'email'}
                        label={'Account Email'}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'email'
                            }
                        ]}
                    >
                        <Input name='email' placeholder='Account Email' />
                    </Form.Item>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Button type={'primary'} onClick={() => form.submit()}>Update</Button>
                </div>
            </Form>
        </div>
    )
}

const AccountMetaDataForm = () => {
    const [form] = Form.useForm();
    const handleSubmit = (val: { username: string }) => {
        console.log(val);
    }
    return (
        <div className='Account__Details__Form'>
            <Form
                form={form}
                onFinish={handleSubmit}
            >
                <div className='hflex'>
                    <Form.Item
                        label={'Shop Name'}
                        name={'shopname'}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                min: 5
                            },
                            {
                                max: 50
                            }
                        ]}
                    >
                        <Input placeholder='Enter shopname' name='shopname' />
                    </Form.Item>
                    <Form.Item
                        label={'Tagline'}
                        name={'tagline'}
                        rules={[
                            {
                                min: 5
                            },
                            {
                                max: 100
                            }
                        ]}
                    >
                        <Input placeholder='Enter Tagline' name='tagline' />
                    </Form.Item>
                </div>
                <div className='hflex'>
                    <Form.Item
                        name={'gstnumber'}
                        label={'GST No.'}
                        rules={[
                            {
                                len: 15
                            }
                        ]}
                    >
                        <Input name='gstnumber' placeholder='Enter GST No.' />
                    </Form.Item>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Button type={'primary'} onClick={() => form.submit()}>Update</Button>
                </div>
            </Form>
        </div>
    )
}

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Account Details',
        children: <AccountDetailsForm />,
    },
    {
        key: '2',
        label: 'Account Metadata',
        children: <AccountMetaDataForm />,
    },
];

const onChange = (key: string) => {
    console.log(key);
};

const AccountUpdate = () => {
    return (
        <Account__Update__Container>
            <h2 style={{ textAlign: 'center' }}>
                Account Update
            </h2>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Account__Update__Container>
    )
}

export default AccountUpdate;

const Account__Update__Container = styled.div`

    padding:12px;

    .ant-form-item, .ant-input-number{
        width:100% !important;
    }

    .Account__Details__Form{

    }

    .hflex{
        justify-content:space-around;
        padding:12px;
        display:flex;
        width:100%;
        gap:1rem;
    }

    
  @media only screen and (max-device-width: 555px) {
    .hflex{
        flex-direction:column;
    }
  }
`;