export const vertex = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const fragment = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uBackground;
uniform vec3 uFrom;
uniform vec3 uTo;
uniform float uScale;
uniform float uSpeed;
uniform float uWarp;
uniform float uLow;
uniform float uHigh;

in vec2 vUv;
out vec4 outColor;

const float CAP_TO_WIDE = 0.30;
const float CAP_FROM_WIDE = 0.22;
const float CAP_TO_NARROW = 0.50;
const float CAP_FROM_NARROW = 0.38;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotate = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p = rotate * p;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (vUv - 0.5) * vec2(aspect, 1.0) * uScale;
  float t = uTime * uSpeed;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + uWarp * q + vec2(1.7, 9.2) + t * 0.6),
    fbm(p + uWarp * q + vec2(8.3, 2.8) - t * 0.4)
  );
  float f = fbm(p + uWarp * r);

  float wide = smoothstep(1.0, 1.5, aspect);
  float field = smoothstep(mix(uLow - 0.14, uLow, wide), mix(uHigh - 0.12, uHigh, wide), f);
  float hue = smoothstep(0.30, 0.80, r.x);
  vec3 tint = mix(uTo, uFrom, hue);
  float capTo = mix(CAP_TO_NARROW, CAP_TO_WIDE, wide);
  float capFrom = mix(CAP_FROM_NARROW, CAP_FROM_WIDE, wide);
  float cap = mix(capTo, capFrom, hue);

  vec2 fromText = (vUv - vec2(0.28, 0.5)) * vec2(aspect, 1.0);
  float textZone = 1.0 - 0.45 * wide * exp(-dot(fromText, fromText) * 2.5);
  float bottomFade = smoothstep(0.0, 0.3, vUv.y);

  vec2 fromGlow = (vUv - vec2(0.85, 0.88)) * vec2(aspect, 1.0);
  float glow = exp(-dot(fromGlow, fromGlow) * 6.0) * wide;

  float amount = field * cap * textZone * (1.0 + 1.2 * glow) * bottomFade;
  outColor = vec4(mix(uBackground, tint, amount), 1.0);
}
`;
