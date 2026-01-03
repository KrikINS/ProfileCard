import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { ProfileCard } from './components/ProfileCard';
import { ProfileEditor } from './components/ProfileEditor';
import type { Profile } from './types';
import './index.css';

function App() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<Profile>({
    name: "Rawan Mamdouh Attia",
    role: "Staff Member",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    age: 24,
    nationality: "Egyptian",
    languages: ["Arabic Native", "English Fluent"],
    experience: [
      { id: '1', company: "Saudi Media Forum", role: "Registration" },
      { id: '2', company: "Beauty World", role: "Promoter" },
      { id: '3', company: "Saudi Food", role: "Promoter" },
      { id: '4', company: "LEAP", role: "Promoter" },
    ],
    idNumber: "0024938472910",
    eventName: "Saudi Media Forum"
  });

  const handleDownload = useCallback(async () => {
    if (cardRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `${profile.name.replace(/\s+/g, '_')}_card.png`;
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
            <h1 className="text-3xl font-bold">Profile Generator</h1>
            <p className="opacity-90">Create stunning employee identification cards.</p>
          </div>

          <ProfileEditor profile={profile} setProfile={setProfile} />

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

export default App;
