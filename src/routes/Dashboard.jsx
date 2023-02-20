import React, { useEffect, useState } from "react";
import { Plus } from "react-feather";
import http from "../helpers/http";

import Empty from "../components/Empty";
import ModalDelete from "../components/ModalDelete";
import TodoItem from "../components/TodoItem";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({});
  const [onDelete, setOnDelete] = useState(false);
  const [onAlert, setOnAlert] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAllActivity = async () => {
    const { data } = await http().get(
      "/activity-groups?email=rioprayoga23@gmail.com"
    );
    setActivities(data.data);
    setIsLoading(false);
  };

  const addActivity = async () => {
    await http().post("/activity-groups", {
      title: "New Activity",
      email: "rioprayoga23@gmail.com",
    });
    setIndicator(!indicator);
  };

  const deleteActivity = async (id) => {
    await http().delete(`activity-groups/${id}`);
    setActivities(activities.filter((item) => item.id !== id));
    setOnAlert(true);
  };

  useEffect(() => {
    getAllActivity();
  }, [indicator]);

  return (
    <div className="px-[180px]">
      <div className="flex justify-between mb-[55px] items-center">
        <h1 data-cy="activity-title" className="text-4xl font-extrabold">
          Activity
        </h1>
        <button
          data-cy="activity-add-button"
          onClick={addActivity}
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
      ) : !activities.length ? (
        <Empty dashboard={true} data="activity-empty-state" />
      ) : (
        <div className="grid grid-cols-4 gap-4 pb-[43px]">
          {activities.map((item) => (
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
        deleteActivity={deleteActivity}
      />

      <Alert isOpen={onAlert} setIsOpen={setOnAlert} />
    </div>
  );
};

export default Dashboard;
