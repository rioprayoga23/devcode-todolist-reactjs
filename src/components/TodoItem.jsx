import React from "react";
import { Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";

const TodoItem = ({ activities, setOnDelete, setActivity }) => {
  const navigate = useNavigate();

  const handlerDelete = () => {
    setActivity({
      id: activities.id,
      title: activities.title,
      tag: "activity",
    });
    setOnDelete(true);
  };

  const handlerDetail = () => {
    navigate(`/detail/${activities.id}`);
  };

  const convertDate = new Date(activities.created_at);

  return (
    <div
      data-cy="activity-item"
      className="bg-[#FFFFFF] rounded-[12px] shadow-lg p-[25px]"
    >
      <div
        onClick={handlerDetail}
        className="flex flex-col h-[180px] w-[full] justify-between cursor-pointer"
      >
        <h1 data-cy="activity-item-title" className="font-bold text-lg">
          {activities.title}
        </h1>
      </div>
      <div className="mt-auto flex justify-between">
        <p
          data-cy="activity-item-date"
          className="text-sm text-[#888888]"
        >{`${convertDate.getDate()} ${convertDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}`}</p>
        <button data-cy="activity-item-delete-button" onClick={handlerDelete}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
