'use client';


import React, { useRef, useEffect, useState, Suspense } from 'react';
import './home.css';
import Loading, { LoadingSaves } from './loading';
import { getSaves } from '@/services/saves';

export default function Home() {
    const [selectedSave, setSelectedSave] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [saves, setSaves] = useState([]);
    const [areSavesLoading, setAreSavesLoading] = useState(true);


    const saveRefs = useRef({});

    const handleClick = (title) => {
        if (saveRefs.current[title] && saveRefs.current[title].current) {
            saveRefs.current[title].current.focus();
        }
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
                                    className='save'
                                    tabIndex="0"
                                    onFocus={() => {
                                        setSelectedSave(save.title);
                                        setIsSelected(true);
                                    }}
                                    onClick={() => handleClick(save.title)}
                                    onBlur={() => setIsSelected(false)}
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
                <button id='play' disabled={!isSelected}>
                    Play Selected Save
                </button>
                <button id='create' disabled={areSavesLoading || saves.length >= 3}>Create a New Save</button>
                <button id='rename' disabled={!isSelected}>Rename Selected Save</button>
                <button id='delete' disabled={!isSelected}>Delete Selected Save</button>
            </div>
        </section>
    );
}
