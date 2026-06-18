/**
 * Suminagashi floating-ink fragment shader.
 *
 * Builds marbled, veined ink using domain-warped fractal noise. The flow field
 * reacts to the pointer, ripples outward on click, intensifies with scroll
 * activity, and reshapes per project "pattern". Colours come from the palette.
 *
 * Uniforms are driven from InkScene.tsx.
 */

export const inkVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const inkFragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;       // normalized 0..1, y up
  uniform vec2  uMouseVel;    // pointer velocity (normalized units / frame)
  uniform float uMouseStr;    // 0..1 pointer presence
  uniform vec2  uRipple;      // ripple origin, normalized
  uniform float uRippleTime;  // seconds since last ripple
  uniform float uActivity;    // scroll/interaction energy 0..1
  uniform float uIntensity;   // user/system intensity 0..1
  uniform float uPattern;     // 0 default,1 network,2 waves,3 streams,4 typo,5 ledger,6 graph
  uniform float uQuality;     // 1.0 high, 0.0 low (fewer octaves)
  uniform float uMode;        // 0.0 dark, 1.0 light

  // palette
  const vec3 INK_BLACK  = vec3(0.031, 0.039, 0.047); // #080A0C
  const vec3 CHARCOAL   = vec3(0.090, 0.102, 0.118); // #171A1E
  const vec3 INDIGO     = vec3(0.149, 0.204, 0.369); // #26345E
  const vec3 SILVER     = vec3(0.663, 0.678, 0.706); // #A9ADB4
  const vec3 RICE_PAPER = vec3(0.949, 0.937, 0.910); // #F2EFE8

  // --- hash / noise ---------------------------------------------------------
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y);
  }

  float fbm(vec2 p, float octaves) {
    float value = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 6; i++) {
      if (float(i) >= octaves) break;
      value += amp * noise(p * freq);
      freq *= 2.02;
      amp *= 0.5;
    }
    return value;
  }

  void main() {
    // aspect-correct coordinates centered, y up
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.04 * (0.45 + 0.55 * uIntensity);
    float oct = mix(3.0, 5.0, uQuality);

    // pointer influence: a soft well/peak that warps the field
    vec2 m = uMouse;
    m.x *= uResolution.x / uResolution.y;
    float md = distance(p, m);
    float pointer = uMouseStr * exp(-md * 3.2);

    // pointer drag + swirl: ink follows the cursor and curls around it
    vec2 mvel = uMouseVel;
    mvel.x *= uResolution.x / uResolution.y;
    float vmag = length(mvel);
    vec2 toM = p - m;
    float drag = uMouseStr * exp(-md * 2.6);
    vec2 wake = drag * (mvel * 2.2 + vec2(-toM.y, toM.x) * vmag * 5.0);

    // ripple: expanding ring from last click
    vec2 r = uRipple;
    r.x *= uResolution.x / uResolution.y;
    float rd = distance(p, r);
    float ripple = 0.0;
    if (uRippleTime < 2.2) {
      float radius = uRippleTime * 0.55;
      ripple = sin((rd - radius) * 26.0) * exp(-rd * 4.0) * exp(-uRippleTime * 2.0);
    }

    // pattern-specific flow biasing
    vec2 flow = vec2(0.0);
    if (uPattern > 0.5 && uPattern < 1.5) {        // network: radial pull to nodes
      flow = sin(p * 6.2831 + t * 4.0) * 0.18;
    } else if (uPattern < 2.5) {                    // waves: horizontal sound waves
      flow = vec2(0.0, sin(p.x * 10.0 + t * 8.0) * 0.22);
    } else if (uPattern < 3.5) {                    // streams: vertical convergence
      flow = vec2((0.5 - uv.x) * 0.3, 0.12);
    } else if (uPattern < 4.5) {                    // typography: gentle settling
      flow = vec2(0.0, -0.08);
    } else if (uPattern < 5.5) {                    // ledger: concentric rings
      flow = normalize(p - m + 0.0001) * sin(md * 14.0 - t * 6.0) * 0.16;
    } else if (uPattern < 6.5) {                    // graph: cross-hatched lattice
      flow = vec2(sin(p.y * 9.0 + t * 3.0), cos(p.x * 9.0 - t * 3.0)) * 0.14;
    }

    // the cursor wake drags the whole field locally
    flow += wake;

    // domain warp -> marbled veins
    vec2 q = vec2(
      fbm(p + flow + vec2(0.0, t), oct),
      fbm(p + flow + vec2(5.2, 1.3 - t), oct)
    );

    float warpAmt = 1.8 + uActivity * 1.3 + pointer * 1.6 + ripple * 0.9 + vmag * uMouseStr * 7.2;
    vec2 rr2 = vec2(
      fbm(p + warpAmt * q + vec2(1.7, 9.2) + t * 0.5, oct),
      fbm(p + warpAmt * q + vec2(8.3, 2.8) - t * 0.5, oct)
    );

    float ink = fbm(p + warpAmt * rr2, oct);
    ink = ink * 0.5 + 0.5;

    // sharpen into marbled bands (Suminagashi rings) — more defined veins
    float veins = abs(sin(ink * 10.5 + rr2.x * 2.4 + ripple * 3.8));
    veins = pow(veins, 1.4);

    // stronger contrast so the marbled ink reads clearly
    float density = smoothstep(0.22, 0.82, ink);
    density = mix(density, density * (0.55 + 0.45 * veins), 0.75);

    // colour: paper base, charcoal/indigo ink, silver edges — richer, more saturated
    vec3 col = RICE_PAPER;
    col = mix(col, SILVER, smoothstep(0.26, 0.50, density) * 0.9);
    col = mix(col, INDIGO, smoothstep(0.38, 0.68, density) * 1.0);
    col = mix(col, CHARCOAL, smoothstep(0.56, 0.85, density) * 1.05);
    col = mix(col, INK_BLACK, smoothstep(0.75, 0.98, density));

    // silver vein highlights — more pronounced
    col = mix(col, SILVER, veins * smoothstep(0.35, 0.68, density) * 0.32);

    // pointer adds a rich indigo bloom; ripple adds silver wake
    col = mix(col, INDIGO, pointer * 0.24);
    col += SILVER * max(ripple, 0.0) * 0.18;
    // luminous wake where the cursor is moving fast — brighter trail
    col += SILVER * drag * min(vmag * 2.8, 0.8);

    // subtle paper grain
    float grain = noise(uv * uResolution * 0.5) * 0.02;
    col += grain;

    // soft vignette: toward ink-black in dark mode, toward rice paper in light
    float vig = smoothstep(1.15, 0.35, distance(uv, vec2(0.5)));
    vec3 vigColor = mix(INK_BLACK, RICE_PAPER, uMode);
    float vigFloor = mix(0.78, 0.90, uMode);
    col = mix(vigColor, col, mix(vigFloor, 1.0, vig));

    // in light mode lift the whole field toward paper so it reads bright
    col = mix(col, mix(col, RICE_PAPER, 0.32), uMode);

    gl_FragColor = vec4(col, 1.0);
  }
`;
