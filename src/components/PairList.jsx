import './App.css';
// import React, { useState } from "react";
import { Input, List } from "antd";
const PairList = ({ pairs, onChange }) => {
  const handleTaskChange = (index, task) => {
    const newPairs = [...pairs];
    newPairs[index].task = task;
    onChange(newPairs);
  };

  return (
    <List
      dataSource={pairs}
      renderItem={(pair, index) => (
        <List.Item>
          {pair.students[0].firstName} {pair.students[0].lastName} et {pair.students[1].firstName}{" "}
          {pair.students[1].lastName}
          <Input placeholder="Attribuer une tâche" value={pair.task} onChange={(e) => handleTaskChange(index, e.target.value)} />
        </List.Item>
      )}
    />
  );
};

export default PairList;