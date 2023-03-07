import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { onSort } from "../helpers/filter";
import { priority } from "../helpers/priority";

import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronLeft, Edit2, Plus } from "react-feather";

import Alert from "../components/Alert";
import Empty from "../components/Empty";
import ListTodo from "../components/ListTodo";
import ModalDelete from "../components/ModalDelete";
import ModalTodo from "../components/ModalTodo";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import { AZ, Newest, Oldest, Sort, Unfinished, ZA } from "../components/Icon";

import {
  activityApi,
  useGetOneActivityQuery,
  useUpdateActivityMutation,
} from "../lib/reducer/activityApi";
import {
  useCreateTodosMutation,
  useDeleteTodosMutation,
  useGetTodosQuery,
  useUpdateTodosTitleMutation,
} from "../lib/reducer/todosApi";

const Details = () => {
  const { id } = useParams();

  const [todo, setTodo] = useState({});
  const [tempData, setTempData] = useState({});
  const [onDelete, setOnDelete] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onOpenModal, setOnOpenModal] = useState(false);
  const [onAlert, setOnAlert] = useState(false);
  const [filter, setFilter] = useState("Terbaru");

  const [updateActivity] = useUpdateActivityMutation();
  const [createTodos] = useCreateTodosMutation();
  const [deleteTodos] = useDeleteTodosMutation();
  const [updateTodosTitle] = useUpdateTodosTitleMutation();
  const [title, setTitle] = useState("");

  const { data: todos, isLoading } = useGetTodosQuery(id);
  const { data: activity, refetch } = useGetOneActivityQuery(id);

  useEffect(() => {
    if (activity) {
      setTitle(activity?.title);
    }
    refetch();
  }, [activity]);

  const onCLickTitle = () => {
    setOnEdit(true);
    setTimeout(() => document.getElementById("input-title").focus(), 1);
    return;
  };

  const updateActivityTitle = async () => {
    updateActivity({ id, title });
    setOnEdit(false);
  };

  const addTodo = ({ title, priority }) => {
    createTodos({
      title: title,
      activity_group_id: id,
      priority: priority,
    });
    setTempData({});
  };

  const deleteTodo = async (id) => {
    deleteTodos(id);
    setOnAlert(true);
  };

  const updateTodo = async (id, title, priority) => {
    updateTodosTitle({
      id,
      title: title,
      priority: priority,
    });
    setOnOpenModal(false);
    setTempData({});
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

  const filterTodos = onSort(filter, todos?.data);

  return (
    <>
      <Header />
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
              {todos?.data.length > 0 && (
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

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : !todos?.data.length ? (
          <Empty data="todo-empty-state" />
        ) : (
          <div className="flex flex-col gap-5 my-10">
            {filterTodos?.map((item) => (
              <ListTodo
                key={item.id}
                todo={item}
                handlerDeleteTodo={handlerDeleteTodo}
                handlerEditTodo={handlerEditTodo}
              />
            ))}
          </div>
        )}

        <ModalTodo
          onOpenModal={onOpenModal}
          setOnOpenModal={setOnOpenModal}
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
          deleteActivityAction={deleteTodo}
        />
        <Alert isOpen={onAlert} setIsOpen={setOnAlert} />
      </div>
    </>
  );
};

export default Details;
