import React from 'react';
import Item from './Item';

function TodoList({ todos, handleItemUpdate, handleItemDelete, toggleItemState }) {
  return (
    <ol className="self-center flex flex-col items-center my-7 gap-7 w-full">
      {todos && todos.length > 0 ? (
        todos.map((item, index) => (
          <Item
            key={index}
            item={item}
            handleItemDelete={handleItemDelete}
            handleItemUpdate={handleItemUpdate}
            toggleItemState={toggleItemState}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">Seems lonely in here, what are you up to?</p>
      )}
    </ol>
  );
}

export default TodoList;
