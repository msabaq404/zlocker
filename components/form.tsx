"use client";

import * as React from "react";
import { SelectLocker } from "./selectlocker";
import { supabase } from "../lib/supabase";
import { fetchLockers, sendContributions } from "@/lib/api";
import errored from "@/lib/errored";
import { getUserData } from "@/lib/myutils";

interface Values {
  name?: string;
  locker?: string;
  questions?: string;
  answer?: string;
}

interface FormProps {
  onStatusChange: () => void;
  wannaContribute: boolean;
}

export default function Home(props: FormProps) {
  const [values, setValues] = React.useState<Values>({});

  const onLockerChange = (locker: string) => {
    setValues({ ...values, locker: locker });
  };

  const contribute = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { name, locker, questions, answer } = values;

    
    if (locker && questions && answer) {

      if (props.wannaContribute) {

        const { lockerId, error: e2 } = await fetchLockers(locker);

        const { data: access, error: e4 } = await supabase
          .from("Contributors")
          .select("access_to")
          .eq("id", JSON.parse(getUserData(document.cookie)).userId);
        
        
        const updated_access = [...new Set([...JSON.parse(access![0].access_to), lockerId![0].id])];
        
        const { data: user, error: e1 } = await supabase
          .from("Contributors")
          .update([ { access_to: JSON.stringify(updated_access)} ]) // tryna updating access to locker when contributing with already existing account
          .eq("id", JSON.parse(getUserData(document.cookie)).userId)
          .select();
            // and then make the table work with select menu and locker

        const { error: e3 } = await sendContributions(
          user![0].id,
          questions,
          answer,
          lockerId![0].id
        );

        errored([e1,e2,e3]);
        props.onStatusChange();

        return;
      }

      if (!name) {
        alert("Name is mandatory");
        return;
      }
      
      const { lockerId, error: e2 } = await fetchLockers(locker);

      const { data: user, error: e1 } = await supabase
        .from("Contributors")
        .insert([{ name: values.name, access_to: `[${lockerId![0].id}]` }])
        .select();

      localStorage.setItem("userId", user![0].id);

      const { error: e3 } = await sendContributions(
        user![0].id,
        questions,
        answer,
        lockerId![0].id
      );

      errored([e1, e2, e3]);
      props.onStatusChange();
    } else {
      alert("All fields are mandatory");
    }
  };

  return (
    <form>
      <div className="input-group">
        {!props.wannaContribute ? (
          <input
            type="text"
            id="name"
            className="curved-input"
            placeholder="Your Name"
            value={values.name || ""}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        ) : null}
      </div>

      <SelectLocker showAllLockers={ true } onLockerChange={onLockerChange} />

      <div className="input-group">
        <textarea
          id="questions"
          className="curved-input"
          placeholder="Questions Asked"
          value={values.questions || ""}
          onChange={(e) => setValues({ ...values, questions: e.target.value })}
        />
      </div>
      <div className="input-group">
        <textarea
          id="answer"
          className="curved-input"
          placeholder="Answer"
          value={values.answer || ""}
          onChange={(e) => setValues({ ...values, answer: e.target.value })}
        />
      </div>
      <button onClick={contribute} type="submit">
        Contribute
      </button>

      <style>{`
        .input-group {
          margin-bottom: 1rem;
        }

        textarea {
          resize: none;
          height: 5em;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #333;
          font-size: 0.9rem;
        }

        .curved-input {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          color: #333;
          background-color: #fff;
          border: none;
          border-radius: 8px;
          box-shadow: 0 2px 0 0 #e5e7eb;
          transition: all 0.3s ease;
        }

        .curved-input::placeholder {
          color: #999;
        }

        .curved-input:focus {
          outline: none;
          box-shadow: 0 2px 0 0 #663399;
        }

        button[type="submit"] {
          display: block;
          outline: none;
          width: 100%;
          padding: 0.75rem;
          background-color: #663399;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button[type="submit"]:hover {
          background-color: #552b80;
        }
      `}</style>
    </form>
  );
}
