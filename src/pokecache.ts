export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;
  constructor(number: number) {
    this.#interval = number;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, { createdAt: Date.now(), val });
  }

  get<T>(key: string): T | undefined {
    const obj = this.#cache.get(key);
    return obj?.val;
  }
  #reap() {
    for (const [name, entry] of this.#cache) {
      const dif = Date.now() - entry.createdAt;
      if (dif > this.#interval) {
        this.#cache.delete(name);
      }
    }
  }
  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }
  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
