import React, { useState } from "react";
import { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { connect } from "react-redux";
import action from "../redux/action";
import { useCallback } from "react";

const mapStateToProps = state => {
  return {
    searchTime: state.searchTime,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchTime: time => dispatch(action.setSearchTime(time)),
  };
};

const Search = ({ options, setSearchTime, searchTime }) => {
  const overrideStrings = {
    allItemsAreSelected: "전체",
    clearSearch: "Clear Search",
    clearSelected: "Clear Selected",
    noOptions: "No options",
    search: "검색",
    selectAll: "모두 선택",
    selectAllFiltered: "전체",
    selectSomeItems: "전체",
    create: "Create",
  };
  const [selected, setSelected] = useState([]);

  const set = useCallback(async () => {
    let selectedArray = [];
    selected.forEach(ele => (selectedArray = [...selectedArray, ele.value]));
    setSearchTime(selectedArray);
  }, [selected]);

  useEffect(() => {
    set();
  }, [set]);

  return (
    <div>
      <pre>{JSON.stringify(selected).value}</pre>
      <MultiSelect
        className=""
        options={options}
        value={selected}
        onChange={setSelected}
        hasSelectAll={true}
        labelledBy="select"
        ClearSelectedIcon={""}
        overrideStrings={overrideStrings}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
