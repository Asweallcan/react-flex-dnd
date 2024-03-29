import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ noContent: boolean; isDragOver: boolean }>`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

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
