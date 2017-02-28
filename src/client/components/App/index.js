import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import allActions from '../../actions';
import Navbar from '../Navbar';
import Note from '../Notes';

export const Content = styled(Layout.Content)`
  padding: 0 50px;
  height: 100vh;
`;

export const MainWrapper = styled.section`
  background-color: white;
  min-height: 300px;
  margin: 0 48px;
  border-radius: 4px;
  padding: 24px;
  margin: 88px 0 24px;
  font-size: 14px;
`;

const App = ({ tags, actions }) => (
  <Layout>
    <Navbar />
    <Content>
      <MainWrapper>
         <Note actions={actions} tags={tags.data} />
      </MainWrapper>
    </Content>
  </Layout>
);

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch),
});

App.propTypes = {
  tags: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
