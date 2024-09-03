import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";

const INITIAL_ITEM_FORM = {
  title: "",
  description: "",
};

function Form({ addItem }) {
  const [itemForm, setItemForm] = useState(INITIAL_ITEM_FORM);

  const handleItemForm = (e) => {
    setItemForm({
      ...itemForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add the new item and reset the form
    await addItem({ ...itemForm });
    setItemForm(INITIAL_ITEM_FORM);
  };

  return (
    <form
      className="flex items-center self-center w-[97%] max-w-[455px] gap-3 mt-[38px]"
      onSubmit={handleSubmit}
    >
      <label htmlFor="todo" className="w-[90%]">
        <input
          type="text"
          name="title"
          id="todo"
          placeholder="Write your next task"
          onChange={handleItemForm}
          value={itemForm.title}
          className="bg-gray-800 text-white w-full h-[50px] outline-none border-none rounded-lg p-3"
        />
      </label>
      <button className="w-[10%] h-[50px] rounded-lg bg-green-600 flex justify-center items-center relative">
        <span className="absolute clip-[rect(1px,1px,1px,1px)] p-0 border-0 h-[1px] w-[1px] overflow-hidden whitespace-nowrap">
          Submit
        </span>
        <IoAddCircle className="text-xl" />
      </button>
    </form>
  );
}

export default Form;
