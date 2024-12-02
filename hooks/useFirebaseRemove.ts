import { db } from "@/lib/firebase";
import { remove as firebaseremove, ref } from "firebase/database";
import { useState } from "react";

export function useFirebaseRemove(path: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState();

  const remove = async function () {
    try {
      setIsSuccess(false);
      setIsLoading(true);

      await firebaseremove(ref(db, path));

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading, isSuccess, error };
}
