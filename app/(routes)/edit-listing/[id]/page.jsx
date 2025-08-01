"use client"
import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { Formik } from 'formik'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import userAuthStatus from '@/utils/authStatus'
import { useRouter } from 'next/navigation'

function EditListing() {

    const params = usePathname();
    const [user, setUser] = useState("");
    const router = useRouter();

    async function fetchUser(){
        userAuthStatus().then(({email, authenticated}) => {
            if(!authenticated){
                router.push("/auth/login");
            } else {
                setUser(email);
            }
        });
    }

    useEffect(()=>{
        fetchUser();
        console.log(params.split('/')[2])
    },[]);

    const verifyUserRecord=()=>{
        //verify user from backend
    }

    const onSubmitHandler = async(formValue)=>{
        //Database
        toast('Listing Updated and Published')
    }

    return (
        <div className='px-10 md:px-36 my-10'>
            <h2 className='font-bold text-2xl p-8'>Enter some more details about your Listing</h2>
        <Formik
        initialValues={{
            type:'Rent',
            propertyType:'',
            bedroom:0,
            bathroom:0,
            builtIn:0,
            parking:0,
            lotSize:0,
            area:0,
            sellingPrice:0,
            hoa:0,
            description:''
        }}
        onSubmit={(values)=>{
            console.log(values);
            onSubmitHandler(values)
        }}>
            {({
                values,
                handleChange,
                handleSubmit
            })=>(
                <form onSubmit={handleSubmit}>
            <div className='p-5 border rounded-lg shadow-md grid gap-7 mt-6 '>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 p-6 py-20px'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-lg text-slate-500'>Rent or Sale?</h2>
                        <RadioGroup defaultValue="Rent" className={"flex pt-2"} name = "type"
                        onValueChange={(v)=>values.type=v}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Rent" id="Rent" />
                                <Label htmlFor="Rent" className="text-lg">Rent</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Sell" id="Sell" />
                                <Label htmlFor="Sell" className="text-lg">Sell</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-lg text-slate-500'>Property Type</h2>
                        <Select onValueChange = {(e)=>values.propertyType=e}
                            name = "propertyType">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Property Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Apartment">Apartment</SelectItem>
                                <SelectItem value="Builder Home">Builder Home</SelectItem>
                                <SelectItem value="Villa">Villa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 py-50px'>
                    <div className='flex gap-2 flex-col'>
                        <h2 className='text-gray-500'>Bedroom</h2>
                        <Input type="number" placeholder="Ex.2" name="bedroom"
                        onChange = {handleChange} />
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <h2 className='text-gray-500'>Bathroom</h2>
                        <Input type="number" placeholder="Ex.2" name="bathroom" 
                        onChange = {handleChange}/>
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <h2 className='text-gray-500'>Built In</h2>
                        <Input type="number" placeholder="Ex.2022" name="builtIn" 
                        onChange = {handleChange}/>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 py-50px'>
                    <div className='flex gap-2 flex-col'>
                        <h2 className='text-gray-500'>Parking</h2>
                        <Input type="number" placeholder="Ex.2" name="parking" 
                        onChange = {handleChange}/>
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <h2 className='text-gray-500'>Lot Size(Sq.Ft)</h2>
                        <Input type="number" placeholder="" name="lotSize" 
                        onChange = {handleChange}/>
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <h2 className='text-gray-500'>Area (Sq.Ft)</h2>
                        <Input type="number" placeholder="Ex.1900" name="area" 
                        onChange = {handleChange}/>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 py-50px'>
                    <div className='flex gap-2 flex-col'>
                        <h2 className='text-gray-500'>Selling Price(₹)</h2>
                        <Input type="number" placeholder="400000" name="sellingPrice" 
                        onChange = {handleChange}/>
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <h2 className='text-gray-500'>HOA (Per Month) (₹)</h2>
                        <Input type="number" placeholder="100" name="hoa" 
                        onChange = {handleChange}/>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-10 p-5 py-50px'>
                    <div className='flex gap-2 flex-col'>
                        <h2 className='text-gray-500'>Description</h2>
                        <Textarea placeholder="" name="description" 
                        onChange = {handleChange}/>
                    </div>
                </div>
                <div className='flex gap-7 justify-end'>
                    <Button className="cursor-pointer" type="submit"> Publish</Button>
                </div>
            </div>
            </form>)}
            </Formik>
        </div>
    )
}

export default EditListing