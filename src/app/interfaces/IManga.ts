export interface GetMangaDTO {
  mangaId: number;
  title: string;
  publisher: string;
  imageUrl: string;
  description: string;
}

export interface GetMangaAsyncDTO {
  mangaId: number;
  title: string;
  publisher: string;
  type: string;
  imageUrl: string;
  start: number;
  end: number;
  notHave: number[];
  description: string;
}

export interface CreateMangaDTO {
  title: string;
  publisher: string;
  type: string;
  imageUrl: string;
  start: number;
  end: number;
  notHave: number[];
  description: string;
}

export interface UpdateMangaDTO {
  title: string;
  publisher: string;
  type: string;
  imageUrl: string;
  start: number;
  end: number;
  notHave: number[];
  description: string;
}
