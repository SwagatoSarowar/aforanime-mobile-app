import { db } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import { useState } from "react";

export function useFirebaseWrite(path: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState();

  const write = async function (body: Object) {
    try {
      setIsSuccess(false);
      setIsLoading(true);

      await set(ref(db, path), body);

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { write, isLoading, isSuccess, error };
}
