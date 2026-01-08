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
  FaArrowLeft,
  FaUserFriends,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

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
  const [active, setActive] = useState(0);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    if (!user) { setBookings([]); setActive(0); return; }
    const mine = all.filter((b) => b.userId === user.id);
    setBookings(mine);
    setActive(0);
  }, [user]);

  const visible = useMemo(() => bookings, [bookings]);

  const prev = () => bookings.length > 1 && setActive((p) => (p - 1 + bookings.length) % bookings.length);
  const next = () => bookings.length > 1 && setActive((p) => (p + 1) % bookings.length);

  const openEdit = (b) => { setEditingBooking(b); setEditForm({ ...b }); };
  const closeEdit = () => { setEditingBooking(null); setEditForm({}); };

  const saveEdit = () => {
    if (!editForm.from?.trim() || !editForm.to?.trim() || !editForm.amount) return alert("Fill all fields");
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updated = all.map((b) => b.id === editingBooking.id ? { ...b, ...editForm, amount: Number(editForm.amount) } : b);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated.filter((b) => b.userId === user.id));
    setToast("Trip updated");
    setTimeout(() => setToast(null), 1500);
    closeEdit();
  };

  const deleteBooking = (id) => {
    if (!confirm("Delete trip?")) return;
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updated = all.filter((b) => b.id !== id);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated.filter((b) => b.userId === user.id));
    setActive(0);
    setToast("Trip deleted");
    setTimeout(() => setToast(null), 1500);
  };

  if (editingBooking) return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
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
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
      <Navbar onNavigate={onNavigate} />

      <div className="flex flex-col items-center justify-center min-h-[85vh]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">My Trips</h1>
          <p className="text-xs text-slate-500 mt-1">{bookings.length} trips</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-slate-500 text-sm">No bookings yet.</div>
        ) : (
          <div className="relative h-[400px] w-full flex items-center justify-center" style={{ perspective: "1000px" }}>
            <div className="relative w-[240px] h-[360px]" style={{ transformStyle: "preserve-3d" }}>
              {visible.map((b, index) => {
                const offset = getSignedOffset(index, active, bookings.length);
                const abs = Math.abs(offset);
                const hidden = abs > 2;

                // Compact calculations
                const translateX = offset * 180; // Distance between cards reduced
                const rotateY = offset * -25;
                const scale = 1 - abs * 0.15;
                const opacity = 1 - abs * 0.25;
                const zIndex = 50 - abs * 10;

                return (
                  <div key={b.id + index}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${hidden ? "pointer-events-none opacity-0" : "cursor-pointer"}`}
                    style={{ transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`, opacity: hidden ? 0 : opacity, zIndex }}
                    onClick={() => setActive(index)}
                  >
                    <div className={`h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                      <div className="h-full bg-black/50 backdrop-blur-md p-5 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"><FaPlane className="text-sm text-white" /></div>
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

            {/* Compact Nav Buttons */}
            <div className="absolute -bottom-6 flex gap-3">
              <button onClick={prev} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs flex items-center gap-1"><FaChevronLeft /> Prev</button>
              <button onClick={next} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs flex items-center gap-1">Next <FaChevronRight /></button>
            </div>
          </div>
        )}
      </div>

      {toast && <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg">{toast}</div>}
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default MyTripsPage;