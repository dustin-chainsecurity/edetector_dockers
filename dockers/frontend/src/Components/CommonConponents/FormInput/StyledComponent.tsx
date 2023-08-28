import styled from "styled-components";

export const HookFormSubmit = styled.input`
  cursor: pointer;
  width: 50px;
  height: 30px;
  padding: 0;
  border: none;
  color: white;
  background-color: #ff9800;
  
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
    &:hover {
      background-color: gray; /* 設置disabled狀態下hover的背景顏色 */
    }
  }

  &:hover {
    background-color: #ff9800ed; /* 設置hover時的背景顏色 */
  }
`;

export const HookFormSubmitContainer = styled.div`
  width: 100%;
  height: 100px;
  padding: 20px;
`

export const HookFormContainer = styled.div`
  width: 100%;
  margin: 10px auto;
`;

export const HookFormFlexBox = styled.div`
  width: 560px;
  display: flex;
  align-items: center;
  justify-content: space-between;
` ;



