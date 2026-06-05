export type RewardCategory = {
  category: string;
  rate: number;
  unit: 'points' | 'cashback' | 'miles';
  label: string;
};

export type CardOffer = {
  id: string;
  description: string;
  expiresAt: string;
  value: string;
};

export type CreditCard = {
  id: string;
  name: string;
  issuer: string;
  last4: string;
  network: 'visa' | 'mastercard' | 'amex' | 'discover';
  color: string;
  textColor: string;
  balance: number;
  creditLimit: number;
  rewardCategories: RewardCategory[];
  rewardsEarnedMonth: number;
  rewardsEarnedYear: number;
  pointsBalance: number;
  pointUnit: 'points' | 'miles' | 'cashback';
  isLocked: boolean;
  annualFee: number;
  signupBonus?: string;
  currentOffers: CardOffer[];
  bestUsedFor: string;
};

export type Transaction = {
  id: string;
  merchantName: string;
  category: MerchantCategory;
  amount: number;
  location?: string;
  timestamp: string;
  routedCardId: string;
  routingReason: string;
  rewardEarned: number;
  rewardUnit: 'points' | 'miles' | 'cashback';
};

export type MerchantCategory =
  | 'dining'
  | 'groceries'
  | 'gas'
  | 'travel'
  | 'entertainment'
  | 'shopping'
  | 'health'
  | 'other';

export type NearbyOffer = {
  id: string;
  merchantName: string;
  category: MerchantCategory;
  distance: number;
  recommendedCardId: string;
  rewardDescription: string;
  estimatedRewardValue: number;
  activeOffer?: string;
  address: string;
};

export type RoutingResult = {
  selectedCardId: string;
  rewardValue: number;
  rewardUnit: 'points' | 'miles' | 'cashback';
  reason: string;
  alternativeCardIds: string[];
  creditScoreImpact: 'positive' | 'neutral' | 'negative';
};

export type UserPreferences = {
  routingStrategy: 'maximize_rewards' | 'cashback' | 'travel' | 'protect_score';
  avoidHighUtilization: boolean;
  utilizationThreshold: number;
  preferredIssuers: string[];
  defaultFallbackCardId: string;
  notifications: {
    nearbyRewards: boolean;
    spendingAlerts: boolean;
    utilizationAlerts: boolean;
    paymentReminders: boolean;
    newOffers: boolean;
  };
  security: {
    faceIdEnabled: boolean;
    purchaseVerification: boolean;
    unusualTransactionAlerts: boolean;
    locationMismatchAlerts: boolean;
  };
};

export type SwipeTransaction = {
  merchantName: string;
  category: MerchantCategory;
  amount: number;
  location?: string;
  timestamp: string;
};
