import Spinner from 'react-spinner-material';

export default function Loader() {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "15%",
        zIndex: "999",
      }}
    >
      <div>
        {/* show spinner */}
        <Spinner radius={80} color={"blue"} stroke={2} visible={true} />
        {/* show message below the spinner */}
        <h4>Loading..</h4>
      </div>
    </div>
  );
}
