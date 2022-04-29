import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ isContainer: boolean }>`
  border: 1px solid #efefef;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  min-width: 200px;
  border-radius: 10px;
  width: fit-content;
  height: fit-content;
  margin: 10px;

  ${({ isContainer }) =>
    isContainer &&
    css`
      min-height: 50px;
      border: none;
    `}

  ${({ edge }) =>
    edge &&
    css`
      border-${edge}-color: #3370ff;
  `}
`;

export const Item = styled.div``;
