import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #efefef;
`;

export const PaletteItem = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #efefef;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 12px;
  background-color: #fff;

  &:hover {
    border-color: #3370ff;
    background-color: #F0F4FF;
  }
`;
