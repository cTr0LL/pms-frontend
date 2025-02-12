/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { assignedUserToIssue } from "@/Redux/Issue/Action";

const UserList = ({ issueDetails }) => {
  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleIssueAssignee = (userId) => {
    dispatch(assignedUserToIssue({ issueId: issueDetails.id, userId }));
  };
  return (
    <>
      <div className="space-y-2">
        <div className="border rounded-md">
          <p className="py-2 px-3">
            {issueDetails.assignee?.fullName || "Unassigned"}
          </p>
        </div>
        {project.projectDetails?.team.map((item) => (
          <div
            onClick={() => handleIssueAssignee(item.id)}
            key={item}
            className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
          >
            <Avatar className="">
              <AvatarFallback className="group-hover:bg-gray-400">
                {item.fullName[0]}
              </AvatarFallback>
            </Avatar>
            <div className=" space-y-1">
              <p className="text-sm font-medium leading-none">
                {item.fullName}
              </p>
              <p className="text-xs text-muted-foreground">
                @{item.fullName?.toLowerCase().split(" ").join("_")}
              </p>
            </div>
          </div>
        ))}
        {/* ))} */}
      </div>
    </>
  );
};

export default UserList;
