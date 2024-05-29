import { ColumnBox } from "../../atoms/boxes/ColumnBox";
import { RowBox } from "../../atoms/boxes/RowBox";
import { TextTypography } from "../../atoms/typographies/TextTypography";

import profile from "../../../assets/svg/profile.svg";
import home from "../../../assets/svg/home.svg";
import { useAppDispatch } from "../../../store/store";
import { setActiveChat } from "../../../store/redux/activeChat/activeChat.slice";
import { useNavigate } from "react-router-dom";

export const WorkFlowSideBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <ColumnBox
      sx={{
        maxWidth: "100px",
        maxHeight: "calc(100% - 40px)",
        background: "#004ccc",
        alignItems: "center",
        padding: "26px 16px 16px",
        boxSizing: "border-box",
        cursor: "pointer",
        margin: "20px",
        borderRadius: "16px",
      }}
    >
      <button
        className="side__btn"
        onClick={() => {
          navigate("/");
          dispatch(setActiveChat(""));
        }}
        style={{
          background: "none",
          cursor: "pointer",

          border: "none",
          marginBottom: "16px",
        }}
      >
        <img
          src={home}
          style={{
            height: "44px",
            width: "44px",
            pointerEvents: "none",
            color: "#fff",
          }}
        />
      </button>
      <button
        className="side__btn"
        onClick={() => {
          navigate("/profile");
          dispatch(setActiveChat(""));
        }}
        style={{ background: "none", cursor: "pointer", border: "none" }}
      >
        <img
          src={profile}
          style={{
            height: "44px",
            width: "44px",
            pointerEvents: "none",
            color: "#fff",
          }}
        />
      </button>
    </ColumnBox>
  );
};
