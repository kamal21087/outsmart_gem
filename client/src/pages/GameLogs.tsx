import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_GAME_LOGS, GET_USERNAME_AVATAR } from '../utils/queries';
import { DELETE_GAME_LOG } from '../utils/mutations';
import './GameLogs.css';

const GameLogs = () => {
  // Fetch user avatar and username
  const { data: userData } = useQuery(GET_USERNAME_AVATAR);

  // Extract user details
  const displayName = userData?.me?.username || 'Guest';
  const userAvatar = userData?.me?.profileImage || '/default-avatar.png';

  // Fetch user's game logs
  const { loading, error, data, refetch } = useQuery(GET_USER_GAME_LOGS, {
    variables: { playerId: userData?.me?.username }, // Using the username to get logs
  });

  // Use mutation to delete a game log
  const [deleteGameLog] = useMutation(DELETE_GAME_LOG);

  // Handle the deletion of a game log
  const handleDelete = async (logId: string) => {
    try {
      // Execute the mutation with the correct log ID
      await deleteGameLog({ variables: { logId } });
      refetch(); // Refresh game logs after deletion
    } catch (err) {
      console.error('Error deleting game log:', err);
    }
  };

  // Display loading or error messages
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching game logs: {error.message}</p>;

  return (
    <div className="game-logs-container">
      {/* User Avatar and Name */}
      <div className="user-avatar-section">
        <img src={userAvatar} alt={`${displayName}'s Avatar`} className="user-avatar" />
        <p className="user-name">{displayName}</p>
      </div>

      {/* Game Logs */}
      <div className="logs-section">
        <h1 className="logs-title">Game Logs</h1>
        <div className="logs">
          {data.getUserGameLogs.slice(0, 3).map((log: any) => (
            <div key={log._id} className="log-card">
              <button onClick={() => handleDelete(log._id)} className="delete-log-btn">
                X
              </button>
              <div className="log-details">
                <p className="log-date">
                  <strong>Date:</strong>{' '}
                  {log.createdAt
                    ? new Date(parseInt(log.createdAt)).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'Date not available'}
                </p>
                {log.userQuestions.map((question: string, index: number) => (
                  <p key={index} className="log-question-answer">
                    <strong>Q:</strong> {question}
                    <br />
                    <strong>A:</strong> {log.aiResponses[index] || 'No response'}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameLogs;
