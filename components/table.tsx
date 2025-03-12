import React from "react";
import { SelectLocker } from "./selectlocker";
import { fetchLockers, getContributions } from "@/lib/api";

interface Contributions {
  contributor: number;
  questions: string;
  answers: string;
}

export default function Table() {
  const [selectedLocker, setSelectedLocker] = React.useState<string>("");
  const [contributions, setContributions] = React.useState<Contributions[]>();

  const onLockerChange = async (locker: string) => {

    if(!locker)
      return;

    
    const lockerData = await fetchLockers(locker);
    const lockerId = lockerData.lockerId;
    console.log(lockerId, locker);
    let { contributions, error } = await getContributions(lockerId![0].id);

    setContributions(
      contributions?.map((contribution) => {
        return {
          contributor: contribution.contributor,
          questions: contribution.questions,
          answers: contribution.answer,
        };
      })
    );

    console.log(contributions);

    setSelectedLocker(locker);
  };

  return (
    <div>
      <SelectLocker
        onLockerChange={onLockerChange}
        showAllLockers={false}
      ></SelectLocker>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Contributor</th>
              <th>Questions</th>
              <th>Answers</th>
            </tr>
          </thead>
          <tbody>

            {contributions?.map((contribution) => (
                <tr key={`${contribution.contributor}-${Math.random().toString(36).substring(2, 8)}`}>
                <td>{contribution.contributor}</td>
                <td>{contribution.questions}</td>
                <td>{contribution.answers}</td>
                </tr>
            ))}

            <tr>
              <td>Alice</td>
              <td>What is Newton's First Law?</td>
              <td>It states that an object remains at rest...</td>
            </tr>
            <tr>
              <td>Bob</td>
              <td>How to calculate work done?</td>
              <td>Work = Force × Displacement × cos(θ)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <style>{`
        .table-container {
            width: 100%;
            margin: 20px auto;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead {
            background-color: rebeccapurple; /* Purple header */
            color: white;
            text-align: left;
        }

        th, td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
        }

        tbody tr:hover {
            background-color: #f3e5f5; /* Light purple hover */
            cursor: pointer;
        }

        tbody tr:last-child td {
            border-bottom: none;
        }
      `}</style>
    </div>
  );
}
