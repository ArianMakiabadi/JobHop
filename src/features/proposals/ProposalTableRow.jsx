import Table from "../../UI/Table";
import truncateText from "../../utils/truncateText";

function ProposalTableRow({ proposal, index }) {
  const { status, description, duration, price } = proposal;
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
  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{truncateText(description, 50)}</td>
      <td>{duration} Days</td>
      <td>{price} €</td>
      <td>
        <span className={`badge ${statusStyle[status].className}`}>
          {statusStyle[status].label}
        </span>
      </td>
    </Table.Row>
  );
}

export default ProposalTableRow;
