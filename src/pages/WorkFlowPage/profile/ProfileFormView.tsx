import { useEffect, useState } from 'react';
import { ColumnBox } from '../../../components/atoms/boxes/ColumnBox';
import { RowBox } from '../../../components/atoms/boxes/RowBox';
import { ConfirmButton } from '../../../components/atoms/buttons/ConfirmButton';
import { TextTypography } from '../../../components/atoms/typographies/TextTypography';

import avatar from '../../../assets/svg/avatars/avatar.svg';

import eye from '../../../assets/svg/eye.svg';
import closeEye from '../../../assets/svg/closeEye.svg';

import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  useGetMeMutation,
  useGetUsersMutation,
  useUpdateUserMutation,
  useUpdateImageMutation,
  useGetImageMutation,
} from '../../../api/users/usersApi';
import { removeCookie } from 'typescript-cookie';
import { useNavigate } from 'react-router-dom';

export interface UserData {
  Age?: number | null;
  CreatedAt?: string | null;
  DeletedAt?: string | null;
  Email?: string | null;
  Experience?: number | null;
  Gender?: number | null;
  ID?: number | null;
  ImageFile?: string | null;
  LastOnline?: string | null;
  MedicalCardFile?: string | null;
  Name?: string | null;
  PasswordEncrypted?: string | null;
  Patronymic?: string | null;
  Phone?: string | null;
  PolicyFile?: string | null;
  PolicyNumber?: string | null;
  PortfolioFile?: string | null;
  Role?: number | null;
  SpecializationFile?: string | null;
  Surname?: string | null;
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
        if ('data' in response) {
          setUserData(response.data);
          setUpdData(response.data);
        } else if ('error' in response) {
          console.error('Error fetching user data:', response.error);
        }
        const respImage = await getImage(user.id);
        console.log(respImage);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = async () => {
    await updUser(updData);
    if (selectedImage && updData) {
      const formData = new FormData();
      formData.append('file', selectedImage);
      await updImage({ ID: updData.ID, file: formData });
    }
    setEditMode(false);
    window.location.reload();
  };

  const logoutUser = () => {
    removeCookie('token');
    navigate('/');
  };

  return (
    <ColumnBox>
      <div
        style={{
          padding: '20px 0 0 60px',
        }}
      >
        <TextTypography
          sx={{
            fontSize: '40px',
            fontWeight: '700',
          }}
        >
          {'Профиль'}
        </TextTypography>
      </div>
      <RowBox
        sx={{
          padding: '80px 60px',
          boxSizing: 'border-box',
          gap: '40px',
        }}
      >
        <ColumnBox>
          <div>
            <img
              src={updData && updData.ImageFile ? updData.ImageFile : avatar}
              style={{ height: '270px', width: '270px', borderRadius: '50%' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
            <ConfirmButton
              onClick={() => {
                !editMode ? setEditMode(true) : updateUser();
              }}
            >
              {!editMode ? 'Изменить' : 'Сохранить'}
            </ConfirmButton>
            <ConfirmButton
              onClick={() => {
                logoutUser();
              }}
              disabled={editMode}
            >
              {'Выйти из аккаунта'}
            </ConfirmButton>
          </div>
        </ColumnBox>
        {!editMode ? (
          <ColumnBox
            sx={{
              gap: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Имя'}
              </TextTypography>
              <div
                style={{
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  boxSizing: 'border-box',
                }}
              >
                <TextTypography
                  sx={{
                    color: 'gray',
                  }}
                >
                  {userData && userData.Name ? userData.Name : 'Отсутствует'}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Фамилия'}
              </TextTypography>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  boxSizing: 'border-box',
                }}
              >
                <TextTypography
                  sx={{
                    color: 'gray',
                  }}
                >
                  {userData && userData.Surname ? userData.Surname : 'Отсутствует'}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Отчество'}
              </TextTypography>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  boxSizing: 'border-box',
                }}
              >
                <TextTypography
                  sx={{
                    color: 'gray',
                  }}
                >
                  {userData && userData.Patronymic ? userData.Patronymic : 'Отсутствует'}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Возраст'}
              </TextTypography>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  boxSizing: 'border-box',
                }}
              >
                <TextTypography
                  sx={{
                    color: 'gray',
                  }}
                >
                  {userData && userData.Age ? userData.Age : 'Не указан'}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Пол'}
              </TextTypography>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  boxSizing: 'border-box',
                }}
              >
                <TextTypography
                  sx={{
                    color: 'gray',
                  }}
                >
                  {userData && (userData.Gender == 0 ? 'Не указан' : userData.Gender == 1 ? 'муж' : 'жен')}
                </TextTypography>
              </div>
            </div>
            <div>
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Почта'}
              </TextTypography>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  boxSizing: 'border-box',
                }}
              >
                <TextTypography
                  sx={{
                    color: 'gray',
                  }}
                >
                  {userData && userData.Email}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Телефон'}
              </TextTypography>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  boxSizing: 'border-box',
                }}
              >
                <TextTypography
                  sx={{
                    color: 'gray',
                  }}
                >
                  {userData && userData.Phone}
                </TextTypography>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Роль'}
              </TextTypography>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  boxSizing: 'border-box',
                }}
              >
                <TextTypography
                  sx={{
                    color: 'gray',
                  }}
                >
                  {userData && userData.Role == 2 ? 'Доктор' : 'Пациент'}
                </TextTypography>
              </div>
            </div>
          </ColumnBox>
        ) : (
          <ColumnBox
            sx={{
              gap: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Имя'}
              </TextTypography>
              <input
                type="text"
                value={updData && updData.Name !== null ? updData.Name : ''}
                onChange={(e) => setUpdData({ ...updData, Name: e.target.value })}
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  height: '30px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Фамилия'}
              </TextTypography>
              <input
                type="text"
                value={updData && updData.Surname !== null ? updData.Surname : ''}
                onChange={(e) => setUpdData({ ...updData, Surname: e.target.value })}
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  height: '30px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Отчество'}
              </TextTypography>
              <input
                type="text"
                value={updData && updData.Patronymic !== null ? updData.Patronymic : ''}
                onChange={(e) => setUpdData({ ...updData, Patronymic: e.target.value })}
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  height: '30px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Возраст'}
              </TextTypography>
              <input
                type="number"
                value={updData && updData.Age !== null ? Number(updData.Age) : ''}
                onChange={(e) => {
                  console.log(e.target.value);
                  setUpdData({ ...updData, Age: parseInt(e.target.value) });
                }}
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  height: '30px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Пол'}
              </TextTypography>
              <select
                value={updData?.Gender?.toString() || ''}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  setUpdData({
                    ...updData,
                    Gender: parseInt(event.target.value),
                  });
                }}
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  gap: '5px',
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  height: '30px',
                  boxSizing: 'border-box',
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
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Почта'}
              </TextTypography>
              <input
                type="text"
                style={{
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  boxSizing: 'border-box',
                  height: '34px',
                }}
                value={updData?.Email || ''}
                onChange={(e) => setUpdData({ ...updData, Email: e.target.value })}
              />
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'column',
              }}
            >
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Телефон'}
              </TextTypography>
              <input
                type="text"
                style={{
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  boxSizing: 'border-box',
                  height: '34px',
                }}
                value={updData?.Phone || ''}
                onChange={(e) => setUpdData({ ...updData, Phone: e.target.value })}
              />
            </div>
            <div>
              <TextTypography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {'Изображение'}
              </TextTypography>
              <input
                type="file"
                style={{
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  boxSizing: 'border-box',
                  height: '34px',
                }}
                onChange={(e) => {
                  setUpdData({ ...updData, ImageFile: e.target.value });
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
