import { db } from "@/lib/firebase";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";

export function useFirebaseRead(path: string) {
  const [data, setData] = useState<any>([]);
  const [itemsId, setItemsId] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState();

  const read = async function () {
    try {
      setIsSuccess(false);
      setIsLoading(true);

      const snapShot = await get(ref(db, path));
      const vals = await snapShot.exportVal();
      if (vals) {
        const result = Object.values(vals);
        const ids = Object.keys(vals);
        setData(result);
        setItemsId(ids);
      } else {
        setData([]);
        setItemsId([]);
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    read();
  }, [db, path]);

  const refetch = function () {
    read();
  };

  return { refetch, itemsId, data, isLoading, isSuccess, error };
}
