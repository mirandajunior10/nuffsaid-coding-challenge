import { CardActions } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  border-bottom: 1px solid black;
  font-size: 24px;
  padding-bottom: 4px;
`;

export const MainButtonsContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  button{
    & + button {
      margin-left: 8px;
    }
    &:hover{
      background-color: #88fCA3;

    }
    color:#000;
    font-size: 12px;
    font-weight: bold;
    background-color: #88fCA3;
  }

`;

export const MessagesContainer = styled.div`
  display: flex;
  max-width: 70%;
  margin: 80px auto;
  justify-content: space-between;
  gap: 16px;
`;

export const ErrorCards = styled.div`
  flex:1;
  > div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #F56236;
    margin-bottom: 8px;
    min-height: 120px;
  }
`;

export const WarningCards = styled.div`
  flex:1;
  > div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
      background: #FCE788;
      margin-bottom: 8px;
      min-height: 120px;
    }
`;

export const InfoCards = styled.div`
flex:1;
  > div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #88FCA3;
    margin-bottom: 8px;
    min-height: 120px;
  }
`;

export const CustomCardActions = styled(CardActions)`

  justify-content:flex-end;
`