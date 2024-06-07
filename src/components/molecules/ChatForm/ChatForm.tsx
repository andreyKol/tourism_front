import { useEffect, useState } from "react";
import { ColumnBox } from "../../atoms/boxes/ColumnBox";
import { RowBox } from "../../atoms/boxes/RowBox";
import { TextTypography } from "../../atoms/typographies/TextTypography";
import { useAppDispatch, useAppSelector } from "../../../store/store";

import avatar1 from "../../../assets/svg/avatars/avatar1.svg";
import avatar3 from "../../../assets/svg/avatars/avatar3.svg";
import send from "../../../assets/svg/sendIcon.svg";

import { CustomInput } from "../../atoms/inputs/CustomInput";
import { useLocation, useParams } from "react-router-dom";
import { setConn } from "../../../store/redux/socket/socket.slice";
import { useGetMeMutation } from "../../../api/users/usersApi";
import { UserData } from "../../../pages/WorkFlowPage/profile/ProfileFormView";
import {
  useCreateRoomMutation,
  useGetMessagesMutation,
  useJoinRoomMutation,
} from "../../../api/chats/chatsApi";

interface Imessage {
  userName: string;
  message?: string;
  avatar?: any;
  Content?: string;
  name?: string;
}

export const ChatForm = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.activeChat.activeChat);
  const conn = useAppSelector((state) => state.socket.conn);
  const user = useAppSelector((state) => state.user.user);
  const [createRoom] = useCreateRoomMutation();
  const [joinRoom] = useJoinRoomMutation();

  const roomId = useParams().id;
  const [getMe] = useGetMeMutation();
  const [getMessages] = useGetMessagesMutation();

  const [messages, setMessages] = useState<Imessage[]>([]);

  const fetchUserData = async (id: string | number) => {
    try {
      const response = await getMe(id);
      if ("data" in response) {
        return response.data;
      } else if ("error" in response) {
        console.error("Error fetching user data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchMessages = async (chatId: string | undefined) => {
    try {
      const response = await getMessages(chatId);
      if ("data" in response) {
        console.log("old messages", response.data);
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            const item = response.data[i];
            const author = await fetchUserData(item.ClientID);
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                userName: item.ClientID,
                name: author
                  ? `${author.name} ${author.surname}`
                  : `Пользователь #${item.ClientId}`,
                message: item.Content,
                avatar: item.ClientID == user.id ? avatar1 : avatar3,
              },
            ]);
          }
        } else {
          await createRoomAndJoin();
        }
      } else if ("error" in response) {
        console.error("Error fetching messages:", response.error);
        await createRoomAndJoin();
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      await createRoomAndJoin();
    }
  };

  const createRoomAndJoin = async () => {
    await fetchCreateRoom();
    await fetchJoinRoom();
  };

  const fetchCreateRoom = async () => {
    try {
      const response = await createRoom(roomId);
      if ("data" in response) {
        console.log("created room ", response.data);
      } else if ("error" in response) {
        console.error("Error creating room:", response.error);
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const fetchJoinRoom = async () => {
    try {
      const obj = { roomId: roomId, userId: user.id };
      const response = await joinRoom(obj);
      if ("data" in response) {
        console.log("joined room ", response.data);
      } else if ("error" in response) {
        console.error("Error joining room:", response.error);
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  useEffect(() => {
    const initWebSocket = () => {
      const ws = new WebSocket(
        `ws://localhost:8080/api/v1/ws/joinRoom/${roomId}?clientId=${user.id}`
      );

      ws.onopen = async () => {
        await fetchMessages(roomId);
        const userData = await fetchUserData(user.id);
        console.log("connected", userData);
        dispatch(setConn(ws));
        const connectMessage = `${userData.surname} ${userData.name} ${userData.patronymic ? userData.patronymic : ""} подключен к чату.`;
        ws.send(connectMessage);
        const welcome =
          userData && userData.gender == 2
            ? `Уважаемая ${userData.name} ${userData.patronymic ? userData.patronymic : ""}, мы рады, что Вы подключились к нашему чату. Задайте интересующие Вас вопросы!`
            : `Уважаемый ${userData.name} ${userData.patronymic ? userData.patronymic : ""}, мы рады, что Вы подключились к нашему чату. Задайте интересующие Вас вопросы!`;
        if (roomId && localStorage.getItem("welcome") !== roomId.toString()) {
          localStorage.setItem("welcome", roomId.toString());
          ws.send(welcome);
        }
      };

      ws.onmessage = async (message) => {
        const messageData = JSON.parse(message.data);
        const author = await fetchUserData(messageData.ClientID);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            userName: messageData.ClientID,
            name: author
              ? `${author.name} ${author.surname}`
              : `Пользователь #${messageData.ClientId}`,
            message: messageData.Content,
            avatar: messageData.ClientID == user.id ? avatar1 : avatar3,
          },
        ]);
      };

      ws.onclose = () => {
        console.log("disconnected");
      };

      ws.onerror = () => {
        console.log("error");
      };
    };

    if (!conn) {
      initWebSocket();
    }

    return () => {
      if (conn) {
        conn.close();
      }
    };
  }, [conn, dispatch, roomId, user.id]);

  const [inputValues, setInputValues] = useState({
    sendMessage: "",
  });

  const handleInputChange = (id: string, newValue: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const handleCreateMessage = () => {
    if (inputValues.sendMessage && conn) {
      conn.send(inputValues.sendMessage);
      handleInputChange("sendMessage", "");
    }
  };

  useEffect(() => {
    const scrollToBottom = () => {
      const chatContainer = document.querySelector(".chatContainer");
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
        width: "100%",
        height: "100%",
      }}
    >
      <ColumnBox
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RowBox
          sx={{
            height: "max-content",
            padding: "15px",
            boxSizing: "border-box",
            borderBottom: "1px solid lightgray",
          }}
        >
          <TextTypography
            sx={{
              fontWeight: "600",
            }}
          >
            {active}
          </TextTypography>
        </RowBox>
        <ColumnBox
          className="chatContainer"
          sx={{
            // justifyContent: 'end',
            padding: "10px",
            height: "calc(100vh - 130px)",
            boxSizing: "border-box",
            gap: "10px",
            overflowY: "scroll",
          }}
        >
          {messages.map((msg, index) => (
            <RowBox
              key={index}
              sx={{
                justifyContent:
                  msg.userName == user.id.toString() ? "end" : "start",
                flexDirection:
                  msg.userName == user.id.toString() ? "row-reverse" : "",
                height: "max-content",
              }}
            >
              <img
                src={msg.avatar}
                style={{
                  height: "40px",
                  width: "40px",
                  marginTop: "10px",
                  borderRadius: "4px",
                }}
              />
              {msg.userName == user.id.toString() ? (
                <ColumnBox>
                  <TextTypography
                    sx={{
                      padding: "10px",
                      boxSizing: "border-box",
                      textAlign: "right",
                    }}
                  >
                    {msg.message}
                  </TextTypography>
                </ColumnBox>
              ) : (
                <ColumnBox>
                  <TextTypography
                    sx={{
                      padding: "10px 10px 0 10px",
                      boxSizing: "border-box",
                      color: "#666",
                      fontSize: "12px",
                    }}
                  >
                    {msg.name}
                  </TextTypography>
                  <TextTypography
                    sx={{
                      padding: "0 10px 10px 10px",
                      boxSizing: "border-box",
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
            zIndex: "4",
            padding: "10px",
            boxSizing: "border-box",
            height: "max-content",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <CustomInput
            id="sendMessage"
            value={inputValues.sendMessage}
            onChange={handleInputChange}
            maxHeight="60px"
            background="white"
          />
          <button
            type="submit"
            onClick={handleCreateMessage}
            style={{
              background: "none",
              border: "none",
            }}
          >
            <img src={send} style={{ height: "30px", width: "30px" }} />
          </button>
        </RowBox>
      </ColumnBox>
    </form>
  );
};
