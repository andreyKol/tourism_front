import { ThemeProvider } from '@mui/material';
import { themeByMode } from '../../../styles/theme';
import { WorkFlowHarnessWrapper } from '../../../components/atoms/wrappers/WorkFlowHarnessWrapper';
import { mainTheme } from '../../../navigation/Router';
import { WorkFlowSideBar } from '../../../components/molecules/sidebars/WorkFlowSideBar';
import { ProfileFormView } from './ProfileFormView';

export const ProfileForm = () => {
  return (
    <ThemeProvider theme={themeByMode('light')}>
      <WorkFlowHarnessWrapper
        sx={{
          background: mainTheme.workFlowPages.mainContent.bgGradient,
        }}
      >
        <WorkFlowSideBar />
        <ProfileFormView />
      </WorkFlowHarnessWrapper>
    </ThemeProvider>
  );
};
