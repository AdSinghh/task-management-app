import React, { useContext, useEffect, useState } from "react";
import Form from "../components/Form";
import TODOHero from "../components/TodoHero";
import TODOList from "../components/TodoList";

import {
  addTodoItem,
  deleteTodoItem,
  getTodoList,
  updateTodoItem,
} from "../clients/todo.client";
import { AuthContext } from "../context/auth.context";
import TodoFormPopup from "../components/todo-form-popup";
import toast from "react-hot-toast";

function DashboardPage() {
  const [items, setItem] = useState([]);
  const [formType, setFormType] = useState(null);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  const auth = useContext(AuthContext);

  useEffect(() => {
    syncItems();
  }, []);

  const closePopupForm = () => {
    setFormType(null);
    setItemToUpdate(null);
  };
  const handleFormSubmit = async (formType, item) => {
    try {
      if (formType === "add") {
        await addTodoItem(auth.token, item);
      }
      if (formType === "update") {
        await updateTodoItem(auth.token, item);
      }
      await syncItems();
      closePopupForm();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const syncItems = async () => {
    const list = await getTodoList(auth.token);
    setItem(list);
  };

  const handleItemUpdate = async (item) => {
    setItemToUpdate(item);
    setFormType("update");
  };

  const handleItemDelete = async (itemId) => {
    try {
      await deleteTodoItem(auth.token, itemId);
      await syncItems();
    } catch (e) {
      toast.error(e.message);
    }
  };
  const toggleItemState = async (item) => {
    try {
      await updateTodoItem(auth.token, {
        ...item,
        isDone: !item.isDone,
      });
      await syncItems();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="min-h-lvh  bg-gray-700">
      <div className="flex flex-col items-center justify-center min-h-screen w-[90%] max-w-[455px] m-auto">
        <TODOHero
          todos_completed={items.filter((item) => !!item.isDone).length}
          total_todos={items.length}
        />
        <button
          className="px-10 py-4 border-none bg-slate-900 text-white text-lg rounded-lg mt-10 w-full"
          onClick={() => setFormType("add")}
        >
          Add Item
        </button>
        <TODOList
          todos={items}
          handleItemDelete={handleItemDelete}
          handleItemUpdate={handleItemUpdate}
          toggleItemState={toggleItemState}
        />
        <TodoFormPopup
          formType={formType}
          handleFormSubmit={handleFormSubmit}
          initialFormData={itemToUpdate}
          handleClose={closePopupForm}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
