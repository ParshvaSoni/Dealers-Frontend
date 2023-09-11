import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd';
import styled from 'styled-components';
import { OpenNotification } from '../../HelperFunction';
import axios from 'axios';
import { config } from '../../Constant';
import PrintBillLayout from '../../Components/PrintBillLayout';
import PrintComponent from '../../Components/PrintComponent';

interface billdata {
  _id: string,
  accountId: string,
  customername: string,
  productname: string,
  customermobile: string,
  metaltype: string,
  metalweight: number,
  metalpurity: string,
  rate: number,
  labour: number,
  extra: number,
  message: string,
  huid: string,
  imageurl: string,
  deliverdate: string,
  transaction: [
    {
      transactiondate: string,
      amount: number,
      _id: string
    }
  ],
  createdAt: string,
  updatedAt: string,
  __v: number
}


const BakiBillListing = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [content, setContent] = useState(<></>);
  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try{
      let response = await axios.delete(config.URLS.BACKEND_URL + `bakibill/delete/${id}`,{withCredentials:true});
      if (response.data.success) {
        OpenNotification({ type: 'success', title: "Baki Bill Notification", description: response.data.message })
      }
      else {
        OpenNotification({ type: 'error', title: "Baki Bill Notification", description: response.data.message })
      }
    }
    catch(err:any)
    {
      OpenNotification({ type: 'error', title: "Baki Bill Notification", description: err.response.data.message })
    }
  }

  const handleSubmit = async (val: { searchField: string, searchValue: string }) => {
    try {
      let response = await axios.get(config.URLS.BACKEND_URL + `bakibill/get?${val.searchField}=${val.searchValue}`, { withCredentials: true });
      console.log(response.data);
      setData(response?.data?.data);
      if (response?.data?.success) {
        OpenNotification({ type: 'success', title: 'Baki Bill Notification', description: response.data.message });
      }
      else {
        OpenNotification({ type: 'error', title: 'Baki Bill Notification', description: response.data.message });
      }
    }
    catch (err:any) {
      console.log(err);
      OpenNotification({ type: 'error', title: "Baki Bill Notification", description: err.response.data.message })
    }
  }
  return (
    <BakiBillListing__Container>
      <div className="form_container">
        <Form
          form={form}
          onFinish={handleSubmit}
        >
          <div className="hflex">
            <Form.Item
              name={'searchField'}
              label={'Search Field'}
              rules={[
                {
                  required: true,
                  message: "Search Field Is required !"
                }
              ]}
            >
              <Select
                options={[
                  {
                    value: 'customermobile',
                    label: 'Phone Number'
                  },
                  {
                    value: 'customername',
                    label: 'Customer Name'
                  },
                  {
                    value: 'metaltype',
                    label: 'Metal Type'
                  },
                  {
                    value: 'all',
                    label: 'All'
                  }
                ]}
                placeholder="Select Search Field"
              >
              </Select>
            </Form.Item>
            <Form.Item
              name={'searchValue'}
              label={'Search Value'}
              rules={[
                {
                  required: true,
                  message: "Search Value is required !"
                }
              ]}
            >
              <Input name='searchValue' placeholder='Enter your value' />
            </Form.Item>
            <Button type={'primary'} onClick={() => form.submit()} >Search</Button>

          </div>
        </Form>
      </div>
      <div className="listing_container">
        <table className='table responsive'>
          <thead>
            <tr>
              <td>Customer Name</td>
              <td>Phone Number</td>
              <td>Delivery Date</td>
              <td>Product Name</td>
              <td>Product Weight</td>
              <td>Metal</td>
              <td>Operations</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item: billdata, index) => {
              return (
                <tr key={index}>
                  <td data-label="Customer Name">{item.customername}</td>
                  <td data-label="Phone Number">{item.customermobile}</td>
                  <td data-label="Delivery Date" >{item.deliverdate}</td>
                  <td data-label="Product Name" >{item.productname}</td>
                  <td data-label="Product Weight">{item.metalweight}</td>
                  <td data-label="Metal Type">{item.metaltype}</td>
                  <td data-label="Operations">
                    <div className='hflex'>
                      <Button type='primary' onClick={() => { setOpen(true); setContent(<PrintComponent><PrintBillLayout data={item} /></PrintComponent>) }}>Print</Button>
                      <Button type='primary' onClick={()=>handleDelete(item._id)} >Delete</Button>
                      {/* {item.orderstatus === "paid" ? <></> : <button>Full Payment</button>} */}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Modal
          title="Baki Bill Details"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          footer={[]}
        >
          {content}
        </Modal>
      </div>
    </BakiBillListing__Container>
  )
}

export default BakiBillListing;

const BakiBillListing__Container = styled.div`
  .hflex{
    justify-content:space-evenly;
    width:100%;
    display:flex;
    gap:1rem;
  }

  .ant-form-item{
    justify-content: space-evenly !important;
    width:250px;
    flex:1 !important;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 40px;
  }

  .table td {
      padding: 7px 10px;
      border: 1px solid;
  }

  .table thead{
      background:grey;
      color:white;
  }



  @media only screen and (max-device-width: 555px) {
    .hflex{
          flex-direction:column !important;
          gap:0.5rem;
    }

    .ant-form-item{
        width:100% !important;
        flex-direction:column !important;
    }


    .responsive thead {
        visibility: hidden;
        height: 0;
        position: absolute;
    }
    
    .responsive tr {
      display: block;
      margin-bottom: 0.625em;
    }
  
    .responsive td {
      border: 1px solid;
      border-bottom: none;
      display: block;
      font-size: 0.8em;
      text-align: right;
    }
  
    .responsive td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
  
    .responsive td:last-child {
      border-bottom: 1px solid;
    }
  }
`;