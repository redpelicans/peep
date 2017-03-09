import React, { PropTypes, Component } from 'react';
import { Dropdown, Menu, Icon } from 'antd';
import R from 'ramda';

const MenuItem = Menu.Item;

const menuItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '1.2em',
  padding: '10px 14px',
  width: '210px',
  userSelect: 'none',
};

const orderIcons = {
  asc: 'caret-up',
  desc: 'caret-down',
};

class SortMenu extends Component {
  state = { isVisible: false };

  handleClick = e => this.props.onClick(e.key);

  handleVisibleChange = flag => this.setState({ isVisible: flag });

  render() {
    const { items, sort, style } = this.props;
    const { isVisible } = this.state;

    const menu = (
      <Menu onClick={this.handleClick} style={{ marginTop: '12px' }}>
        { R.map(({ key, label }) =>
          <MenuItem key={key} style={menuItemStyle}>
            <span>{label}</span>
            { sort && sort.by === key &&
              <Icon type={orderIcons[sort.order]} style={{ marginLeft: '8px' }} /> }
          </MenuItem>)(items) }
      </Menu>);

    return (
      <Dropdown
        overlay={menu}
        trigger={['click', 'hover']}
        placement="bottomRight"
        onVisibleChange={this.handleVisibleChange}
        visible={isVisible}
        style={style}
      >
        <a>
          <i className="fa fa-sort" />
        </a>
      </Dropdown>
    );
  }
}

SortMenu.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  sort: PropTypes.object,
  style: PropTypes.object,
};

export default SortMenu;
