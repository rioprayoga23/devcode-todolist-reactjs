import React from "react";
import { Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";

const TodoItem = ({ activities, setOnDelete, setActivity }) => {
  const navigate = useNavigate();

  const handlerDelete = (e) => {
    setActivity({
      id: activities.id,
      title: activities.title,
      tag: "activity",
    });
    setOnDelete(true);
    e.stopPropagation();
  };

  const handlerDetail = (e) => {
    navigate(`/detail/${activities.id}`);
    e.stopPropagation();
  };

  const convertDate = new Date(activities.created_at);

  return (
    <div
      data-cy="activity-item"
      onClick={handlerDetail}
      className="flex flex-col h-[234px] w-[235px] justify-between p-[25px] rounded-[12px] shadow-lg cursor-pointer bg-[#FFFFFF] aspect-square"
    >
      <h1 data-cy="activity-item-title" className="font-bold text-lg">
        {activities.title}
      </h1>
      <div className="flex justify-between items-center text-[#888888]">
        <span data-cy="activity-item-date" className="text-[14px]">
          {`${convertDate.getDate()} ${convertDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}`}
        </span>
        <button data-cy="activity-item-delete-button" onClick={handlerDelete}>
          <Trash2 color="#888888" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;