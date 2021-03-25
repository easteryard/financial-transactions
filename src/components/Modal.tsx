import React, { ReactNode } from 'react'
import styled from "styled-components";
import ReactModal from 'react-modal'

interface IProps {
  children: ReactNode
  isOpen: boolean
}

export default function Modal ({ children, isOpen }: IProps) {
  return (
    <StyledModal isOpen={isOpen} ariaHideApp={false}>
      {children}
    </StyledModal>
  )
}

const StyledModal = styled(ReactModal)`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.surface};
  box-shadow: ${({ theme }) => theme.shadow.medium};
  outline: none;
`
