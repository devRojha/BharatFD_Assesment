"use client"

import { logedinState } from "@/state/atom";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function Signup(){
    const [Name , setName] = useState<string>("");
    const [Email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const setLoginAtom = useRecoilState(logedinState)[1];
    const [showPass , setShowPass] = useState<boolean>(false);
    const router = useRouter();

    const SendRequest = async()=>{
        if(!Email || !Password || !Name){
            alert("Fill Credential")
            return;
        }
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/signup`,{
                name : Name,
                email : Email, 
                password : Password,
            })
            if(response.data){
                localStorage.setItem("Token" , response.data.Token);
                setLoginAtom(true);
                alert("User created")
                router.push("/")
            }
        }
        catch(e : any){
            console.log(e);
            alert(e.response.data.msg);
        }
    }
    return (
        <div className=" text-black">
            <div className="h-full flex flex-col justify-center">
                <div className="flex justify-center">
                    <div className="flex flex-col border border-black rounded-lg px-10 py-10 mb-4">
                        <div className=" text-center text-2xl font-bold font-serif">Signup</div>
                        <label className="my-2">Name</label>
                        <input onChange={(e)=>{setName(e.target.value)}} className="mb-8 border border-black rounded-md py-2 px-2  w-[300px]" placeholder="Enter Your Name"/>

                        <label className="my-2">Email</label>
                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="mb-8 border border-black rounded-md py-2 px-2  w-[300px]" placeholder="Your mail"/>
                        
                        <div className={`flex flex-col`}>
                            <label className="my-2">Create Password</label>
                            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="border border-black rounded-md py-2 px-2  w-[300px]" placeholder="********"/>
                            <div className="mb-6 mt-2">
                                <button onClick={()=>setShowPass(!showPass)} className={` ${showPass? "text-blue-600": "text-black"} underline`}>Show Password</button>
                                <div className={`${(showPass && Password.length > 0)? "flex": "hidden"} border border-black rounded-md py-2 px-2  w-[300px]`}>{Password}</div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <button onClick={()=> SendRequest()} className="border px-4 py-2 rounded-lg border-blue-500 hover:text-blue-900 hover:border-black active:text-white">Signup</button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}