// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract TrackProduct {

    struct FirstStage {
        string farmName;
        string farmAddress;
        string materialName;
        uint256 quantity;
        uint256 price;
        string date;
        bool flag;
    }
    
    struct SecondStage {
        uint256 machinNo;
        uint256 temperature;
        uint256 quantity;
        string date;
        bool flag;
    }
    
    struct ThirdStage {
        uint256 totalPackets;
        uint256 boxNumber;
        string date;
        bool flag;
    }
    
    struct FourthStage {
        string clientName;
        string clientAddress;
        uint256 boxDelivered;
        string date;
        bool flag;
    }
    
    struct ProductDetail{
        string productName;
        FirstStage detail1;
        SecondStage detail2;
        ThirdStage detail3;
        FourthStage detail4;
    }
    
    mapping(string => ProductDetail) productDetail;

    function storeFirstStage(
        string memory farmName,
        string memory farmAddress,
        string memory materialName,
        uint256 quantity,
        uint256 price,
        string memory date,
        string memory productId,
        string memory productName
    ) public {
       
        require(productDetail[productId].detail1.flag == false, "Details already present!!");

        FirstStage memory detail = FirstStage({
           farmName: farmName,
           farmAddress: farmAddress,
           materialName: materialName,
           quantity: quantity,
           price: price,
           date: date,
           flag: true
        });
       
        productDetail[productId].detail1 = detail;
        productDetail[productId].productName = productName;
    }
    
    function storeSecondStage(
        uint256 machinNo,
        uint256 temperature,
        uint256 quantity,
        string memory date,
        string memory productId
    ) public {
        
        require(productDetail[productId].detail1.flag, "Insert stage1 first!!");
        require(productDetail[productId].detail2.flag == false, "Details already present!!");
        
        SecondStage memory detail = SecondStage({
          machinNo: machinNo,
          temperature: temperature,
          quantity: quantity,
          date: date,
          flag: true
        });
        
        productDetail[productId].detail2 = detail;
    }
    
    function storeThirdStage(
        uint256 totalPackets,
        uint256 boxNumber,
        string memory date,
        string memory productId
    ) public {
        
        require(productDetail[productId].detail2.flag, "Insert stage2 first!!");
        require(productDetail[productId].detail3.flag == false, "Details already present!!");
        
        ThirdStage memory detail = ThirdStage({
          totalPackets: totalPackets,
          boxNumber: boxNumber,
          date: date,
          flag: true
        });
        
        productDetail[productId].detail3 = detail;
    }
    
    function storeFourthStage(
        string memory clientName,
        string memory clientAddress,
        uint256 boxDelivered,
        string memory date,
        string memory productId
    ) public {
        
        require(productDetail[productId].detail3.flag, "Insert stage3 first!!");
        require(productDetail[productId].detail4.flag == false, "Details already present!!");
        
        FourthStage memory detail = FourthStage({
          clientName: clientName,
          clientAddress: clientAddress,
          boxDelivered: boxDelivered,
          date: date,
          flag: true
        });
        
        productDetail[productId].detail4 = detail;
    }

    function getProductDetails(string memory productId) public view returns (ProductDetail memory detail){
        return productDetail[productId];
    }
}