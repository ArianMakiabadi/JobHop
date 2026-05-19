function ConfirmDelete({ resourceName, onClose, onConfirm, disabled }) {
  return (
    <div>
      <h2 className="pb-4">
        Are you sure you want to delete {resourceName}? This action cannot be
        undone.
      </h2>
      <div className="flex justify-around items-center gap-x-8">
        <button
          disabled={disabled}
          onClick={onClose}
          className="btn btn--primary flex-1"
        >
          Cancel
        </button>
        <button
          disabled={disabled}
          onClick={onConfirm}
          className="btn btn--danger-outline flex-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
