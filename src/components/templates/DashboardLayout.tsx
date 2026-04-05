import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import { LogOut, List} from 'lucide-react';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Munna Practicle</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/products"
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-indigo-600 transition-all group"
          >
            <List size={20} />
            <span className="font-medium">Inventory</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <img
              src={user?.image || 'https://via.placeholder.com/40'}
              alt="Avatar"
              className="w-10 h-10 rounded-full border border-gray-200"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.firstName}
              </p>
              <p className="text-xs text-gray-500 truncate">Administrator</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 p-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Workspace</h2>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-400">Last synced: {new Date().toLocaleTimeString()}</span>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 min-h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
