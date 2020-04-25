function getRichText(value) {
  if (value.content && !value.nodeType) return getRichText(value.content);
  else if (Array.isArray(value)) return value.map(v => getRichText(v));
  else if (value.nodeType) {
    return {
      ...value,
      content: value.content ? getRichText(value.content) : null,
    };
  }

  return null;
}

export { getRichText };
