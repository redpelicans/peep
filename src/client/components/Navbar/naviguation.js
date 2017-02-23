import React, { PropTypes } from 'react';
import { Menu, Popover, Button } from 'antd';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

const items = [
  { id: 1, title: 'Companies' },
  { id: 2, title: 'People' },
  { id: 3, title: 'Missions' },
  { id: 4, title: 'Notes' },
  { id: 5, title: 'Agenda' },
];

const MenuItem = styled(Menu.Item)`
  font-size: 1rem;
  text-align: center;
`;

const MenuHorizontal = ({ selected, onClick }) => (
  <Menu
    onClick={() => onClick()}
    selectedKeys={selected}
    mode="horizontal"
    style={{ lineHeight: '64px' }}
  >
    { items.map(({ id, title }) =>
      <MenuItem key={id}>{ title }</MenuItem>) }
  </Menu>
);

MenuHorizontal.propTypes = {
  selected: PropTypes.string,
  onClick: PropTypes.func,
};

const MenuVertical = ({ selected, onClick }) => (
  <Menu
    onClick={() => onClick()}
    selectedKeys={selected}
    mode="vertical"
    style={{ width: '160px' }}
  >
    { items.map(({ id, title }) =>
      <MenuItem key={id}>{ title }</MenuItem>) }
  </Menu>
);

MenuVertical.propTypes = {
  selected: PropTypes.string,
  onClick: PropTypes.func,
};

const Naviguation = () => (
  <div>
    <MediaQuery minWidth={992}>
      <MenuHorizontal />
    </MediaQuery>
    <MediaQuery maxWidth={991}>
      <Popover trigger="click" content={<MenuVertical />} style={{ padding: '0' }}>
        <Button><i className="fa fa-bars" /> Menu</Button>
      </Popover>
    </MediaQuery>
  </div>
);

export default Naviguation;
