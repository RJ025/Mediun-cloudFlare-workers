import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signupInput } from "@rj2546/medium-common"
import axios from "axios"
import {BACKEND_URL} from "../../config"

export const Auth = ({type} : {type : "signup" | "signin"}) => {

    const [postInputs , setPostInputs] = useState<signupInput>({
        name : "" ,
        email : "" ,
        password : ""
    })

    const navigate = useNavigate()

    const sendRequest = async() => {
        try {
            const resp = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}` , postInputs)
            const jwt = resp.data
            localStorage.setItem("token" , jwt)
            navigate("/blog")
        } catch(e) {
            
        }
    }


    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="p-10">
                    <div>
                        <div className="text-2xl font-bold">
                            Create an Account
                        </div>
                        <div className="text-slate-400">
                            {type === "signin" ? 
                                "Create an account"   
                                : "Already have an account?"
                            }
                            <Link to={type === "signin" ? '/signup' : '/login'} className="pl-2 underline">{type === "signin" ? "Signup" : "Login"}</Link>
                        </div>
                    </div>

                    <div className="pt-10">
                        {type === "signup" && <LabbledInput
                            lable = "Name"
                            placeholder = "Jhon doe"
                            onChange = {(e)=>{
                                setPostInputs({
                                    ...postInputs ,
                                    name : e.target.value ,

                                })
                            }}
                        />}

                        <LabbledInput
                            lable = "Email"
                            placeholder = "xyz@gmail.com"
                            onChange = {(e)=>{
                                setPostInputs({
                                    ...postInputs ,
                                    email : e.target.value ,

                                })
                            }}
                        />

                        <LabbledInput
                            lable = "Password"
                            placeholder = "password"
                            onChange = {(e)=>{
                                setPostInputs({
                                    ...postInputs ,
                                    password : e.target.value ,

                                })
                            }}
                            type="password"
                        />
                        <button onClick={()=>sendRequest()}  type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-5">
                            {type === "signin" ? "Signin" : "Signup"}
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}


interface LabbledInputType {
    lable : string ,
    placeholder : string ,
    onChange : (e : ChangeEvent<HTMLInputElement>) => void
    type ?: string
}

const LabbledInput= ({lable , placeholder , onChange , type} : LabbledInputType) => {
    return (
        <div>
            <div>
            <label  
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {lable}
            </label>
            <input 
                type={type || "text"} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder={placeholder} 
                required 
                onChange={onChange}
            />
        </div>
        </div>
    )
}