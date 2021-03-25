import React from 'react'
import ReactTooltip from 'react-tooltip';

interface IProps {
  id: string
  message: string
  effect?: 'float' | 'solid'
}

export default function Tooltip ({ id, message, effect = 'solid' }: IProps) {
  return (
      <ReactTooltip id={id} effect={effect} type='info'>
        <span>{message}</span>
      </ReactTooltip>
  )
}
