import React, { useState } from "react";

import { Plus } from "react-feather";

import Empty from "../components/Empty";
import ModalDelete from "../components/ModalDelete";
import TodoItem from "../components/TodoItem";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Header from "../components/Header";

import {
  useCreateActivityMutation,
  useDeleteActivityMutation,
  useGetActivityQuery,
} from "../lib/reducer/activityApi";

const Dashboard = () => {
  const [activity, setActivity] = useState({});
  const [onDelete, setOnDelete] = useState(false);
  const [onAlert, setOnAlert] = useState(false);

  const { data: activities, isLoading } = useGetActivityQuery();
  const [createActivity] = useCreateActivityMutation();
  const [deleteActivity] = useDeleteActivityMutation();

  const AddActivityHandle = () => {
    createActivity({ title: "New Activity", email: "rioprayoga23@gmail.com" });
  };

  const deleteActivityAction = async (id) => {
    deleteActivity(id);
    setOnAlert(true);
  };

  return (
    <>
      <Header />
      <div className="px-[180px]">
        <div className="flex justify-between mb-[55px] items-center">
          <h1 data-cy="activity-title" className="text-4xl font-extrabold">
            Activity
          </h1>
          <button
            data-cy="activity-add-button"
            onClick={AddActivityHandle}
            className="flex items-center bg-[#16ABF8] px-[25px] py-[13px] rounded-full gap-1 cursor-pointer"
          >
            <Plus size="25" color="white" />
            <span className="text-whitec text-lg text-white font-normal">
              Tambah
            </span>
          </button>
        </div>

        {isLoading ? (
          <div className="w-full flex justify-center">
            <Spinner />
          </div>
        ) : !activities?.data.length ? (
          <Empty dashboard={true} data="activity-empty-state" />
        ) : (
          <div className="grid grid-cols-4 gap-4 pb-[43px]">
            {activities?.data.map((item) => (
              <TodoItem
                key={item.id}
                activities={item}
                setOnDelete={setOnDelete}
                setActivity={setActivity}
              />
            ))}
          </div>
        )}

        <ModalDelete
          isOpen={onDelete}
          setIsOpen={setOnDelete}
          activity={activity}
          deleteActivityAction={deleteActivityAction}
        />

        <Alert isOpen={onAlert} setIsOpen={setOnAlert} />
      </div>
    </>
  );
};

export default Dashboard;
