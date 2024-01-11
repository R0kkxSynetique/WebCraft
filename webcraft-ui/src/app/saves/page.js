'use client';


import React, { useRef, useEffect, useState, Suspense } from 'react';
import './home.css';
import Loading, { LoadingSaves } from './loading';
import { getSaves, deleteSave } from '@/services/saves';
import { useRouter } from 'next/navigation'


export default function Home() {
    const [selectedSave, setSelectedSave] = useState();
    const [saves, setSaves] = useState([]);
    const [areSavesLoading, setAreSavesLoading] = useState(true);

    const router = useRouter()


    const saveRefs = useRef({});

    const handleClick = (title) => {
        if (saveRefs.current[title] && saveRefs.current[title].current) {
            saveRefs.current[title].current.focus();
        }
    }

    const log = () => {
        let rand = Math.round(Math.random() * (10000000 - 1000000) + 1000000)
        let timestamp = new Date().getTime()

        localStorage.setItem("user-id", rand.toString() + timestamp.toString());
    }

    const fetchData = async () => {
        try {
            let saves = await getSaves()
            setSaves(saves.sort((a, b) => b.date - a.date))
            setAreSavesLoading(false);
        } catch (error) {
            // Handle errors here
            console.error('Error fetching saves:', error);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("user-id")) {
            log()
        }

        fetchData();
    }, []);


    const formatDate = (timestamp) => {

        let date = new Date(timestamp)

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let hours = date.getHours()
        let minutes = date.getMinutes()

        // Pad the day and month with a 0 if they are single digits
        day = day < 10 ? '0' + day : day
        month = month < 10 ? '0' + month : month

        // Pad the hours and minutes with a 0 if they are single digits
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes

        return `${day}.${month}.${year} : ${hours}:${minutes}`
    }

    return (
        <section className='home'>
            <h1>Select a save</h1>
            <div className='saves'>

                <Suspense fallback={<LoadingSaves />}>
                    {areSavesLoading ? (
                        <LoadingSaves />
                    ) : (
                        saves.map((save) => {
                            saveRefs.current[save.title] = React.createRef();
                            return (
                                <div
                                    key={save.title}
                                    ref={saveRefs.current[save.title]}
                                    className={selectedSave == save.id ? "save save-selected" : "save"}
                                    tabIndex="0"
                                    onFocus={() => {
                                        setSelectedSave(save.id);
                                    }}
                                    onClick={() => handleClick(save.title)}
                                // onBlur={() => setSelectedSave(false)}
                                >
                                    <h1 className='title'>{save.title}</h1>
                                    <span className='last-played'>Last Played ({formatDate(save.date)})</span>
                                </div>
                            );
                        })
                    )}
                </Suspense>

            </div>
            <div className='buttons'>
                <button id='play' disabled={!selectedSave} onClick={() => router.push(`/game?save=${selectedSave}`)}>
                    Play Selected Save
                </button>
                <button id='create' disabled={areSavesLoading || saves.length >= 3} onClick={() => router.push(`/saves/create`)}>Create a New Save</button>
                <button id='rename' disabled={!selectedSave} onClick={() => router.push(`/saves/edit?save=${selectedSave}`)}>Rename Selected Save</button>
                <button id='delete' disabled={!selectedSave} onClick={() => {deleteSave(saves, setSaves, selectedSave); setSelectedSave(null)}}>Delete Selected Save</button>
            </div>
        </section>
    );
}
