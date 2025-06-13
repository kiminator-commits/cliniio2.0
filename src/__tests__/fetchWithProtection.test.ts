import { fetchWithProtection } from '@/utils/fetchWithProtection';

global.fetch = vi.fn();

describe('fetchWithProtection', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('resolves on first success', async () => {
    (fetch as Record<string, unknown>).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    const res = await fetchWithProtection('/success');
    expect(res.ok).toBe(true);
  });

  it('retries on failure and succeeds', async () => {
    (fetch as { status: number; json: () => Record<string, unknown> })
      .mockRejectedValueOnce(new Error('Fail 1'))
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({}) });

    const res = await fetchWithProtection('/retry', { retries: 1 });
    expect(res.ok).toBe(true);
  });

  it('throws after all retries fail', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Fail again'));

    await expect(fetchWithProtection('/fail', { retries: 2 })).rejects.toThrow('Fail again');
  });
});
