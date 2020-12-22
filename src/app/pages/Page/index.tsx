import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import {
  CloseOutlined,
  EyeFilled,
} from '@ant-design/icons';

import { RootState } from '@slices/rootReducer';
import { setSidebarCollapsed } from '@slices/app';
import Loading from '@components/Loading';
import LogoIcon from '@components/Logo';

import './styles.less';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';


type PageProps = {
  className: string;
  content: ReactElement;
  loading: boolean;
  setSidebarCollapsed: ActionCreatorWithPayload<boolean>;
  sidebar: ReactElement;
  sidebarCollapsed: boolean;
}

const { Content, Header, Sider } = Layout;

const Page: React.FC<PageProps> = ({
  className,
  content,
  loading,
  setSidebarCollapsed,
  sidebar,
  sidebarCollapsed,
}) => {

  return (
    <Layout className={className}>
      {loading && <Loading/>}
      <Header className="page-header">
          <Link
            to="/wall"
            className="logo"
            onClick={() => setSidebarCollapsed(true)}
          >
            <LogoIcon />
          </Link>
          <button
            className="sidebar-trigger"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {React.createElement(sidebarCollapsed ? EyeFilled : CloseOutlined)}
          </button>
        </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={sidebarCollapsed}
          className="sidebar"
          breakpoint="md"
          collapsedWidth="0"
          width="100%"
        >
          {sidebar}
        </Sider>
        <Content className="content">
          {content}
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => ({
  loading: state.app.loading,
  sidebarCollapsed: state.app.sidebarCollapsed,
});

export default connect(mapStateToProps, { setSidebarCollapsed })(Page);
