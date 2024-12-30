import {ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@lakshyababel/medium-common";
import axios from "axios"
import { BACKEND_URL } from "../config";

interface typeinterface{
   type: "signup" | "signin"
}

export function Auth({type}: typeinterface){
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    async function sendRequest(){
       try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup" : "signin"}`, postInputs);
            
            const token = response.data.jwt; // Extract the JWT string
            localStorage.setItem("token", token);
            // localStorage.setItem("token", JSON.stringify(jwt));
            

            navigate("/blogs");
       }catch(e){
            //alert that request get failed
            alert("Error while signing up")
       }
    }
    return(
        <div className="flex justify-center flex-col  h-screen">
            <div className="flex justify-center ">
                <div>
                    <div className="px-20">
                        <div className="text-3xl font-extrabold">
                            {type === "signup" ? "Create an account" : "Sign in your account"}
                        </div>

                        <div className="text-slate-400 text-center">
                            {type === "signin"? "Already have an account?" : "Create an account"}
                           
                            <Link className= "pl-2 underline"to = {type === "signin"? "/signup":"/signin"}>{type === "signup"? "Signin": "Signup"}</Link>
                        </div>
                    </div>

                    <div className="mt-5">
                        <LabelledInput label="Email" placeholder="lakshyababel456@gmail.com" onChange={(e)=>{
                            setPostInputs((c)=>({ //avoid race condtion giving function as an input
                                ...c, 
                                email: e.target.value,
                            }))
                        }} />

                        <LabelledInput label="Password" placeholder="LakshyaBabel@123" onChange={(e)=>{
                            setPostInputs((c)=>({ 
                                ...c, 
                                password: e.target.value,
                            }))
                        }} type = {"password"} />                   
                    </div>
                    <div className="mt-8">
                    <button type="button" onClick={sendRequest} className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign up": "Sign in" }</button>
                        
                        
                    </div>
                </div>
                
            </div>

        </div>
    )
}
interface typeLabelledInput {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void,
    type?: string
    
}
function LabelledInput({label, placeholder, onChange, type}: typeLabelledInput){
    return(
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">{label}</label>
            <input type={type || "text" } onChange = {onChange} className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder}required />
        </div>
    )
}