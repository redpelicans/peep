import React from 'react';
import { notification, Icon } from 'antd';
import { themeColors } from '../../utils/colors';

/* https://ant.design/components/notification/#API */
notification.config({ duration: 5 });

const MessageIcon = ({ icon, type }) => (
  <Icon type={icon} style={{ color: themeColors[type] }} />
);

MessageIcon.propTypes = {
  icon: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
};

const pushMessage = ({ type = 'error', message = '', description = '', icon = '' }) =>
  notification[type]({ message, description, icon: <MessageIcon icon={icon} type={type} /> });

export default pushMessage;
