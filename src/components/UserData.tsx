"use client";
import { getUserInforById } from "@/app/(auth)/actions/authActions";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserData() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        const userData = await getUserInforById(session.user.id);
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    fetchData();
  }, [session]); // Always fetch data when session changes

  // Show loading state while waiting for user data
  if (!user) return <p>Loading...</p>;

  // Render user data when available
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{user.role}</h2>
    </div>
  );
}
