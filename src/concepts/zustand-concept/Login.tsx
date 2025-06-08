
import { useStore } from "./store/userStore";


const Login  = () => {
    const setUsername  = useStore((state) => state.setUsername)
    const setEmail = useStore((state) => state.setEmail)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const username = (form.elements.namedItem('username') as HTMLInputElement).value;
  const email = (form.elements.namedItem('email') as HTMLInputElement).value;
  setUsername(username);
  setEmail(email);
  alert('User info saved');
};


    return (
        <>
        
        <form onClick={handleSubmit} >
            <div>
                <label className="block">
                    Enter the username
                </label>
                <input name="username" className="border px-2 py-1" required/>
            </div>
            <div>
                <label className="block">
                    Enter your Email :
                </label>
                <input name="email" className="border px-2 py-1" required/>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Submit</button>
        </form>
        
        </>
    )


}

export default Login