export interface User {
    uuid: string;
    username: string;
    githubId: string;
    name: string; // Added based on your components
    email: string; // Added based on your components
    avatarUrl: string; // Added based on your components
    // Define other fields as necessary
}

export interface UserModel {
    findByid(id: string): Promise<User | null>;
    findOrCreate(profile: any): Promise<User>;
    findByGithubId(githubId: string): Promise<User | null>;
}

export interface Song {
    title: string;
    artists: ArtistSong[];
    albums: AlbumSong[];
    lyrics: Lyric[];
    relatedVersions: Song[]; // Updated to indicate association with other Song entities
    editRecord: EditRecord[];
}

// Model interfaces with new methods
export interface SongModel {
    findById(id: string): Promise<Song | null>;
    findWithRelatedVersions(id: string): Promise<Song | null>; // 新增方法：查找歌曲及其相关版本
    // 假设addEditRecord和addRelatedVersion是在实例上调用的方法，它们不会直接在SongModel上定义，
    // 因为接口通常用于静态方法。如果需要，可以为实例方法创建一个单独的接口。
}

// 实例方法接口示例（如果需要的话）
export interface SongDocumentMethods {
    addEditRecord(editRecordId: string): Promise<Song>;
    addRelatedVersion(relatedVersionId: string): Promise<Song>;
}

export interface Lyric {
    uuid: string;
    songId: string;
    langCode: string;
    text: string;
    versionInfo: string; // Distinguish different versions
    editRecord: EditRecord[];
}

export interface Artist {
    uuid: string;
    name: string;
    songs: ArtistSong[];
    editRecord: EditRecord[];
}

export interface Album {
    uuid: string;
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
