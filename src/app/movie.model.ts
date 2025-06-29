export interface Movie {
  id: string;
  title: string;
  genre: string;
  posterUrl: string;
  year: number;
  description?: string;
  averageRating: number;
  userRating: number; 
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}
