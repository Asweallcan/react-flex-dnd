import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ isContainer: boolean }>`
  width: 100px;
  height: 50px;
  border: 1px solid #efefef;
  background-color: #fff;

  ${({ isContainer }) =>
    isContainer &&
    css`
      min-height: 50px;
      border: none;
    `}
`;

export const Item = styled.div``;
