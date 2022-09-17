import React from 'react';

import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import SyncLoader from 'react-spinners/SyncLoader';

function Loading({type} : {type: number}) {
    // type 1 - Page loading
    // type 2 - Small loading
    return (
        <>
        {type === 1 ? (
            <div className="loading">
                <ClimbingBoxLoader size={25} color={"#1DB954"} />
            </div>
        ) : (
            <div className="small-loading">
                <SyncLoader size={10} color={"#1DB954"} />
            </div>
        )}
        </>
    )
}

export default Loading;