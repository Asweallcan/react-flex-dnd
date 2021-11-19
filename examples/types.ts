export type Data = Array<{
  key: string;
  content: string;
  children?: Data;
}>;
