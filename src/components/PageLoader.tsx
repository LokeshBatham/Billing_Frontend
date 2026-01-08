import { ThreeDots } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ margin: "20px" }}
        visible={true}
      />
    </div>
  );
};

export default PageLoader;
