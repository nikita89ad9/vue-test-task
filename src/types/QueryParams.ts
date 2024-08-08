interface Params {
  [key: string]: string | number;
}

export interface QueryParams extends Partial<Params> {
  limit?: string | number;
  page?: string | number;
  search?: string;
  orderBy?: string;
}
