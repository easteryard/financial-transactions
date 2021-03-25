import React from 'react'
import ReactTooltip from 'react-tooltip';

interface IProps {
  id: string
  message: string
  effect?: 'float' | 'solid'
  type?: 'dark' | 'success' | 'warning' | 'error' | 'info' | 'light'
}

export default function Tooltip ({ id, message, effect = 'solid', type = 'dark' }: IProps) {
  return (
      <ReactTooltip id={id} effect={effect} type={type}>
        <span>{message}</span>
      </ReactTooltip>
  )
}
