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
                        <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <input type="text" name="role" value={profile.role} onChange={handleChange} placeholder="Job Title" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input type="number" name="age" value={profile.age} onChange={handleChange} placeholder="25" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nationality</label>
                        <input type="text" name="nationality" value={profile.nationality} onChange={handleChange} placeholder="Nationality" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>

                {/* ID Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">ID Number</label>
                    <input type="text" name="idNumber" value={profile.idNumber} onChange={handleChange} placeholder="ID Number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>

                {/* Event Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Event Name</label>
                    <input type="text" name="eventName" value={profile.eventName} onChange={handleChange} placeholder="Event Name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>

                {/* Languages */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Languages</label>
                        <button onClick={() => setProfile(prev => ({ ...prev, languages: [...prev.languages, ""] }))} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100">Add</button>
                    </div>
                    <div className="space-y-2">
                        {profile.languages.map((lang, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <input
                                    value={lang}
                                    onChange={(e) => {
                                        const newLangs = [...profile.languages];
                                        newLangs[idx] = e.target.value;
                                        setProfile(prev => ({ ...prev, languages: newLangs }));
                                    }}
                                    placeholder="Language (e.g. English Fluent)"
                                    className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <button
                                    onClick={() => setProfile(prev => ({ ...prev, languages: prev.languages.filter((_, i) => i !== idx) }))}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        {profile.languages.length === 0 && (
                            <p className="text-sm text-gray-400 italic">No languages added.</p>
                        )}
                    </div>
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

                <hr className="my-4 border-gray-200" />

                {/* Private Information */}
                <div>
                    <h3 className="text-xs font-bold uppercase text-gray-400 mb-3 block">Private Information (Not shown on card)</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" name="email" value={profile.email || ''} onChange={handleChange} placeholder="example@company.com" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                            <input type="tel" name="mobile" value={profile.mobile || ''} onChange={handleChange} placeholder="+123 456 7890" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                    </div>
                </div>

                <hr className="my-4 border-gray-200" />

                {/* Theme Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Theme</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['modern', 'midnight', 'emerald', 'crimson'].map((theme) => (
                            <button
                                key={theme}
                                onClick={() => setProfile(prev => ({ ...prev, theme: theme as any }))}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize border transition-all ${profile.theme === theme
                                        ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300'
                                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                    }`}
                            >
                                {theme}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
