import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTimeRemaining, padZero } from './countdown';

test('calculateTimeRemaining returns correct breakdown for future date', () => {
  const now = new Date('2026-11-05T21:49:51+05:30').getTime();
  const target = '2026-11-06T00:00:00+05:30';

  const res = calculateTimeRemaining(target, now);
  assert.equal(res.isReached, false);
  assert.equal(res.days, 0);
  assert.equal(res.hours, 2);
  assert.equal(res.minutes, 10);
  assert.equal(res.seconds, 9);
  assert.equal(res.totalSeconds, 2 * 3600 + 10 * 60 + 9);
});

test('calculateTimeRemaining returns isReached: true when target time has passed', () => {
  const now = new Date('2026-11-06T00:00:01+05:30').getTime();
  const target = '2026-11-06T00:00:00+05:30';

  const res = calculateTimeRemaining(target, now);
  assert.equal(res.isReached, true);
  assert.equal(res.days, 0);
  assert.equal(res.hours, 0);
  assert.equal(res.minutes, 0);
  assert.equal(res.seconds, 0);
  assert.equal(res.totalSeconds, 0);
});

test('calculateTimeRemaining handles multi-day countdowns', () => {
  const now = new Date('2026-11-01T00:00:00Z').getTime();
  const target = '2026-11-06T00:00:00Z';

  const res = calculateTimeRemaining(target, now);
  assert.equal(res.isReached, false);
  assert.equal(res.days, 5);
  assert.equal(res.hours, 0);
  assert.equal(res.minutes, 0);
  assert.equal(res.seconds, 0);
});

test('padZero formats numbers with leading zero', () => {
  assert.equal(padZero(5), '05');
  assert.equal(padZero(12), '12');
  assert.equal(padZero(0), '00');
});
