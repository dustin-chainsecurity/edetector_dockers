import { IFormatedDevice } from '../../../../constant/interfaceBoard';
import { ActionPlugContainer, ActionPlugTitle } from '../../commonComponent/StyledComponents'
import ActionButton from './CommonComponents/ActionButton'

interface ActionISOProps {
  setData: React.Dispatch<React.SetStateAction<IFormatedDevice[]>>;
}

const ActionISO = (props:ActionISOProps) => {
  const { setData } = props;
  return (
    <ActionPlugContainer>
        <ActionPlugTitle>關鍵映像檔</ActionPlugTitle>
        <ActionButton setData={setData}/>
    </ActionPlugContainer>
  )
}

export default ActionISO