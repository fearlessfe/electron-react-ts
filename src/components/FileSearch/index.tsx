import React, { ChangeEvent, FC, useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import useKeyPress from '../../hooks/useKeyPress';

interface FileSearchProps {
  title: string
  onFileSearch?: (value: string) => void
}

const FileSearch: FC<FileSearchProps> = ({ title, onFileSearch }) => {
  const [ inputActive, setInputActive ] = useState(false)
  const [value, setValue] = useState('')

  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const inputNode = useRef<HTMLInputElement>(null)

  const closeSearch = () => {
    setInputActive(false)
    setValue('')
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    if(enterPressed && inputActive) {
      onFileSearch && onFileSearch(value)
    }
    if(escPressed && inputActive) {
      closeSearch && closeSearch()
    }
  })

  useEffect(() => {
    if(inputActive && null !== inputNode.current) {
      inputNode.current.focus()
    }
  }, [inputActive])
  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center md-0">
      {!inputActive && 
        <>
          <span>{title}</span>
          <button 
            className="icon-button"
            onClick={() => {setInputActive(true)}}
          >
            <FontAwesomeIcon 
              icon={faSearch}
              size="lg"
              title="搜索"
            />
          </button>
        </>
      }

      {
        inputActive &&
        <div className="input-group input-group-sm">
          <input 
            className="form-control"
            value={value}
            ref={inputNode}
            onChange={handleInputChange}
          />
          <button
            className="icon-button"
            onClick={closeSearch}
          >
            <FontAwesomeIcon 
              icon={faTimes}
              size="lg"
              title="关闭"
            />
          </button>
        </div>
      }
    </div>
  )
}

FileSearch.defaultProps = {
  title: '我的云文档'
}

export default FileSearch;