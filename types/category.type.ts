export type Category = {
  id: string;
  name: string;
  alias: string;
  status: boolean;
  parent_id: string;
  children: Category[];
  created_at: Date;
  updated_at: Date;
  has_children: boolean;
};
