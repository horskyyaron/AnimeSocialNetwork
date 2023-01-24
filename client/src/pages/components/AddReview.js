export default function AddReview({ onCancel  }) {
  const handleCancel = () => {
    onCancel(false);
  };
  return (
    <>
      <h1>adding review form</h1>
      <button className="styled_button" onClick={handleCancel}>
        cancel
      </button>
    </>
  );
}
