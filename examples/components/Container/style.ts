import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ noContent: boolean; isDragOver: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;

  ${({ noContent }) =>
    noContent &&
    css`
      background-color: #eff0f1;
    `}  

  ${({ isDragOver }) =>
    isDragOver &&
    css`
      background-color: #f0f4ff;
    `}
`;
