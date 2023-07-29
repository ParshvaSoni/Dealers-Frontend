import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, Row, DatePicker } from 'antd'
import styled from 'styled-components';
import FileUpload from '../../Components/FileUpload';

const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';

type OfferFormData = {
  title: string;
  targetlink: string;
  startdate: string;
  enddate: string;
  description: string;
  imageurl: string[];
}

type OfferFormProps={
  data?:OfferFormData;
}

const OfferForm = (props:OfferFormProps) => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OfferFormData>({
    title: "",
    targetlink: "",
    startdate: "",
    enddate: "",
    description: "",
    imageurl: []
  });
  const [form] = Form.useForm();
  const onFinish = (val: any) => {
    console.log("Finished : ", val);
  }

  useEffect(() => {
    setLoading(true);
    if (props.data) {
      form.setFieldsValue(props.data);
      setFormData({ ...formData, ...props.data });
    }
    else {
      form.resetFields();
      setFormData(
        {
          title: "",
          targetlink: "",
          startdate: "",
          enddate: "",
          description: "",
          imageurl: []
        })
    }
    setLoading(false);
  }, [])

  return (
    <Offer_Form_Container>
      <Form form={form}
        style={{ width: "100%" }}
        onFinish={onFinish}
        labelWrap={true}
        labelCol={{ flex: '130px' }}
        labelAlign="left"
        disabled={loading}
      >
        <div className='hflex' >
          <Form.Item
            label="Title"
            name="title"
            rules={[{
              required: true, message: 'Offer Title is required !'
            },
            {
              type: 'string',
              message: 'Title should be string !'
            },
            {
              min: 5,
              message: 'Title should be minimum 5 character long !'
            },
            {
              max: 100,
              message: 'Title can maximum be 100 character long !'
            }
            ]}
          >
            <Input name='title' value={formData.title} onChange={(e) => { setFormData({ ...formData, title: '' }) }} placeholder='Enter Offer Title' />
          </Form.Item>
          <Form.Item
            label="Target URL"
            name="targetlink"
            rules={[{
              required: true,
              message: "Offer Description is required !"
            },
            {
              type: 'url',
              message: "Please Enter Proper Target URL !"
            },
            {
              min: 5,
              message: `Target URL shoudd be atleast 5 characters long !`
            },
            {
              max: 100,
              message: 'Target URL should atmost 100 characters long !'
            }
            ]}
          >
            <Input name='targetlink' value={formData.targetlink} placeholder='Enter Target Url !' />
          </Form.Item>
        </div>
        <div className='hflex' >
          <Form.Item
            label="Start Date"
            name="startdate"
          >
            <DatePicker name='startdate' placeholder='Select Start Date' format={dateFormat} onChange={(val: any) => { console.log("Date Value :", val.toISOString(true)) }} />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="enddate"
          >
            <DatePicker name='enddate' placeholder='Select End Date' format={dateFormat} onChange={(val: any) => { console.log("Date Value :", val.toISOString(true)) }} />
          </Form.Item>
        </div>
        <Form.Item
          label="Description"
          name="description"
          rules={[{
            required: true
          }, {
            type: 'string',
            message: "Please Enter Proper Offer Description !"
          },
          {
            min: 10,
            message: "Offer Description should be atleast 10 characters long !"
          },
          {
            max: 250,
            message: "Offer Description should be atmost 250 characters long !"
          }
          ]}
        >
          <TextArea placeholder='Enter Offer Description' name='description' value={formData.description} />
        </Form.Item>
        <FileUpload fileCount={3} imageUrlArray={formData.imageurl} />
        <Form.Item>
          <Button htmlType='submit' type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </Offer_Form_Container>
  )
}

export default OfferForm;

const Offer_Form_Container = styled.div`
  display:flex;
  // border:1px solid yellow;
  
  .ant-picker{
    width:100% !important;
  }
  .hflex{
    display:flex;
    gap:0.5rem;
    // border:1px solid red;
  }
  .hflex>*{
    width:100%;
  }

  @media ${(prop) => prop.theme.device.mobile} { 
    .hflex{
      flex-direction:column;
    }
  }
  @media ${(prop) => prop.theme.device.tablet} {
  }
  @media ${(prop) => prop.theme.device.laptop} { 
  }
`;