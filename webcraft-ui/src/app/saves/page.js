'use client';


import React, { useRef, useEffect, useState, Suspense } from 'react';
import './home.css';
import Loading, { LoadingSaves } from './loading';
import { getSaves } from '@/services/saves';
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
        let rand = Math.round(Math.random()* (10000000 - 1000000) + 1000000)
        let timestamp = new Date().getTime()

        localStorage.setItem("user-id", rand.toString() + timestamp.toString());
    }

    const fetchData = async () => {
        try {
            setSaves(await getSaves())
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
                                    <span className='last-played'>Last Played ({save.lastPlayed})</span>
                                </div>
                            );
                        })
                    )}
                </Suspense>

            </div>
            <div className='buttons'>
                <button id='play' disabled={!selectedSave} onClick={() => router.push(`/game?${selectedSave}`)}>
                    Play Selected Save
                </button>
                <button id='create' disabled={areSavesLoading || saves.length >= 3} onClick={() => router.push(`/saves/create`)}>Create a New Save</button>
                <button id='rename' disabled={!selectedSave} onClick={() => router.push(`/saves/edit?${selectedSave}`)}>Rename Selected Save</button>
                <button id='delete' disabled={!selectedSave}>Delete Selected Save</button>
            </div>
        </section>
    );
}
