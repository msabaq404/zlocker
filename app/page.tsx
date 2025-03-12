"use client";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Form from "../components/form";
import Table from "../components/table";
import Info from "../components/info";
import { supabase } from "../lib/supabase";
import { Button, CircularProgress } from "@mui/material";
import { getUserData } from "@/lib/myutils";

export default function Home() {
  const [isContributor, setIsContributor] = React.useState(false);
  const [justRegistered, setJustRegistered] = React.useState(false);
  const [wannaContribute, setWannaContribute] = React.useState(false);
  const [wannaLogin, setWannaLogin] = React.useState(false);

  const onStatusChange = () => {
    if (wannaContribute) {
      setWannaContribute(false);
    } else {
      setJustRegistered(true);
    }
  };

  const wantToContribute = () => {
    setWannaContribute(true);
  };

  const isContributorCheck = async (isContributor: boolean = false) => {
    if (isContributor) {
      setIsContributor(true);
      setJustRegistered(false);
      return;
    }

    if (document.cookie) {
      const cookie = JSON.parse(getUserData(document.cookie));
      if (
        cookie.userId &&
        cookie.entry &&
        cookie.fav_letter &&
        cookie.fav_number
      ) {
        const { data } = await supabase
          .from("Contributors")
          .select()
          .eq("id", cookie.userId)
          .eq("entry", cookie.entry)
          .eq("fav_letter", cookie.fav_letter)
          .eq("fav_number", cookie.fav_number);

        if (data) {
          setIsContributor(true);
          setJustRegistered(false);
          setWannaLogin(false);
        }
      }
    }
  };

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkContributor = async () => {
      await isContributorCheck();
      setIsLoading(false);
    };
    checkContributor();
  }, []);

  return (
    <div className="container">
      <a href="/">
        <h1 className="logo">ZLocker</h1>
      </a>

      {isLoading ? (
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <>
          
            <div className="buttonbox">
            {isContributor ? 
              <button className="mybutton" onClick={wantToContribute}>Contribute</button> :
              <button className="mybutton" onClick={() => setWannaLogin(true)} >Access Lockers</button>
              }
            </div>

          {justRegistered || wannaLogin ? (
            <Info wannaLogin={wannaLogin} makeContributor={isContributorCheck} />
          ) : null}

          {(!isContributor && !justRegistered && !wannaLogin) || wannaContribute ? (
            <Form
              wannaContribute={wannaContribute}
              onStatusChange={onStatusChange}
            />
          ) : null}

          {isContributor && !wannaContribute ? <Table /> : null}
        </>
      )}
    </div>
  );
}
