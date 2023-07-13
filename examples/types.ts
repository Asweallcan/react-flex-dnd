export type Data = Array<{
  id: string;
  type: string;
  label: string;
  avatar?: string;
  children?: Data;
}>;
