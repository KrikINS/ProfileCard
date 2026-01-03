import { useState, useRef, useCallback, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { ProfileCard } from '../components/ProfileCard';
import { ProfileEditor } from '../components/ProfileEditor';
import type { Profile } from '../types';
import '../index.css';
import { supabase } from '../lib/supabase';

export default function Generator() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [profileId, setProfileId] = useState<string | null>(null);

    // Clean initial state (Placeholders for UI, empty strings for data)
    const [profile, setProfile] = useState<Profile>({
        name: "",
        role: "",
        imageUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60", // Generic Placeholder
        age: 0,
        nationality: "",
        languages: [],
        experience: [],
        idNumber: "",
        eventName: ""
    });

    // Load profile from URL if ID is present
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            loadProfile(id);
        }
    }, []);

    const loadProfile = async (id: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('employee_profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error loading profile:', error);
            alert('Failed to load profile');
        } else if (data) {
            setProfile({
                name: data.name,
                role: data.role,
                imageUrl: data.image_url || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60",
                age: data.age,
                nationality: data.nationality,
                languages: data.languages || [],
                experience: data.experience || [],
                idNumber: data.id_number,
                eventName: data.event_name
            });
            setProfileId(id);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setLoading(true);

        // Convert current state to DB format
        const payload = {
            name: profile.name,
            role: profile.role,
            age: profile.age,
            nationality: profile.nationality,
            id_number: profile.idNumber,
            event_name: profile.eventName,
            languages: profile.languages,
            experience: profile.experience,
            image_url: profile.imageUrl
        };

        let result;
        if (profileId) {
            // Update existing
            result = await supabase
                .from('employee_profiles')
                .update(payload)
                .eq('id', profileId)
                .select()
                .single();
        } else {
            // Create new
            result = await supabase
                .from('employee_profiles')
                .insert([payload])
                .select()
                .single();
        }

        const { data, error } = result;

        if (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile');
        } else if (data) {
            setProfileId(data.id);
            // Update URL without reload
            const newUrl = `${window.location.pathname}?id=${data.id}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
            alert('Profile saved! URL updated.');
        }
        setLoading(false);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    const handleDownload = useCallback(async () => {
        if (cardRef.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `${(profile.name || 'card').replace(/\s+/g, '_')}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error(err);
            alert("Failed to generate image.");
        }
    }, [profile.name]);

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                {/* Editor Section */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white shadow-lg mb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold">Profile Generator</h1>
                                <p className="opacity-90">Create & Share employee cards.</p>
                            </div>
                            {loading && <div className="text-sm bg-white/20 px-3 py-1 rounded-full animate-pulse">Saving...</div>}
                        </div>
                    </div>

                    <ProfileEditor profile={profile} setProfile={setProfile} />

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-green-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg hover:bg-green-700 transition-all"
                        >
                            {profileId ? 'Update Profile' : 'Save Profile'}
                        </button>

                        <button
                            onClick={handleCopyLink}
                            className="bg-gray-800 text-white py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg hover:bg-gray-900 transition-all"
                        >
                            Copy Link
                        </button>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download Card
                    </button>
                </div>

                {/* Preview Section */}
                <div className="flex flex-col items-center sticky top-8">
                    <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-4 font-bold">Live Preview</h3>
                    <div ref={cardRef} className="transform transition-all duration-300 hover:scale-[1.02]">
                        <ProfileCard profile={profile} />
                    </div>
                </div>

            </div>
        </div>
    );
}
