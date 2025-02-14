// components/Dashboard.tsx
import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    return <div>Please sign in to access your dashboard.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.fullName}</h1>
      <p>Your Clerk ID: {user.id}</p>
      {/* You can now pass user.id to your Convex mutations or queries */}
    </div>
  );
}
