import { WatchItem } from "../../../../components/product/watch/watch-detail";
import NavBar from "../../../../layouts/navbar";
import { useCheckLogin } from "../../../../utils/helper";
export const WatchDetail = () => {
  useCheckLogin();
  return (
    <>
      {" "}
      <NavBar />
      <WatchItem />
    </>
  );
};
