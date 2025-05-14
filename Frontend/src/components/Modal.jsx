import Login from "../pages/Login";
import { MdCancelPresentation } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginModal } from "../store/movieReducer";
import Signup from "../pages/Signup";
import Loading from "./Loading";
import useAuth from "../Hooks/useAuth";
import AddMovie from "../pages/AddMovie";
function Modal() {
  const dispatch = useDispatch();
  const { loading } = useAuth();
  const { isLoginModal, isSignUpModal, addMovieModal } = useSelector(
    (store) => store.movie
  );

  return (
    <div className="relative ">
      <div className=" box min-w-100 min-h-100 rounded-md shadow-2xl p-4">
        <h1 className="flex justify-end">
          <MdCancelPresentation
            className=" text-4xl active:scale-75 transition-all"
            onClick={() =>
              dispatch(handleLoginModal({ type: "Close", data: false }))
            }
          />
        </h1>

        {isLoginModal && <Login />}
        {isSignUpModal && <Signup />}
        {addMovieModal && <AddMovie />}
        {loading && (
          <div className="loading">
            <Loading></Loading>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
