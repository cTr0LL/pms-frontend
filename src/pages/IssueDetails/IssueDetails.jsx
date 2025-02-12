/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issue/Action";
import { fetchComments } from "@/Redux/Comment/Action";

const IssueDetails = () => {
  const dispatch = useDispatch();
  const { projectId, issueId } = useParams();
  const { issue, comment } = useSelector((store) => store);

  const handleUpdateIssueStatus = (value) => {
    dispatch(updateIssueStatus({ id: issueId, status: value }));
    console.log("Update Issue Status triggered");
  };

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  }, [issueId]);

  return (
    <div className="px-20 py-8 text-gray-400">
      <div className="flex justify-between border p-10 rounded-lg">
        <ScrollArea className="h-[80vh] w-[60%] ">
          <div className="">
            <h1 className="text-lg font-semibold text-gray-400">
              {issue.issueDetails?.title}
            </h1>
            <div className="py-5">
              <h2 className="font-semibold text-gray-400">Description</h2>
              <p className="text-gray-400 text-sm mt-3">
                {issue.issueDetails?.description}
              </p>
            </div>
            <div className="mt-5">
              <h1 className="pb-3">Activity</h1>
              <Tabs defaultValue="comments" className="w-[400px]">
                <TabsList className="mb-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  All tab: Make changes to your account here.
                </TabsContent>
                <TabsContent value="comments">
                  <CreateCommentForm issueId={issueId} />
                  <div className="mt-8 space-y-6">
                    {/* {comment.comments.map((item, index) => (
                      <CommentCard item={item} key={index} />
                    ))} */}
                    {comment.comments.map((item) => (
                      <CommentCard key={item} item={item}/>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  History: Change your password here.
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full lg:w-[30%] space-y-2">
          <Select onValueChange={handleUpdateIssueStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={
                  issue.issueDetails?.status === "in_progress"
                    ? "In Progress"
                    : issue.issueDetails?.status === "pending"
                    ? "To Do"
                    : issue.issueDetails?.status === "done"
                    ? "Done"
                    : issue.issueDetails?.status
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          <div className="border rounded-lg">
            <p className="border-b py-3 px-5">Details</p>

            <div className="p-5">
              <div className="space-y-7">
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Assignee</p>
                  {issue.issueDetails?.assignee ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 text-xs">
                        <AvatarFallback>
                          {issue.issueDetails?.assignee?.fullName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p>{issue.issueDetails?.assignee?.fullName}</p>
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Labels</p>
                  None
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Status</p>
                  <Badge
                    className={`${
                      issue.issueDetails?.status == "in_progress"
                        ? "bg-orange-300"
                        : issue.issueDetails?.status == "done"
                        ? "bg-green-500"
                        : ""
                    }`}
                  >
                    {issue.issueDetails?.status === "in_progress"
                      ? "In Progress"
                      : issue.issueDetails?.status === "pending"
                      ? "To Do"
                      : issue.issueDetails?.status === "done"
                      ? "Done"
                      : issue.issueDetails?.status}
                  </Badge>
                </div>

                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Realese</p>
                  <div className="flex items-center gap-3">2025-01-22</div>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Reporter</p>
                  {issue.issueDetails?.assignee ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 text-xs">
                        <AvatarFallback>C</AvatarFallback>
                      </Avatar>
                      <p>cTr0LL</p>
                    </div>
                  ) : (
                    <div>-</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
