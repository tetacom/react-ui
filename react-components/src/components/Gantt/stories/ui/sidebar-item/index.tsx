import { Typography } from '@tetacom/react-components';

import { DrillingRigInfoDto, DriveType } from '../../types';

import s from './style.module.scss';

const { Text } = Typography;

export const SidebarItem = (rig: DrillingRigInfoDto) => {
  return (
    <div key={rig.drillingRigId} className={s.drillingRig}>
      <Text fontVariant="title3" className={s.drillingRigName}>
        {rig.drillingRigNumber}
        {rig.hasTopDrive && (
          <Text fontVariant="title3" className={s.drillingRigTopDrive}>
            (ВСП)
          </Text>
        )}
        <Text fontVariant="title3" className={s.drillingRigTopDrive}>
          ({rig.drillingRigDriveType === DriveType.Electric ? 'э' : 'д'})
        </Text>
      </Text>
      <Text fontVariant="caption" className={s.drillingRigCompany}>
        {rig.contractorName}
      </Text>
      <Text fontVariant="caption" className={s.drillingRigLifting}>
        {rig.liftingCapability} т
      </Text>
    </div>
  );
};
