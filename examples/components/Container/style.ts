import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ noContent: boolean; isDragOver: boolean }>`
  width: 100%;
  min-height: 100%;

  ${({ noContent }) =>
    noContent
      ? css`
          background-color: #eff0f1;
        `
      : css`
          padding: 12px;
        `}

  ${({ isDragOver }) =>
    isDragOver &&
    css`
      background-color: #f0f4ff;
    `}
`;
