export function escapeForSingleQuotedAttr(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

export function stripUndefined(obj) {
  Object.keys(obj).forEach((k) => (obj)[k] === undefined && delete (obj)[k]);
  return obj;
}

export function buildSnippet(propsObj) {
  const json = JSON.stringify(propsObj);
  const escaped = escapeForSingleQuotedAttr(json);
  return `<div class="interactive" data-props='${escaped}'></div>`;
}

export async function copy(text, setMsg) {
  try {
    await navigator.clipboard.writeText(text);
    setMsg('✅ Copied to clipboard.');
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      setMsg('✅ Copied to clipboard.');
    } catch {
      setMsg('⚠️ Copy failed. Select and copy manually.');
    } finally {
      document.body.removeChild(ta);
    }
  }
  setTimeout(() => setMsg(''), 3000);
}

export const hexToRgbObj = (hex) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16)
});

export function getLuminance(hex) {
  const r = parseInt(hex.slice(1,3),16) / 255;
  const g = parseInt(hex.slice(3,5),16) / 255;
  const b = parseInt(hex.slice(5,7),16) / 255;
  const lin = (c) => (c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
export function contrastRatio(fgHex, bgHex) {
  const L1 = getLuminance(fgHex), L2 = getLuminance(bgHex);
  const light = Math.max(L1, L2), dark = Math.min(L1, L2);
  return (light + 0.05) / (dark + 0.05);
}
export function wcagBadges(ratio) {
  const res = { small: 'Fail', large: 'Fail', clsSmall: 'fail', clsLarge: 'fail' };
  if (ratio >= 7)        { res.small='AAA'; res.large='AAA'; res.clsSmall='pass-aaa'; res.clsLarge='pass-aaa'; }
  else if (ratio >= 4.5) { res.small='AA';  res.large='AAA'; res.clsSmall='pass-aa';  res.clsLarge='pass-aaa'; }
  else if (ratio >= 3)   { res.small='Fail';res.large='AA';  res.clsSmall='fail';     res.clsLarge='pass-aa'; }
  return res;
}
