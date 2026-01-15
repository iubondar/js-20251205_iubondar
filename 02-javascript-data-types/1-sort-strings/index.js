/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  if (param !== "asc" && param !== "desc") return arr;

  // Создаем копию массива и сортируем его
  return [...arr].sort((a, b) => {
    const factor = param === "asc" ? 1 : -1;
    return factor * a.localeCompare(b, ["ru", "en"], { caseFirst: "upper" });
  });
}
