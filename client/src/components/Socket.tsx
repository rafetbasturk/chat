// import { useEffect, useState } from "react";
// import { socket } from "../socket";
// import { Form, useNavigation } from "react-router-dom";

// export default function Socket() {
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [messages, setMessages] = useState<string[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === "submitting";

//   console.log(onlineUsers);
  

//   useEffect(() => {
//     socket.on("getOnlineUsers", (data) => {
//       setOnlineUsers(data)
//     })
//     socket.on("serverMessage", (data) => {
//       setMessages((curr) => [...curr, data.msg]);
//     });

//     return () => {
//       socket.off("serverMessage");
//     };
//   }, []);

//   // useEffect(() => {
//   //   function onConnect() {
//   //     console.log(socket.connected);

//   //     setIsConnected(true);
//   //   }

//   //   function onDisconnect() {
//   //     console.log(socket.connected);

//   //     setIsConnected(false);
//   //   }

//   //   socket.on("connect", onConnect);
//   //   socket.on("disconnect", onDisconnect);

//   //   return () => {
//   //     socket.off("connect", onConnect);
//   //     socket.off("disconnect", onDisconnect);
//   //   };
//   // }, []);

//   // const handleSubmit = (e: FormEvent) => {
//   //   e.preventDefault();
//   //   socket.emit("clientMessage", { msg: value, room });
//   //   setValue("");
//   // };
//   return (
//     <div>
//       <button
//         onClick={() => {
//           isConnected ? setIsConnected(false) : setIsConnected(true);
//         }}
//       >
//         {isConnected ? "Disconnect" : "Connect"}
//       </button>
//       <Form method="POST">
//         <input type="text" name="content" placeholder="Your message" />
//         <button type="submit" disabled={isSubmitting}>
//           Send
//         </button>
//       </Form>
//       <ul>
//         {messages.map((msg, i) => (
//           <li key={i}>{msg}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
