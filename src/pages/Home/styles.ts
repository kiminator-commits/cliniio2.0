import styled from 'styled-components';

export const MenuButton = styled.button`
  position: fixed;
  top: 24px;
  left: 12px;
  z-index: 50;
  background: #4ecdc4;
  color: white;
  border-radius: 0 8px 8px 0;
  padding: 12px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;

  &:hover {
    background: #3dbdb5;
  }
`;
