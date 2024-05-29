import { setActiveChat } from '../../../store/redux/activeChat/activeChat.slice';
import { useAppDispatch } from '../../../store/store';
import { ColumnBox } from '../../atoms/boxes/ColumnBox';
import { RowBox } from '../../atoms/boxes/RowBox';
import { TextTypography } from '../../atoms/typographies/TextTypography';
import avatar1 from '../../../assets/svg/avatars/avatar1.svg';

interface InfoCardProps {
  doctor: {
    ID: number
    Name: string
    Surname: string
    Age: number
    Email: string
    Phone: string
    LastOnline: string
    Patronymic: string
    Role: number
  };
  onClick: (doctorId: number) => void;
}

export const InfoCard = ({ doctor, onClick }: InfoCardProps) => {
  
  return (
    <ColumnBox
      onClick={() => {onClick(doctor.ID)}}
      sx={{
        width: '325px',
        height: '192px',
        padding: '10px',
        boxSizing: 'border-box',
        border: '2px solid #ddd',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: '0.2s',
        gap: '20px',
        ':hover': {
          background: '#b0cdff',
        },
      }}
    >
      <RowBox
        sx={{
          gap: '10px',
          height: 'max-content',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img src={avatar1} style={{ height: '100px', width: '100px' }} />
        </div>
        <ColumnBox sx={{ alignItems: 'start', gap: '1px' }}>
          <TextTypography
            sx={{
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            {doctor.Name + ' ' + doctor.Surname}
          </TextTypography>
          <TextTypography
            sx={{
              fontSize: '12px',
              fontWeight: '700',
              textAlign: 'start',
            }}
          >
            {doctor.Name}
          </TextTypography>
          <TextTypography
            sx={{
              fontSize: '12px',
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            {`Age: ${doctor.Age} years`}
          </TextTypography>
          <TextTypography
            sx={{
              fontSize: '12px',
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            {`Email: ${doctor.Email}`}
          </TextTypography>
          <TextTypography
            sx={{
              fontSize: '12px',
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            {`Phone: ${doctor.Phone}`}
          </TextTypography>
        </ColumnBox>
      </RowBox>

      <div>
        {/* <TextTypography
          sx={{
            fontSize: '12px',
            fontWeight: '600',
          }}
        >
          {doctor.info}
        </TextTypography> */}
      </div>
    </ColumnBox>
  );
};
