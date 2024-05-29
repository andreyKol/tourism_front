import { useAppSelector } from '../../../store/store';

import { ChatForm } from '../../../components/molecules/ChatForm/ChatForm';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const ChatFormView = () => {

  return <ChatForm />
};
