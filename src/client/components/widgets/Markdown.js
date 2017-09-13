import React from 'react';
import Remarkable from 'remarkable';
import styled from 'styled-components';
import { Switch, Input } from 'antd';
import { themeColors } from '../../utils/colors';

const convertor = new Remarkable('full');

const StyledMarkdown = styled.div`

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
    <span style={{ color: themeColors.secondary, fontSize: '0.9em', marginRight: '8px' }}>preview</span>
    <Switch size="small" onChange={onChange} />
  </div>
);

MarkdownSwitch.propTypes = {
  onChange: React.PropTypes.func.isRequired,
};

export class MarkdownTextarea extends React.Component {
  state = { showMarkdown: false };

  handleMarkdownSwitch = () => this.setState({ showMarkdown: !this.state.showMarkdown });

  handleChange = (event) => {
    const { onChange } = this.props;
    const value = event.target.value;
    this.setState({ value });
    event.preventDefault();
    onChange && onChange(event);
  }

  componentWillMount(){
    const { value } = this.props;
    this.setState({ value });
  }

  getWriter = () => {
    const { showMarkdown, value, ...props } = this.props;
    const localValue = this.state.value;
    return <Input {...props} type='textarea' value={localValue} onChange={this.handleChange} />;
  }

  getReader = () => {
    const { value } = this.state;
    return <MarkdownConvertor>{value}</MarkdownConvertor>
  }

  getWidget = () => {
    const { showMarkdown } = this.state;
    return showMarkdown ? this.getReader() : this.getWriter();
  }

  render() {
    return (
      <div>
        {this.getWidget()}
        <MarkdownSwitch onChange={this.handleMarkdownSwitch} />
      </div>
    );
  }
}

MarkdownTextarea.propTypes = {
  showMarkdown: React.PropTypes.bool,
};
