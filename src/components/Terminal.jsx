import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Row } from 'antd';
import { LeftSquareTwoTone, RightSquareTwoTone } from '@ant-design/icons';
import NumberButton from './NumberButton';
import SaveButton from './SaveButton';

const { ipcRenderer } = window.require('electron');

const KeyPad = (props) => {
    const [numRot, setNumRot] = useState(0.0);

    return (
        <>
            <Row gutter={[16, 16]} justify="center">
                <div style={{ fontSize: '68px' }}>{numRot / 200.0}</div>
            </Row>
            <Row gutter={[16, 16]} justify="space-around">
                <NumberButton
                    list={[
                        { label: '+10', value: 2000 },
                        { label: '+5', value: 1000 },
                        { label: '+1', value: 200 },
                        { label: '+0.5', value: 100 },
                        { label: '+0.05', value: 10 },
                        { label: '+0.005', value: 1 },
                    ]}
                    currentValue={numRot}
                    handleClicked={(value) => {
                        setNumRot(value);
                        ipcRenderer.invoke('rotation', value);
                    }}
                />
            </Row>
            <Row gutter={[16, 16]} justify="space-around">
                <NumberButton
                    list={[
                        { label: '-10', value: -2000 },
                        { label: '-5', value: -1000 },
                        { label: '-1', value: -200 },
                        { label: '-0.5', value: -100 },
                        { label: '-0.05', value: -10 },
                        { label: '-0.005', value: -1 },
                    ]}
                    currentValue={numRot}
                    handleClicked={(value) => {
                        setNumRot(value);
                        ipcRenderer.invoke('rotation', value);
                    }}
                />
            </Row>
            <Divider>calibrate</Divider>
            <Row gutter={[16, 16]} justify="space-around">
                <SaveButton
                    list={[
                        { label: 'save', command: 'save' },
                        { label: 'reset', command: 'reset' },
                    ]}
                    handleClicked={(command) => {
                        ipcRenderer.invoke(command);
                    }}
                />
            </Row>
        </>
    );
};

export default (props) => {
    return (
        <>
            <KeyPad />
        </>
    );
};
