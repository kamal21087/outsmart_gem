interface ChatCloudProps {
    message: string,
    username: string,
    avatarLink: string,
    ifself: Boolean
}

function ChatCloud(props: ChatCloudProps) {
    return (
        {
            props.ifself ? (
                <div className="chat-cloud">
                    <div className="chat-message">{props.message}</div>
                    <img src=`${props.avatarLink}` alt="user avatar"/>
                    <div className="chat-username">{props.username}</div>
                </div>
            ) : (
                <div className="chat-cloud">
                    <img src=`${props.avatarLink}` alt="user avatar"/>
                    <div className="chat-username">{props.username}</div>
                    <div className="chat-message">{props.message}</div>
                </div>
            )
        }
    );
}

export default ChatCloud;