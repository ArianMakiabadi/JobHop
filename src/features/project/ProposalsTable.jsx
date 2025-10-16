import Empty from "../../UI/Empty";
import Table from "../../UI/Table";
import ProposalTableRow from "./ProposalTableRow";

function ProposalsTable({ proposals }) {
  if (!proposals.length) return <Empty resourceName="proposals" />;
  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>Freelancer</th>
        <th>Description</th>
        <th>Delivery Time</th>
        <th>Cost</th>
        <th>Status</th>
        <th>Actions</th>
      </Table.Header>
      <Table.Body>
        {proposals.map((proposal, index) => (
          <ProposalTableRow
            key={proposal._id}
            proposal={proposal}
            index={index}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

export default ProposalsTable;
