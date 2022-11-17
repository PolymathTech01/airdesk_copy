import React from 'react';
import './Tab.css';
import GlassIcon from '../Assets/glassIcon.svg';
import TabContent from './TabContent';
import { useParams } from 'react-router-dom';
const Tab = ({
  disabled,
  messageFunction,
  page,
  value,
  showIcon,
  placeholder,
  deskId,
  view,
}) => {
  // const [activeTab, setActiveTab] = useState(false);

  // const changeValue = () => {
  //   setActiveTab(!activeTab);
  // };
  const { deskIdParams } = useParams();
  return (
    <div>
      <div className='container-tabs active-tab'>
        <ul className='tabs'>
          <li className='font-bold text-xl rounded-tl-2xl border-r-0 flex bg-white h-[2em] shadow-md'>
            <span
              className='font-bold py-4 px-[0.5rem] rounded-t-2xl rounded-tl-2xl relative  text-xl bg-white flex'
              style={{ minWidth: '9em' }}
            >
              {page ? (
                <img
                  src={GlassIcon}
                  alt='glassIcon'
                  className='h-[1.5rem] mr-3'
                  width='33'
                />
              ) : null}
              <p className={`${!page ? 'ml-3' : ''}`}>
                {deskId || deskIdParams || 'Desk 1'}
              </p>
            </span>
            {/* <span className='text-[#006CFF] bg-slate-200 px-4 pb-4 pt-3 mb-0 rounded-tr-xl'>
              <p className='relative bottom-1'>+</p>
            </span> */}
          </li>
        </ul>
      </div>
      {/* <Link to={page ? '/admin' : ''}> */}
      <TabContent
        disabled={disabled}
        showIcon={showIcon}
        messageFunction={messageFunction}
        value={value}
        view={view}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Tab;
