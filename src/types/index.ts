export interface File {
  id: string;
  title: string;
  body: string;
  createAt: number;
  [name: string]: any
}