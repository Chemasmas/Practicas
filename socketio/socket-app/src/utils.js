import io from 'socket.io-client';

var optionsSocket = { 
    reconnection: true,
    reconnectionAttempts: 1000,
    reconnectionDelay: 5000,
    reconnectionDelayMax: Infinity,
    transports: ['websocket'],
    forceNew: true, };

/* SOCKET IO */
const socket = io('http://34.227.152.75',optionsSocket);

export const closesocket = () => {
    socket.close()
}

/* EMIT*/ 
export const join = ({channel,email,fName,lName}) =>  {
    socket.emit('join',{
                        //channel streamUserDDmmAAAA
        room_channel:channel,
        email:email, 
        firstName:fName, 
        lastName:lName
    });
}

export const logout = ({channel}) => {
    socket.emit('leave-conversation',{
        room_channel:channel,
    });
}

export const sendMessage = ({channel,msg}) => {
    socket.emit('send-message',{
        room_channel:channel,
        message:msg
    });
}

/* On */
export const onJoined = (callback) => {
    socket.on('joined-channel', (data) => callback(data) );
}

export const onRefresh = (callback) => {
    socket.on('refresh-messages', (data) => callback(data));
}

export const onDisconect = () => {
    socket.on('disconnect ',(data) => {
        console.log("Desconectado");
        console.log(data); 
    })
}


