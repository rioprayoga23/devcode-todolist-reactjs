import React from "react";
import dashboardEmpty from "../assets/dashboard-empty.svg";
import activityEmpty from "../assets/todo-empty-state.svg";

const Empty = ({ dashboard, data }) => {
  return (
    <div data-cy={data} className="w-full flex justify-center">
      {dashboard ? <img src={dashboardEmpty} /> : <img src={activityEmpty} />}
    </div>
  );
};

export default Empty;
