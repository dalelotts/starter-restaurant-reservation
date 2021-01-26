import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import ReservationCreate from "../reservations/ReservationCreate";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import useQuery from "../utils/useQuery";
import { today } from "../utils/dates";

function Routes() {
  const query = useQuery();

  return (
    <Switch>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/new">
        <ReservationCreate />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={query.get("date") || today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
