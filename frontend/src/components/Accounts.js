import React from 'react';
import Sidebar from './Sidebar';

const Accounts = () => {
    // List of sample profile pictures
    const profilePictures = [
        "https://via.placeholder.com/150/FF0000/FFFFFF?text=User1",
        "https://via.placeholder.com/150/00FF00/FFFFFF?text=User2",
        "https://via.placeholder.com/150/0000FF/FFFFFF?text=User3",
        "https://via.placeholder.com/150/F0F000/FFFFFF?text=User4",
        "https://via.placeholder.com/150/0F0F00/FFFFFF?text=User5"
    ];

    // Simulated account details
    const accountDetails = {
        username: "JohnDoe92",
        email: "johndoe92@example.com",
        created_at: new Date().toLocaleDateString(),
        status: "Active",
        location: "New York, USA",
        last_login: "Yesterday at 5:00 PM",
        profile_picture: profilePictures[Math.floor(Math.random() * profilePictures.length)] // Randomly select a profile picture
    };

    return (
        <div className="flex bg-[#1c1f2e]">
            <Sidebar />
            <div className="overflow-auto no-scrollbar p-4 mt-16 h-[calc(100vh-64px)] bg-[#161825] overflow-y-auto">
                <div className="bg-[#1c1f2e] w-[75vw] text-white p-8">
                    <h1 className="text-xl font-bold mb-4">Account Details</h1>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(accountDetails).map(([key, value]) => (
                            key !== 'profile_picture' ? (
                                <div key={key} className="bg-[#161825] p-4 rounded-lg">
                                    <p><strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value}</p>
                                </div>
                            ) : (
                                <div key={key} className="bg-[#161825] p-4 rounded-lg flex items-center justify-center">
                                    <img src={value} alt="Profile" className="rounded-full w-24 h-24" />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Accounts;
