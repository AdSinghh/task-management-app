import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const INITIAL_ITEM_FORM = {
  title: "",
  description: "",
};
//formType: null | "add" | "update"
function TodoFormPopup({ formType, handleFormSubmit, handleClose ,initialFormData=null}) {
  const [itemForm, setItemForm] = useState( INITIAL_ITEM_FORM);
  useEffect(() => {
    if(initialFormData){
        setItemForm(initialFormData)
    }
  },[initialFormData])
  const handleItemForm = (e) => {
    setItemForm({
      ...itemForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // reset the form
    await handleFormSubmit(formType, { ...itemForm });
    setItemForm(INITIAL_ITEM_FORM);
  };
  if (!formType) return;
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-slate-300 border-solid border-slate-300 rounded-md px-10 py-8 relative">
        <RxCross1 className="text-xl absolute top-5 right-5 cursor-pointer" onClick={handleClose}/>
        <h3 className="text-3xl mb-10">
            {formType === "add" ?  "Add Item" : "Update Item"}
        </h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="todo" className="w-[90%]">
            <input
              type="text"
              name="title"
              id="todo"
              placeholder="Enter your next task"
              required
              onChange={handleItemForm}
              value={itemForm.title}
              className="bg-gray-800 text-white w-full h-[50px] outline-none border-none rounded-lg p-3 mb-4"
            />
          </label>
          <label htmlFor="todo" className="w-[90%]">
            <textarea
              type="text"
              name="description"
              id="todo"
              placeholder="Enter Task Description...."
              onChange={handleItemForm}
              className="bg-gray-800 text-white w-full h-[150px] outline-none border-none rounded-lg p-3"
              value={itemForm.description}
            >
            </textarea>
          </label>
          <button type="submit" className="bg-slate-900 px-10 py-3 text-white text-lg mt-5 mx-auto inline-block rounded-md">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default TodoFormPopup;
