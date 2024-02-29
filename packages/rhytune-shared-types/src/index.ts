export interface User {
    id: string;
    uuid: string;
    username: string;
    githubId: string;
    name: string; // Added based on your components
    email: string; // Added based on your components
    avatarUrl: string; // Added based on your components
    // Define other fields as necessary
}

export interface Song {
    id: string;
    title: string;
    artists: ArtistSong[];
    albums: AlbumSong[];
    lyrics: Lyric[];
    relatedVersions: Song[]; // Updated to indicate association with other Song entities
    editRecord: EditRecord[];
}

export interface Lyric {
    id: string;
    songId: string;
    langCode: string;
    text: string;
    versionInfo: string; // Distinguish different versions
    editRecord: EditRecord[];
}

export interface Artist {
    id: string;
    name: string;
    songs: ArtistSong[];
    editRecord: EditRecord[];
}

export interface Album {
    id: string;
    title: string;
    songs: AlbumSong[];
    releaseDate: Date;
    editRecord: EditRecord[];
}

// Connecting entities for many-to-many relationships
export interface ArtistSong {
    artistId: string;
    songId: string;
    // Additional fields if necessary, e.g., role of the artist in the song
}

export interface AlbumSong {
    albumId: string;
    songId: string;
    // Additional fields if necessary, e.g., track number
}

export interface EditRecord {
    editedByUserId: string;
    date: Date;
    changeDescription: string; // Change details
}

// Model interfaces with new methods
export interface SongModel {
    findById(id: string): Promise<Song | null>;
    // Additional methods as necessary
}

export interface LyricModel {
    findBySongIdAndLangCode(songId: string, langCode: string): Promise<Lyric[]>;
    // Additional methods as necessary
}

export interface ArtistModel {
    findById(id: string): Promise<Artist | null>;
    // Additional methods as necessary
}

export interface AlbumModel {
    findById(id: string): Promise<Album | null>;
    // Additional methods as necessary
}

export interface UserModel {
    findByid(id: string): Promise<User | null>;
    findOrCreate(profile: any): Promise<User>;
    findByGithubId(githubId: string): Promise<User | null>;
}