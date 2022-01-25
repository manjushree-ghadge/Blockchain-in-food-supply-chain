import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';

export default function ThirdStage({accounts, contract}){

    const toastId = React.useRef(null);
    const [totalPackets, setTotalPackets] = useState(null);
    const [boxNumber, setBoxNumber] = useState(null);

    const infoToast = (msg) => toastId.current = toast.info(msg);
    const successToast = (msg) => toast.success(msg);
    const errorToast = (msg) => toast.error(msg);
    const dismiss = () =>  toast.dismiss(toastId.current);

    const onFinish = async () => {
        infoToast("Processing Transaction!!")

        setTimeout(async() => {
            const date = moment().format("DD-MM-YYYY")
            console.log("date: ", date)
            const productId = localStorage.getItem('productId');
            
            const tx = await contract.methods.storeThirdStage(
                totalPackets,
                boxNumber,
                date,
                productId
            ).send({ from: accounts[0] });
            console.log("transaction:", tx)

            if(tx.status){
                localStorage.setItem('productId', productId);
                dismiss();
                successToast(`Transaction successful. Product Id: ${productId}`);
            }else{
                errorToast("Transaction failed!! Check console");
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
            <Form.Item label="Total Packet" name="totalpacket" rules={[{required: true, message: 'Please input total packet!'}]}>
                <Input type="number" placeholder="Enter total packets in a box" onChange={(e)=>setTotalPackets(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Box number" name="boxno" rules={[{required: true, message: 'Please input box number!'}]}>
                <Input type="number" placeholder="Enter box number" onChange={(e)=>setBoxNumber(e.target.value)} />
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