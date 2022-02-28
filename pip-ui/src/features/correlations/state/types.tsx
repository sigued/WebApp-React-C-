import { Parameter } from "src/features/orders/state/types";

export type CorrelationState = {
  selectedCorrelation?: CorrelationDetailsProps;
};

export type Correlation = {
  id: string;
  description: string;
};

export type CorrelationDetailsProps = {
  id: string;
  description: string;
  inputsList: Parameter[];
  outputId: Parameter;
  type: CorrelationType;
  equations?: Equation[];
  abaques?: Abaque[];
};

export type Equation = {
  id?: string;
  equation: string;
  applicability: string;
  reference: string;
};

export type Abaque = {
  id?: string;
  title: string;
  imageString: string;
};

export enum CorrelationType {
  Equation,
  Abaque,
}
