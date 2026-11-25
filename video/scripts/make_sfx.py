"""Synthesise the trailer's sound effects (no third-party audio, no licensing questions).
Run: python3 scripts/make_sfx.py  → public/sfx/*.wav (44.1 kHz mono, 16-bit)."""
import numpy as np, wave, os
SR = 44100
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'sfx')
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)

def t(d): return np.arange(int(SR * d)) / SR
def env(n, a=0.004, r=None, curve=6.0):
    x = np.ones(n); na = max(1, int(SR * a)); x[:na] = np.linspace(0, 1, na)
    tail = np.linspace(0, 1, n - na); x[na:] = np.exp(-curve * tail)
    return x
def save(name, y, gain=0.8):
    y = y / (np.max(np.abs(y)) + 1e-9) * gain
    fade = int(SR * 0.004); y[-fade:] *= np.linspace(1, 0, fade)
    with wave.open(os.path.join(OUT, name), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((y * 32767).astype(np.int16).tobytes())
def lowpass(x, k):  # simple moving-average lowpass
    return np.convolve(x, np.ones(k) / k, mode='same')
def bell(f, d, decay=5.0):
    tt = t(d); y = sum(a * np.sin(2 * np.pi * f * m * tt) for m, a in [(1, 1), (2.01, 0.35), (3.02, 0.15), (4.2, 0.06)])
    return y * env(len(tt), 0.002, curve=decay)

# pop: a quick upward bubble
tt = t(0.14); f = np.linspace(420, 1150, len(tt)); ph = 2 * np.pi * np.cumsum(f) / SR
save('pop.wav', np.sin(ph) * env(len(tt), 0.003, curve=9) + 0.15 * rng.standard_normal(len(tt)) * env(len(tt), 0.001, curve=40), 0.7)
# whoosh: band-limited noise swell
tt = t(0.42); n = rng.standard_normal(len(tt)); n = lowpass(n, 6) - lowpass(n, 40)
sw = np.sin(np.pi * np.linspace(0, 1, len(tt))) ** 2
save('whoosh.wav', n * sw, 0.55)
# tick: keyboard key
tt = t(0.03); n = rng.standard_normal(len(tt)); n = n - lowpass(n, 4)
save('tick.wav', n * env(len(tt), 0.0005, curve=30), 0.35)
# check: two-note blip up
save('check.wav', np.concatenate([bell(880, 0.07, 14), bell(1320, 0.16, 10)]), 0.55)
# snap: padlock click
c = lambda: (lambda n: (n - lowpass(n, 3)) * env(len(n), 0.0003, curve=60))(rng.standard_normal(int(SR * 0.025)))
save('snap.wav', np.concatenate([c(), np.zeros(int(SR * 0.045)), c() * 1.3, np.zeros(int(SR * 0.05))]), 0.6)
# thud: soft landing
tt = t(0.22); f = np.linspace(140, 60, len(tt)); ph = 2 * np.pi * np.cumsum(f) / SR
save('thud.wav', np.sin(ph) * env(len(tt), 0.002, curve=10), 0.7)
# ding: phone notification (E6 → A6)
a = bell(1318.5, 0.18, 9); b = bell(1760, 0.7, 5)
y = np.zeros(int(SR * 0.85)); y[:len(a)] += a; y[int(SR * 0.12):int(SR * 0.12) + len(b)] += b
save('ding.wav', y, 0.6)
# sparkle: little random pings (confetti)
y = np.zeros(int(SR * 1.2))
for i in range(14):
    s = int(rng.uniform(0, 0.9) * SR); p = bell(rng.uniform(2200, 4200), 0.25, 12) * rng.uniform(0.3, 1)
    y[s:s + len(p)] += p[: len(y) - s]
save('sparkle.wav', y, 0.35)
# chime: final major arpeggio C5 E5 G5 C6
y = np.zeros(int(SR * 2.2))
for i, f in enumerate([523.25, 659.25, 783.99, 1046.5]):
    s = int(SR * 0.11 * i); p = bell(f, 1.9, 3.2); y[s:s + len(p)] += p[: len(y) - s]
save('chime.wav', y, 0.7)
# draw: pen scratch for the zero being drawn
tt = t(0.8); n = rng.standard_normal(len(tt)); n = lowpass(n, 3) - lowpass(n, 18)
save('draw.wav', n * (0.6 + 0.4 * np.sin(2 * np.pi * 9 * tt)) * np.sin(np.pi * np.linspace(0, 1, len(tt))), 0.25)
print(sorted(os.listdir(OUT)))
