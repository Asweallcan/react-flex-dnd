import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-right: 2px solid #aaa;
  height: 100%;
  overflow: auto;
`;

export const PaletteItem = styled.div`
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #aaa;
  padding: 8px;
  white-space: nowrap;
  border-radius: 4px;
  margin-bottom: 12px;
  background-color: #ccc;
  box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.3);
  transition: background-color ease-in 0.1s;

  &:hover {
    background-color: #f0f4ff;
  }
`;
