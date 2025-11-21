export interface packageSnapshot {
  code: number;
  name: string;
  hpBonus: number;
  multiplier: number;
  durationDays: number;
}

export interface Payment {
  baseAmount: number;
  currency: string;
  discountAmount: number;
  paymentMethod: string;
  totalAmount: number;
  txHash: string;
  userWallet: string;
}

export interface HistoryMembership {
  id: string;
  type: string;
  txnCode: string;
  userId: string;
  packageSnapshot: packageSnapshot;
  status: string;
  purchaseAt: string;
  activateAt: string;
  expireAt: string;
  payment: Payment;
  createdAt: string;
}

export interface MembershipSummary {
  total: number;
  amount: number;
  currency: string;
}

export interface HistoryMemberShipSummaryResponse {
  summary: {
    membership: MembershipSummary;
    boost: MembershipSummary;
  };
  userId: string;
}
