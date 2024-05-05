import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const Meetings = () => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/meetings')
            .then(response => {
                const enhancedMeetings = response.data.meetings.map(meeting => ({
                    ...meeting,
                    created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleString(),
                    status: ["Scheduled", "In Progress", "Completed", "Cancelled"][Math.floor(Math.random() * 4)]
                }));
                setMeetings(enhancedMeetings);
            })
            .catch(error => console.error('Error fetching meetings:', error));
    }, []);

    return (
        <div className="flex bg-[#1c1f2e]">
            <Sidebar />
            <div className="overflow-auto no-scrollbar p-4 mt-16 h-[calc(100vh-64px)] bg-[#161825] overflow-y-auto">
                <table className="min-w-full leading-normal text-white">
                    <thead>
                        <tr>
                            <th className="px-5 py-4 border-b-2 border-gray-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                #
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                Room Name
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                Created By
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.map((meeting, index) => (
                            <tr key={index} className="bg-[#20233a] hover:bg-[#2a2d43]">
                                <td className="px-5 py-4 border-b border-gray-600 text-sm text-white">
                                    {index + 1}
                                </td>
                                <td className="px-5 py-4 border-b border-gray-600 text-sm text-white">
                                    {meeting.roomname}
                                </td>
                                <td className="px-5 py-4 border-b border-gray-600 text-sm text-white">
                                    {meeting.username}
                                </td>
                                <td className="px-5 py-4 border-b border-gray-600 text-sm text-white">
                                    {meeting.email}
                                </td>
                                <td className="px-5 py-4 border-b border-gray-600 text-sm text-white">
                                    {meeting.created_at}
                                </td>
                                <td className="px-5 py-4 border-b border-gray-600 text-sm text-white">
                                    {meeting.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Meetings;
