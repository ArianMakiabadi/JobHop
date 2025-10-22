import { useState } from "react";
import Modal from "../../../UI/Modal";
import Table from "../../../UI/Table";
import truncateText from "../../../utils/TruncateText";
import ChangeUserStatus from "./ChangeUserStatus";

function UserTableRow({ index, user }) {
  const { name, email, phoneNumber, role, status } = user;
  const [isOpen, setIsOpen] = useState(false);

  const userStatus = [
    {
      label: "rejected",
      className: "badge--danger",
    },
    {
      label: "pending",
      className: "badge--warning",
    },
    {
      label: "accepted",
      className: "badge--success",
    },
  ];

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{truncateText(name, 25)}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>{role.toLowerCase()}</td>
      <td>
        {" "}
        <span className={`badge ${userStatus[status].className}`}>
          {userStatus[status].label}
        </span>
      </td>
      <td>
        <Modal
          title="change user status"
          onClose={() => setIsOpen(false)}
          open={isOpen}
        >
          <ChangeUserStatus
            userId={user._id}
            onClose={() => setIsOpen(false)}
            status={status}
            role={role}
          />
        </Modal>
        <button className="btn btn--primary" onClick={() => setIsOpen(true)}>
          change status
        </button>
      </td>
    </Table.Row>
  );
}

export default UserTableRow;
