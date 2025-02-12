import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import "./Auth.css";

export const Auth = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="loginContainer">
      <div className="box h-[30rem] w-[25rem] ">
        <div className="minContainer login ">
          <div className="loginBox w-full px-10 space-y-5">
            {active ? <Signup /> : <Login />}

            <div className="flex items-center justify-center">
              <span>already have account ? </span>
              <Button onClick={() => setActive(!active)} variant="ghost">
                {active ? "signin" : "signup"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
