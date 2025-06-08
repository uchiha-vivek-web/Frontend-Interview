import {create} from 'zustand'

type Store = {
    username:string;
    email:string;
    setUsername:(username:string) => void
    setEmail: (username:string)=>void
}

export const useStore = create<Store>( (set) => ({
        username:'',
        email:'',
        setUsername :(username:string) => set({username}),
        setEmail:(email:string)=> set({email})
})  )