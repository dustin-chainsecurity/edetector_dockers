import { ChildInnerWhiteContainer } from '../../../commonComponent/StyledComponents'
import { useToast } from '../../../../../hooks/useToast/useToast'

const Parent = () => {
  const { toast, alarm } = useToast() ;
  
  const handleAdd = () => {
    toast("Testing") ;
  }
  const handleErrorAdd = () => {
    alarm("error!!!") ;
  }

  return (
    <ChildInnerWhiteContainer>
      <button onClick={handleAdd}>Testing</button>
      <button onClick={handleErrorAdd}>alarm</button>
    </ChildInnerWhiteContainer>
  )
}

export default Parent