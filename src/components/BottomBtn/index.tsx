import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface BottomBtnProps {
  text: string
  colorClass: string
  icon: IconProp
  onBtnClick: () => void
}

const BottomBtn: FC<BottomBtnProps> = (props) => {
  const {
    text,
    colorClass,
    icon,
    onBtnClick
  } = props
  return(
    <button className={`btn btn-block no-border ${colorClass}`} onClick={onBtnClick}>
      <FontAwesomeIcon
        className="mr-2"
        icon={icon}
        size="lg"
      />
      {text}
    </button>
  )
}

export default BottomBtn;