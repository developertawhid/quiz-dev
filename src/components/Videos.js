import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import useVideoList from '../hooks/useVideoList';
import classes from '../styles/Videos.module.css';
import Video from './Video';


function Videos() {
    const [page, setPage] = useState(1);
    const { loading, error, videos, hasMore } = useVideoList(page, 20);
    return (
        <div>
            {
                videos.length > 0 && 
                <InfiniteScroll 
                    dataLength={videos.length}
                    hasMore={hasMore}
                    next={() => setPage((prev) => prev+20)}
                    className={ classes.videos }
                    loader="Loading...</h4>"
                >
                    {
                        videos.map((video) => 
                            video.noq > 0 ? (
                                <Link to={{
                                    pathname: `/quiz/${video.youtubeID}`,
                                    state: {
                                        videoTitle: video.title,
                                    }
                                }} key={ video.youtubeID } >
                                    <Video 
                                        title={ video.title }
                                        id={ video.youtubeID }
                                        noq={ video.noq }
                                    />
                                </Link>
                            ) : (
                                <Video 
                                    key={ video.youtubeID } 
                                    title={ video.title }
                                    id={ video.youtubeID }
                                    noq={ video.noq }
                                />
                            )
                        )
                    }
                </InfiniteScroll>
            }

            { !loading && videos.length < 1 && ( <div>No data found!</div> ) }
            { error && ( <div>There was an error!</div> ) }
            { loading && ( <div>Loading...</div> ) }

        </div>
    )
}

export default Videos;
