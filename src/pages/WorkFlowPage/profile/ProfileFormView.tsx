import { useEffect, useState } from "react";
import { ColumnBox } from "../../../components/atoms/boxes/ColumnBox";
import { RowBox } from "../../../components/atoms/boxes/RowBox";
import { ConfirmButton } from "../../../components/atoms/buttons/ConfirmButton";
import { TextTypography } from "../../../components/atoms/typographies/TextTypography";

import avatar from "../../../assets/svg/avatars/avatar.svg";

import eye from "../../../assets/svg/eye.svg";
import closeEye from "../../../assets/svg/closeEye.svg";

import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  useGetMeMutation,
  useGetUsersMutation,
  useUpdateUserMutation,
  useUpdateImageMutation,
  useGetImageMutation,
} from "../../../api/users/usersApi";
import { removeCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";

export interface UserData {
  age?: number | null;
  createdAt?: string | null;
  deletedAt?: string | null;
  email?: string | null;
  experience?: number | null;
  gender?: number | null;
  id?: number | null;
  imageFile?: string | null;
  lastOnline?: string | null;
  medicalCardFile?: string | null;
  name?: string | null;
  passwordEncrypted?: string | null;
  patronymic?: string | null;
  phone?: string | null;
  policyFile?: string | null;
  policyNumber?: string | null;
  portfolioFile?: string | null;
  role?: number | null;
  specializationFile?: string | null;
  surname?: string | null;
}

export const ProfileFormView = () => {
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [updData, setUpdData] = useState<UserData | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [getMe, { isLoading }] = useGetMeMutation();
  const [updUser] = useUpdateUserMutation();
  const [updImage] = useUpdateImageMutation();
  const [getImage] = useGetImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe(user.id);
        if ("data" in response) {
          console.log(response.data);
          setUserData(response.data);
          setUpdData(response.data);
        } else if ("error" in response) {
          console.error("Error fetching user data:", response.error);
        }
        const respImage = await getImage(user.id);
        console.log(respImage);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = async () => {
    await updUser(updData);
    if (selectedImage && updData) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      await updImage({
        id: updData.id,
        file: "https://sun9-80.userapi.com/impg/oC7hN4mcMBZLq32gfaPLTuazAQcPMshlV2Oavg/RUnUiRTJxHo.jpg?size=604x340&quality=95&sign=a31aa494f5b800bc8de5c80430572447&c_uniq_tag=J6bf0LYYsBoYrLdpzn75v0I-0z_YvvM1SvlTKX4pCFg&type=album",
      });
    }
    setEditMode(false);
    window.location.reload();
  };

  const logoutUser = () => {
    removeCookie("token");
    navigate("/");
  };

  return (
    <ColumnBox>
      <div
        style={{
          padding: "20px 0 0 60px",
        }}
      >
        <TextTypography
          sx={{
            fontSize: "40px",
            fontWeight: "700",
          }}
        >
          {"Профиль"}
        </TextTypography>
      </div>
      <RowBox
        sx={{
          padding: "80px 60px",
          boxSizing: "border-box",
          gap: "40px",
        }}
      >
        <ColumnBox>
          <div>
            <img
              src={updData && updData.imageFile ? updData.imageFile : avatar}
              style={{ height: "270px", width: "270px", borderRadius: "50%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "20px",
            }}
          >
            <ConfirmButton
              onClick={() => {
                !editMode ? setEditMode(true) : updateUser();
              }}
            >
              {!editMode ? "Изменить" : "Сохранить"}
            </ConfirmButton>
            <ConfirmButton
              onClick={() => {
                logoutUser();
              }}
              disabled={editMode}
            >
              {"Выйти из аккаунта"}
            </ConfirmButton>
          </div>
        </ColumnBox>
        {!editMode ? (
          <ColumnBox
            sx={{
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Имя"}
              </TextTypography>
              <div
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  boxSizing: "border-box",
                }}
              >
                <TextTypography
                  sx={{
                    color: "gray",
                  }}
                >
                  {userData && userData.name ? userData.name : "Отсутствует"}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Фамилия"}
              </TextTypography>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  boxSizing: "border-box",
                }}
              >
                <TextTypography
                  sx={{
                    color: "gray",
                  }}
                >
                  {userData && userData.surname
                    ? userData.surname
                    : "Отсутствует"}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Отчество"}
              </TextTypography>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  boxSizing: "border-box",
                }}
              >
                <TextTypography
                  sx={{
                    color: "gray",
                  }}
                >
                  {userData && userData.patronymic
                    ? userData.patronymic
                    : "Отсутствует"}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Возраст"}
              </TextTypography>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  boxSizing: "border-box",
                }}
              >
                <TextTypography
                  sx={{
                    color: "gray",
                  }}
                >
                  {userData && userData.age ? userData.age : "Не указан"}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Пол"}
              </TextTypography>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  boxSizing: "border-box",
                }}
              >
                <TextTypography
                  sx={{
                    color: "gray",
                  }}
                >
                  {userData &&
                    (userData.gender == 0
                      ? "Не указан"
                      : userData.gender == 1
                        ? "муж"
                        : "жен")}
                </TextTypography>
              </div>
            </div>
            <div>
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Почта"}
              </TextTypography>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  boxSizing: "border-box",
                }}
              >
                <TextTypography
                  sx={{
                    color: "gray",
                  }}
                >
                  {userData && userData.email}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Телефон"}
              </TextTypography>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  boxSizing: "border-box",
                }}
              >
                <TextTypography
                  sx={{
                    color: "gray",
                  }}
                >
                  {userData && userData.phone}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Роль"}
              </TextTypography>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  boxSizing: "border-box",
                }}
              >
                <TextTypography
                  sx={{
                    color: "gray",
                  }}
                >
                  {userData && userData.role == 2 ? "Администратор" : "Клиент"}
                </TextTypography>
              </div>
            </div>
          </ColumnBox>
        ) : (
          <ColumnBox
            sx={{
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Имя"}
              </TextTypography>
              <input
                type="text"
                value={updData && updData.name !== null ? updData.name : ""}
                onChange={(e) =>
                  setUpdData({ ...updData, name: e.target.value })
                }
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  height: "30px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Фамилия"}
              </TextTypography>
              <input
                type="text"
                value={
                  updData && updData.surname !== null ? updData.surname : ""
                }
                onChange={(e) =>
                  setUpdData({ ...updData, surname: e.target.value })
                }
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  height: "30px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Отчество"}
              </TextTypography>
              <input
                type="text"
                value={
                  updData && updData.patronymic !== null
                    ? updData.patronymic
                    : ""
                }
                onChange={(e) =>
                  setUpdData({ ...updData, patronymic: e.target.value })
                }
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  height: "30px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Возраст"}
              </TextTypography>
              <input
                type="number"
                value={
                  updData && updData.age !== null ? Number(updData.age) : ""
                }
                onChange={(e) => {
                  console.log(e.target.value);
                  setUpdData({ ...updData, age: parseInt(e.target.value) });
                }}
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  height: "30px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Пол"}
              </TextTypography>
              <select
                value={updData?.gender?.toString() || ""}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  setUpdData({
                    ...updData,
                    gender: parseInt(event.target.value),
                  });
                }}
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "flex",
                  gap: "5px",
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  height: "30px",
                  boxSizing: "border-box",
                }}
              >
                <option value="0">Выберите пол</option>
                <option value="1">Муж</option>
                <option value="2">Жен</option>
              </select>
            </div>
            <div>
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Почта"}
              </TextTypography>
              <input
                type="text"
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  boxSizing: "border-box",
                  height: "34px",
                }}
                value={updData?.email || ""}
                onChange={(e) =>
                  setUpdData({ ...updData, email: e.target.value })
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexDirection: "column",
              }}
            >
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Телефон"}
              </TextTypography>
              <input
                type="text"
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  boxSizing: "border-box",
                  height: "34px",
                }}
                value={updData?.phone || ""}
                onChange={(e) =>
                  setUpdData({ ...updData, phone: e.target.value })
                }
              />
            </div>
            <div>
              <TextTypography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {"Изображение"}
              </TextTypography>
              <input
                type="file"
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  boxSizing: "border-box",
                  height: "34px",
                }}
                onChange={(e) => {
                  setUpdData({ ...updData, imageFile: e.target.value });
                  console.log(e.target.value);
                }}
              />
            </div>
          </ColumnBox>
        )}
      </RowBox>
    </ColumnBox>
  );
};
