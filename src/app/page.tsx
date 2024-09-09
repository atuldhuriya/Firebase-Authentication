// "use client"
// import React, { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { firestore } from '@/Component/firebase';
// import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

// const UpdateProfileForm: React.FC = () => {
//     const { currentUser } = useAuth(); 
//     const [firstName, setFirstName] = useState<string>('');
//     const [lastName, setLastName] = useState<string>('');
//     const [gender, setGender] = useState<string>('');

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         try {
//             // Update profile information
//             await updateDoc(doc(firestore, 'users', currentUser.uid), {
//                 firstName,
//                 lastName,
//                 gender,
//             });
//             alert('Profile updated successfully!');
//         } catch (error) {
//             console.error('Error updating profile: ', error);
//             alert('Failed to update profile. Please try again.');
//             return; // Exit early on error
//         }

//         // Optional: Delete profile functionality
//         if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
//             try {
//                 await deleteDoc(doc(firestore, 'users', currentUser.uid));
//                 alert('Profile deleted successfully!');
//                 // Optionally: Redirect or perform logout after deletion
//             } catch (error) {
//                 console.error('Error deleting profile: ', error);
//                 alert('Failed to delete profile. Please try again.');
//             }
//         }

//         // Clear form fields after submission (optional)
//         setFirstName('');
//         setLastName('');
//         setGender('');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 placeholder="First Name"
//                 required
//             />
//             <input
//                 type="text"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 placeholder="Last Name"
//                 required
//             />
//             <select value={gender} onChange={(e) => setGender(e.target.value)}>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//             </select>
//             <button type="submit">Update Profile</button>
           
//             <button onClick={() => {}}>
//                 Delete Profile
//             </button>
//         </form>
//     );
// };

// export default UpdateProfileForm;
