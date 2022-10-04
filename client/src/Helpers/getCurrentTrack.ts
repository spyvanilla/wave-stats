const getCurrentTrack = (setCurrentTrack: React.Dispatch<any>) => {
    fetch('/api/get-current-track')
    .then(response => response.json())
    .then(data => {
        setCurrentTrack(data.current_track);
    })
}

export default getCurrentTrack;