import React, { useState } from 'react';
import { Form, Input, Button, Timeline} from 'antd';
import { ToastContainer, toast } from 'react-toastify';

export default function ProductDetail({accounts, contract}){

    const toastId = React.useRef(null);
    const [productId, setProductId] = useState(null);
    const [productInfo, setProductInfo] = useState([]);

    const notify = () => toastId.current = toast.info("Getting data from chain!!");
    const dismiss = () =>  toast.dismiss(toastId.current);
  
    const onFinish = async (values) => {
        notify();
        setTimeout( async () => {
            const tx = await contract.methods.getProductDetails(
                productId
            ).call({ from: accounts[0] });
    
            console.log("Result:", tx)
            setProductInfo(tx)
            dismiss();
        }, 3000);
        
        
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                layout="vertical" 
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{marginLeft: '100px', marginRight: '100px', marginTop: '50px'}} 
            >
                <Form.Item label="Product Id" name="productId" rules={[{required: true, message: 'Please input product id',}]}>
                    <Input type="text" placeholder="Enter product id" onChange={(e)=>setProductId(e.target.value)}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <ToastContainer/>
                </Form.Item>
            </Form>
            <div>
                <h2>Product Detail Timeline</h2> <br/><br/>
                <Timeline mode="left">
                    
                    <Timeline.Item label="First Stage:"><h3><u>Raw material details</u></h3></Timeline.Item>
                        { productInfo.length >0 && productInfo["1"]["flag"] ? 
                            <div>
                                <Timeline.Item>Farm Name: {productInfo["1"]["farmName"]}</Timeline.Item>
                                <Timeline.Item>Farm Address: {productInfo["1"]["farmAddress"]}</Timeline.Item>
                                <Timeline.Item>Material Name: {productInfo["1"]["materialName"]}</Timeline.Item>
                                <Timeline.Item>Quantity: {productInfo["1"]["quantity"]}</Timeline.Item>
                                <Timeline.Item>Price: {productInfo["1"]["price"]}</Timeline.Item>
                                <Timeline.Item>Date: {productInfo["1"]["date"]}</Timeline.Item>
                            </div> : null
                        }
                        
                    <Timeline.Item label="Second Stage"><h3><u>Manufacturing details</u></h3></Timeline.Item>
                        { productInfo.length >0 && productInfo["2"]["flag"] ? 
                            <div>
                                <Timeline.Item>Machine Number: { productInfo["2"]["machinNo"] } </Timeline.Item>
                                <Timeline.Item>Temperature: { productInfo["2"]["temperature"] }</Timeline.Item>
                                <Timeline.Item>Quantity: { productInfo["2"]["quantity"] }</Timeline.Item>
                                <Timeline.Item>Date: { productInfo["2"]["date"] }</Timeline.Item>
                            </div> : null
                        }
                    <Timeline.Item label="Third Stage"><h3><u>Packing details</u></h3></Timeline.Item>
                        { productInfo.length >0 && productInfo["3"]["flag"] ? 
                            <div>
                                <Timeline.Item>Total Packets: { productInfo["3"]["totalPackets"] }</Timeline.Item>
                                <Timeline.Item>Box Number: { productInfo["3"]["boxNumber"] }</Timeline.Item>
                                <Timeline.Item>Date: { productInfo["3"]["date"] }</Timeline.Item>
                            </div> : null
                        }
                    <Timeline.Item label="Fourth Stage"><h3><u>Delivery details</u></h3></Timeline.Item>
                        { productInfo.length >0 && productInfo["4"]["flag"] ? 
                            <div>
                                <Timeline.Item>Client Name: { productInfo["4"]["clientName"] }</Timeline.Item>
                                <Timeline.Item>Client Address: { productInfo["4"]["clientAddress"] }</Timeline.Item>
                                <Timeline.Item>Total Box Delivered: { productInfo["4"]["boxDelivered"] }</Timeline.Item>
                                <Timeline.Item>Date: { productInfo["4"]["date"] }</Timeline.Item>
                            </div> : null
                        }
                </Timeline>
            </div>
        </div>
    );
}