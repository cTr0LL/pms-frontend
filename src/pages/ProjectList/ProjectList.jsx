/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  MixerHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { tags } from "./filterData";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProjectCard from "../Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "@/Redux/Project/Action";
import { getUser } from "@/Redux/Auth/Action";

const ProjectList = () => {
  const [keyword, setKeyword] = useState("");
  const { project, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log("project list-------- ", project);

  const handleFilterCategory = (value) => {
    if (value === "all") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ category: value }));
    }
    console.log(value);

    //   if (value === "all") {
    //     searchParams.delete(section);
    //   } else {
    //     searchParams.set(section, value);
    //   }
    //   const query = searchParams.toString();
    //   navigate({ search: query ? `?${query}` : "" });
  };

  const handleFilterTags = (value) => {
    if (value === "all") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ tag: value }));
    }

    console.log(value);

    //   if (value === "all") {
    //     searchParams.delete(section);
    //   } else {
    //     searchParams.set(section, value);
    //   }
    //   const query = searchParams.toString();
    //   navigate({ search: query ? `?${query}` : "" });
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value));
  };

  console.log("searchProjects:", project.searchProjects);
  console.log("projects:", project.projects);
  return (
    <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
      <section className="hidden lg:block">
        <Card className="p-5 sticky top-10">
          <div className="flex justify-between lg:w-[20rem]">
            <p className="text-xl tracking-wider">filters</p>
            <Button variant="ghost" size="icon">
              <MixerHorizontalIcon />
            </Button>
          </div>

          <CardContent className="mt-5 ">
            <ScrollArea className="space-y-7 h-[70vh]">
              <div>
                <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                <div className="pt-5">
                  <RadioGroup
                    onValueChange={(value) => handleFilterCategory(value)}
                    className="space-y-3"
                    defaultValue="all"
                    //   defaultValue={category || "all"}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="r1" />
                      <Label htmlFor="r1">all</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fullstack" id="r2" />
                      <Label htmlFor="r1">full stack</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="frontend" id="r3" />
                      <Label htmlFor="r2">frontend</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="backend" id="r4" />
                      <Label htmlFor="r3">backend</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="pt-9">
                <h1 className="pb-3 text-gray-400 border-b">Tags</h1>

                <RadioGroup
                  onValueChange={(value) => handleFilterTags(value)}
                  className="space-y-3 pt-5"
                  defaultValue="all"
                  //   defaultValue={tag || "all"}
                >
                  {tags.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <RadioGroupItem value={item} id={`r-${item}`} />
                      <Label htmlFor={`r-${item}`}>{item}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>
      <section className="w-full lg:w-[48rem]">
        <div className="flex gap-2 items-center pb-5 justify-between">
          <div className="relative p-0 w-full">
            <Input
              className="w-[40%] rounded-fulls px-9"
              placeholder="search project..."
              onChange={handleSearchChange}
            />
            <MagnifyingGlassIcon className="absolute top-3 left-4" />
          </div>
        </div>
        <div>
          <div className="space-y-5 min-h-[74vh]">
            {keyword
              ? project.searchProjects.map((item) => (
                  <ProjectCard item={item} key={item.id} />
                ))
              : project.projects.map((item) => (
                  <ProjectCard key={item.id + 1} item={item} />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectList;
