import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ edge?: string }>`
  width: fit-content;
  height: fit-content;
  border: 3px solid transparent;
  background-color: #ccc;
  margin: 10px;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.3);
  transition: background-color ease-in 0.1s;

  ${({ edge }) =>
    edge &&
    css`
      border-${edge}-color: #3370ff;
  `}
`;

export const Item = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: column;
`;
