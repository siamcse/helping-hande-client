import React, { useEffect, useState } from 'react';
import EventsItem from './EventsItem';

const Home = () => {
    // const events = useLoaderData();
    const [events, setEvents] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(4);

    const pages = Math.ceil(count / size);

    useEffect(() => {
        fetch(`https://helping-hand-server.vercel.app/helps?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setEvents(data.events);
            })
    }, [page, size])


    return (
        <div>
            <div className='text-center my-12'>
                <h2 className='text-4xl font-bold '>I grow by helping people in need.</h2>
                <div className="form-control w-1/4 mx-auto mt-6">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" />
                        <button className="btn bg-cyan-500 hover:bg-cyan-600">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-8 w-3/4 mx-auto'>
                {
                    events.map(help => <EventsItem
                        key={help._id}
                        help={help}
                    >
                    </EventsItem>)
                }
            </div>
            {/* pagination */}
            <div className='text-center'>
                <h2>Selected page: {page + 1} && size: {size}</h2>
                {
                    [...Array(pages).keys()].map(item => <button
                        key={item}
                        className={`btn btn-ghost ${item === page ? 'bg-orange-400' : ''}`}
                        onClick={() => setPage(item)}
                    >
                        {item + 1}
                    </button>)
                }
                <select defaultValue={4} onChange={(event) => { setSize(event.target.value); setPage(0); }}>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                </select>
            </div>
        </div>
    );
};

export default Home;