"use client"

import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'


function AddNewListing() {
    const [selectedAddress,setSelectedAddress] = useState();
    const [coordinates,setCoordinates] = useState();
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    const nextHandler=()=>{
        setLoader(true)
        console.log(selectedAddress,coordinates);

      if(true){
          setLoader(false)
          toast("New Address added for listing");
          router.replace('/edit-listing/'+0);// change according to database
      }
    }
    return (
        <div className='mt-10 md:mx-56 lg:mx-80'>
            <div className='p-10 flex flex-col gap-5 items-center justify-center'>
                <h2 className='font-bold text-2xl'>Add New Listing</h2>
                <div className='p-10 rounded-lg border w-full shadow-md flex flex-col gap-5'>
                    <h2 className='text-gray-500'>Enter Address to list.</h2>
                    <GoogleAddressSearch
                        selectedAddress={(value)=>setSelectedAddress(value)}
                        setCoordinates = {(value)=>setCoordinates(value)} 
                    />
                    <Button
                        disabled={!selectedAddress || !coordinates}
                        onClick={nextHandler}>
                        {loader?<Loader className='animate-spin' />:'Next'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddNewListing