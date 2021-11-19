import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{
  disabled: boolean;
  isDragging: boolean;
}>`
  cursor: -webkit-grab;
  display: contents;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}

  ${({ isDragging }) =>
    isDragging &&
    css`
      * {
        pointer-events: none;
      }
    `}
`;
