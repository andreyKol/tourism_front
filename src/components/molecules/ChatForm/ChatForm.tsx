import { useEffect, useState } from 'react';
import { ColumnBox } from '../../atoms/boxes/ColumnBox';
import { RowBox } from '../../atoms/boxes/RowBox';
import { TextTypography } from '../../atoms/typographies/TextTypography';
import { useAppDispatch, useAppSelector } from '../../../store/store';

import avatar1 from '../../../assets/svg/avatars/avatar1.svg';
import avatar3 from '../../../assets/svg/avatars/avatar3.svg';
import send from '../../../assets/svg/sendIcon.svg';

import { CustomInput } from '../../atoms/inputs/CustomInput';
import { useLocation, useParams } from 'react-router-dom';
import { setConn } from '../../../store/redux/socket/socket.slice';
import { useGetMeMutation } from '../../../api/users/usersApi';
import { UserData } from '../../../pages/WorkFlowPage/profile/ProfileFormView';
import { useGetMessagesMutation } from '../../../api/chats/chatsApi';

interface Imessage {
  userName: string;
  message?: string;
  avatar?: any;
  Content?: string;
}

export const ChatForm = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.activeChat.activeChat);
  const conn = useAppSelector((state) => state.socket.conn);
  const user = useAppSelector((state) => state.user.user);
  const [users, setUsers] = useState<Array<{ username: string }>>([]);
  const roomId = useParams().id;
  const [getMe] = useGetMeMutation();
  const [getMessages] = useGetMessagesMutation();
  // const [userData, setUserData] = useState<UserData | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctorId = searchParams.get('doctorId');
  const [friendData, setFriendData] = useState<UserData | null>(null);

  const [messages, setMessages] = useState<Imessage[]>([]);

  const fetchUserData = async (id: string | number) => {
    try {
      const response = await getMe(id);
      if ('data' in response) {
        return response.data;
      } else if ('error' in response) {
        console.error('Error fetching user data:', response.error);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const fetchMessages = async (chatId: string | undefined) => {
    try {
      const response = await getMessages(chatId);
      if ('data' in response) {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              userName: item.ClientID,
              message: item.Content,
              avatar: item.ClientID == user.id ? avatar1 : avatar3,
            },
          ]);
        }
      } else if ('error' in response) {
        console.error('Error fetching user data:', response.error);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (conn) {
      conn.onmessage = (message) => {
        const messageData = JSON.parse(message.data);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            userName: messageData.ClientID,
            message: messageData.Content,
            avatar: messageData.ClientID == user.id ? avatar1 : avatar3,
          },
        ]);
      };

      conn.onopen = () => {};
      conn.onclose = () => {
        console.log('disconnected');
      };
      conn.onerror = () => {
        console.log('error');
      };
      return;
    }

    const ws = new WebSocket(`ws://localhost:8080/api/v1/ws/joinRoom/${roomId}?clientId=${user.id}`);

    ws.onopen = async () => {
      await fetchMessages(roomId);
      if (doctorId) {
        const friendData = await fetchUserData(doctorId);
        setFriendData(friendData);
      }
      const userData = await fetchUserData(user.id);
      console.log('connected');
      dispatch(setConn(ws));
      const connectMessage = `${userData.Surname} ${userData.Name} ${userData.Patronymic ? userData.Patronymic : ''} подключен к серверу.`;
      messages.length === 0 ||
        ('Content' in messages[messages.length - 1] &&
          messages[messages.length - 1].Content !== connectMessage &&
          ws.send(connectMessage));
      const welcome =
        userData && userData.Gender == 2
          ? `Уважаемая ${userData.Name} ${userData.Patronymic ? userData.Patronymic : ''} мы рады, что Вы подключились к нашему чату. Задайте интересующие Вас вопросы!`
          : `Уважаемый ${userData.Name} ${userData.Patronymic ? userData.Patronymic : ''} мы рады, что Вы подключились к нашему чату. Задайте интересующие Вас вопросы!`;
      console.log(messages);
      if (localStorage.getItem('welcome') !== roomId.toString() && userData.Role == 1) {
        localStorage.setItem('welcome', roomId.toString());
        ws.send(welcome);
      }
    };

    ws.onclose = () => {
      console.log('disconnected');
    };

    ws.onerror = () => {
      console.log('error');
    };
  }, [conn, dispatch, roomId, user.id]);

  const [inputValues, setInputValues] = useState({
    sendMessage: '',
  });

  const handleInputChange = (id: string, newValue: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const handleCreateMessage = () => {
    console.log(inputValues.sendMessage);
    if (inputValues.sendMessage) {
      conn?.send(inputValues.sendMessage);
      handleInputChange('sendMessage', '');
    }
  };

  useEffect(() => {
    const scrollToBottom = () => {
      const chatContainer = document.querySelector('.chatContainer');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <ColumnBox
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
        }}
      >
        <RowBox
          sx={{
            height: 'max-content',
            padding: '15px',
            boxSizing: 'border-box',
            borderBottom: '1px solid lightgray',
          }}
        >
          <TextTypography
            sx={{
              fontWeight: '600',
            }}
          >
            {active}
          </TextTypography>
        </RowBox>
        <ColumnBox
          className="chatContainer"
          sx={{
            // justifyContent: 'end',
            padding: '10px',
            boxSizing: 'border-box',
            gap: '10px',
            overflowY: 'scroll',
          }}
        >
          {messages.map((msg, index) => (
            <RowBox
              key={index}
              sx={{
                justifyContent: msg.userName == user.id.toString() ? 'end' : 'start',
                flexDirection: msg.userName == user.id.toString() ? 'row-reverse' : '',
                height: 'max-content',
              }}
            >
              <img src={msg.avatar} style={{ height: '40px', width: '40px', marginTop: '10px', borderRadius: '4px' }} />
              {msg.userName == user.id.toString() ? (
                <ColumnBox>
                  <TextTypography
                    sx={{
                      padding: '10px',
                      boxSizing: 'border-box',
                      textAlign: 'right',
                    }}
                  >
                    {msg.message}
                  </TextTypography>
                </ColumnBox>
              ) : (
                <ColumnBox>
                  <TextTypography
                    sx={{
                      padding: '10px 10px 0 10px',
                      boxSizing: 'border-box',
                      color: '#666',
                      fontSize: '12px',
                    }}
                  >
                    {friendData && friendData.Name} {friendData && friendData.Surname}{' '}
                    {friendData && friendData.Patronymic && friendData.Patronymic}
                  </TextTypography>
                  <TextTypography
                    sx={{
                      padding: '0 10px 10px 10px',
                      boxSizing: 'border-box',
                    }}
                  >
                    {msg.message}
                  </TextTypography>
                </ColumnBox>
              )}
            </RowBox>
          ))}
        </ColumnBox>
        <RowBox
          style={{
            bottom: 0,
            zIndex: '4',
            background: 'white',
            padding: '10px',
            boxSizing: 'border-box',
            height: 'max-content',
            gap: '5px',
            alignItems: 'center',
          }}
        >
          <CustomInput id="sendMessage" value={inputValues.sendMessage} onChange={handleInputChange} maxHeight="60px" />
          <button
            type="submit"
            onClick={handleCreateMessage}
            style={{
              background: 'none',
              border: 'none',
            }}
          >
            <img src={send} style={{ height: '30px', width: '30px' }} />
          </button>
        </RowBox>
      </ColumnBox>
    </form>
  );
};
