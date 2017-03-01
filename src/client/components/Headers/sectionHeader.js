import React from 'react';
import { Input, Icon } from 'antd';
import SortMenu from './menuSection';

const Section = ({ secName = 'Tags' }) =>
  <div>
    <Icon type="tags-o" />
    {secName}
  </div>
;

const Search = Input.Search;

const SearchBar = () =>
  <Search
    placeholder="input search text"
    style={{ width: 200 }}
    onSearch={value => console.log(value)}
  />
;

const Sort = () =>
  <div>
  </div>
;

const Tools = () =>
  <div>
    <SortMenu />
    <BookMark />
    <Reload />
  </div>
;

const SectionsHeader = ({ action, secName }) =>
  <div>
    <Section secName={secName} />
    <SearchBar />
    <Tools />
  </div>
;