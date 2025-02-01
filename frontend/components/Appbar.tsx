"use client"

import { logedinState } from "@/state/atom";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";



export default function Appbar() {
    const router = useRouter();
    const [loginAtom , setLoginAtom] = useRecoilState(logedinState);
    useEffect(()=>{
        async function fetchData(){
            const token = localStorage.getItem("Token");
            if(token){
                try{
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/info`,{
                        headers : {
                            token : localStorage.getItem("Token")
                        }
                    })
                    if(response.data){
                        setLoginAtom(true);
                    }
                    else{
                        setLoginAtom(false);
                    }
                }
                catch(e){
                    setLoginAtom(false);
                    console.log(e);
                }
            }
            else{
                setLoginAtom(false);
            }
        }
        fetchData();
    },[loginAtom])
    return (
      <div className="border z-30 fixed w-full bg-white text-black top-0 h-16 pl-4 pr-10 max-sm:pr-4">
        <div className="flex justify-between h-full py-2">
            <div className="flex flex-col = justify-center text-2xl font-bold font-serif">
                <a href="/">FAQs</a>
            </div>
            <div className="flex flex-col = justify-center">
                <div className={`${!(loginAtom)?"flex" : "hidden"}`}>
                    <a className="mr-2 hover:underline" href="/auth/signin">Login</a> /
                    <a className="ml-2 hover:underline"  href="/auth/signup">Register</a>
                </div>
                {/* only user  */}
                <div className={`${(loginAtom)?"flex" : "hidden"}`}>
                    <button onClick={()=>{
                        setLoginAtom(false);
                        localStorage.removeItem("Token")
                    }} className="mr-2 hover:underline" >Logout</button> /
                </div>
            </div>
        </div>
      </div>
    );
  }