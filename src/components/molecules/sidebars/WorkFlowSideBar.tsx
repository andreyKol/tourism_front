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
        background: "#004ccc",
        alignItems: "center",
        padding: "15px",
        boxSizing: "border-box",
        cursor: "pointer",
      }}
    >
      <button
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
