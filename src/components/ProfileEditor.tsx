import React, { type ChangeEvent } from 'react';
import type { Profile, Experience } from '../types';

interface ProfileEditorProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, setProfile }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
        setProfile(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const addExperience = () => {
        const newExp: Experience = {
            id: Date.now().toString(),
            company: "New Company",
            role: "Role"
        };
        setProfile(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
    };

    const removeExperience = (id: string) => {
        setProfile(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const updateLanguage = (index: number, value: string) => {
        const newLangs = [...profile.languages];
        newLangs[index] = value;
        setProfile(prev => ({ ...prev, languages: newLangs }));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto h-fit">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <div className="space-y-4">
                {/* Image Upload */}
                <div>
                    <label htmlFor="profile-image" className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input
                        id="profile-image"
                        title="Profile Image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" value={profile.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <input type="text" name="role" value={profile.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input type="number" name="age" value={profile.age} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nationality</label>
                        <input type="text" name="nationality" value={profile.nationality} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>

                {/* ID Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">ID Number</label>
                    <input type="text" name="idNumber" value={profile.idNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>

                {/* Event Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Event Name</label>
                    <input type="text" name="eventName" value={profile.eventName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>

                {/* Languages */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                    <div className="flex gap-2">
                        {profile.languages.map((lang, idx) => (
                            <input
                                key={idx}
                                value={lang}
                                onChange={(e) => updateLanguage(idx, e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Currently fixed to 2 languages</p>
                </div>

                {/* Experience */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Experience</label>
                        <button onClick={addExperience} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100">Add</button>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {profile.experience.map(exp => (
                            <div key={exp.id} className="flex gap-2 items-center">
                                <input
                                    value={exp.company}
                                    onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                                    placeholder="Company"
                                    className="w-1/2 border border-gray-300 rounded-md shadow-sm p-1 text-sm"
                                />
                                <input
                                    value={exp.role}
                                    onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
                                    placeholder="Role"
                                    className="w-1/2 border border-gray-300 rounded-md shadow-sm p-1 text-sm"
                                />
                                <button onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-700">×</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
