import { Row, Col, Slider, InputNumber } from "antd";
import { useState } from "react";

export const PriceStep: React.FC = () => {
    const [inputValue, setInputValue] = useState(0);
  
    const onChange = (value: number) => {
      if (isNaN(value)) {
        return;
      }
      setInputValue(value);
    };
  
    return (
      <Row>
        <Col span={20}>
          <Slider
            min={0}
            max={20000000}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
            step={100000}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={20000000}
            style={{ margin: '0 0 0 30px' }}
            step={100000}
            value={inputValue}
            onChange={onChange}
            
          />
        </Col>
       
      </Row>
     
    );
  };