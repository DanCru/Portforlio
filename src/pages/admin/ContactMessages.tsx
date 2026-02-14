import { useEffect, useState } from 'react';
import { Mail, Trash2, Eye, Clock, CheckCircle2, AlertCircle, Inbox, Search } from 'lucide-react';
import PortfolioService, { ContactMessage } from '../../services/portfolio.service';

const ContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await PortfolioService.getContactMessages();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (msg: ContactMessage) => {
    try {
      const data = await PortfolioService.getContactMessage(msg.id);
      setSelectedMessage(data);
      // Update local state to reflect read status
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
    } catch (error) {
      console.error('Failed to fetch message', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await PortfolioService.deleteContactMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error) {
      console.error('Failed to delete message', error);
    }
  };

  const filteredMessages = messages
    .filter(m => {
      if (filter === 'unread') return !m.is_read;
      if (filter === 'read') return m.is_read;
      return true;
    })
    .filter(m => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q);
    });

  const unreadCount = messages.filter(m => !m.is_read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return <div className="flex items-center justify-center p-12"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Mail className="text-blue-500" />
            Contact Messages
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{unreadCount}</span>
            )}
          </h1>
          <p className="text-gray-500 mt-1">{messages.length} total messages</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {(['all', 'unread', 'read'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                filter === f ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f} {f === 'unread' && unreadCount > 0 ? `(${unreadCount})` : ''}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Inbox size={48} className="mx-auto mb-4 opacity-50" />
              <p>No messages found</p>
            </div>
          ) : (
            filteredMessages.map(msg => (
              <div
                key={msg.id}
                onClick={() => handleView(msg)}
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  selectedMessage?.id === msg.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                    : msg.is_read
                      ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750'
                      : 'bg-white dark:bg-gray-800 border-blue-100 dark:border-blue-900 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {!msg.is_read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                    <span className={`text-sm font-semibold ${msg.is_read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                      {msg.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(msg.created_at)}</span>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{msg.subject}</p>
                <p className="text-xs text-gray-400 truncate mt-1">{msg.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-3">
          {selectedMessage ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{selectedMessage.name}</span>
                    <span>•</span>
                    <a href={`mailto:${selectedMessage.email}`} className="text-blue-500 hover:underline">{selectedMessage.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedMessage.is_read ? (
                    <span className="flex items-center gap-1 text-xs text-green-500"><CheckCircle2 size={14} /> Read</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-blue-500"><AlertCircle size={14} /> New</span>
                  )}
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Clock size={14} />
                {formatDate(selectedMessage.created_at)}
              </div>

              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  <Mail size={16} /> Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center shadow-sm">
              <Eye size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-gray-400">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;
