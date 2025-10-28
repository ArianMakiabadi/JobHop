const colors = {
  primary: "bg-primary-100 text-primary-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  yellow: "bg-yellow-100 text-yellow-700",
  blue: "bg-blue-100 text-blue-700",
};

function Stat({ icon, title, value, color }) {
  return (
    <div className="grid grid-cols-1 gap-x-4">
      <div className="col-span-1 grid grid-rows-2 grid-cols-[6.4rem_1fr] bg-secondary-0 rounded-xl p-4 gap-x-4">
        <div
          className={`row-span-2 flex items-center justify-center aspect-square rounded-full ${colors[color]}`}
        >
          {icon}
        </div>
        <h5 className="font-bold text-lg text-secondary-600 self-center">
          {title}
        </h5>
        <p className="font-bold text-3xl text-secondary-900">{value}</p>
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
    </div>
  );
}

export default Stat;
