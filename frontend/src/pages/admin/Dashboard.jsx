const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value: "1,240" },
          { label: "Teachers", value: "48" },
          { label: "Notices", value: "12" },
          { label: "Events", value: "5" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
