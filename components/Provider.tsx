"use client";

import { SessionProvider } from "next-auth/react";

interface Session {
  user: {
    name: string;
    email: string;
    // Define other properties if available
  };
  accessToken: string;
  expires: string;
  // Define other properties if available
}

interface Props {
  children: React.ReactNode;
  session: Session; // Use the Session interface here
}

const Provider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
