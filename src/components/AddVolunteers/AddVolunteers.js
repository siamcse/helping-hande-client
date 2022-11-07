import React from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData } from 'react-router-dom';

const AddVolunteers = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const event = useLoaderData();

    const onSubmit = volunteer => {
        fetch('https://helping-hand-server.vercel.app/volunteer', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('volunteer-token')}`
            },
            body: JSON.stringify(volunteer)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('Volunteer added successfully');
                }
            })
            .catch(e => console.error(e))
    }
    return (
        <div>
            <h2 className='text-4xl font-bold text-center'>Register as a Volunteer</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='card-body grid lg:grid-cols-1 gap-3 lg:w-1/4 w-2/4 mx-auto'>
                <input className="input input-bordered w-full max-w-xs" placeholder="Full Name" {...register("name")} />
                <input className="input input-bordered w-full max-w-xs" placeholder="Username or Email" {...register("email")} />
                <input className="input input-bordered w-full max-w-xs" placeholder="Date" {...register("date")} />
                <input className="input input-bordered w-full max-w-xs" placeholder="Description" {...register("description")} />
                <input className="input input-bordered w-full max-w-xs" defaultValue={event.title} {...register("eventName")} readOnly />

                {errors.exampleRequired && <span>This field is required</span>}
                <input className='btn bg-cyan-500 hover:bg-cyan-600' type="submit" />
            </form>
        </div>
    );
};

export default AddVolunteers;