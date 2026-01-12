import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import {
  FaPlane,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrash,
  FaTrain,
  FaBus,
  FaUserFriends,
  FaCreditCard,
} from "react-icons/fa";

const videoPath = '/mytripbg.mp4';

const gradients = [
  "from-orange-500 via-pink-500 to-purple-600",
  "from-emerald-400 via-teal-400 to-cyan-500",
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-amber-400 via-orange-500 to-red-500",
];

function getSignedOffset(index, active, total) {
  if (total <= 1) return 0;
  let diff = index - active;
  const half = Math.floor(total / 2);
  if (diff > half) diff -= total;
  if (diff < -half) diff += total;
  return diff;
}

const MyTripsPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [active, setActive] = useState(0);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    if (!user) {
      setBookings([]);
      setActive(0);
      return;
    }

    const mine = all.filter((b) => b.userId === user.id);
    setBookings(mine);
    setActive(0);
  }, [user]);

  const visible = useMemo(() => {
    const mine = bookings;
    switch (activeTab) {
      case 'flight': return mine.filter(b => b.type === 'flight');
      case 'train': return mine.filter(b => b.type === 'train');
      case 'bus': return mine.filter(b => b.type === 'bus');
      default: return mine;
    }
  }, [activeTab, bookings]);

  const prev = () => visible.length > 1 && setActive((p) => (p - 1 + visible.length) % visible.length);
  const next = () => visible.length > 1 && setActive((p) => (p + 1) % visible.length);

  const openEdit = (b) => { setEditingBooking(b); setEditForm({ ...b }); };
  const closeEdit = () => { setEditingBooking(null); setEditForm({}); };

  const saveEdit = () => {
    if (!editForm.from?.trim() || !editForm.to?.trim() || !editForm.amount) return alert("Fill all fields");

    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updated = all.map((b) => b.id === editingBooking.id ? { ...b, ...editForm, amount: Number(editForm.amount) } : b);
    localStorage.setItem("bookings", JSON.stringify(updated));

    // Refresh all data
    const mine = updated.filter((b) => b.userId === user.id);
    setBookings(mine);

    setToast("Trip updated");
    setTimeout(() => setToast(null), 1500);
    closeEdit();
  };

  const deleteBooking = (id) => {
    if (!confirm("Delete trip?")) return;
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updated = all.filter((b) => b.id !== id);
    localStorage.setItem("bookings", JSON.stringify(updated));

    // Refresh all data
    const mine = updated.filter((b) => b.userId === user.id);
    setBookings(mine);

    setActive(0);
    setToast("Trip deleted");
    setTimeout(() => setToast(null), 1500);
  };

  if (editingBooking) return (
    <>
      {/* Full Screen Video Background */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden -z-20">
        <video src={videoPath} type='video/mp4' autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 min-h-screen bg-slate-950/50 backdrop-blur-sm text-slate-50 p-6">
        <Navbar onNavigate={onNavigate} />
        <div className="max-w-md mx-auto mt-10">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Edit Trip</h2>
            <div className="space-y-4">
              <input className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" placeholder="From" value={editForm.from || ""} onChange={e => setEditForm({ ...editForm, from: e.target.value })} />
              <input className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" placeholder="To" value={editForm.to || ""} onChange={e => setEditForm({ ...editForm, to: e.target.value })} />
              <input className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" type="number" placeholder="Amount" value={editForm.amount || ""} onChange={e => setEditForm({ ...editForm, amount: Number(e.target.value) })} />
              <div className="flex gap-3 pt-2">
                <button onClick={saveEdit} className="flex-1 bg-emerald-500 text-black font-bold py-3 rounded-xl">Save</button>
                <button onClick={closeEdit} className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-xl">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Full Screen Video Background */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden -z-20">
        <video src={videoPath} type='video/mp4' autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Original Main Content */}
      <div className="relative z-10 min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
        <Navbar onNavigate={onNavigate} />

        <div className="flex flex-col items-center justify-center min-h-[85vh]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">My Trips</h1>
            <p className="text-xs text-slate-500 mt-1">Total: {bookings.length} trips</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-3 border border-slate-700 w-full max-w-lg mx-auto">
            <button
              onClick={() => { setActiveTab('all'); setActive(0); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'all' ? 'bg-orange-500/80 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
            >
              All ({bookings.length})
            </button>
            <button
              onClick={() => { setActiveTab('flight'); setActive(0); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'flight' ? 'bg-blue-500/80 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
            >
              ✈️ Flights ({bookings.filter(b => b.type === 'flight').length})
            </button>
            <button
              onClick={() => { setActiveTab('train'); setActive(0); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'train' ? 'bg-green-500/80 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
            >
              🚂 Trains ({bookings.filter(b => b.type === 'train').length})
            </button>
            <button
              onClick={() => { setActiveTab('bus'); setActive(0); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'bus' ? 'bg-purple-500/80 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
            >
              🚌 Buses ({bookings.filter(b => b.type === 'bus').length})
            </button>
          </div>


          {visible.length === 0 ? (
            <div className="text-slate-500 text-sm text-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              No {activeTab === 'all' ? 'trips' : activeTab.toUpperCase()} bookings yet.
            </div>
          ) : (
            <div className="relative h-[400px] w-full flex items-center justify-center" style={{ perspective: "1000px" }}>
              <div className="relative w-[240px] h-[360px]" style={{ transformStyle: "preserve-3d" }}>
                {visible.map((b, index) => {
                  const offset = getSignedOffset(index, active, visible.length);
                  const abs = Math.abs(offset);
                  const hidden = abs > 2;

                  const translateX = offset * 180;
                  const rotateY = offset * -25;
                  const scale = 1 - abs * 0.15;
                  const opacity = 1 - abs * 0.25;
                  const zIndex = 50 - abs * 10;

                  const getIcon = () => {
                    switch (b.type) {
                      case 'train': return <FaTrain className="text-sm text-white" />;
                      case 'bus': return <FaBus className="text-sm text-white" />;
                      default: return <FaPlane className="text-sm text-white" />;
                    }
                  };

                  return (
                    <div key={b.id + index}
                      className={`absolute inset-0 transition-all duration-500 ease-out ${hidden ? "pointer-events-none opacity-0" : "cursor-pointer"}`}
                      style={{ transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`, opacity: hidden ? 0 : opacity, zIndex }}
                      onClick={() => setActive(index)}
                    >
                      <div className={`h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                        <div className="h-full bg-black/50 backdrop-blur-md p-5 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                              {getIcon()}
                            </div>
                            <span className="text-[10px] font-mono text-white/60">PNR {b.id}</span>
                          </div>

                          <div>
                            <span className="text-4xl font-black text-white/90">{String((index % 9) + 1).padStart(2, "0")}</span>
                            <div className="mt-3">
                              <p className="text-lg font-bold leading-tight">{b.from.split(' ')[0]} <span className="text-white/50">→</span> {b.to.split(' ')[0]}</p>
                              <div className="flex gap-3 mt-2 text-[10px] text-white/70">
                                <span className="flex items-center gap-1"><FaUserFriends /> {b.passengers}</span>
                                <span className="flex items-center gap-1"><FaCreditCard /> {b.paymentMethod}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-end justify-between pt-3 border-t border-white/10">
                            <div>
                              <p className="text-[10px] text-white/50 uppercase">Total</p>
                              <p className="text-xl font-bold">₹{b.amount}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={(e) => { e.stopPropagation(); openEdit(b); }} className="p-2 rounded-lg bg-white/20 hover:bg-white/30"><FaEdit size={12} /></button>
                              <button onClick={(e) => { e.stopPropagation(); deleteBooking(b.id); }} className="p-2 rounded-lg bg-white/20 hover:bg-white/30"><FaTrash size={12} /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {visible.length > 1 && (
                <div className="absolute -bottom-6 flex gap-3">
                  <button onClick={prev} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs flex items-center gap-1"><FaChevronLeft /> Prev</button>
                  <button onClick={next} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs flex items-center gap-1">Next <FaChevronRight /></button>
                </div>
              )}
            </div>
          )}
        </div>

        {toast && <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg">{toast}</div>}
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MyTripsPage;