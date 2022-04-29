import styled from "styled-components";

export const Wrapper = styled.div<{ isItemEntering: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #efefef;
  padding: 20px;
  border: 1px solid white;
  
  background-color: ${({ isItemEntering = false }) => isItemEntering ? 'rgb(212 211 221 / 91%)': '#efefef'};
`;
