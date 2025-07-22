"use client"
import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function EditListing() {
    return (
        <div className='px-10 md:px-20'>
            <h2 className='font-bold text-2xl'>Enter some more details about your Listing</h2>
            <div className='p-8 rounded-lg shadow-md'>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-lg text-slate-500'>Rent or Sale?</h2>
                        <RadioGroup defaultValue="Sell">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Rent" id="Rent" />
                                <Label htmlFor="Rent">Rent</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Sell" id="Sell" />
                                <Label htmlFor="Sell">Sell</Label>
                            </div>
                        </RadioGroup>


                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-lg text-slate-500'>Property Type</h2>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Property Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1 BHK">1 BHK</SelectItem>
                                <SelectItem value="2 BHK">2 BHK</SelectItem>
                                <SelectItem value="3 BHK">3 BHK</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditListing