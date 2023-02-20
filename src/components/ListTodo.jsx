import clsx from "clsx";
import React, { useState } from "react";
import { Edit2, Trash2 } from "react-feather";
import http from "../helpers/http";

const ListTodo = ({ todo, getTodos, handlerDeleteTodo, handlerEditTodo }) => {
  const iconPriority = clsx("rounded-full w-3 h-3", {
    "bg-[#ED4C5C]": todo.priority === "very-high",
    "bg-[#F8A541]": todo.priority === "high",
    "bg-[#00A790]": todo.priority === "normal",
    "bg-[#428BC1]": todo.priority === "low",
    "bg-[#8942C1]": todo.priority === "very-low",
  });

  const [checked, setChecked] = useState(todo.is_active === 1 ? false : true);
  return (
    <div
      className="flex w-full bg-white p-7 rounded-lg shadow-lg items-center"
      key={todo.id}
    >
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          data-cy="todo-item-checkbox"
          defaultChecked={checked}
          value={todo.id}
          className="w-5 h-5 cursor-pointer"
          onChange={async (e) => {
            setChecked(!checked);
            await http().patch(`todo-items/${e.target.value}`, {
              is_active: todo.is_active === 1 ? false : true,
            });
            getTodos();
          }}
        />
        <div
          data-cy="todo-item-priority-indicator"
          className={iconPriority}
        ></div>
        <p
          data-cy="todo-item-title"
          className={clsx(checked && "line-through", "text-lg")}
        >
          {todo.title}
        </p>
        <button
          data-cy="todo-item-edit-button"
          onClick={() => handlerEditTodo(todo.id, todo.title, todo.priority)}
        >
          <Edit2 size={18} />
        </button>
      </div>
      <button
        data-cy="todo-item-delete-button"
        onClick={() => handlerDeleteTodo(todo.id, todo.title)}
      >
        <Trash2 />
      </button>
    </div>
  );
};

export default ListTodo;
