export type CategoriesState = {
  deletedParamId: string;
};

export type Category = {
  category: string;
  parameterList: Parameter[];
};

type Parameter = {
  id: string;
  category?: string;
  symbole: string;
  name: string;
  unit: string;
  value: number;
};
