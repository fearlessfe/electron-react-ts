import { FC, MouseEvent } from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { File } from '../../types';
import './TabList.scss'

interface TabListProps {
  files: Array<File>
  activedId: string
  unsaveIds?: string[]
  onTabClick?: (id: string) => void
  onCloseTab?: (id: string) => void
}

const TabList: FC<TabListProps> = (props) => {
  const {
    files,
    activedId,
    unsaveIds,
    onTabClick,
    onCloseTab
  } = props;

  const handleTabClick = (e: MouseEvent, file: File) => {
    e.preventDefault();
    onTabClick && onTabClick(file.id)
  }

  const handleCloseClick = (e: MouseEvent, file: File) => {
    e.preventDefault();
    e.stopPropagation();
    onCloseTab && onCloseTab(file.id)
  }
  return (
    <ul className="nav nav-pills tablist-component">
      {
        files.map(file => {
          const withUnsavedMark = unsaveIds?.includes(file.id)
          const classes = classnames({
            'nav-link': true,
            'active': file?.id === activedId,
            'with-unsaved': withUnsavedMark
          })
          return (
          <li className="nav-item" key={file.id}>
            <a
              href="void"
              className={classes}
              onClick={(e) => {handleTabClick(e, file)}}
            >
              {file.title}
              <span 
                className="ml-2 close-icon"
                onClick={(e ) => { handleCloseClick(e, file) }}
              >
                <FontAwesomeIcon 
                  icon={faTimes}
                />
              </span>
              {
                withUnsavedMark && <span className="rounded-circle unsaved-icon ml-2"></span>
              }
            </a>
          </li>
        )})
      }
    </ul>
  )
}

TabList.defaultProps = {
  unsaveIds: []
}

export default TabList;