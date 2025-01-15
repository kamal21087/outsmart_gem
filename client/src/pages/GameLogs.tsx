import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_GAME_LOGS } from '../utils/queries';
import { DELETE_GAME_LOG } from '../utils/mutations'; // Corrected import
import AuthService from '../utils/auth';
import { UserData } from '../interfaces/UserData';
import './GameLogs.css';

const GameLogs = () => {
  const user = AuthService.getProfile()?.data as unknown as UserData | null;

  const { loading, error, data, refetch } = useQuery(GET_USER_GAME_LOGS, {
    variables: { playerId: user?.username },
  });

  const [deleteGameLog] = useMutation(DELETE_GAME_LOG);

  const handleDelete = async (logId: string) => {
    try {
      await deleteGameLog({ variables: { logId } });
      refetch();
    } catch (err) {
      console.error('Error deleting game log:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching game logs: {error.message}</p>;

  return (
    <div className="game-logs-container">
      <h1>Game Logs</h1>
      <div className="logs">
        <img
          src={user?.profileImage || '/default-avatar.png'}
          alt="User Avatar"
          className="user-avatar"
        />
        {data.getUserGameLogs.slice(0, 3).map((log: any) => (
          <div key={log._id} className="log-card">
            <p>
              <strong>Score:</strong> {log.score}
            </p>
            <p>
              <strong>Result:</strong> {log.results}
            </p>
            <p>
              <strong>Date:</strong> {new Date(log.createdAt).toLocaleString()}
            </p>
            <button onClick={() => handleDelete(log._id)} className="delete-button">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLogs;
