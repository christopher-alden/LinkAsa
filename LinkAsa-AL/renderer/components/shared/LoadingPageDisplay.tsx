import CircularProgress from "@mui/material/CircularProgress";

const LoadingPageDisplay = () => (
    <div
        style={{
            backgroundImage: "url('/images/LinkAsa_BG.jpg')",
            backgroundSize: "cover",
            position: "fixed",
            zIndex: -1,
            height: "100vh",
            width: "100vw",
            opacity: "0.5",
        }}
    >
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: 'center'
        }}>
            <CircularProgress />
        </div>
    </div>
);

export default LoadingPageDisplay