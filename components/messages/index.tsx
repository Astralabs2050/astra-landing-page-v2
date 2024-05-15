import React from 'react'
import { LuSearch } from 'react-icons/lu'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiFlag } from 'react-icons/fi'
import { trpcCaller } from '@/server/utils'

function SearchBar() {
  return (
    <div className="fixed top-[140px] flex h-[55px] w-[334px] items-center justify-between rounded-[40px] border-[1px] px-[30px]">
      <input
        placeholder="Search Messages"
        type="text"
        className="w-[280px] border-none bg-transparent outline-none"
      />
      <LuSearch />
    </div>
  )
}

function MessagePreview() {
  return (
    <div className="flex h-[146px] w-[354px] flex-col gap-[5px] rounded-[20px] p-[15px] hover:bg-[#F8F8F8]">
      <p className="flex items-center justify-between">
        <span>Name</span>
        <span>date</span>
      </p>
      <p className="font-[600]">Title</p>
      <p>Message</p>
    </div>
  )
}

export default async function MessageBox() {
  const trpc = await trpcCaller()
  return (
    <div className="flex w-full">
      <div className="flex w-[374px] flex-col justify-center ">
        <SearchBar />
        <div className="fixed top-[220px] flex h-[70vh] flex-col items-center gap-[15px] overflow-y-scroll">
          <MessagePreview />
          <MessagePreview /> {/* Duplicate for example */}
        </div>
      </div>
      <div className="fixed left-[695px] top-[30px] h-[100vh] border-l-[1px]"></div>

      <div className="flex w-[786px] flex-col justify-between">
        <div className=" fixed w-[786px]  border-b-[1px]">
          <div className="flex items-center justify-between px-[20px] ">
            {/* the chat head */}
            <div className="flex flex-col">
              <p className="text-[20px] font-[600]">Name</p>
              <p className="text-[16px] font-[400]">Title</p>
            </div>
            <div className="flex gap-[15px] text-[20.16px] ">
              <RiDeleteBin6Line className="text-[red]" />
              <FiFlag />
            </div>
          </div>
        </div>
        {/* this is where messages flow in */}
        <div className="mt-[56px] flex h-[54vh] w-full flex-col gap-[60px] overflow-y-scroll pl-[10px]">
          <div className="h-[30px] w-[100px]">...</div>
        </div>
        {/* end */}

        <div className="fixed top-[75vh] flex items-center gap-[50px] border-t-[1px] px-[20px] pt-[40px]">
          <textarea
            placeholder="Type a message..."
            className="h-[114px] w-[544px] rounded-[20px] bg-[#F2F2F2] p-[20px] outline-none"
          />
          <button className="h-[50px] w-[163px] rounded-[50px] bg-black text-[white]">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

// import React, { useState, useEffect } from 'react';
// import { LuSearch } from 'react-icons/lu';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { FiFlag } from 'react-icons/fi';
// import { trpcCaller } from '@/server/utils';

// function SearchBar({ searchQuery, setSearchQuery }) {
//   return (
//     <div className="fixed top-[140px] flex h-[55px] w-[334px] items-center justify-between rounded-[40px] border-[1px] px-[30px]">
//       <input
//         placeholder="Search Messages"
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="w-[280px] border-none bg-transparent outline-none"
//       />
//       <LuSearch />
//     </div>
//   );
// }

// function MessagePreview({ name, date, title, message, type }) {
//   const messageClass =
//     type === 'outgoing'
//       ? 'bg-blue-100 self-end'
//       : 'bg-gray-100 self-start';
//   return (
//     <div
//       className={`flex flex-col gap-[5px] rounded-[20px] p-[15px] hover:bg-[#F8F8F8] ${messageClass}`}
//       style={{ width: 'fit-content', maxWidth: '80%' }}
//     >
//       <p className="flex items-center justify-between">
//         <span>{name}</span>
//         <span>{date}</span>
//       </p>
//       <p className="font-[600]">{title}</p>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default function MessageBox() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     async function fetchMessages() {
//       const trpc = await trpcCaller();
//       // Assume trpc has a method to fetch messages
//       const fetchedMessages = await trpc.getMessages();
//       setMessages(fetchedMessages);
//     }

//     fetchMessages();
//   }, []);

//   const handleSendMessage = () => {
//     const newMessageObject = {
//       id: messages.length + 1,
//       name: 'Me',
//       date: new Date().toLocaleString(),
//       title: 'New Message',
//       message: newMessage,
//       type: 'outgoing',
//     };
//     setMessages([...messages, newMessageObject]);
//     setNewMessage('');
//   };

//   const filteredMessages = messages.filter((msg) =>
//     msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     msg.message.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex w-full">
//       <div className="flex w-[374px] flex-col justify-center">
//         <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//         <div className="fixed top-[220px] flex h-[70vh] flex-col items-center gap-[15px] overflow-y-scroll">
//           {filteredMessages.map((msg) => (
//             <MessagePreview
//               key={msg.id}
//               name={msg.name}
//               date={msg.date}
//               title={msg.title}
//               message={msg.message}
//               type={msg.type}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="fixed left-[695px] top-[30px] h-[100vh] border-l-[1px]"></div>
//       <div className="flex w-[786px] flex-col justify-between">
//         <div className="fixed w-[786px] border-b-[1px]">
//           <div className="flex items-center justify-between px-[20px]">
//             <div className="flex flex-col">
//               <p className="text-[20px] font-[600]">Name</p>
//               <p className="text-[16px] font-[400]">Title</p>
//             </div>
//             <div className="flex gap-[15px] text-[20.16px]">
//               <RiDeleteBin6Line className="text-[red]" />
//               <FiFlag />
//             </div>
//           </div>
//         </div>
//         <div className="mt-[56px] flex h-[54vh] w-full flex-col gap-[60px] overflow-y-scroll pl-[10px]">
//           {filteredMessages.map((msg) => (
//             <MessagePreview
//               key={msg.id}
//               name={msg.name}
//               date={msg.date}
//               title={msg.title}
//               message={msg.message}
//               type={msg.type}
//             />
//           ))}
//         </div>
//         <div className="fixed top-[75vh] flex items-center gap-[50px] border-t-[1px] px-[20px] pt-[40px]">
//           <textarea
//             placeholder="Type a message..."
//             className="h-[114px] w-[544px] rounded-[20px] bg-[#F2F2F2] p-[20px] outline-none"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//           />
//           <button
//             className="h-[50px] w-[163px] rounded-[50px] bg-black text-white"
//             onClick={handleSendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
