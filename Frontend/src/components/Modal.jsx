import Login from "../pages/Login";
import { MdCancelPresentation } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginModal } from "../store/movieReducer";
import Signup from "../pages/Signup";
function Modal() {
  const dispatch = useDispatch();
  const { isLoginModal, isSignUpModal } = useSelector((store) => store.movie);

  return (
    <div className="">
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
      </div>
    </div>
  );
}

export default Modal;
