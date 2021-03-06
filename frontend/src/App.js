// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetail from "./components/SpotDetails/SpotDetails";

import SpotBrowser from "./components/SpotBrowser/SpotBrowser";
import SpotForm from "./components/SpotForm/SpotForm";
import { getSpot } from "./store/spot";
import AboutFooter from "./components/AboutFooter";
import { getAllBookings, getUserBookings } from "./store/booking";
import UserBookings from "./components/UserBookings";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state?.session?.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getSpot())
    // dispatch(getAllBookings)
    // dispatch(getUserBookings(sessionUser?.id))
  }, [dispatch]);

  return (
    <>
      <AboutFooter />
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>

          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route path="/lairs">
            <SpotBrowser />
          </Route>

          <Route path={`/lair/:id`}>
            <SpotDetail />
          </Route>

          <Route path="/new">
            <SpotForm />
          </Route>

          <Route path={`/bookings`}>
            <UserBookings />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
