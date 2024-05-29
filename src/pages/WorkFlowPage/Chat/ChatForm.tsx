import { ThemeProvider } from '@mui/material';
import { memo } from 'react';
import { themeByMode } from '../../../styles/theme';
import { WorkFlowHarnessWrapper } from '../../../components/atoms/wrappers/WorkFlowHarnessWrapper';
import { ChatFormView } from './ChatFormView';
import { WorkFlowSideBar } from '../../../components/molecules/sidebars/WorkFlowSideBar';
import { mainTheme } from '../../../navigation/Router';

export const ChatForm = memo(() => {
  return (
    <ThemeProvider theme={themeByMode('light')}>
        <WorkFlowHarnessWrapper
          sx={{
            background: mainTheme.workFlowPages.mainContent.bgGradient,
          }}
        >
          <WorkFlowSideBar />
          <ChatFormView />
        </WorkFlowHarnessWrapper>
    </ThemeProvider>
  );
});

ChatForm.displayName = 'ChatForm';
