"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filtering({ allTags, allTypes }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") || "";
  const currentTag = searchParams.get("tag") || "";

  function handleChange(e) {
    const newType = e.target.name === "type" ? e.target.value : currentType;
    const newTag = e.target.name === "tag" ? e.target.value : currentTag;
    router.push(`/workouts?type=${newType}&tag=${newTag}`);
  }

  return (
    <div className="flex mt-4 border-2 p-1 border-flexmills-grey md:w-180">
      <form className="text-sm">
        <p className="justify-self-start font-bold mb-2">Filter by:</p>
        <label>
          Type:
          <select
            name="type"
            value={currentType}
            onChange={handleChange}
            className="border border-flexmills-black ml-2"
          >
            <option value="">All</option>
            {allTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="ml-4">
          Suitability:
          <select
            name="tag"
            value={currentTag}
            onChange={handleChange}
            className="border border-flexmills-black ml-2"
          >
            <option value="">All</option>
            {allTags.map((tag) => (
              <option key={tag.id} value={tag.tag_name}>
                {tag.tag_name}
              </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
}
