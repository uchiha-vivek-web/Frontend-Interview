import {create} from 'zustand'

type UserState = {
    firstName:string,
    lastName:string,
    email:string,
    setUser: (user:{firstName:string,lastName:string,email:string})=>void
    resetUser:() => void
}

export const useUserStore = create<UserState>((set) => ({
    firstName:'',
    lastName:'',
    email:'',
    setUser:(user)=> set(user),
    resetUser:() => set({firstName:'',lastName:'',email:''})
}) )