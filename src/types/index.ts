export interface Experience {
    id: string;
    role: string;
    company: string;
}

export interface Profile {
    name: string;
    role: string;
    imageUrl: string;
    age: number;
    nationality: string;
    languages: string[];
    experience: Experience[];
    idNumber: string;
    eventName: string;
}
