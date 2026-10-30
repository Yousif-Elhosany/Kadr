// Tiny Web Audio synth: every demo sound is generated in code, no audio files.
window.SFX = (() => {
  let ctx, master, noiseBuf, enabled = false;

  function ensure() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0.5;
      const comp = ctx.createDynamicsCompressor();
      master.connect(comp).connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume();
  }

  const noise = () => { const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true; return s; };
  const gain = () => ctx.createGain();
  // exponential attack/decay envelope
  const env = (g, t, a, peak, d) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  };
  const out = node => {
    if (!ctx.createStereoPanner) return node.connect(master);
    const p = ctx.createStereoPanner(); node.connect(p).connect(master); return p;
  };

  const sounds = {
    whoosh() {
      const t = ctx.currentTime, n = noise(), f = ctx.createBiquadFilter(), g = gain();
      f.type = 'bandpass'; f.Q.value = 1.1;
      f.frequency.setValueAtTime(250, t);
      f.frequency.exponentialRampToValueAtTime(2600, t + 0.42);
      f.frequency.exponentialRampToValueAtTime(380, t + 0.95);
      env(g, t, 0.38, 0.9, 0.55);
      n.connect(f).connect(g);
      const p = out(g);
      if (p.pan) { p.pan.setValueAtTime(-0.8, t); p.pan.linearRampToValueAtTime(0.8, t + 0.95); }
      n.start(t); n.stop(t + 1);
    },
    impact() {
      const t = ctx.currentTime, o = ctx.createOscillator(), g = gain();
      o.type = 'sine';
      o.frequency.setValueAtTime(150, t);
      o.frequency.exponentialRampToValueAtTime(36, t + 0.6);
      env(g, t, 0.006, 1, 1.3);
      o.connect(g); out(g); o.start(t); o.stop(t + 1.4);
      const n = noise(), f = ctx.createBiquadFilter(), ng = gain();
      f.type = 'lowpass'; f.frequency.value = 1100;
      env(ng, t, 0.003, 0.7, 0.28);
      n.connect(f).connect(ng); out(ng); n.start(t); n.stop(t + 0.4);
    },
    riser() {
      const t = ctx.currentTime, dur = 1.6, o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = gain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(160, t);
      o.frequency.exponentialRampToValueAtTime(1300, t + dur);
      f.type = 'lowpass';
      f.frequency.setValueAtTime(300, t);
      f.frequency.exponentialRampToValueAtTime(7000, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.32, t + dur);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.08);
      o.connect(f).connect(g); out(g); o.start(t); o.stop(t + dur + 0.1);
      const n = noise(), hf = ctx.createBiquadFilter(), ng = gain();
      hf.type = 'highpass';
      hf.frequency.setValueAtTime(800, t);
      hf.frequency.exponentialRampToValueAtTime(9000, t + dur);
      ng.gain.setValueAtTime(0.0001, t);
      ng.gain.exponentialRampToValueAtTime(0.25, t + dur);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.08);
      n.connect(hf).connect(ng); out(ng); n.start(t); n.stop(t + dur + 0.1);
    },
    glitch() {
      const t0 = ctx.currentTime;
      for (let i = 0; i < 7; i++) {
        const t = t0 + i * 0.055 + Math.random() * 0.02, o = ctx.createOscillator(), g = gain();
        o.type = 'square';
        o.frequency.setValueAtTime(80 + Math.random() * 1700, t);
        env(g, t, 0.002, 0.22, 0.04);
        o.connect(g); out(g); o.start(t); o.stop(t + 0.06);
      }
    },
    click() {
      const t = ctx.currentTime, o = ctx.createOscillator(), g = gain();
      o.type = 'square';
      o.frequency.setValueAtTime(1900, t);
      o.frequency.exponentialRampToValueAtTime(900, t + 0.03);
      env(g, t, 0.001, 0.18, 0.035);
      o.connect(g); out(g); o.start(t); o.stop(t + 0.05);
    }
  };

  return {
    play(name) { try { ensure(); sounds[name] && sounds[name](); } catch (e) { /* audio unsupported */ } },
    ui(name) { if (enabled) this.play(name); },
    set(v) { enabled = v; if (v) this.play('click'); },
    get on() { return enabled; }
  };
})();
