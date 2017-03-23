import React from 'react';
import Remarkable from 'remarkable';
import styled from 'styled-components';
import { Switch, Input } from 'antd';
import { themeColors } from '../../utils/colors';

const convertor = new Remarkable('full');

const StyledMarkdown = styled.div`
  margin-top: 24px;

  ol, ul {
    list-style: circle;
    margin-left: 16px;
  }

  blockquote {
    border-left: 3px solid ${themeColors.secondary};
    padding-left: 16px;
  }

  code {
    color: ${themeColors.error};
    padding: 4px;
    border-radius: 4px;
    background: ${themeColors.secondary}
  }
`;

export const MarkdownConvertor = ({ children }) => (
  <StyledMarkdown
    dangerouslySetInnerHTML={{ __html: convertor.render(children) }} // eslint-disable-line
  />
);

MarkdownConvertor.propTypes = {
  children: React.PropTypes.string,
};

export const MarkdownSwitch = ({ onChange }) => (
  <div>
    <span style={{ color: themeColors.secondary, fontSize: '0.9em', marginRight: '8px' }}>mardown preview</span>
    <Switch size="small" onChange={onChange} />
  </div>
);

MarkdownSwitch.propTypes = {
  onChange: React.PropTypes.func.isRequired,
};


export class MarkdownTextarea extends Input {
  render() {
    const { value, showMarkdown } = this.props;
    if (!showMarkdown) return super.render();
    return (
      <MarkdownConvertor>{ value }</MarkdownConvertor>
    );
  }
}

MarkdownTextarea.propTypes = {
  showMarkdown: React.PropTypes.bool.isRequired,
};
