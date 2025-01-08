export interface GetUserDto {
  page: number;
  pageSize: number;
  username?: string;
  password?: string;
  profile?: string;
  role?: number;
}
