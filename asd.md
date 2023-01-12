```ts
import axiosInstance from "./modules/axiosInstance";

const App = () => {
  let data = "exist data";

  const init = async () => {
    const res = await axiosInstance.get("/");
    data = res.data;
  };

  init();

  return (
    <>
      <h1>Hello</h1>
      <p>{data}</p>
    </>
  );
};
export default App;
```

```ts
import { useState } from "react";
import axiosInstance from "./modules/axiosInstance";

const App = () => {
  const [data, setData] = useState<string>();

  const init = async () => {
    const { data } = await axiosInstance.get("/");
    setData(data);
  };

  init();

  return (
    <>
      <h1>Hello</h1>
      <p>{data}</p>
    </>
  );
};
export default App;
```
