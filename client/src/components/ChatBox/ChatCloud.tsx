interface ChatCloudProps {
    message: string;
    username: string;
    avatarLink: string;
    ifself: boolean; // Corrected from Boolean to boolean
}

function ChatCloud(props: ChatCloudProps) {
    return (
        <div className="chat-cloud">
            {props.ifself ? (
                <>
                    <div className="chat-message">{props.message}</div>
                    <img src={props.avatarLink} alt="user avatar" />
                    <div className="chat-username">{props.username}</div>
                </>
            ) : (
                <>
                    <img src={props.avatarLink} alt="user avatar" />
                    <div className="chat-username">{props.username}</div>
                    <div className="chat-message">{props.message}</div>
                </>
            )}
        </div>
    );
}

export default ChatCloud;
