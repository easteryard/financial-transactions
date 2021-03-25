import React from 'react'
import styled from "styled-components";
import Modal from './Modal';

interface IProps {
  isOpen: boolean
  dialogText: string
  confirmText?: string
  onConfirm: () => void
  onCancel: () => void
  confirmColor?: string
}

interface IConfirmButton {
  color?: string
}

export default function ConfirmationDialog ({ isOpen, dialogText, onConfirm, onCancel, confirmColor, confirmText = 'Confirm' }: IProps) {
  return (
    <Modal isOpen={isOpen}>
      <div>
        <StyledH4>{dialogText}</StyledH4>
        <StyledActionsDiv>
          <StyledCancelButton onClick={onCancel}>Cancel</StyledCancelButton>
          <StyledConfirmButton onClick={onConfirm} color={confirmColor}>{confirmText}</StyledConfirmButton>
        </StyledActionsDiv>
      </div>
    </Modal>
  )
}

const StyledH4 = styled.h4`
  text-align: center;
`

const StyledActionsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 8px 0 16px 0;
`

const StyledConfirmButton = styled.button<IConfirmButton>`
  background-color: ${({ theme, color }) => color ?? theme.button.positive.interactive};
  border-radius: 16px;
  border: none;
  padding: 8px;
`

const StyledCancelButton = styled.button`
  background-color: ${({ theme }) => theme.button.secondary.interactive}; 
  border-radius: 16px;
  border: none;
  padding: 8px;
`
