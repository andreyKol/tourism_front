import { ColumnBox } from '../../atoms/boxes/ColumnBox';
import { RowBox } from '../../atoms/boxes/RowBox';
import { TextTypography } from '../../atoms/typographies/TextTypography';

export const Channels = () => {
  const channels = [
    {
      label: 'emergency',
    },
    {
      label: 'cardiology',
    },
    {
      label: 'immunology',
    },
    {
      label: 'dermatology',
    },
  ];

  return (
    <ColumnBox>
      <TextTypography></TextTypography>
      <ColumnBox>
        {channels.map(() => (
          <RowBox>
            <TextTypography>` </TextTypography>
          </RowBox>
        ))}
      </ColumnBox>
    </ColumnBox>
  );
};
