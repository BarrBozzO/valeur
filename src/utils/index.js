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

function truncateText(str, length = 100) {
  const ending = "...";

  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}

export { getRichText, truncateText };
