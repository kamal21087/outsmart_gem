import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UserProfile } from '../interfaces/UserProfile';
import { UserData } from '../interfaces/UserData';
import { GET_USER_PROFILE, GET_USER_DATA } from '../utils/queries';
import { UPDATE_PROFILE_IMAGE } from '../utils/mutations';
import '../ProfilePage.css'; // Import your custom CSS
import AuthService from '../utils/auth'; 

// Component for rendering the profile page
const ProfilePage: React.FC = () => {
  // Get authenticated user's profile information
  const userAuthData = AuthService.getProfile();
  const userName = userAuthData?.data?.username;

  // Fetch the user profile data
  const { data: userProfileQueryData, loading: loadingProfile, error: errorProfile } = useQuery(GET_USER_PROFILE, {
    variables: { userName },
    skip: !userName, // Skip query if userName is not available
  });

  // Fetch the user data
  const { data: userDataQueryData, loading: loadingData, error: errorData } = useQuery(GET_USER_DATA, {
    variables: { userName },
    skip: !userName, // Skip query if userName is not available
  });

  // Mutation for updating the profile image
  const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE);

  // State for managing the current and new profile images
  const [profileImage, setProfileImage] = useState<string>('');
  const [newProfileImage, setNewProfileImage] = useState<string>('');

  // Set the initial profile image when user profile data is loaded
  useEffect(() => {
    if (userProfileQueryData) {
      setProfileImage(userProfileQueryData.getUserProfile.profileImage);
    }
  }, [userProfileQueryData]);

  // Handle the selection of a new profile image
  const handleImageSelect = (newImage: string) => {
    setNewProfileImage(newImage);
  };

  // Save the changes to the profile image by updating the server
  const handleSaveChanges = () => {
    if (newProfileImage && userName) {
      setProfileImage(newProfileImage); // Update the profile image in the state
      updateProfileImage({
        variables: { userName, profileImage: newProfileImage },
      });
    }
  };

  // Display loading or error messages if necessary
  if (!userName) return <p>Please sign in to view your profile.</p>;
  if (loadingProfile || loadingData) return <p>Loading...</p>;
  if (errorProfile || errorData) return <p>Error loading profile</p>;

  // Extract user profile and user data
  const userProfile: UserProfile = userProfileQueryData.getUserProfile;
  const userDetails: UserData = userDataQueryData.getUserData;

  // Render the profile page
  return (
    <div className="profile-page columns"> 
      <div className="column is-one-third"> 
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
          <div className="image-options">
            {/* Options for selecting a new profile image */}
            <img src="/images/option1.jpg" alt="Option 1" onClick={() => handleImageSelect('/images/option1.jpg')} />
            <img src="/images/option2.jpg" alt="Option 2" onClick={() => handleImageSelect('/images/option2.jpg')} />
            <img src="/images/option3.jpg" alt="Option 3" onClick={() => handleImageSelect('/images/option3.jpg')} />
            <img src="/images/option4.jpg" alt="Option 4" onClick={() => handleImageSelect('/images/option4.jpg')} />
            <img src="/images/option5.jpg" alt="Option 5" onClick={() => handleImageSelect('/images/option5.jpg')} />
            <img src="/images/option6.jpg" alt="Option 6" onClick={() => handleImageSelect('/images/option6.jpg')} />
            <img src="/images/option7.jpg" alt="Option 7" onClick={() => handleImageSelect('/images/option7.jpg')} />
            <img src="/images/option8.jpg" alt="Option 8" onClick={() => handleImageSelect('/images/option8.jpg')} />
            <img src="/images/option9.jpg" alt="Option 9" onClick={() => handleImageSelect('/images/option9.jpg')} />
          </div>
          <button className="button is-primary" onClick={handleSaveChanges}>Save Changes</button> 
        </div>
      </div>
      <div className="column is-two-thirds"> 
        {userProfile && userDetails && (
          <div className="profile-info box"> 
            <h2 className="title">{userDetails.username}</h2> 
            <p><strong>Last Played:</strong> {userProfile.lastPlayed}</p>
            <p><strong>Account Created:</strong> {userDetails.accountCreated}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Overall Score:</strong> {userProfile.overallScore}</p>
            <p><strong>Rank:</strong> {userProfile.playerRank}</p>
            <p><strong>Wins:</strong> {userProfile.totalWins}</p>
            <p><strong>Losses:</strong> {userProfile.totalLoss}</p>
            <p><strong>High Score:</strong> {userProfile.highScore}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
