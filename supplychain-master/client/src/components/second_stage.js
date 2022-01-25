import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';

export default function SecondStage({accounts, contract}){

    const toastId = React.useRef(null);
    const [machinNo, setMachineNo] = useState(null);
    const [temperature, setTemp] = useState(null);
    const [quantity, setQuantity] = useState(0);

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
        
            const tx = await contract.methods.storeSecondStage(
                machinNo,
                temperature,
                quantity,
                date,
                productId
            ).send({ from: accounts[0] });

            console.log("transaction:", tx)

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
            <Form.Item label="Machine Number" name="machineno" rules={[{required: true,message: 'Please input machine number'}]}>
                <Input type="number" placeholder="Enter machine number" onChange={(e)=>setMachineNo(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Temperature" name="temperature" rules={[{required: true,message: 'Please input temperature!'}]}>
                <Input type="number" placeholder="Enter temperature" onChange={(e)=>setTemp(e.target.value)} />
            </Form.Item>

            <Form.Item label="Quantity " name="quantity" rules={[{required: true,message: 'Please input quantity!'}]}>
                <Input type="number" placeholder="Enter quantity" onChange={(e)=>setQuantity(e.target.value)}/>
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