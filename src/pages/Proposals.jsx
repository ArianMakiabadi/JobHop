import ProposalsTable from "../features/proposals/ProposalsTable";

function Proposals() {
  return (
    <div>
      <h1 className="font-bold text-secondary-700 text-xl mb-8">
        List of proposals
      </h1>
      <ProposalsTable />
    </div>
  );
}

export default Proposals;
