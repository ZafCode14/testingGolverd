"use client";
import { useEffect, useState } from 'react';
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, firestore } from "@/lib/firebase";

interface UserData extends DocumentData {
  // Define your user data structure here if needed.
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setLoadingUser(false);
      if (user) {
        setUser(user);
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
          setLoadingData(false);
        } else {
          console.log('No such document!');
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loadingData, userData, loadingUser };
}