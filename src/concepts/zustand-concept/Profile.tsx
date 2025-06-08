
import { useStore } from "./store/userStore";

const Profile = () => {
    const username = useStore((state) => state.username)
    const email = useStore((state) => state.email )
    return (
        <>
             <div className="p-4">
      <h2 className="text-xl font-bold mb-2">User Profile</h2>
      <p><strong>Username:</strong> {username || 'N/A'}</p>
      <p><strong>Email:</strong> {email || 'N/A'}</p>
    </div>
        </>
    )
}
export default Profile