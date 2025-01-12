import React from 'react';
import './ChatCloud.css';

interface ChatCloudProps {
    message: string;
    username: string;
    avatarLink: string;
    ifself: boolean; // Corrected from Boolean to boolean
}

const styles: { [key: string]: React.CSSProperties } = {
    chatCloud: {
        display: "flex",
        flexDirection: "row",
        borderRadius: "5px",
        alignItems: "center",
    },
    chatMessage: {
        width: "70%",
        flexGrow: 2,
    },
    chatAvatar: {
        flex: 1, // Flex value as a number
        width: "100%",
        borderRadius: "10%",
    },
    chatUsername: {
        fontSize: "1.2em",
        fontWeight: "bold",
    },
};

function ChatCloud(props: ChatCloudProps) {
    return (
        <div className="chat-cloud">
            {props.ifself ? (
                <div style={styles.chatCloud}>
                    <div style={styles.chatMessage} className="chat-message message-right">{props.message}</div>
                    <div className='user-identity'>
                        <img style={styles.chatAvatar} className="chat-avatar" src={props.avatarLink} alt="user avatar" />
                        <div className="chat-username">{props.username}</div>
                    </div>
                </div>
            ) : (
                <div style={styles.chatCloud}>
                    <div className='user-identity'>
                        <img style={styles.chatAvatar} className="chat-avatar" src={props.avatarLink} alt="user avatar" />
                        <div className="chat-username">{props.username}</div>
                    </div>
                    <div style={styles.chatMessage} className="chat-message message-left">{props.message}</div>
                </div>
            )}
        </div>
    );
}

export default ChatCloud;
