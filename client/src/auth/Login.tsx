import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

import { Loader2, LockKeyhole, Mail } from "lucide-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// interface LoginInputState {
//     email:string;
//     password:string;
// }
// type LoginInputState= {
//     email: string;
//     password: string;
// }

export const Login = () => {
    const [input , setInput]=useState<LoginInputState>({
        email:"",
        password:"",
    })
    const [errors, setErrors] = useState<Partial<LoginInputState>>({});
    const {loading, login}=useUserStore();
    const navigate= useNavigate();

    const changeEventHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
            const {name,value}=e.target;
            setInput({...input,[name]:value});
    }
    const loginSubmitHandler=async(e:React.FormEvent)=>{
            e.preventDefault();
        // form validation check start
        const result = userLoginSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<LoginInputState>);
            return;
        }
            try{

                await login(input);
                navigate("/");
            }catch(error){
                console.log(error);
            }
            // console.log(input);
    }
    // const loading =false; 
    return (
        <>
            <div className="mt-[50px] text-center mb-[50px] ">
                <h1 className="font-bold text-4xl">DishDash</h1>
            </div>
        <div className="flex items-center justify-center max-h-screen">
            <div className="flex justify-center flex-wrap md:flex-nowrap w-full max-w-6xl shadow-lg  rounded-lg overflow-hidden">
                {/* Left Section: Image */}
                <div className=" flex justify-center w-1/2 ">
                    <img
                        src="/images/Food-Delivery.svg" // Replace with your image URL
                        alt="Login Illustration"
                        className="object-contain w-full h-full "
                    />
                </div>

                {/* Right Section: Login Form */}
            <div className="w-full  p-6 md:p-8">
               <form onSubmit={loginSubmitHandler} className=" md:p-8 w-full max-w-md   md:border border-gray-200 rounded-lg mx-4" >
                
                <div className="mb-4">
                <div className="relative">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={input.email}
                        name="email"
                        onChange={changeEventHandler}
                        className="pl-10 focus-visible:ring-1"
                    />
                    <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"  />
                        {
                            errors && <span className="text-xs text-red-500">{errors.email}</span>
                        }
                </div>
                </div>

                <div className="mb-4">
                <div className="relative">
                    <Input
                        type="password"
                        placeholder="Password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                        className="pl-10 focus-visible:ring-1"
                    />
                    <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-xs text-red-500">{errors.password}</span>
                        }
                </div>
                </div>
                <div className="mb-10">
                    {
                        loading ?( <Button disabled className="w-full bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>
                         ):( <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">Login</Button>
                    )}
                    <div className="mt-4">

                    <Link to="/forgot-password" className="text-blue-500" >Forgot Password</Link>
                    </div>
                </div>
                <Separator/>
                <p className="mt-2">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500">Signup</Link>
                </p>
              </form>
            </div>
        </div>
    </div>
    </>
    )
}
