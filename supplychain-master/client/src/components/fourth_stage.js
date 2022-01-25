import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';

export default function FourthStage({accounts, contract}){

    const toastId = React.useRef(null);
    const [clientName, setClientName] = useState(null);
    const [clientAddress, setClientAddress] = useState(null);
    const [boxDelivered, setBoxDelivered] = useState(0);

    const infoToast = (msg) => toastId.current = toast.info(msg);
    const successToast = (msg) => toast.success(msg);
    const errorToast = (msg) => toast.error(msg);
    const dismiss = () =>  toast.dismiss(toastId.current);

    const onFinish = async (values) => {
        infoToast("Processing Transaction!!")

        setTimeout(async() => {
            const date = moment().format("DD-MM-YYYY")
            console.log("date: ", date)
            const productId = localStorage.getItem('productId');

            const tx = await contract.methods.storeFourthStage(
                clientName,
                clientAddress,
                boxDelivered,
                date,
                productId
            ).send({ from: accounts[0] });
            console.log("transaction:", tx);

            if(tx.status){
                localStorage.setItem('productId', productId);
                dismiss();
                successToast(`Transaction successful. Product Id: ${productId}`);
            }else{
                errorToast("Transaction failed");
            }
        }, 1500);
        
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Form
            initialValues={{
            remember: true,
            }}
            layout="vertical" 
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{marginLeft: '100px', marginRight: '100px', marginTop: '50px'}} 
        >
            <Form.Item label="Client Name" name="clientname" rules={[{required: true,message: 'Please input client name'}]}>
                <Input type="text" placeholder="Enter client name" onChange={(e)=>setClientName(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Client Address" name="clientaddress" rules={[{required: true,message: 'Please input client address!'}]}>
                <Input type="text" placeholder="Enter client address" onChange={(e)=>setClientAddress(e.target.value)} />
            </Form.Item>

            <Form.Item label="Total box delivered " name="totalbox" rules={[{required: true,message: 'Please input total box!'}]}>
                <Input  type="number" placeholder="Enter total number of boxes"  onChange={(e)=>setBoxDelivered(e.target.value)}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <ToastContainer/>
            </Form.Item>
        </Form>
    );
}