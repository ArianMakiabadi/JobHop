import { useState } from "react";
import Modal from "../../UI/Modal";
import Table from "../../UI/Table";
import truncateText from "../../utils/TruncateText";
import { FaTimes } from "react-icons/fa";
import { AiOutlineSync } from "react-icons/ai";
import ChangeProposalStatus from "./ChangeProposalStatus";

//propsal.status:
// 0 => rejected
// 1 => pending
// 2 => approved

const statusStyle = [
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

function ProposalTableRow({ proposal, index }) {
  const { user, status } = proposal;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{truncateText(proposal.description, 50)}</td>
      <td>{proposal.duration} days</td>
      <td>{proposal.price}</td>
      <td>
        <span className={`badge ${statusStyle[status].className}`}>
          {statusStyle[status].label}
        </span>
      </td>
      <td>
        <Modal
          title="changing the status"
          onClose={() => setIsOpen(false)}
          open={isOpen}
        >
          <ChangeProposalStatus
            proposalId={proposal._id}
            onClose={() => setIsOpen(false)}
            status={status}
          />
        </Modal>
        <button className="btn btn--primary" onClick={() => setIsOpen(true)}>
          change status
        </button>
      </td>
    </Table.Row>
  );
}

export default ProposalTableRow;
