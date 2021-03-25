import React from 'react'
import styled from "styled-components";
import Modal from 'react-modal'

interface IProps {
  isOpen?: boolean
  dialogText: string
  confirmText?: string
  onConfirm: () => void
  onCancel: () => void
  confirmColor?: string
}

interface IConfirmButton {
  color?: string
}

export default function Dialog ({ isOpen, dialogText, onConfirm, onCancel, confirmColor, confirmText = 'Confirm' }: IProps) {
  return (
    <StyledModal isOpen={isOpen ?? true}>
      <div>
        <StyledH4>{dialogText}</StyledH4>
        <StyledActionsDiv>
          <StyledCancelButton onClick={onCancel}>Cancel</StyledCancelButton>
          <StyledConfirmButton onClick={onConfirm} color={confirmColor}>{confirmText}</StyledConfirmButton>
        </StyledActionsDiv>
      </div>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
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
