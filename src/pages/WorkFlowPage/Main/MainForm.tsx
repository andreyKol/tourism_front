import { ThemeProvider } from "@mui/material";
import { memo } from "react";
import { themeByMode } from "../../../styles/theme";
import { WorkFlowHarnessWrapper } from "../../../components/atoms/wrappers/WorkFlowHarnessWrapper";
import { MainFormView } from "./MainFormView";
import { WorkFlowSideBar } from "../../../components/molecules/sidebars/WorkFlowSideBar";
import { mainTheme } from "../../../navigation/Router";

export const MainForm = memo(() => {
  return (
    <ThemeProvider theme={themeByMode("light")}>
      <WorkFlowHarnessWrapper
        sx={{
          background: mainTheme.workFlowPages.mainContent.bgGradient,
        }}
      >
        <WorkFlowSideBar />
        <MainFormView />
      </WorkFlowHarnessWrapper>
    </ThemeProvider>
  );
});

MainForm.displayName = "MainForm";
