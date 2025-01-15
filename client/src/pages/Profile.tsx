import React, { useState, useEffect} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UserData } from '../interfaces/UserData';
import { GET_USER_DATA } from '../utils/queries';
import { UPDATE_PROFILE_IMAGE } from '../utils/mutations';
import './ProfilePage.css'; // Import your custom CSS
import AuthService from '../utils/auth';

const ProfilePage: React.FC = () => {
  console.log('ProfilePage component loaded'); // Component load log

  const userAuthData = AuthService.getProfile();
  console.log('User Auth Data:', userAuthData); // Add console log
  const userId = userAuthData?.data?.id;
  console.log('User ID:', userId); // Add console log

  // Fetch the user data
  const {
    data: userDataQueryData,
    loading: loadingData,
    error: errorData,
    refetch: refetchUserData,
  } = useQuery(GET_USER_DATA, {
    variables: { id: userId },
    fetchPolicy:'network-only',
    skip: !userId,
  });
  // const {data} = useQuery (GET_USER_DATA, {variables: {id: userId}, fetchPolicy:'network-only'});
  // console.log(data);
  

  // Mutation for updating the profile image
  const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE);

  // State for managing the current and new profile images
  const [profileImage, setProfileImage] = useState<string>('');
  const [newProfileImage, setNewProfileImage] = useState<string>('');
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

  // Set the initial profile image when user profile data is loaded
  useEffect(() => {
    if (userDataQueryData) {
      const userImage = userDataQueryData.getUserData.profileImage || '../../images/option1.webp';
      setProfileImage(userImage);
    }
  }, [userDataQueryData]);

  // Handle the selection of a new profile image
  const handleImageSelect = (newImage: string) => {
    setNewProfileImage(newImage);
    setProfileImage(newImage);
    setUnsavedChanges(true); // Indicate unsaved changes
  };

  // Save the changes to the profile image by updating the server
  const handleSaveChanges = async () => { 
    if (newProfileImage && userId) { 
      try { 
        console.log('Saving new profile image:', newProfileImage); // Debug log 

        const token = AuthService.getToken(); 
        console.log('Token:', token);

        const response = await updateProfileImage({ 
          variables: { profileImage: newProfileImage }, 
          context: { 
            headers: { Authorization: `Bearer ${AuthService.getToken()}`, 
          }, 
        }, 
      }); 
      console.log('Profile image updated successfully:', response.data); // Debug log 
      setUnsavedChanges(false); // Reset unsaved changes 
      refetchUserData(); 
    } catch (error) { 
      console.error('Error saving profile image:', error); 
    } 
  } 
};

  // Display loading or error messages if necessary
  if (!userId) return <p>Please sign in to view your profile.</p>;
  if (loadingData) return <p>Loading...</p>;
  if (errorData) return <p>Error loading data</p>;

  // Extract user profile and user data
  const userDetails: UserData | null = userDataQueryData?.getUserData ?? null;
  console.log(userDataQueryData);

  // Render the profile page
  return (
    <div className="profile-page columns">
      <div className="column is-one-third">
        <div className="profile-image">
          <h2 className="title">Select Your Profile Image</h2>
          <img src={profileImage} alt="Profile" />
          <div className="image-options">
            {/* Options for selecting a new profile image */}
            <img src="/images/option1.webp" alt="Option 1" 
              className={newProfileImage === '/images/option1.webp' ? 'selected' : ''}
              onClick={() => handleImageSelect('/images/option1.webp')} />
            <img src="/images/option2.webp" alt="Option 2" 
              className={newProfileImage === '/images/option2.webp' ? 'selected' : ''}
              onClick={() => handleImageSelect('/images/option2.webp')} />
            <img src="/images/option3.webp" alt="Option 3" 
              className={newProfileImage === '/images/option3.webp' ? 'selected' : ''}
              onClick={() => handleImageSelect('/images/option3.webp')} />
            <img src="/images/option4.webp" alt="Option 4" 
              className={newProfileImage === '/images/option4.webp' ? 'selected' : ''}
              onClick={() => handleImageSelect('/images/option4.webp')} />
            <img src="/images/option5.webp" alt="Option 5" 
              className={newProfileImage === '/images/option5.webp' ? 'selected' : ''}
              onClick={() => handleImageSelect('/images/option5.webp')} />
            <img src="/images/option6.webp" alt="Option 6" 
              className={newProfileImage === '/images/option6.webp' ? 'selected' : ''}
              onClick={() => handleImageSelect('/images/option6.webp')} />
            <img src="/images/option7.webp" alt="Option 7" 
              className={newProfileImage === '/images/option7.webp' ? 'selected' : ''}
              onClick={() => handleImageSelect('/images/option7.webp')} />
            <img src="/images/option8.webp" alt="Option 8" 
              className={newProfileImage === '/images/option8.webp' ? 'selected' : ''}
              onClick={() => handleImageSelect('/images/option8.webp')} />
            <img src="/images/option9.webp" alt="Option 9" 
              className={newProfileImage === '/images/option9.webp' ? 'selected' : ''}
              onClick={() => handleImageSelect('/images/option9.webp')} />
          </div>
          <button className={`button save-changes ${unsavedChanges ? 'unsaved' : ''}`} 
            onClick={handleSaveChanges} disabled={!unsavedChanges} > 
            Save Changes </button>
          <button className="button">Game History</button>
        </div>
      </div>
      <div className="column is-two-thirds">
        {userDetails && (
          <div className="profile-info box">
            <h2 className="title">Profile Information</h2>
            <br></br>
            <p ><strong>Username: </strong> {userDetails.username}</p>
            <p><strong>Account Created: </strong> {userDetails.accountCreated}</p>
            <p><strong>Email: </strong> {userDetails.email}</p>
            <p><strong>Overall Score: </strong> {userDetails.overallScore}</p>
            <p><strong>Wins: </strong> {userDetails.totalWins}</p>
            <p><strong>Losses: </strong> {userDetails.totalLoss}</p>
            <p><strong>High Score: </strong> {userDetails.highScore}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

