import React from "react";
import { IoPencil, IoSave } from "react-icons/io5";

interface EditModeToggleProps {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditModeToggle: React.FC<EditModeToggleProps> = ({
  editMode,
  setEditMode,
}) => {
  const editModeHandler = () => {
    setEditMode(!editMode);
    document.body.classList.toggle("edit-mode");
  };

  return <></>;

  return (
    <div className="mt-6 pl-4">
      <button onClick={() => editModeHandler()}>
        {editMode && <IoSave />}
        {!editMode && <IoPencil />}
      </button>
    </div>
  );
};

export default EditModeToggle;
