import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
import moment from "moment";
import otpGenerator from 'otp-generator'
import { ToastContainer, toast } from 'react-toastify';

export default function FirstStage({accounts, contract}){

    const toastId = React.useRef(null);
    const [productName, setProductName] = useState(null);
    const [farmName, setFarmName] = useState(null);
    const [farmAddress, setFarmAddress] = useState(null);
    const [materialName, setMaterialName] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    const infoToast = (msg) => toastId.current = toast.info(msg);
    const successToast = (msg) => toast.success(msg);
    const errorToast = (msg) => toast.error(msg);
    const dismiss = () =>  toast.dismiss(toastId.current);

    const onFinish = async (values) => {
        infoToast("Processing Transaction!!")

        setTimeout(async() => {
            const date = moment().format("DD-MM-YYYY")
            console.log("date: ", date)
            const productId = otpGenerator.generate(6, { upperCase: false, specialChars: false });
            console.log("Product:", productId);
            console.log(contract.methods);
            const tx = await contract.methods.storeFirstStage(
                farmName,
                farmAddress,
                materialName,
                quantity,
                price,
                date,
                productId,
                productName
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
            <Form.Item label="Product Name" name="productname" rules={[{required: true,message: 'Please input product name'}]}>
                <Input type="text" placeholder="Enter product name" onChange={(e)=>setProductName(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Farm Name" name="farmname" rules={[{required: true,message: 'Please input farm name!'}]}>
                <Input type="text" placeholder="Enter farm name" onChange={(e)=>setFarmName(e.target.value)} />
            </Form.Item>

            <Form.Item label="Farm Address" name="farmaddress" rules={[{required: true,message: 'Please input farm address!'}]}>
                <Input  type="text" placeholder="Enter farm address"  onChange={(e)=>setFarmAddress(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Material Name" name="materialname" rules={[{required: true,message: 'Please input material name!'}]}>
                <Input type="text" placeholder="Enter material name" onChange={(e)=>setMaterialName(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Quantity " name="quantity" rules={[{required: true,message: 'Please input quantity!'}]}>
                <Input type="number" placeholder="Enter quantity" onChange={(e)=>setQuantity(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Price" name="price" rules={[{required: true,message: 'Please input price!'}]}>
                <Input type="number" placeholder="Enter price" onChange={(e)=>setPrice(e.target.value)}/>
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