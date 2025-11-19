"use client";
import { AiFillDelete } from "react-icons/ai";

export default function DeleteButton({ handleDelete, reviewId }) {
  return (
    <div className="flex justify-end">
      <button
        onClick={() => {
          handleDelete(reviewId);
        }}
        className="uppercase text-white border-3 text-lg border-flexmills-green p-1 px-3 cursor-pointer hover:scale-110"
      >
        <AiFillDelete aria-label="Delete this review" />
      </button>
    </div>
  );
}
