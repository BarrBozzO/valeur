function getRichText(value) {
  console.log(value);
  if (value.content) return getRichText(value.content);
  else if (Array.isArray(value)) return value.map(v => getRichText(v));
  else if (value.nodeType) {
    return value.value;
  }

  return null;
}

export { getRichText };
