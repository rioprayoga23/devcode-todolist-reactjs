import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { Check, ChevronLeft, Edit2, Plus } from "react-feather";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Empty from "../components/Empty";
import { AZ, Newest, Oldest, Sort, Unfinished, ZA } from "../components/Icon";
import ListTodo from "../components/ListTodo";
import ModalDelete from "../components/ModalDelete";
import ModalTodo from "../components/ModalTodo";
import http from "../helpers/http";

const Details = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const [tempData, setTempData] = useState({});
  const [onDelete, setOnDelete] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onOpenModal, setOnOpenModal] = useState(false);
  const [onAlert, setOnAlert] = useState(false);
  const [filter, setFilter] = useState("Terbaru");

  const [title, setTitle] = useState(activity.title || "");

  const getActivity = async () => {
    const { data } = await http().get(`/activity-groups/${id}`);
    setActivity(data);
    setTitle(data.title);
  };

  const updateActivityTitle = async () => {
    const { data } = await http().patch(`/activity-groups/${id}`, {
      title: title ? title : "New Activity",
    });
    setTitle(data.title);
    setOnEdit(false);
  };

  const onCLickTitle = () => {
    setOnEdit(true);
    setTimeout(() => document.getElementById("input-title").focus(), 1);
    return;
  };

  const addTodo = async ({ title, priority }) => {
    await http().post("todo-items", {
      title: title,
      activity_group_id: id,
      priority: priority,
    });
    setOnOpenModal(false);
    setTempData({});
    getTodos();
  };

  const getTodos = async () => {
    const { data } = await http().get(`/todo-items?activity_group_id=${id}`);
    setTodos(data.data);
  };

  const deleteTodo = async (id) => {
    await http().delete(`todo-items/${id}`);
    const data = todos.filter((e) => e.id !== id);
    setTodos(data);
    setOnAlert(true);
  };

  const updateTodo = async (id, title, priority) => {
    await http().patch(`todo-items/${id}`, {
      title: title,
      priority: priority,
    });
    setOnOpenModal(false);
    setTempData({});
    getTodos();
  };

  const handlerDeleteTodo = (id, title) => {
    setOnDelete(true);
    setTodo({ id, title, tag: "List Item" });
  };

  const handlerEditTodo = (id, title, priority) => {
    setTempData({
      id,
      title,
      priority,
    });
    setOnOpenModal(true);
  };

  const priority = [
    {
      item: "very-high",
      label: "Very High",
      color: "bg-[#ED4C5C]",
    },
    { item: "high", label: "High", color: "bg-[#F8A541]" },
    { item: "normal", label: "Medium", color: "bg-[#00A790]" },
    { item: "low", label: "Low", color: "bg-[#428BC1]" },

    {
      item: "very-low",
      label: "Very Low",
      color: "bg-[#8942C1]",
    },
  ];

  const filterTodos = React.useMemo(() => {
    let _todos = todos?.todo_items;

    if (filter === "Terbaru") {
      _todos = todos?.sort((a, b) => b.id - a.id);
    }
    if (filter === "Terlama") {
      _todos = todos?.sort((a, b) => a.id - b.id);
    }
    if (filter === "A - Z") {
      _todos = todos?.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (filter === "Z - A") {
      _todos = todos?.sort((a, b) => b.title.localeCompare(a.title));
    }
    if (filter === "Belum selesai") {
      _todos = todos?.sort((a, b) => b.is_active - a.is_active);
    }

    return _todos;
  }, [filter, todos]);

  const activityFilters = [
    {
      label: "Terbaru",
      icon: <Newest />,
      data: "sort-latest",
    },
    {
      label: "Terlama",
      icon: <Oldest />,
      data: "sort-oldest",
    },
    {
      label: "A - Z",
      icon: <AZ />,
      data: "sort-az",
    },
    {
      label: "Z - A",
      icon: <ZA />,
      data: "sort-za",
    },
    {
      label: "Belum selesai",
      icon: <Unfinished />,
      data: "sort-unfinished",
    },
  ];

  useEffect(() => {
    getActivity();
    getTodos();
  }, [id]);

  return (
    <div className="px-[180px]">
      <div className="flex items-center">
        <div className="flex items-center gap-5 flex-1">
          <Link data-cy="todo-back-button" to="/">
            <ChevronLeft size={40} />
          </Link>
          {onEdit ? (
            <input
              type="text"
              id="input-title"
              className="w-[70%] text-4xl font-extrabold bg-transparent border-b-2 border-black outline-none"
              value={title}
              onBlur={updateActivityTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1
              data-cy="todo-title"
              onClick={onCLickTitle}
              className="text-4xl font-extrabold"
            >
              {title}
            </h1>
          )}

          <div data-cy="todo-title-edit-button">
            <Edit2 color="#A4A4A4" />
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex gap-x-4">
            {todos.length > 0 && (
              <Listbox value={filter} onChange={(event) => setFilter(event)}>
                <div className="relative max-w-[205px] mt-1 z-10">
                  <Listbox.Button data-cy="todo-sort-button">
                    <Sort />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-[15rem] flex flex-col right-0 mt-1 rounded-md bg-white divide-y text-base shadow-lg ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                      {activityFilters.map((item) => {
                        return (
                          <Listbox.Option
                            value={item.label}
                            key={item.label}
                            data-cy="sort-selection"
                            onClick={() => setFilter(item.label)}
                          >
                            {({ selected }) => (
                              <div
                                className="flex justify-between gap-x-4 items-center p-[0.875rem] hover:bg-slate-50 cursor-pointer"
                                data-cy={item.data}
                              >
                                <div className="flex gap-x-4 items-center">
                                  {item.icon}
                                  <span className="text-base">
                                    {item.label}
                                  </span>
                                </div>
                                {selected && <Check />}
                              </div>
                            )}
                          </Listbox.Option>
                        );
                      })}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            )}
          </div>
          <button
            data-cy="todo-add-button"
            onClick={() => setOnOpenModal(true)}
            className="flex items-center bg-[#16ABF8] px-[25px] py-[13px] rounded-full gap-1 cursor-pointer"
          >
            <Plus size="25" color="white" />
            <span className="text-whitec text-lg text-white font-normal">
              Tambah
            </span>
          </button>
        </div>
      </div>

      {!todos.length ? (
        <Empty data="todo-empty-state" />
      ) : (
        <div className="flex flex-col gap-5 my-10">
          {filterTodos.map((todo) => (
            <ListTodo
              key={todo.id}
              todo={todo}
              getTodos={getTodos}
              handlerDeleteTodo={handlerDeleteTodo}
              handlerEditTodo={handlerEditTodo}
            />
          ))}
        </div>
      )}

      <ModalTodo
        isOpen={onOpenModal}
        setIsOpen={setOnOpenModal}
        priorities={priority}
        createTodo={addTodo}
        updateTodo={updateTodo}
        tempData={tempData}
        setTempData={setTempData}
      />

      <ModalDelete
        isOpen={onDelete}
        setIsOpen={setOnDelete}
        activity={todo}
        deleteActivity={deleteTodo}
      />
      <Alert isOpen={onAlert} setIsOpen={setOnAlert} />
    </div>
  );
};

export default Details;
