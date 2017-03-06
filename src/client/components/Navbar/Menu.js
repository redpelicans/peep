import React, { PropTypes } from 'react';
import { matchPath, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

const items = [
  { path: '/companies', title: 'Companies' },
  { path: '/people', title: 'People' },
  { path: '/notes', title: 'Notes' },
  { path: '/tags', title: 'Tags' },
];

const MenuItem = styled(Menu.Item)`
  font-size: 1rem !important;
  text-align: center;
`;

const MenuHorizontal = ({ selected, onClick }) => (
  <Menu
    mode="horizontal"
    style={{ lineHeight: '64px' }}
    selectedKeys={selected}
    onClick={onClick}
  >
    { items.map(({ path, title }) =>
      <MenuItem key={path}>{ title }</MenuItem>) }
  </Menu>
);

MenuHorizontal.propTypes = {
  selected: PropTypes.array,
  onClick: PropTypes.func,
};

const Card = styled.div`
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
`;

const MenuVertical = ({ selected, onClick }) => (
  <Card>
    <Menu
      style={{ width: 200, border: '1px solid #ececec' }}
      selectedKeys={selected}
      onClick={onClick}
    >
      { items.map(({ path, title }) =>
        <MenuItem key={path}>{ title }</MenuItem>) }
    </Menu>
  </Card>
);

MenuVertical.propTypes = {
  selected: PropTypes.array,
  onClick: PropTypes.func,
};

const Navigation = ({ history, location }) => {
  const onClick = ({ key }) => {
    history.push(key);
  };

  const selected = items
  .filter(({ path }) => matchPath(location.pathname, path, { exact: false, strict: false }))
    .map(({ path }) => path);

  return (
    <div>
      <MediaQuery minWidth={992}>
        <MenuHorizontal onClick={onClick} selected={selected} />
      </MediaQuery>
      <MediaQuery maxWidth={991}>
        <Dropdown trigger={['click', 'hover']} overlay={<MenuVertical onClick={onClick} selected={selected} />}>
          <Button size="large"><i className="fa fa-bars" /> Menu</Button>
        </Dropdown>
      </MediaQuery>
    </div>
  );
};

Navigation.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(Navigation);
