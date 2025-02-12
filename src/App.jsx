/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import IssueDetails from "./pages/IssueDetails/IssueDetails";
import Subscription from "./pages/Subscription/Subscription";
import { Auth } from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import { fetchProjects } from "./Redux/Project/Action";
import UpgradeSuccess from "./pages/Subscription/UpgradeSuccess";
import AcceptInvitation from "./pages/Project/AcceptInvitation";

function App() {
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);
  // useEffect(() => {
  //   dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
  //   dispatch(getUserSubscription(auth.jwt || localStorage.getItem("jwt")));
  // }, [auth.jwt]);
  console.log("before getuser");
  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProjects({}));
  }, [auth.jwt]);

  console.log("Auth here" + auth.user);

  return (
    <>
      {auth.user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/project/:id" element={<ProjectDetails />}></Route>
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            ></Route>
            <Route path="/upgrade_plan" element={<Subscription />}></Route>
            <Route
              path="/upgrade_plan/success"
              element={<UpgradeSuccess />}
            ></Route>
            <Route path="/accept_invitation" element={<AcceptInvitation/>}></Route>
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
