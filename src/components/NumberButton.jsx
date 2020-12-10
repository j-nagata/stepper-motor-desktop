import React from 'react';
import { Button, Col } from 'antd';

export default (props) => {
    const list = props.list;

    const Buttons = list.map((item) => (
        <Col span="4" key={item.label}>
            <Button
                block
                type="primary"
                shape="round"
                onClick={() =>
                    props.handleClicked(props.currentValue + item.value)
                }
            >
                {item.label}
            </Button>
        </Col>
    ));

    return <>{Buttons}</>;
};
