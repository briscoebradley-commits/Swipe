import { CreditCard, MerchantCategory, RoutingResult, SwipeTransaction, UserPreferences } from '../types';
import { mockCards } from '../data/cards';

const POINTS_TO_DOLLAR = 0.01;
const MILES_TO_DOLLAR = 0.015;

function cardRewardDollarValue(card: CreditCard, category: MerchantCategory, amount: number): number {
  const match = card.rewardCategories.find(r => r.category === category)
    ?? card.rewardCategories.find(r => r.category === 'other');

  if (!match) return 0;

  if (match.unit === 'cashback') return (match.rate / 100) * amount;
  if (match.unit === 'points') return match.rate * amount * POINTS_TO_DOLLAR;
  if (match.unit === 'miles') return match.rate * amount * MILES_TO_DOLLAR;
  return 0;
}

function utilization(card: CreditCard): number {
  return card.balance / card.creditLimit;
}

function utilizationAfterCharge(card: CreditCard, amount: number): number {
  return (card.balance + amount) / card.creditLimit;
}

export function routeTransaction(
  tx: SwipeTransaction,
  cards: CreditCard[] = mockCards,
  prefs?: Partial<UserPreferences>,
): RoutingResult {
  const eligible = cards.filter(c => !c.isLocked);

  type Scored = { card: CreditCard; rewardValue: number; score: number };

  const scored: Scored[] = eligible.map(card => {
    const rewardValue = cardRewardDollarValue(card, tx.category, tx.amount);
    const newUtil = utilizationAfterCharge(card, tx.amount);

    let score = rewardValue;

    // penalize high utilization
    if (newUtil > 0.3) score *= 0.8;
    if (newUtil > 0.5) score *= 0.5;

    // apply strategy preference
    const strategy = prefs?.routingStrategy ?? 'maximize_rewards';
    if (strategy === 'cashback' && card.pointUnit !== 'cashback') score *= 0.7;
    if (strategy === 'travel' && card.pointUnit !== 'miles') score *= 0.8;
    if (strategy === 'protect_score' && newUtil > 0.1) score *= 0.6;

    // bonus for active offer in category
    const hasActiveOffer = card.currentOffers.length > 0;
    if (hasActiveOffer) score *= 1.05;

    return { card, rewardValue, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];
  const alternatives = scored.slice(1, 3).map(s => s.card.id);

  const match = best.card.rewardCategories.find(r => r.category === tx.category)
    ?? best.card.rewardCategories.find(r => r.category === 'other');

  const rewardUnit = match?.unit ?? 'points';
  const rawReward = rewardUnit === 'cashback'
    ? (match!.rate / 100) * tx.amount
    : match!.rate * tx.amount;

  const newUtil = utilizationAfterCharge(best.card, tx.amount);
  const creditScoreImpact: RoutingResult['creditScoreImpact'] =
    newUtil < 0.1 ? 'positive' : newUtil < 0.3 ? 'neutral' : 'negative';

  const reason = buildReason(best.card, tx.category, match?.label ?? '');

  return {
    selectedCardId: best.card.id,
    rewardValue: Math.round(rawReward * 100) / 100,
    rewardUnit,
    reason,
    alternativeCardIds: alternatives,
    creditScoreImpact,
  };
}

function buildReason(card: CreditCard, category: MerchantCategory, label: string): string {
  const hasOffer = card.currentOffers.length > 0;
  const util = utilization(card);

  if (hasOffer && util < 0.3) {
    return `${label} + active offer. Utilization healthy at ${Math.round(util * 100)}%.`;
  }
  if (label) {
    return `Highest ${category} reward rate at ${label}.`;
  }
  return `Best overall reward value for this purchase.`;
}

export function getCardById(id: string, cards: CreditCard[] = mockCards): CreditCard | undefined {
  return cards.find(c => c.id === id);
}

export function totalRewardsValueThisMonth(cards: CreditCard[] = mockCards): number {
  return cards.reduce((sum, card) => {
    const unit = card.pointUnit;
    if (unit === 'cashback') return sum + card.rewardsEarnedMonth;
    if (unit === 'points') return sum + card.rewardsEarnedMonth * POINTS_TO_DOLLAR;
    if (unit === 'miles') return sum + card.rewardsEarnedMonth * MILES_TO_DOLLAR;
    return sum;
  }, 0);
}

export function portfolioUtilization(cards: CreditCard[] = mockCards): number {
  const totalBalance = cards.reduce((s, c) => s + c.balance, 0);
  const totalLimit = cards.reduce((s, c) => s + c.creditLimit, 0);
  return totalBalance / totalLimit;
}
