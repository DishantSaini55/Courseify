import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import "./App.css";
import { UserCourses } from "./components/UserCourses/UserCourses";
import { AdminCourses } from "./components/AdminCourses/AdminCourses";
import { Landing } from "./components/LandingPage/Landing";
import { CreateCourse } from "./components/CreateCourse/CreateCourse";
import { EditCourse } from "./components/EditCourse/EditCourse";
import { RecoilRoot } from "recoil";
import { UserPurchasedCourses } from "./components/userPurchasedCourses/userPurchasedCourses";

function App() {
  return (
    <div className="app">
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            
            <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
            <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

            {/* Protected User Routes */}
            <Route path="/users/courses" element={
              <>
                <SignedIn><UserCourses /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
            } />
            <Route path="/users/purchasedCourses" element={
              <>
                <SignedIn><UserPurchasedCourses /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
            } />

            {/* Protected Admin Routes */}
            <Route path="/admin/courses" element={
              <>
                <SignedIn><AdminCourses /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
            } />
            <Route path="/courses/:courseId" element={
              <>
                <SignedIn><EditCourse /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
            } />
            <Route path="/admin/createCourse" element={
              <>
                <SignedIn><CreateCourse /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
            } />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
