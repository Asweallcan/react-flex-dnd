export type Data = Array<{
  id: string;
  type: string;
  label: string;
  children?: Data;
}>;
