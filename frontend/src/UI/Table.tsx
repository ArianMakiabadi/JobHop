import type { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

function Table({ children }: TableProps) {
  return (
    <div className=" overflow-x-auto">
      <table>{children}</table>
    </div>
  );
}

export default Table;

function TableHeader({ children }: TableProps) {
  return (
    <thead>
      <tr className="title-row">{children}</tr>
    </thead>
  );
}

function TableBody({ children }: TableProps) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }: TableProps) {
  return <tr>{children}</tr>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
