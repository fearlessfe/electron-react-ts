import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import useKeyPress from '../../hooks/useKeyPress'
import { File } from '../../types';
interface FileListProps {
  files: File[]
  onFileClick?: (id: string) => void
  onFileDelete?: (id: string) => void
  onSaveEdit?: (id: string, title: string) => void
}


const FileList: FC<FileListProps> = (props) => {
  const {
    files,
    onFileClick,
    onFileDelete,
    onSaveEdit
  } = props;

  const [editStatus, setEditStatus] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const inputNode = useRef<HTMLInputElement>(null)

  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const handleFileClick = (file: File) => {
    onFileClick && onFileClick(file.id)
  }
  const handleFileDelete = (file: File) => {
    onFileDelete && onFileDelete(file.id)
  }
  const handleFileEdit = (file: File) => {
    setEditStatus(file.id);
    setValue(file.title);
  }

  const closeSearch = (file: File) => {
    setEditStatus('')
    setValue('')
    if(file.isNew) {
      handleFileDelete(file)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    const file = files.find(item => item.id === editStatus) as File;
    if(enterPressed && editStatus && value.trim() !== '') {
      onSaveEdit && onSaveEdit(file.id, value);
      closeSearch(file)
    }
    if(escPressed && editStatus) {
      closeSearch(file)
    }
  });

  useEffect(() => {
    if(editStatus) {
      inputNode.current && inputNode.current.focus()
    }
  }, [editStatus])

  useEffect(() => {
    const newFile = files.find(file => file.isNew)
    if(newFile) {
      setEditStatus(newFile.id)
      setValue(newFile.title)
    }
  }, [files])
  return (
    <ul className="list-group list-group-flush file-list">
      {
        files.map(file => (
          <li 
            className="list-group-item bg-light d-flex row align-items-center file-item mx-0"
            key={file.id}
          >
            { (file.id !== editStatus && !file.isNew) &&
            <>
              <span className="col-2">
                <FontAwesomeIcon 
                  icon={faMarkdown}
                  size="lg"
                />
              </span>
              <span className="col-6 c-link" onClick={() => {handleFileClick(file)}}>{file.title}</span>
              <button 
                className="icon-button col-2"
                onClick={() => {handleFileEdit(file)}}
              >
                <FontAwesomeIcon 
                  icon={faEdit}
                  size="lg"
                  title="编辑"
                />
              </button>
              <button 
                className="icon-button col-2"
                onClick={() => {handleFileDelete(file)}}
              >
                <FontAwesomeIcon 
                  icon={faTrash}
                  size="lg"
                  title="删除"
                />
              </button>
            </>
            }
            {
              (file.id === editStatus || file.isNew) &&
              <>
                <input 
                  className="form-control"
                  value={value}
                  ref={inputNode}
                  placeholder="请输入文件名称"
                  onChange={handleInputChange}
                />
                <button
                  className="icon-button"
                  onClick={() => {closeSearch(file)}}
                >
                  <FontAwesomeIcon 
                    icon={faTimes}
                    size="lg"
                    title="关闭"
                  />
                </button>
              </>
            }
          </li>
        ))
      }
    </ul>
  )
}

export default FileList