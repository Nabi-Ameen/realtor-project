import React from 'react'
import { useState } from 'react'

const CreateListing = () => {
    const [geolocationEnable, setGeolocationEnabled] = useState(true);
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        latitude: 0,
        longitude: 0,
    });
    const { type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice, latitude, longitude } = formData;
    function onChange(e) {
        let boolean = null;
        if(e.target.value === "true"){
            boolean = true
        }
        if(e.target.value === "false"){
            boolean = false;
        }
        //files
        if(e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                images: e.target.files,
            }))
        }
        //text/boolean/number
        if(!e.target.files){
            setFormData((prevState) =>({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    }

    function onSubmit(e){
        e.preventDefault();
        
    }

    return (
        <main className='max-w-md mx-auto'>
            <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>

            <form onSubmit={onSubmit}>
                <p className='text-md mt-6 font-semibold'>SeLL or Rent</p>
                <div className='flex space-x-2'>
                    <button
                        type='button'
                        id='type'
                        value="sale"
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"}`}
                    >
                        sell
                    </button>
                    <button
                        type='button'
                        id='type'
                        value="rent"
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"}`}
                    >
                        rent
                    </button>
                </div>
                <p className='text-md mt-6 font-semibold'>Name</p>
                <input type="text" id='name' value={name} onChange={onChange} placeholder="Name" maxLength="32" minLength="5" required className='w-full px-3 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-200 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' />

                <div className='flex space-x-6 mb-6'>
                    <div>
                        <p className='text-md font-semibold'>Beds</p>
                        <input type="number" id='bedrooms' value={bedrooms} onChange={onChange} min="1" max="40" required className='w-full px-3 py-2 text-lg text-gray-600 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                    </div>
                    <div>
                        <p className='text-md font-semibold'>Baths</p>
                        <input type="number" id='bathrooms' value={bathrooms} onChange={onChange} min="1" max="40" required className='w-full px-3 py-2 text-lg text-gray-600 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                    </div>
                </div>

                <p className='text-md mt-6 font-semibold'>Parking spot</p>
                <div className='flex space-x-2'>
                    <button
                        type='button'
                        id='parking'
                        value={true}
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${!parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
                    >
                        yes
                    </button>
                    <button
                        type='button'
                        id='parking'
                        value={false}
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
                    >
                        no
                    </button>
                </div>

                <p className='text-md mt-6 font-semibold'>Furnished</p>
                <div className='flex space-x-2'>
                    <button
                        type='button'
                        id='furnished'
                        value={true}
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${!furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}
                    >
                        yes
                    </button>
                    <button
                        type='button'
                        id='furnished'
                        value={false}
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}
                    >
                        no
                    </button>
                </div>

                <p className='text-md mt-6 font-semibold'>Address</p>
                <textarea type="text" id='address' value={address} onChange={onChange} placeholder="Address" required className='w-full px-3 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-200 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' />

                {!geolocationEnable && (
                    <div className="mb-6 flex space-x-3">
                        <div className="">
                            <p className='text-md font-semibold'>Latitude</p>
                            <input type="number" id='latitude' value={latitude} onChange={onChange} required
                            min="-90" max="90"
                            className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center'/>
                        </div>
                        <div className="">
                            <p className='text-md font-semibold'>Longitude</p>
                            <input type="number" id='longitude' value={longitude} onChange={onChange} required min="-180" max="180" className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center'/>
                        </div>
                    </div>
                )}


                <p className='text-md font-semibold'>Description</p>
                <textarea type="text" id='description' value={description} onChange={onChange} placeholder="Description" required className='w-full px-3 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-200 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' />

                <p className='text-md font-semibold'>Offer</p>
                <div className='flex space-x-2'>
                    <button
                        type='button'
                        id='offer'
                        value={true}
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${!offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}
                    >
                        yes
                    </button>
                    <button
                        type='button'
                        id='offer'
                        value={false}
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}
                    >
                        no
                    </button>
                </div>

                <div className='flex mt-6'>
                    <div>
                        <p className='text-md font-semibold'>Regular Price</p>
                        <div className='flex items-center w-full space-x-8' >
                            <input type="number" id='regularPrice' value={regularPrice} onChange={onChange} required min="50" max='40000000' className='w-full px-3 py-2 text-lg text-gray-600 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />

                            {type === "rent" && (
                                <div>
                                    <p className='text-md w-full whitespace-nowrap'>$ / Month</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {offer && (
                    <div className='flex mt-6'>
                        <div>
                            <p className='text-md font-semibold'>Discounted Price</p>
                            <div className='flex items-center w-full space-x-8' >
                                <input type="number" id='discountedPrice' value={discountedPrice} onChange={onChange} required={offer} min="50" max='40000000' className='w-full px-3 py-2 text-lg text-gray-600 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />

                                {type === "rent" && (
                                    <div>
                                        <p className='text-md w-full whitespace-nowrap'>$ / Month</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-6">
                    <p className='text-md font-semibold'>Images</p>
                    <p className='text-gray-600'>The first image will be the cover(max 6)</p>
                    <input type="file" id='images' onChange={onChange} accept=".jpg, .png, .jpeg" multiple required className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:bg-white focus:border-slate-600' />
                </div>

                <button type='submit' className='my-6 w-full px-7 py-3 bg-blue-600 text-white font-semibold text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
                active:bg-blue-800 active:shadow-lg transition ease-in-out duration-200'> Create Listing</button>
            </form>
        </main>
    )
}

export default CreateListing
