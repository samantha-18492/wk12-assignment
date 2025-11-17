"use client";

export default function DeleteButton({ handleDelete, reviewId }) {
  return (
    <div>
      <button
        onClick={() => {
          handleDelete(reviewId);
        }}
      >
        Delete
      </button>
    </div>
  );
}
