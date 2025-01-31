import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../lib/firebase';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: {
    id: {
      country: string;
      governate: string;
      city: string;
      postalCode: string;
      apartment: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      address: string;
      addressId: string;
      id: string;
    }
  }
  defaultAddress: string;
  // Add other user properties as needed
}

const useAuthUser = (): [User | null, boolean, Error | null] => {
  const [theuser, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(firestore, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser({ id: userDoc.id, ...(userDoc.data() as Omit<User, 'id'>) });
          } else {
            setUser(null); // User document does not exist
          }
        } catch (err) {
          setError(err as Error);
        }
      } else {
        setUser(null); // No authenticated user
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return [theuser, loading, error];
};

export default useAuthUser;