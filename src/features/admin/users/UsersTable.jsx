import Empty from "../../../UI/Empty";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";
import useUsers from "../useUsers";
import UserTableRow from "./UserTableRow";

function UsersTable() {
  const { isLoading, users } = useUsers();

  if (isLoading) return <Loading />;
  if (!users.length) return <Empty resourceName="users" />;
  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Role</th>
        <th>Status</th>
        <th>Actions</th>
      </Table.Header>
      <Table.Body>
        {users.map(
          (user, index) =>
            user.isActive && (
              <UserTableRow key={user._id} index={index} user={user} />
            )
        )}
      </Table.Body>
    </Table>
  );
}

export default UsersTable;
