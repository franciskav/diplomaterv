import {RiskLevel} from './enum/riskLevel'

export interface RisksDto {
  physicalRisk?: RiskLevel
  chemicalRisk?: RiskLevel
  biologicalRisk?: RiskLevel
  psychosocialRisk?: RiskLevel
}
