import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styled from 'styled-components';
import FileUpload from '../../Components/FileUpload';
import axios from 'axios';
import { config } from '../../Constant';
import { useDealersData } from '../../Context/DealersContext';
import { OpenNotification } from '../../HelperFunction';

type DealersProps = {
    DealersData?: {
        address?: {
            addressLine?: string,
            city?: string,
            pincode?: string,
            state?: string,
        }
        footerPhotoUrl?: string,
        gstnumber?: string,
        headerPhotoUrl?: string,
        profilePicUrl?: string,
        shopname?: string,
        tagline?: string
    }
}

const AccountDetailsForm = () => {
    const [form] = Form.useForm();
    const handleSubmit = async (val: { username: string, email: string, mobile: string }) => {
        try {
            let response = await axios.patch(config.URLS.BACKEND_URL + 'account/update', val, { withCredentials: true });
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
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
    const { dealer, setDealer } = useDealersData();
    const handleSubmit = async (val: { shopname: string, tagline: string, gstnumber: string, address: { addressLine: string, city: string, state: string, pincode: string } }) => {
        try {
            let response = await axios.patch(config.URLS.BACKEND_URL + 'accountmetadata/update', val, { withCredentials: true });
            console.log(response);
            setDealer(response.data.data);
            OpenNotification({ type: 'success', title: 'Account Metadata Update', description: response.data.message })
        }
        catch (err) {
            console.log(err);
        }
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
                            }, {
                                type: 'string'
                            },
                        ]}
                    >
                        <Input placeholder='Enter shopname' defaultValue={dealer.DealersData?.shopname} />
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
                            },
                            {
                                type: 'string'
                            }
                        ]}
                    >
                        <Input placeholder='Enter Tagline' defaultValue={dealer.DealersData?.tagline} />
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
                        <Input placeholder='Enter GST No.' defaultValue={dealer.DealersData?.gstnumber} />
                    </Form.Item>
                </div>
                <div className='hflex'>
                    <Form.Item
                        label={'AddressLine'}
                        name={['address', 'addressLine']}
                        rules={[
                            {
                                required: true
                            },
                            {
                                min: 5
                            },
                            {
                                max: 45
                            },
                            {
                                type: 'string'
                            }
                        ]}
                    >
                        <Input placeholder='Enter Addressline' defaultValue={dealer.DealersData?.address?.addressLine} />
                    </Form.Item>
                </div>
                <div className='hflex'>
                    <Form.Item
                        label='City'
                        name={['address', 'city']}
                        rules={[{
                            required: true
                        },
                        {
                            min: 3
                        },
                        {
                            max: 30
                        },
                        {
                            type: 'string'
                        }
                        ]}
                    >
                        <Input placeholder='Enter city' defaultValue={dealer.DealersData?.address?.city} />
                    </Form.Item>
                    <Form.Item
                        label='State'
                        name={['address', 'state']}
                        rules={[{
                            required: true
                        },
                        {
                            min: 3
                        },
                        {
                            max: 25
                        },
                        {
                            type: 'string'
                        }
                        ]}
                    >
                        <Input placeholder='Enter state' defaultValue={dealer.DealersData?.address?.state} />
                    </Form.Item>
                    <Form.Item
                        label='Pincode'
                        name={['address', 'pincode']}
                        rules={[{
                            required: true
                        },
                        {
                            len: 6
                        },
                        {
                            type: 'string'
                        }
                        ]}
                    >
                        <Input placeholder='Enter pincode' defaultValue={dealer.DealersData?.address?.pincode} />
                    </Form.Item>
                </div>
                <div className='hflex'>
                    <Form.Item
                        label="Profile Picture"
                    >
                        <FileUpload fileCount={1} imageUrlArray={[dealer.DealersData?.profilePicUrl || '']} />
                    </Form.Item>
                    <Form.Item
                        label="Header Picture"
                    >
                        <FileUpload fileCount={1} imageUrlArray={[dealer.DealersData?.headerPhotoUrl || '']} />
                    </Form.Item>
                    <Form.Item
                        label="Footer Picture"
                    >
                        <FileUpload fileCount={1} imageUrlArray={[dealer.DealersData?.footerPhotoUrl || '']} />
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
    document.title = "Account Update"
    return (
        <Account__Update__Container>
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