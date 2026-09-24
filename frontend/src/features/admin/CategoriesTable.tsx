import useCategories from "../../hooks/useCategories";
import Empty from "../../UI/Empty";
import Loading from "../../UI/Loading";
import Table from "../../UI/Table";
import CategoryRow from "./CategoryRow";

const CategoriesTable = () => {
  const { isLoading, rawCategories } = useCategories();
  if (isLoading) return <Loading />;
  if (!rawCategories.length) return <Empty resourceName="categories" />;

  console.log(rawCategories);

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>Category Name</th>
        <th>description</th>
        <th>Actions</th>
      </Table.Header>
      <Table.Body>
        {rawCategories.map((category, index) => (
          <CategoryRow category={category} index={index} key={category._id} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default CategoriesTable;
