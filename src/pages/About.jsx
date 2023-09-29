import React from 'react'
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaSearch,FaRegBell, FaUserCircle } from 'react-icons/fa';

function About() {
  return (
    <div className="bg-gray-300 flex h-screen">

    <div className='channel-bar  w-80 h-screen m-0 ml-60 bg-gray-200 dark:bg-gray-800 shadow-lg overflow-hidden'>
      <ChannelBlock />

        <div className='channel-container flex items-center justify-start w-full '>
        <Menu className='menu text-lg w-screen font-bold align-left text-gray-600 dark:text-gray-400'>
          <MenuItem>Weather</MenuItem>
          <MenuItem>Feather</MenuItem>
        </Menu>
        </div>

      </div>

    <div className='content-container flex flex-col bg-gray-500 dark:bg-gray-700  m-0 h-full w-full overflow-hidden'>
    
    <div className='top-navigation flex items-center p-4 space-x-5 bg-gray-300 dark:bg-gray-700 bg-opacity-90 w-full h-16 m-0 shadow-lg justify-end'>
      <Search />
      <BellIcon />
      <UserCircle />
    </div>

      <div className='content-list flex flex-col items-center h-full w-full mt-0 ml-0 mx-auto px-0 pb-12 overflow-y-scroll scrollbar-hide'>
             
        <Post
          name='Rebecca'
          timestamp='3 hours ago'
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
        />

        <Post
          name='Rebecca'
          timestamp='3 hours ago'
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
        />

        <Post
          name='Rebecca'
          timestamp='3 hours ago'
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
        />

        <Post
          name='Rebecca'
          timestamp='3 hours ago'
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
        />

        <Post
          name='Rebecca'
          timestamp='3 hours ago'
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
        />

        <Post
          name='Rebecca'
          timestamp='3 hours ago'
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
        />

        <Post
          name='Rebecca'
          timestamp='3 hours ago'
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
        />

        <Post
          name='Rebecca'
          timestamp='3 hours ago'
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
        />



      </div>
      <BottomBar />
    </div>  

    </div>
  )
}


/*CONTENT */
const Post = ({ name, timestamp, text }) => {

  const seed = Math.round(Math.random() * 100);
  return (
    <div className={'post'}>
      <div className='avatar-wrapper flex flex-col items-center w-12 m-0 ml-auto mb-auto'>
        <img src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`} alt='' className='avatar flex-none w-full h-full rounded-full shadow-md object-cover bg-gray-100 mb-auto mt-0 mx-0 cursor-pointer' />
      </div>

      <div className='post-content w-4/5 flex flex-col justify-start ml-auto'>
        <p className='post-owner text-left font-semibold text-gray-800 dark:text-white mr-2 cursor-pointer'>
          {name}
          <small className='timestamp text-xs text-left font-semibold text-gray-800 dark:text-gray-600 ml-2'>{timestamp}</small>
        </p>
        <p className='post-text text-lg text-left text-gray-800 dark:text-white mr-auto whitespace-normal'>{text}</p>
      </div>
    </div>
  );
};

/*PLUS ICON BOTTOM BAR */
const PlusIcon = () => (
  <BsPlusCircleFill
    size='30'
    className='fill-green-700 mx-2 '
  />
);

/*BOTTOM BAR */
const BottomBar = () => (
  <div className='bottom-bar absolute flex  items-center justify-between w-7/12 right-8 bottom-2 m-3
  rounded-lg shadow-lg bg-gray-400 px-2 h-12'>
    <PlusIcon />
    <input type='text' placeholder='Enter message...' className='bottom-bar-input font-semibold w-full
    bg-transparent outline-none ml-0 mr-auto text-gray-500  dark:text-gray-400 placeholder-gray-500 cursor-text' />
  </div>
);


/*SEARCHBAR*/
const Search = () => (
  <div className='search w-4/12 flex items-center justify-start bg-gray-400 dark:bg-gray-600
  text-gray-500 px-2 h-9 ml-0 mr-0 rounded-md shadow-md transition duration-300 ease-in-out'>
    <input className='search-input w-full font-sans font-semibold bg-transparent outline-none 
    text-gray-500  placeholder-gray-500 pl-1 rounded' type='text' placeholder='Search...' />
    <FaSearch size='18' className='text-secondary my-auto' />
  </div>
);

/*CHANNEL */
const ChannelBlock = () => (
  <div className='channel-block flex items-center justify-center h-16 m-0 p-0'>
    <h5 className='channel-block-text text-lg tracking-wider font-bold 
    text-gray-600 dark:text-gray-400 mr-auto ml-4 my-auto align-middle'>Channels</h5>
  </div>
);

/*DROPDOWN */
const BellIcon = () => <FaRegBell size='24' className='top-navigation-icon' />;
const UserCircle = () => <FaUserCircle size='24' className='top-navigation-icon' />;

export default About
