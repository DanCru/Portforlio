

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-sm">
                    <h3 className="text-gray-500 text-sm uppercase">Total Users</h3>
                    <p className="text-2xl font-bold">1</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-sm">
                    <h3 className="text-gray-500 text-sm uppercase">Translations</h3>
                    <p className="text-2xl font-bold">Manage Strings</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-sm">
                    <h3 className="text-gray-500 text-sm uppercase">System Status</h3>
                    <p className="text-green-500 font-bold">Healthy</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
