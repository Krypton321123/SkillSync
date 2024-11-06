import { atom } from "recoil";

export const loginAtom = atom({
    key: 'logged-in', 
    default: false
})