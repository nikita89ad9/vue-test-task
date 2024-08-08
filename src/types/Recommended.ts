export interface RecomnedationItem {
  image: RecomnedationItemImage;
  author: string | number;
  created: string | number;
  title: string;
  description: string;
}

export interface RecomnedationItemImage {
  src: string;
  alt?: string | 'image';
}
