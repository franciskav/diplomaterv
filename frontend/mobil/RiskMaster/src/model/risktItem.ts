export interface RiskItem {
  riskType: string
  riskCount: number
  riskDegree: 0 | 1 | 2 | 3 | 4 | 5
  protectiveMeasure: {
    isExisting: boolean
    description: string
    proposedAction: string
  }[]
  comment?: string
}
