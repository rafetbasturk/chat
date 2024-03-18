import useQueryParam from "../hooks/useQueryParam";

export default function SearchInput() {
  const { handleChange } = useQueryParam();

  return (
    <input
      type="text"
      name="search"
      placeholder="Search"
      className="border border-gray-200 rounded-full px-3 py-1 text-gray-800 grow outline-blue-400"
      onChange={(e) => handleChange("search", e.target.value)}
    />
  );
}
