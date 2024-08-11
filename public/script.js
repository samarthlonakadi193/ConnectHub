const socket = io();
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer();
let peers = {};

let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        });
    });
    
    socket.on('user-connected', (userId, username) => {
        connectToNewUser(userId, stream);
    });
    socket.on('user-disconnected', userId => {
        console.log('User disconnected:', userId);
        if (peers[userId]) {
            peers[userId].close();
            delete peers[userId];
            const video = document.querySelector(`video#${userId}`);
            console.log('Video element:', video);
            if (video) {
                video.remove();
            }
        }
    });

    socket.on('createMessage', (message, username) => {
        const messages = document.querySelector('.messages');
        const msgItem = document.createElement('li');
        msgItem.innerHTML = `<b>${username}</b>: ${message}`;
        messages.append(msgItem);
        scrollToBottom();
    });
});

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id, USERNAME);
});

const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId,stream);
    const video = document.createElement('video');
    video.id = userId;
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
        video.remove();
    });
    peers[userId] = call;
};

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
};

const scrollToBottom = () => {
    var d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}

const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

const playStop = () => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    } else {
        setStopVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

const setMuteButton = () => {
    const html = `
        <i class="fas fa-microphone"></i>
        <span>Mute</span>
    `;
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
    const html = `
        <i class="unmute fas fa-microphone-slash"></i>
        <span>Unmute</span>
    `;
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setStopVideo = () => {
    const html = `
        <i class="fas fa-video"></i>
        <span>Stop Video</span>
    `;
    document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
    const html = `
        <i class="stop fas fa-video-slash"></i>
        <span>Play Video</span>
    `;
    document.querySelector('.main__video_button').innerHTML = html;
}

document.getElementById('chat_message').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
        socket.emit('message', e.target.value, USERNAME);
        e.target.value = '';
    }
});

document.querySelector('.leave_meeting').addEventListener('click', () => {
    window.location.href = '/';
});
