import { observer } from 'mobx-react-lite';

import './tags.css';


interface IProps {
  item: string
  activeTag: string[]
  setActiveTag: (e: any) => void
}

const Tags = observer(({item, activeTag, setActiveTag}: IProps) => {
  return (
    <>
        <div 
          style={{
            color: `${activeTag.includes(item) ? 'white' : 'black'}`,
            backgroundColor: `${activeTag.includes(item) ? '#1976d2' : 'white'}`,
            border: `${activeTag.includes(item) ? '1px solid #1976d2' : '1px solid #cfcfcf'}`
            
          }} 
          className='tagText'
          onClick={() => {
            if (!activeTag.includes(item)) {
              setActiveTag(old => [...old, item])
              localStorage.setItem('actievTag', JSON.stringify([...activeTag, item]))
            } else {
              const newArr = activeTag.filter(tag => tag !== item)
              setActiveTag(newArr)
              localStorage.setItem('actievTag', JSON.stringify(newArr))
            }
          }}
        >
          {item}
        </div>
    </>
  );
})

export default Tags;
