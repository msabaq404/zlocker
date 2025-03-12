"use client";

import * as React from "react";
import Entry from "./entry";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { supabase } from "../lib/supabase";

import Fav from "./fav";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#663399"),
  backgroundColor: "#663399",
  "&:hover": {
    backgroundColor: "#683898",
  },
}));

interface InfoProps {
  makeContributor: (value: boolean) => void;
  wannaLogin: boolean;
}

interface InfoState {
  0: string;
  1: string;
  2: string;
  length: number;
}

export default function Info(props: InfoProps) {
  const [info, setInfo] = React.useState<InfoState>(["", "", ""] as InfoState);

  const sendInfo = async () => {
    if (info[0] === "") {
      alert(
        props.wannaLogin
          ? "Enter your entry key"
          : "Set your entry key that you will use to access the locker"
      );
      return;
    } else if (info[1] === "" || info[2] === "") {
      alert("So, you won't tell us your fav letter and number? 😢");
      return;
    }

    if (!props.wannaLogin) {
      const userId = localStorage.getItem("userId");

      const { error: e1 } = await supabase
        .from("Contributors")
        .update([
          {
            id: userId,
            entry: info[0],
            fav_letter: info[1],
            fav_number: info[2],
          },
        ])
        .eq("id", userId);

      if (e1) {
        alert("We screwed up!");
      } else {
        document.cookie = `userData={"userId" : "${userId}", "entry" : "${info[0]}", "fav_letter" : "${info[1]}", "fav_number" : "${info[2]}"}; max-age=88888888; Secure; SameSite=Strict`;
        props.makeContributor(true);
      }
    } else {
      const { data, error: e1 } = await supabase
        .from("Contributors")
        .select()
        .eq("entry", info[0])
        .eq("fav_letter", info[1])
        .eq("fav_number", info[2]);

      if (e1) {
        alert("We screwed up!");
      } else if (data) {
        document.cookie = `userData={"userId" : "${data[0].id}", "entry" : "${info[0]}", "fav_letter" : "${info[1]}", "fav_number" : "${info[2]}"}; max-age=88888888; Secure; SameSite=Strict`;
        props.makeContributor(true);
      } else {
        alert("Not a contributor");
      }
    }
  };

  const onEntryChange = (entry: string) => {
    setInfo((k) => [entry, k[1], k[2]] as InfoState);
  };

  const onFavChange = (fav: Array<string>) => {
    setInfo((k) => [k[0], fav[0], fav[1]] as InfoState);
  };

  return (
    <form>
      <Entry wannaLogin={props.wannaLogin} onEntryChange={onEntryChange} />
      <Fav onFavChange={onFavChange} />
      <ColorButton onClick={sendInfo} className="submit">
        Submit
      </ColorButton>

      <style>{`
        form{
            display: flex;
            flex-direction: column;
        }
        .submit{
            align-self: center;
        }
      `}</style>
    </form>
  );
}
