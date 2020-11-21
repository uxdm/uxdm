export enum WindingRuleEnum {
  NONZERO = 'NONZERO',
  EVENODD = 'EVENODD',
  NONE = 'NONE',
}
export type WindingRuleType = keyof typeof WindingRuleEnum;
