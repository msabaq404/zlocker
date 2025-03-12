import * as React from "react";
import { supabase } from "@/lib/supabase";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getUserData } from "@/lib/myutils";

interface SelectLockerProps {
  onLockerChange?: (selectedLocker: string) => void;
  showAllLockers: boolean;
}

async function fetchLockers(showAllLockers: boolean) {
  if (showAllLockers){
    const { data } = await supabase.from("Lockers").select("name");
    return data;

  } else {
    const userId = JSON.parse(getUserData(document.cookie)).userId;

    const { data: lockerids } = await supabase
      .from("Contributors")
      .select("access_to")
      .eq("id", userId);

      const data: {name: string}[] = [];

      for ( const lockerid of JSON.parse(lockerids![0].access_to)){
        const { data : eachlocker } = await supabase.from("Lockers").select("name").eq("id", lockerid);
        data.push(eachlocker![0]);
      }

      return data;


  }
}

export function SelectLocker(props: SelectLockerProps) {
  
  const [allLockers, setAllLockers] = React.useState<{ name: string }[]>([]);
  
  const memoizedLockers = React.useMemo(() => allLockers, [allLockers]);

  const [selectedLocker, setSelectedLocker] = React.useState<string>("");

  React.useEffect(() => {
    const getLockers = async () => {
      const data = await fetchLockers(props.showAllLockers);
      if (data) {
        setAllLockers(data);
        
        
        if (!props.showAllLockers)
        setSelectedLocker(data[0].name)
      
      }

    };
    getLockers();
  }, []);

  React.useEffect(() => {
    if (props.onLockerChange) {
      props.onLockerChange(selectedLocker);
    }
  }, [selectedLocker]);

  return (
    <Select value={selectedLocker} onValueChange={(value: string) => setSelectedLocker(value)}>
      <SelectTrigger className="w-full mb-4">
        <SelectValue placeholder="Select Locker" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Lockers</SelectLabel>
          {memoizedLockers!.map((locker) => (
            <SelectItem key={locker.name} value={locker.name}>
              {locker.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
