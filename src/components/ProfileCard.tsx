import React from 'react';
import type { Profile } from '../types';

interface ProfileCardProps {
    profile: Profile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    return (
        <div className="w-[375px] bg-white shadow-2xl overflow-hidden relative font-sans text-gray-900 mx-auto">
            {/* Header */}
            <div className="bg-[#1a1a1a] h-40 pt-8 px-6 text-center">
                <h2 className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-medium mb-1">
                    Event Staff
                </h2>
                <h1 className="text-white text-xs uppercase tracking-[0.2em] font-semibold">
                    Identification
                </h1>
            </div>

            {/* Profile Image */}
            <div className="relative -mt-20 flex justify-center mb-6">
                <div className="w-40 h-40 bg-white p-2 rounded-[2rem] shadow-lg relative z-10">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-gray-100">
                        <img
                            src={profile.imageUrl}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Soft glow/shadow behind */}
                    <div className="absolute inset-0 bg-white/20 blur-xl -z-10 rounded-[2rem]"></div>
                </div>
            </div>

            {/* Personal Info */}
            <div className="text-center px-6 mb-8">
                <h2 className="text-2xl font-bold mb-2 tracking-tight">{profile.name}</h2>
                <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-medium">
                    {profile.role}
                </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 px-10 mb-8 max-w-xs mx-auto">
                <div className="text-left">
                    <p className="text-gray-300 text-[10px] uppercase tracking-[0.1em] mb-1">Age</p>
                    <p className="text-lg font-bold">{profile.age}</p>
                </div>
                <div className="text-left">
                    <p className="text-gray-300 text-[10px] uppercase tracking-[0.1em] mb-1">Nationality</p>
                    <p className="text-lg font-bold">{profile.nationality}</p>
                </div>
            </div>

            {/* Languages */}
            <div className="flex justify-center gap-4 px-6 mb-10">
                {profile.languages.map((lang, index) => (
                    <span
                        key={index}
                        className="bg-[#111111] text-white text-[10px] font-bold py-3 px-6 rounded-full uppercase tracking-wider min-w-[120px] text-center"
                    >
                        {lang}
                    </span>
                ))}
            </div>

            {/* Experience */}
            <div className="px-10 mb-12">
                <h3 className="text-gray-300 text-[10px] uppercase tracking-[0.2em] mb-6">
                    Experience
                </h3>
                <div className="space-y-6">
                    {profile.experience.map((exp) => (
                        <div key={exp.id} className="flex items-center gap-4">
                            <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 text-gray-300">✓</div>
                            </div>
                            <p className="text-sm font-medium text-gray-800">
                                {exp.company} <span className="text-gray-400">—</span> {exp.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer / ID */}
            <div className="px-6 pb-8">
                <div className="bg-[#111111] text-gray-500 text-[10px] py-4 rounded-2xl text-center tracking-[0.5em] font-mono uppercase">
                    {profile.eventName}
                </div>
            </div>
        </div>
    );
};
