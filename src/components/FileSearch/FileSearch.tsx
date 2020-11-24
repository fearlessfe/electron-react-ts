import React, { ChangeEvent, FC, useEffect, useState, MouseEvent, useRef } from 'react';

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
    <div className="alert alert-primary">
      {!inputActive && 
        <div className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <button 
            className="btn btn-primary"
            onClick={() => {setInputActive(true)}}
          >搜索</button>
        </div>
      }

      {
        inputActive &&
        <div className="row">
          <input 
            className="form-control col-8"
            value={value}
            ref={inputNode}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-primary col-4"
            onClick={closeSearch}
          >关闭</button>
        </div>
      }
    </div>
  )
}

export default FileSearch;