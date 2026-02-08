import { UserInfo } from "@/types/dashboard";

export default function UserCard({ user }: { user: UserInfo }) {
  return (
    <div className="p-6 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">Profile</h3>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
    </div>
  );
}
