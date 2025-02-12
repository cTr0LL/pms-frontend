/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useDispatch } from "react-redux";
import { createComment } from "@/Redux/Comment/Action";

const CreateCommentForm = ({ issueId }) => {

const dispatch = useDispatch();

  const form = useForm({
    //   resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = (data) => {
    console.log("comment data ", data);
    dispatch(createComment({ content: data.content, issueId }));
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2">
                <div>
                  <Avatar>
                    <AvatarFallback>
                      {/* {auth.user.fullName[0].toUpperCase()} */}C
                    </AvatarFallback>
                  </Avatar>
                </div>

                <FormControl>
                  <Input
                    className="w-[20rem]"
                    placeholder="add a comment..."
                    {...field}
                  />
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">save</Button>
      </form>
    </Form>
  );
};

export default CreateCommentForm;
