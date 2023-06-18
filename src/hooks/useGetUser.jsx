import { getCurrentUser } from "services/auth";
import useAPI from "./useApi";
import { useDispatch } from "react-redux";
import { storeUser } from "reducers/userReducer";

const useGetUser = () => {
  const dispatch = useDispatch();
  const request = useAPI({ queryFn: getCurrentUser });
  const run = () => {
    request
      .run()
      .then((res) => {
        dispatch(storeUser(res.data.data));
      })
      .catch((err) => {});
  };
  return { run };
};

export default useGetUser;
