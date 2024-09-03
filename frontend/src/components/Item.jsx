import React from "react";
import { MdDeleteSweep } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";

function Item({ item, handleItemUpdate, handleItemDelete, toggleItemState }) {
  return (
    <li
      id={item?._id}
      className="w-full border border-[#c2b39a] text-base text-white p-3 bg-gray-800 rounded-xl"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border-solid border-slate-400 border-[1px] flex justify-center items-center p-[1px] cursor-pointer"
            onClick={() => toggleItemState(item)}
          >
            {item.isDone && (
              <IoMdCheckmarkCircle className="text-3xl text-[#88ab33]" />
            )}
          </div>
          <h2 className={`text-xl line-clamp-3 ${item.isDone && "line-through"}`}>{item?.title}</h2>
        </div>
        <div className="flex gap-6 items-center">
          <button
            onClick={() => handleItemUpdate(item)}
            className="bg-transparent text-white border-none"
          >
            <span className="absolute clip-[rect(1px,1px,1px,1px)] p-0 border-0 h-[1px] w-[1px] overflow-hidden whitespace-nowrap">
              Edit
            </span>
            <FaEdit className="fill-[#c2b39a] text-2xl" />
          </button>
          <button
            onClick={() => handleItemDelete(item._id)}
            className="bg-transparent text-white border-none"
          >
            <span className="absolute clip-[rect(1px,1px,1px,1px)] p-0 border-0 h-[1px] w-[1px] overflow-hidden whitespace-nowrap">
              Delete
            </span>
            <MdDeleteSweep className="fill-[#c2b39a] text-2xl" />
          </button>
        </div>
      </div>
      {item?.description && <p className="mt-3">{item.description}</p>}
    </li>
  );
}

export default Item;
