export default Video = () => {
    return (
        <video
            autoPlay
            loop
            muted
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }}
        >
            <source src="/ExpoLidercom/assets/VideoFondo.mp4" type="video/mp4" />
        </video>        
    );
}
