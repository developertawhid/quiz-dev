import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from 'firebase/database';
import { useEffect, useState } from 'react';

function useVideoList(page, limitTo) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true)
    
    useEffect(() => {
        async function fetchVideos() {
            // database related words 
            const db = getDatabase();
            const videosRef = ref(db, "videos");
            const videoQurey = query( 
                videosRef, 
                orderByKey(), 
                startAt('' + page), 
                limitToFirst(limitTo) 
            );

            try {
                setError(false);
                setLoading(true);

                // request firebase database
                const snapshot = await get(videoQurey);
                setLoading(false);

                if(snapshot.exists()) {
                    setVideos((prevVideos) => {
                        const videos = Object.values(snapshot.val());
                        return [ ...prevVideos, ...videos ]
                    })
                }else {
                    setHasMore(false);
                }

            } catch(err) {
                // Respons Error...
                setLoading(false);
                setError(true);
                console.log(err)
            }
        }

        fetchVideos();
    }, [page, limitTo]);

    return {
        loading,
        error,
        videos,
        hasMore
    }
}

export default useVideoList;
