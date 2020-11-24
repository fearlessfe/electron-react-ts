import React, { ChangeEvent, FC, useEffect, useState, MouseEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import './FileSearch.css'

interface FileSearchProps {
  title: string
  onFileSearch?: (value: string) => void
}

const FileSearch: FC<FileSearchProps> = ({ title, onFileSearch }) => {
  const [ inputActive, setInputActive ] = useState(false)
  const [value, setValue] = useState('')

  const inputNode = useRef<HTMLInputElement>(null)

  const closeSearch = (e: MouseEvent) => {
    e.preventDefault()
    setInputActive(false)
    setValue('')
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const handleInputEvent = (event: KeyboardEvent) => {
      const { keyCode } = event;
      if(keyCode === 13 && inputActive) {
        onFileSearch && onFileSearch(value)
      } else if(keyCode === 27 && inputActive) {
        closeSearch(event as any)
      }
    }
    document.addEventListener('keyup', handleInputEvent)
    return () => {
      document.removeEventListener('keyup', handleInputEvent)
    }
  })

  useEffect(() => {
    if(inputActive && null !== inputNode.current) {
      inputNode.current.focus()
    }
  }, [inputActive])
  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center">
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
        <>
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
        </>
      }
    </div>
  )
}

FileSearch.defaultProps = {
  title: '我的云文档'
}

export default FileSearch;