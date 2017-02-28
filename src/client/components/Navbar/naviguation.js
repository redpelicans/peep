import React, { PropTypes } from 'react';
import { matchPath, withRouter } from 'react-router-dom';
import { Menu, Popover, Button } from 'antd';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

const items = [
  { path: '/tags/toto', title: 'Companies' },
  { path: '/tagstttt', title: 'People' },
  { path: '/notes', title: 'Notes' },
  { path: '/tags', title: 'Tags' },
];

const MenuItem = styled(Menu.Item)`
  font-size: 1rem;
  text-align: center;
`;

const MenuHorizontal = ({ selected, onClick }) => (
  <Menu
    onClick={onClick}
    selectedKeys={ selected }
    mode="horizontal"
    style={{ lineHeight: '64px' }}
  >
    { items.map(({ path, title }) =>
      <MenuItem key={path}>{ title }</MenuItem>) }
  </Menu>
);

MenuHorizontal.propTypes = {
  selected: PropTypes.array,
  onClick: PropTypes.func,
};

const MenuVertical = ({ selected, onClick }) => (
  <Menu
    onClick={onClick}
    selectedKeys={ selected }
    mode="vertical"
    style={{ width: '160px' }}
  >
    { items.map(({ path, title }) =>
      <MenuItem key={path}>{ title }</MenuItem>) }
  </Menu>
);

MenuVertical.propTypes = {
  selected: PropTypes.array,
  onClick: PropTypes.func,
};

const Navigation = ({ push, location }) => {
  const onClick = ({ key }) => {
    push(key);
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
        <Popover trigger="click" content={<MenuVertical onClick={onClick} selected={selected} />} style={{ padding: '0' }}>
          <Button size="large"><i className="fa fa-bars" /> Menu</Button>
        </Popover>
      </MediaQuery>
    </div>
  );
}

Navigation.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default withRouter(Navigation);
