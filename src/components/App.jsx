import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';
import Terminal from './Terminal';

export default (props) => {
    return (
        <Layout style={{ height: '100%' }}>
            <Header style={{ color: 'white' }}>Stepper Motor Desktop</Header>
            <Content style={{ padding: '16' }}>
                <Terminal />
            </Content>
        </Layout>
    );
};
