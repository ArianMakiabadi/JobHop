import Empty from "../../UI/Empty";
import Loading from "../../UI/Loading";
import Table from "../../UI/Table";
import ProposalTableRow from "./ProposalTableRow";
import useProposals from "./useProposals";

function ProposalsTable() {
  const { isLoading, proposals } = useProposals();

  if (isLoading) return <Loading />;
  if (!proposals.length) return <Empty resourceName="proposals" />;
  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>Description</th>
        <th>Delivery time</th>
        <th>Cost</th>
        <th>Status</th>
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
