export const isSriLankan = (text) => {
  if (text) {
    const lowered_text = text.toLowerCase().trim();
    if (
      [
        "sl",
        "srilanka",
        "sri lanka",
        "sri-lanka",
        "srilankan",
        "sri lankan",
        "sri-lankan",
      ].includes(lowered_text)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
