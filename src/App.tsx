import axiosInstance from "./modules/axiosInstance";
const App = () => {
  const init = async () => {
    const res = await axiosInstance.get("/");
    console.log(res);
  };

  init();
  return (
    <>
      <h1>Hello</h1>
    </>
  );
};
export default App;
