/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import { fetchProjectById } from "@/Redux/Project/Action";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { project } = useSelector((store) => store);

  const handleProjectInvitation = () => {
    //    dispatch(inviteToProject({ email: "", projectId: id }));
  };

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);

  return (
    <>
      <div className="mt-5 lg:px-10 ">
        <div className="lg:flex gap-5 justify-between pb-4">
          <ScrollArea className="h-screen lg:w-[69%] pr-2">
            <div className="text-gray-400 pb-10 w-full">
              <h1 className="text-lg font-semibold pb-5">
                {project.ProjectDetails?.name}
              </h1>
              <div className="space-y-5 pb-10 text-sm">
                <p className="w-full md:max-w-lg lg:max-w-xl">
                  {project.ProjectDetails?.description}
                </p>
                <div className="flex">
                  <p className="w-36">Project Lead : </p>
                  <p>{project.projectDetails?.owner.fullName}</p>
                </div>
                <div className="flex">
                  <p className="w-36">Members : </p>
                  <div className="flex items-center gap-2">
                    {project.projectDetails?.team.map((item) => (
                      <Avatar className={`cursor-pointer`} key={item}>
                        <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div>
                    <Dialog>
                      <DialogTrigger>
                        <DialogClose>
                          <Button
                            size="sm"
                            variant="outline"
                            className="ml-2"
                            onClick={handleProjectInvitation}
                          >
                            {" "}
                            <span className="pr-1">invite</span>
                            <PlusIcon className="w-3 h-3" />
                          </Button>
                        </DialogClose>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Invite User</DialogTitle>
                        </DialogHeader>
                        <InviteUserForm
                        // projectId={id}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="flex">
                  <p className="w-36">Category : </p>
                  <p>{project.projectDetails?.category}</p>
                </div>
                <div className="flex">
                  <p className="w-36">Status : </p>
                  <Badge>cTr0LL</Badge>
                </div>
              </div>
              <section>
                <p className="py-5 border-b text-lg tracking-wider">Tasks</p>
                <div className="lg:flex md:flex gap-3 justify-between py-5">
                  <IssueList status="pending" title={"Todo List"} />

                  <IssueList status="in_progress" title={"In Progress"} />

                  <IssueList status="done" title={"Done"} />
                </div>
              </section>
            </div>
          </ScrollArea>
          <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
