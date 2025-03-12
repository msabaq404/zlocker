import { supabase } from "./supabase";

export const fetchLockers = async (locker: string) => {
  const { data: lockerId, error: e2 } = await supabase
    .from("Lockers")
    .select("id")
    .eq("name", locker);
  return { lockerId: lockerId, error: e2 }

}

export const sendContributions = async (userId: number, questions: string, answer: string, lockerId: number) => {
  const { error } = await supabase
    .from("Contributions")
    .insert([
      {
        contributor: userId,
        questions: questions,
        answer: answer,
        locker: lockerId,
      },
    ]);
  return { error: error }
}



export const getContributions = async (lockerId: number) => {


  
  const { data: dataTemp, error: e1 } = await supabase
  .from("Contributions")
  .select()
  .eq("locker", lockerId);

  let data = dataTemp;
  
  const { data: users, error: e2 } = await supabase
  .from("Contributors")
  .select("id, name");


  const findUserNameById = (id: number) => {

    for (const user of users!){

      if (user.id == id)
        return user.name;

    }


  }

  data = data!.map(contribution => { return { ...contribution, contributor: findUserNameById(contribution.contributor)} })

  return { contributions: data, error: {...e1, ...e2} }
}